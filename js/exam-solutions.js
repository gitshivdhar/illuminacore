/* =========================================================================
   EXAM SOLUTIONS PAGE SPECIFIC JAVASCRIPT
   Page reveal animations, Feature card interactions
   ========================================================================= */
// ========== HERO SLIDER WITH PREMIUM ANIMATIONS ==========
const bg1 = document.querySelector(".bg1");
const bg2 = document.querySelector(".bg2");
const title = document.getElementById("hero-title");
const desc = document.getElementById("hero-desc");
const content = document.querySelector(".hero-content");

const slides = [
    {
        image: "images/specialized_assessments.webp",
        title: "Advanced <span class=\"text-accent\">Computer Based</span> & Tablet Testing",
        desc: "Secure Computer Based Test (CBT) and Tablet Based Test (TBT) platforms designed for large-scale examinations with real-time monitoring, high reliability, and scalable infrastructure."
    },
    {
        image: "images/omr-process-real.webp",
        title: "End-to-End <span class=\"text-accent\">OMR</span> & Result Processing",
        desc: "Comprehensive OMR sheet supply, high-speed scanning, and accurate result processing services ensuring fast evaluation and reliable data handling for competitive examinations."
    },
    {
        image: "images/workforce-solution.webp",
        title: "Enterprise <span class=\"text-accent\">IT Services</span> & Workforce Solutions",
        desc: "Professional manpower outsourcing, payroll management, and IT & ITeS AMC services including computer systems, network infrastructure, and data center support for organizations across India."
    }
];

let current = 0;
let showingBg1 = true;

/* Initial Setup */
if (bg1 && slides.length > 0) {
    bg1.style.backgroundImage = `url('${slides[0].image}')`;
    bg1.style.opacity = 1;
    bg1.classList.add("zoom");
}

/* Trigger first text animation */
if (content) {
    setTimeout(() => content.classList.add("text-show"), 300);
}

function changeSlide() {
    if (!content || !bg1 || !bg2) return;

    // Hide text first
    content.classList.remove("text-show");

    setTimeout(() => {
        current = (current + 1) % slides.length;

        const nextBg = showingBg1 ? bg2 : bg1;
        const currentBg = showingBg1 ? bg1 : bg2;

        nextBg.style.backgroundImage = `url('${slides[current].image}')`;
        nextBg.style.opacity = 1;
        currentBg.style.opacity = 0;

        nextBg.classList.remove("zoom");
        void nextBg.offsetWidth;
        nextBg.classList.add("zoom");

        if (title) title.innerHTML = slides[current].title;
        if (desc) desc.innerText = slides[current].desc;

        showingBg1 = !showingBg1;

        // Show text again with premium animation
        setTimeout(() => content.classList.add("text-show"), 200);

    }, 600);
}

if (bg1 && bg2 && content) {
    setInterval(changeSlide, 6000);
}


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

// ========== PREMIUM PAGE ANIMATIONS ==========

// Animate feature cards with stagger on scroll
const featureCards = document.querySelectorAll('.feature-card');

const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'cardFadeInScale 0.6s ease-out both';
            entry.target.style.animationDelay = (index * 0.15) + 's';
        }
    });
}, { threshold: 0.1 });

featureCards.forEach(card => {
    cardsObserver.observe(card);
});

// Animate section headers
const sectionHeaders = document.querySelectorAll('.section-header');

const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'headerSlideIn 0.6s ease-out';
        }
    });
}, { threshold: 0.1 });

sectionHeaders.forEach(header => {
    headerObserver.observe(header);
});

// Premium hover effects on feature cards
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px)';
        const icon = this.querySelector('.card-icon');
        if (icon) {
            icon.style.transform = 'translateY(-8px) rotate(5deg)';
        }
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        const icon = this.querySelector('.card-icon');
        if (icon) {
            icon.style.transform = 'rotate(0)';
        }
    });
});

// Add smooth transitions to icons
document.querySelectorAll('.card-icon').forEach(icon => {
    icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
});

const counters = document.querySelectorAll(".counter");

const startCounters = () => {
    counters.forEach(counter => {

        const target = parseFloat(counter.getAttribute("data-target"));
        const isDecimal = target % 1 !== 0;
        let current = 0;

        const duration = 2000; // animation time
        const stepTime = 16;
        const steps = duration / stepTime;
        const increment = target / steps;

        const updateCounter = () => {
            current += increment;

            if (current >= target) {
                counter.innerText = target;
                return;
            }

            counter.innerText = isDecimal
                ? current.toFixed(1)
                : Math.floor(current);

            requestAnimationFrame(updateCounter);
        };

        updateCounter();
    });
};


/* Trigger when section becomes visible */
const statsSection = document.querySelector(".stats-bar");

const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        startCounters();
        observer.disconnect(); // run only once
    }
}, { threshold: 0.5 });

observer.observe(statsSection);
