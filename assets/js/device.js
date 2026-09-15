/* Cowllar, Area 51 :: component explorer and the exploded collar */
(function(){
  "use strict";
  var CW = window.CW;
  var reduce = CW.reduce, P = CW.P, mk = CW.mk;
/* ---------- device explorer ---------- */
  var parts = Array.prototype.slice.call(document.querySelectorAll(".part"));
  var frames = Array.prototype.slice.call(document.querySelectorAll(".viewer .frame img"));
  function pick(btn){
    parts.forEach(function(p){ p.setAttribute("aria-selected", String(p === btn)); });
    var key = btn.dataset.img;
    frames.forEach(function(f){ f.classList.toggle("on", f.dataset.key === key); });
    document.getElementById("vTitle").textContent = btn.dataset.title;
    document.getElementById("vText").textContent = btn.dataset.text;
  }
  parts.forEach(function(p, i){
    p.addEventListener("click", function(){ pick(p); });
    p.addEventListener("keydown", function(e){
      if (e.key === "ArrowDown" || e.key === "ArrowRight"){ e.preventDefault(); var n = parts[(i+1)%parts.length]; n.focus(); pick(n); }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft"){ e.preventDefault(); var q = parts[(i-1+parts.length)%parts.length]; q.focus(); pick(q); }
    });
  });

  /* ---------- exploded collar ---------- */
  var stage3d = document.getElementById("stage3d"), rigbox = document.getElementById("rigbox");
  if (stage3d && rigbox){
    var layers = Array.prototype.slice.call(rigbox.querySelectorAll(".layer"));
    var gapZ = [-205, -100, -14, 72, 168];
    var rotX = -58, rotZ = -26, spread = 1, dragging = false, lastX = 0, lastY = 0;
    function applyRig(){
      rigbox.style.transform = "rotateX(" + rotX + "deg) rotateZ(" + rotZ + "deg)";
      layers.forEach(function(l, i){
        var z = gapZ[i] * spread;
        l.style.transform = "translateZ(" + z.toFixed(1) + "px)";
      });
    }
    applyRig();
    stage3d.addEventListener("pointerdown", function(e){
      dragging = true; lastX = e.clientX; lastY = e.clientY;
      stage3d.setPointerCapture(e.pointerId);
    });
    stage3d.addEventListener("pointermove", function(e){
      if (!dragging) return;
      rotZ += (e.clientX - lastX) * 0.45;
      rotX = Math.max(-88, Math.min(-8, rotX - (e.clientY - lastY) * 0.32));
      lastX = e.clientX; lastY = e.clientY;
      applyRig();
    });
    ["pointerup","pointercancel","pointerleave"].forEach(function(ev){
      stage3d.addEventListener(ev, function(){ dragging = false; });
    });
    stage3d.addEventListener("keydown", function(e){
      var k = e.key;
      if (k === "ArrowLeft"){ rotZ -= 6; } else if (k === "ArrowRight"){ rotZ += 6; }
      else if (k === "ArrowUp"){ rotX = Math.max(-88, rotX - 5); }
      else if (k === "ArrowDown"){ rotX = Math.min(-8, rotX + 5); }
      else return;
      e.preventDefault(); applyRig();
    });
    var expSlider = document.getElementById("explode");
    expSlider.addEventListener("input", function(){ spread = +expSlider.value / 100; applyRig(); });
    document.getElementById("rigReset").addEventListener("click", function(){
      rotX = -58; rotZ = -26; spread = 1; expSlider.value = 100; applyRig();
    });
    var legendBtns = Array.prototype.slice.call(document.querySelectorAll("#rigLegend button"));
    function hot(i, on){
      legendBtns.forEach(function(b){ b.setAttribute("aria-current", String(on && +b.dataset.i === i)); });
      layers.forEach(function(l){ l.classList.toggle("hot", on && +l.dataset.i === i); });
    }
    legendBtns.forEach(function(b){
      var i = +b.dataset.i;
      ["mouseenter","focus"].forEach(function(ev){ b.addEventListener(ev, function(){ hot(i, true); }); });
      ["mouseleave","blur"].forEach(function(ev){ b.addEventListener(ev, function(){ hot(i, false); }); });
      b.addEventListener("click", function(){ hot(i, true); });
    });
    layers.forEach(function(l){
      l.addEventListener("mouseenter", function(){ hot(+l.dataset.i, true); });
      l.addEventListener("mouseleave", function(){ hot(+l.dataset.i, false); });
    });
    // one orchestrated assembly when the section first comes into view
    var rigSeen = false;
    new IntersectionObserver(function(en){
      en.forEach(function(e){
        if (!e.isIntersecting || rigSeen) return;
        rigSeen = true;
        if (reduce) return;
        var t0 = performance.now();
        spread = 0; applyRig();
        (function ease(now){
          var p = Math.min(1, (now - t0) / 1100);
          spread = 1 - Math.pow(1 - p, 3);
          applyRig();
          if (p < 1) requestAnimationFrame(ease);
        })(t0);
      });
    }, {threshold:0.35}).observe(stage3d);
  }

  })();
