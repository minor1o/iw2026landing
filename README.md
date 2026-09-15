# Cowllar

**Team 51, Area 51, Skolkovo Institute of Science and Technology**

A landing page for Cowllar, a sensor collar that watches dairy cows through the
night and names the one to inseminate before her window closes.

Live site: `https://<your-user>.github.io/cowllar-site/`

---

## What is on the page

| Section | What it does |
| --- | --- |
| Hero | The collar on a live cow, with a sensor trace running under it |
| Cost | Herd calculator: set your herd size and miss rate, see the roubles |
| Farms | Four real farm interviews, switchable, plus seven intern voices |
| Promise | Four commitments to the person who walks the barn at 5 am |
| Rivals | Seven existing approaches compared against Cowllar, capability by capability |
| Device | Photo explorer of the six components, and a 3D exploded collar you can drag |
| Science | Four stage pipeline, animated, with leave one cow out results on real cattle data |
| See it work | Seventy two hours of one cow, play or scrub, alert fires when the score crosses |
| Proof | Eleven hours of live deployment, including the failures |
| Next | Version two roadmap and the team |

Three themes: **night**, **milk** and **lemon**. Every chart is drawn in
JavaScript and repaints itself when the theme changes. The choice is remembered
between visits.

---

## Running it locally

No build step, no package manager, no framework. Any static server works.

```bash
python -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` straight from the file system also works, because the
scripts are plain classic scripts rather than ES modules.

---

## Building the offline bundle

Competition rooms lose their wifi. `dist/index.html` is the whole site as one
file with every stylesheet, script and photograph inlined, so it opens by double
click on any laptop with no network at all.

```bash
python tools/build_single_file.py
```

Regenerate it whenever the site changes, and carry it on a USB stick.

---

## Preparing photographs

```bash
pip install -r tools/requirements.txt
python tools/optimise_images.py
```

Drop full size photographs into `source_images/`. The script resizes them to a
maximum width of 1400 px, converts photographs to progressive JPEG and leaves
charts and screenshots as PNG so their text stays sharp.

---

## Structure

```
.
├── index.html                  markup only, no styles or logic inside
├── assets/
│   ├── css/
│   │   ├── tokens.css          colours, type scale, and the three themes
│   │   ├── base.css            element defaults and typography
│   │   ├── layout.css          page rhythm and grid helpers
│   │   ├── components.css      navigation, hero, charts, gallery
│   │   ├── sections.css        voices, rivals, exploded collar, ledger
│   │   └── responsive.css      small screens and reduced motion
│   ├── js/
│   │   ├── core.js             palette reader, SVG helper, theme event bus
│   │   ├── nav.js              sticky bar, section rail, reveals, counters
│   │   ├── hero.js             animated sensor trace on canvas
│   │   ├── calculator.js       herd loss calculator
│   │   ├── voices.js           farm interviews and rival comparison
│   │   ├── device.js           component explorer and 3D exploded collar
│   │   ├── pipeline.js         pipeline stages and accuracy chart
│   │   ├── simulator.js        seventy two hour estrus simulation
│   │   ├── lightbox.js         full size image viewer
│   │   └── theme.js            night, milk and lemon
│   └── img/                    photographs, charts and screenshots
├── tools/
│   ├── build_single_file.py    inline everything into dist/index.html
│   ├── optimise_images.py      resize and compress source photographs
│   └── requirements.txt
├── dist/index.html             generated offline bundle
└── .github/workflows/deploy-pages.yml  publishes to Pages on push to main
```

### Why no framework

The page has no routing, no server state and no user accounts. A framework would
add a build step, a `node_modules` folder and one more thing that can fail in the
ten minutes before a pitch. What it would not add is a single thing a judge can
see. The interactive parts, three charts drawn from data, a draggable 3D view and
a live simulation, are a few hundred lines of plain JavaScript with no
dependencies, and they run from a USB stick on a laptop with no internet.

---

## Deploying

The workflow in `.github/workflows/deploy-pages.yml` publishes on every push to
`main`. It is already switched on for this repository — if it is ever re-homed,
enable it once under **Settings, Pages, Build and deployment, Source, GitHub
Actions**.

---

## Honesty notes

The numbers on this page come from our own work. 79.1 per cent is leave one cow
out accuracy on the public Ito cattle dataset, 11 hours is a real deployment on a
real animal, and the farm quotes are what those farms actually told us.

The seventy two hour simulation is labelled as modelled, because it is. We have
no vet confirmed estrus events yet, which is the next milestone and is stated on
the page.

The barn and veterinarian photographs are third party placeholders. Replace them
with licensed or original images before publishing anywhere commercial.

---

## Sources

1. Hagevoort G, Garcia J. *When should dairy cows be inseminated.* Guide B-117, New Mexico State University, 2013.
2. Yoshida C, Nakao T. *Characteristics of primary and secondary oestrous signs in high producing dairy cows.* Reproduction in Domestic Animals, 2005.
3. Nazarov M, Gorpinchenko E, Gavrilov B. *Artificial insemination of farm animals.* KubGAU, 2018.
4. *Japanese Black beef cow behaviour dataset.* Zenodo record 5849025.
