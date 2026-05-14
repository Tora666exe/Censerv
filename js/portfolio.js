// ===== PORTFOLIO.JS =====

function filterPortfolio(cat, btn) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Filter cards
  const cards = document.querySelectorAll('.port-card');
  cards.forEach(card => {
    if (cat === 'all' || card.getAttribute('data-cat') === cat) {
      card.classList.remove('hidden');
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    } else {
      card.classList.add('hidden');
    }
  });
}

// Staggered card entrance on load
window.addEventListener('load', () => {
  document.querySelectorAll('.port-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`;
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + i * 80);
  });
});
