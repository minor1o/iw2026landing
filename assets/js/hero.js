/* Cowllar, Area 51 :: animated sensor trace under the hero */
(() => {
  var CW = window.CW;
  var reduce = CW.reduce,
    P = CW.P,
    mk = CW.mk;
  /* ---------- hero sensor trace ---------- */
  var cv = document.getElementById("trace");
  if (cv) {
    var ctx = cv.getContext("2d"),
      W = 0,
      H = 0,
      t = 0;
    function size() {
      var r = cv.getBoundingClientRect(),
        dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function wave(x, phase) {
      return (
        Math.sin(x * 0.021 + phase) * 0.5 +
        Math.sin(x * 0.052 + phase * 1.7) * 0.28 +
        Math.sin(x * 0.121 + phase * 0.6) * 0.16 +
        Math.sin(x * 0.31 + phase * 2.3) * 0.07
      );
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      var mid = H * 0.55,
        burst = 0;
      for (var pass = 0; pass < 2; pass++) {
        ctx.beginPath();
        for (var x = 0; x <= W; x += 2) {
          var local = x + t * 1.4;
          var env = 0.55 + 0.45 * Math.sin(local * 0.0016 + pass);
          var y = mid - wave(local, pass * 1.3 + t * 0.014) * (H * 0.3) * env;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          if (x > W - 4) burst = env;
        }
        ctx.globalAlpha = pass === 0 ? 0.9 : 0.4;
        ctx.strokeStyle = pass === 0 ? P.trace1 : P.trace2;
        ctx.lineWidth = pass === 0 ? 1.6 : 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      var rm = document.getElementById("rMotion"),
        rt = document.getElementById("rTemp"),
        rs = document.getElementById("rSound");
      if (rm) rm.textContent = (0.06 + burst * 0.22).toFixed(2);
      if (rt) rt.textContent = (32.2 + Math.sin(t * 0.004) * 0.5).toFixed(1);
      if (rs)
        rs.textContent = Math.round(
          900 + burst * 1800 + Math.sin(t * 0.05) * 220,
        );
      t += 1.1;
      if (!reduce) requestAnimationFrame(draw);
    }
    size();
    draw();
    window.addEventListener("resize", () => {
      size();
      if (reduce) draw();
    });
    CW.onTheme(() => {
      if (reduce) draw();
    });
  }
})();
