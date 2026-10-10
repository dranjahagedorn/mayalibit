// Shared bilingual footer for every page.
(function () {
  const footerStyles = `
    #site-footer {
      background: #1A2E3C;
      color: rgba(255,255,255,.72);
      padding: 22px 32px;
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      line-height: 1.5;
    }
    .site-footer-inner {
      max-width: 1180px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px 30px;
    }
    .site-footer-copy { white-space: nowrap; }
    .site-footer-links {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: 8px 20px;
    }
    .site-footer-links a {
      color: rgba(255,255,255,.82);
      text-decoration: none;
      transition: color .18s;
    }
    .site-footer-links a:hover,
    .site-footer-links a:focus-visible { color: #ffffff; }
    body[data-page="explore"] {
      display: flex;
      flex-direction: column;
    }
    body[data-page="explore"] #site-header,
    body[data-page="explore"] #site-footer { flex: 0 0 auto; }
    body[data-page="explore"] .map-wrap {
      flex: 1 1 auto;
      height: auto;
      min-height: 0;
    }
    @media (max-width: 720px) {
      #site-footer { padding: 20px; }
      .site-footer-inner { align-items: flex-start; flex-direction: column; }
      .site-footer-links { justify-content: flex-start; gap: 8px 16px; }
    }
  `;

  function addStyles() {
    if (document.getElementById('site-footer-styles')) return;
    const style = document.createElement('style');
    style.id = 'site-footer-styles';
    style.textContent = footerStyles;
    document.head.appendChild(style);
  }

  function renderFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;
    const lang = localStorage.getItem('lang') || 'en';
    const label = (en, id) => lang === 'id' ? id : en;

    footer.innerHTML = `
      <div class="site-footer-inner">
        <div class="site-footer-copy">© 2026 Mayalibit Bay Tourism</div>
        <nav class="site-footer-links" aria-label="${label('Legal information', 'Informasi hukum')}">
          <a href="legal.html" data-i18n-en="Legal Notice" data-i18n-id="Informasi Legal">${label('Legal Notice', 'Informasi Legal')}</a>
          <a href="privacy.html" data-i18n-en="Privacy Policy" data-i18n-id="Kebijakan Privasi">${label('Privacy Policy', 'Kebijakan Privasi')}</a>
          <a href="travel-information.html" data-i18n-en="Travel Information" data-i18n-id="Informasi Perjalanan">${label('Travel Information', 'Informasi Perjalanan')}</a>
        </nav>
      </div>
    `;
  }

  function updateFooterLanguage() {
    const nav = document.querySelector('.site-footer-links');
    if (!nav) return;
    nav.setAttribute(
      'aria-label',
      document.documentElement.lang === 'id' ? 'Informasi hukum' : 'Legal information'
    );
  }

  addStyles();
  document.addEventListener('DOMContentLoaded', () => {
    renderFooter();
    updateFooterLanguage();
    new MutationObserver(updateFooterLanguage).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });
  });
})();
