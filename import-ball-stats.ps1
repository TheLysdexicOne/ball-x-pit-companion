# Import ball stats from the completed JSON template back into balls.ts
# Run this after you've filled in all the stats in ball-stats-template.json

$templatePath = "c:\Projects\ball-x-pit-companion\ball-stats-template.json"
$ballsFilePath = "c:\Projects\ball-x-pit-companion\src\data\balls.ts"

# Check if template exists
if (-not (Test-Path $templatePath)) {
    Write-Host "Error: ball-stats-template.json not found!" -ForegroundColor Red
    Write-Host "Please run generate-ball-stats-template.ps1 first" -ForegroundColor Yellow
    exit 1
}

# Load the completed stats
Write-Host "Loading stats from $templatePath..." -ForegroundColor Cyan
$statsData = Get-Content $templatePath -Raw | ConvertFrom-Json

# Read the current balls.ts file
$ballsContent = Get-Content $ballsFilePath -Raw

Write-Host "Processing $($statsData.balls.Count) balls..." -ForegroundColor Cyan

$updatedCount = 0

foreach ($ballStats in $statsData.balls) {
    $ballId = $ballStats.id
    
    # Create the stats object in TypeScript format
    $statsTs = @"
    stats: {
      level1: {
"@
    
    # Add level 1 variables
    foreach ($prop in $ballStats.stats.level1.PSObject.Properties) {
        $value = $prop.Value
        $statsTs += "`n        $($prop.Name): $value,"
    }
    
    $statsTs += @"

      },
      level2: {
"@
    
    # Add level 2 variables
    foreach ($prop in $ballStats.stats.level2.PSObject.Properties) {
        $value = $prop.Value
        $statsTs += "`n        $($prop.Name): $value,"
    }
    
    $statsTs += @"

      },
      level3: {
"@
    
    # Add level 3 variables
    foreach ($prop in $ballStats.stats.level3.PSObject.Properties) {
        $value = $prop.Value
        $statsTs += "`n        $($prop.Name): $value,"
    }
    
    $statsTs += @"

      },
    },
"@
    
    # Find the ball in the file and check if it already has stats
    $ballPattern = "id:\s*[''`"]$ballId[''`"][\s\S]*?(?=(rarity:|},))"
    $ballMatch = [regex]::Match($ballsContent, $ballPattern)
    
    if ($ballMatch.Success) {
        $ballText = $ballMatch.Value
        
        # Check if stats already exist
        if ($ballText -match "stats:\s*\{") {
            # Replace existing stats
            $statsPattern = "stats:\s*\{[\s\S]*?\n\s*\},\s*\n"
            $ballsContent = $ballsContent -replace "($ballPattern)stats:\s*\{[\s\S]*?\n\s*\},\s*\n", "`$1$statsTs`n"
            Write-Host "  Updated existing stats for: $($ballStats.name)" -ForegroundColor Green
        } else {
            # Insert stats before rarity
            $insertPattern = "(id:\s*[''`"]$ballId[''`"][\s\S]*?)(rarity:)"
            $ballsContent = $ballsContent -replace $insertPattern, "`$1$statsTs`n    `$2"
            Write-Host "  Added new stats for: $($ballStats.name)" -ForegroundColor Yellow
        }
        
        $updatedCount++
    } else {
        Write-Host "  Warning: Could not find ball: $ballId" -ForegroundColor Red
    }
}

# Save the updated file
$ballsContent | Out-File $ballsFilePath -Encoding UTF8 -NoNewline

Write-Host "`n=== Import Complete ===" -ForegroundColor Cyan
Write-Host "Updated $updatedCount balls in balls.ts" -ForegroundColor Green
Write-Host "`nNext: Check balls.ts to verify the changes look correct" -ForegroundColor Yellow
