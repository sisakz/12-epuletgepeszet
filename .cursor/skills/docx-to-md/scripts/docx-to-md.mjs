#!/usr/bin/env node
/**
 * Convert Word .doc / .docx files to Markdown using mammoth + turndown.
 *
 * Usage:
 *   node docx-to-md.mjs input.docx [output.md]
 *   node docx-to-md.mjs input.doc output.md
 *   node docx-to-md.mjs a.docx b.doc -o ./dist/
 */

import { spawn } from "node:child_process";
import { access, mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import {
  basename,
  dirname,
  extname,
  join,
  relative,
  resolve,
} from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const mammoth = require("mammoth");
const TurndownService = require("turndown");
const { gfm } = require("turndown-plugin-gfm");

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const CONVERT_PS1 = join(SCRIPT_DIR, "convert-doc-to-docx.ps1");

const WORD_EXTENSIONS = new Set([".doc", ".docx"]);
const IMAGE_EXT = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/gif": "gif",
  "image/bmp": "bmp",
  "image/tiff": "tiff",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

function printHelp() {
  console.log(`Convert Word DOC/DOCX to Markdown (mammoth + turndown)

Usage:
  node docx-to-md.mjs <input.doc|docx> [output.md] [options]
  node docx-to-md.mjs <file1> <file2> ... -o <dir>

Options:
  -o, --output-dir <dir>   Output directory for batch conversion
  --media-dir <dir>        Folder for extracted images (default: <output>-media/)
  --embed-images           Keep images as data URIs in the markdown
  --style-map <file>       Mammoth style map file
  --keep-docx              Keep the intermediate .docx when converting .doc
  -h, --help               Show this help

Examples:
  node docx-to-md.mjs agreement.docx
  node docx-to-md.mjs founding.doc founding.md
  node docx-to-md.mjs a.docx b.doc -o ./dist/
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
    mediaDir: null,
    embedImages: false,
    styleMap: null,
    keepDocx: false,
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

    if (arg === "--media-dir") {
      result.mediaDir = resolve(argv[++i]);
      continue;
    }

    if (arg === "--embed-images") {
      result.embedImages = true;
      continue;
    }

    if (arg === "--style-map") {
      result.styleMap = resolve(argv[++i]);
      continue;
    }

    if (arg === "--keep-docx") {
      result.keepDocx = true;
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

function runCommand(command, args, options = {}) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, {
      windowsHide: true,
      ...options,
    });
    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr?.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolvePromise({ stdout, stderr });
      } else {
        const detail = (stderr || stdout).trim() || `exit ${code}`;
        reject(new Error(`${command} failed: ${detail}`));
      }
    });
  });
}

function commandExists(command) {
  const probe = process.platform === "win32" ? "where" : "which";
  return runCommand(probe, [command])
    .then(() => true)
    .catch(() => false);
}

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function findLibreOffice() {
  const candidates = [
    "soffice",
    "libreoffice",
    "C:\\Program Files\\LibreOffice\\program\\soffice.exe",
    "C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe",
    "/usr/bin/soffice",
    "/usr/bin/libreoffice",
    "/Applications/LibreOffice.app/Contents/MacOS/soffice",
  ];

  for (const candidate of candidates) {
    if (candidate === "soffice" || candidate === "libreoffice") {
      if (await commandExists(candidate)) {
        return candidate;
      }
      continue;
    }
    if (await pathExists(candidate)) {
      return candidate;
    }
  }

  return null;
}

async function convertDocWithWord(inputPath, outputPath) {
  await runCommand("powershell.exe", [
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-File",
    CONVERT_PS1,
    "-InputPath",
    inputPath,
    "-OutputPath",
    outputPath,
  ]);
}

async function convertDocWithLibreOffice(inputPath, outputPath) {
  const soffice = await findLibreOffice();
  if (!soffice) {
    throw new Error("LibreOffice (soffice) not found");
  }

  const outDir = dirname(outputPath);
  await mkdir(outDir, { recursive: true });
  await runCommand(soffice, [
    "--headless",
    "--convert-to",
    "docx",
    "--outdir",
    outDir,
    inputPath,
  ]);

  const produced = join(outDir, basename(inputPath, extname(inputPath)) + ".docx");
  if (resolve(produced) !== resolve(outputPath)) {
    const { rename } = await import("node:fs/promises");
    await rename(produced, outputPath);
  }
}

async function ensureDocx(inputPath, keepDocx) {
  const ext = extname(inputPath).toLowerCase();
  if (ext === ".docx") {
    return { docxPath: inputPath, temporary: false };
  }

  if (ext !== ".doc") {
    throw new Error(`Expected .doc or .docx, got: ${inputPath}`);
  }

  const sibling = inputPath.slice(0, -ext.length) + ".docx";
  const docxPath = keepDocx
    ? sibling
    : join(tmpdir(), `${basename(inputPath, ext)}-${Date.now()}.docx`);

  const errors = [];

  if (process.platform === "win32") {
    try {
      await convertDocWithWord(inputPath, docxPath);
      return { docxPath, temporary: !keepDocx };
    } catch (error) {
      errors.push(`Word: ${error.message}`);
    }
  }

  try {
    await convertDocWithLibreOffice(inputPath, docxPath);
    return { docxPath, temporary: !keepDocx };
  } catch (error) {
    errors.push(`LibreOffice: ${error.message}`);
  }

  throw new Error(
    `Cannot convert legacy .doc to .docx.\n${errors.join("\n")}\n` +
      "Install Microsoft Word or LibreOffice, or save the file as .docx first.",
  );
}

function createTurndown() {
  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*",
    hr: "---",
  });
  turndown.use(gfm);
  return turndown;
}

function tidyMarkdown(markdown) {
  return markdown
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim() + "\n";
}

function extensionForImage(contentType) {
  return IMAGE_EXT[contentType] || contentType.split("/")[1] || "bin";
}

async function convertOne(inputPath, outputPath, options) {
  await access(inputPath);

  const { docxPath, temporary } = await ensureDocx(inputPath, options.keepDocx);
  const mediaDir = options.embedImages
    ? null
    : options.mediaDir || outputPath.slice(0, -extname(outputPath).length) + "-media";

  let imageIndex = 0;
  const mammothOptions = {};

  if (options.styleMap) {
    mammothOptions.styleMap = await readFile(options.styleMap, "utf8");
  }

  if (mediaDir) {
    mammothOptions.convertImage = mammoth.images.imgElement(async (image) => {
      imageIndex += 1;
      const ext = extensionForImage(image.contentType);
      const filename = `image-${String(imageIndex).padStart(3, "0")}.${ext}`;
      await mkdir(mediaDir, { recursive: true });
      const imagePath = join(mediaDir, filename);
      const buffer = await image.readAsBuffer();
      await writeFile(imagePath, buffer);
      const src = relative(dirname(outputPath), imagePath).replaceAll("\\", "/");
      return { src };
    });
  }

  try {
    const result = await mammoth.convertToHtml({ path: docxPath }, mammothOptions);
    const html = result.value;
    const markdown = tidyMarkdown(createTurndown().turndown(html));

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, markdown, "utf8");

    for (const message of result.messages || []) {
      const prefix = message.type === "error" ? "error" : "warn";
      console.error(`[${prefix}] ${message.message}`);
    }

    return { outputPath, mediaDir: imageIndex > 0 ? mediaDir : null };
  } finally {
    if (temporary) {
      await unlink(docxPath).catch(() => {});
    }
  }
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
    console.error("Error: at least one input .doc or .docx file is required.\n");
    printHelp();
    process.exit(1);
  }

  const outputs = [];

  for (const inputPath of args.inputs) {
    const ext = extname(inputPath).toLowerCase();
    if (!WORD_EXTENSIONS.has(ext)) {
      console.error(`Error: expected .doc or .docx input, got: ${inputPath}`);
      process.exit(1);
    }

    let outputPath;
    if (args.outputDir) {
      const base = basename(inputPath);
      outputPath = join(args.outputDir, defaultOutputPath(base));
    } else if (args.output) {
      outputPath = args.output;
    } else {
      outputPath = defaultOutputPath(inputPath);
    }

    const written = await convertOne(inputPath, outputPath, {
      mediaDir: args.mediaDir,
      embedImages: args.embedImages,
      styleMap: args.styleMap,
      keepDocx: args.keepDocx,
    });
    outputs.push(written);
  }

  for (const item of outputs) {
    console.log(`Markdown created: ${item.outputPath}`);
    if (item.mediaDir) {
      console.log(`Images extracted: ${item.mediaDir}`);
    }
  }
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  main().catch((error) => {
    console.error(`Conversion failed: ${error.message}`);
    process.exit(1);
  });
}
