#!/usr/bin/env python3
"""
Convert Word .doc / .docx files to Markdown using mammoth.

Requires:
  pip install -r requirements.txt

Legacy .doc files are converted to .docx first (Word on Windows, or LibreOffice).

Usage:
  python docx-to-md.py input.docx [output.md]
  python docx-to-md.py input.doc output.md --keep-docx
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
CONVERT_PS1 = SCRIPT_DIR / "convert-doc-to-docx.ps1"


def ensure_mammoth() -> None:
    try:
        import mammoth  # noqa: F401
    except ImportError:
        print(
            "Missing dependency: mammoth\n"
            "Install with: pip install -r requirements.txt",
            file=sys.stderr,
        )
        sys.exit(1)


def default_output(input_path: Path) -> Path:
    return input_path.with_suffix(".md")


def find_libreoffice() -> str | None:
    for name in ("soffice", "libreoffice"):
        found = shutil.which(name)
        if found:
            return found

    candidates = [
        Path(r"C:\Program Files\LibreOffice\program\soffice.exe"),
        Path(r"C:\Program Files (x86)\LibreOffice\program\soffice.exe"),
        Path("/usr/bin/soffice"),
        Path("/Applications/LibreOffice.app/Contents/MacOS/soffice"),
    ]
    for candidate in candidates:
        if candidate.is_file():
            return str(candidate)
    return None


def convert_doc_with_word(input_path: Path, output_path: Path) -> None:
    subprocess.run(
        [
            "powershell.exe",
            "-NoProfile",
            "-ExecutionPolicy",
            "Bypass",
            "-File",
            str(CONVERT_PS1),
            "-InputPath",
            str(input_path),
            "-OutputPath",
            str(output_path),
        ],
        check=True,
    )


def convert_doc_with_libreoffice(input_path: Path, output_path: Path) -> None:
    soffice = find_libreoffice()
    if not soffice:
        raise FileNotFoundError("LibreOffice (soffice) not found")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            soffice,
            "--headless",
            "--convert-to",
            "docx",
            "--outdir",
            str(output_path.parent),
            str(input_path),
        ],
        check=True,
    )

    produced = output_path.parent / (input_path.stem + ".docx")
    if produced.resolve() != output_path.resolve():
        produced.replace(output_path)


def ensure_docx(input_path: Path, keep_docx: bool) -> tuple[Path, bool]:
    suffix = input_path.suffix.lower()
    if suffix == ".docx":
        return input_path, False
    if suffix != ".doc":
        raise ValueError(f"Expected .doc or .docx, got: {input_path}")

    if keep_docx:
        docx_path = input_path.with_suffix(".docx")
        temporary = False
    else:
        handle = tempfile.NamedTemporaryFile(suffix=".docx", delete=False)
        handle.close()
        docx_path = Path(handle.name)
        temporary = True

    errors: list[str] = []

    if sys.platform == "win32":
        try:
            convert_doc_with_word(input_path, docx_path)
            return docx_path, temporary
        except Exception as exc:  # noqa: BLE001
            errors.append(f"Word: {exc}")

    try:
        convert_doc_with_libreoffice(input_path, docx_path)
        return docx_path, temporary
    except Exception as exc:  # noqa: BLE001
        errors.append(f"LibreOffice: {exc}")

    raise RuntimeError(
        "Cannot convert legacy .doc to .docx.\n"
        + "\n".join(errors)
        + "\nInstall Microsoft Word or LibreOffice, or save the file as .docx first."
    )


def tidy_markdown(markdown: str) -> str:
    text = markdown.replace("\xa0", " ")
    while "\n\n\n" in text:
        text = text.replace("\n\n\n", "\n\n")
    return text.strip() + "\n"


def convert(input_path: Path, output_path: Path, keep_docx: bool) -> None:
    import mammoth

    docx_path, temporary = ensure_docx(input_path, keep_docx)
    try:
        with docx_path.open("rb") as handle:
            result = mammoth.convert_to_markdown(handle)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(tidy_markdown(result.value), encoding="utf-8")
        for message in result.messages:
            print(f"[warn] {message}", file=sys.stderr)
    finally:
        if temporary:
            docx_path.unlink(missing_ok=True)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert Word DOC/DOCX to Markdown using mammoth",
    )
    parser.add_argument("input", type=Path, help="Source .doc or .docx file")
    parser.add_argument(
        "output",
        nargs="?",
        type=Path,
        help="Destination .md file (default: same name as input)",
    )
    parser.add_argument(
        "--keep-docx",
        action="store_true",
        help="Keep the intermediate .docx when converting .doc",
    )
    return parser.parse_args()


def main() -> int:
    ensure_mammoth()

    args = parse_args()
    input_path = args.input.resolve()
    output_path = (args.output or default_output(input_path)).resolve()

    if not input_path.is_file():
        print(f"Input file not found: {input_path}", file=sys.stderr)
        return 1

    if input_path.suffix.lower() not in {".doc", ".docx"}:
        print(f"Expected a .doc or .docx file, got: {input_path}", file=sys.stderr)
        return 1

    try:
        convert(input_path, output_path, args.keep_docx)
    except Exception as exc:  # noqa: BLE001
        print(f"Conversion failed: {exc}", file=sys.stderr)
        return 1

    print(f"Markdown created: {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
