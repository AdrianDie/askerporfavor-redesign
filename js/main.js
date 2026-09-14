// PorFavor Tapas & Vinbar — nav toggle + cookie consent (CookieYes-equivalent, self-built)

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav takeover
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = toggle.classList.toggle('is-open');
      mobileNav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Cookie consent
  var STORAGE_KEY = 'porfavor-cookie-consent';
  var banner = document.querySelector('.cookie-banner');
  var modal = document.querySelector('.cookie-modal');
  if (!banner || !modal) return;

  function hasConsent() {
    try { return !!localStorage.getItem(STORAGE_KEY); } catch (e) { return false; }
  }
  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
    banner.classList.remove('is-visible');
    modal.classList.remove('is-visible');
  }
  if (!hasConsent()) {
    banner.classList.add('is-visible');
  }

  document.querySelectorAll('[data-cookie-accept]').forEach(function (b) {
    b.addEventListener('click', function () { setConsent('accepted'); });
  });
  document.querySelectorAll('[data-cookie-reject]').forEach(function (b) {
    b.addEventListener('click', function () { setConsent('rejected'); });
  });
  document.querySelectorAll('[data-cookie-customize]').forEach(function (b) {
    b.addEventListener('click', function () {
      banner.classList.remove('is-visible');
      modal.classList.add('is-visible');
    });
  });
  document.querySelectorAll('[data-cookie-save]').forEach(function (b) {
    b.addEventListener('click', function () { setConsent('customized'); });
  });
});
