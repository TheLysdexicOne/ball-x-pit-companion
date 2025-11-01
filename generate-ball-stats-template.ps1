$basePath = "c:\Projects\ball-x-pit-companion\Balls"
# Generate a template file for filling in ball stats
# This creates a JSON file with all balls and their variables extracted from descriptions

$outputPath = "c:\Projects\ball-x-pit-companion\ball-stats-template.json"

# Read the balls.ts file
$ballsFile = Get-Content "c:\Projects\ball-x-pit-companion\src\data\balls.ts" -Raw

# Extract all ball objects with multiline descriptions
$ballPattern = '(?s)id:\s*[''"]([^''"]+)[''"][^}]*?name:\s*[''"]([^''"]+)[''"][^}]*?slug:\s*[''"]([^''"]+)[''"][^}]*?description:[^''"`]*[''"`]([^''"`]+)[''"`]'

$matches = [regex]::Matches($ballsFile, $ballPattern)

$template = @{
    instructions = "Fill in the stats for each ball at each level. Variables are extracted from the description text."
    balls = @()
}

foreach ($match in $matches) {
    $id = $match.Groups[1].Value
    $name = $match.Groups[2].Value
    $slug = $match.Groups[3].Value
    $description = $match.Groups[4].Value
    
    # Extract variables from description
    $varPattern = '\{\[([^\]]+)\]\}'
    $varMatches = [regex]::Matches($description, $varPattern)
    $variables = @()
    
    foreach ($varMatch in $varMatches) {
        $varName = $varMatch.Groups[1].Value
        if ($variables -notcontains $varName) {
            $variables += $varName
        }
    }
    
    # Skip if no variables
    if ($variables.Count -eq 0) {
        continue
    }
    
    # Create template object
    $ballTemplate = [ordered]@{
        id = $id
        name = $name
        slug = $slug
        variables = $variables
        stats = [ordered]@{
            level1 = [ordered]@{}
            level2 = [ordered]@{}
            level3 = [ordered]@{}
        }
    }
    
    # Add placeholder values for each variable
    foreach ($var in $variables) {
        $ballTemplate.stats.level1[$var] = 0
        $ballTemplate.stats.level2[$var] = 0
        $ballTemplate.stats.level3[$var] = 0
    }
    
    $template.balls += $ballTemplate
}

# Save to JSON with proper formatting
$jsonOutput = $template | ConvertTo-Json -Depth 10
$jsonOutput | Out-File $outputPath -Encoding UTF8

Write-Host "`n=== Ball Stats Template Generated ===" -ForegroundColor Cyan
Write-Host "Output file: $outputPath" -ForegroundColor Green
Write-Host "Found $($template.balls.Count) balls with variables" -ForegroundColor Cyan
Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Open ball-stats-template.json in your editor" -ForegroundColor White
Write-Host "2. Replace the 0 values with actual numbers from the game" -ForegroundColor White
Write-Host "3. Save the file when done" -ForegroundColor White
Write-Host "4. Run the import script to update balls.ts" -ForegroundColor White
Write-Host "`nVariable Naming Conventions:" -ForegroundColor Yellow
Write-Host "  *_amt       = Amount/count (e.g., bleed_amt: 2 stacks)" -ForegroundColor Gray
Write-Host "  *_max_*     = Maximum value (e.g., bleed_max_stacks: 10)" -ForegroundColor Gray
Write-Host "  min_*       = Minimum damage/value" -ForegroundColor Gray
Write-Host "  max_*       = Maximum damage/value" -ForegroundColor Gray
Write-Host "  *_pct       = Percentage (use whole numbers: 50 = 50%)" -ForegroundColor Gray
Write-Host "  *_length    = Duration in seconds" -ForegroundColor Gray
Write-Host "  *_chance    = Probability percentage" -ForegroundColor Gray
Write-Host "  *_limit     = Count limit" -ForegroundColor Gray

# Extract data from .asset files
$balls = @()

Get-ChildItem -Path $basePath -Filter "*.asset" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Extract name, slug, description
    $nameMatch = [regex]::Match($content, '(?m)^\s*Name:\s*(.+)$')
    $name = if ($nameMatch.Success) { $nameMatch.Groups[1].Value.Trim() } else { "" }
    
    $slugMatch = [regex]::Match($content, '(?m)^\s*Slug:\s*(.+)$')
    $slug = if ($slugMatch.Success) { $slugMatch.Groups[1].Value.Trim() } else { "" }
    
    $descMatch = [regex]::Match($content, '(?m)^\s*Desc:\s*(.+)$')
    $desc = if ($descMatch.Success) { $descMatch.Groups[1].Value.Trim() } else { "" }
    
    $balls += [PSCustomObject]@{
        FileName = $_.BaseName
        Name = $name
        Slug = $slug
        Description = $desc
    }
}

# Create template structure
$template = @()

foreach ($ball in $balls | Sort-Object Name) {
    # Extract variable names from description
    $variables = @()
    if ($ball.Description -match '\{\[') {
        $matches = [regex]::Matches($ball.Description, '\{\[([^\]]+)\]\}')
        $variables = $matches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
    }
    
    # Skip if no variables
    if ($variables.Count -eq 0) {
        continue
    }
    
    # Create empty stats object
    $statsTemplate = @{
        level1 = @{}
        level2 = @{}
        level3 = @{}
    }
    
    # Add placeholder for each variable
    foreach ($var in $variables) {
        $statsTemplate.level1[$var] = "TODO"
        $statsTemplate.level2[$var] = "TODO"
        $statsTemplate.level3[$var] = "TODO"
    }
    
    $ballTemplate = [PSCustomObject]@{
        id = $ball.FileName.ToLower() -replace ' ','-'
        name = $ball.Name
        slug = $ball.Slug
        variables = $variables
        description = $ball.Description
        stats = $statsTemplate
    }
    
    $template += $ballTemplate
}

# Save as JSON
$template | ConvertTo-Json -Depth 10 | Out-File $outputPath -Encoding UTF8

Write-Host "`n=== Ball Stats Template Generated ===" -ForegroundColor Cyan
Write-Host "File saved to: $outputPath" -ForegroundColor Green
Write-Host "`nThis file lists all variables for each ball." -ForegroundColor Yellow
Write-Host "Replace 'TODO' with actual numeric values for each level." -ForegroundColor Yellow
Write-Host "`nTotal balls with variables: $($template.Count)" -ForegroundColor Cyan

# Show example of first few balls
Write-Host "`nExample (first 3 balls with variables):" -ForegroundColor Magenta
$template[0..2] | ForEach-Object {
    Write-Host "`n$($_.name) ($($_.slug))" -ForegroundColor Yellow
    Write-Host "Variables: $($_.variables -join ', ')" -ForegroundColor Cyan
}
