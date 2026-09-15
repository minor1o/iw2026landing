/* Cowllar, Area 51 :: image lightbox */
(function(){
  "use strict";
  var CW = window.CW;
  var reduce = CW.reduce, P = CW.P, mk = CW.mk;
/* ---------- lightbox ---------- */
  var light = document.getElementById("light"), lightImg = document.getElementById("lightImg"), lightCap = document.getElementById("lightCap");
  document.querySelectorAll(".gal button").forEach(function(b){
    b.addEventListener("click", function(){
      lightImg.src = b.querySelector("img").src;
      lightImg.alt = b.dataset.cap || "";
      lightCap.textContent = b.dataset.cap || "";
      if (typeof light.showModal === "function") light.showModal();
    });
  });
  document.getElementById("lightClose").addEventListener("click", function(){ light.close(); });
  light.addEventListener("click", function(e){ if (e.target === light) light.close(); });
})();
