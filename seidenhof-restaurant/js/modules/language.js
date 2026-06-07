/* ==================== LANGUAGE MODULE - FIXED ==================== */
let currentLang = 'de';
let siteContent = {};
let menuItems = {};
let openingHours = {};

export function initLanguage() {
    
    // Load data
    Promise.all([
        fetch('data/site-content.json').then(r => r.json()),
        fetch('data/menu-items.json').then(r => r.json()),
        fetch('data/opening-hours.json').then(r => r.json())
    ]).then(([content, menu, hours]) => {
        siteContent = content;
        menuItems = menu;
        openingHours = hours;
        
        // لا توجد لغة افتراضية - نطبق آخر لغة مختارة أو الألمانية عند التحميل الأول
        const savedLang = localStorage.getItem('seidenhof-lang') || 'de';
        currentLang = savedLang;
        
        // تطبيق اللغة
        applyLanguage(currentLang);
        
        // تحديث أزرار اللغة
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === currentLang) {
                btn.classList.add('active');
            }
        });
    }).catch(err => {
        console.warn('⚠️ Could not load language files.', err);
    });
    
    // Language button clicks
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const lang = this.getAttribute('data-lang');
            currentLang = lang;
            
            // حفظ اللغة المختارة
            localStorage.setItem('seidenhof-lang', lang);
            
            // تطبيق اللغة على كل الصفحة
            applyLanguage(lang);
        });
    });
    
    // الاستماع لتغيير التبويب في القائمة لإعادة الترجمة
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('menu-tab') || e.target.closest('.menu-tab')) {
            setTimeout(() => {
                updateMenu(currentLang);
            }, 50);
        }
    });
}

function applyLanguage(lang) {
    if (!siteContent[lang]) return;
    
    const t = siteContent[lang];
    
    // Set HTML lang attribute
    document.documentElement.lang = lang;
    
    // ==================== NAVIGATION ====================
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getNestedValue(t, key);
        if (value) {
            el.innerHTML = value;
        }
    });
    
    // ==================== HERO ====================
    updateHeroSection(t);
    
    // ==================== PHILOSOPHIE ====================
    updatePhilosophieSection(t);
    
    // ==================== MENU SECTION HEADER ====================
    updateMenuSectionHeader(t);
    
    // ==================== MENU ITEMS (IMPORTANT FIX) ====================
    updateMenu(lang);
    
    // ==================== GALERIE ====================
    updateGalerieSection(t);
    
    // ==================== TESTIMONIALS ====================
    updateTestimonialsSection(t);
    
    // ==================== RESERVIERUNG ====================
    updateReservationSection(t);
    
    // ==================== FOOTER ====================
    updateFooterSection(t);
    
    console.log(`🌐 Page fully translated to: ${lang}`);
}

function updateHeroSection(t) {
    const heroBadge = document.querySelector('.hero-badge');
    const heroTitle1 = document.querySelector('.hero-title-line:not(.gold)');
    const heroTitle2 = document.querySelector('.hero-title-line.gold');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta1 = document.querySelector('.hero-buttons .btn-gold span');
    const heroCta2 = document.querySelector('.hero-buttons .btn-outline span');
    const heroScroll = document.querySelector('.hero-scroll span');
    
    if (heroBadge) heroBadge.innerHTML = t.hero.badge;
    if (heroTitle1) heroTitle1.textContent = t.hero.title1;
    if (heroTitle2) heroTitle2.textContent = t.hero.title2;
    if (heroSubtitle) heroSubtitle.innerHTML = t.hero.subtitle;
    if (heroCta1) heroCta1.textContent = t.hero.cta1;
    if (heroCta2) heroCta2.textContent = t.hero.cta2;
    if (heroScroll) heroScroll.textContent = t.hero.scroll;
}

