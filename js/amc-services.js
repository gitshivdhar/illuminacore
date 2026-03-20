/* =========================================================================
   AMC SERVICES PAGE JAVASCRIPT
   Hero animation and stats counters
   ========================================================================= */

const amcHero = document.querySelector(".amc-hero");
const amcHeroBg = document.querySelector(".amc-hero .hero-bg");
const amcHeroContent = document.querySelector(".amc-hero .hero-content");

if (amcHeroBg) {
    amcHeroBg.classList.add("active");
    amcHeroBg.classList.add("zoom");
}

if (amcHero && amcHeroContent) {
    setTimeout(() => {
        amcHero.classList.add("text-show");
        amcHeroContent.classList.add("text-show");
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
