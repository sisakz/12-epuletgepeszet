# DOCX/DOC to Markdown — reference

## Why mammoth + turndown

- Mammoth produces **semantic HTML** from Word (headings, lists, tables, emphasis) instead of pixel-perfect layout
- Turndown + GFM turns that HTML into readable Markdown, including pipe tables
- Pure npm dependencies for `.docx` — no Pandoc binary
- Mammoth's built-in `convertToMarkdown` is deprecated; HTML → Markdown is the recommended path

## Why a `.doc` pre-step

Mammoth, MarkItDown, and Pandoc read **OOXML `.docx` only**. Legacy `.doc` (Word 97–2003 OLE) must be converted first.

Conversion order used by the scripts:

1. **Microsoft Word COM** (Windows) via `convert-doc-to-docx.ps1`
2. **LibreOffice** `soffice --headless --convert-to docx`

If both fail, save the file as `.docx` in Word and retry.

## Style maps

Word heading styles named `Heading 1` … `Heading 6` map automatically. Custom or localized styles need a map file:

```
p[style-name='Címsor 1'] => h1:fresh
p[style-name='Címsor 2'] => h2:fresh
p[style-name='Title'] => h1:fresh
p[style-name='Subtitle'] => h2:fresh
r[style-name='Strong'] => strong
```

Pass with `--style-map`. See [style-map.example.txt](scripts/style-map.example.txt).

Inspect unused styles: mammoth prints warnings such as `Unrecognised paragraph style: "..."`. Add those names to the map.

## Images

Default: files written to `<basename>-media/` with relative `![](...)` links.

`--embed-images`: data URIs in the markdown (large files; avoid for git).

Unsupported Word drawings (EMF/WMF) may be skipped; mammoth reports them in conversion messages.

## Pandoc extra arguments

If you extend the Python script to call Pandoc:

```
--from=docx
--to=gfm
--wrap=none
--extract-media=<dir>
```

Pandoc is stronger on footnotes, track-changes stripping (`--track-changes=accept`), and some nested tables. Mammoth is usually cleaner for contracts and founding documents.
