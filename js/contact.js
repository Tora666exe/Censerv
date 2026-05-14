// ===== CONTACT.JS =====

// Toggle service option
function toggleOption(el) {
  el.classList.toggle('selected');
}

// Single select budget
function selectBudget(el) {
  document.querySelectorAll('#budgetSelect .select-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}

// FAQ toggle
function toggleFaq(el) {
  const item = el.closest('.faq-item');
  item.classList.toggle('open');
}

// Submit via WhatsApp
function submitInquiry() {
  const name = document.getElementById('fName').value.trim();
  const contact = document.getElementById('fContact').value.trim();
  const desc = document.getElementById('fDesc').value.trim();

  const selectedServices = [...document.querySelectorAll('#serviceSelect .select-option.selected')]
    .map(el => el.textContent.trim()).join(', ');

  const selectedBudget = document.querySelector('#budgetSelect .select-option.selected');
  const budget = selectedBudget ? selectedBudget.textContent.trim() : 'Belum ditentukan';

  if (!name) {
    alert('Masukkan nama kamu dulu ya! 👋');
    return;
  }

  const msg = `Halo 30CENG.SRV! 👋

*INQUIRY BARU*
━━━━━━━━━━━━━━━━
👤 Nama: ${name || '-'}
📱 Kontak: ${contact || '-'}
⚔️ Jasa: ${selectedServices || 'Belum dipilih'}
💰 Budget: ${budget}
📝 Keterangan:
${desc || 'Belum ada keterangan'}
━━━━━━━━━━━━━━━━
Mohon informasi lebih lanjut. Terima kasih!`;

  const url = `https://wa.me/6287726411406?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// Copy to clipboard
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
    btn.textContent = '✅ Copied!';
    setTimeout(() => btn.textContent = '📋 Copy', 2000);
  });
}
