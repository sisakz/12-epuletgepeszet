#!/usr/bin/env node
/**
 * Fallback PDF → Markdown converter using unpdf (plain text).
 * Prefer pdf-to-md.py (pymupdf4llm) for structured output.
 *
 * Usage:
 *   node pdf-to-md.mjs input.pdf [output.md]
 *   node pdf-to-md.mjs a.pdf b.pdf -o ./dist/
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { extractText, getDocumentProxy } from "unpdf";

function printHelp() {
  console.log(`Convert PDF to Markdown (unpdf — plain text fallback)

Usage:
  node pdf-to-md.mjs <input.pdf> [output.md]
  node pdf-to-md.mjs <file1.pdf> <file2.pdf> ... -o <dir>

Prefer the Python script for headings, tables, and images:
  python pdf-to-md.py input.pdf
`);
}

function defaultOutputPath(inputPath) {
  const ext = extname(inputPath);
  return inputPath.slice(0, -ext.length) + ".md";
}

function parseArgs(argv) {
  const result = {
    inputs: [],
    output: null,
    outputDir: null,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "-h" || arg === "--help") {
      result.help = true;
      continue;
    }

    if (arg === "-o" || arg === "--output-dir") {
      result.outputDir = resolve(argv[++i]);
      continue;
    }

    if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    }

    result.inputs.push(resolve(arg));
  }

  if (result.inputs.length === 2 && !result.outputDir) {
    const maybeOutput = result.inputs[1];
    if (extname(maybeOutput).toLowerCase() === ".md") {
      result.output = maybeOutput;
      result.inputs = [result.inputs[0]];
    }
  }

  return result;
}

function tidyMarkdown(text) {
  return `${text.replace(/\u00a0/g, " ").replace(/\n{3,}/g, "\n\n").trim()}\n`;
}

async function convertOne(inputPath, outputPath) {
  const bytes = await readFile(inputPath);
  const pdf = await getDocumentProxy(new Uint8Array(bytes));
  const { text } = await extractText(pdf, { mergePages: true });
  const markdown = tidyMarkdown(typeof text === "string" ? text : text.join("\n\n"));
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, markdown, "utf8");
  return outputPath;
}

async function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    printHelp();
    process.exit(1);
  }

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (args.inputs.length === 0) {
    console.error("Error: at least one input .pdf file is required.\n");
    printHelp();
    process.exit(1);
  }

  const outputs = [];

  for (const inputPath of args.inputs) {
    if (extname(inputPath).toLowerCase() !== ".pdf") {
      console.error(`Error: expected .pdf input, got: ${inputPath}`);
      process.exit(1);
    }

    let outputPath;
    if (args.outputDir) {
      outputPath = join(args.outputDir, defaultOutputPath(basename(inputPath)));
    } else if (args.output) {
      outputPath = args.output;
    } else {
      outputPath = defaultOutputPath(inputPath);
    }

    outputs.push(await convertOne(inputPath, outputPath));
  }

  for (const path of outputs) {
    console.log(`Markdown created: ${path}`);
  }
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  main().catch((error) => {
    console.error(`Conversion failed: ${error.message}`);
    process.exit(1);
  });
}
