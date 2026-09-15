#!/usr/bin/env python3
"""
Prepare photographs for the site.

Drops anything from source_images/ into assets/img/ at web size: resized to a
maximum width, converted to progressive JPEG, stripped of metadata. Charts and
screenshots stay PNG so the text in them keeps its edges.

    pip install -r tools/requirements.txt
    python tools/optimise_images.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "source_images"
DST = ROOT / "assets" / "img"

MAX_WIDTH = 1400
QUALITY = 76
KEEP_PNG = {"timeline", "confusion", "phone"}  # charts and UI, text must stay crisp


def main() -> None:
    if not SRC.exists():
        print(f"no {SRC.name}/ folder, nothing to do")
        return
    DST.mkdir(parents=True, exist_ok=True)
    for path in sorted(SRC.iterdir()):
        if path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
            continue
        im = Image.open(path)
        if im.mode in {"RGBA", "P", "LA"}:
            flat = Image.new("RGB", im.size, "white")
            im = im.convert("RGBA")
            flat.paste(im, mask=im.split()[-1])
            im = flat
        else:
            im = im.convert("RGB")
        if im.width > MAX_WIDTH:
            im = im.resize((MAX_WIDTH, round(im.height * MAX_WIDTH / im.width)), Image.LANCZOS)
        stem = path.stem.lower()
        if stem in KEEP_PNG:
            out = DST / f"{stem}.png"
            im.save(out, optimize=True)
        else:
            out = DST / f"{stem}.jpg"
            im.save(out, quality=QUALITY, optimize=True, progressive=True)
        print(f"  {path.name:28} -> {out.name:20} {out.stat().st_size/1024:6.0f} KB")


if __name__ == "__main__":
    main()
