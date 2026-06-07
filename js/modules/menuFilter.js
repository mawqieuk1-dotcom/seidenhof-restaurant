/* ==================== MENU FILTER MODULE ==================== */
export function initMenuFilter() {
    const menuData = {
        vorspeisen: [
            { name: 'Rinds-Carpaccio', desc: 'Mit Trüffelöl, Rucola und gehobeltem Parmesan', price: '28 CHF', badge: 'Signature' },
            { name: 'Alpen-Käsefondue', desc: 'Für 2 Personen, mit Brotwürfeln, Kartoffeln und Cornichons', price: '48 CHF' },
            { name: 'Jakobsmuscheln', desc: 'Gebraten auf Erbsen-Minz-Püree mit Speckchips', price: '34 CHF', badge: 'Neu' },
            { name: 'Spargelcremesuppe', desc: 'Mit frischem grünem Spargel und Kerbelöl', price: '22 CHF' }
        ],
        hauptgerichte: [
            { name: 'Zürcher Geschnetzeltes', desc: 'Kalbsgeschnetzeltes in Rahmsauce mit hausgemachter Rösti', price: '52 CHF', badge: 'Klassiker' },
            { name: 'Lachsforelle "Müllerin Art"', desc: 'Mit Mandelbutter, Zitrone und Dillkartoffeln', price: '46 CHF' },
            { name: 'Rinderbäckchen', desc: 'Geschmort an Rotweinjus mit Selleriepüree und Marktgemüse', price: '58 CHF' },
            { name: 'Alpenrisotto', desc: 'Mit Bergkäse, Steinpilzen und frischem Thymian', price: '38 CHF', badge: 'Vegetarisch' }
        ],
        desserts: [
            { name: 'Vermicelles-Torte', desc: 'Klassische Kastaniencreme mit Schlagrahm und Meringue', price: '18 CHF' },
            { name: 'Schokoladenfondant', desc: 'Flüssiger Kern mit Vanilleeis und Waldbeeren', price: '20 CHF', badge: 'Beliebt' },
            { name: 'Sorbet-Trio', desc: 'Himbeere, Mango und Waldmeister aus der Region', price: '14 CHF' },
            { name: 'Käseplatte', desc: 'Ausgewählte Schweizer Käsesorten mit Feigensenf', price: '24 CHF' }
        ],
        weine: [
            { name: 'Riesling "Zürichsee"', desc: '2022 – Fruchtig, mineralisch, perfekt zu Fischgerichten', price: '12 CHF / Glas' },
            { name: 'Pinot Noir "Graubünden"', desc: '2020 – Samtig, beerig, ideal zu Fleischgerichten', price: '15 CHF / Glas' },
            { name: 'Chasselas "Lavaux"', desc: '2023 – Trocken, leicht, der klassische Aperitif', price: '10 CHF / Glas' },
            { name: 'Champagne Brut', desc: 'Ausgewählte Premium-Cuvée für besondere Anlässe', price: '22 CHF / Glas', badge: 'Premium' }
        ]
    };
    
    const menuContainer = document.getElementById('menu-items');
    const menuTabs = document.querySelectorAll('.menu-tab');
    
    function renderMenu(category) {
        if (!menuContainer) return;
        
        const items = menuData[category];
        if (!items) return;
        
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
    }
    
    // Initial render
    renderMenu('vorspeisen');
    
    // Tab switching
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            menuTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            renderMenu(category);
        });
    });
    
    // Download menu button
    const downloadBtn = document.getElementById('download-menu');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('📄 In der Live-Version wird hier das gesamte Menü als PDF heruntergeladen.');
        });
    }
}