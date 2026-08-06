/* Smooth scroll for in-page links */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

/* Rail nodes: click to jump */
document.querySelectorAll(".rail-nodes li").forEach(node => {
  node.addEventListener("click", () => {
    const target = document.getElementById(node.dataset.target);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

/* Scroll-spy: highlight active rail node + fill rail line + top progress bar */
const sections = ["hero", "courses", "projects", "certificates", "contact"]
  .map(id => document.getElementById(id))
  .filter(Boolean);

const railNodes = Array.from(document.querySelectorAll(".rail-nodes li"));
const railFill = document.getElementById("railFill");
const progressFill = document.getElementById("progressFill");

function updateOnScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (railFill) railFill.style.height = scrollPercent + "%";
  if (progressFill) progressFill.style.width = scrollPercent + "%";

  let activeIndex = 0;
  sections.forEach((section, i) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.4) {
      activeIndex = i;
    }
  });

  railNodes.forEach((node, i) => {
    node.classList.toggle("active", i === activeIndex);
  });
}

window.addEventListener("scroll", updateOnScroll, { passive: true });
window.addEventListener("resize", updateOnScroll);
updateOnScroll();

console.log("Portfolio loaded — signal path online.");
