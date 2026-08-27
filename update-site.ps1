<#
update-site.ps1

Run this from inside C:\Projects\Business\GarySto.github.io whenever
you've added, edited, or dropped new files into the repo and want to
push them live.

Usage:
    cd C:\Projects\Business\GarySto.github.io
    .\update-site.ps1 -CommitMessage "Add IndexNow verification key"

If you don't pass -CommitMessage, it will ask you for one.
#>

param(
    [string]$CommitMessage
)

$ErrorActionPreference = "Stop"

# Make sure we're actually inside a git repo before doing anything
if (-not (Test-Path ".git")) {
    Write-Host "This folder isn't a git repo (no .git folder found here)." -ForegroundColor Red
    Write-Host "Make sure you're in C:\Projects\Business\GarySto.github.io before running this." -ForegroundColor Red
    exit 1
}

# Show what's changed so you can eyeball it before committing
Write-Host ""
Write-Host "Current changes:" -ForegroundColor Cyan
git status --short

# Bail out early if there's nothing to do
$changes = git status --short
if (-not $changes) {
    Write-Host ""
    Write-Host "No changes detected. Nothing to push." -ForegroundColor Yellow
    exit 0
}

# Ask for a commit message if one wasn't passed in
if (-not $CommitMessage) {
    Write-Host ""
    $CommitMessage = Read-Host "Enter a short commit message"
}
if (-not $CommitMessage) {
    $CommitMessage = "Update site"
}

Write-Host ""
Write-Host "Staging all changes..." -ForegroundColor Cyan
git add .

Write-Host "Committing: $CommitMessage" -ForegroundColor Cyan
git commit -m "$CommitMessage"

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push

Write-Host ""
Write-Host "Done. Changes should appear on garystow.co.uk within a minute or two." -ForegroundColor Green
