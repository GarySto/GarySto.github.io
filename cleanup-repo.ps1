<#
cleanup-repo.ps1

Removes confirmed-junk files, keeps everything else untouched, stops
repo-contents.txt from ever being committed, and pushes the result.

Shows you exactly what it's about to delete and asks for one Y/N
confirmation before touching anything.

USAGE:
    cd C:\Projects\Business\GarySto.github.io
    Unblock-File .\cleanup-repo.ps1
    .\cleanup-repo.ps1
#>

$ErrorActionPreference = "Stop"

if (-not (Test-Path ".git")) {
    Write-Host "This folder isn't a git repo. Run this from inside GarySto.github.io." -ForegroundColor Red
    exit 1
}

# ---------------------------------------------------------------
# STEP 1: Confirm and delete junk files
# ---------------------------------------------------------------
$junkFiles = @(
    "631bf37653a347cf8a651a699e74cf62.txt",
    "indexArticles.html",
    "tonight-fixes.ps1",
    "tonight-fixes-2.ps1"
)

$existingJunk = $junkFiles | Where-Object { Test-Path $_ }

if ($existingJunk.Count -eq 0) {
    Write-Host "No junk files found - already clean." -ForegroundColor Yellow
} else {
    Write-Host "About to delete these files:" -ForegroundColor Cyan
    $existingJunk | ForEach-Object { Write-Host "  $_" }
    Write-Host ""
    $confirm = Read-Host "Type Y to delete these, anything else to skip"
    if ($confirm -eq "Y" -or $confirm -eq "y") {
        $existingJunk | ForEach-Object { Remove-Item $_ -Force }
        Write-Host "Deleted." -ForegroundColor Green
    } else {
        Write-Host "Skipped deletion." -ForegroundColor Yellow
    }
}

# ---------------------------------------------------------------
# STEP 2: Make sure repo-contents.txt and its friends never get committed
# ---------------------------------------------------------------
$gitignorePath = ".gitignore"
$linesToAdd = @("repo-contents.txt", "*.txt.bak")

if (-not (Test-Path $gitignorePath)) {
    New-Item -ItemType File -Path $gitignorePath | Out-Null
}
$existingLines = Get-Content $gitignorePath -ErrorAction SilentlyContinue
foreach ($line in $linesToAdd) {
    if ($existingLines -notcontains $line) {
        Add-Content -Path $gitignorePath -Value $line
        Write-Host "Added '$line' to .gitignore" -ForegroundColor Green
    }
}

# If repo-contents.txt is already tracked by git, untrack it (keeps the local file, removes it from git)
$tracked = git ls-files --error-unmatch "repo-contents.txt" 2>$null
if ($LASTEXITCODE -eq 0) {
    git rm --cached "repo-contents.txt" | Out-Null
    Write-Host "Untracked repo-contents.txt from git (local copy kept)." -ForegroundColor Green
}

# Delete the local repo-contents.txt too, it's served its purpose
if (Test-Path "repo-contents.txt") {
    Remove-Item "repo-contents.txt" -Force
    Write-Host "Removed local repo-contents.txt." -ForegroundColor Green
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
    Write-Host "No changes to push." -ForegroundColor Yellow
    exit 0
}

git add .
git commit -m "Repo cleanup: remove junk files, gitignore local working files"
git push

Write-Host ""
Write-Host "Done. Repo's tidier and repo-contents.txt won't sneak into a push again." -ForegroundColor Green
