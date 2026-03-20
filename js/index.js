/* =========================================================================
   INDEX PAGE SPECIFIC JAVASCRIPT
   Hero Slider, Stats Counter, Reveal on Scroll
   ========================================================================= */

// ========== HERO SLIDER WITH SERVICE FOCUS ==========
const bg1 = document.querySelector(".bg1");
const bg2 = document.querySelector(".bg2");
const title = document.getElementById("hero-title");
const desc = document.getElementById("hero-desc");
const heroCta = document.getElementById("hero-cta");
const content = document.querySelector(".hero-content");
const heroDirections = ["from-left", "from-right", "from-top", "from-bottom"];

const slides = [
    {
        label: "Manpower Outsourcing",
        image: "images/hero-outsourcing.webp",
        title: "Strategic <span class=\"text-accent\">Manpower</span> Outsourcing",
        desc: "Scale field teams, contract staffing, and workforce deployment with structured HR operations and pan-India execution.",
        href: "manpower-outsourcing.html"
    },
    {
        label: "Payroll Services",
        image: "images/hero-payroll.webp",
        title: "Compliant <span class=\"text-accent\">Payroll</span> and Statutory Control",
        desc: "Automate salary cycles, statutory deductions, tax workflows, and reporting with enterprise-grade accuracy.",
        href: "payroll-services.html"
    },
    {
        label: "Examination Solutions",
        image: "images/hero-exam.webp",
        title: "Secure <span class=\"text-accent\">Examination</span> Platforms at Scale",
        desc: "Deliver controlled digital assessments, candidate workflows, and high-capacity exam execution without compromise.",
        href: "exam-solutions.html"
    },
    {
        label: "Tablet Based Test",
        image: "images/tab-based-test.webp",
        title: "Portable <span class=\"text-accent\">Tablet-Based</span> Assessments",
        desc: "Run secure assessments beyond fixed labs with managed tablet kits, rapid setup, and encrypted sync workflows.",
        href: "exam-solutions.html#tablet-assessment"
    },
    {
        label: "OMR Evaluation",
        image: "images/omr-process.webp",
        title: "Fast <span class=\"text-accent\">OMR</span> Evaluation and Result Processing",
        desc: "Handle high-volume answer sheet scanning, validation, and result compilation with industrial-speed precision.",
        href: "exam-solutions.html#omr-process"
    },
    {
        label: "IT and ITeS AMC",
        image: "images/venue_command_center.webp",
        title: "Critical <span class=\"text-accent\">IT Support</span> and AMC Coverage",
        desc: "Protect operations with preventive maintenance, network support, and SLA-bound response for exam and enterprise systems.",
        href: "exam-solutions.html#it-ites-amc"
    },
    {
        label: "BPO and KPO",
        image: "images/hero-bg-3.webp",
        title: "Managed <span class=\"text-accent\">BPO</span> and KPO Operations",
        desc: "Extend your process capacity with voice, non-voice, analytics, and support operations under governed delivery controls.",
        href: "exam-solutions.html#bpo-kpo-support"
    }
];

let current = 0;
let showingBg1 = true;
let currentDirection = "from-bottom";

function getNextDirection() {
    const availableDirections = heroDirections.filter(direction => direction !== currentDirection);
    const nextDirection = availableDirections[Math.floor(Math.random() * availableDirections.length)];
    currentDirection = nextDirection;
    return nextDirection;
}

function applySlideContent(slide) {
    if (title) title.innerHTML = slide.title;
    if (desc) desc.innerText = slide.desc;
    if (heroCta) heroCta.setAttribute("href", slide.href);
}

function setBackgroundState(element, slide, isActive) {
    if (!element || !slide) return;
    element.style.backgroundImage = `url('${slide.image}')`;
    element.dataset.direction = slide.direction || currentDirection;
    element.classList.remove("is-leaving");
    if (!isActive) {
        element.classList.remove("is-zoomed");
    }
    element.classList.toggle("is-active", isActive);
}

if (bg1 && slides.length > 0) {
    slides[0].direction = currentDirection;
    applySlideContent(slides[0]);
    setBackgroundState(bg1, slides[0], true);
    window.setTimeout(() => {
        bg1.classList.add("is-zoomed");
    }, 220);
}

if (content) {
    setTimeout(() => content.classList.add("text-show"), 340);
}

function changeSlide() {
    if (!content || !bg1 || !bg2) return;

    content.classList.remove("text-show");

    setTimeout(() => {
        current = (current + 1) % slides.length;
        const nextSlide = slides[current];
        nextSlide.direction = getNextDirection();

        const nextBg = showingBg1 ? bg2 : bg1;
        const currentBg = showingBg1 ? bg1 : bg2;

        currentBg.classList.remove("is-active");
        currentBg.classList.add("is-leaving");
        setBackgroundState(nextBg, nextSlide, false);
        void nextBg.offsetWidth;
        setBackgroundState(nextBg, nextSlide, true);

        applySlideContent(nextSlide);

        window.setTimeout(() => {
            nextBg.classList.add("is-zoomed");
        }, 220);

        window.setTimeout(() => {
            currentBg.classList.remove("is-leaving");
            currentBg.classList.remove("is-zoomed");
        }, 1700);

        showingBg1 = !showingBg1;

        setTimeout(() => content.classList.add("text-show"), 280);
    }, 420);
}

if (bg1 && bg2 && content) {
    setInterval(changeSlide, 6200);
}

// ========== STATS COUNTER ANIMATION ==========
const counters = document.querySelectorAll(".counter");
const statsSection = document.querySelector(".stats-bar");

let started = false;

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + "K+";
    }
    return num + "+";
}

function startCounting() {
    if (started) return;
    started = true;

    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const duration = 2000;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        let count = 0;

        const updateCount = () => {
            count += increment;

            if (count < target) {
                counter.innerText = formatNumber(Math.floor(count));
                setTimeout(updateCount, stepTime);
            } else {
                counter.innerText = formatNumber(target);
            }
        };

        updateCount();
    });
}

/* Trigger when section appears */
if (statsSection) {
    const observer_stats = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            startCounting();
        }
    }, { threshold: 0.5 });

    observer_stats.observe(statsSection);
}

// ========== REVEAL ON SCROLL ANIMATION ==========
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



const track = document.querySelector(".cert-track");

if(track){
    track.innerHTML += track.innerHTML;
}
