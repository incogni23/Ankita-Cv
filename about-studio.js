(function () {
  function allowStudioMotion() {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var force = false;
    try {
      var q = typeof window.URLSearchParams === "undefined" ? null : new URLSearchParams(window.location.search || "");
      if (q && q.get("anim") === "1") force = true;
      else if (window.localStorage.getItem("ankitaPortfolioAnim") === "1") force = true;
    } catch (e) {
      force = false;
    }
    return !reduceMotion || force;
  }

  function initAboutStudio() {
    var root = typeof document.documentElement !== "undefined" ? document.documentElement : null;
    var section = document.querySelector(".about-studio");
    if (!section) return;

    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (!allowStudioMotion()) {
      return;
    }

    if (root) root.classList.add("motion-ambient");

    var eyebrow = section.querySelector(".about-studio__eyebrow");
    var words = section.querySelectorAll(".about-reveal-word");
    var period = section.querySelector(".about-studio__period");
    var chips = section.querySelectorAll(".about-ribbon-chip");
    var lines = section.querySelectorAll(".about-reveal-line");
    var tiles = section.querySelectorAll(".about-studio__tile");

    gsap.set([eyebrow, words, period, chips, lines, tiles], {
      opacity: 0,
    });
    gsap.set(eyebrow, { y: 18 });
    gsap.set(words, { y: 36, rotateX: -8 });
    gsap.set(period, { y: 28 });
    gsap.set(chips, { y: 14, scale: 0.94 });
    gsap.set(lines, { y: 28 });
    gsap.set(tiles, { y: 40 });

    section.querySelectorAll(".about-studio__h2-line, .about-studio__h2-mega").forEach(function (el) {
      el.style.perspective = "900px";
    });

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 76%",
        end: "top 12%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });

    tl.to(
      eyebrow,
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
      },
      0,
    )
      .to(
        words,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.75,
          stagger: 0.08,
        },
        0.08,
      )
      .to(
        period,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "back.out(1.4)",
        },
        "-=0.45",
      )
      .to(
        chips,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
        },
        "-=0.35",
      )
      .to(
        lines,
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.14,
          ease: "power2.out",
        },
        "-=0.25",
      )
      .to(
        tiles,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
        },
        "-=0.55",
      );
  }

  function tryInit() {
    requestAnimationFrame(function () {
      try {
        initAboutStudio();
        if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
      } catch (e) {
        /* noop */
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tryInit);
  else tryInit();
})();
