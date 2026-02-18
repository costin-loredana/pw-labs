document.addEventListener("DOMContentLoaded", () => {
  // Update Year
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Scroll Reveal Interaction
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      }
    }
  };

  window.addEventListener("scroll", revealOnScroll);
  
  // Trigger once on load
  revealOnScroll();
});