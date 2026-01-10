if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("DOMContentLoaded", () => {
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
});


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


function smoothScrollTo(targetY, duration = 3500) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing elegante y constante
    const ease = progress;

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}


initSmoothScrollButtons();

  document.querySelectorAll('.toggle-map').forEach(button => {
    button.addEventListener('click', () => {
      const container = button.nextElementSibling;
      const expanded = button.getAttribute('aria-expanded') === 'true';

      button.setAttribute('aria-expanded', !expanded);
      button.textContent = expanded ? 'Ver mapa ↓' : 'Ocultar mapa ↑';

      if (expanded) {
        container.style.maxHeight = '0px';
      } else {
        container.style.maxHeight = container.scrollHeight + 'px';
      }
    });
  });

  const modalButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll("[data-close]");


modalButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = document.getElementById(btn.dataset.modal);
    openModal(modal);
  });
});


closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    closeModal(btn.closest(".fixed"));
  });
});

function openModal(modal) {
  modal.classList.remove("opacity-0", "pointer-events-none");
  modal.querySelector("div").classList.remove("scale-95");
}

function closeModal(modal) {
  modal.classList.add("opacity-0", "pointer-events-none");
  modal.querySelector("div").classList.add("scale-95");
}

document.querySelectorAll(".itinerary-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const dot = btn.parentElement.querySelector(".timeline-dot");
    const line = document.querySelector(".timeline-line");
    const items = [...document.querySelectorAll(".itinerary-btn")];
    const index = items.indexOf(btn);
    const progress = ((index + 1) / items.length) * 100;

    line.style.setProperty("--progress", `${progress}%`);

    // Cerrar otros
    document.querySelectorAll(".itinerary-content").forEach(c => {
      if (c !== content) c.classList.add("hidden");
    });

    document.querySelectorAll(".timeline-dot").forEach(d => {
      d.classList.remove("active");
    });

    // Abrir actual
    content.classList.toggle("hidden");
    dot.classList.add("active");

    // Scroll centrado
    const y =
      btn.parentElement.getBoundingClientRect().top +
      window.pageYOffset -
      window.innerHeight / 2 +
      btn.parentElement.offsetHeight / 2;

    smoothScrollTo(y, 1200);
    
  });
});

document.querySelectorAll("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.scroll);
    if (!target) return;

    const y =
      target.getBoundingClientRect().top + window.pageYOffset;

    smoothScrollTo(y, 1800);
  });
});

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top >= -100 && top < 300) {
      // aquí puedes marcar activa en el índice
    }
  });
});













