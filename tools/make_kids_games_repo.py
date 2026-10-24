"""Build the public GarySto/kids-games repository from the site's kids-games folder.

Run from the site folder:   py tools\\make_kids_games_repo.py C:\\Projects\\kids-games
It copies the games, strips Gary's analytics and site-only links, and adds the README and licence.
Re-run it whenever the games change, then commit and push in the kids-games folder.
"""
import re, shutil, sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
SRC, EXTRA = SITE / "kids-games", SITE / "tools" / "kids-games-repo"
DEST = Path(sys.argv[1] if len(sys.argv) > 1 else SITE.parent / "kids-games").resolve()
if DEST == SRC or SITE in DEST.parents:
    sys.exit("Choose a folder outside the website, for example C:\\Projects\\kids-games")

def clean_html(html, depth):
    up = "../" * depth
    html = html.replace("\r\n", "\n")
    html = re.sub(r"\n<!-- Google tag \(gtag\.js\) -->.*?(?=\n</body>)", "", html, flags=re.S)   # GA, Clarity, UET
    html = re.sub(r'<link rel="canonical"[^>]*>\n?', "", html)
    html = re.sub(r'<meta property="og:url"[^>]*>\n?', "", html)
    html = re.sub(r'<!-- PAGE: [^>]*-->\n?', "", html)
    html = re.sub(r'href="/assets/favicon-[^"]*"', f'href="{up}icon-192.png"', html)
    html = html.replace('href="/kids-games/manifest.webmanifest"', f'href="{up}manifest.webmanifest"')
    for g in ("seek", "pegs", "paint"):
        html = html.replace(f'href="/kids-games/{g}/"', f'href="{up}{g}/index.html"')
    html = html.replace('href="/kids-games/"', f'href="{up}index.html"').replace('location.href = "/kids-games/"', f'location.href = "{up}index.html"')
    for path in ("/work/#play", "/village/", "/privacy/"):
        html = html.replace(f'href="{path}"', f'href="https://garystow.co.uk{path}"')
    html = html.replace('href="/"', 'href="https://garystow.co.uk/"')
    return html

if DEST.exists():
    for item in DEST.iterdir():          # keep the .git folder, replace everything else
        if item.name == ".git": continue
        shutil.rmtree(item) if item.is_dir() else item.unlink()
else:
    DEST.mkdir(parents=True)

for f in SRC.rglob("*"):
    if f.is_dir(): continue
    rel = f.relative_to(SRC); out = DEST / rel; out.parent.mkdir(parents=True, exist_ok=True)
    if f.suffix == ".html":
        out.write_text(clean_html(f.read_text(encoding="utf-8"), len(rel.parts) - 1), encoding="utf-8", newline="\n")
    else:
        shutil.copy2(f, out)

# the offline helper and app file must work from any address, not just /kids-games/
sj = DEST / "shared.js"
t = sj.read_text(encoding="utf-8")
old = 'addEventListener("load", () => { navigator.serviceWorker.register("/kids-games/sw.js", { scope: "/kids-games/" }).catch(() => {}); });'
assert old in t, "service worker line in shared.js has changed"
t = t.replace(old, 'const swUrl = new URL("sw.js", document.currentScript.src); addEventListener("load", () => { navigator.serviceWorker.register(swUrl).catch(() => {}); });')
sj.write_text(t, encoding="utf-8", newline="\n")
sw = DEST / "sw.js"
t = sw.read_text(encoding="utf-8")
t = t.replace('url.pathname.startsWith("/kids-games/") || url.pathname.startsWith("/assets/")', 'url.pathname.startsWith(new URL(self.registration.scope).pathname)')
t = t.replace('caches.match("/kids-games/")', 'caches.match("./")').replace(', "/assets/favicon-32.png"', '').replace('"/kids-games/', '"./')
sw.write_text(t, encoding="utf-8", newline="\n")
mf = DEST / "manifest.webmanifest"
mf.write_text(mf.read_text(encoding="utf-8").replace('"/kids-games/', '"./'), encoding="utf-8", newline="\n")

for f in EXTRA.iterdir(): shutil.copy2(f, DEST / f.name)
shutil.copy2(DEST / "screens" / "seek-your-family.jpg", DEST / "screenshot.jpg")
(DEST / ".nojekyll").write_text("")
print(f"Kids Games repo ready in {DEST}")
