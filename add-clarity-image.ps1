<#
add-clarity-image.ps1

Moves the Clarity AI Visibility hero image from Downloads into its
article folder, then commits and pushes.

USAGE:
    cd C:\Projects\Business\GarySto.github.io
    Unblock-File .\add-clarity-image.ps1
    .\add-clarity-image.ps1
#>

$ErrorActionPreference = "Stop"
$downloads = "$env:USERPROFILE\Downloads"
$source = Join-Path $downloads "understanding-microsoft-clarity-ai-visibility.png"
$destDir = "articles\understanding-microsoft-clarity-ai-visibility"
$dest = Join-Path $destDir "understanding-microsoft-clarity-ai-visibility.png"

if (-not (Test-Path ".git")) {
    Write-Host "This folder isn't a git repo. Run this from inside GarySto.github.io." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $source)) {
    Write-Host "Couldn't find $source - check the filename in Downloads." -ForegroundColor Red
    exit 1
}

Copy-Item -Path $source -Destination $dest -Force
Write-Host "Moved image into $destDir" -ForegroundColor Green

git add .
git commit -m "Add hero image for Clarity AI Visibility article"
git push

Write-Host ""
Write-Host "Done." -ForegroundColor Green
