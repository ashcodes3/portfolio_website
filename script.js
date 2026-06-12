/* ============================================
   PORTFOLIO — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCursorGlow();
    initNavbar();
    initMobileNav();
    initTypewriter();
    initScrollReveal();
    initCountUp();
    initSmoothScroll();
    initActiveNav();
});

/* ============================================
   PARTICLES
   ============================================ */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const count = window.innerWidth < 768 ? 20 : 40;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 2 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.opacity = Math.random() * 0.4 + 0.1;

        const colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#818cf8'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(particle);
    }
}

/* ============================================
   CURSOR GLOW
   ============================================ */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
        glow.classList.remove('active');
    });

    function animate() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;
        requestAnimationFrame(animate);
    }
    animate();
}

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const observer = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', observer, { passive: true });
    observer();
}

/* ============================================
   MOBILE NAVIGATION
   ============================================ */
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/* ============================================
   TYPEWRITER EFFECT
   ============================================ */
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const roles = [
        '3DEXPERIENCE Platform Specialist',
        'PLM Solutions Engineer',
        'AI & Python Enthusiast',
        'Enterprise Tech Consultant',
        'Customer Success Champion'
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let speed = 80;

    function type() {
        const current = roles[roleIdx];

        if (isDeleting) {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            speed = 40;
        } else {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            speed = 80;
        }

        if (!isDeleting && charIdx === current.length) {
            speed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    setTimeout(type, 1200);
}

/* ============================================
   SCROLL REVEAL ANIMATION
   ============================================ */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.timeline-item, .skill-category, .education-card, .cert-card, .contact-card, .about-grid, .section-header'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach(el => observer.observe(el));
}

/* ============================================
   COUNT-UP ANIMATION
   ============================================ */
function initCountUp() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count);
                    const duration = 2000;
                    const start = performance.now();

                    function update(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out quart
                        const eased = 1 - Math.pow(1 - progress, 4);
                        el.textContent = Math.floor(eased * target);

                        if (progress < 1) {
                            requestAnimationFrame(update);
                        } else {
                            el.textContent = target;
                        }
                    }

                    requestAnimationFrame(update);
                    observer.unobserve(el);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(c => observer.observe(c));
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });
}

/* ============================================
   ACTIVE NAV LINK HIGHLIGHT
   ============================================ */
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },
        { rootMargin: '-20% 0px -80% 0px' }
    );

    sections.forEach(section => observer.observe(section));
}
