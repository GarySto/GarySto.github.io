<#
tonight-fixes-2.ps1

Run this from inside C:\Projects\Business\GarySto.github.io

What it does:
  1. Renames Designer.png to the filename the article HTML actually expects.
  2. Reminds you where to put the new work/index.html and agents/index.html
     files (see comments below - you need to move them first).
  3. Commits and pushes.

USAGE:
    cd C:\Projects\Business\GarySto.github.io
    Unblock-File .\tonight-fixes-2.ps1
    .\tonight-fixes-2.ps1
#>

$ErrorActionPreference = "Stop"

if (-not (Test-Path ".git")) {
    Write-Host "This folder isn't a git repo. Run this from inside GarySto.github.io." -ForegroundColor Red
    exit 1
}

# ---------------------------------------------------------------
# STEP 1: Fix the Designer.png / website-seo-and-llm-readiness.png mismatch
# ---------------------------------------------------------------
$articleDir = ".\articles\website-seo-and-llm-readiness"
$wrongName = "$articleDir\Designer.png"
$rightName = "$articleDir\website-seo-and-llm-readiness.png"

if (Test-Path $wrongName) {
    Rename-Item -Path $wrongName -NewName "website-seo-and-llm-readiness.png"
    Write-Host "Renamed Designer.png -> website-seo-and-llm-readiness.png" -ForegroundColor Green
} elseif (Test-Path $rightName) {
    Write-Host "Image already correctly named - skipping." -ForegroundColor Yellow
} else {
    Write-Host "Couldn't find either filename in $articleDir - check it manually." -ForegroundColor Red
}

# ---------------------------------------------------------------
# STEP 2: Work page split
# ---------------------------------------------------------------
# Before running this script:
#   - Download 3-work-index.html, rename to index.html,
#     REPLACE the existing file at: work\index.html
#   - Download 4-agents-index.html, rename to index.html,
#     put it in a NEW folder: agents\index.html

if (-not (Test-Path ".\agents\index.html")) {
    Write-Host ""
    Write-Host "REMINDER: agents\index.html isn't there yet." -ForegroundColor Yellow
    Write-Host "Create the 'agents' folder and drop the renamed file in, then re-run this script." -ForegroundColor Yellow
}

# ---------------------------------------------------------------
# STEP 3: Commit and push
# ---------------------------------------------------------------
Write-Host ""
Write-Host "Current changes:" -ForegroundColor Cyan
git status --short

$changes = git status --short
if (-not $changes) {
    Write-Host ""
    Write-Host "No changes detected. Nothing to push." -ForegroundColor Yellow
    exit 0
}

git add .
git commit -m "Fix article image filename, split Work page into Work + AI & Agents"
git push

Write-Host ""
Write-Host "Done. Should be live within a minute or two." -ForegroundColor Green
Write-Host "Once live, add /agents/ to sitemap.xml and llms.txt, and add an 'AI & Agents' nav link on the homepage too." -ForegroundColor Cyan
