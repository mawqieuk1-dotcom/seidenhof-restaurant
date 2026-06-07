/* ==================== RESERVATION MODULE - WITH WHATSAPP ==================== */
export function initReservation() {
    const reservationForm = document.getElementById('reservation-form');
    const formSuccess = document.getElementById('form-success');
    
    if (!reservationForm) return;
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Validate
        if (!validateForm()) return;
        
        // Collect data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            guests: document.getElementById('guests').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            message: document.getElementById('message').value.trim()
        };
        
        // Send to WhatsApp
        sendToWhatsApp(formData);
        
        // Show success
        showSuccess(reservationForm, formSuccess);
    });
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input && input.value) {
                input.value = '';
                input.placeholder = 'Vielen Dank! Sie sind angemeldet.';
                setTimeout(() => {
                    input.placeholder = 'Ihre E-Mail-Adresse';
                }, 3000);
            }
        });
    }
}

function validateForm() {
    let isValid = true;
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const guests = document.getElementById('guests');
    const date = document.getElementById('date');
    const time = document.getElementById('time');
    
    // Name validation
    if (!name.value.trim()) {
        showError(name, 'Name ist erforderlich');
        isValid = false;
    } else if (name.value.trim().length < 3) {
        showError(name, 'Name muss mindestens 3 Zeichen lang sein');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'E-Mail ist erforderlich');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
        isValid = false;
    }
    
    // Guests validation
    if (!guests.value) {
        showError(guests, 'Bitte wählen Sie die Anzahl der Gäste');
        isValid = false;
    }
    
    // Date validation
    if (!date.value) {
        showError(date, 'Bitte wählen Sie ein Datum');
        isValid = false;
    } else {
        const selectedDate = new Date(date.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showError(date, 'Bitte wählen Sie ein zukünftiges Datum');
            isValid = false;
        }
    }
    
    // Time validation
    if (!time.value) {
        showError(time, 'Bitte wählen Sie eine Uhrzeit');
        isValid = false;
    }
    
    return isValid;
}

function showError(element, message) {
    element.style.borderColor = '#c44d4d';
    element.style.backgroundColor = '#fff5f5';
    
    // Remove existing error
    const existingError = element.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Add error message
    const errorSpan = document.createElement('span');
    errorSpan.className = 'error-message';
    errorSpan.textContent = message;
    errorSpan.style.cssText = `
        color: #c44d4d;
        font-size: 12px;
        margin-top: 4px;
        display: block;
        font-weight: 500;
    `;
    element.parentElement.appendChild(errorSpan);
    
    // Remove error on input
    element.addEventListener('input', function() {
        element.style.borderColor = '';
        element.style.backgroundColor = '';
        const err = element.parentElement.querySelector('.error-message');
        if (err) err.remove();
    }, { once: true });
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(err => err.remove());
    document.querySelectorAll('#reservation-form input, #reservation-form select, #reservation-form textarea').forEach(el => {
        el.style.borderColor = '';
        el.style.backgroundColor = '';
    });
}

function sendToWhatsApp(data) {
    const phoneNumber = '966507652943'; // الرقم المطلوب
    const message = encodeURIComponent(
        `🍽️ *Neue Tischreservierung - Restaurant Seidenhof*\n\n` +
        `👤 *Name:* ${data.name}\n` +
        `📧 *E-Mail:* ${data.email}\n` +
        `📞 *Telefon:* ${data.phone || 'Nicht angegeben'}\n` +
        `👥 *Gäste:* ${data.guests}\n` +
        `📅 *Datum:* ${data.date}\n` +
        `⏰ *Uhrzeit:* ${data.time}\n` +
        `💬 *Wünsche:* ${data.message || 'Keine'}\n\n` +
        `_Gesendet über die Website_`
    );
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // فتح الواتساب في نافذة جديدة
    window.open(whatsappURL, '_blank');
}

function showSuccess(form, successDiv) {
    form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    form.style.opacity = '0';
    form.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        form.style.display = 'none';
        successDiv.style.display = 'block';
        
        requestAnimationFrame(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateY(20px)';
            successDiv.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            requestAnimationFrame(() => {
                successDiv.style.opacity = '1';
                successDiv.style.transform = 'translateY(0)';
            });
        });
    }, 400);
}