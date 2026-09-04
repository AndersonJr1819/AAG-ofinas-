document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    const navLinks = document.querySelectorAll('.header-nav a, header nav a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }

        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (linkHref && linkHref !== '#') {
                    window.location.href = linkHref;
                }
            }
        });
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const animateElements = document.querySelectorAll('.step-card, .service-card, .personalization-card, .founder-card, .benefit-card, .smartcare-content');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observerInstance.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animateElements.forEach(el => {
            if (el) {
                observer.observe(el);
            }
        });
    }

    const interactiveCards = document.querySelectorAll('.step-card, .service-card, .personalization-card, .founder-card, .benefit-card');
    interactiveCards.forEach(card => {
        if (!card.hasAttribute('tabindex')) {
            card.setAttribute('tabindex', '0');
        }
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const link = card.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
    });
});