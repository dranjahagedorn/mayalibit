// ── Shared header ─────────────────────────────────────────────────────
// Include via <script src="header.js"></script> before </body>
// Set active page via <body data-page="explore|villages|activities|about|conservation">

(function () {
  const pages = [
    { id: 'explore',      href: 'index.html',        en: 'Explore',      id_: 'Jelajahi' },
    { id: 'villages',     href: 'villages.html',     en: 'Villages',     id_: 'Desa'     },
    { id: 'activities',   href: 'activities.html',   en: 'Activities',   id_: 'Aktivitas'},
    { id: 'about',        href: 'about.html',        en: 'About',        id_: 'Tentang'  },
    { id: 'conservation', href: 'conservation.html', en: 'Conservation', id_: 'Konservasi'},
  ];

  let currentLang = localStorage.getItem('lang') || 'en';
  const activePage = document.body.getAttribute('data-page') || 'explore';

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-i18n-en]').forEach(el => {
      el.textContent = lang === 'en'
        ? el.getAttribute('data-i18n-en')
        : el.getAttribute('data-i18n-id');
    });
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-id').classList.toggle('active', lang === 'id');
  }

  window.setLang = setLang;

  function renderHeader() {
    const el = document.getElementById('site-header');
    if (!el) return;

    const navLinks = pages.map(p => `
      <a href="${p.href}" class="nav-link ${p.id === activePage ? 'active' : ''}"
         data-i18n-en="${p.en}" data-i18n-id="${p.id_}">${currentLang === 'en' ? p.en : p.id_}</a>
    `).join('');

    el.innerHTML = `
      <div>
        <div class="brand-name">MAYALIBIT BAY TOURISM</div>
        <div class="brand-sub">Raja Ampat · West Papua</div>
      </div>
      <nav>${navLinks}</nav>
      <div style="display:flex;align-items:center;gap:0">
        <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" id="btn-en" onclick="setLang('en')">EN</button>
        <button class="lang-btn ${currentLang === 'id' ? 'active' : ''}" id="btn-id" onclick="setLang('id')">ID</button>
      </div>
    `;
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    setLang(currentLang);
  });
})();
