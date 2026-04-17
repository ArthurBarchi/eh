// ========== COUNTDOWN TIMER ==========
function updateCountdowns() {
  const now = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(24, 0, 0, 0);
  const diff = endOfDay.getTime() - now.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  const pad = (n) => n.toString().padStart(2, '0');

  // Promo badge date
  const months = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  const dateStr = `${now.getDate()} de ${months[now.getMonth()]}`;

  // Hero badge
  const badgeDate = document.getElementById('promo-date');
  if (badgeDate) badgeDate.textContent = dateStr;

  // Full countdown (bonus section)
  const fullDate = document.getElementById('countdown-date');
  if (fullDate) fullDate.textContent = dateStr;

  document.querySelectorAll('.cd-hours').forEach(el => el.textContent = pad(hours));
  document.querySelectorAll('.cd-minutes').forEach(el => el.textContent = pad(minutes));
  document.querySelectorAll('.cd-seconds').forEach(el => el.textContent = pad(seconds));
}

// ========== FAQ ACCORDION ==========
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      
      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

// ========== PURCHASE NOTIFICATIONS ==========
const buyers = [
  { name: 'Camila Ferreira', city: 'São Paulo', state: 'SP', package: 'Kit Completo' },
  { name: 'Bruna Oliveira', city: 'Rio de Janeiro', state: 'RJ', package: 'Opção Básica' },
  { name: 'Letícia Santos', city: 'Belo Horizonte', state: 'MG', package: 'Kit Completo' },
  { name: 'Amanda Costa', city: 'Curitiba', state: 'PR', package: 'Kit Completo' },
  { name: 'Patrícia Lima', city: 'Salvador', state: 'BA', package: 'Kit Completo' },
  { name: 'Jéssica Souza', city: 'Brasília', state: 'DF', package: 'Opção Básica' },
  { name: 'Fernanda Alves', city: 'Fortaleza', state: 'CE', package: 'Kit Completo' },
  { name: 'Raquel Mendes', city: 'Recife', state: 'PE', package: 'Kit Completo' },
];

function initPurchaseNotifications() {
  const toast = document.getElementById('purchase-toast');
  const nameEl = document.getElementById('toast-buyer-name');
  const msgEl = document.getElementById('toast-buyer-msg');
  if (!toast || !nameEl || !msgEl) return;

  function showNotification() {
    const buyer = buyers[Math.floor(Math.random() * buyers.length)];
    nameEl.textContent = `${buyer.name} de ${buyer.city}, ${buyer.state}`;
    msgEl.textContent = `acabou de garantir o ${buyer.package}`;
    
    toast.classList.add('show');
    
    // Update progress bar
    const filled = document.getElementById('progress-filled');
    const filledText = document.getElementById('progress-text');
    const filledCount = document.getElementById('filled-count');
    if (filled && filledText && filledCount) {
      let current = parseInt(filledCount.textContent) || 911;
      current = Math.min(current + 1, 1000);
      const percent = Math.round(current / 1000 * 100);
      filledCount.textContent = current;
      filledText.textContent = `${percent}%`;
      filled.style.width = `${percent}%`;
    }

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // First notification after 5s
  setTimeout(showNotification, 5000);

  // Then every 8-15s
  setInterval(() => {
    const delay = Math.floor(Math.random() * 7000) + 8000;
    setTimeout(showNotification, delay);
  }, 15000);
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide SVG icons
  if (window.lucide) lucide.createIcons();

  updateCountdowns();
  setInterval(updateCountdowns, 1000);
  
  initFAQ();
  initPurchaseNotifications();
  initSmoothScroll();
});
