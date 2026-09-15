/* Cowllar, Area 51 :: pipeline stages and the leave one cow out chart */
(() => {
  var CW = window.CW;
  var reduce = CW.reduce,
    P = CW.P,
    mk = CW.mk;
  /* ---------- pipeline stages ---------- */
  function seriesPath(fn, n, x0, x1, yBase, amp) {
    var d = "",
      i;
    for (i = 0; i < n; i++) {
      var x = x0 + ((x1 - x0) * i) / (n - 1);
      var y = yBase - fn(i) * amp;
      d += (i === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1);
    }
    return d;
  }
  function signal(i) {
    return (
      Math.sin(i * 0.35) * 0.5 +
      Math.sin(i * 0.9 + 1) * 0.3 +
      Math.sin(i * 2.1) * 0.16 +
      Math.sin(i * 0.12) * 0.25
    );
  }
  var stageData = [
    {
      title: "Raw signal, 25 rows a second",
      text: "The collar writes one row 25 times a second: three axes of acceleration, magnetometer, skin temperature and a sound level, each with its own timestamp. One day is about two million rows, which is why nothing useful happens until the next stage.",
      list: [
        "25 Hz motion, 1 Hz temperature, continuous sound level",
        "Written straight to the memory card on the animal",
        "Timestamped so a vet visit can be lined up with the trace later",
      ],
    },
    {
      title: "Two second windows, half shared",
      text: "A single reading means nothing. Behaviour lives in the shape of a couple of seconds, so we cut the stream into two second windows that overlap by half, then describe each window with twelve numbers: how much it moves, how hard, how often it turns, how warm it stays.",
      list: [
        "Twelve features for each window",
        "Overlap keeps a chew or a step from being cut in half",
        "Same twelve features on our data and on the public cattle set",
      ],
    },
    {
      title: "Four behaviours, one every second",
      text: "A random forest reads those twelve numbers and answers with one of four behaviours: resting, ruminating, feeding or active. It also returns how sure it is, and anything under the confidence line is marked unsure rather than forced into a class.",
      list: [
        "Resting, ruminating, feeding, active",
        "Confidence returned with every window, low confidence is flagged",
        "Small enough to run on the collar, no cloud in the loop",
      ],
    },
    {
      title: "Her own week is the yardstick",
      text: "Every cow is compared with herself. We build a rolling seven day baseline for movement, rumination and temperature, then score today against it. Heat looks like movement up, rumination down and a small temperature lift arriving together, not one of them alone.",
      list: [
        "Rolling seven day baseline for each animal",
        "Three signals must agree before the score crosses",
        "Alert carries a window, not a single moment",
      ],
    },
  ];
  var stageSvg = document.getElementById("stageSvg");
  function drawStage(idx) {
    if (!stageSvg) return;
    while (stageSvg.firstChild) stageSvg.removeChild(stageSvg.firstChild);
    var W = 640,
      H = 210,
      base = 120;
    stageSvg.appendChild(
      mk("line", {
        x1: 20,
        y1: H - 26,
        x2: W - 20,
        y2: H - 26,
        stroke: P.lineStrong,
        "stroke-width": 1,
      }),
    );
    var path = mk("path", {
      d: seriesPath(signal, 120, 24, W - 24, base, 46),
      fill: "none",
      stroke: P.straw,
      "stroke-width": 1.7,
      "stroke-linejoin": "round",
    });
    stageSvg.appendChild(path);
    if (!reduce) {
      var len = path.getTotalLength();
      path.setAttribute("stroke-dasharray", len);
      path.setAttribute("stroke-dashoffset", len);
      path.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
        duration: 900,
        easing: "ease-out",
        fill: "forwards",
      });
    }
    var i;
    if (idx === 1) {
      for (i = 0; i < 6; i++) {
        var x = 24 + i * ((W - 48) / 6.6);
        var w = ((W - 48) / 6.6) * 1.9;
        var wc = i % 2 ? P.mint : P.straw;
        stageSvg.appendChild(
          mk("rect", {
            x: x,
            y: base - 62,
            width: w,
            height: 124,
            fill: wc,
            "fill-opacity": 0.09,
            stroke: wc,
            "stroke-opacity": 0.5,
            "stroke-width": 1,
          }),
        );
      }
      var lab = mk("text", {
        x: 24,
        y: H - 8,
        fill: P.steel,
        "font-size": 13,
        "font-family": "IBM Plex Mono, monospace",
      });
      lab.textContent = "2 s windows, 50 percent overlap";
      stageSvg.appendChild(lab);
    }
    if (idx === 2) {
      var classes = [
        ["rest", P.rest, 0.3],
        ["ruminate", P.mint, 0.34],
        ["feed", P.straw, 0.12],
        ["active", P.heat, 0.24],
      ];
      classes.forEach((c, k) => {
        var x = 24 + k * ((W - 70) / 4);
        var bw = (W - 70) / 4 - 16;
        var h = c[2] * 150;
        stageSvg.appendChild(
          mk("rect", {
            x: x,
            y: H - 30 - h,
            width: bw,
            height: h,
            fill: c[1],
            opacity: 0.85,
          }),
        );
        var tx = mk("text", {
          x: x,
          y: H - 12,
          fill: P.steel,
          "font-size": 13,
          "font-family": "IBM Plex Mono, monospace",
        });
        tx.textContent = c[0] + "  " + Math.round(c[2] * 100) + "%";
        stageSvg.appendChild(tx);
      });
    }
    if (idx === 3) {
      var sc = (i) =>
        Math.max(
          0,
          Math.min(1, (i / 119) * 1.35 - 0.15 + Math.sin(i * 0.4) * 0.05),
        );
      stageSvg.appendChild(
        mk("path", {
          d: seriesPath(sc, 120, 24, W - 24, H - 34, 110),
          fill: "none",
          stroke: P.milk,
          "stroke-width": 2,
        }),
      );
      stageSvg.appendChild(
        mk("line", {
          x1: 24,
          y1: H - 34 - 77,
          x2: W - 24,
          y2: H - 34 - 77,
          stroke: P.heat,
          "stroke-width": 1,
          "stroke-dasharray": "5 5",
        }),
      );
      var th = mk("text", {
        x: W - 24,
        y: H - 34 - 84,
        fill: P.heat,
        "font-size": 13,
        "text-anchor": "end",
        "font-family": "IBM Plex Mono, monospace",
      });
      th.textContent = "alert threshold";
      stageSvg.appendChild(th);
    }
    document.getElementById("stTitle").textContent = stageData[idx].title;
    document.getElementById("stText").textContent = stageData[idx].text;
    var ul = document.getElementById("stList");
    ul.innerHTML = "";
    stageData[idx].list.forEach((s) => {
      var li = document.createElement("li");
      li.textContent = s;
      ul.appendChild(li);
    });
  }
  var curStage = 0;
  var stepBtns = Array.prototype.slice.call(document.querySelectorAll(".step"));
  stepBtns.forEach((b) => {
    b.addEventListener("click", () => {
      stepBtns.forEach((x) => {
        x.setAttribute("aria-selected", String(x === b));
      });
      curStage = +b.dataset.stage;
      drawStage(curStage);
    });
  });
  drawStage(0);

  /* ---------- leave one cow out chart ---------- */
  var cows = [
    { n: "Cow 1", a: 84.8, f: 0.61 },
    { n: "Cow 2", a: 85.0, f: 0.84 },
    { n: "Cow 3", a: 56.8, f: 0.55 },
    { n: "Cow 4", a: 75.9, f: 0.77 },
    { n: "Cow 5", a: 84.3, f: 0.6 },
    { n: "Cow 6", a: 91.6, f: 0.65 },
  ];
  var locoSvg = document.getElementById("locoSvg");
  function drawLoco(animate) {
    if (!locoSvg) return;
    while (locoSvg.firstChild) locoSvg.removeChild(locoSvg.firstChild);
    var LW = 640,
      LH = 280,
      padL = 46,
      padB = 46,
      top = 18;
    var bw = (LW - padL - 20) / cows.length;
    [0, 25, 50, 75, 100].forEach((v) => {
      var y = top + ((100 - v) / 100) * (LH - top - padB);
      locoSvg.appendChild(
        mk("line", {
          x1: padL,
          y1: y,
          x2: LW - 16,
          y2: y,
          stroke: P.line,
          "stroke-width": 1,
        }),
      );
      var t = mk("text", {
        x: padL - 10,
        y: y + 4,
        "text-anchor": "end",
        class: "bar-label",
      });
      t.textContent = v;
      locoSvg.appendChild(t);
    });
    var mean = mk("line", {
      x1: padL,
      y1: top + ((100 - 79.1) / 100) * (LH - top - padB),
      x2: LW - 16,
      y2: top + ((100 - 79.1) / 100) * (LH - top - padB),
      stroke: P.mint,
      "stroke-width": 1.4,
      "stroke-dasharray": "6 5",
    });
    locoSvg.appendChild(mean);
    var meanY = top + ((100 - 79.1) / 100) * (LH - top - padB);
    locoSvg.appendChild(
      mk("rect", {
        x: padL + 3,
        y: meanY - 15,
        width: 92,
        height: 17,
        fill: P.barn,
      }),
    );
    var meanT = mk("text", {
      x: padL + 8,
      y: meanY - 3,
      class: "bar-val",
      fill: P.mint,
    });
    meanT.textContent = "79.1 pooled";
    locoSvg.appendChild(meanT);
    cows.forEach((c, i) => {
      var g = mk("g", { class: "bar-g" });
      var h = (c.a / 100) * (LH - top - padB);
      var x = padL + i * bw + 10;
      var w = bw - 24;
      var weak = c.a < 70;
      var r = mk("rect", {
        x: x,
        y: LH - padB - h,
        width: w,
        height: h,
        fill: weak ? P.heat : P.straw,
        opacity: weak ? 0.85 : 0.9,
        class: "bar-rect",
      });
      var tt = mk("title");
      tt.textContent =
        c.n + ": " + c.a + " percent accuracy, macro F1 " + c.f.toFixed(2);
      r.appendChild(tt);
      g.appendChild(r);
      var v = mk("text", {
        x: x + w / 2,
        y: LH - padB - h - 9,
        "text-anchor": "middle",
        class: "bar-val",
      });
      v.textContent = c.a.toFixed(1);
      g.appendChild(v);
      var n = mk("text", {
        x: x + w / 2,
        y: LH - padB + 18,
        "text-anchor": "middle",
        class: "bar-label",
      });
      n.textContent = c.n;
      g.appendChild(n);
      var f = mk("text", {
        x: x + w / 2,
        y: LH - padB + 33,
        "text-anchor": "middle",
        class: "bar-label",
      });
      f.textContent = "F1 " + c.f.toFixed(2);
      g.appendChild(f);
      locoSvg.appendChild(g);
      if (!reduce && animate) {
        r.animate(
          [
            { height: 0, y: LH - padB },
            { height: h, y: LH - padB - h },
          ],
          { duration: 700, delay: 60 * i, easing: "cubic-bezier(.2,.8,.2,1)" },
        );
      }
    });
  }
  drawLoco(true);

  CW.onTheme(() => {
    drawStage(curStage);
    drawLoco(false);
  });
})();
