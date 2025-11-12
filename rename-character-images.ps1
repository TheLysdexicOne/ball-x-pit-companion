# PowerShell script to rename hero/character images to match slugs

# Read the JSON data
$jsonPath = ".\data\latest\characters_data.json"
$charactersData = Get-Content $jsonPath -Raw | ConvertFrom-Json

# Get playable characters (exclude ???)
$characters = $charactersData | Where-Object { $_.Name -ne "???" }

# Manual mapping of current hero IDs to character slugs
$heroIdToSlug = @{
    'warrior' = 'char_default'
    'repentant' = 'char_recaller'
    'itchy-finger' = 'char_itchyfinger'
    'cohabitants' = 'char_x2'
    'embedded' = 'char_x1'
    'cogitator' = 'char_laservert'
    'empty-nester' = 'char_eggsac'
    'shade' = 'char_vampire'
    'shieldbearer' = 'char_poison'
    'spendthrift' = 'char_wind'
    'flagellant' = 'char_ghost'
    'juggler' = 'char_dark'
    'physicist' = 'char_broodmother'
    'tactician' = 'char_light'
    'makeshift-sysiphus' = 'char_earthquake'
    'radical' = 'char_lightning'
}

Write-Host "=== Renaming Character Images ===" -ForegroundColor Cyan
Write-Host ""

# Rename portrait images
$portraitDir = ".\public\images\heroes\portrait"
Write-Host "Processing portraits..." -ForegroundColor Yellow

foreach ($heroId in $heroIdToSlug.Keys) {
    $slug = $heroIdToSlug[$heroId]
    $oldFile = "$portraitDir\$heroId.png"
    $newFile = "$portraitDir\$slug.png"
    
    if (Test-Path $oldFile) {
        Write-Host "  $heroId.png -> $slug.png" -ForegroundColor Green
        Rename-Item -Path $oldFile -NewName "$slug.png"
    } else {
        Write-Host "  Missing: $heroId.png" -ForegroundColor Red
    }
}

Write-Host ""

# Rename sprite images
$spriteDir = ".\public\images\heroes\sprite"
Write-Host "Processing sprites..." -ForegroundColor Yellow

foreach ($heroId in $heroIdToSlug.Keys) {
    $slug = $heroIdToSlug[$heroId]
    $oldFile = "$spriteDir\$heroId.png"
    $newFile = "$spriteDir\$slug.png"
    
    if (Test-Path $oldFile) {
        Write-Host "  $heroId.png -> $slug.png" -ForegroundColor Green
        Rename-Item -Path $oldFile -NewName "$slug.png"
    } else {
        Write-Host "  Missing: $heroId.png" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Renaming Directories ===" -ForegroundColor Cyan

# Rename heroes directory to characters
if (Test-Path ".\public\images\heroes") {
    Write-Host "Renaming: heroes -> characters" -ForegroundColor Green
    Rename-Item -Path ".\public\images\heroes" -NewName "characters"
} else {
    Write-Host "Directory 'heroes' not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "Complete!" -ForegroundColor Cyan
