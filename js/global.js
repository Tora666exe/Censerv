// ===== GLOBAL.JS — Mario World Bright Theme =====

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks?.classList.remove('open'));
});

// ===== MARIO SKY CANVAS =====
const canvas = document.getElementById('pixelCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  class PixelCloud {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x = initial ? Math.random() * canvas.width : canvas.width + 80;
      this.y = 60 + Math.random() * (canvas.height * 0.38);
      this.speed = 0.25 + Math.random() * 0.45;
      this.s = 0.55 + Math.random() * 0.85;
      this.opacity = 0.5 + Math.random() * 0.35;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      const s = this.s, x = this.x, y = this.y;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x,       y+16*s, 16*s, 8*s);
      ctx.fillRect(x+16*s,  y+16*s, 16*s, 8*s);
      ctx.fillRect(x+32*s,  y+16*s, 16*s, 8*s);
      ctx.fillRect(x+8*s,   y+8*s,  16*s, 8*s);
      ctx.fillRect(x+16*s,  y,      16*s, 8*s);
      ctx.fillRect(x+24*s,  y+8*s,  16*s, 8*s);
      ctx.fillStyle = 'rgba(200,230,255,0.5)';
      ctx.fillRect(x+4*s, y+22*s, 44*s, 3*s);
      ctx.restore();
    }
    update() { this.x -= this.speed; if (this.x < -160) this.reset(); }
  }

  class PixelCoin {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 20;
      this.speed = 0.25 + Math.random() * 0.5;
      this.frame = Math.floor(Math.random() * 4);
      this.ft = 0;
      this.opacity = 0.12 + Math.random() * 0.16;
      this.size = 5 + Math.random() * 5;
    }
    draw() {
      const ws = [1, 0.6, 0.15, 0.6];
      const w = this.size * ws[this.frame];
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = '#f7c948';
      ctx.fillRect(this.x - w/2, this.y - this.size, w, this.size * 2);
      ctx.restore();
    }
    update() {
      this.y -= this.speed;
      if (++this.ft > 8) { this.frame = (this.frame + 1) % 4; this.ft = 0; }
      if (this.y < -20) this.reset();
    }
  }

  const clouds = Array.from({length: 8}, () => new PixelCloud());
  const coins  = Array.from({length: 14}, () => new PixelCoin());

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // subtle pixel grid overlay
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 32) {
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 32) {
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
    coins.forEach(c => { c.draw(); c.update(); });
    clouds.forEach(c => { c.draw(); c.update(); });
    requestAnimationFrame(drawFrame);
  }
  drawFrame();
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .target-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});

// Coin click
document.querySelectorAll('.ground-block').forEach(block => {
  block.addEventListener('click', (e) => {
    const container = document.getElementById('floatingCoins');
    if (!container) return;
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.textContent = '🪙';
    coin.style.left = (e.clientX - 12) + 'px';
    coin.style.top = (e.clientY - 20) + 'px';
    container.appendChild(coin);
    setTimeout(() => coin.remove(), 3000);
    block.style.transform = 'translateY(-8px)';
    setTimeout(() => block.style.transform = '', 150);
  });
});

// Navbar scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  navbar.style.boxShadow = window.scrollY > 50
    ? '0 6px 0 #5a0000, 0 10px 25px rgba(0,0,0,0.35)'
    : '0 6px 0 #5a0000';
});

// Colorful pixel cursor trail
const marioColors = ['#f7c948','#e52222','#22b455','#5c94fc','#f5831f','#ffffff'];
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.82) {
    const color = marioColors[Math.floor(Math.random() * marioColors.length)];
    const spark = document.createElement('div');
    spark.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:7px;height:7px;background:${color};border:1px solid rgba(0,0,0,0.25);pointer-events:none;z-index:9999;image-rendering:pixelated;transition:all 0.5s ease;`;
    document.body.appendChild(spark);
    setTimeout(() => { spark.style.opacity='0'; spark.style.transform=`translate(${(Math.random()-.5)*40}px,${-30-Math.random()*40}px) scale(0.1)`; }, 10);
    setTimeout(() => spark.remove(), 520);
  }
});
