(function () {
    'use strict';
    const THEME_KEY = 'portfolio-theme';
    const root = document.documentElement;

    function currentTheme() {
        const forced = root.getAttribute('data-theme');
        if (forced) return forced;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Theme toggle
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', function () {
                const next = currentTheme() === 'dark' ? 'light' : 'dark';
                root.setAttribute('data-theme', next);
                try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage blocked */ }
            });
        }

        // Mobile menu
        const menuBtn = document.getElementById('menu-btn');
        const mobileNav = document.getElementById('mobile-nav');
        if (menuBtn && mobileNav) {
            menuBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                const open = mobileNav.classList.toggle('open');
                menuBtn.setAttribute('aria-expanded', String(open));
            });
            document.addEventListener('click', function (e) {
                if (!mobileNav.contains(e.target)) {
                    mobileNav.classList.remove('open');
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // Header background once the page scrolls
        const header = document.querySelector('.site-header');
        if (header) {
            const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
            onScroll();
            window.addEventListener('scroll', onScroll, { passive: true });
        }

        // Footer year
        const year = document.getElementById('year');
        if (year) year.textContent = new Date().getFullYear();

        observeReveal(document);
    });

    // Fade-in on scroll; exposed so JS-rendered content can opt in too
    function observeReveal(scope) {
        const items = scope.querySelectorAll('.reveal:not(.in)');
        if (!('IntersectionObserver' in window)) {
            items.forEach(el => el.classList.add('in'));
            return;
        }
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -40px 0px' });
        items.forEach(el => io.observe(el));
    }
    window.observeReveal = observeReveal;
})();
