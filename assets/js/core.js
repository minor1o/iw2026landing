/* Cowllar, Area 51 :: shared helpers, palette and the theme event bus */
(() => {
  var svgNS = "http://www.w3.org/2000/svg";
  var P = {};

  function readPalette() {
    var cs = getComputedStyle(document.documentElement);
    [
      "straw",
      "milk",
      "steel",
      "heat",
      "mint",
      "rest",
      "line",
      "line-strong",
      "panel",
      "panel-ink",
      "trace1",
      "trace2",
      "barn",
    ].forEach((k) => {
      P[k.replace("-s", "S").replace("-i", "I")] = cs
        .getPropertyValue("--" + k)
        .trim();
    });
    P.line = cs.getPropertyValue("--line").trim();
    P.lineStrong = cs.getPropertyValue("--line-strong").trim();
    return P;
  }

  function mk(tag, attrs) {
    var e = document.createElementNS(svgNS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function clear(el) {
    while (el && el.firstChild) el.removeChild(el.firstChild);
  }

  readPalette();

  window.CW = {
    reduce: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    P: P,
    readPalette: readPalette,
    mk: mk,
    clear: clear,
    onTheme: (fn) => {
      document.addEventListener("cw:theme", fn);
    },
    emitTheme: () => {
      readPalette();
      document.dispatchEvent(new CustomEvent("cw:theme"));
    },
  };
})();
