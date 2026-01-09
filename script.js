const startBtn = document.getElementById("startBtn");
const overlay = document.getElementById("overlay");
const music = document.getElementById("music");
const weddingDate = new Date(2026, 5, 10, 13, 0, 0);
const scrollBtn = document.getElementById("scrollHistoria");
const historiaSection = document.getElementById("historia");
const bibliaSection = document.getElementById("biblia");

startBtn.addEventListener("click", () => {
  music.play();

  overlay.classList.add("opacity-0");

  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 700);

  // ⏳ primero texto
  setTimeout(() => {
    startTextAnimations();
  }, 2000);

  // ⏳ luego contador
  setTimeout(() => {
    showCountdown();
  }, 2800); // aparece después del texto
});

if (scrollBtn && historiaSection) {
    scrollBtn.addEventListener("click", () => {
      const y =
        historiaSection.getBoundingClientRect().top +
        window.pageYOffset;

      smoothScrollTo(y, 2200);
    });
  }

  function initSmoothScrollButtons() {
  const buttons = document.querySelectorAll(".scroll-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.scroll;
      const target = document.getElementById(targetId);

      if (!target) return;

      const y =
        target.getBoundingClientRect().top +
        window.pageYOffset;

      smoothScrollTo(y, 2200);
    });
  });
}

function startTextAnimations() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-anim");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 1
    }
  );


  document.querySelectorAll(".observe").forEach(el => {
    observer.observe(el);
  });
}

function showCountdown() {
  const countdown = document.getElementById("countdown");
  countdown.classList.add("show-anim");
}


function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

function smoothScrollTo(targetY, duration = 1500) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // easing (suave y elegante)
    const ease = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, startY + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

initSmoothScrollButtons();



