import os
import re

def build_pro_page(source_path, target_path, replacements, title, desc, keywords, nav_active_class):
    with open(source_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update Title, Desc, Keywords
    content = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', content, flags=re.DOTALL)
    content = re.sub(r'<meta name="description"[\s\S]*?>', f'<meta name="description"\n        content="{desc}">', content)
    content = re.sub(r'<meta name="keywords"[\s\S]*?>', f'<meta name="keywords"\n        content="{keywords}">', content)
    
    # 2. Update Canonical
    content = re.sub(r'<link rel="canonical" href=".*?">', f'<link rel="canonical" href="https://omaxeeternity2.in/{target_path.replace(".html", "")}">', content)

    # 3. Update Nav active state
    content = content.replace('class="active"', '')
    content = content.replace(f'<a href="/{target_path.replace(".html", "")}">', f'<a href="/{target_path.replace(".html", "")}" class="active">')

    # 4. Remove the popups from the bottom so they don't trigger recursively on inner pages, or keep them? 
    # Actually, the user liked them, but keeping them everywhere is fine.

    # 5. Replace Hero content safely
    # Let's extract everything inside `<div class="hero-content">` up to `<!-- Right: Hero Lead Form -->`
    hero_pattern = re.compile(r'(<div class="hero-content">)(.*?)(<!-- Right: Hero Lead Form -->)', re.DOTALL)
    
    new_hero_html = replacements['hero_html']
    
    content = hero_pattern.sub(r'\1' + new_hero_html + r'\3', content)

    # 6. Replace Highlights Section safely
    # Extract <section class="section section-alt" id="highlights"> ... </section>
    highlights_pattern = re.compile(r'(<section class="section section-alt" id="highlights">)(.*?)(</section>)', re.DOTALL)
    new_highlights = replacements['highlights_html']
    content = highlights_pattern.sub(r'\1' + new_highlights + r'\3', content)

    # 7. Remove Sections we don't want on the landing page (like the huge map or about section that are specific to Eternity 2)
    # We will slice the content: Keep from start to end of highlights. Then keep footer.
    
    # Find end of highlights section
    end_highlights = content.find('</section>', content.find('id="highlights"')) + 10
    
    # Find start of footer
    start_footer = content.find('<footer class="footer">')
    
    # Wait, there might be sticky CTA and lightbox after footer. So just slice out the middle parts.
    if end_highlights > 0 and start_footer > 0:
        content = content[:end_highlights] + "\n\n" + content[start_footer:]

    with open(target_path, "w", encoding="utf-8") as f:
        f.write(content)
    
    print(f"Built {target_path} successfully!")


barsana_hero = """
                    <div class="hero-badge">🚀 Most Awaited Launch | Barsana &nbsp;•&nbsp; <span style="color:#f6c90e;font-weight:700;">⭐ Premium Plotted Development</span></div>
                    <h1>Omaxe <span class="hero-highlight">Barsana</span> – Freehold Plots in Radha Rani Nagari
                    </h1>
                    <p>Secure a <strong>Premium freehold investment plot in Omaxe Barsana</strong> – beautifully situated on the Barsana corridor. Tailored for devotees and investors alike, offering <strong>120, 160 &amp; 200 sq yard</strong> options. Enjoy spiritual living with world-class amenities, wide roads, and unmatched security.</p>
                    <div class="hero-ctas">
                        <a href="https://wa.me/919410856555?text=Hi%20Ashish%20Garg%2C%20I'm%20interested%20in%20Omaxe%20Barsana%20plots.%20Please%20share%20price%20and%20layout."
                            class="btn btn-whatsapp">💬 Get Price &amp; Layout on WhatsApp</a>
                        <a href="tel:+919410856555" class="btn btn-call">📞 Call Now</a>
                    </div>
                    <div class="hero-trust">
                        <span>✅ Limited Plots</span>
                        <span>🚗 Site Visit Available</span>
                        <span>⚡ Quick Assistance</span>
                    </div>
"""

barsana_highlights = """
            <div class="container">
                <div class="section-header">
                    <h2>Project Highlights: Omaxe Barsana</h2>
                    <p>Experience the perfect blend of spiritual serenity and modern luxury in Barsana.</p>
                </div>
                <div class="highlights-grid">
                    <div class="highlight-card">
                        <div class="highlight-icon">🦚</div>
                        <h3>Spiritual Capital</h3>
                        <p>Located in the sacred city of Barsana, offering a peaceful, spiritually enriching lifestyle.</p>
                    </div>
                    <div class="highlight-card">
                        <div class="highlight-icon">🌳</div>
                        <h3>Green Living</h3>
                        <p>Lush green parks and beautifully landscaped open spaces for your family.</p>
                    </div>
                    <div class="highlight-card">
                        <div class="highlight-icon">🛣️</div>
                        <h3>Premium Infrastructure</h3>
                        <p>Wide internal roads, underground utilities, and 24/7 top-tier security.</p>
                    </div>
                    <div class="highlight-card">
                        <div class="highlight-icon">📈</div>
                        <h3>High ROI</h3>
                        <p>Rapidly developing corridor ensuring excellent capital appreciation for investors.</p>
                    </div>
                </div>
            </div>
"""

hathras_hero = """
                    <div class="hero-badge">🚀 Phase 2 Open | Hathras City &nbsp;•&nbsp; <span style="color:#f6c90e;font-weight:700;">⭐ Premium Township</span></div>
                    <h1>Omaxe City <span class="hero-highlight">Hathras</span> – Modern Gated Plots for Sale
                    </h1>
                    <p>Invest in <strong>Omaxe City Hathras</strong>, strategically located on the Mathura-Bareilly Highway (NH-530B). Featuring <strong>160, 200 &amp; 250 sq yard</strong> premium plots. Enjoy unparalleled connectivity to Jewar Airport, Agra, and Aligarh in a fully secure, world-class township.</p>
                    <div class="hero-ctas">
                        <a href="https://wa.me/919410856555?text=Hi%20Ashish%20Garg%2C%20I'm%20interested%20in%20Omaxe%20Hathras%20plots.%20Please%20share%20price%20and%20layout."
                            class="btn btn-whatsapp">💬 Get Price &amp; Layout on WhatsApp</a>
                        <a href="tel:+919410856555" class="btn btn-call">📞 Call Now</a>
                    </div>
                    <div class="hero-trust">
                        <span>✅ Phase 2 Inventory</span>
                        <span>🚗 Highway Connectivity</span>
                        <span>⚡ Premium Security</span>
                    </div>
"""

hathras_highlights = """
            <div class="container">
                <div class="section-header">
                    <h2>Project Highlights: Omaxe Hathras City</h2>
                    <p>A master-planned township designed for modern families and smart investors.</p>
                </div>
                <div class="highlights-grid">
                    <div class="highlight-card">
                        <div class="highlight-icon">✈️</div>
                        <h3>Excellent Connectivity</h3>
                        <p>Strategically located on NH-530B with fast access to Jewar Airport and major cities.</p>
                    </div>
                    <div class="highlight-card">
                        <div class="highlight-icon">🛡️</div>
                        <h3>Gated Security</h3>
                        <p>24/7 advanced security systems ensuring complete peace of mind.</p>
                    </div>
                    <div class="highlight-card">
                        <div class="highlight-icon">🏘️</div>
                        <h3>Modern Township</h3>
                        <p>Well-planned sectors, wide roads, and commercial complexes within the boundary.</p>
                    </div>
                    <div class="highlight-card">
                        <div class="highlight-icon">💡</div>
                        <h3>Underground Utilities</h3>
                        <p>Modern underground electricity, water, and drainage infrastructure.</p>
                    </div>
                </div>
            </div>
"""

# Run Barsana
build_pro_page(
    source_path="index.html",
    target_path="omaxe-barsana.html",
    replacements={"hero_html": barsana_hero, "highlights_html": barsana_highlights},
    title="Omaxe Barsana | Premium Plotted Development 2026",
    desc="Book your dream freehold plot in Omaxe Barsana. Premium 120, 160 & 200 Sq. Yd. plots with world-class amenities. Contact for exclusive price and brochure.",
    keywords="Omaxe Barsana, Omaxe Barsana plot price, Omaxe Barsana plots, Barsana real estate, freehold plots Barsana",
    nav_active_class="omaxe-barsana"
)

# Run Hathras
build_pro_page(
    source_path="index.html",
    target_path="omaxe-hathras.html",
    replacements={"hero_html": hathras_hero, "highlights_html": hathras_highlights},
    title="Omaxe Hathras City | Premium Residential Plots Phase 2",
    desc="Omaxe Hathras City Phase 2 is now open. Secure premium 160, 200 & 250 Sq. Yd. gated plots on Mathura-Bareilly Highway (NH-530B) near Jewar Airport.",
    keywords="Omaxe Hathras, Omaxe Hathras City, Omaxe Hathras plot price, Omaxe Hathras Phase 2, Hathras property, Mathura Bareilly Highway plots",
    nav_active_class="omaxe-hathras"
)

