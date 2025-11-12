# PowerShell script to validate building icons match slugs in buildings_data.json

# Read the JSON data
$jsonPath = ".\data\latest\buildings_data.json"
$buildingsData = Get-Content $jsonPath -Raw | ConvertFrom-Json

# Get all PNG files in buildings directory
$buildingsDir = ".\public\images\buildings"
$existingFiles = Get-ChildItem -Path $buildingsDir -Filter "*.png" | ForEach-Object { $_.BaseName }

Write-Host "=== Building Icon Validation ===" -ForegroundColor Cyan
Write-Host ""

# Check each building in the JSON
$missingIcons = @()
$foundIcons = @()

foreach ($building in $buildingsData) {
    if ($building.Name -eq "???") {
        continue
    }
    
    $slug = $building.Slug
    $name = $building.Name
    
    if ($existingFiles -contains $slug) {
        $foundIcons += $slug
    } else {
        $missingIcons += [PSCustomObject]@{
            Name = $name
            Slug = $slug
        }
    }
}

# Report results
$totalBuildings = ($buildingsData | Where-Object { $_.Name -ne "???" }).Count
Write-Host "Total buildings in JSON: $totalBuildings" -ForegroundColor White
Write-Host "Icons found: $($foundIcons.Count)" -ForegroundColor Green
Write-Host "Icons missing: $($missingIcons.Count)" -ForegroundColor $(if ($missingIcons.Count -gt 0) { 'Red' } else { 'Green' })
Write-Host ""

if ($missingIcons.Count -gt 0) {
    Write-Host "Missing icons:" -ForegroundColor Red
    foreach ($missing in $missingIcons) {
        Write-Host "  - $($missing.Name) ($($missing.Slug))" -ForegroundColor Yellow
    }
    Write-Host ""
}

# Check for extra files (icons without matching slugs)
$allSlugs = $buildingsData | Where-Object { $_.Name -ne "???" } | ForEach-Object { $_.Slug }
$extraFiles = $existingFiles | Where-Object { $_ -notin $allSlugs }

if ($extraFiles.Count -gt 0) {
    Write-Host "Extra icon files (not in JSON):" -ForegroundColor Yellow
    foreach ($extra in $extraFiles) {
        Write-Host "  - $extra.png" -ForegroundColor Gray
    }
    Write-Host ""
}

# Summary
if ($missingIcons.Count -eq 0 -and $extraFiles.Count -eq 0) {
    Write-Host "✓ Validation passed! All icons match." -ForegroundColor Green
} else {
    Write-Host "✗ Validation issues found." -ForegroundColor Red
}
