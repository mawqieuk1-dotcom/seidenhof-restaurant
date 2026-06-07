/* ==================== NAVIGATION MODULE - SMART HEADER ==================== */
export function initNavigation() {
    
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    let scrollDirection = 'up';
    let scrollDistance = 0;
    const SCROLL_THRESHOLD = 60; // المسافة المطلوبة عشان يختفي
    
    // ==================== SMART HEADER (ظهر/اختفاء) ====================
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // تحديد اتجاه التمرير
        if (currentScrollY > lastScrollY) {
            // تمرير للأسفل
            scrollDirection = 'down';
            scrollDistance += currentScrollY - lastScrollY;
        } else {
            // تمرير للأعلى
            scrollDirection = 'up';
            scrollDistance = 0;
        }
        
        // إذا في أعلى الصفحة - أظهر الهيدر دائماً
        if (currentScrollY <= 100) {
            showHeader();
            header.classList.remove('scrolled');
        }
        // إذا تمرير للأسفل وتجاوز المسافة المحددة - اخف الهيدر
        else if (scrollDirection === 'down' && scrollDistance > SCROLL_THRESHOLD) {
            hideHeader();
        }
        // إذا تمرير للأعلى - أظهر الهيدر
        else if (scrollDirection === 'up') {
            showHeader();
            header.classList.add('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
    
    function showHeader() {
        header.classList.remove('hidden');
    }
    
    function hideHeader() {
        header.classList.add('hidden');
    }
    
    // ==================== MOBILE MENU (هامبرغر) ====================
    if (hamburger && navMenu) {
        // فتح/إغلاق القائمة
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // منع التمرير عند فتح القائمة
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // إغلاق القائمة عند الضغط على أي رابط
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ==================== ACTIVE LINK ON SCROLL ====================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 250;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // حالة خاصة: home في الأعلى
        if (scrollY < 300) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // ==================== الحالة الأولية ====================
    showHeader();
    
    console.log('🧭 Smart Navigation initialized');
    console.log('   📱 Mobile: Top header with hamburger menu');
    console.log('   💻 Desktop: Top sticky header');
    console.log('   👆 Shows on scroll up, hides on scroll down');
}