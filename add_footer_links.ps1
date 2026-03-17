$dir = "d:\omaxe plots"
$files = Get-ChildItem -Path $dir -Filter "*.html"

$findFooter = '                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>'

$replaceFooter = '                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Latest Guides</h3>
                    <ul class="footer-links">
                        <li><a href="/blog/omaxe-eternity-2-complete-guide">Complete Guide 2026</a></li>
                        <li><a href="/blog/vrindavan-real-estate-appreciation">Price Appreciation</a></li>
                        <li><a href="/blog/why-invest-vrindavan-2026">Why Invest in Vrindavan?</a></li>
                    </ul>
                </div>'

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    
    if ($content -match '<li><a href="/contact">Contact</a></li>') {
        if ($content -notmatch 'Latest Guides') {
            $content = $content -replace [regex]::Escape($findFooter), $replaceFooter
            [System.IO.File]::WriteAllText($f.FullName, $content, (New-Object System.Text.UTF8Encoding($False)))
            Write-Host "Updated footer in $($f.FullName)"
        }
    }
}
