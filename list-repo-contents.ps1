<#
list-repo-contents.ps1

READ-ONLY. Deletes nothing. Lists every file in the repo with its size and
last-modified date, so you can paste the output back to Claude and get a
"safe to delete" list before anything is actually removed.

USAGE:
    cd C:\Projects\Business\GarySto.github.io
    Unblock-File .\list-repo-contents.ps1
    .\list-repo-contents.ps1
#>

Get-ChildItem -Recurse -File |
    Where-Object { $_.FullName -notmatch '\\\.git\\' } |
    Select-Object @{N='Path';E={$_.FullName.Replace((Get-Location).Path + '\','')}}, `
                  @{N='SizeKB';E={[math]::Round($_.Length/1KB,1)}}, `
                  LastWriteTime |
    Sort-Object Path |
    Format-Table -AutoSize |
    Out-String -Width 200 |
    Tee-Object -FilePath "repo-contents.txt"

Write-Host ""
Write-Host "Full listing saved to repo-contents.txt in this folder too." -ForegroundColor Cyan
Write-Host "Paste the output above (or that file's contents) back to Claude for a cleanup review." -ForegroundColor Cyan
