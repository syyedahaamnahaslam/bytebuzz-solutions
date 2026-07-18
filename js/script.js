// ==========================
// Scroll To Top Button
// ==========================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

});

if(topBtn){
    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });
}
// ==========================
// Scroll Reveal Animation
// ==========================

const sections = document.querySelectorAll("section");

const reveal = () => {

    sections.forEach(section => {

        const position = section.getBoundingClientRect().top;

        const screen = window.innerHeight - 100;

        if(position < screen){

            section.classList.add("show");

        }

    });

};

window.addEventListener("scroll", reveal);

reveal();

// ==========================
// Active Navigation
// ==========================

const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link=>{

    if(link.getAttribute("href")===currentPage){

        link.classList.add("active");

    }

});

// ==========================
// Contact Form Validation
// ==========================

const form = document.querySelector(".contact-form");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

const name=form.querySelector('input[type="text"]');

const email=form.querySelector('input[type="email"]');

if(name.value.trim()==="" || email.value.trim()===""){

alert("Please fill in all required fields.");

return;

}

alert("Thank you! Your message has been sent.");

form.reset();

});

}

// ==========================
// Counter Animation
// ==========================

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounter() {

    if (counterStarted) return;

    const statsSection = document.querySelector(".stats");

    if (!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100) {

        counterStarted = true;

        counters.forEach(counter => {

            const target = +counter.dataset.target;

            let count = 0;

            const speed = Math.max(1, Math.ceil(target / 50));

            const updateCounter = () => {

                if (count < target) {

                    count += speed;

                    if (count > target) count = target;

                    counter.innerText = count;

                    setTimeout(updateCounter, 30);

                } else {

                    counter.innerText = target + "+";

                }

            };

            updateCounter();

        });

    }

}

window.addEventListener("scroll", startCounter);
window.addEventListener("load", startCounter);

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

// ==========================
// Navbar Scroll Effect
// ==========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});
// Mobile hamburger menu toggle
document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector("header");
    const hamburger = document.getElementById("hamburger");

    if (hamburger && header) {

        hamburger.addEventListener("click", function () {
            header.classList.toggle("menu-open");
            hamburger.classList.toggle("active");
        });

        // close the menu automatically when a link is tapped
        document.querySelectorAll(".nav-links a").forEach(function (link) {
            link.addEventListener("click", function () {
                header.classList.remove("menu-open");
                hamburger.classList.remove("active");
            });
        });

    }

});
// Animated number counters (count up on scroll into view)
document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    function animateCounter(el) {
        const target = parseFloat(el.getAttribute("data-count"));
        const suffix = el.getAttribute("data-suffix") || "";
        const isDecimal = target % 1 !== 0;
        const duration = 1500;
        const startTime = performance.now();

        function update(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = target * eased;
            el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
            }
        }
        requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach(function (counter) {
        observer.observe(counter);
    });

});
// Animated number counters (count up on scroll into view)
document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    function formatNumber(num) {
        return num.toLocaleString("en-US");
    }

    function animateCounter(el) {
        const target = parseFloat(el.getAttribute("data-count"));
        const suffix = el.getAttribute("data-suffix") || "";
        const prefix = el.getAttribute("data-prefix") || "";
        const isDecimal = target % 1 !== 0;
        const duration = 1500;
        const startTime = performance.now();

        function update(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = target * eased;
            const displayVal = isDecimal ? current.toFixed(1) : formatNumber(Math.floor(current));
            el.textContent = prefix + displayVal + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                const finalVal = isDecimal ? target.toFixed(1) : formatNumber(target);
                el.textContent = prefix + finalVal + suffix;
            }
        }
        requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach(function (counter) {
        observer.observe(counter);
    });

});
// Live Dashboard Showcase — interactive widget
document.addEventListener("DOMContentLoaded", function () {

    const dashboard = document.querySelector(".live-dashboard");
    if (!dashboard) return;

    /* ---------- Animate bar rows + donut chart on scroll into view ---------- */
    const bars = dashboard.querySelectorAll(".dash-bar-fill");
    const donutCard = dashboard.querySelector(".dash-donut-wrap");

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                bars.forEach(function (bar) {
                    bar.style.width = bar.getAttribute("data-width");
                });
                if (donutCard) donutCard.classList.add("show");
                revealObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    revealObserver.observe(dashboard);

    /* ---------- Range filter buttons (7 / 30 / 90 days) ---------- */
    const rangeButtons = dashboard.querySelectorAll(".dash-range");

    const rangeData = {
        "7":  { revenue: 125830, customers: 3482, growth: 9.8,  order: 210, path: "M0,150 C60,120 100,170 150,110 C200,60 250,140 300,90 C350,50 400,120 450,70 C500,40 550,90 600,60" },
        "30": { revenue: 482900, customers: 12750, growth: 14.2, order: 236, path: "M0,170 C60,150 100,100 150,130 C200,160 250,80 300,110 C350,60 400,100 450,50 C500,30 550,70 600,40" },
        "90": { revenue: 1284500, customers: 39120, growth: 21.6, order: 258, path: "M0,140 C60,160 100,120 150,90 C200,150 250,60 300,100 C350,70 400,40 450,80 C500,20 550,50 600,25" }
    };

    rangeButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            rangeButtons.forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");

            const range = btn.getAttribute("data-range");
            const data = rangeData[range];
            if (!data) return;

            const revenueEl = dashboard.querySelector('[data-stat="revenue"]');
            const customersEl = dashboard.querySelector('[data-stat="customers"]');
            const growthEl = dashboard.querySelector('[data-stat="growth"]');
            const orderEl = dashboard.querySelector('[data-stat="order"]');
            const linePath = dashboard.querySelector(".dash-line-path");
            const areaPath = dashboard.querySelector(".dash-area-path");

            if (revenueEl) { revenueEl.setAttribute("data-count", data.revenue); animateSingle(revenueEl); }
            if (customersEl) { customersEl.setAttribute("data-count", data.customers); animateSingle(customersEl); }
            if (growthEl) { growthEl.setAttribute("data-count", data.growth); animateSingle(growthEl); }
            if (orderEl) { orderEl.setAttribute("data-count", data.order); animateSingle(orderEl); }

            if (linePath) linePath.setAttribute("d", data.path);
            if (areaPath) areaPath.setAttribute("d", data.path + " L600,220 L0,220 Z");
        });
    });

    function animateSingle(el) {
        const target = parseFloat(el.getAttribute("data-count"));
        const suffix = el.getAttribute("data-suffix") || "";
        const prefix = el.getAttribute("data-prefix") || "";
        const isDecimal = target % 1 !== 0;
        const duration = 900;
        const startTime = performance.now();

        function update(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            const val = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString("en-US");
            el.textContent = prefix + val + suffix;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                const finalVal = isDecimal ? target.toFixed(1) : target.toLocaleString("en-US");
                el.textContent = prefix + finalVal + suffix;
            }
        }
        requestAnimationFrame(update);
    }

    /* ---------- Cosmetic dropdown filters (region / category) ---------- */
    const selects = dashboard.querySelectorAll(".dash-filters select");
    selects.forEach(function (select) {
        select.addEventListener("change", function () {
            const card = dashboard.querySelector(".dash-chart-card");
            if (card) {
                card.style.transition = "opacity .25s ease";
                card.style.opacity = "0.4";
                setTimeout(function () { card.style.opacity = "1"; }, 250);
            }
        });
    });

});