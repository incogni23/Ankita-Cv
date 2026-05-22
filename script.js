(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var root = document.documentElement;

  var forceAmbient = (function () {
    try {
      var q = typeof window.URLSearchParams === "undefined" ? null : new URLSearchParams(window.location.search || "");
      if (q && q.get("anim") === "1") return true;
      return window.localStorage.getItem("ankitaPortfolioAnim") === "1";
    } catch (e) {
      return false;
    }
  })();

  function allowHeavyMotion() {
    return !reduceMotion.matches || forceAmbient;
  }

  var hero = document.querySelector(".hero");
  var scrollFill = document.getElementById("scroll-progress-fill");
  var clockEl = document.getElementById("live-clock");

  var ptr = {
    tx: typeof window.innerWidth === "number" ? window.innerWidth * 0.5 : 0,
    ty: typeof window.innerHeight === "number" ? window.innerHeight * 0.38 : 0,
    mx: typeof window.innerWidth === "number" ? window.innerWidth * 0.5 : 0,
    my: typeof window.innerHeight === "number" ? window.innerHeight * 0.38 : 0,
  };

  function pointerHero(e) {
    if (!hero || !allowHeavyMotion()) return;
    var rect = hero.getBoundingClientRect();
    if (rect.width <= 0) return;

    var x = (e.clientX - rect.left) / rect.width;
    var y = (e.clientY - rect.top) / rect.height;

    hero.style.setProperty("--gx", Math.round(x * 100) + "%");
    hero.style.setProperty("--gy", Math.round(y * 100) + "%");

    var mx = (x - 0.5) * 10;
    var my = (y - 0.5) * 10;
    hero.style.setProperty("--ptr-x", mx.toFixed(2) + "%");
    hero.style.setProperty("--ptr-x-half", (mx * 0.45).toFixed(2) + "%");
    hero.style.setProperty("--ptr-y", my.toFixed(2) + "%");
    hero.style.setProperty("--ptr-y-half", (my * 0.5).toFixed(2) + "%");
    hero.style.setProperty("--beam-y", Math.round(Math.max(-30, Math.min(80, -30 + y * 90))) + "%");

    if (window.innerWidth >= 920) {
      var prx = Math.max(-5.5, Math.min(5.5, (0.52 - y) * 12));
      var pry = Math.max(-7, Math.min(7, (x - 0.5) * 14));
      hero.style.setProperty("--photo-tilt-x", prx.toFixed(2) + "deg");
      hero.style.setProperty("--photo-tilt-y", pry.toFixed(2) + "deg");
    } else {
      hero.style.removeProperty("--photo-tilt-x");
      hero.style.removeProperty("--photo-tilt-y");
    }
  }

  function resetHeroTilt() {
    if (!hero) return;
    hero.style.removeProperty("--photo-tilt-x");
    hero.style.removeProperty("--photo-tilt-y");
  }

  function onDocumentMove(e) {
    ptr.tx = e.clientX;
    ptr.ty = e.clientY;
    pointerHero(e);
  }

  function initScrollProgress() {
    if (!scrollFill) return;

    function sync() {
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var p = window.scrollY / max;
      scrollFill.style.transform = "scaleX(" + Math.min(1, Math.max(0, p)).toFixed(6) + ")";
    }

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
  }

  function initNavSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('#nav-menu a[href^="#"]'));
    var pairs = links
      .map(function (a) {
        var id = (a.getAttribute("href") || "").slice(1);
        var el = id ? document.getElementById(id) : null;
        return el && id ? { a: a, el: el } : null;
      })
      .filter(Boolean);

    if (!pairs.length) return;

    function clear() {
      links.forEach(function (a) {
        a.classList.remove("nav-current");
      });
    }

    function syncNav() {
      var best = null;
      var viewH = window.innerHeight || 600;
      var anchor = Math.min(148, Math.max(72, parseFloat(getComputedStyle(root).getPropertyValue("--header-h")) || 64) + 28);

      pairs.forEach(function (row) {
        var rect = row.el.getBoundingClientRect();
        var vis = Math.max(0, Math.min(rect.bottom, viewH - 80) - Math.max(rect.top, anchor));
        if (rect.top <= anchor && rect.bottom > anchor) vis += viewH * 0.06;
        if (vis > 0 && (!best || vis > best.vis)) best = { row: row, vis: vis };
      });

      clear();
      if (best) best.row.a.classList.add("nav-current");
    }

    syncNav();
    window.addEventListener("scroll", syncNav, { passive: true });
    window.addEventListener("resize", syncNav, { passive: true });
  }

  function initLiveClock() {
    if (!clockEl) return;

    function tick() {
      clockEl.textContent = new Date().toISOString().slice(11, 19) + " UTC";
    }

    tick();
    window.setInterval(tick, 1000);
  }

  function applyPageMotion() {
    initScrollProgress();
    initNavSpy();
    initLiveClock();

    if (forceAmbient) root.classList.add("anim-force");
    else root.classList.remove("anim-force");

    if (!allowHeavyMotion()) {
      root.classList.remove("motion-ambient");
      if (hero) hero.classList.add("hero-boot");
      document.querySelectorAll(".motion-reveal").forEach(function (el) {
        el.classList.add("motion-reveal--shown");
      });
      return;
    }

    root.classList.add("motion-ambient");

    document.addEventListener("mousemove", onDocumentMove, { passive: true });
    if (hero) {
      hero.addEventListener("mouseleave", resetHeroTilt, { passive: true });
      hero.style.removeProperty("--photo-tilt-x");
      hero.style.removeProperty("--photo-tilt-y");

      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          hero.classList.add("hero-boot");
        });
      });
    }

    var revealTargets = document.querySelectorAll(".motion-reveal");
    var ioReveal = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-reveal--shown");
            ioReveal.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "-5% 0px -12% 0px", threshold: 0.08 },
    );

    revealTargets.forEach(function (el) {
      ioReveal.observe(el);
    });
  }

  reduceMotion.addEventListener("change", function () {
    applyPageMotion();
  });

  applyPageMotion();
})();
