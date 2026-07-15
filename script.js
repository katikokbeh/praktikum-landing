document.addEventListener("DOMContentLoaded", () => {

    /* ── Scroll-reveal ── */
    const targets = document.querySelectorAll(
        '.problem-card, .module, .result-item, .audience-card, ' +
        '.trust-card, .trust-stat, .pricing-card, .bonus-item'
    );
    targets.forEach(el => {
        el.classList.add('animate-on-scroll');
        const siblings = Array.from(el.parentElement.querySelectorAll('.animate-on-scroll'));
        const idx = siblings.indexOf(el);
        el.style.transitionDelay = `${idx * 70}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    /* ── Smooth anchor scroll ── */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const t = document.querySelector(link.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });

    /* ── Parallax orbs ── */
    const parallaxEls = document.querySelectorAll('.mascot-float, .orb');
    if (parallaxEls.length && window.matchMedia('(min-width: 769px)').matches) {
        let ticking = false;
        window.addEventListener('mousemove', e => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const cx = (e.clientX / window.innerWidth - 0.5) * 2;
                const cy = (e.clientY / window.innerHeight - 0.5) * 2;
                parallaxEls.forEach((el, i) => {
                    const depth = (i % 3 + 1) * 8;
                    el.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
                });
                ticking = false;
            });
        });
    }

    /* ── Accordion modules ── */
    const modules = document.querySelectorAll('.module');
    modules.forEach((mod, idx) => {
        const header = mod.querySelector('.module-header');
        if (!header) return;

        // First module in each week open by default
        const isFirstInGroup = idx === 0 || mod.previousElementSibling === null ||
            !mod.previousElementSibling.classList.contains('module');

        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');

        header.addEventListener('click', () => {
            const isOpen = mod.classList.contains('open');
            // Close siblings in same week
            const parent = mod.closest('.modules-list');
            if (parent) {
                parent.querySelectorAll('.module').forEach(m => {
                    m.classList.remove('open');
                    const h = m.querySelector('.module-header');
                    if (h) h.setAttribute('aria-expanded', 'false');
                });
            }
            if (!isOpen) {
                mod.classList.add('open');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
});
