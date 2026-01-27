// ======================= MOBILE NAVIGATION =======================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    // Add click event listener to the hamburger menu
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        // Recalculate spacing when the mobile menu toggles (header/menu may change layout)
        syncHeaderSpacing();
    });

    // Add click event listener to each navigation link
    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        // When a link is clicked, remove the 'active' class from both hamburger and navMenu
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
}


// ======================= SMOOTH SCROLLING (Optional but nice) =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetSelector = this.getAttribute('href');
        const targetEl = document.querySelector(targetSelector);
        if (!targetEl) return; // nothing to scroll to

        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
    });
});

// ======================= DYNAMIC FOOTER YEAR =======================
document.addEventListener('DOMContentLoaded', () => {
    const footerParas = document.querySelectorAll('footer p');
    const year = new Date().getFullYear();
    footerParas.forEach(p => {
        p.innerHTML = p.innerHTML.replace(/\d{4}/, year);
    });
    // initial sync of header spacing to avoid fixed header overlapping content
    syncHeaderSpacing();
});

// Keep header spacing in sync with the actual header height.
// This ensures the fixed header doesn't overlap the top of the page content on mobile
// (useful when header height can change due to responsive layout or menu toggling).
function syncHeaderSpacing() {
    const header = document.querySelector('.header');
    const main = document.querySelector('main');
    if (!header || !main) return;
    const h = header.offsetHeight;
    // update CSS variable used for scroll-padding (if present)
    document.documentElement.style.setProperty('--header-height', h + 'px');
    // also add explicit top padding to main so content is pushed below the fixed header
    main.style.paddingTop = h + 'px';
}

// Recompute on window resize to handle orientation changes / dynamic layout
window.addEventListener('resize', syncHeaderSpacing);

// ======================= SCROLL ANIMATIONS =======================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, {
    root: null,
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: "0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// ======================= ACTIVE NAVIGATION HIGHLIGHTING =======================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if (sections.length > 0) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove("active"));
                // Add active class to the link corresponding to the visible section
                // We check if the href ENDS with the id (to handle /index.html#about vs #about)
                const matchingLink = document.querySelector(`.nav-link[href*="#${id}"]`);
                if (matchingLink) {
                    matchingLink.classList.add("active");
                }
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the section is visible
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });
}