function updatePhilosophieSection(t) {
    const philTag = document.querySelector('#philosophie .section-tag');
    const philTitle = document.querySelector('#philosophie .section-title');
    const philSubtitle = document.querySelector('#philosophie .section-subtitle');
    const philCards = document.querySelectorAll('#philosophie .philosophie-card');
    
    if (philTag) philTag.textContent = t.philosophie.tag;
    if (philTitle) philTitle.innerHTML = t.philosophie.title;
    if (philSubtitle) philSubtitle.textContent = t.philosophie.subtitle;
    
    if (philCards.length >= 3) {
        philCards[0].querySelector('h3').textContent = t.philosophie.card1_title;
        philCards[0].querySelector('p').textContent = t.philosophie.card1_text;
        philCards[1].querySelector('h3').textContent = t.philosophie.card2_title;
        philCards[1].querySelector('p').textContent = t.philosophie.card2_text;
        philCards[2].querySelector('h3').textContent = t.philosophie.card3_title;
        philCards[2].querySelector('p').textContent = t.philosophie.card3_text;
    }
}

function updateMenuSectionHeader(t) {
    const menuTag = document.querySelector('#menu .section-tag');
    const menuTitle = document.querySelector('#menu .section-title');
    const menuSubtitle = document.querySelector('#menu .section-subtitle');
    const menuTabs = document.querySelectorAll('#menu .menu-tab span');
    const menuDownload = document.querySelector('#download-menu span');
    
    if (menuTag) menuTag.textContent = t.menu.tag;
    if (menuTitle) menuTitle.innerHTML = t.menu.title;
    if (menuSubtitle) menuSubtitle.textContent = t.menu.subtitle;
    if (menuTabs.length >= 4) {
        menuTabs[0].textContent = t.menu.tab1;
        menuTabs[1].textContent = t.menu.tab2;
        menuTabs[2].textContent = t.menu.tab3;
        menuTabs[3].textContent = t.menu.tab4;
    }
    if (menuDownload) menuDownload.textContent = t.menu.download;
}

function updateGalerieSection(t) {
    const galTag = document.querySelector('#galerie .section-tag');
    const galTitle = document.querySelector('#galerie .section-title');
    if (galTag) galTag.textContent = t.galerie.tag;
    if (galTitle) galTitle.innerHTML = t.galerie.title;
}

function updateTestimonialsSection(t) {
    const testTag = document.querySelector('.testimonials .section-tag');
    const testTitle = document.querySelector('.testimonials .section-title');
    const testText = document.querySelector('.testimonial-text');
    const testAuthor = document.querySelector('.testimonial-author strong');
    const testRole = document.querySelector('.testimonial-author span');
    
    if (testTag) testTag.textContent = t.testimonials.tag;
    if (testTitle) testTitle.innerHTML = t.testimonials.title;
    if (testText) testText.textContent = t.testimonials.text;
    if (testAuthor) testAuthor.textContent = t.testimonials.author;
    if (testRole) testRole.textContent = t.testimonials.role;
}

