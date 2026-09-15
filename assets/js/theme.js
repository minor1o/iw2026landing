/* Cowllar, Area 51 :: night, milk and lemon themes */
(() => {
  var CW = window.CW;
  var reduce = CW.reduce,
    P = CW.P,
    mk = CW.mk;
  /* ---------- theme switcher ---------- */
  var themeBtns = Array.prototype.slice.call(
    document.querySelectorAll(".themes button"),
  );
  function setTheme(name, save) {
    document.documentElement.setAttribute("data-theme", name);
    themeBtns.forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.theme === name));
    });
    requestAnimationFrame(CW.emitTheme);
    if (save) {
      try {
        localStorage.setItem("cowllar-theme", name);
      } catch (e) {}
    }
  }
  themeBtns.forEach((b) => {
    b.addEventListener("click", () => {
      setTheme(b.dataset.theme, true);
    });
  });
  (() => {
    var saved = null;
    try {
      saved = localStorage.getItem("cowllar-theme");
    } catch (e) {}
    if (saved && saved !== "dark") setTheme(saved, false);
  })();
})();
