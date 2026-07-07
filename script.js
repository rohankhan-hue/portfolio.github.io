/* Rohan Ullah Khan — portfolio interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- mobile menu ---------- */
  var burger = document.querySelector('.nav-burger');
  var menu = document.getElementById('nav-menu');
  function closeMenu() {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  }
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });

  /* ---------- scroll spy (active nav link) ---------- */
  var navLinks = {};
  document.querySelectorAll('.nav-menu a[data-nav]').forEach(function (a) {
    navLinks[a.dataset.nav] = a;
  });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var key = en.target.dataset.spy;
      Object.keys(navLinks).forEach(function (k) {
        if (k === key) navLinks[k].setAttribute('aria-current', 'true');
        else navLinks[k].removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  document.querySelectorAll('[data-spy]').forEach(function (s) { spy.observe(s); });

  /* ---------- scroll reveals ---------- */
  var rv = document.querySelectorAll('.rv');
  if (reduce) {
    rv.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    rv.forEach(function (el) { io.observe(el); });
  }

  /* ---------- count-up stats (play once) ---------- */
  function fmt(el, v) {
    var dec = +el.dataset.dec || 0;
    var s = v.toFixed(dec);
    if (el.dataset.comma) s = Number(s).toLocaleString('en-US');
    el.textContent = s + (el.dataset.suf || '');
  }
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target, end = parseFloat(el.dataset.count);
      cio.unobserve(el);
      if (reduce) { fmt(el, end); return; }
      var t0 = performance.now(), dur = 1400;
      (function tick(t) {
        var p = Math.min((t - t0) / dur, 1);
        fmt(el, end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(function (el) { cio.observe(el); });

  /* ---------- lightbox ---------- */
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.tile'));
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbCap = document.getElementById('lb-cap');
  var btnClose = document.getElementById('lb-close');
  var btnPrev = document.getElementById('lb-prev');
  var btnNext = document.getElementById('lb-next');
  var current = 0, lastFocus = null;

  function show(i) {
    current = (i + tiles.length) % tiles.length;
    var img = tiles[current].querySelector('img');
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = tiles[current].dataset.title || '';
  }
  function openLb(i) {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  tiles.forEach(function (t, i) {
    t.addEventListener('click', function () { openLb(i); });
  });
  btnClose.addEventListener('click', closeLb);
  btnPrev.addEventListener('click', function () { show(current - 1); });
  btnNext.addEventListener('click', function () { show(current + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
    else if (e.key === 'Tab') {
      /* keep focus inside the dialog */
      var focusables = [btnClose, btnPrev, btnNext];
      var idx = focusables.indexOf(document.activeElement);
      if (e.shiftKey && (idx <= 0)) { e.preventDefault(); focusables[focusables.length - 1].focus(); }
      else if (!e.shiftKey && idx === focusables.length - 1) { e.preventDefault(); focusables[0].focus(); }
      else if (idx === -1) { e.preventDefault(); focusables[0].focus(); }
    }
  });
})();
