const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const bar1 = document.getElementById('bar1');
const bar2 = document.getElementById('bar2');
const bar3 = document.getElementById('bar3');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.toggle('hidden');
    bar1.style.transform = isHidden ? '' : 'translateY(6px) rotate(45deg)';
    bar2.style.opacity   = isHidden ? '' : '0';
    bar3.style.transform = isHidden ? '' : 'translateY(-6px) rotate(-45deg)';
  });
}

const form = document.getElementById('appointment-form') || document.getElementById('hero-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = 'Trimis! Va contactam in curand.';
      btn.disabled = true;
      btn.classList.replace('bg-sky-600', 'bg-emerald-600');
    }
  });
}