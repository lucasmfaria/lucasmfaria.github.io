// ======================= MOBILE NAVIGATION =======================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Add click event listener to the hamburger menu
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Add click event listener to each navigation link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    // When a link is clicked, remove the 'active' class from both hamburger and navMenu
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));


// ======================= SMOOTH SCROLLING (Optional but nice) =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});