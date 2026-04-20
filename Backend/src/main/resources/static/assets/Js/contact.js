
(function () {
    'use strict';

    // Same server serves both frontend and API
    const API_URL = '/api/contact';
    const form = document.getElementById('connect-form');
    const submitBtn = document.getElementById('form-submit');

    if (!form || !submitBtn) return;

    // Store original button text
    const originalBtnText = submitBtn.textContent;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const subject = document.getElementById('contact-subject').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        // Basic client-side validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        // Disable button and show loading state
        setLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, subject, message }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                showNotification(data.message || 'Message sent successfully!', 'success');
                form.reset();
            } else {
                showNotification(data.message || 'Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            showNotification(
                'Unable to connect to server. Please try again later or email me directly.',
                'error'
            );
        } finally {
            setLoading(false);
        }
    });

    /**
     * Toggle loading state on submit button
     */
    function setLoading(isLoading) {
        submitBtn.disabled = isLoading;
        if (isLoading) {
            submitBtn.textContent = 'SENDING...';
            submitBtn.classList.add('loading');
        } else {
            submitBtn.textContent = originalBtnText;
            submitBtn.classList.remove('loading');
        }
    }

    /**
     * Show a notification message below the form
     */
    function showNotification(message, type) {
        // Remove existing notification if any
        const existing = document.querySelector('.form-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `form-notification form-notification--${type}`;
        notification.innerHTML = `
            <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
            <span class="notification-text">${message}</span>
        `;

        // Insert after the form
        form.parentNode.insertBefore(notification, form.nextSibling);

        // Auto-remove after 6 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 6000);
    }
})();
