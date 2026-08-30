import os
import glob
import re

# 1. HTML Content for Omaxe Barsana
barsana_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google-site-verification" content="4A5YwYXytEIcLAyao6LaeFeES6x9ME4Qu4dwcV0EEEw" />
    <title>Omaxe Barsana Vrindavan | Premium Plots & Price List 2026</title>
    <meta name="description" content="Book your dream plot in Omaxe Barsana Vrindavan (Krishna Nagari). Premium 120, 160 & 200 Sq. Yd. freehold plots on Raal Road. Contact Ashish Garg for exclusive price and brochure.">
    <meta name="keywords" content="Omaxe Barsana, Omaxe Barsana Vrindavan, Omaxe Barsana plot price, Omaxe Barsana Raal Road, Krishna Nagari Vrindavan, Omaxe Barsana price list 2026">
    <link rel="canonical" href="https://omaxeeternity2.in/omaxe-barsana">
    <link rel="stylesheet" href="styles.css">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header">
        <div class="header-container">
            <a href="/" class="logo"><img src="assets/logo.webp" alt="Omaxe" width="200" height="60"></a>
            <nav class="nav">
                <a href="/about">About</a>
                <a href="/amenities">Amenities</a>
                <a href="/location">Location</a>
                <a href="/plot-sizes">Plot Sizes</a>
                <a href="/price-details">Pricing</a>
                <a href="/gallery">Gallery</a>
                <a href="/blog">Blog</a>
                <a href="/omaxe-barsana" class="active">Barsana (New)</a>
                <a href="/omaxe-hathras">Hathras (New)</a>
                <a href="/contact">Contact</a>
            </nav>
            <div class="header-cta">
                <a href="tel:+919410856555" class="btn btn-call">📞 Call Now</a>
                <a href="https://wa.me/919410856555?text=Hi%2C%20I'm%20interested%20in%20Omaxe%20Barsana." class="btn btn-whatsapp">💬 WhatsApp</a>
            </div>
        </div>
    </header>

    <section class="hero hero-inner">
        <div class="hero-content">
            <h1>Omaxe Barsana <span>Vrindavan</span></h1>
            <p>Premium Plotted Development — Krishna Nagari on Raal Road</p>
            <div class="hero-buttons">
                <a href="https://wa.me/919410856555?text=Hi%2C%20Please%20share%20the%20brochure%20and%20price%20list%20for%20Omaxe%20Barsana." class="btn btn-primary">Get Price List & Brochure</a>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h2 class="section-title">Most Awaited Launch in Vrindavan</h2>
            <div class="two-column">
                <div class="text-content">
                    <p>Welcome to <strong>Omaxe Barsana (Krishna Nagari)</strong>, a premium plotted development strategically located on Raal Road, right on the Barsana-Vrindavan corridor. This master-planned gated township offers an incredible opportunity to own freehold land in the spiritual capital of the world.</p>
                    <p><strong>Available Plot Sizes:</strong></p>
                    <ul>
                        <li><strong>120 Sq. Yd.</strong> - Ideal for cozy weekend homes.</li>
                        <li><strong>160 Sq. Yd.</strong> - The most popular choice for modern villas.</li>
                        <li><strong>200 Sq. Yd.</strong> - Premium sizing for luxury living.</li>
                    </ul>
                    <p>Experience 24/7 security, lush green parks, wide roads, and world-class infrastructure. Inventory is strictly limited.</p>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <div class="footer-bottom">
                <p class="footer-disclaimer"><strong>Disclaimer:</strong> This website is operated by an authorized channel partner and is not the official website of Omaxe Limited. All information, images, and prices are indicative and subject to change without notice.</p>
                <p class="footer-copyright">© 2026 omaxeeternity2.in | All Rights Reserved</p>
            </div>
        </div>
    </footer>
    <script src="script.js" defer></script>
