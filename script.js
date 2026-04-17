// ==================== ANNOUNCEMENT BAR (Sitewide) ====================
(function () {
    if (sessionStorage.getItem('ann_bar_closed')) return;

    // Inject styles directly – bypasses any CSS caching issues
    var style = document.createElement('style');
    style.textContent = `
        #annBar {
            position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; z-index: 9999 !important;
            background: linear-gradient(90deg, #0a1628 0%, #1a3a5c 50%, #0a1628 100%) !important;
            border-bottom: 1px solid rgba(246,201,14,0.35);
            display: flex !important; align-items: center; justify-content: center;
            gap: 12px; padding: 9px 16px; font-family: 'Inter', sans-serif;
            font-size: 13px; box-sizing: border-box;
            animation: _annSlide .4s ease;
        }
        @keyframes _annSlide { from { transform:translateY(-100%); opacity:0; } to { transform:translateY(0); opacity:1; } }
        #annBar .ann-badge {
            background: linear-gradient(90deg,#d69e2e,#ecc94b); color: #1a3a5c;
            font-size: 10px; font-weight: 800; letter-spacing: 1.5px;
            text-transform: uppercase; padding: 3px 10px; border-radius: 20px;
            white-space: nowrap; flex-shrink: 0;
        }
        #annBar .ann-text { color: rgba(255,255,255,0.9); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        #annBar .ann-text strong { color: #f6c90e; font-weight: 700; }
        #annBar .ann-link {
            background: rgba(246,201,14,0.12); border: 1px solid rgba(246,201,14,0.5);
            color: #f6c90e !important; font-size: 12px; font-weight: 700;
            padding: 4px 14px; border-radius: 20px; text-decoration: none !important;
            white-space: nowrap; flex-shrink: 0; transition: background .2s;
        }
        #annBar .ann-link:hover { background: rgba(246,201,14,0.25); }
        #annBar .ann-close {
            background: none; border: none; color: rgba(255,255,255,0.55);
            font-size: 20px; cursor: pointer; padding: 0 4px; line-height: 1;
            flex-shrink: 0; margin-left: 4px; transition: color .2s;
        }
        #annBar .ann-close:hover { color: #fff; }
        @media (max-width: 600px) { #annBar .ann-text { display: none; } #annBar { gap: 8px; } }
    `;
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.id = 'annBar';
    bar.innerHTML =
        '<span class="ann-badge">🔥 New Launch</span>' +
        '<span class="ann-text"><strong>BeTogether Courtyard, Vrindavan</strong> — First mall: Shops, Food Court &amp; Cinema. RERA Registered.</span>' +
        '<a href="/betogether-courtyard-vrindavan" class="ann-link">View Details →</a>' +
        '<button class="ann-close" id="annClose" title="Close">×</button>';
    document.body.insertBefore(bar, document.body.firstChild);

    function updateHeaderPos() {
        var h = document.querySelector('.header');
        var b = document.getElementById('annBar');
        if (h && b) {
            var offset = Math.max(0, b.offsetHeight - window.scrollY);
            h.style.setProperty('top', offset + 'px', 'important');
        } else if (h) {
            h.style.setProperty('top', '0px', 'important');
        }
    }
    
    // Initial call and event listeners
    updateHeaderPos();
    window.addEventListener('scroll', updateHeaderPos, { passive: true });
    window.addEventListener('resize', updateHeaderPos, { passive: true });

    document.getElementById('annClose').addEventListener('click', function () {
        var b = document.getElementById('annBar');
        if (b) b.remove();
        updateHeaderPos();
        sessionStorage.setItem('ann_bar_closed', '1');
    });
})();


// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Lightbox functionality
const layoutImage = document.querySelector('.layout-image');
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.querySelector('.lightbox-close');

if (layoutImage) {
    layoutImage.addEventListener('click', () => {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Form submission with Google Sheets
// IMPORTANT: Replace this URL with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz1_-nDtNKBNMyoT_DGMLCbMxTrt9icONAYi5PsxLY4N-1ZwsenxaEmZI7VLLDMdQXH7Q/exec';

const contactForm = document.getElementById('contactForm');
const formContent = document.querySelector('.form-content');
const formSuccess = document.querySelector('.form-success');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const city = formData.get('city') || 'Not provided';
        const plotSize = formData.get('plotSize');

        // Create WhatsApp message with all details
        const whatsappMsg = `Hi Ashish Garg, I'm ${name} from ${city}. I'm interested in ${plotSize} sq. yard plots in Vrindavan. Please share price and availability. My phone: ${phone}`;

        // Send to Google Sheets (if URL is configured)
        if (GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_URL') {
            try {
                fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, city, plotSize })
                }).catch(() => {
                    // Fallback to WhatsApp if network/fetch fails silently in promise
                    window.open(`https://wa.me/919410856555?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
                });
            } catch (error) {
                console.log('Google script failed, redirecting to WhatsApp');
                window.open(`https://wa.me/919410856555?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
            }
        }

        // Show success message
        if (formContent && formSuccess) {
            formContent.style.display = 'none';
            formSuccess.classList.add('show');
        }

        // Update WhatsApp link in success message
        const successWhatsApp = document.querySelector('.success-whatsapp');
        if (successWhatsApp) {
            successWhatsApp.href = `https://wa.me/919410856555?text=${encodeURIComponent(whatsappMsg)}`;
        }
    });
}

