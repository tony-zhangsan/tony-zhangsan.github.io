const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); });
nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
window.matchMedia('(min-width: 801px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-category]');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let count = 0;
  cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) count++; });
  document.querySelector('#filter-status').textContent = document.documentElement.lang === 'en' ? `${count} projects shown` : `显示 ${count} 项实践`;
}));
document.querySelector('[data-copy-email]').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  const en = document.documentElement.lang === 'en';
  try { await navigator.clipboard.writeText('298087506@qq.com'); status.textContent = en ? 'Email copied.' : '邮箱已复制。'; }
  catch { status.textContent = en ? 'Please select and copy the email address above.' : '请选中上方邮箱地址，手动复制。'; }
});
if ('IntersectionObserver' in window) {
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) links.forEach(link => { if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
  }), { rootMargin: '-15% 0px -65% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
