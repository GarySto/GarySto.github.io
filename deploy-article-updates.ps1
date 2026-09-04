<#
deploy-article-updates.ps1

Moves every file you just downloaded from Downloads into its correct
location in the repo, renaming as needed, creating new folders where
required, then commits and pushes everything in one go.

BEFORE RUNNING: make sure all of these are sitting in your Downloads
folder, with their original names untouched:
    7-clarity-ai-visibility-index.html
    8-local-ai-assistant-index.html
    9-colleague-dared-index.html
    10-digital-marketing-ai-index.html
    11-thriving-neurodiverse-index.html
    12-type1-diabetes-index.html
    13-why-change-index.html
    14-articles-index.html
    15-sitemap.xml

USAGE:
    cd C:\Projects\Business\GarySto.github.io
    Unblock-File .\deploy-article-updates.ps1
    .\deploy-article-updates.ps1
#>

$ErrorActionPreference = "Stop"
$downloads = "$env:USERPROFILE\Downloads"

if (-not (Test-Path ".git")) {
    Write-Host "This folder isn't a git repo. Run this from inside GarySto.github.io." -ForegroundColor Red
    exit 1
}

# Map: downloaded filename -> destination path (relative to repo root)
$fileMap = @{
    "7-clarity-ai-visibility-index.html"  = "articles\understanding-microsoft-clarity-ai-visibility\index.html"
    "8-local-ai-assistant-index.html"     = "articles\build-your-own-local-ai-assistant\index.html"
    "9-colleague-dared-index.html"        = "articles\colleague-dared-me-to-build-something\index.html"
    "10-digital-marketing-ai-index.html"  = "articles\digital-marketing-and-ai-collaboration\index.html"
    "11-thriving-neurodiverse-index.html" = "articles\thriving-in-tech-neurodiverse-brain\index.html"
    "12-type1-diabetes-index.html"        = "articles\type-1-diabetes-shaped-my-ppc-career\index.html"
    "13-why-change-index.html"            = "articles\why-change-feels-so-hard\index.html"
    "14-articles-index.html"              = "articles\index.html"
    "15-sitemap.xml"                      = "sitemap.xml"
}

$missing = @()
$moved = @()

foreach ($sourceName in $fileMap.Keys) {
    $sourcePath = Join-Path $downloads $sourceName
    $destPath = $fileMap[$sourceName]

    if (-not (Test-Path $sourcePath)) {
        $missing += $sourceName
        continue
    }

    $destDir = Split-Path $destPath -Parent
    if ($destDir -and -not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        Write-Host "Created folder: $destDir" -ForegroundColor Cyan
    }

    Copy-Item -Path $sourcePath -Destination $destPath -Force
    $moved += "$sourceName -> $destPath"
}

Write-Host ""
if ($moved.Count -gt 0) {
    Write-Host "Moved:" -ForegroundColor Green
    $moved | ForEach-Object { Write-Host "  $_" }
}
if ($missing.Count -gt 0) {
    Write-Host ""
    Write-Host "NOT FOUND in Downloads (skipped):" -ForegroundColor Yellow
    $missing | ForEach-Object { Write-Host "  $_" }
}

# Reminder about the image this run can't handle
$imgDir = "articles\understanding-microsoft-clarity-ai-visibility"
if (-not (Test-Path "$imgDir\understanding-microsoft-clarity-ai-visibility.png")) {
    Write-Host ""
    Write-Host "REMINDER: generate a hero image via Copilot and save it as:" -ForegroundColor Yellow
    Write-Host "  $imgDir\understanding-microsoft-clarity-ai-visibility.png" -ForegroundColor Yellow
}

# ---------------------------------------------------------------
# Commit and push
# ---------------------------------------------------------------
Write-Host ""
Write-Host "Current changes:" -ForegroundColor Cyan
git status --short

$changes = git status --short
if (-not $changes) {
    Write-Host ""
    Write-Host "No changes to push." -ForegroundColor Yellow
    exit 0
}

git add .
git commit -m "Add Clarity AI Visibility article, nav consistency fix across articles, cross-links, sitemap update"
git push

Write-Host ""
Write-Host "Done. Should be live within a minute or two." -ForegroundColor Green
Write-Host "Don't forget the hero image reminder above if it applies, and submit the new article via Bing URL Submission / IndexNow once it's live." -ForegroundColor Cyan
