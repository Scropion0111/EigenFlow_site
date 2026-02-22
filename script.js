(function () {
  'use strict';

  var STORAGE_LANG = 'eigenflow_lang';
  var STORAGE_THEME = 'eigenflow_theme';
  var LANG_ZH = 'zh';
  var LANG_EN = 'en';

  var config = window.EIGENFLOW_CONFIG || {};
  var dashboardUrl = (config.DASHBOARD_URL || 'https://eigenflow-quant-research.streamlit.app/').trim();
  var contactEmail = config.CONTACT_EMAIL || 'research.eigenflow@gmail.com';
  var wechatId = config.WECHAT_ID || 'Always_With_XMJ';

  function getStoredLang() {
    try {
      var stored = localStorage.getItem(STORAGE_LANG);
      return stored === LANG_EN ? LANG_EN : LANG_ZH;
    } catch (e) {
      return LANG_ZH;
    }
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_LANG, lang);
    } catch (e) {}
  }

  function getStoredTheme() {
    try {
      var stored = localStorage.getItem(STORAGE_THEME);
      if (stored === 'light' || stored === 'dark') return stored;
      return null;
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_THEME, theme);
    } catch (e) {}
  }

  function applyLang(lang) {
    var isEn = lang === LANG_EN;
    document.documentElement.lang = isEn ? 'en' : 'zh-CN';
    document.querySelectorAll('[data-zh][data-en]').forEach(function (el) {
      var zh = el.getAttribute('data-zh');
      var en = el.getAttribute('data-en');
      if (zh === null && en === null) return;
      var text = isEn ? (en || zh) : (zh || en);
      if (text !== null && text !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });
    var langToggle = document.getElementById('langToggle');
    if (langToggle) {
      var zhSpan = langToggle.querySelector('.lang-zh');
      var enSpan = langToggle.querySelector('.lang-en');
      if (zhSpan) zhSpan.classList.toggle('active', !isEn);
      if (enSpan) enSpan.classList.toggle('active', isEn);
    }
    setStoredLang(lang);
  }

  function applyTheme(theme) {
    var isDark = theme === 'dark';
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(isDark ? 'theme-dark' : 'theme-light');
    setStoredTheme(theme);
  }

  function initConfigLinks() {
    var links = [
      document.getElementById('navDashboardLink'),
      document.getElementById('heroDashboardLink'),
      document.getElementById('dashboardSectionLink'),
      document.getElementById('footerDashboardLink')
    ];
    links.forEach(function (a) {
      if (a && a.getAttribute('href') === '#') a.setAttribute('href', dashboardUrl);
    });
    var contactCta = document.getElementById('contactCtaLink');
    var contactEmailEl = document.querySelector('#contactEmailLink');
    if (contactCta) contactCta.setAttribute('href', 'mailto:' + contactEmail);
    if (contactEmailEl) {
      contactEmailEl.setAttribute('href', 'mailto:' + contactEmail);
      contactEmailEl.textContent = contactEmail;
    }
    var wechatEl = document.getElementById('wechatId');
    if (wechatEl) wechatEl.textContent = wechatId;
  }

  function initLangToggle() {
    var langToggle = document.getElementById('langToggle');
    if (!langToggle) return;
    langToggle.addEventListener('click', function () {
      var next = getStoredLang() === LANG_EN ? LANG_ZH : LANG_EN;
      applyLang(next);
    });
    applyLang(getStoredLang());
  }

  function initThemeToggle() {
    var themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    var stored = getStoredTheme();
    if (stored) {
      applyTheme(stored);
    } else {
      applyTheme('dark');
    }
    themeToggle.addEventListener('click', function () {
      var isDark = document.body.classList.contains('theme-dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === '#') return;
      var id = href.slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        var menu = document.getElementById('navMenu');
        if (menu && menu.classList.contains('open')) menu.classList.remove('open');
        var btn = document.getElementById('mobileMenuBtn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initMobileMenu() {
    var btn = document.getElementById('mobileMenuBtn');
    var menu = document.getElementById('navMenu');
    if (!btn || !menu) return;
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function initFooterYear() {
    var el = document.getElementById('footerYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  function initNavbarScroll() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    var lastY = window.scrollY || 0;
    function onScroll() {
      var y = window.scrollY || 0;
      if (y > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  initConfigLinks();
  initLangToggle();
  initThemeToggle();
  initSmoothScroll();
  initMobileMenu();
  initFooterYear();
  initNavbarScroll();
})();
