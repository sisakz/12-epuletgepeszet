#!/usr/bin/env python3
"""
Convert PDF files to Markdown using pymupdf4llm.

Usage:
  python pdf-to-md.py input.pdf [output.md]
  python pdf-to-md.py a.pdf b.pdf -o ./dist/
  python pdf-to-md.py input.pdf --pages 1-3,8 --write-images
  python pdf-to-md.py scan.pdf --ocr --ocr-lang hun+eng
"""

from __future__ import annotations

import argparse
import inspect
import os
import sys
from pathlib import Path


def ensure_pymupdf4llm() -> None:
    try:
        import pymupdf4llm  # noqa: F401
    except ImportError:
        print(
            "Missing dependency: pymupdf4llm\n"
            "Install with: pip install -r requirements.txt\n"
            "Or use the skill venv: .venv/Scripts/python (Windows) / .venv/bin/python",
            file=sys.stderr,
        )
        sys.exit(1)


def default_output(input_path: Path) -> Path:
    return input_path.with_suffix(".md")


def parse_pages(spec: str) -> list[int]:
    """Parse 1-based page spec like '1-3,8' into 0-based indexes."""
    pages: list[int] = []
    for part in spec.split(","):
        token = part.strip()
        if not token:
            continue
        if "-" in token:
            start_s, end_s = token.split("-", 1)
            start = int(start_s)
            end = int(end_s)
            if start < 1 or end < start:
                raise ValueError(f"Invalid page range: {token}")
            pages.extend(range(start - 1, end))
        else:
            page = int(token)
            if page < 1:
                raise ValueError(f"Invalid page number: {token}")
            pages.append(page - 1)
    if not pages:
        raise ValueError(f"No pages parsed from: {spec}")
    return pages


def tidy_markdown(markdown: str) -> str:
    text = markdown.replace("\xa0", " ")
    while "\n\n\n" in text:
        text = text.replace("\n\n\n", "\n\n")
    return text.strip() + "\n"


def markdown_has_text(markdown: str) -> bool:
    stripped = markdown.strip()
    if not stripped:
        return False
    without_images = "".join(
        line
        for line in stripped.splitlines()
        if not line.strip().startswith("![")
    ).strip()
    return bool(without_images)


def relative_media_link(output_path: Path, image_path: Path) -> str:
    try:
        return Path(image_path.resolve().relative_to(output_path.parent.resolve())).as_posix()
    except ValueError:
        return Path(os.path.relpath(image_path, output_path.parent)).as_posix()


def render_pages_as_images(
    input_path: Path,
    output_path: Path,
    media_dir: Path,
    pages: list[int] | None = None,
    dpi: int = 150,
) -> str:
    import pymupdf

    media_dir.mkdir(parents=True, exist_ok=True)
    lines: list[str] = []
    with pymupdf.open(str(input_path)) as doc:
        indexes = pages if pages is not None else list(range(doc.page_count))
        for index in indexes:
            page = doc[index]
            page_number = index + 1
            filename = f"page-{page_number:03d}.png"
            image_path = media_dir / filename
            pixmap = page.get_pixmap(dpi=dpi)
            pixmap.save(str(image_path))
            src = relative_media_link(output_path, image_path)
            lines.append(f"![Page {page_number}]({src})")
    return "\n\n".join(lines) + "\n"


def call_to_markdown(input_path: Path, kwargs: dict) -> str:
    import pymupdf4llm

    signature = inspect.signature(pymupdf4llm.to_markdown)
    supported = {
        key: value
        for key, value in kwargs.items()
        if value is not None and key in signature.parameters
    }
    result = pymupdf4llm.to_markdown(str(input_path), **supported)
    if isinstance(result, list):
        parts = []
        for chunk in result:
            if isinstance(chunk, dict):
                parts.append(str(chunk.get("text", "")))
            else:
                parts.append(str(chunk))
        return "\n\n".join(parts)
    return str(result)


