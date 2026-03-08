/* =========================================================================
   PAYROLL SERVICES PAGE SPECIFIC JAVASCRIPT
   Timeline animations, compliance effects, process flows
   ========================================================================= */

// Reveal on Scroll Animation
const observer_reveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer_reveal.observe(el);
});

// ========== TIMELINE ANIMATION ==========
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'timelineSlide 0.6s ease-out both';
            entry.target.style.animationDelay = (index * 0.15) + 's';
        }
    });
}, { threshold: 0.1 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// ========== BENEFIT CARDS STAGGER ANIMATION ==========
const benefitCards = document.querySelectorAll('.benefit-card');

const benefitObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'benefitCardEntry 0.7s ease-out both';
            entry.target.style.animationDelay = (index * 0.15) + 's';
        }
    });
}, { threshold: 0.1 });

benefitCards.forEach(card => {
    benefitObserver.observe(card);
});

// ========== COMPLIANCE BADGES GLOW EFFECT ==========
const complianceBadges = document.querySelectorAll('.compliance-badge');

complianceBadges.forEach(badge => {
    badge.style.animation = 'complianceGlow 2.5s ease-in-out infinite';
    
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 0 30px rgba(108, 111, 255, 0.7)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 0 10px rgba(108, 111, 255, 0.3)';
    });
});

// ========== PROCESS STEPS ANIMATION ==========
const processSteps = document.querySelectorAll('.process-step');

const processObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'processStepFlow 0.6s ease-out both';
            entry.target.style.animationDelay = (index * 0.2) + 's';
        }
    });
}, { threshold: 0.1 });

processSteps.forEach(step => {
    processObserver.observe(step);
});

// Premium hover effect on benefit cards
benefitCards.forEach(card => {
    const style = card.style;
    
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-6px)';
        this.style.boxShadow = '0 20px 60px rgba(108, 111, 255, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    });
});

const counters = document.querySelectorAll(".counter");

function startCounters() {
    counters.forEach(counter => {

        const target = parseFloat(counter.dataset.target);
        const isDecimal = target % 1 !== 0;
        let current = 0;

        const duration = 2000;
        const increment = target / (duration / 16);

        function updateCounter() {
            current += increment;

            if (current >= target) {
                counter.innerText = target;
                return;
            }

            counter.innerText = isDecimal
                ? current.toFixed(1)
                : Math.floor(current);

            requestAnimationFrame(updateCounter);
        }

        updateCounter();
    });
}


/* Start counter when section appears */

const statsSection = document.querySelector(".stats-bar");

const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        startCounters();
        observer.disconnect();
    }
}, { threshold: 0.4 });

observer.observe(statsSection);
