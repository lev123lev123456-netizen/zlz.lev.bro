/**
 * Скрипт для сайта-визитки Льва
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Обработка кликов по карточкам увлечений (появление картинок)
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Предотвращаем всплытие события, если клик был по изображению
            if (e.target.closest('.service-image')) return;
            
            // Переключаем класс active для текущего элемента
            this.classList.toggle('active');
        });
    });

    // 2. Плавная прокрутка для всех внутренних ссылок
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

    // 3. Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Применяем анимацию к секциям
    const sections = document.querySelectorAll('.section, .quote, .portfolio-item');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // 4. Динамическое обновление года (если добавите footer)
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 5. Обработка клика по кнопке приложения (ракета)
    const appBtn = document.querySelector('.app-btn');
    if (appBtn) {
        appBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('🚀 Запуск приложения...');
            
            // Здесь можно добавить анимацию ракеты
            this.style.animation = 'rocketLaunch 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    }

    // 6. Маска для телефона
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Звонок по номеру: ' + this.textContent);
        });
    });

    // 7. Анимация для аватара
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        avatar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // 8. Устанавливаем правильные иконки
    // Театр
    const theaterIcon = document.querySelector('.service-item[data-service="theater"] i');
    if (theaterIcon) {
        theaterIcon.className = 'fas fa-mask';
    }

    // Кодинг
    const codingIcon = document.querySelector('.service-item[data-service="coding"] i');
    if (codingIcon) {
        codingIcon.className = 'fas fa-code';
    }

    // Гейминг (уже должно быть правильно, но на всякий случай)
    const gamingIcon = document.querySelector('.service-item[data-service="gaming"] i');
    if (gamingIcon && !gamingIcon.classList.contains('fa-gamepad')) {
        gamingIcon.className = 'fas fa-gamepad';
    }

    // Добавляем анимацию для ракеты
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rocketLaunch {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
            100% { transform: translateY(0) rotate(0deg); }
        }
    `;
    document.head.appendChild(style);

});

// Функция для показа уведомлений
function showNotification(message) {
    let notification = document.querySelector('.custom-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'custom-notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #1e293b;
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            font-size: 0.9rem;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            border-left: 4px solid #3b82f6;
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

// Функция для копирования email
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