<#
cleanup-repo-v2.ps1

Finishes what cleanup-repo.ps1 started: removes the local repo-contents.txt
file and commits the .gitignore changes already made. Safe to run even
though junk files are already gone.

USAGE:
    cd C:\Projects\Business\GarySto.github.io
    Unblock-File .\cleanup-repo-v2.ps1
    .\cleanup-repo-v2.ps1
#>

$ErrorActionPreference = "Stop"

if (-not (Test-Path ".git")) {
    Write-Host "This folder isn't a git repo. Run this from inside GarySto.github.io." -ForegroundColor Red
    exit 1
}

# Check if repo-contents.txt is tracked by git (this version doesn't error if it isn't)
$trackedFiles = git ls-files "repo-contents.txt"
if ($trackedFiles) {
    git rm --cached "repo-contents.txt" | Out-Null
    Write-Host "Untracked repo-contents.txt from git." -ForegroundColor Green
} else {
    Write-Host "repo-contents.txt was never tracked by git - nothing to untrack." -ForegroundColor Yellow
}

if (Test-Path "repo-contents.txt") {
    Remove-Item "repo-contents.txt" -Force
    Write-Host "Removed local repo-contents.txt." -ForegroundColor Green
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
git commit -m "Repo cleanup: gitignore local working files"
git push

Write-Host ""
Write-Host "Done." -ForegroundColor Green
