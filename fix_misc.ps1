$directory = "d:\omaxe plots"
$files = Get-ChildItem -Path $directory -Include *.html -Recurse -File | Where-Object { $_.FullName -notmatch '\.git|\.gemini|node_modules' }

foreach ($file in $files) {
    if ($file.Name -match "FORM_SETUP_GUIDE") { continue }
    
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $original = $content

    # Fix footer h4 -> h3
    $content = $content -replace '<h4>Quick Links</h4>', '<h3>Quick Links</h3>'
    $content = $content -replace '<h4>Contact</h4>', '<h3>Contact</h3>'
    $content = $content -replace '<h4>Legal</h4>', '<h3>Legal</h3>'
    $content = $content -replace '<h4>✅ Thank You!</h4>', '<h3>✅ Thank You!</h3>'
    
    # Add main tag (except blog where main already exists)
    if ($content -notmatch '<main([^>]*)>' -and $content -match '</header>' -and $content -match '<footer') {
        $content = $content -replace '</header>', "</header>`r`n`r`n    <main id=`"main-content`">"
        # Match the start of footer strictly
        $content = $content -replace '<footer class="footer">', "    </main>`r`n`r`n    <footer class=`"footer`">"
    }

    if ($content -cne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, (New-Object System.Text.UTF8Encoding($False)))
        Write-Host "Updated $($file.FullName)"
    }
}
