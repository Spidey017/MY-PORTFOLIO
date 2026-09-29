document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Futuristic Intro Loader Sequence ---
    const loader = document.getElementById('futuristic-loader');
    const circle = document.getElementById('loader-progress-circle');
    const percentageText = document.getElementById('loader-percentage');
    const statusText = document.getElementById('loader-status-text');
    const skipBtn = document.getElementById('skip-intro-btn');

    let currentProgress = 0;
    const totalCircumference = 264; // 2 * pi * r (approx for r=42)

    const statuses = [
        'Booting runtime...',
        'Linking modules...',
        'Loading AI engines...',
        'Optimizing interface...',
        'System online.'
    ];

    const dismissLoader = () => {
        if (!loader || loader.classList.contains('pointer-events-none')) return;
        loader.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 700);
    };

    if (skipBtn) {
        skipBtn.addEventListener('click', dismissLoader);
    }

    const loaderInterval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 8) + 4;
        if (currentProgress > 100) currentProgress = 100;

        if (percentageText) percentageText.innerText = `${currentProgress}%`;
        if (circle) {
            const offset = totalCircumference - (currentProgress / 100) * totalCircumference;
            circle.style.strokeDashoffset = offset;
        }

        const statusIdx = Math.min(Math.floor((currentProgress / 100) * statuses.length), statuses.length - 1);
        if (statusText) statusText.innerText = statuses[statusIdx];

        if (currentProgress >= 100) {
            clearInterval(loaderInterval);
            setTimeout(dismissLoader, 400);
        }
    }, 45);

    // --- 2. Interactive Ambient Particle Canvas ---
    const canvas = document.getElementById('ambient-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize, { passive: true });

        const particles = [];
        const particleCount = Math.min(Math.floor(window.innerWidth / 20), 45);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 0.8
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const isDark = document.documentElement.classList.contains('dark');
            ctx.fillStyle = isDark ? 'rgba(99, 102, 241, 0.35)' : 'rgba(79, 70, 229, 0.25)';
            ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(79, 70, 229, 0.06)';

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
    }

    // --- 3. Dark / Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme_preference_v2026');
    if (savedTheme === 'light') {
        htmlElement.classList.remove('dark');
    } else {
        htmlElement.classList.add('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme_preference_v2026', 'light');
            } else {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme_preference_v2026', 'dark');
            }
        });
    }

    // --- 4. Mobile Navigation Drawer ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileClose = document.getElementById('mobile-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const openMobile = () => {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => mobileDrawer.classList.remove('translate-x-full'), 10);
        document.body.classList.add('overflow-hidden');
    };

    const closeMobile = () => {
        mobileDrawer.classList.add('translate-x-full');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }, 300);
    };

    if (mobileToggle) mobileToggle.addEventListener('click', openMobile);
    if (mobileClose) mobileClose.addEventListener('click', closeMobile);
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) closeMobile();
        });
    }
    mobileLinks.forEach(link => link.addEventListener('click', closeMobile));

    // --- 5. Project Category Filtering ---
    const filterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-brand-600', 'text-white');
                b.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
            });
            btn.classList.add('active', 'bg-brand-600', 'text-white');
            btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');

            const category = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category') || '';
                if (category === 'all' || cardCategory.includes(category)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 6. Quick Copy Email Functionality ---
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = 'ayanattar49@gmail.com';
            const tempInput = document.createElement('input');
            tempInput.value = email;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            copyEmailBtn.innerHTML = '<i class="fas fa-check text-emerald-500 text-sm"></i>';
            setTimeout(() => {
                copyEmailBtn.innerHTML = '<i class="far fa-copy text-sm"></i>';
            }, 2000);
        });
    }

    // --- 7. Intersection Observer for Scroll Reveals ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // --- 8. Scrollspy for Active Navigation Link ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.pageYOffset + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    // --- 9. Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);

            formFeedback.classList.remove('hidden', 'bg-emerald-500/20', 'text-emerald-300', 'bg-rose-500/20', 'text-rose-300');
            formFeedback.classList.add('block', 'bg-brand-500/20', 'text-brand-300');
            formFeedback.innerText = 'Transmitting message...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formFeedback.classList.remove('bg-brand-500/20', 'text-brand-300');
                    formFeedback.classList.add('bg-emerald-500/20', 'text-emerald-300');
                    formFeedback.innerText = 'Thank you! Your message has been received.';
                    contactForm.reset();
                } else {
                    formFeedback.classList.remove('bg-brand-500/20', 'text-brand-300');
                    formFeedback.classList.add('bg-rose-500/20', 'text-rose-300');
                    formFeedback.innerText = 'Unable to deliver message right now. Please reach out directly to ayanattar49@gmail.com';
                }
            } catch (error) {
                formFeedback.classList.remove('bg-brand-500/20', 'text-brand-300');
                formFeedback.classList.add('bg-rose-500/20', 'text-rose-300');
                formFeedback.innerText = 'Network error encountered. Please email ayanattar49@gmail.com directly.';
            } finally {
                submitBtn.disabled = false;
            }
        });
    }
});