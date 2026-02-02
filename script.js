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

        // Send to Google Sheets (if URL is configured)
        if (GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_URL') {
            try {
                fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, city, plotSize })
                });
            } catch (error) {
                console.log('Form submitted locally');
            }
        }

        // Show success message
        if (formContent && formSuccess) {
            formContent.style.display = 'none';
            formSuccess.classList.add('show');
        }

        // Create WhatsApp message with all details
        const whatsappMsg = `Hi Ashish Garg, I'm ${name} from ${city}. I'm interested in ${plotSize} sq. yard plots in Vrindavan. Please share price and availability. My phone: ${phone}`;

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

        // Send to Google Sheets
        if (GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_URL') {
            try {
                fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, city: message, plotSize: 'Quick Enquiry' })
                });
            } catch (error) {
                console.log('Form submitted locally');
            }
        }

        // Open WhatsApp with details
        const whatsappMsg = `Hi Ashish Garg, I'm ${name}. ${message}. My phone: ${phone}`;
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
    link.href = 'assets/layout-map-hd.jpg';
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
