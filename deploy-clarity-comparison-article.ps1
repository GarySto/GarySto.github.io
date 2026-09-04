<#
deploy-clarity-comparison-article.ps1

Creates the new article folder, moves the 3 downloaded files into place,
and pushes.

BEFORE RUNNING: make sure these are in your Downloads folder:
    19-clarity-vs-ga4-bing-index.html
    20-articles-index.html
    21-sitemap.xml
And generate a hero image via Copilot, save it in Downloads as:
    clarity-vs-ga4-vs-bing-webmaster-tools.png
(the script will remind you if it's missing but won't block on it)

USAGE:
    cd C:\Projects\Business\GarySto.github.io
    Unblock-File .\deploy-clarity-comparison-article.ps1
    .\deploy-clarity-comparison-article.ps1
#>

$ErrorActionPreference = "Stop"
$downloads = "$env:USERPROFILE\Downloads"

if (-not (Test-Path ".git")) {
    Write-Host "This folder isn't a git repo. Run this from inside GarySto.github.io." -ForegroundColor Red
    exit 1
}

$articleDir = "articles\clarity-vs-ga4-vs-bing-webmaster-tools"
if (-not (Test-Path $articleDir)) {
    New-Item -ItemType Directory -Path $articleDir -Force | Out-Null
    Write-Host "Created folder: $articleDir" -ForegroundColor Cyan
}

$fileMap = @{
    "19-clarity-vs-ga4-bing-index.html" = "$articleDir\index.html"
    "20-articles-index.html"            = "articles\index.html"
    "21-sitemap.xml"                    = "sitemap.xml"
}

$missing = @()
foreach ($sourceName in $fileMap.Keys) {
    $sourcePath = Join-Path $downloads $sourceName
    $destPath = $fileMap[$sourceName]

    if (-not (Test-Path $sourcePath)) {
        $missing += $sourceName
        continue
    }

    Copy-Item -Path $sourcePath -Destination $destPath -Force
    Write-Host "Updated: $destPath" -ForegroundColor Green
}

# Image (optional at this point)
$imgSource = Join-Path $downloads "clarity-vs-ga4-vs-bing-webmaster-tools.png"
if (Test-Path $imgSource) {
    Copy-Item -Path $imgSource -Destination "$articleDir\clarity-vs-ga4-vs-bing-webmaster-tools.png" -Force
    Write-Host "Added hero image." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "REMINDER: no hero image found in Downloads yet. Generate one via Copilot and re-run this script, or add it manually to:" -ForegroundColor Yellow
    Write-Host "  $articleDir\clarity-vs-ga4-vs-bing-webmaster-tools.png" -ForegroundColor Yellow
}

if ($missing.Count -gt 0) {
    Write-Host ""
    Write-Host "NOT FOUND in Downloads (skipped):" -ForegroundColor Yellow
    $missing | ForEach-Object { Write-Host "  $_" }
}

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
git commit -m "Add Clarity vs GA4 vs Bing Webmaster Tools article with FAQ schema"
git push

Write-Host ""
Write-Host "Done." -ForegroundColor Green