function updateReservationSection(t) {
    const resTag = document.querySelector('#reservierung .section-tag');
    const resTitle = document.querySelector('#reservierung .section-title');
    const resDesc = document.querySelector('#reservierung .reservation-desc');
    
    if (resTag) resTag.textContent = t.reservierung.tag;
    if (resTitle) resTitle.innerHTML = t.reservierung.title;
    if (resDesc) resDesc.textContent = t.reservierung.desc;
    
    // Contact info
    const contactItems = document.querySelectorAll('#reservierung .contact-item');
    if (contactItems.length >= 3) {
        contactItems[0].querySelector('strong').textContent = t.reservierung.phone_label;
        contactItems[0].querySelector('span').textContent = t.reservierung.phone_value;
        contactItems[1].querySelector('strong').textContent = t.reservierung.email_label;
        contactItems[1].querySelector('span').textContent = t.reservierung.email_value;
        contactItems[2].querySelector('strong').textContent = t.reservierung.hours_label;
        contactItems[2].querySelector('span').textContent = t.reservierung.hours_value;
    }
    
    // Form
    const formTitle = document.querySelector('#reservierung .reservation-form h3');
    if (formTitle) formTitle.textContent = t.reservierung.form_title;
    
    // Labels
    const labelMap = {
        'label[for="name"]': t.reservierung.name_label,
        'label[for="email"]': t.reservierung.email_label,
        'label[for="phone"]': t.reservierung.phone_label,
        'label[for="guests"]': t.reservierung.guests_label,
        'label[for="date"]': t.reservierung.date_label,
        'label[for="time"]': t.reservierung.time_label,
        'label[for="message"]': t.reservierung.message_label,
    };
    
    for (const [selector, value] of Object.entries(labelMap)) {
        const el = document.querySelector(selector);
        if (el) el.textContent = value;
    }
    
    // Placeholders
    const placeholderMap = {
        '#name': t.reservierung.name_placeholder,
        '#email': t.reservierung.email_placeholder,
        '#phone': t.reservierung.phone_placeholder,
        '#message': t.reservierung.message_placeholder,
    };
    
    for (const [selector, value] of Object.entries(placeholderMap)) {
        const el = document.querySelector(selector);
        if (el) el.placeholder = value;
    }
    
    // Select options
    const select = document.querySelector('#guests');
    if (select) {
        const guestKeys = ['guests_default', 'guest_1', 'guest_2', 'guest_3', 'guest_4', 'guest_5', 'guest_6'];
        const options = select.querySelectorAll('option');
        options.forEach((opt, i) => {
            if (t.reservierung[guestKeys[i]]) {
                opt.textContent = t.reservierung[guestKeys[i]];
            }
        });
    }
    
    // Submit button
    const submitBtn = document.querySelector('#reservierung .btn-gold span');
    if (submitBtn) submitBtn.textContent = t.reservierung.submit;
    
    // Success message
    const successTitle = document.querySelector('.form-success h3');
    const successText = document.querySelector('.form-success p');
    if (successTitle) successTitle.textContent = t.reservierung.success_title;
    if (successText) successText.textContent = t.reservierung.success_text;
}

function updateFooterSection(t) {
    const footerDesc = document.querySelector('.footer-col:first-child > p');
    const footerQuicklinks = document.querySelector('.footer-col:nth-child(2) h4');
    const footerHours = document.querySelector('.footer-col:nth-child(3) h4');
    const footerNewsletter = document.querySelector('.footer-col:nth-child(4) h4');
    const footerNewsletterText = document.querySelector('.footer-col:nth-child(4) > p');
    const footerNewsletterInput = document.querySelector('.newsletter-form input');
    const footerCopyright = document.querySelector('.footer-bottom p');
    
    if (footerDesc) footerDesc.textContent = t.footer.desc;
    if (footerQuicklinks) footerQuicklinks.textContent = t.footer.quicklinks;
    if (footerHours) footerHours.textContent = t.footer.hours_title;
    if (footerNewsletter) footerNewsletter.textContent = t.footer.newsletter_title;
    if (footerNewsletterText) footerNewsletterText.textContent = t.footer.newsletter_text;
    if (footerNewsletterInput) footerNewsletterInput.placeholder = t.footer.newsletter_placeholder;
    if (footerCopyright) footerCopyright.textContent = t.footer.copyright;
    
    const footerLinks = document.querySelectorAll('.footer-links a');
    if (footerLinks.length >= 3) {
        footerLinks[0].textContent = t.footer.impressum;
        footerLinks[1].textContent = t.footer.datenschutz;
        footerLinks[2].textContent = t.footer.agb;
    }
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

function updateMenu(lang) {
    const menuData = menuItems[lang] || menuItems['de'];
    const menuContainer = document.getElementById('menu-items');
    const activeTab = document.querySelector('.menu-tab.active');
    const category = activeTab ? activeTab.getAttribute('data-category') : 'vorspeisen';
    
    if (!menuContainer || !menuData) {
        console.warn('Menu container or data not found');
        return;
    }
    
    const items = menuData[category];
    if (!items) {
        console.warn(`No items found for category: ${category} in language: ${lang}`);
        return;
    }
    
    let html = '';
    items.forEach(item => {
        html += `
            <div class="menu-item">
                <div class="menu-item-content">
                    <h4>${item.name}</h4>
                    <p class="menu-item-desc">${item.desc}</p>
                    ${item.badge ? `<span class="menu-item-badge">${item.badge}</span>` : ''}
                </div>
                <div class="menu-item-price">${item.price}</div>
            </div>
        `;
    });
    menuContainer.innerHTML = html;
    
    console.log(`🍽️ Menu updated: ${category} in ${lang}`);
}