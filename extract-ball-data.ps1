$basePath = "c:\Projects\ball-x-pit-companion\Balls"
$output = @()

Get-ChildItem -Path $basePath -Filter "*.asset" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Extract name (looks for "Name: " field)
    $nameMatch = [regex]::Match($content, '(?m)^\s*Name:\s*(.+)$')
    $name = if ($nameMatch.Success) { $nameMatch.Groups[1].Value.Trim() } else { "" }
    
    # Extract slug (looks for "Slug: " field)
    $slugMatch = [regex]::Match($content, '(?m)^\s*Slug:\s*(.+)$')
    $slug = if ($slugMatch.Success) { $slugMatch.Groups[1].Value.Trim() } else { "" }
    
    # Extract description (looks for "Desc: " field)
    $descMatch = [regex]::Match($content, '(?m)^\s*Desc:\s*(.+)$')
    $desc = if ($descMatch.Success) { $descMatch.Groups[1].Value.Trim() } else { "" }
    
    $output += [PSCustomObject]@{
        FileName = $_.BaseName
        Name = $name
        Slug = $slug
        Description = $desc
    }
}

# Sort by name
$output = $output | Sort-Object Name

# Output as formatted text
Write-Host "`n=== Ball Data Extracted ===" -ForegroundColor Cyan
$output | Format-Table -AutoSize

# Also save to JSON for easier processing
$output | ConvertTo-Json | Out-File "$basePath\extracted-data.json" -Encoding UTF8
Write-Host "`nData saved to: $basePath\extracted-data.json" -ForegroundColor Green
