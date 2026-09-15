/* Cowllar, Area 51 :: seventy two hour estrus simulation */
(() => {
  var CW = window.CW;
  var reduce = CW.reduce,
    P = CW.P,
    mk = CW.mk;
  /* ---------- heat simulation ---------- */
  var N = 145,
    HOURS = 72,
    THRESH = 0.62,
    ALERT_I = 80,
    OV_I = 108,
    ALERT_H = 40;
  var move = [],
    rum = [],
    temp = [],
    score = [];
  (function build() {
    for (var i = 0; i < N; i++) {
      var h = (i * HOURS) / (N - 1);
      var diurnal = 0.5 + 0.28 * Math.sin(((h - 6) / 24) * Math.PI * 2);
      var wob = 0.06 * Math.sin(h * 1.9) + 0.04 * Math.sin(h * 0.7 + 1.2);
      var heatBell = Math.exp(-(((h - 52) / 7.5) ** 2));
      var rise = Math.exp(-(((h - 50) / 11) ** 2));
      move.push(Math.min(1, diurnal * 0.34 + wob + heatBell * 0.95));
      rum.push(
        Math.max(
          0.05,
          0.62 +
            0.12 * Math.sin(((h - 14) / 24) * Math.PI * 2) +
            wob * 0.5 -
            rise * 0.45,
        ),
      );
      temp.push(
        0.42 +
          0.12 * Math.sin(((h - 15) / 24) * Math.PI * 2) +
          0.02 * Math.sin(h * 1.3) +
          rise * 0.34,
      );
      var s =
        (move[i] - 0.34) * 1.15 +
        (0.62 - rum[i]) * 1.25 +
        (temp[i] - 0.46) * 1.15;
      score.push(Math.max(0, Math.min(1, s + 0.1)));
    }
    for (var j = 0; j < N; j++) {
      if (score[j] >= THRESH) {
        ALERT_I = j;
        ALERT_H = Math.round((j * HOURS) / (N - 1));
        break;
      }
    }
    OV_I = Math.min(N - 1, ALERT_I + 28);
  })();
  var simSvg = document.getElementById("simSvg");
  var scrub = document.getElementById("scrub");
  var playBtn = document.getElementById("playBtn");
  var simClock = document.getElementById("simClock");
  var alertCard = document.getElementById("alertCard");
  var phoneShot = document.getElementById("phoneShot");
  var SW = 900,
    SH = 340,
    sPadL = 58,
    sPadR = 22,
    tracks = [
      { arr: move, key: "heat", label: "movement", y: 16, h: 66 },
      { arr: rum, key: "mint", label: "rumination", y: 96, h: 56 },
      { arr: temp, key: "straw", label: "skin temperature", y: 166, h: 52 },
    ];
  function xAt(i) {
    return sPadL + (SW - sPadL - sPadR) * (i / (N - 1));
  }
  function pathFor(arr, y, h) {
    var d = "";
    for (var i = 0; i < N; i++) {
      var x = xAt(i),
        yy = y + h - arr[i] * h;
      d += (i === 0 ? "M" : "L") + x.toFixed(1) + " " + yy.toFixed(1);
    }
    return d;
  }
  function buildSim() {
    if (!simSvg) return;
    while (simSvg.firstChild) simSvg.removeChild(simSvg.firstChild);
    var defs = mk("defs", {});
    var cp = mk("clipPath", { id: "revealClip" });
    var cr = mk("rect", { x: 0, y: 0, width: 0, height: SH, id: "clipRect" });
    cp.appendChild(cr);
    defs.appendChild(cp);
    simSvg.appendChild(defs);

    // insemination window band
    var wx0 = xAt(ALERT_I),
      wx1 = xAt(OV_I + 8);
    simSvg.appendChild(
      mk("rect", {
        x: wx0,
        y: 8,
        width: wx1 - wx0,
        height: SH - 56,
        fill: P.heat,
        "fill-opacity": 0.08,
      }),
    );
    var wl = mk("text", {
      x: (wx0 + wx1) / 2,
      y: 22,
      "text-anchor": "middle",
      fill: P.heat,
      "font-size": 11,
      "font-family": "IBM Plex Mono, monospace",
    });
    wl.textContent = "insemination window";
    simSvg.appendChild(wl);

    // hour ticks
    for (var h = 0; h <= 72; h += 12) {
      var x = sPadL + (SW - sPadL - sPadR) * (h / 72);
      simSvg.appendChild(
        mk("line", {
          x1: x,
          y1: 8,
          x2: x,
          y2: SH - 46,
          stroke: P.line,
          "stroke-width": 1,
        }),
      );
      var t = mk("text", {
        x: x,
        y: SH - 28,
        "text-anchor": "middle",
        fill: P.steel,
        "font-size": 11,
        "font-family": "IBM Plex Mono, monospace",
      });
      t.textContent = "h" + h;
      simSvg.appendChild(t);
    }
    // faint full traces, then the bright revealed copy on top
    var sy = 236,
      sh = 58;
    var t = document.documentElement.getAttribute("data-theme");
    var ghost = mk("g", {
      opacity: t === "light" || t === "lemon" ? ".32" : ".16",
    });
    tracks.forEach((tr) => {
      ghost.appendChild(
        mk("path", {
          d: pathFor(tr.arr, tr.y, tr.h),
          fill: "none",
          stroke: P[tr.key],
          "stroke-width": 1.4,
        }),
      );
    });
    ghost.appendChild(
      mk("path", {
        d: pathFor(score, sy, sh),
        fill: "none",
        stroke: P.milk,
        "stroke-width": 1.6,
      }),
    );
    simSvg.appendChild(ghost);

    var g = mk("g", { "clip-path": "url(#revealClip)" });
    tracks.forEach((tr) => {
      g.appendChild(
        mk("path", {
          d: pathFor(tr.arr, tr.y, tr.h),
          fill: "none",
          stroke: P[tr.key],
          "stroke-width": 1.9,
          "stroke-linejoin": "round",
        }),
      );
    });
    g.appendChild(
      mk("path", {
        d: pathFor(score, sy, sh),
        fill: "none",
        stroke: P.milk,
        "stroke-width": 2.3,
      }),
    );
    simSvg.appendChild(g);

    tracks.forEach((tr) => {
      var lb = mk("text", {
        x: 8,
        y: tr.y + 12,
        fill: P.steel,
        "font-size": 10.5,
        "font-family": "IBM Plex Mono, monospace",
      });
      lb.textContent = tr.label;
      simSvg.appendChild(lb);
    });
    var sl = mk("text", {
      x: 8,
      y: sy + 12,
      fill: P.milk,
      "font-size": 10.5,
      "font-family": "IBM Plex Mono, monospace",
    });
    sl.textContent = "score";
    simSvg.appendChild(sl);
    var thrY = sy + sh - THRESH * sh;
    simSvg.appendChild(
      mk("line", {
        x1: sPadL,
        y1: thrY,
        x2: SW - sPadR,
        y2: thrY,
        stroke: P.heat,
        "stroke-width": 1,
        "stroke-dasharray": "5 5",
      }),
    );

    var cx = xAt(ALERT_I),
      cy = sy + sh - score[ALERT_I] * sh;
    simSvg.appendChild(mk("circle", { cx: cx, cy: cy, r: 4.5, fill: P.heat }));
    simSvg.appendChild(
      mk("line", {
        x1: cx,
        y1: cy,
        x2: cx,
        y2: 8,
        stroke: P.heat,
        "stroke-width": 1,
        opacity: 0.45,
      }),
    );
    var ct = mk("text", {
      x: cx - 10,
      y: 58,
      fill: P.heat,
      "font-size": 11,
      "text-anchor": "end",
      "font-family": "IBM Plex Mono, monospace",
    });
    ct.textContent = "alert, hour " + ALERT_H;
    simSvg.appendChild(ct);

    // playhead
    simSvg.appendChild(
      mk("line", {
        id: "head",
        x1: sPadL,
        y1: 8,
        x2: sPadL,
        y2: SH - 46,
        stroke: P.milk,
        "stroke-width": 1.2,
        opacity: 0.8,
      }),
    );
  }
  function renderSim(i) {
    var clip = document.getElementById("clipRect"),
      head = document.getElementById("head");
    if (!clip || !head) return;
    var x = xAt(i);
    clip.setAttribute("width", x + 2);
    head.setAttribute("x1", x);
    head.setAttribute("x2", x);
    var hour = Math.round((i * HOURS) / (N - 1));
    simClock.textContent = "hour " + (hour < 10 ? "0" : "") + hour;
    var fired = i >= ALERT_I;
    alertCard.classList.toggle("live", fired);
    phoneShot.classList.toggle("dim", !fired);
    if (fired) {
      document.getElementById("alertStamp").textContent =
        "score crossed at hour " + ALERT_H;
      document.getElementById("alertTitle").textContent =
        "Cow 23, inseminate in 12 to 24 hours";
      document.getElementById("alertBody").textContent =
        "Movement is running near three times her own baseline, rumination has dropped and skin temperature lifted with it. Three signals agreeing is what raises the flag. A single spike never does.";
    } else {
      document.getElementById("alertStamp").textContent =
        "waiting for the score to cross";
      document.getElementById("alertTitle").textContent = "No action needed";
      document.getElementById("alertBody").textContent =
        "Cow 23 is inside her normal range. The collar keeps counting and says nothing, which is most of the time and exactly the point.";
    }
  }
  var playing = false,
    raf = null;
  function step() {
    var v = +scrub.value;
    if (v >= N - 1) {
      stop();
      return;
    }
    scrub.value = v + 1;
    renderSim(+scrub.value);
    raf = setTimeout(() => {
      requestAnimationFrame(step);
    }, 95);
  }
  function stop() {
    playing = false;
    playBtn.textContent = "Play";
    if (raf) clearTimeout(raf);
  }
  if (simSvg) {
    buildSim();
    renderSim(0);
    scrub.addEventListener("input", () => {
      stop();
      renderSim(+scrub.value);
    });
    var simSeen = false;
    new IntersectionObserver(
      (en) => {
        en.forEach((e) => {
          if (!e.isIntersecting || simSeen) return;
          simSeen = true;
          if (reduce) {
            scrub.value = N - 1;
            renderSim(N - 1);
            return;
          }
          playing = true;
          playBtn.textContent = "Pause";
          step();
        });
      },
      { threshold: 0.45 },
    ).observe(simSvg);
    playBtn.addEventListener("click", () => {
      if (playing) {
        stop();
        return;
      }
      if (+scrub.value >= N - 1) scrub.value = 0;
      playing = true;
      playBtn.textContent = "Pause";
      if (reduce) {
        scrub.value = N - 1;
        renderSim(N - 1);
        stop();
        return;
      }
      step();
    });
  }

  CW.onTheme(() => {
    if (simSvg) {
      buildSim();
      renderSim(+scrub.value);
    }
  });
})();
