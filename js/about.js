/* =========================================================================
   ABOUT PAGE SPECIFIC JAVASCRIPT
   Reveal animations and stats counters
   ========================================================================= */

const revealElements = Array.from(document.querySelectorAll('.reveal-on-scroll'));

const aboutHero = document.querySelector('.about-hero');
if (aboutHero) {
    window.setTimeout(() => {
        aboutHero.classList.add('text-show');
    }, 260);
}

if (revealElements.length > 0) {
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => element.classList.add('active'));
    }
}

const statCounters = document.querySelectorAll('.counter');
const statsSection = document.querySelector('.stats-bar');
let statsStarted = false;

function animateStats() {
    if (statsStarted || statCounters.length === 0) return;
    statsStarted = true;

    statCounters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        if (!Number.isFinite(target)) {
            counter.textContent = '0';
            return;
        }

        const hasDecimal = target % 1 !== 0;
        const duration = 1800;
        const stepMs = 16;
        const totalSteps = Math.max(1, Math.round(duration / stepMs));
        const increment = target / totalSteps;
        let current = 0;

        const updateCounter = () => {
            current += increment;

            if (current >= target) {
                counter.textContent = hasDecimal ? target.toFixed(1) : Math.round(target).toString();
                return;
            }

            counter.textContent = hasDecimal ? current.toFixed(1) : Math.floor(current).toString();
            requestAnimationFrame(updateCounter);
        };

        requestAnimationFrame(updateCounter);
    });
}

if (statsSection) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
            animateStats();
            observer.disconnect();
        }
    }, { threshold: 0.35 });

    counterObserver.observe(statsSection);
}
