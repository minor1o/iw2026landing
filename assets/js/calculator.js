/* Cowllar, Area 51 :: herd loss calculator */
(() => {
  var CW = window.CW;
  var reduce = CW.reduce,
    P = CW.P,
    mk = CW.mk;
  /* ---------- cost calculator ---------- */
  var herd = document.getElementById("herd"),
    miss = document.getElementById("miss");
  function fmt(n) {
    return n.toLocaleString("en-US");
  }
  function calc() {
    var h = +herd.value,
      m = +miss.value / 100;
    var cycles = 17.4; // heats per cow per year, 21 day cycle
    var missed = Math.round(h * cycles * m);
    var rub = missed * 10500;
    document.getElementById("herdV").textContent = fmt(h);
    document.getElementById("missV").textContent = miss.value;
    document.getElementById("misses").textContent = fmt(missed);
    document.getElementById("hours").textContent = fmt(Math.round(h * 17));
    var el = document.getElementById("loss");
    var mil = rub / 1e6;
    el.textContent = mil >= 100 ? Math.round(mil) : mil.toFixed(1);
  }
  if (herd && miss) {
    herd.addEventListener("input", calc);
    miss.addEventListener("input", calc);
    calc();
  }
})();
