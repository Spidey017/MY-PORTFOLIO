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

    // --- Typed.js Initialization ---
    new Typed('#typed-text', {
        strings: [
            'a final-year AI & ML Engineering student.', 
            'a passionate problem-solver.', 
            'a creative software developer.'
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
    
    // --- Vanilla Tilt Initialization ---
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 10,
        speed: 2000,
        perspective: 2000,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        glare: true,
        "max-glare": 0.1
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
});
