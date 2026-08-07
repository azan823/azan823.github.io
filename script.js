/* ============================================================
   SMOOTH SCROLL FOR IN-PAGE LINKS
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        closeMobileMenu();
      }
    }
  });
});

/* ============================================================
   MOBILE MENU
   ============================================================ */
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

/* ============================================================
   SCROLL-SPY + PROGRESS BAR
   ============================================================ */
const sectionIds = ["hero", "about", "skills", "courses", "projects", "experience", "achievements", "contact"];
const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
const navAnchors = Array.from(document.querySelectorAll(".nav-links a, .mobile-menu a"));
const progressFill = document.getElementById("progressFill");

function updateOnScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressFill) progressFill.style.width = scrollPercent + "%";

  let activeId = sections[0] ? sections[0].id : null;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.4) {
      activeId = section.id;
    }
  });

  navAnchors.forEach(a => {
    a.classList.toggle("active", a.dataset.target === activeId);
  });
}

window.addEventListener("scroll", updateOnScroll, { passive: true });
window.addEventListener("resize", updateOnScroll);
updateOnScroll();

/* ============================================================
   TYPING ANIMATION (hero role)
   ============================================================ */
const roles = [
  "Machine Learning Engineer",
  "AI Developer",
  "Electrical Engineer",
  "Python Developer",
  "LangChain Developer"
];
const typedEl = document.getElementById("typedRole");

if (typedEl) {
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = false;

  function tick() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      if (charIndex > current.length) {
        charIndex = current.length;
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      charIndex--;
      if (charIndex < 0) {
        charIndex = 0;
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    typedEl.textContent = current.slice(0, charIndex);
    setTimeout(tick, deleting ? 35 : 65);
  }

  typedEl.textContent = "";
  charIndex = 0;
  setTimeout(tick, 500);
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("in-view"));
}

/* ============================================================
   SKILL BAR FILL ON SCROLL
   ============================================================ */
const skillBars = document.querySelectorAll(".skill-bar-fill");
if ("IntersectionObserver" in window && skillBars.length) {
  const barObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const level = entry.target.dataset.level || "0";
          entry.target.style.width = level + "%";
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  skillBars.forEach(bar => barObserver.observe(bar));
} else {
  skillBars.forEach(bar => { bar.style.width = (bar.dataset.level || "0") + "%"; });
}

/* ============================================================
   PROJECT CARD TILT
   ============================================================ */
const tiltCards = document.querySelectorAll(".project-card, .featured-project");
tiltCards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 6;
    card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ============================================================
   AMBIENT PARTICLES
   ============================================================ */
const particleContainer = document.getElementById("particles");
if (particleContainer) {
  const count = window.innerWidth < 700 ? 14 : 28;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.bottom = -20 + "px";
    p.style.animationDuration = 14 + Math.random() * 18 + "s";
    p.style.animationDelay = Math.random() * 20 + "s";
    p.style.opacity = 0.2 + Math.random() * 0.4;
    particleContainer.appendChild(p);
  }
}

console.log("Portfolio loaded.");
