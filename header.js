// ── Shared header ─────────────────────────────────────────────────────
// Include via <script src="header.js"></script> before </body>
// Set active page via <body data-page="explore|villages|about|conservation">

(function () {
  const pages = [
    { id: 'explore',      href: 'index.html',        en: 'Explore',      id_: 'Jelajahi' },
    { id: 'villages',     href: 'villages.html',     en: 'Villages',     id_: 'Desa'     },
    { id: 'about',        href: 'about.html',        en: 'About',        id_: 'Tentang'  },
    { id: 'conservation', href: 'conservation.html', en: 'Conservation', id_: 'Konservasi'},
  ];

  const contributeStyles = `
    #contribute-button {
      color: var(--navy);
      border: 1px solid var(--border);
      border-radius: 20px;
      opacity: 1;
      white-space: nowrap;
    }
    #contribute-button:hover { background: rgba(26,46,60,.06); }
    #contribute-dialog {
      box-sizing: border-box;
      width: min(24rem, calc(100% - 2rem));
      max-height: calc(100% - 2rem);
      margin: auto;
      padding: 1.5rem;
      border: 1px solid var(--border);
      border-radius: 16px;
      background: var(--bg);
      color: var(--navy);
      box-shadow: 0 12px 40px rgba(26,46,60,.25);
      font: 1rem/1.5 'Inter', sans-serif;
    }
    #contribute-dialog::backdrop { background: rgba(26,46,60,.55); }
    #contribute-title {
      font: 600 2rem/1.1 'Cormorant Garamond', serif;
      margin: 0 0 .5rem;
    }
    #contribute-description { margin: 0; }
    .contribute-actions {
      display: flex;
      flex-wrap: wrap;
      gap: .5rem;
      margin: 1rem 0;
    }
    .contribute-actions a,
    .contribute-close {
      display: inline-flex;
      align-items: center;
      min-height: 44px;
      padding: .375rem .875rem;
      border: 1px solid var(--navy);
      border-radius: 20px;
      font: 500 .875rem/1.4 'Inter', sans-serif;
    }
    .contribute-actions a {
      background: var(--navy);
      color: var(--bg);
      text-decoration: none;
    }
    .contribute-actions a:hover { text-decoration: underline; }
    .contribute-close {
      background: transparent;
      color: var(--navy);
      cursor: pointer;
    }
    .contribute-close:hover { background: rgba(26,46,60,.06); }
    #contribute-button:focus-visible,
    #contribute-dialog :focus-visible {
      outline: 2px solid var(--navy);
      outline-offset: 2px;
    }
    @media (max-width: 768px) {
      #site-header nav { flex-wrap: wrap; row-gap: .25rem; }
    }
  `;

  let currentLang = localStorage.getItem('lang') || 'en';
  const activePage = document.body.getAttribute('data-page') || 'explore';

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
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
         ${p.id === activePage ? 'aria-current="page"' : ''}
         data-i18n-en="${p.en}" data-i18n-id="${p.id_}">${currentLang === 'en' ? p.en : p.id_}</a>
    `).join('');

    el.innerHTML = `
      <a href="index.html" aria-label="Mayalibit Bay Tourism home" style="color:inherit;text-decoration:none">
        <div class="brand-name">MAYALIBIT BAY TOURISM</div>
        <div class="brand-sub">Raja Ampat · Southwest Papua</div>
      </a>
      <nav aria-label="Main navigation">
        ${navLinks}
        <button type="button" class="nav-link" id="contribute-button" aria-haspopup="dialog"
                aria-controls="contribute-dialog" data-i18n-en="Contribute" data-i18n-id="Berkontribusi">Contribute</button>
      </nav>
      <div style="display:flex;align-items:center;gap:0">
        <button type="button" aria-label="Show English content" class="lang-btn ${currentLang === 'en' ? 'active' : ''}" id="btn-en" onclick="setLang('en')">EN</button>
        <button type="button" aria-label="Tampilkan konten Bahasa Indonesia" class="lang-btn ${currentLang === 'id' ? 'active' : ''}" id="btn-id" onclick="setLang('id')">ID</button>
      </div>
      <dialog id="contribute-dialog" aria-labelledby="contribute-title" aria-describedby="contribute-description" closedby="any">
        <h2 id="contribute-title" data-i18n-en="Contribute" data-i18n-id="Berkontribusi">Contribute</h2>
        <p id="contribute-description"
           data-i18n-en="Let us know if any information is missing or inaccurate."
           data-i18n-id="Beri tahu kami jika ada informasi yang kurang lengkap atau kurang akurat.">Let us know if any information is missing or inaccurate.</p>
        <div class="contribute-actions">
          <a href="https://wa.me/491706207045" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="mailto:frank@reef-guardian.de" data-i18n-en="Email" data-i18n-id="Surel">Email</a>
        </div>
        <form method="dialog">
          <button type="submit" class="contribute-close" data-i18n-en="Close" data-i18n-id="Tutup" autofocus>Close</button>
        </form>
      </dialog>
    `;

    const style = document.createElement('style');
    style.textContent = contributeStyles;
    document.head.appendChild(style);

    const dialog = el.querySelector('#contribute-dialog');
    el.querySelector('#contribute-button').addEventListener('click', () => dialog.showModal());
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    setLang(currentLang);
  });
})();
