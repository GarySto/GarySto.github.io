#!/usr/bin/env python3
"""
update_sitemap_lastmod.py

Stamps each <url> entry in sitemap.xml with a <lastmod> date reflecting
when its page was actually last changed (git last-commit date, falling
back to file mtime for untracked files).

Why this exists: Bing leans much more heavily on sitemap <lastmod> than
Google does to decide what's worth re-crawling and when (Google mostly
figures that out itself from HTTP headers and its own revisit signals).
A sitemap with no <lastmod> at all gives Bing nothing to prioritise on,
so it ends up discovering changes on its own slower schedule — showing
up as fewer / stale impressions for brand queries in Bing Webmaster
Tools versus Search Console, even though both are crawling the same
pages. Re-run this (or let update-site.ps1 call it) any time pages
change, so the dates stay honest.

Does not touch visible page content — sitemap.xml is not rendered.
"""
from __future__ import annotations

import re
import subprocess
from datetime import date, datetime
from pathlib import Path
from urllib.parse import urlsplit

SITE_ROOT = Path(__file__).resolve().parent
SITEMAP_PATH = SITE_ROOT / "sitemap.xml"
SITE_HOST = "garystow.co.uk"

URL_BLOCK_RE = re.compile(r"<url>\s*(.*?)\s*</url>", re.DOTALL)
LOC_RE = re.compile(r"<loc>\s*(.*?)\s*</loc>")
LASTMOD_RE = re.compile(r"<lastmod>\s*(.*?)\s*</lastmod>")


def loc_to_file(loc: str) -> Path | None:
    path = urlsplit(loc).path
    if not path or path == "/":
        return SITE_ROOT / "index.html"
    if path.endswith("/"):
        return SITE_ROOT / path.strip("/") / "index.html"
    return SITE_ROOT / path.lstrip("/")


def last_modified_date(file_path: Path) -> str | None:
    if not file_path.exists():
        return None
    try:
        result = subprocess.run(
            ["git", "log", "-1", "--format=%ad", "--date=short", "--", str(file_path)],
            cwd=SITE_ROOT,
            capture_output=True,
            text=True,
            check=True,
        )
        tracked_date = result.stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        tracked_date = ""

    if tracked_date:
        return tracked_date

    return datetime.fromtimestamp(file_path.stat().st_mtime).date().isoformat()


def update_block(match: re.Match) -> str:
    block = match.group(1)
    loc_match = LOC_RE.search(block)
    if not loc_match:
        return match.group(0)

    loc = loc_match.group(1)
    if SITE_HOST not in loc:
        return match.group(0)

    file_path = loc_to_file(loc)
    lastmod = last_modified_date(file_path) if file_path else None
    if not lastmod:
        lastmod = date.today().isoformat()

    if LASTMOD_RE.search(block):
        new_block = LASTMOD_RE.sub(f"<lastmod>{lastmod}</lastmod>", block)
    else:
        new_block = LOC_RE.sub(lambda m: f"{m.group(0)}\n    <lastmod>{lastmod}</lastmod>", block, count=1)

    return f"<url>\n    {new_block}\n  </url>"


def main() -> None:
    content = SITEMAP_PATH.read_text(encoding="utf-8")
    updated = URL_BLOCK_RE.sub(update_block, content)
    if updated != content:
        SITEMAP_PATH.write_text(updated, encoding="utf-8")
        print("sitemap.xml lastmod dates updated.")
    else:
        print("sitemap.xml lastmod dates already current.")


if __name__ == "__main__":
    main()
