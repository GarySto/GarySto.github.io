<#
add-contact-bands.ps1

Moves the 3 updated article files from Downloads into place (each now
has the dark contact-band CTA before the footer) and pushes.

BEFORE RUNNING: make sure these are in your Downloads folder:
    16-local-ai-assistant-index.html
    17-website-seo-llm-readiness-index.html
    18-clarity-ai-visibility-index.html

USAGE:
    cd C:\Projects\Business\GarySto.github.io
    Unblock-File .\add-contact-bands.ps1
    .\add-contact-bands.ps1
#>

$ErrorActionPreference = "Stop"
$downloads = "$env:USERPROFILE\Downloads"

if (-not (Test-Path ".git")) {
    Write-Host "This folder isn't a git repo. Run this from inside GarySto.github.io." -ForegroundColor Red
    exit 1
}

$fileMap = @{
    "16-local-ai-assistant-index.html"     = "articles\build-your-own-local-ai-assistant\index.html"
    "17-website-seo-llm-readiness-index.html" = "articles\website-seo-and-llm-readiness\index.html"
    "18-clarity-ai-visibility-index.html"  = "articles\understanding-microsoft-clarity-ai-visibility\index.html"
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
git commit -m "Add missing contact-band CTA to last 3 articles"
git push

Write-Host ""
Write-Host "Done." -ForegroundColor Green