def convert_one(input_path: Path, output_path: Path, args: argparse.Namespace) -> Path | None:
    media_dir: Path | None = None
    if args.write_images or args.render_pages:
        media_dir = (
            Path(args.media_dir).resolve()
            if args.media_dir
            else output_path.with_name(output_path.stem + "-media")
        )
        media_dir.mkdir(parents=True, exist_ok=True)

    kwargs = {
        "pages": parse_pages(args.pages) if args.pages else None,
        "write_images": args.write_images,
        "embed_images": args.embed_images,
        "image_path": str(media_dir) if media_dir else None,
        "image_format": "png",
        "header": not args.no_headers,
        "footer": not args.no_footers,
        "use_ocr": args.ocr,
        "ocr_language": args.ocr_lang if args.ocr else None,
        "show_progress": False,
    }

    markdown = tidy_markdown(call_to_markdown(input_path, kwargs))
    used_page_render = False

    if not markdown_has_text(markdown) and not args.no_render_pages:
        if media_dir is None:
            media_dir = (
                Path(args.media_dir).resolve()
                if args.media_dir
                else output_path.with_name(output_path.stem + "-media")
            )
        print(
            "No selectable text found; rendering pages as images. "
            "For text via OCR, re-run with --ocr (requires Tesseract or rapidocr).",
            file=sys.stderr,
        )
        markdown = render_pages_as_images(
            input_path,
            output_path,
            media_dir,
            pages=kwargs["pages"],
        )
        used_page_render = True

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(markdown, encoding="utf-8")

    if media_dir and not any(media_dir.iterdir()):
        media_dir.rmdir()
        media_dir = None

    if not markdown_has_text(markdown) and not used_page_render:
        raise RuntimeError(
            "Conversion produced empty Markdown. The PDF may be scanned; "
            "try --ocr --ocr-lang hun+eng or omit --no-render-pages."
        )

    return media_dir


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert PDF to Markdown using pymupdf4llm",
    )
    parser.add_argument("inputs", nargs="+", type=Path, help="Source .pdf file(s)")
    parser.add_argument(
        "-o",
        "--output-dir",
        type=Path,
        help="Output directory for batch conversion",
    )
    parser.add_argument("--pages", help="1-based pages, e.g. 1-3,8")
    parser.add_argument(
        "--write-images",
        action="store_true",
        help="Extract images to <output>-media/",
    )
    parser.add_argument(
        "--embed-images",
        action="store_true",
        help="Embed images as data URIs",
    )
    parser.add_argument("--media-dir", type=Path, help="Folder for extracted images")
    parser.add_argument("--no-headers", action="store_true", help="Drop page headers")
    parser.add_argument("--no-footers", action="store_true", help="Drop page footers")
    parser.add_argument("--ocr", action="store_true", help="Enable OCR for scanned pages")
    parser.add_argument("--ocr-lang", default="eng", help="OCR language(s), e.g. hun+eng")
    parser.add_argument(
        "--render-pages",
        action="store_true",
        help="Always save each page as a PNG and link it from the markdown",
    )
    parser.add_argument(
        "--no-render-pages",
        action="store_true",
        help="Do not fall back to page images when there is no selectable text",
    )
    return parser.parse_args(argv)


def resolve_jobs(args: argparse.Namespace) -> list[tuple[Path, Path]]:
    inputs = [path.resolve() for path in args.inputs]
    output_explicit: Path | None = None

    if args.output_dir is None and len(inputs) == 2 and inputs[1].suffix.lower() == ".md":
        output_explicit = inputs[1]
        inputs = [inputs[0]]

    jobs: list[tuple[Path, Path]] = []
    for input_path in inputs:
        if args.output_dir:
            output_path = args.output_dir.resolve() / default_output(Path(input_path.name)).name
        elif output_explicit:
            output_path = output_explicit
        else:
            output_path = default_output(input_path)
        jobs.append((input_path, output_path))
    return jobs


def main() -> int:
    ensure_pymupdf4llm()
    args = parse_args()

    if args.write_images and args.embed_images:
        print("Error: use either --write-images or --embed-images, not both.", file=sys.stderr)
        return 1

    try:
        jobs = resolve_jobs(args)
    except Exception as exc:  # noqa: BLE001
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    for input_path, output_path in jobs:
        if not input_path.is_file():
            print(f"Input file not found: {input_path}", file=sys.stderr)
            return 1
        if input_path.suffix.lower() != ".pdf":
            print(f"Expected a .pdf file, got: {input_path}", file=sys.stderr)
            return 1

        try:
            media_dir = convert_one(input_path, output_path, args)
        except Exception as exc:  # noqa: BLE001
            print(f"Conversion failed: {exc}", file=sys.stderr)
            return 1

        print(f"Markdown created: {output_path}")
        if media_dir:
            print(f"Images extracted: {media_dir}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
