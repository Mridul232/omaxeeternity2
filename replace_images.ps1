$directory = "d:\omaxe plots"
$replacements = @{
    "clubhouse.png" = "clubhouse.webp"
    "green park.png" = "green park.webp"
    "layout-map-hd.jpg" = "layout-map-hd.webp"
    "layout-map.jpg" = "layout-map-hd.webp"
    "temple compex.png" = "temple compex.webp"
    "wide roads.png" = "wide roads.webp"
}

$files = Get-ChildItem -Path $directory -Include *.html,*.css,*.js -Recurse -File | Where-Object { $_.FullName -notmatch '\.git|\.gemini' }

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $original_content = $content
    
    foreach ($key in $replacements.Keys) {
        $value = $replacements[$key]
        $content = $content -replace [regex]::Escape($key), $value
        
        $encodedKey = $key -replace " ", "%20"
        $encodedValue = $value -replace " ", "%20"
        $content = $content -replace [regex]::Escape($encodedKey), $encodedValue
    }
    
    if ($content -cne $original_content) {
        [IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated $($file.FullName)"
    }
}
