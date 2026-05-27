// ── Shared header ─────────────────────────────────────────────────────
// Include this script in every page. It renders the header and handles
// language switching. The active nav link is set via data-page attribute
// on the <body> tag, e.g. <body data-page="villages">

const i18n = {
  en: {
    nav_explore:      "Explore",
    nav_villages:     "Villages",
    nav_activities:   "Activities",
    nav_about:        "About",
    nav_conservation: "Conservation",
    hint:             "Click on a village to discover more",
    kicker:           "Village",
    photo_label:      "Village photo",
  },
  id: {
    nav_explore:      "Jelajahi",
    nav_villages:     "Desa",
    nav_activities:   "Aktivitas",
    nav_about:        "Tentang",
    nav_conservation: "Konservasi",
    hint:             "Klik desa untuk mengetahui lebih lanjut",
    kicker:           "Desa",
    photo_label:      "Foto desa",
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-id').classList.toggle('active', lang === 'id');
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  // If index.html panel is open, re-render it
  if (typeof currentVillage !== 'undefined' && currentVillage) {
    openVillage(currentVillage);
  }
}

function renderHeader() {
  const page = document.body.getAttribute('data-page') || 'explore';
  const nav = [
    { key: 'explore',      href: 'index.html',        i18n: 'nav_explore' },
    { key: 'villages',     href: 'villages.html',     i18n: 'nav_villages' },
    { key: 'activities',   href: 'activities.html',   i18n: 'nav_activities' },
    { key: 'about',        href: 'about.html',        i18n: 'nav_about' },
    { key: 'conservation', href: 'conservation.html', i18n: 'nav_conservation' },
  ];

  document.getElementById('site-header').innerHTML = `
    <div>
      <div class="brand-name">MAYALIBIT BAY TOURISM</div>
    </div>
    <nav>
      ${nav.map(n => `
        <a href="${n.href}" class="nav-link ${page === n.key ? 'active' : ''}" data-i18n="${n.i18n}">
          ${i18n[currentLang][n.i18n]}
        </a>
      `).join('')}
    </nav>
    <div class="header-right">
      <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" id="btn-en" onclick="setLang('en')">EN</button>
      <button class="lang-btn ${currentLang === 'id' ? 'active' : ''}" id="btn-id" onclick="setLang('id')">ID</button>
    </div>
  `;

  // Apply current language to all i18n elements on the page
  setLang(currentLang);
}

document.addEventListener('DOMContentLoaded', renderHeader);
