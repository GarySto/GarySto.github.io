<#
tonight-fixes.ps1

Run this from inside C:\Projects\Business\GarySto.github.io

What it does:
  1. Fixes the broken hero image path on the "build-your-own-local-ai-assistant"
     article (src was pointing to /assets/articles/... but the file actually
     lives inside the article's own folder).
  2. Creates the new "website-seo-and-llm-readiness" article folder and drops
     the new index.html into it (you need to move the downloaded file there
     first - see step 2 below).
  3. Commits and pushes everything live.

USAGE:
    cd C:\Projects\Business\GarySto.github.io
    Unblock-File .\tonight-fixes.ps1
    .\tonight-fixes.ps1
#>

$ErrorActionPreference = "Stop"

if (-not (Test-Path ".git")) {
    Write-Host "This folder isn't a git repo. Run this from inside GarySto.github.io." -ForegroundColor Red
    exit 1
}

# ---------------------------------------------------------------
# STEP 1: Fix the broken hero image path
# ---------------------------------------------------------------
$brokenArticle = ".\articles\build-your-own-local-ai-assistant\index.html"

if (Test-Path $brokenArticle) {
    Write-Host "Fixing hero image path in build-your-own-local-ai-assistant..." -ForegroundColor Cyan
    $content = Get-Content $brokenArticle -Raw
    $old = "/assets/articles/build-your-own-local-ai-assistant.png"
    $new = "/articles/build-your-own-local-ai-assistant/build-your-own-local-ai-assistant.png"
    if ($content -match [regex]::Escape($old)) {
        $content = $content -replace [regex]::Escape($old), $new
        Set-Content -Path $brokenArticle -Value $content -NoNewline
        Write-Host "  Fixed." -ForegroundColor Green
    } else {
        Write-Host "  Didn't find the old path - it may already be fixed. Skipping." -ForegroundColor Yellow
    }
} else {
    Write-Host "Couldn't find $brokenArticle - skipping image fix." -ForegroundColor Yellow
}

# ---------------------------------------------------------------
# STEP 2: Move the new article into place
# ---------------------------------------------------------------
# Before running this script:
#   - Download 2-website-seo-llm-readiness-index.html from Claude
#   - Rename it to index.html
#   - Put it in: articles\website-seo-and-llm-readiness\index.html
#   - Generate a hero image via Copilot and save it as:
#     articles\website-seo-and-llm-readiness\website-seo-and-llm-readiness.png

$newArticleDir = ".\articles\website-seo-and-llm-readiness"
if (-not (Test-Path $newArticleDir)) {
    New-Item -ItemType Directory -Path $newArticleDir | Out-Null
    Write-Host "Created folder: $newArticleDir" -ForegroundColor Cyan
}

if (-not (Test-Path "$newArticleDir\index.html")) {
    Write-Host ""
    Write-Host "REMINDER: index.html isn't in $newArticleDir yet." -ForegroundColor Yellow
    Write-Host "Drop the renamed file in there (and the hero image) before pushing, or re-run this script after." -ForegroundColor Yellow
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
git commit -m "Fix hero image path, add website-seo-and-llm-readiness article"
git push

Write-Host ""
Write-Host "Done. Should be live at garystow.co.uk within a minute or two." -ForegroundColor Green
Write-Host "Don't forget to submit the new article URL via IndexNow / Bing URL Submission once it's live." -ForegroundColor Cyan
