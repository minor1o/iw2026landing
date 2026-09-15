#!/usr/bin/env python3
"""
Build a one file version of the Cowllar site.

Reads index.html, inlines every stylesheet, script and image as a data URI,
and writes dist/index.html. Use it for the demo laptop: the result opens by
double click with no server and no internet.

    python tools/build_single_file.py
"""
import base64
import mimetypes
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "dist" / "index.html"


def data_uri(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()


def inline_css(html: str) -> str:
    def swap(m):
        href = m.group(1)
        css = (ROOT / href).read_text(encoding="utf-8")
        return f"<style>\n{css}\n</style>"
    return re.sub(r'<link rel="stylesheet" href="([^"]+\.css)">', swap, html)


def inline_js(html: str) -> str:
    def swap(m):
        src = m.group(1)
        js = (ROOT / src).read_text(encoding="utf-8")
        return f"<script>\n{js}\n</script>"
    return re.sub(r'<script src="([^"]+\.js)"></script>', swap, html)


def inline_images(html: str) -> str:
    seen = {}

    def swap(m):
        rel = m.group(1)
        if rel not in seen:
            seen[rel] = data_uri(ROOT / rel)
        return f'src="{seen[rel]}"'

    html = re.sub(r'src="(assets/img/[^"]+)"', swap, html)
    print(f"  inlined {len(seen)} images")
    return html


def main() -> int:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    print("building single file bundle")
    html = inline_css(html)
    html = inline_js(html)
    html = inline_images(html)
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(html, encoding="utf-8")
    size = OUT.stat().st_size / 1e6
    print(f"  wrote {OUT.relative_to(ROOT)}  {size:.2f} MB")
    if "assets/" in html:
        print("  warning: some asset links were not inlined", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
