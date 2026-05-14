// ===== INDEX.JS — Homepage Scripts =====

// Animated Counter Stats
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

// Spawning random coins from sky
function spawnRandomCoins() {
  const container = document.getElementById('floatingCoins');
  if (!container) return;
  const emojis = ['🪙', '⭐', '💎', '❤️'];
  const coin = document.createElement('div');
  coin.classList.add('coin');
  coin.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  coin.style.left = Math.random() * window.innerWidth + 'px';
  coin.style.top = (window.innerHeight * 0.6 + Math.random() * 100) + 'px';
  coin.style.fontSize = (14 + Math.random() * 10) + 'px';
  coin.style.animationDuration = (2 + Math.random() * 2) + 's';
  container.appendChild(coin);
  setTimeout(() => coin.remove(), 4000);
}

setInterval(spawnRandomCoins, 2000);

// Staggered service card entrance
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

// Typewriter effect for hero sub
const heroSub = document.querySelector('.hero-sub');
if (heroSub) {
  const text = heroSub.textContent;
  heroSub.textContent = '';
  let i = 0;
  const typeTimer = setInterval(() => {
    heroSub.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(typeTimer);
  }, 60);
}

// Mario bounce on hover
const pixelMario = document.getElementById('pixelMario');
if (pixelMario) {
  pixelMario.addEventListener('mouseenter', () => {
    pixelMario.style.animationDuration = '0.3s';
  });
  pixelMario.addEventListener('mouseleave', () => {
    pixelMario.style.animationDuration = '0.8s';
  });
}

// Service card click navigation
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    const color = card.getAttribute('data-color');
    card.style.transform = 'scale(0.97)';
    setTimeout(() => card.style.transform = '', 100);
  });
});
