(() => {
  "use strict";

  // Mobile menu
  const menuToggle = document.getElementById("menuToggle");
  const menuClose = document.getElementById("menuClose");
  const mobileMenu = document.getElementById("mobileMenu");

  function openMenu() {
    mobileMenu.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  menuToggle?.addEventListener("click", openMenu);
  menuClose?.addEventListener("click", closeMenu);
  mobileMenu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  // Hero slide rotator
  const slides = Array.from(document.querySelectorAll(".hero__slide"));
  const dots = Array.from(document.querySelectorAll(".hero__dot"));
  let activeSlide = 0;
  let rotateTimer;

  function showSlide(index) {
    slides[activeSlide]?.classList.remove("is-active");
    dots[activeSlide]?.classList.remove("is-active");
    activeSlide = index % slides.length;
    slides[activeSlide]?.classList.add("is-active");
    dots[activeSlide]?.classList.add("is-active");
  }

  function startRotation() {
    clearInterval(rotateTimer);
    rotateTimer = setInterval(() => showSlide(activeSlide + 1), 5500);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      startRotation();
    });
  });

  if (slides.length) startRotation();

  // Navbar background on scroll
  const navbar = document.getElementById("navbar");
  function onScroll() {
    if (window.scrollY > 40) {
      navbar.style.background = "rgba(255, 255, 255, 0.96)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.8)";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // Stat counters
  const counters = document.querySelectorAll(".stats__number");
  if (counters.length && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10) || 0;
          const suffix = el.dataset.suffix || "";
          const duration = 1400;
          const start = performance.now();

          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
            el.textContent = value + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  }
})();
