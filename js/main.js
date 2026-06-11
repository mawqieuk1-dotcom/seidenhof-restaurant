/* ==================== MAIN JAVASCRIPT ==================== */
import { initNavigation } from './modules/navigation.js';
import { initMenuFilter } from './modules/menuFilter.js';
import { initReservation } from './modules/reservation.js';
import { initAnimations } from './modules/animations.js';
import { initLanguage } from './modules/language.js';
import { initGallery } from './modules/gallery.js';
import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics
inject();

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all modules
    initAnimations();
    initNavigation();
    initMenuFilter();
    initReservation();
    initLanguage();
    initGallery();
    
    console.log('🍽️  Restaurant Seidenhof — All modules initialized successfully.');
    console.log('📍  Zürich, Switzerland');
    console.log('✨  Ready for deployment on Vercel.');
    
});
