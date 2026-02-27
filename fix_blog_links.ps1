$dir = "d:\omaxe plots\blog"
Get-ChildItem -Path $dir -Filter "*.html" | ForEach-Object {
    $file = $_.FullName
    $c = Get-Content $file -Raw -Encoding UTF8
    $c = $c -replace 'href="amenities"', 'href="/amenities"'
    $c = $c -replace 'href="location"', 'href="/location"'
    $c = $c -replace 'href="plot-sizes"', 'href="/plot-sizes"'
    $c = $c -replace 'href="price-details"', 'href="/price-details"'
    $c = $c -replace 'href="gallery"', 'href="/gallery"'
    $c = $c -replace 'href="blog"', 'href="/blog"'
    $c = $c -replace 'href="contact"', 'href="/contact"'
    $c = $c -replace 'href="about"', 'href="/about"'
    $c = $c -replace 'href="rera-legal"', 'href="/rera-legal"'
    $c = $c -replace 'href="privacy-policy"', 'href="/privacy-policy"'
    $c = $c -replace 'href="terms"', 'href="/terms"'
    [System.IO.File]::WriteAllText($file, $c, [System.Text.Encoding]::UTF8)
    Write-Output "Fixed: $($_.Name)"
}
Write-Output "All done!"
