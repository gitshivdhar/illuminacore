/* =========================================================================
   SHARED JAVASCRIPT - COMMON ACROSS ALL PAGES
   ========================================================================= */

// Header scroll effect
document.addEventListener('scroll', () => {
    const header = document.getElementById('siteHeader');
    if (header) {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Mobile Menu & Dropdown Interaction
document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".dropdown");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav.main-nav");
    const currentFile = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    const currentHash = window.location.hash || "";
    const solutionPages = ["exam-solutions.html", "payroll-services.html", "manpower-outsourcing.html"];

    const socialLinks = document.querySelectorAll(".social-icon");
    socialLinks.forEach(link => {
        if (link.hasAttribute("aria-label")) return;
        const icon = link.querySelector("i");
        const classes = icon ? Array.from(icon.classList) : [];

        let label = "Social media link";
        if (classes.some(cls => cls.includes("linkedin"))) label = "LinkedIn";
        else if (classes.some(cls => cls.includes("twitter"))) label = "Twitter";
        else if (classes.some(cls => cls.includes("facebook"))) label = "Facebook";

        link.setAttribute("aria-label", label);
        link.setAttribute("title", label);
    });

    const solutionsDropdownToggle = document.querySelector(".dropdown .dropdown-toggle");
    if (solutionsDropdownToggle && solutionPages.includes(currentFile)) {
        solutionsDropdownToggle.classList.add("activeLi");
    }

    const solutionMenuLinks = document.querySelectorAll(".dropdown .mega-menu-link");
    solutionMenuLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;

        const url = new URL(href, window.location.origin + "/");
        const linkFile = (url.pathname.split("/").pop() || "").toLowerCase();
        const linkHash = url.hash || "";

        if (linkFile !== currentFile) return;

        if (currentFile === "exam-solutions.html") {
            if (currentHash.toLowerCase() === "#tablet-assessment" && linkHash === "#tablet-assessment") {
                link.classList.add("active-menu-link");
            } else if (linkHash === "") {
                link.classList.add("active-menu-link");
            }
            return;
        }

        link.classList.add("active-menu-link");
    });

    const resetMobileDropdowns = () => {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove("active");
            const toggle = dropdown.querySelector(".dropdown-toggle");
            if (toggle) {
                toggle.setAttribute("aria-expanded", "false");
            }
        });
    };

    // Inject shared mobile-nav styles once
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
                    right: 0 !important;
                    left: auto !important;
                    width: min(72vw, 300px) !important;
                    z-index: 999;
                    transform: translateX(100%) !important;
                    transition: transform 0.3s ease !important;
                }
                nav.main-nav.mobile-active {
                    right: 0 !important;
                    left: auto !important;
                    transform: translateX(0) !important;
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
                    width: min(78vw, 300px) !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    if (nav) {
        resetMobileDropdowns();

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
                const isOpen = nav.classList.contains("mobile-active");

                if (isOpen) {
                    closeMobileMenu();
                } else {
                    nav.classList.add("mobile-active");
                    overlay.classList.add("active");
                    document.body.style.overflow = "hidden";
                }
            });
        }

        overlay.addEventListener("click", closeMobileMenu);

        // AUTO-CLOSE: Close menu when a nav link is clicked
        const navLinks = nav.querySelectorAll(".mega-menu-link, .mobile-cta-link");

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 992) {
                    closeMobileMenu();
                }
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 992) {
                closeMobileMenu();
            } else {
                resetMobileDropdowns();
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

    // Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
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

    const revealElements = Array.from(document.querySelectorAll(".reveal-on-scroll"));
    if (revealElements.length > 0) {
        const revealElement = (element) => {
            element.classList.add("active");
        };

        if ("IntersectionObserver" in window) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        revealElement(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });

            revealElements.forEach(element => {
                revealObserver.observe(element);
            });
        } else {
            revealElements.forEach(revealElement);
        }
    }

    const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const setTriggerLabel = (trigger, html, expanded) => {
        if (!trigger) return;
        if (trigger.innerHTML === html) {
            trigger.setAttribute("aria-expanded", expanded ? "true" : "false");
            return;
        }

        trigger.classList.remove("label-swap-in");
        trigger.classList.add("label-swap-out");

        setTimeout(() => {
            trigger.innerHTML = html;
            trigger.setAttribute("aria-expanded", expanded ? "true" : "false");
            trigger.classList.remove("label-swap-out");
            trigger.classList.add("label-swap-in");

            setTimeout(() => {
                trigger.classList.remove("label-swap-in");
            }, 180);
        }, 120);
    };

    const expansionLayers = document.querySelectorAll(".service-expansion-layer");

    expansionLayers.forEach(layer => {
        const expansionCards = Array.from(layer.querySelectorAll(".glass-card")).filter(card =>
            card.querySelector(".expand-content") && card.querySelector(".btn-text")
        );

        const syncExpandedSpacing = () => {
            const hasExpandedCard = expansionCards.some(card =>
                card.classList.contains("is-open") || card.classList.contains("is-preview")
            );
            layer.classList.toggle("has-expanded-card", hasExpandedCard);
        };

        expansionCards.forEach(card => {
            const trigger = card.querySelector(".btn-text");
            const expandContent = card.querySelector(".expand-content");
            if (!trigger || !expandContent) return;

            card.classList.add("service-expansion-card");
            trigger.classList.add("service-expand-trigger");

            if (trigger.previousElementSibling === expandContent) {
                card.insertBefore(trigger, expandContent);
            }

            trigger.onclick = null;
            trigger.removeAttribute("onclick");
            trigger.setAttribute("aria-expanded", "false");
            expandContent.classList.remove("hidden");

            if (hoverCapable) {
                trigger.addEventListener("mouseenter", () => {
                    if (card.classList.contains("is-open")) return;
                    card.classList.add("is-preview");
                    setTriggerLabel(trigger, "Show Less &uarr;", true);
                    syncExpandedSpacing();
                });
                
                card.addEventListener("mouseleave", () => {
                    if (card.classList.contains("is-open")) return;
                    card.classList.remove("is-preview");
                    setTriggerLabel(trigger, "Learn More &rarr;", false);
                    syncExpandedSpacing();
                });
            }

            trigger.addEventListener("click", () => {
                const willOpen = !card.classList.contains("is-open");

                expansionCards.forEach(otherCard => {
                    otherCard.classList.remove("is-open");
                    otherCard.classList.remove("is-preview");
                    const otherTrigger = otherCard.querySelector(".service-expand-trigger");
                    if (otherTrigger) {
                        setTriggerLabel(otherTrigger, "Learn More &rarr;", false);
                    }
                });

                if (willOpen) {
                    card.classList.add("is-open");
                    card.classList.remove("is-preview");
                    setTriggerLabel(trigger, "Show Less &uarr;", true);
                } else {
                    setTriggerLabel(trigger, "Learn More &rarr;", false);
                }

                syncExpandedSpacing();
            });
        });
    });

    const threeDSelector = [
        ".card",
        ".feature-card",
        ".benefit-card",
        ".timeline-item",
        ".fancy-glass-item",
        ".process-step",
        ".recruitment-step",
        ".legal-card",
        ".business-kpi-card",
        ".service-lane-card",
        ".business-services-showcase"
    ].join(", ");

    const threeDElements = Array.from(document.querySelectorAll(threeDSelector));
    const pointerCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    threeDElements.forEach(element => {
        element.classList.add("tilt-3d");

        if (!pointerCapable) return;

        element.addEventListener("mousemove", (event) => {
            const rect = element.getBoundingClientRect();
            const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
            const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
            const rotateY = relativeX * 10;
            const rotateX = -relativeY * 8;

            element.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        element.addEventListener("mouseleave", () => {
            element.style.transform = "";
        });
    });
});
