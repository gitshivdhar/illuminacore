/* =========================================================================
   INDEX PAGE SPECIFIC JAVASCRIPT
   Hero Slider, Stats Counter, Typing Effect, Reveal on Scroll
   ========================================================================= */

// ========== HERO SLIDER WITH PREMIUM ANIMATIONS ==========
const bg1 = document.querySelector(".bg1");
const bg2 = document.querySelector(".bg2");
const title = document.getElementById("hero-title");
const desc = document.getElementById("hero-desc");
const content = document.querySelector(".hero-content");

const slides = [
    {
        image: "images/hero-bg-1.webp",
        title: "Transforming <span class=\"text-accent\">Enterprise</span> Workforce & Solutions",
        desc: "Providing cutting-edge manpower outsourcing..."
    },
    {
        image: "images/hero-bg-2.webp",
        title: "Secure & <span class=\"text-accent\">Scalable</span> Exam Platforms",
        desc: "Delivering reliable online examination systems..."
    },
    {
        image: "images/hero-bg-3.webp",
        title: "Empowering <span class=\"text-accent\">India's</span> Workforce",
        desc: "Connecting skilled professionals with top organizations..."
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

// ========== TYPING EFFECT ANIMATION ==========
const typingTexts = document.querySelectorAll(".typing-text");
const servicesSection = document.getElementById("services");

let typedStarted = false;

function typeEffect(element, speed = 18) {
    const originalHTML = element.innerHTML;
    element.innerHTML = "";

    let index = 0;

    function type() {
        if (index < originalHTML.length) {
            element.innerHTML += originalHTML.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

function startTyping() {
    if (typedStarted) return;
    typedStarted = true;

    typingTexts.forEach((el, i) => {
        setTimeout(() => {
            typeEffect(el);
        }, i * 500); // stagger
    });
}

if (servicesSection) {
    const observer_services = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            startTyping();
        }
    }, { threshold: 0.4 });

    observer_services.observe(servicesSection);
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
