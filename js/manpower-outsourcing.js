/* =========================================================================
   MANPOWER OUTSOURCING PAGE SPECIFIC JAVASCRIPT
   Recruitment flow, compliance animations, service transforms
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

// ========== RECRUITMENT FLOW ANIMATION ==========
const recruitmentSteps = document.querySelectorAll('.recruitment-step');

const recruitmentObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'recruitmentStep 0.6s ease-out both';
            entry.target.style.animationDelay = (index * 0.15) + 's';
        }
    });
}, { threshold: 0.1 });

recruitmentSteps.forEach(step => {
    recruitmentObserver.observe(step);
});

// ========== SERVICE EXPANSION CARDS ==========
const serviceCards = document.querySelectorAll('.service-expansion-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.08) translateY(-8px)';
        this.style.boxShadow = '0 25px 70px rgba(108, 111, 255, 0.4)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    });

    card.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
});

// ========== EMPLOYMENT TYPE BADGES ROTATION ==========
const employmentBadges = document.querySelectorAll('.employment-badge');

employmentBadges.forEach((badge, index) => {
    badge.style.animation = 'badgeRotation 3s ease-in-out infinite';
    badge.style.animationDelay = (index * 0.5) + 's';
});

// ========== COMPLIANCE CHECKLIST ANIMATION ==========
const complianceChecks = document.querySelectorAll('.compliance-check');

const complianceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'checkMark 0.6s ease-out both';
            entry.target.style.animationDelay = (index * 0.15) + 's';
        }
    });
}, { threshold: 0.2 });

complianceChecks.forEach(check => {
    complianceObserver.observe(check);
});

// ========== PARTNER LOGO PULSE ==========
const partnerLogos = document.querySelectorAll('.partner-pulse');

partnerLogos.forEach(logo => {
    logo.style.animation = 'partnerPulse 2s ease-in-out infinite';

    logo.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.15)';
        this.style.filter = 'brightness(1.3)';
    });

    logo.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
        this.style.filter = 'brightness(1)';
    });

    logo.style.transition = 'all 0.3s ease';
});

// ========== STATISTICS GROWTH ANIMATION ==========
const statsGrow = document.querySelectorAll('.stats-grow');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'statsGrow 1.5s ease-out both';
            entry.target.style.animationDelay = (index * 0.2) + 's';
        }
    });
}, { threshold: 0.1 });

statsGrow.forEach(stat => {
    statsObserver.observe(stat);
});

// ========== DEPLOYMENT FLOW ANIMATION ==========
const deploymentFlows = document.querySelectorAll('.deployment-flow');

deploymentFlows.forEach(flow => {
    flow.style.animation = 'deploymentFlow 2s ease-in-out infinite';
});


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
                counter.innerText = target;
                return;
            }

            if (target % 1 !== 0) {
                counter.innerText = current.toFixed(1);
            } else {
                counter.innerText = Math.floor(current);
            }

            requestAnimationFrame(updateCounter);
        }

        updateCounter();

    });

}


/* Run when section enters viewport */

const statsBar = document.querySelector(".stats-bar");

const observer = new IntersectionObserver((entries) => {

    if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
    }

}, { threshold: 0.4 });

observer.observe(statsBar);