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