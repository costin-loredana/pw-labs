/* ORL Hospital - Main Script */

document.addEventListener("DOMContentLoaded", () => {

  // --- Dynamic year ---
  const yearEls = document.querySelectorAll("#year");
  const y = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = y);

  // --- Hamburger menu ---
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  const bar1 = document.getElementById("bar1");
  const bar2 = document.getElementById("bar2");
  const bar3 = document.getElementById("bar3");

  if (btn && menu) {
    btn.addEventListener("click", () => {
      const isOpen = !menu.classList.contains("hidden");
      menu.classList.toggle("hidden");

      if (!isOpen) {
        // Animate to X
        bar1.style.transform = "translateY(8px) rotate(45deg)";
        bar2.style.opacity = "0";
        bar3.style.transform = "translateY(-8px) rotate(-45deg)";
      } else {
        bar1.style.transform = "";
        bar2.style.opacity = "";
        bar3.style.transform = "";
      }
    });

    // Close menu when a link is clicked
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.add("hidden");
        bar1.style.transform = "";
        bar2.style.opacity = "";
        bar3.style.transform = "";
      });
    });
  }


});

