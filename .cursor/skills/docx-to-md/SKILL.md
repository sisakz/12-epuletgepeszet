---
name: docx-to-md
description: Converts Microsoft Word documents (.doc, .docx) to Markdown (.md). Use whenever the user asks to convert Word/DOC/DOCX to markdown, extract text from a Word file, turn an agreement or founding document into .md, or batch-convert Word files — even if they only mention ".doc", ".docx", or "word document".
---

# DOCX/DOC to Markdown Converter

Convert Word documents in this project to Markdown using the bundled scripts in this skill.

## Library choice

| Runtime | Library | When to use |
|---------|---------|-------------|
| **Node.js (default)** | [mammoth](https://www.npmjs.com/package/mammoth) + [turndown](https://www.npmjs.com/package/turndown) | No external binaries for `.docx`. Best default. |
| **Python (optional)** | [mammoth](https://pypi.org/project/mammoth/) | Same engine as Node when you prefer Python. |
| **Pandoc (optional)** | [Pandoc](https://pandoc.org/) via `pypandoc` | Complex layouts, footnotes, or when mammoth misses structure. |

**Default to the Node.js script.** Legacy `.doc` files are converted to `.docx` first (Microsoft Word on Windows, or LibreOffice if Word is not installed).

## Quick start

From the repository root:

```bash
cd .cursor/skills/docx-to-md/scripts && npm install
node docx-to-md.mjs ../../../context/document.docx
node docx-to-md.mjs ../../../context/document.doc ../../../context/document.md
```

Python alternative:

```bash
pip install -r .cursor/skills/docx-to-md/scripts/requirements.txt
python .cursor/skills/docx-to-md/scripts/docx-to-md.py input.docx
python .cursor/skills/docx-to-md/scripts/docx-to-md.py input.doc output.md
```

## Workflow

1. Identify the source `.doc` / `.docx` file(s) and desired output path(s).
2. If output path is omitted, use the same basename with `.md`.
3. Run `scripts/docx-to-md.mjs` (preferred) or `scripts/docx-to-md.py`.
4. Confirm the output `.md` exists. If images were extracted, also report the media folder.
5. For batch conversion, pass multiple inputs with `-o <dir>`.

## Script reference

### `scripts/docx-to-md.mjs`

```bash
node docx-to-md.mjs <input.doc|docx> [output.md]
node docx-to-md.mjs file1.docx file2.doc -o ./dist/
node docx-to-md.mjs input.docx --style-map style-map.example.txt
node docx-to-md.mjs input.docx --embed-images
```

| Flag | Purpose |
|------|---------|
| `-o`, `--output-dir` | Output directory when converting multiple inputs |
| `--media-dir <dir>` | Folder for extracted images (default: `<output>-media/`) |
| `--embed-images` | Keep images as data URIs inside the markdown |
| `--style-map <file>` | Mammoth style map (Word paragraph styles → HTML) |
| `--keep-docx` | Keep the intermediate `.docx` when converting `.doc` |
| `-h`, `--help` | Show help |

Images are extracted next to the markdown file by default. Use `--embed-images` only when a single self-contained `.md` is required.

See [style-map.example.txt](scripts/style-map.example.txt) for mapping custom Word styles (including Hungarian *Címsor* headings).

### `scripts/docx-to-md.py`

```bash
python docx-to-md.py input.docx [output.md]
python docx-to-md.py input.doc output.md --keep-docx
```

Uses Python mammoth. Legacy `.doc` conversion uses the same Word / LibreOffice helper as the Node script.

## Requirements

- Node.js 18+ (for default path)
- For `.doc` files: Microsoft Word (Windows) **or** LibreOffice on PATH
- Python 3.9+ (optional Python path only)

Install Node dependencies once per machine:

```bash
cd .cursor/skills/docx-to-md/scripts && npm install
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `Cannot find module 'mammoth'` | Run `npm install` in `scripts/` |
| `.doc` conversion failed | Install Microsoft Word or LibreOffice; or save the file as `.docx` in Word first |
| Headings come out as plain paragraphs | Add a `--style-map` for the document's paragraph styles |
| Images missing | Do not use `--embed-images` if you need files on disk; check the `-media` folder |
| Garbled Hungarian text | Output is UTF-8; open the `.md` as UTF-8 (not Windows-1250) |

## Additional resources

- Library details, style maps, and `.doc` conversion: [reference.md](reference.md)
