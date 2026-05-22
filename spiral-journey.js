(function () {
  var reduceMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

  var forceAmbient = (function () {
    try {
      var q = typeof window.URLSearchParams === "undefined" ? null : new URLSearchParams(window.location.search || "");
      if (q && q.get("anim") === "1") return true;
      return window.localStorage.getItem("ankitaPortfolioAnim") === "1";
    } catch (e) {
      return false;
    }
  })();

  function allowSpiralRide() {
    return !reduceMotionMq.matches || forceAmbient;
  }

  /** Logarithmic spiral: r = a * exp(k*t), t in radians */
  function logSpiralPath(cx, cy, a, k, t0, t1, segments) {
    var d = "";
    for (var i = 0; i <= segments; i++) {
      var frac = i / segments;
      var t = t0 + (t1 - t0) * frac;
      var r = a * Math.exp(k * t);
      var x = cx + r * Math.cos(t);
      var y = cy + r * Math.sin(t);
      d += (i === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
    }
    return d.trim();
  }

  function svgEscape(s) {
    return String(s).replace(/&/g, "&amp;");
  }

  /**
   * @param {HTMLElement} host
   * @param {{ live: boolean }} opts
   */
  function paintSpiral(host, opts) {
    var cx = -8;
    var cy = 18;
    var segsPrimary = opts.live ? 880 : 420;
    var segsThin = opts.live ? 720 : 360;

    var dA = svgEscape(logSpiralPath(cx, cy, 18, 0.098, 0.22, 9.05 * Math.PI, segsPrimary));
    var dB = svgEscape(logSpiralPath(cx, cy, 38, 0.091, 0.35, 8.76 * Math.PI, segsThin));

    var dGhost = svgEscape(logSpiralPath(cx, cy, 19.5, 0.097, 0.18, 9.62 * Math.PI, Math.round(segsPrimary * 1.06)));

    var orbitMarkup = "";

    function orbit(ix, radius, gradientId, dur, reversed) {
      var cls = "spiral-orbit" + (reversed ? " spiral-orbit--rev" : "") + (opts.live ? "" : " spiral-orbit--static");
      orbitMarkup +=
        '<g class="' +
        cls +
        '" style="--orbit-dur:' +
        dur +
        's" transform="rotate(' +
        ix * 47 +
        ')">' +
        '<circle class="spiral-orbit-dot" r="' +
        (opts.live ? 9 : 5) +
        "\" cx=\"" +
        radius +
        "\" cy=\"0\" fill=\"url(#" +
        gradientId +
        ')"/></g>';
    }

    orbit(1, "428", "spiral-orb-a", 52, false);
    orbit(2, "296", "spiral-orb-b", 68, true);
    orbit(3, "516", "spiral-orb-c", 44, false);

    var dust = "";

    var count = opts.live ? 76 : 32;
    for (var si = 0; si < count; si++) {
      var ang = si * 0.513 + si * si * 0.011;
      var dist = 60 + ((((si + 9) * 137) >>> 3) % 520);
      dust +=
        '<circle class="spiral-mote" cx="' +
        (Math.cos(ang) * dist).toFixed(1) +
        '" cy="' +
        (Math.sin(ang) * dist).toFixed(1) +
        '" r="' +
        ((si % 5) / 8 + 0.42).toFixed(2) +
        '" />';
    }

    var bandOpacity = opts.live ? "0.52" : "0.12";
    var bandOpacityThin = opts.live ? "0.3" : "0.065";

    host.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" class="spiral-svg" viewBox="-660 -630 1320 1260" focusable="false" preserveAspectRatio="xMidYMid slice">' +
      "<defs>" +
      '<linearGradient id="spiral-stroke-a" x1="0%" y1="0%" x2="100%" y2="105%">' +
      '<stop offset="0%" stop-color="rgba(82,212,191,0.95)" />' +
      '<stop offset="48%" stop-color="rgba(120,248,226,0.35)" />' +
      '<stop offset="100%" stop-color="rgba(130,160,227,0.15)" /></linearGradient>' +
      '<linearGradient id="spiral-stroke-b" x1="10%" y1="90%" x2="95%" y2="0">' +
      '<stop offset="0%" stop-color="rgba(212,188,125,0.55)" />' +
      '<stop offset="85%" stop-color="rgba(82,212,191,0.18)" /></linearGradient>' +
      '<linearGradient id="spiral-orb-a" x1="0%" y1="0%" x2="100%" y2="0%">' +
      '<stop offset="0%" stop-color="#c8fff6" /><stop offset="100%" stop-color="#2d8bdc" /></linearGradient>' +
      '<linearGradient id="spiral-orb-b" x1="100%" y1="0%" x2="0%" y2="100%">' +
      '<stop offset="0%" stop-color="#f0dfb0" /><stop offset="100%" stop-color="#44c7b4" /></linearGradient>' +
      '<linearGradient id="spiral-orb-c" x1="0%" y1="20%" x2="100%" y2="98%">' +
      '<stop offset="0%" stop-color="#9bb7ff" /><stop offset="100%" stop-color="rgba(82,212,191,0.12)" /></linearGradient>' +
      '<radialGradient id="spiral-fog-soft" cx="40%" cy="36%" r="58%">' +
      '<stop offset="38%" stop-color="rgba(6,12,26,0)" />' +
      '<stop offset="100%" stop-color="rgba(2,6,14,0.68)" /></radialGradient>' +
      '<filter id="spiral-pulse-soft" x="-80%" y="-80%" width="260%" height="260%">' +
      '<feGaussianBlur stdDeviation="2.2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>' +
      "</filter>" +
      "</defs>" +
      '<rect class="spiral-fog" x="-690" y="-660" width="1380" height="1320" fill="url(#spiral-fog-soft)" opacity="0.14" />' +
      '<g class="spiral-world" transform="translate(92 -154)">' +
      '<g class="spiral-tunnel-shell">' +
      '<g class="spiral-twist-cw">' +
      '<path class="spiral-trace spiral-trace--a" fill="none" stroke="url(#spiral-stroke-a)" stroke-width="' +
      (opts.live ? "2.1" : "1.05") +
      '" stroke-dasharray="' +
      (opts.live ? "62 268 412 740" : "40 760") +
      "\" stroke-linecap=\"round\" opacity=\"" +
      bandOpacity +
      '" d="' +
      dA +
      '"/>' +
      '<path class="spiral-trace spiral-trace--echo" fill="none" stroke="url(#spiral-stroke-a)" stroke-width="' +
      (opts.live ? "1.08" : "0.74") +
      '" stroke-dasharray="18 900" stroke-linecap="round" opacity="' +
      (opts.live ? "0.1" : "0.038") +
      "\" d=\"" +
      dGhost +
      '"/>' +
      "</g>" +
      '<g class="spiral-twist-ccw">' +
      '<path class="spiral-trace spiral-trace--b" fill="none" stroke="url(#spiral-stroke-b)" stroke-width="' +
      (opts.live ? "1.25" : "0.74") +
      "\" stroke-dasharray=\"" +
      (opts.live ? "22 588" : "12 740") +
      "\" stroke-linecap=\"round\" opacity=\"" +
      bandOpacityThin +
      '" d="' +
      dB +
      '"/></g>' +
      '<g class="spiral-sat-shell">' +
      orbitMarkup +
      "</g>" +
      '<g class="spiral-motes" aria-hidden="true">' +
      dust +
      "</g>" +
      "</g>" +
      "</g>" +
      "</svg>";

    Array.prototype.slice.call(host.querySelectorAll(".spiral-mote")).forEach(function (dot, ix) {
      dot.setAttribute("fill", ix % 3 === 1 ? "rgba(212,188,125,0.28)" : "rgba(120,246,226,0.18)");
      if (opts.live) dot.setAttribute("style", "--mote-delay:" + ((ix % 41) / 41).toFixed(3) + "s");
    });
  }

  function applySpiralProgress(docEl, traceEls, p, surfaceEl, depthEnabled) {
    p = typeof p !== "number" ? 0 : Math.min(1, Math.max(0, p));

    docEl.style.setProperty("--spiral-t", String(p));

    var wx = Math.sin(p * Math.PI * 13) * 17;
    var wy = Math.cos(p * Math.PI * 9) * 9;
    docEl.style.setProperty("--spiral-wobble-x", wx + "px");
    docEl.style.setProperty("--spiral-wobble-y", wy + "px");

    /* Legacy hook */
    docEl.style.setProperty("--spiral-surface-zoom", String(1 - p * 0.038));

    /*
     * Obvious inward / outward "breathing" along scroll (purely p‑driven —
     * we do NOT negate document scroll-Y; doing that blew out blank space past the footer).
     */
    var breathFast = Math.sin(p * Math.PI * 20);
    var breathSlow = Math.sin(p * Math.PI * 3.25);
    var envelope = 0.55 + 0.45 * breathSlow;
    var pulse = breathFast * envelope;

    var shellScale = (1.06 - p * 0.48) * (1 + 0.13 * pulse);
    docEl.style.setProperty("--spiral-scale-shell", String(Math.max(0.22, Math.min(1.35, shellScale))));

    docEl.style.setProperty("--spiral-rot-shell", p * 720 + pulse * 110 + "deg");
    docEl.style.setProperty("--spiral-tx-shell", (-44 * p + pulse * 18).toFixed(2) + "px");
    docEl.style.setProperty("--spiral-ty-shell", (-36 * p - pulse * 14).toFixed(2) + "px");
    docEl.style.setProperty("--spiral-rot-cw", (p * -560 + pulse * -55).toFixed(2) + "deg");
    docEl.style.setProperty("--spiral-rot-ccw", (p * 640 + pulse * 48).toFixed(2) + "deg");
    docEl.style.setProperty("--spiral-rot-sat", (p * -220 + pulse * 70).toFixed(2) + "deg");
    docEl.style.setProperty("--spiral-scale-sat", String(Math.max(0.65, Math.min(1.08, (0.94 + p * 0.08) * (1 + 0.05 * pulse)))));

    /* Fixed spiral canvas gently pulses opposite phase for layered depth */
    docEl.style.setProperty("--spiral-host-pulse", String(1 + pulse * -0.05));

    /*
     * Tunnel depth on the staged surface — Z + tilt + zoom, no cancelling scrollY (avoids phantom gap).
     */
    if (depthEnabled && surfaceEl) {
      var vh = window.innerHeight || 640;
      var inward = Math.min(vh * 1.72, Math.max(vh * 1.08, surfaceEl.scrollHeight * 0.11));
      var dzBase = -p * inward * 0.88;
      var dz = dzBase + inward * 0.16 * pulse;

      var tilt = Math.min(10.2, Math.max(0, p * 8.95 + pulse * 1.05));
      var sc = Math.max(0.78, Math.min(1.04, (1 - p * 0.125) * (1 + 0.042 * pulse)));
      var pers = Math.min(1380, Math.max(760, Math.round(vh * 1.15)));

      surfaceEl.style.transform =
        "perspective(" +
        pers +
        "px) translate3d(" +
        wx.toFixed(2) +
        "px," +
        wy.toFixed(2) +
        "px," +
        dz.toFixed(1) +
        "px) rotateX(" +
        tilt.toFixed(2) +
        "deg) scale(" +
        sc.toFixed(4) +
        ")";
      surfaceEl.style.transformOrigin = "50% 12%";

      try {
        surfaceEl.dataset.depthActive = "1";
      } catch (eDat) {}

      docEl.classList.add("spiral-depth-rig-live");
    } else if (!depthEnabled && surfaceEl) {
      surfaceEl.style.removeProperty("transform");
      surfaceEl.style.removeProperty("transform-origin");

      try {
        delete surfaceEl.dataset.depthActive;
      } catch (eDel) {}

      docEl.classList.remove("spiral-depth-rig-live");
      docEl.style.removeProperty("--spiral-host-pulse");
    }

    var offBase = -7200 + p * -15200;
    if (traceEls && traceEls.length) {
      traceEls.forEach(function (node, ix) {
        node.style.strokeDashoffset = String(offBase * (1 + ix * 0.09));
      });
    }
  }

  function readPageScrollRatio() {
    var html = document.documentElement;
    var max = Math.max(1, html.scrollHeight - window.innerHeight);

    try {
      if (typeof ScrollTrigger !== "undefined") {
        var stMax = ScrollTrigger.maxScroll(window);
        if (stMax >= 16) max = stMax;
      }
    } catch (e2) {}

    var y = window.pageYOffset != null ? window.pageYOffset : html.scrollTop;
    return Math.min(1, Math.max(0, y / max));
  }

  function bindScrollSynth(docEl, traceEls, surfaceEl, depthActive) {
    if (typeof ScrollTrigger === "undefined" || typeof gsap === "undefined") return false;
    gsap.registerPlugin(ScrollTrigger);

    applySpiralProgress(docEl, traceEls, readPageScrollRatio(), surfaceEl, depthActive);

    ScrollTrigger.create({
      trigger: surfaceEl && surfaceEl.scrollHeight >= 320 ? surfaceEl : document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.62,
      invalidateOnRefresh: true,
      onUpdate: function (self) {
        applySpiralProgress(docEl, traceEls, self.progress, surfaceEl, depthActive);
      },
    });

    requestAnimationFrame(function () {
      try {
        ScrollTrigger.refresh(true);
      } catch (e) {}
      applySpiralProgress(docEl, traceEls, readPageScrollRatio(), surfaceEl, depthActive);
    });

    window.addEventListener(
      "load",
      function () {
        requestAnimationFrame(function () {
          try {
            ScrollTrigger.refresh(true);
            applySpiralProgress(docEl, traceEls, readPageScrollRatio(), surfaceEl, depthActive);
          } catch (e3) {}
        });
      },
      { passive: true },
    );

    return true;
  }

  function initSpiralStage() {
    var docEl = document.documentElement;
    var host = document.querySelector(".js-spiral-host");
    if (!host) return;

    var live = allowSpiralRide();
    docEl.classList.add(live ? "spiral-journey-live" : "spiral-journey-muted");

    paintSpiral(host, { live: live });

    var traces = [];
    Array.prototype.slice.call(host.querySelectorAll(".spiral-trace")).forEach(function (path) {
      traces.push(path);
    });

    var surfaceClear = document.querySelector(".spiral-surface");

    if (live && typeof gsap !== "undefined") {
      var surfaceEl = surfaceClear;

      traces.forEach(function (path, ix) {
        path.style.strokeDashoffset = String(-6900 + ix * 120);
      });
      bindScrollSynth(docEl, traces, surfaceEl, true);
    } else if (!live) {
      docEl.style.setProperty("--spiral-t", "0.12");

      traces.forEach(function (path, ix) {
        path.style.strokeDashoffset = String(-9100 + ix * 440);
      });

      applySpiralProgress(docEl, traces, 0.12, surfaceClear || null, false);
    } else {
      /* Live motion but GSAP unavailable — vanilla scroll fallback */
      traces.forEach(function (path, ix) {
        path.style.strokeDashoffset = String(-6900 + ix * 120);
      });

      var surf = surfaceClear;
      var onScrollDepth = function () {
        applySpiralProgress(docEl, traces, readPageScrollRatio(), surf, true);
      };
      onScrollDepth();
      window.addEventListener("scroll", onScrollDepth, { passive: true });
      window.addEventListener("resize", onScrollDepth, { passive: true });
    }

    requestAnimationFrame(function () {
      try {
        if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh(true);
      } catch (e) {}
    });
  }

  function boot() {
    try {
      initSpiralStage();
    } catch (e) {}
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
