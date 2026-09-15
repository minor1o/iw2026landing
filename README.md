# IW2026 landing page

The landing page for our IW2026 hackathon project.

**Live:** <https://minor1o.github.io/iw2026landing/>

## Writing the page

Commit HTML, CSS, images and anything else the browser needs. **Every push to
`main` publishes the whole repository as the site**, so there is no build step
to run and no deploy branch to keep in sync.

The only requirement is that the web root holds an `index.html` — the workflow
fails with a clear message if it does not, rather than deploying a site that
404s at its root. Everything else is optional.

```text
index.html          ← the page (required)
assets/             ← anything it references
.agents/            ← agent skills; not published
.github/workflows/  ← this deployment; not published
```

Top-level dot-directories are stripped from the published site automatically,
so `.agents/` and `.github/` never become public URLs.

To preview locally before pushing:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deployment

`.github/workflows/deploy-pages.yml` publishes to GitHub Pages, a project site
at `https://minor1o.github.io/iw2026landing/`.

| Trigger | What runs |
| --- | --- |
| Pull request into `main` | `check` only — verifies the web root has an `index.html` |
| Push to `main` | `check`, then `deploy` |
| Manual, from the Actions tab | `check`, then `deploy` from whichever ref was chosen |

A deploy takes under a minute. Runs queue rather than cancel, so a deployment
that has started always finishes.

### One-time setup

Pages cannot be switched on by committing a file — do it once in the repo:

Set *Settings → Pages → Source* to **GitHub Actions**.

Until that is set, the deploy job stops at *Setup Pages* with `Get Pages site
failed`. If the site needs a custom domain, set it on the same settings page.

### If the site never appears

- The repository must be **public**, or the account must be on a plan that
  allows Pages for private repositories. A private repo on a Free plan cannot
  publish.
- The first push must land on `main`. Pushes to other branches only run the
  check.
- If the page ever moves into a build output directory (`dist/`, `public/`),
  change `SITE_DIR` at the top of the workflow — it is the single knob.

## Agent skills

`.agents/skills/` holds the instructions an agent picks up when working here:

| Skill | When it applies |
| --- | --- |
| [`landing-copy`](.agents/skills/landing-copy/SKILL.md) | Writing or revising the page's **words** — slogan, value proposition, business thesis, how it works, call to action, social proof. Carries two non-negotiables: never frame value around price, and never let a claim through that is not measurable |
| [`modern-web-guidance`](.agents/skills/modern-web-guidance/SKILL.md) | Writing the page's **code** — searchable best-practice guides for HTML, CSS, forms, accessibility and performance, so the result uses current platform features instead of stale patterns |

See [`.agents/README.md`](.agents/README.md) for how those are kept portable.
