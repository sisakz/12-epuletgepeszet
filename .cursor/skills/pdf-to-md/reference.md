# PDF to Markdown — reference

## Why pymupdf4llm

- Built for LLM-ready Markdown: headings, lists, GFM tables, bold/italic
- Layout-aware reading order (multi-column pages)
- Optional image extraction and hybrid OCR
- Local, no API key, no GPU
- Better structure than Node `unpdf` / `pdf-parse` (those emit plain text)

Install: `pip install pymupdf4llm` (pulls PyMuPDF + pymupdf-layout).

## Why unpdf (Node fallback)

- No Python required
- Uses PDF.js to extract selectable text
- Does **not** reconstruct headings or tables
- Use only when Python cannot be installed

## Page numbers

CLI `--pages` is **1-based** (first page is `1`). The library API is 0-based; the script converts.

Examples:

- `1-3` → pages 1, 2, 3
- `1,5,9-10` → pages 1, 5, 9, 10

## Image-only PDFs

Microsoft Print-to-PDF and scanned slides often have **no text layer**. pymupdf4llm then returns empty Markdown.

The script's default fallback renders each page to `<basename>-media/page-001.png` and writes:

```markdown
![Page 1](document-media/page-001.png)
```

For actual text, install Tesseract (with `hun` + `eng`) and pass `--ocr --ocr-lang hun+eng`.

## Images

Default: text-only Markdown (decorative PDF images omitted).

`--write-images`: PNG files in `<basename>-media/` with `![](...)` links.

`--embed-images`: data URIs (large files; avoid for git).

Do not combine `--write-images` and `--embed-images`.

## OCR

pymupdf4llm can OCR scanned or image-only pages. Default in this skill: **OCR off** so digital PDFs stay fast and do not require Tesseract.

When text is missing:

```bash
python pdf-to-md.py scan.pdf --ocr --ocr-lang hun+eng
```

Engines (first available): Tesseract via PyMuPDF, or `rapidocr_onnxruntime`. If none are installed, conversion continues without OCR unless `--ocr` was required for empty pages.

Hungarian scans need the `hun` Tesseract language pack.

## Headers and footers

Repeating running heads often pollute Markdown. Use `--no-headers` and/or `--no-footers` for slide decks and paged reports.

## Pandoc

Pandoc PDF reading is weaker than pymupdf4llm (via `pdftotext`). Prefer pymupdf4llm. If you extend the script:

```
--from=pdf
--to=gfm
--wrap=none
```
