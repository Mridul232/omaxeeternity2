$directory = "d:\omaxe plots"

# The font preconnect + stylesheet links to inject (non-render-blocking with display=swap)
$fontLinks = @"
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" media="print" onload="this.media='all'">
"@

$files = Get-ChildItem -Path $directory -Include *.html -Recurse -File | Where-Object { $_.FullName -notmatch '\.git|\.gemini' }

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $original = $content

    # 1. Add font preconnect links right after <meta charset="UTF-8">
    # Only if not already present
    if ($content -notmatch 'preconnect.*fonts\.googleapis') {
        $content = $content -replace '(<meta\s+charset="UTF-8"\s*/?>)', "`$1`r`n$fontLinks"
    }

    # 2. Add defer to script.js (handles both src="script.js" and src="../script.js")
    $content = $content -replace '<script src="(\.\.\/)?script\.js"></script>', '<script src="$1script.js" defer></script>'

    if ($content -cne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, (New-Object System.Text.UTF8Encoding($False)))
        Write-Host "Updated $($file.FullName)"
    }
}
