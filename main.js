document.addEventListener('DOMContentLoaded', () => {
    // 1. Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // 2. Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                if (entry.target.classList.contains('stats-container')) {
                    animateCounters();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal class to sections and cards
    document.querySelectorAll('section, .feature-card, .pricing-card, .stats-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        revealObserver.observe(el);
    });

    // CSS for revealed state (injected via JS for simplicity, or could be in style.css)
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 3. Mouse Movement Paralax (Hero)
    const hero = document.querySelector('.hero');
    const sphere = document.querySelector('.sphere-container');

    hero.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        sphere.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // 4. Navbar Background Change on Scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '15px 5%';
            nav.style.background = 'rgba(3, 0, 20, 0.9)';
        } else {
            nav.style.padding = '20px 5%';
            nav.style.background = 'rgba(3, 0, 20, 0.7)';
        }
    });

    // 5. Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
