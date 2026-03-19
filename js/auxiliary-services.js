/* =========================================================================
   AUXILIARY SERVICES PAGE JAVASCRIPT
   Hero animation and stats counters
   ========================================================================= */

const auxiliaryHero = document.querySelector(".auxiliary-hero");
const auxiliaryHeroBg = document.querySelector(".auxiliary-hero .hero-bg");
const auxiliaryHeroContent = document.querySelector(".auxiliary-hero .hero-content");

if (auxiliaryHeroBg) {
    auxiliaryHeroBg.classList.add("active");
    auxiliaryHeroBg.classList.add("zoom");
}

if (auxiliaryHero && auxiliaryHeroContent) {
    setTimeout(() => {
        auxiliaryHero.classList.add("text-show");
        auxiliaryHeroContent.classList.add("text-show");
    }, 260);
}

const counters = document.querySelectorAll(".counter");

function animateCounters() {
    counters.forEach(counter => {
        const target = parseFloat(counter.dataset.target);
        const duration = 2000;
        const frameRate = 16;
        const totalFrames = duration / frameRate;

        let current = 0;
        const increment = target / totalFrames;

        function updateCounter() {
            current += increment;

            if (current >= target) {
                counter.innerText = target % 1 !== 0 ? target.toFixed(1) : Math.floor(target);
                return;
            }

            counter.innerText = target % 1 !== 0
                ? current.toFixed(1)
                : Math.floor(current);

            requestAnimationFrame(updateCounter);
        }

        updateCounter();
    });
}

const statsBar = document.querySelector(".stats-bar");

if (statsBar) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect();
        }
    }, { threshold: 0.4 });

    observer.observe(statsBar);
}
