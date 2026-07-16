document.addEventListener('DOMContentLoaded', () => {

    const introOverlay = document.getElementById('intro-overlay');
    const skipIntroBtn = document.getElementById('skip-intro');
    const body = document.body;

    const endIntro = () => {
        if (!introOverlay.classList.contains('hidden')) {
            introOverlay.classList.add('hidden');
            body.classList.remove('no-scroll');
            sessionStorage.setItem('introPlayed', 'true');
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 1200); // Match curtain transition duration
        }
    };

    if (sessionStorage.getItem('introPlayed')) {
        introOverlay.style.display = 'none';
    } else {
        body.classList.add('no-scroll');
        setTimeout(() => {
            introOverlay.classList.add('visible');
        }, 100);
        
        skipIntroBtn.addEventListener('click', endIntro);
        setTimeout(endIntro, 4500); // Auto-hide after 4.5 seconds
    }

    // --- Mobile Navigation ---
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuBtn.addEventListener('click', () => mobileNav.classList.add('active'));
    closeBtn.addEventListener('click', () => mobileNav.classList.remove('active'));
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => mobileNav.classList.remove('active'));
    });

    // --- Auto-hide Header on scroll ---
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            // Downscroll
            header.style.top = `-${header.offsetHeight}px`;
        } else {
            // Upscroll
            header.style.top = '0';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);


    // --- Typed.js Initialization ---
    new Typed('#typed-text', {
        strings: [
            'a Python Full Stack Developer.',
            'an AI & ML Engineer.',
            'a recent B.E. Graduate.'
        ],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 2000,
        loop: true,
        smartBackspace: true,
    });

    // --- AOS Initialization ---
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
    });

    // --- Particles.js Initialization ---
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.4, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": {
                "repulse": { "distance": 150, "duration": 0.4 },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });

    // --- Formspree Contact Form Handling ---
    const form = document.getElementById('contact-form');
    
    async function handleSubmit(event) {
        event.preventDefault();
        const status = document.getElementById('form-status');
        const data = new FormData(event.target);
        
        // Simple client-side validation
        if (!data.get('name') || !data.get('email') || !data.get('message')) {
            status.innerHTML = "Please fill out all fields.";
            status.className = 'error';
            return;
        }

        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.innerHTML = "Thanks for your message! I'll get back to you soon.";
                status.className = 'success';
                form.reset();
            } else {
                response.json().then(data => {
                    status.innerHTML = data.errors ? data.errors.map(error => error.message).join(", ") : "Oops! There was a problem submitting your form.";
                    status.className = 'error';
                })
            }
        } catch (error) {
            status.innerHTML = "Oops! There was a network error. Please try again.";
            status.className = 'error';
        }
    }
    form.addEventListener("submit", handleSubmit);
});