</body>
</html>
"""

# 2. HTML Content for Omaxe Hathras
hathras_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google-site-verification" content="4A5YwYXytEIcLAyao6LaeFeES6x9ME4Qu4dwcV0EEEw" />
    <title>Omaxe Hathras City | Premium Residential Plots in Phase 2</title>
    <meta name="description" content="Omaxe Hathras City Phase 2 is now open. Secure premium 160, 200 & 250 Sq. Yd. gated plots on Mathura-Bareilly Highway (NH-530B) near Jewar Airport.">
    <meta name="keywords" content="Omaxe Hathras, Omaxe Hathras City, Omaxe Hathras plot price, Omaxe Hathras Phase 2, Hathras property, Mathura Bareilly Highway plots">
    <link rel="canonical" href="https://omaxeeternity2.in/omaxe-hathras">
    <link rel="stylesheet" href="styles.css">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header">
        <div class="header-container">
            <a href="/" class="logo"><img src="assets/logo.webp" alt="Omaxe" width="200" height="60"></a>
            <nav class="nav">
                <a href="/about">About</a>
                <a href="/amenities">Amenities</a>
                <a href="/location">Location</a>
                <a href="/plot-sizes">Plot Sizes</a>
                <a href="/price-details">Pricing</a>
                <a href="/gallery">Gallery</a>
                <a href="/blog">Blog</a>
                <a href="/omaxe-barsana">Barsana (New)</a>
                <a href="/omaxe-hathras" class="active">Hathras (New)</a>
                <a href="/contact">Contact</a>
            </nav>
            <div class="header-cta">
                <a href="tel:+919410856555" class="btn btn-call">📞 Call Now</a>
                <a href="https://wa.me/919410856555?text=Hi%2C%20I'm%20interested%20in%20Omaxe%20Hathras." class="btn btn-whatsapp">💬 WhatsApp</a>
            </div>
        </div>
    </header>

    <section class="hero hero-inner">
        <div class="hero-content">
            <h1>Omaxe City <span>Hathras, UP</span></h1>
            <p>Phase 2 Open — Premium Gated Township on NH-530B</p>
            <div class="hero-buttons">
                <a href="https://wa.me/919410856555?text=Hi%2C%20Please%20share%20the%20brochure%20and%20price%20list%20for%20Omaxe%20Hathras." class="btn btn-primary">Get Price List & Brochure</a>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h2 class="section-title">Omaxe Hathras Phase 2</h2>
            <div class="two-column">
                <div class="text-content">
                    <p>Invest in <strong>Omaxe City Hathras</strong>, an ultra-modern gated township strategically positioned on the Mathura-Bareilly Highway (NH-530B). Offering unmatched connectivity to Agra, Aligarh, Mathura, and the upcoming Jewar (Noida) Airport.</p>
                    <p><strong>Available Plot Sizes:</strong></p>
                    <ul>
                        <li><strong>160 Sq. Yd.</strong></li>
                        <li><strong>200 Sq. Yd.</strong></li>
                        <li><strong>250 Sq. Yd.</strong></li>
                    </ul>
                    <p>Enjoy premium amenities including wide roads, vast green belts, underground utilities, and round-the-clock security. Phase 2 inventory is extremely limited.</p>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <div class="footer-bottom">
                <p class="footer-disclaimer"><strong>Disclaimer:</strong> This website is operated by an authorized channel partner and is not the official website of Omaxe Limited. All information, images, and prices are indicative and subject to change without notice.</p>
                <p class="footer-copyright">© 2026 omaxeeternity2.in | All Rights Reserved</p>
            </div>
        </div>
    </footer>
    <script src="script.js" defer></script>
</body>
</html>
"""

with open("omaxe-barsana.html", "w", encoding="utf-8") as f:
    f.write(barsana_html)

with open("omaxe-hathras.html", "w", encoding="utf-8") as f:
    f.write(hathras_html)

# 3. Update main navigation in existing HTML files
nav_pattern = re.compile(r'(<a href="/blog">Blog</a>)(\s*)(<a href="/contact">Contact</a>)', re.IGNORECASE)
nav_replacement = r'\1\2<a href="/omaxe-barsana">Barsana</a>\2<a href="/omaxe-hathras">Hathras</a>\2\3'

for filepath in glob.glob("*.html"):
    if filepath in ["omaxe-barsana.html", "omaxe-hathras.html"]:
        continue
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    if '<a href="/contact">Contact</a>' in content:
        new_content = nav_pattern.sub(nav_replacement, content)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated navigation in {filepath}")

# 4. Update Sitemap
sitemap_path = "sitemap.xml"
with open(sitemap_path, "r", encoding="utf-8") as f:
    sitemap = f.read()

new_urls = """  <url>
    <loc>https://omaxeeternity2.in/omaxe-barsana</loc>
    <lastmod>2026-08-30</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://omaxeeternity2.in/omaxe-hathras</loc>
    <lastmod>2026-08-30</lastmod>
    <priority>0.80</priority>
  </url>
</urlset>"""

if "omaxe-barsana" not in sitemap:
    sitemap = sitemap.replace("</urlset>", new_urls)
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(sitemap)
    print("Updated sitemap.xml")

