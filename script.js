document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.closest('.service-image')) return;
            this.classList.toggle('active');
        });
    });

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section, .quote, .portfolio-item, .service-item, .privacy-note');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(15px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });

    const avatar = document.querySelector('.avatar');
    if (avatar && !('ontouchstart' in window)) {
        avatar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        avatar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    const theaterIcon = document.querySelector('.service-item[data-service="theater"] i');
    if (theaterIcon) {
        theaterIcon.className = 'fas fa-mask';
    }

    const codingIcon = document.querySelector('.service-item[data-service="coding"] i');
    if (codingIcon) {
        codingIcon.className = 'fas fa-code';
    }

    const gamingIcon = document.querySelector('.service-item[data-service="gaming"] i');
    if (gamingIcon && !gamingIcon.classList.contains('fa-gamepad')) {
        gamingIcon.className = 'fas fa-gamepad';
    }

    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});

function showNotification(message) {
    let notification = document.querySelector('.custom-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'custom-notification';
        
        const isMobile = window.innerWidth <= 768;
        
        notification.style.cssText = `
            position: fixed;
            bottom: ${isMobile ? '16px' : '20px'};
            right: ${isMobile ? '16px' : '20px'};
            left: ${isMobile ? '16px' : 'auto'};
            background: #1e293b;
            color: white;
            padding: ${isMobile ? '12px 20px' : '15px 25px'};
            border-radius: ${isMobile ? '30px' : '50px'};
            font-size: ${isMobile ? '0.9rem' : '0.95rem'};
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            border-left: 4px solid #3b82f6;
            text-align: center;
            max-width: ${isMobile ? 'calc(100% - 32px)' : '400px'};
        `;
        document.body.appendChild(notification);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    notification.textContent = message;
    
    if (notification.timeoutId) {
        clearTimeout(notification.timeoutId);
    }
    
    notification.timeoutId = setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function copyEmailToClipboard() {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        const email = emailLink.getAttribute('href').replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            showNotification('Email скопирован в буфер обмена!');
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
        });
    }
}

window.copyEmailToClipboard = copyEmailToClipboard;
window.showNotification = showNotification;
