---
name: pdf-to-md
description: Converts PDF files to Markdown (.md). Use whenever the user asks to convert a PDF to markdown, extract text from a PDF, turn a slide deck or report into .md, or batch-convert PDF files — even if they only mention ".pdf" or "PDF document".
---

# PDF to Markdown Converter

Convert project PDF files to Markdown using the bundled scripts in this skill.

## Library choice

| Runtime | Library | When to use |
|---------|---------|-------------|
| **Python (default)** | [pymupdf4llm](https://pypi.org/project/pymupdf4llm/) | Layout-aware Markdown: headings, tables, images, optional OCR. Best default. |
| **Node.js (fallback)** | [unpdf](https://www.npmjs.com/package/unpdf) | Plain text only. Use when Python is unavailable. |
| **Pandoc (optional)** | [Pandoc](https://pandoc.org/) via `pypandoc` | Rarely better than pymupdf4llm for PDFs. |

**Default to the Python script.** Node extraction has no heading/table reconstruction.

## Quick start

From the repository root:

```bash
cd .cursor/skills/pdf-to-md/scripts
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
.venv\Scripts\python pdf-to-md.py ../../../context/document.pdf
```

On macOS/Linux use `.venv/bin/pip` and `.venv/bin/python`.

Node fallback (plain text):

```bash
cd .cursor/skills/pdf-to-md/scripts && npm install
node pdf-to-md.mjs ../../../context/document.pdf
```

## Workflow

1. Identify the source `.pdf` file(s) and desired output path(s).
2. If output path is omitted, use the same basename with `.md`.
3. Run `scripts/pdf-to-md.py` (preferred) or `scripts/pdf-to-md.mjs`.
4. Confirm the output `.md` exists. If images were extracted, also report the media folder.
5. If the PDF is scanned or Print-to-PDF (no selectable text), the script renders each page as a PNG. For real text, re-run with `--ocr --ocr-lang hun+eng` when Tesseract is installed.
6. For batch conversion, pass multiple inputs with `-o <dir>`.

## Script reference

### `scripts/pdf-to-md.py`

```bash
python pdf-to-md.py <input.pdf> [output.md]
python pdf-to-md.py file1.pdf file2.pdf -o ./dist/
python pdf-to-md.py input.pdf --pages 1-3,8 --write-images
python pdf-to-md.py scan.pdf --ocr --ocr-lang hun+eng
```

| Flag | Purpose |
|------|---------|
| `-o`, `--output-dir` | Output directory when converting multiple inputs |
| `--pages <spec>` | 1-based pages, e.g. `1-3,8` |
| `--write-images` | Extract embedded images to `<output>-media/` |
| `--embed-images` | Keep images as data URIs in the markdown |
| `--media-dir <dir>` | Folder for extracted images |
| `--render-pages` | Always save each page as a PNG and link it |
| `--no-render-pages` | Do not fall back to page images when text is empty |
| `--no-headers` | Drop detected page headers |
| `--no-footers` | Drop detected page footers |
| `--ocr` | Enable OCR (Tesseract or rapidocr if installed) |
| `--ocr-lang <code>` | OCR languages, e.g. `hun+eng` (default: `eng`) |
| `-h`, `--help` | Show help |

### `scripts/pdf-to-md.mjs`

```bash
node pdf-to-md.mjs <input.pdf> [output.md]
node pdf-to-md.mjs file1.pdf file2.pdf -o ./dist/
```

Extracts selectable text only. Prefer the Python script for reports, slides, and tables.

## Requirements

- Python 3.10+ (for default path)
- Optional: [Tesseract](https://github.com/tesseract-ocr/tesseract) with `hun` and `eng` packs for scanned PDFs
- Node.js 18+ (fallback path only)

Install Python dependencies once per machine (prefer the skill venv):

```bash
cd .cursor/skills/pdf-to-md/scripts
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `No module named 'pymupdf4llm'` | Install into the skill venv (`pip install -r requirements.txt`) |
| Empty or tiny markdown | PDF is likely scanned or Print-to-PDF; the script falls back to page images. Use `--ocr` for text. |
| OCR requested but fails | Install Tesseract, or omit `--ocr` and keep the page-image fallback |
| Garbled Hungarian text | Output is UTF-8; for scans use `--ocr-lang hun+eng` |
| Too many decorative images | Do not pass `--write-images` |

## Additional resources

- Library details, OCR, and page selection: [reference.md](reference.md)
