$directory = "d:\omaxe plots"
$replacements = @{
    "entry gate.jpg" = "entry gate.webp"
    "logo.png" = "logo.webp"
}

$files = Get-ChildItem -Path $directory -Include *.html,*.css,*.js -Recurse -File | Where-Object { $_.FullName -notmatch '\.git|\.gemini' }

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $original_content = $content
    
    # 1. Image replacements
    foreach ($key in $replacements.Keys) {
        $value = $replacements[$key]
        $content = $content -replace [regex]::Escape($key), $value
        
        $encodedKey = $key -replace " ", "%20"
        $encodedValue = $value -replace " ", "%20"
        $content = $content -replace [regex]::Escape($encodedKey), $encodedValue
    }
    
    # 2. Meta Keywords removal
    # Using regex to remove <meta name="keywords" content="..."> and potential leading/trailing whitespace including newlines
    $content = $content -replace '(?i)\s*<meta\s+name=["'']keywords["''][^>]*>\s*', "`r`n"
    
    if ($content -cne $original_content) {
        [System.IO.File]::WriteAllText($file.FullName, $content, (New-Object System.Text.UTF8Encoding($False)))
        Write-Host "Updated $($file.FullName)"
    }
}
