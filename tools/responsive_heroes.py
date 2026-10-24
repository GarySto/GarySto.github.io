#!/usr/bin/env python3
"""
responsive_heroes.py

Gives article hero images (and the featured card on /articles/) smaller WebP
copies plus a srcset/sizes, so phones download a ~30-60 KB image instead of
the full 1200 px file (up to 260 KB) that sits on the LCP critical path.

For every <img class="article-hero-img"> / <img class="featured-article-img">
that has no srcset yet:
  - makes <name>-480.webp, <name>-720.webp, <name>-960.webp next to the
    original (only widths smaller than the original; resized from the
    matching .png master when there is one, otherwise from the .webp)
  - adds srcset (those copies + the original at its real width) and sizes
    that match the CSS in assets/site.css

Only attributes are added; src, alt, width, height and all page text stay
as they are. Safe to run again: images that already have a srcset are
skipped and existing copies are reused. Run it after a new article goes
live:  py tools/responsive_heroes.py  (from the repo root)
"""
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
WIDTHS = (480, 720, 960)
QUALITY = 80

# Rendered widths, from assets/site.css:
#   .article-hero-img: full width inside section padding (2rem each side at
#   <=900px, 4rem above), capped at 900px.
#   .featured-article-img: full card width at <=900px, 280px column above.
SIZES = {
    "article-hero-img": "(max-width: 900px) calc(100vw - 4rem), 900px",
    "featured-article-img": "(max-width: 900px) calc(100vw - 4rem), 280px",
}

IMG_RE = re.compile(r'<img\b[^>]*\bclass="(article-hero-img|featured-article-img)"[^>]*>')


def variants_for(src_url: str):
    """Make (or reuse) the smaller copies; return srcset string or None."""
    if not src_url.startswith("/") or not src_url.endswith(".webp"):
        return None
    original = ROOT / src_url.lstrip("/")
    if not original.exists():
        return None
    with Image.open(original) as im:
        full_w = im.width
    master = original.with_suffix(".png")
    if not master.exists():
        master = original
    entries = []
    for w in WIDTHS:
        if w >= full_w:
            continue
        out = original.with_name(f"{original.stem}-{w}.webp")
        if not out.exists():
            with Image.open(master) as im:
                im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
                h = round(im.height * w / im.width)
                im.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=QUALITY, method=6)
        entries.append(f"{src_url[:-5]}-{w}.webp {w}w")
    if not entries:
        return None
    entries.append(f"{src_url} {full_w}w")
    return ", ".join(entries)


def fix_figure(m, page: Path) -> str:
    """Body figures: lossless WebP copy of PNG/JPG charts, plus width/height.

    Without width/height a lazy image is 0x0 until it loads, so every one of
    them counts as "near the viewport" and downloads straight away, competing
    with the hero. The CSS (.article-figure img) sets width:100%; height:auto,
    so the attributes only reserve space and never stretch the image.
    """
    head, tag = m.group(1), m.group(2)
    if re.search(r'\bwidth="', tag):
        return m.group(0)
    src = re.search(r'\bsrc="([^"]+)"', tag)
    if not src or "://" in src.group(1):
        return m.group(0)
    url = src.group(1)
    path = (ROOT / url.lstrip("/")) if url.startswith("/") else (page.parent / url)
    if not path.exists() or path.suffix.lower() not in (".png", ".jpg", ".jpeg", ".webp"):
        return m.group(0)
    with Image.open(path) as im:
        w, h = im.size
        if path.suffix.lower() != ".webp":
            out = path.with_suffix(".webp")
            if not out.exists():
                lossless = path.suffix.lower() == ".png"
                im.save(out, "WEBP", lossless=lossless, quality=100 if lossless else 82, method=6)
            if out.stat().st_size < path.stat().st_size:
                url = url[: -len(path.suffix)] + ".webp"
    tag = tag[:src.start()] + f'src="{url}" width="{w}" height="{h}"' + tag[src.end():]
    return head + tag


FIGURE_IMG_RE = re.compile(r'(<figure class="article-figure">\s*)(<img\b[^>]*>)')


def process(page: Path) -> bool:
    html = page.read_bytes().decode("utf-8")

    def fix(m):
        tag = m.group(0)
        if "srcset=" in tag:
            return tag
        src = re.search(r'\bsrc="([^"]+)"', tag)
        srcset = variants_for(src.group(1)) if src else None
        if not srcset:
            return tag
        extra = f' srcset="{srcset}" sizes="{SIZES[m.group(1)]}"'
        return tag[:src.end()] + extra + tag[src.end():]

    new = IMG_RE.sub(fix, html)
    new = FIGURE_IMG_RE.sub(lambda m: fix_figure(m, page), new)
    if new != html:
        page.write_bytes(new.encode("utf-8"))
        return True
    return False


def main(argv):
    pages = [Path(p) for p in argv] or sorted(ROOT.glob("articles/**/index.html"))
    changed = [p for p in pages if process(p)]
    for p in changed:
        print("updated", p.relative_to(ROOT))
    print(f"{len(changed)} page(s) updated")


if __name__ == "__main__":
    main(sys.argv[1:])
