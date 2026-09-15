/* Cowllar, Area 51 :: farm interviews and the rival comparison */
(() => {
 var CW = window.CW;
 var reduce = CW.reduce;
 /* ---------- farm voices ---------- */
 var quotes = [
  [
   "We already have collars for activity and chewing, but they are inconvenient for heat and we do not trust them. Pedometers were tried and they got lost. Skips happen often, and the cost is a longer service period, extra hormones and less milk. Health and heat monitoring in one device would be ideal.",
   "Plemzavod Maisky, breeding plant<br>interviewed by Anastasiya, spring 2026",
  ],
  [
   "Our insemination bulls find heat faster and more accurately than people do. But there are still misses, especially in winter, when visibility is worse and there is less time to watch. We are not using devices yet, but we plan to, for the winter period and for the new buildings.",
   "Golden Calf, farm<br>interviewed by Anastasiya, spring 2026",
  ],
  [
   "We work visually and with bulls. Skips happen, we have no exact numbers but they happen. For twelve heads the payback is critical: the cost, the complexity of putting it in, and whether we can trust the data enough that it works no worse than the bulls.",
   "Farm of Sokolova Ekaterina Nikolaevna<br>interviewed by Anastasiya, spring 2026",
  ],
  [
   "Collars would make our lives easier. It often happens that we almost blindly inseminate a cow, because it is time according to the calendar, but there are no signs of heat. So we inseminate two or three times across two days to raise the chances.",
   "Veterinary student, cattle specialisation<br>advisor to the project, name withheld at her request",
  ],
 ];
 var whoBtns = Array.prototype.slice.call(
  document.querySelectorAll("#who button"),
 );
 whoBtns.forEach((b) => {
  b.addEventListener("click", () => {
   whoBtns.forEach((x) => {
    x.setAttribute("aria-selected", String(x === b));
   });
   var q = quotes[+b.dataset.q];
   var t = document.getElementById("qText"),
    c = document.getElementById("qWho");
   t.style.opacity = 0;
   c.style.opacity = 0;
   setTimeout(
    () => {
     t.textContent = q[0];
     setLines(c, q[1]);
     t.style.transition = "opacity .3s";
     c.style.transition = "opacity .3s";
     t.style.opacity = 1;
     c.style.opacity = 1;
    },
    reduce ? 0 : 160,
   );
  });
 });

 /* ---------- rivals comparison ---------- */
 var CAPS = [
  "Watches all night",
  "Reads movement",
  "Reads body temperature",
  "Hears chewing and calling",
  "Runs without a cloud account",
  "Stays outside the animal",
 ];
 var rivalData = [
  {
   n: "A person watching",
   how: "Staff watch the herd and mark the cows that stand to be mounted, usually twice a day between everything else that needs doing.",
   miss:
    "Signs last six to eight hours and most of them fall at night. A third of cows barely show anything at all, and in hard frost the miss rate climbs to 83 percent.",
   caps: [0, 0, 0, 0, 1, 1],
   price: "Cost: staff time, roughly one hour per checkup.",
  },
  {
   n: "Hormone synchronisation",
   how: "Ovsynch and its longer variants put the whole group on a fixed hormone schedule so insemination can be booked by calendar instead of by observation.",
   miss:
    "Around 44 percent of cows conceive in the published trials, it needs veterinary time, it works worse on poorly fed herds, and it is invasive by design.",
   caps: [0, 0, 0, 0, 1, 0],
   price: "Cost: hormones, vet visits and repeated fixation of the animal.",
  },
  {
   n: "Leg pedometer",
   how: "A tag on the leg counts steps and flags the cow when today's count jumps above her normal.",
   miss:
    "Silent heat has few extra steps, so the quiet third stays invisible. No feeding context, no sound, and the tags get lost in bedding and slurry.",
   caps: [1, 1, 0, 0, 1, 1],
   price:
    "Cost: mid range hardware, plus replacements for the tags that disappear.",
  },
  {
   n: "Ear tag analytics",
   how: "A sensor in the ear tracks movement and ear temperature, then sends behaviour summaries to the vendor's cloud dashboard.",
   miss:
    "The ear is a noisy place to measure from, temperature at the ear drifts with the weather, and the data lives in a subscription you do not control.",
   caps: [1, 1, 1, 0, 0, 1],
   price: "Cost: per animal hardware plus an ongoing cloud subscription.",
  },
  {
   n: "Rumen bolus",
   how: "A capsule sits in the rumen and measures core temperature precisely, with very little movement noise.",
   miss:
    "It has to be swallowed and is difficult to take back out. Battery life sets a hard expiry date, and it hears nothing at all.",
   caps: [1, 0, 1, 0, 1, 0],
   price:
    "Cost: up to 27 euro per bolus for the cheap ones, far more for long life versions.",
  },
  {
   n: "Vaginal probe",
   how: "A probe placed inside the cow reports temperature and the moment of heat directly.",
   miss:
    "Invasive, awkward to service and hard to scale across a herd. It measures no activity, so it tells you nothing about how she is behaving.",
   caps: [1, 0, 1, 0, 1, 0],
   price: "Cost: hygiene and handling work on every animal, every cycle.",
  },
  {
   n: "Imported neck collar",
   how: "The strongest competitor. A neck collar measures activity and rumination, then scores heat on the vendor's own model.",
   miss:
    "The model is tuned for herds that are not yours, there is no microphone, no battery indicator, and local adaptation and service run through an importer.",
   caps: [1, 1, 0, 0, 0, 1],
   price:
    "Cost: 200 dollars and upward per collar, plus the base station and support contract.",
  },
 ];
 var US = [1, 1, 1, 1, 1, 1];
 // Build nodes rather than HTML strings. The content here is fixed, but keeping
 // the sinks out of the file means it stays safe if the data ever moves.
 function dotEl(on) {
  var s = document.createElement("span");
  s.className = "dot " + (on ? "on" : "off");
  s.setAttribute("role", "img");
  s.setAttribute("aria-label", on ? "yes" : "no");
  return s;
 }
 function setLines(el, text) {
  el.replaceChildren();
  text.split("<br>").forEach((line, i) => {
   if (i) el.appendChild(document.createElement("br"));
   el.appendChild(document.createTextNode(line));
  });
 }
 function showRival(i) {
  var r = rivalData[i];
  document.getElementById("rvName").textContent = r.n;
  document.getElementById("rvHow").textContent = r.how;
  document.getElementById("rvMiss").textContent = r.miss;
  document.getElementById("rvPrice").textContent = r.price;
  document.getElementById("rvCol").textContent = r.n.toLowerCase();
  var nameCell = (text) => {
   var td = document.createElement("td");
   td.textContent = text;
   return td;
  };
  var dotCell = (on) => {
   var td = document.createElement("td");
   td.appendChild(dotEl(on));
   return td;
  };
  var body = document.getElementById("capBody");
  body.replaceChildren();
  for (var k = 0; k < CAPS.length; k++) {
   var tr = document.createElement("tr");
   tr.append(nameCell(CAPS[k]), dotCell(r.caps[k]), dotCell(US[k]));
   body.appendChild(tr);
  }
 }
 var rivalBtns = Array.prototype.slice.call(
  document.querySelectorAll("#rivalList button"),
 );
 rivalBtns.forEach((b) => {
  b.addEventListener("click", () => {
   rivalBtns.forEach((x) => {
    x.setAttribute("aria-selected", String(x === b));
   });
   showRival(+b.dataset.r);
  });
 });
 showRival(0);
})();
