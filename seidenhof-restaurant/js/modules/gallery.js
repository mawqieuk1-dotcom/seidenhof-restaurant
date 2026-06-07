/* ==================== INSTAGRAM CAROUSEL - GUARANTEED ==================== */
export function initGallery() {
    
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    
    // Exit if elements don't exist
    if (!track) {
        console.warn('Carousel track not found');
        return;
    }
    
    const slides = track.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let isTransitioning = false;
    
    console.log('📸 Carousel initialized with', totalSlides, 'slides');
    
    // ===== CREATE DOTS =====
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', 'Bild ' + (i + 1));
            dot.addEventListener('click', function() {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    // ===== UPDATE DOTS =====
    function updateDots(index) {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // ===== GO TO SLIDE =====
    function goToSlide(index) {
        if (isTransitioning) return;
        if (index < 0 || index >= totalSlides) return;
        
        isTransitioning = true;
        currentIndex = index;
        
        const offset = -currentIndex * 100;
        track.style.transform = 'translateX(' + offset + '%)';
        
        updateDots(currentIndex);
        
        setTimeout(function() {
            isTransitioning = false;
        }, 500);
    }
    
    // ===== NEXT & PREV =====
    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0); // Loop back to first
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(totalSlides - 1); // Loop to last
        }
    }
    
    // ===== BUTTON EVENTS =====
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
        });
    }
    
    // ===== TOUCH SUPPORT =====
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide(); // Swipe left = next
            } else {
                prevSlide(); // Swipe right = prev
            }
        }
    }
    
    // ===== KEYBOARD =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
        }
    });
    
    // ===== AUTOPLAY =====
    let autoplayInterval;
    
    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(function() {
            nextSlide();
        }, 4000);
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }
    
    // Start autoplay
    startAutoplay();
    
    // Pause on hover
    const container = track.parentElement;
    if (container) {
        container.addEventListener('mouseenter', stopAutoplay);
        container.addEventListener('mouseleave', startAutoplay);
    }
    
    // ===== INIT =====
    createDots();
    
    // Set initial position
    track.style.transform = 'translateX(0%)';
    
    console.log('✅ Carousel ready! Use arrows, swipe, or keyboard to navigate.');
}