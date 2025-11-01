# Reorder variables in ball-stats-template.json to match description order

$jsonPath = "ball-stats-template.json"
$ballsPath = "src\data\balls.ts"

# Read the current JSON
$balls = Get-Content $jsonPath -Raw | ConvertFrom-Json

# Read the balls.ts file to get descriptions
$ballsTs = Get-Content $ballsPath -Raw

# Function to extract variables from description in order
function Get-VariablesInOrder {
    param($description)
    
    $variables = @()
    $matches = [regex]::Matches($description, '\{\[([^\]]+)\]\}')
    
    foreach ($match in $matches) {
        $varName = $match.Groups[1].Value
        if ($variables -notcontains $varName) {
            $variables += $varName
        }
    }
    
    return $variables
}

# Process each ball
$orderedBalls = @()
foreach ($ball in $balls) {
    # Extract variables in order from description
    $orderedVars = Get-VariablesInOrder -description $ball.description
    
    # Create new ordered stats object
    $newStats = @{
        level1 = [ordered]@{}
        level2 = [ordered]@{}
        level3 = [ordered]@{}
    }
    
    # Reorder each level's variables
    foreach ($level in @('level1', 'level2', 'level3')) {
        foreach ($varName in $orderedVars) {
            if ($ball.stats.$level.PSObject.Properties.Name -contains $varName) {
                $newStats.$level[$varName] = $ball.stats.$level.$varName
            }
        }
    }
    
    # Create new ball object with ordered properties
    $newBall = [ordered]@{
        id = $ball.id
        name = $ball.name
        slug = $ball.slug
        variables = $ball.variables
        description = $ball.description
        stats = $newStats
    }
    
    $orderedBalls += $newBall
}

# Convert back to JSON with proper formatting
$json = $orderedBalls | ConvertTo-Json -Depth 10

# Write back to file
$json | Set-Content $jsonPath -Encoding UTF8

Write-Host "Successfully reordered variables in $($orderedBalls.Count) balls to match description order" -ForegroundColor Green
