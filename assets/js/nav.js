/* Cowllar, Area 51 :: sticky bar, section rail, reveal on scroll, stat counters */
(function(){
  "use strict";
  var CW = window.CW;
  var reduce = CW.reduce, P = CW.P, mk = CW.mk;
/* ---------- sticky bar + rail scrollspy ---------- */
  var bar = document.getElementById("bar");
  var railBtns = Array.prototype.slice.call(document.querySelectorAll("#rail button"));
  var sections = railBtns.map(function(b){ return document.getElementById(b.dataset.go); });
  railBtns.forEach(function(b){
    b.addEventListener("click", function(){
      var el = document.getElementById(b.dataset.go);
      if (el) el.scrollIntoView({behavior: reduce ? "auto" : "smooth", block:"start"});
    });
  });
  function onScroll(){
    bar.classList.toggle("solid", window.scrollY > 40);
    var y = window.scrollY + window.innerHeight * 0.35, best = 0;
    sections.forEach(function(s,i){ if (s && s.offsetTop <= y) best = i; });
    railBtns.forEach(function(b,i){ b.classList.toggle("on", i === best); });
  }
  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();

  /* ---------- reveal on view ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:0.15});
  document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });

  /* ---------- counters ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || "", start = performance.now();
      function tick(now){
        var p = Math.min(1, (now - start)/900);
        el.textContent = Math.round(target * (1 - Math.pow(1-p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      if (reduce) el.textContent = target + suffix; else requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, {threshold:0.4});
  counters.forEach(function(c){ cio.observe(c); });

  })();
