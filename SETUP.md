# Pushing this to GitHub, step by step

This bundle is already published from
[`minor1o/iw2026landing`](https://github.com/minor1o/iw2026landing) at
<https://minor1o.github.io/iw2026landing/>, by
`.github/workflows/deploy-pages.yml` on every push to `main`. Everything below is
for the case where the site is re-homed into a *different* repository.

Two routes. Pick one.

---

## Route A, no command line

Good if git is not installed on your laptop.

1. Go to <https://github.com/new>.
   Repository name: `cowllar-site`. Public. Do **not** tick "add a README".
   Click **Create repository**.
2. On the empty repository page click **uploading an existing file**.
3. Unzip `cowllar-site.zip` on your computer, open the folder, select **everything
   inside it** (not the folder itself) and drag it into the browser window.
   Wait for all files to finish uploading.
4. Commit message: `Cowllar landing page`. Click **Commit changes**.
5. Go to **Settings, Pages**. Under **Build and deployment, Source** choose
   **GitHub Actions**. `.github/workflows/deploy-pages.yml` in the zip does the
   rest. The site is not reachable until this step is done.
6. Wait about a minute, then open
   `https://<your-user>.github.io/cowllar-site/`.

One caveat: drag and drop sometimes skips folders that start with a dot. If
`.github/workflows/deploy-pages.yml` did not upload, use **Add file, Create new
file**, type `.github/workflows/deploy-pages.yml` as the name, paste the contents
from the zip, and commit.

---

## Route B, command line

```bash
# once, if you have never used git here
git config --global user.name  "Akinrinsola Agbelusi"
git config --global user.email "you@example.com"

cd path/to/cowllar-site      # the unzipped folder

git init
git add .
git commit -m "Cowllar landing page"
git branch -M main
git remote add origin https://github.com/<your-user>/cowllar-site.git
git push -u origin main
```

Then **Settings, Pages, Source: GitHub Actions**, wait a minute, and the site is
live at `https://<your-user>.github.io/cowllar-site/`.

If the push asks for a password, GitHub wants a token rather than your account
password. Create one at **Settings, Developer settings, Personal access tokens,
Tokens (classic)**, tick `repo`, and paste the token as the password.

---

## Later changes

```bash
git add .
git commit -m "what changed"
git push
```

Every push redeploys. Give it a minute, then refresh with `Ctrl+Shift+R` so the
browser does not serve you the old cached version.

---

## Before the pitch

1. Run `python tools/build_single_file.py`.
2. Copy `dist/index.html` to a USB stick.
3. Open it once on the presentation laptop, with wifi switched off, to prove it
   works. That file needs no server, no internet and no installation.

The only thing the offline file cannot fetch is the two web fonts. It falls back
to the system sans serif, which looks fine. If you want the fonts offline as
well, tell me and I will embed them.

---

## Custom domain, optional

Buy a domain, add a file called `CNAME` at the top of the repository containing
just the domain name, then point a CNAME DNS record at
`<your-user>.github.io`. GitHub picks it up and issues the certificate.
