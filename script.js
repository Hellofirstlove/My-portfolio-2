// Main Application — Scrollable Single-Page Portfolio
document.addEventListener('DOMContentLoaded', function () {
    initHamburgerMenu();
    initScrollProgress();
    initTypingEffect();
    initRevealOnScroll();
    initSmoothNavLinks();

});

/* ── Hamburger menu ─────────────────────────── */
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    function closeMobileMenu() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }
    // make closeMobileMenu global for inline onclick if needed
    window.closeMobileMenu = closeMobileMenu;

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', () => {
            closeMobileMenu();
            const t = document.querySelector(a.getAttribute('href'));
            if (t) setTimeout(() => t.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
        });
    });
}

/* ── Scroll progress bar + nav shrink ────────── */
function initScrollProgress() {
    const progress = document.getElementById('progress');
    const nav = document.getElementById('nav');
    if (!progress || !nav) return;

    window.addEventListener('scroll', () => {
        const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
        progress.style.width = pct + '%';
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
}

/* ── Typing effect ──────────────────────────── */
function initTypingEffect() {
    const typedEl = document.getElementById('typed');
    if (!typedEl) return;

    const phrases = ['Software Engineer', 'Full-Stack Developer', 'Competitive Programmer', 'Problem Solver'];
    let pi = 0, ci = 0, deleting = false;

    function type() {
        const phrase = phrases[pi];
        typedEl.textContent = phrase.substring(0, ci);
        if (!deleting) {
            if (ci < phrase.length) { ci++; setTimeout(type, 80); }
            else { deleting = true; setTimeout(type, 1800); }
        } else {
            if (ci > 0) { ci--; setTimeout(type, 45); }
            else { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); }
        }
    }
    setTimeout(type, 1200);
}

/* ── Reveal on scroll (IntersectionObserver) ─── */
function initRevealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => io.observe(el));
}

/* ── Smooth nav links ───────────────────────── */
function initSmoothNavLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const t = document.querySelector(a.getAttribute('href'));
            if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}