// Quick Enquiry Form
const quickForm = document.getElementById('quickForm');
if (quickForm) {
    quickForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('qname').value;
        const phone = document.getElementById('qphone').value;
        const message = document.getElementById('qmessage').value || 'General enquiry';

        // Open WhatsApp with details (Primary fallback strategy)
        const whatsappMsg = `Hi Ashish Garg, I'm ${name}. ${message}. My phone: ${phone}`;
        
        // Send to Google Sheets
        if (GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_URL') {
            try {
                fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, city: message, plotSize: 'Quick Enquiry' })
                }).catch(() => {
                    // Safe handling if promise rejects
                    console.log('Fetch rejected, WhatsApp handling the load');
                });
            } catch (error) {
                console.log('Form submitted locally');
            }
        }

        window.open(`https://wa.me/919410856555?text=${encodeURIComponent(whatsappMsg)}`, '_blank');

        // Reset form
        quickForm.reset();
        alert('Thank you! We will contact you shortly.');
    });
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// WhatsApp prefilled messages
function getWhatsAppLink(plotSize = '') {
    const baseMsg = plotSize
        ? `Hi Ashish Garg, I'm interested in ${plotSize} sq. yard plots in Vrindavan (Omaxe Eternity-2). Please share price, availability, and site visit details.`
        : `Hi Ashish Garg, I'm interested in plots in Vrindavan (Omaxe Eternity-2). Please share price, availability, and site visit details.`;
    return `https://wa.me/919410856555?text=${encodeURIComponent(baseMsg)}`;
}

// Download layout plan
function downloadLayout() {
    const link = document.createElement('a');
    link.href = 'assets/layout-map-hd.webp';
    link.download = 'Omaxe-Eternity-2-Vrindavan-Layout-Plan.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.highlight-card, .plot-card, .step-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== ROI CALCULATOR ====================
(function() {
    // Base index values (relative, not actual prices — drives inquiry)
    const plotIndex = { '120': 1.0, '160': 1.35, '200': 1.68 };
    // Conservative growth labels per year at 15% compound
    function calcGrowth(base, years, rate) {
        return (base * Math.pow(1 + rate, years));
    }

    function formatMultiplier(val) {
        return val.toFixed(2) + '× current value';
    }

    function updateCalc() {
        const radios = document.querySelectorAll('input[name="plotSize"]');
        const slider = document.getElementById('holdingYears');
        const yearsDisplay = document.getElementById('yearsDisplay');
        const conservativeEl = document.getElementById('conservativeValue');
        const optimisticEl = document.getElementById('optimisticValue');

        if (!slider || !conservativeEl || !optimisticEl) return;

        let selectedSize = '120';
        radios.forEach(r => { if (r.checked) selectedSize = r.value; });

        const years = parseInt(slider.value);
        if (yearsDisplay) yearsDisplay.textContent = years;

        const base = plotIndex[selectedSize] || 1.0;
        const conservative = calcGrowth(base, years, 0.15);
        const optimistic = calcGrowth(base, years, 0.20);

        conservativeEl.textContent = formatMultiplier(conservative / base);
        optimisticEl.textContent = formatMultiplier(optimistic / base);

        // Update slider gradient
        const pct = ((years - 1) / 9) * 100;
        slider.style.background = `linear-gradient(to right, #1a3a5c ${pct}%, #ddd ${pct}%)`;

        // Style radio labels
        const labels = ['calc-120-label', 'calc-160-label', 'calc-200-label'];
        labels.forEach(id => {
            const lbl = document.getElementById(id);
            if (!lbl) return;
            const val = lbl.querySelector('input') && lbl.querySelector('input').value;
            if (val === selectedSize) {
                lbl.style.background = '#1a3a5c'; lbl.style.color = '#fff'; lbl.style.borderColor = '#1a3a5c';
            } else {
                lbl.style.background = '#fff'; lbl.style.color = '#333'; lbl.style.borderColor = '#ddd';
            }
        });

        // Update WhatsApp link with plot size context
        const waLink = document.getElementById('calcWhatsapp');
        if (waLink) {
            waLink.href = `https://wa.me/919410856555?text=Hi%20Ashish%20Garg%2C%20I%20used%20your%20ROI%20Calculator%20for%20a%20${selectedSize}%20sq.%20yard%20plot%20over%20${years}%20years.%20Please%20share%20the%20current%20price.`;
        }
    }

    // Init
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(updateCalc, 200);
        
        const slider = document.getElementById('holdingYears');
        if (slider) slider.addEventListener('input', updateCalc);

        document.querySelectorAll('input[name="plotSize"]').forEach(r => {
            r.addEventListener('change', updateCalc);
        });

        // Radio label click also registers
        ['calc-120-label','calc-160-label','calc-200-label'].forEach(id => {
            const lbl = document.getElementById(id);
            if (lbl) lbl.addEventListener('click', function() {
                setTimeout(updateCalc, 50);
            });
        });
    });
})();
