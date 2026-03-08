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

        // Show text again
        setTimeout(() => content.classList.add("text-show"), 200);

    }, 600);
}

if (bg1 && bg2 && content) {
    setInterval(changeSlide, 6000);
}


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

// --- Reveal on Scroll Logic ---
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

// --- Dropdown and Mobile Menu Interaction ---
document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".dropdown");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav.main-nav");

    // Inject shared mobile-nav styles once so all pages behave the same.
    if (!document.getElementById("mobile-nav-global-styles")) {
        const style = document.createElement("style");
        style.id = "mobile-nav-global-styles";
        style.textContent = `
            .mobile-overlay {
                position: fixed;
                inset: 0;
                background: rgba(2, 4, 10, 0.72);
                backdrop-filter: blur(2px);
                z-index: 998;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.25s ease, visibility 0.25s ease;
            }
            .mobile-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            .mobile-close-btn {
                display: none;
            }
            .mobile-cta-link {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                margin-top: 0.25rem;
                padding: 0.78rem 1rem;
                border-radius: 999px;
                font-weight: 700;
                text-decoration: none;
                color: #ffffff;
                background: linear-gradient(135deg, #6C6FFF, #8b6fff);
                box-shadow: 0 10px 26px rgba(108, 111, 255, 0.35);
            }
            @media (max-width: 992px) {
                nav.main-nav {
                    right: -100vw !important;
                    left: auto !important;
                    width: min(88vw, 360px) !important;
                    z-index: 999;
                }
                nav.main-nav.mobile-active {
                    right: 0 !important;
                    left: auto !important;
                }
                .mobile-close-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border: 1px solid rgba(255, 255, 255, 0.16);
                    border-radius: 8px;
                    color: rgba(255, 255, 255, 0.88);
                    background: rgba(255, 255, 255, 0.05);
                    margin-bottom: 1.2rem;
                    cursor: pointer;
                }
                .mobile-cta {
                    width: 100%;
                }
                nav.main-nav .nav-list > li,
                nav.main-nav .dropdown,
                nav.main-nav .dropdown-toggle {
                    width: 100%;
                }
                nav.main-nav .dropdown-toggle {
                    justify-content: space-between;
                }
                nav.main-nav .mega-menu {
                    width: 100%;
                    max-width: 100%;
                }
                nav.main-nav .mega-menu-link {
                    width: 100%;
                    padding: 0.4rem 0;
                }
            }
            @media (max-width: 640px) {
                nav.main-nav {
                    width: 100vw !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    if (nav) {
        let overlay = document.querySelector(".mobile-overlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.className = "mobile-overlay";
            document.body.appendChild(overlay);
        }

        const closeMobileMenu = () => {
            nav.classList.remove("mobile-active");
            overlay.classList.remove("active");
            document.body.style.overflow = "";

            dropdowns.forEach(dropdown => {
                dropdown.classList.remove("active");
                const t = dropdown.querySelector(".dropdown-toggle");
                if (t) t.setAttribute("aria-expanded", "false");
            });
        };

        if (!nav.querySelector(".mobile-close-btn")) {
            const closeBtn = document.createElement("button");
            closeBtn.type = "button";
            closeBtn.className = "mobile-close-btn md:hidden";
            closeBtn.setAttribute("aria-label", "Close Menu");
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            nav.insertBefore(closeBtn, nav.firstChild);
            closeBtn.addEventListener("click", closeMobileMenu);
        }

        if (!nav.querySelector(".mobile-cta")) {
            const ul = nav.querySelector("ul");
            if (ul) {
                const li = document.createElement("li");
                li.className = "mobile-cta md:hidden";
                li.innerHTML = '<a href="index.html#contact" class="mobile-cta-link">Partner With Us</a>';
                ul.appendChild(li);
            }
        }

        if (menuToggle) {
            menuToggle.addEventListener("click", () => {
                nav.classList.add("mobile-active");
                overlay.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        }

        overlay.addEventListener("click", closeMobileMenu);

        // AUTO-CLOSE: Close menu when a nav link is clicked
        const navLinks = nav.querySelectorAll(".nav-link, .mega-menu-link, .mobile-cta-link");
        navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                if (window.innerWidth <= 992) {
                    closeMobileMenu();
                }
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 992) {
                closeMobileMenu();
            }
        });
    }

    // Handle standard dropdown toggles
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector(".dropdown-toggle");
        if (!toggle) return;

        toggle.addEventListener("click", (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                dropdown.classList.toggle("active");
                const isExpanded = dropdown.classList.contains("active");
                toggle.setAttribute("aria-expanded", isExpanded);

                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove("active");
                        const otherToggle = other.querySelector(".dropdown-toggle");
                        if (otherToggle) otherToggle.setAttribute("aria-expanded", "false");
                    }
                });
            }
        });

        // Keyboard accessibility
        toggle.addEventListener("keydown", (e) => {
            if ((e.key === "Enter" || e.key === " ") && window.innerWidth <= 992) {
                e.preventDefault();
                dropdown.classList.toggle("active");
                const isExpanded = dropdown.classList.contains("active");
                toggle.setAttribute("aria-expanded", isExpanded);
            }
        });

        // AUTO-CLOSE: Close dropdown when an option is selected
        const megaMenuLinks = dropdown.querySelectorAll(".mega-menu-link");
        megaMenuLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 992) {
                    dropdown.classList.remove("active");
                    toggle.setAttribute("aria-expanded", "false");
                }
            });
        });
    });

    // Close dropdowns when clicking outside (desktop) - IMPROVED
    document.addEventListener("click", (e) => {
        // Check if click is outside navigation area
        if (!e.target.closest(".dropdown") && !e.target.closest(".menu-toggle") && !e.target.closest("nav")) {
            if (window.innerWidth > 992) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove("active");
                    const t = dropdown.querySelector(".dropdown-toggle");
                    if (t) t.setAttribute("aria-expanded", "false");
                });
            }
        }
    });
});


