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

  function initEducationStudio() {
    var root = document.documentElement;
    var section = document.querySelector(".education-studio");
    if (!section || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    if (!allowStudioMotion()) return;

    if (root) root.classList.add("motion-ambient");

    var eyebrow = section.querySelector(".education-studio__eyebrow");
    var words = section.querySelectorAll(".edu-reveal-word");
    var line = section.querySelector(".edu-reveal-line");
    var panel = section.querySelector(".edu-reveal-panel");
    var inners = section.querySelectorAll(".edu-reveal-inner");

    gsap.set([eyebrow, words, line, panel, inners], { opacity: 0 });
    gsap.set(eyebrow, { y: 14 });
    gsap.set(words, { y: 28, rotateX: -7 });
    gsap.set(line, { y: 22 });
    gsap.set(panel, { y: 38, scale: 0.97 });
    gsap.set(inners, { y: 16 });

    section.querySelectorAll(".education-studio__h2-line").forEach(function (el) {
      el.style.perspective = "840px";
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        end: "top 12%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    })
      .to(eyebrow, { opacity: 1, y: 0, duration: 0.5 }, 0)
      .to(words, { opacity: 1, y: 0, rotateX: 0, duration: 0.68 }, 0.06)
      .to(line, { opacity: 1, y: 0, duration: 0.62, ease: "power2.out" }, "-=0.38")
      .to(panel, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out" }, "-=0.32")
      .to(inners, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.42");
  }

  function initContactStudio() {
    var root = document.documentElement;
    var section = document.querySelector(".contact-studio");
    if (!section || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    if (!allowStudioMotion()) return;

    if (root) root.classList.add("motion-ambient");

    var eyebrow = section.querySelector(".contact-studio__eyebrow");
    var words = section.querySelectorAll(".contact-reveal-word");
    var period = section.querySelector(".contact-studio__period");
    var line = section.querySelector(".contact-reveal-line");
    var tiles = section.querySelectorAll(".contact-studio__tile");

    gsap.set([eyebrow, words, period, line, tiles], { opacity: 0 });
    gsap.set(eyebrow, { y: 14 });
    gsap.set(words, { y: 30, rotateX: -6 });
    gsap.set(period, { y: 22 });
    gsap.set(line, { y: 26 });
    gsap.set(tiles, { y: 34, scale: 0.96 });

    section.querySelectorAll(".contact-studio__h2").forEach(function (el) {
      el.style.perspective = "800px";
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        end: "top 12%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    })
      .to(eyebrow, { opacity: 1, y: 0, duration: 0.52 }, 0)
      .to(words, { opacity: 1, y: 0, rotateX: 0, duration: 0.65, stagger: 0.1 }, 0.07)
      .to(
        period,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.3)",
        },
        "-=0.35",
      )
      .to(line, { opacity: 1, y: 0, duration: 0.62, ease: "power2.out" }, "-=0.3")
      .to(tiles, { opacity: 1, y: 0, scale: 1, duration: 0.58, stagger: 0.08, ease: "power2.out" }, "-=0.36");
  }

  function tryInit() {
    requestAnimationFrame(function () {
      try {
        initEducationStudio();
        initContactStudio();
        if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
      } catch (e) {
        /* noop */
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tryInit);
  else tryInit();
})();
