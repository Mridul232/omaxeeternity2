$dir = "d:\omaxe plots\blog"
$files = Get-ChildItem -Path $dir -Filter "*.html"

$badFooterString = "    <!-- Footer (same as main site) -->
     
        param(`$m) `$m.Value -replace '<h4>', '<h3>' -replace '</h4>', '</h3>' 
    

    <!-- Sticky Mobile CTA -->"

$correctFooter = @"
    <!-- Footer -->
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-grid">
                <div>
                    <div class="footer-logo"><img src="../assets/logo.webp" alt="Omaxe" width="200" height="60"></div>
                    <p class="footer-desc">Your trusted partner for premium plots in Vrindavan. We help you find the
                        perfect investment for peaceful living and smart returns.</p>
                </div>
                <div>
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/amenities">Amenities</a></li>
                        <li><a href="/location">Location</a></li>
                        <li><a href="/gallery">Gallery</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Latest Guides</h3>
                    <ul class="footer-links">
                        <li><a href="/blog/omaxe-eternity-2-complete-guide">Complete Guide 2026</a></li>
                        <li><a href="/blog/vrindavan-real-estate-appreciation">Price Appreciation</a></li>
                        <li><a href="/blog/why-invest-vrindavan-2026">Why Invest in Vrindavan?</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Contact</h3>
                    <ul class="footer-links">
                        <li>Ashish Garg</li>
                        <li><a href="tel:+919410856555">+91 94108 56555</a></li>
                        <li><a href="mailto:ashishjigarg@gmail.com">ashishjigarg@gmail.com</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Legal</h3>
                    <ul class="footer-links">
                        <li><a href="/rera-legal">RERA & Legal Info</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p class="footer-disclaimer"><strong>Disclaimer:</strong> This website is operated by an authorized
                    channel partner and is not the official website of Omaxe Limited. All information, images, and
                    prices are indicative and subject to change without notice. Please verify all details with the
                    developer before making any purchase decision. We do not sell your personal data.</p>
                <p class="footer-copyright">© 2026 omaxeeternity2.in | All Rights Reserved</p>
            </div>
        </div>
    </footer>

    <!-- Sticky Mobile CTA -->
"@

foreach ($f in $files) {
    if ($f.Name -match "index.html") { continue } # Already checked index, it is fine
    $content = [System.IO.File]::ReadAllText($f.FullName)
    
    if ($content.Contains("param(`$m) `$m.Value -replace '<h4>', '<h3>' -replace '</h4>', '</h3>'")) {
        $content = $content.Replace($badFooterString, $correctFooter)
        [System.IO.File]::WriteAllText($f.FullName, $content, (New-Object System.Text.UTF8Encoding($False)))
        Write-Host "Fixed footer in $($f.FullName)"
    }
}
