# Gazi Maksudur Rahman — Portfolio

Next.js App Router portfolio with a private Git-backed admin CMS. The public site is a **static export** deployed with **GitHub Actions → GitHub Pages** (free tier).

| | |
|---|---|
| **Repo** | [gazimaksudur2/my-portfolio](https://github.com/gazimaksudur2/my-portfolio) |
| **Intended live URL** | [https://gazimaksudur.dev](https://gazimaksudur.dev) (custom domain) |
| **Fallback Pages URL** | [https://gazimaksudur2.github.io/my-portfolio/](https://gazimaksudur2.github.io/my-portfolio/) (after Pages is enabled) |
| **Admin** | `/admin/` (not linked in public navigation) |
| **Stack** | Next.js 15 · TypeScript · Tailwind · Framer Motion · Zod · Octokit · EmailJS |

---

## Current status

| Item | Status |
|------|--------|
| Next.js site on GitHub Pages | Live at [https://gazimaksudur.dev](https://gazimaksudur.dev) |
| Custom domain `.dev` + HTTPS cert | Working (Let’s Encrypt via GitHub Pages) |
| `gazimaksudur.me` → `.dev` redirect | Use **Cloudflare** (free) — see [Redirect gazimaksudur.me](#redirect-gazimaksudurme-via-cloudflare-free) |
| Contact form (EmailJS) | Optional Actions secrets `NEXT_PUBLIC_EMAILJS_*` |

---

## Big picture

```text
┌─────────────────────┐     static HTML      ┌──────────────────────┐
│  Visitor / recruiter │ ──────────────────▶ │  GitHub Pages        │
│  gazimaksudur.dev    │                     │  (out/ from Actions) │
└─────────────────────┘                     └──────────▲───────────┘
                                                       │
                                              push / workflow
                                                       │
┌─────────────────────┐   Contents API       ┌─────────┴───────────┐
│  You at /admin       │ ──────────────────▶ │  GitHub repo        │
│  PIN + fine-grained  │   commit content/*.json│  content/*.json   │
│  PAT (session only)  │                     │  Actions rebuild    │
└─────────────────────┘                     └─────────────────────┘
```

- **Public site:** fully static. No Node server on Pages. Content is baked in at build time from `content/*.json`.
- **Admin:** client-only UI. Writes go to GitHub via the API; the next Actions run regenerates the public HTML (~1–3 minutes).
- **Auth:** a local PIN only hides the UI. Real authorization is a **GitHub fine-grained PAT** with Contents write on this repo (stored in `sessionStorage`, never committed).

---

## User flows

### 1. Visitor (public portfolio)

1. Opens `https://gazimaksudur.dev/` (or the `github.io` URL).
2. Sees Banner → Projects → Experience → Skills → About → Education → Achievements → Certifications → Contact.
3. Uses navbar / section dots / `Ctrl+K` command palette to jump sections.
4. Downloads resume or sends a message via EmailJS (if keys are configured).
5. Never sees `/admin` in navigation; `robots.txt` disallows `/admin/`.

### 2. You — edit content via admin (recommended)

1. Open `https://gazimaksudur.dev/admin/` (or `http://localhost:3000/admin` locally).
2. Enter the UI PIN (default `admin`, or `NEXT_PUBLIC_ADMIN_PIN`).
3. Paste a **fine-grained GitHub PAT** (this repo only, **Contents: Read and write**).
4. Pick a section (Site, Projects, Experience, …).
5. Edit with the form or JSON mode → **Validate** (Zod) → **Commit to GitHub** (or **Download JSON** offline).
6. Wait for [Actions](https://github.com/gazimaksudur2/my-portfolio/actions) → Deploy to GitHub Pages to finish.
7. Hard-refresh the live site to see updates.

### 3. You — edit content by hand (no admin)

1. Edit files under [`content/`](content/).
2. Commit and push to `main`.
3. Actions builds and deploys automatically.

### 4. Deploy / cutover (one-time)

1. Enable Pages (Actions source) — see below.
2. Re-run **Deploy to GitHub Pages** (or push any commit to `main`).
3. Confirm the Pages URL works.
4. Point DNS for `gazimaksudur.dev` at GitHub Pages.
5. Point `gazimaksudur.me` at Cloudflare and add a Redirect Rule → `.dev` (below).

---

## Redirect gazimaksudur.me via Cloudflare (free)

Namecheap URL Forward does **not** support reliable HTTPS on `.me` (browser hangs / cert errors). Cloudflare free Redirect Rules terminate HTTPS at the edge and 301 to `.dev`.

### 1. Add the domain to Cloudflare

1. Log in at [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Add a domain** → enter `gazimaksudur.me` → Free plan
3. Cloudflare shows two nameservers (e.g. `ada.ns.cloudflare.com`, `bob.ns.cloudflare.com`) — copy them

### 2. Point Namecheap nameservers at Cloudflare

1. Namecheap → Domain List → `gazimaksudur.me` → **Domain** tab → **Nameservers**
2. Choose **Custom DNS**
3. Paste the two Cloudflare nameservers → Save  
   (Propagation: often minutes, up to 24–48h)

### 3. Clean Advanced DNS leftovers on Namecheap

After NS switch, Namecheap host records no longer apply. Still remove any **URL Redirect** records there so you don’t get confused later.

### 4. Cloudflare DNS records (proxied)

In Cloudflare → `gazimaksudur.me` → **DNS** → **Records**:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | `@` | `192.0.2.1` | **Proxied** (orange cloud) |
| CNAME | `www` | `gazimaksudur.me` | **Proxied** (orange cloud) |

`192.0.2.1` is a documentation IP. Traffic never needs a real origin because the Redirect Rule runs at Cloudflare’s edge.

### 5. Cloudflare Redirect Rule

1. **Rules** → **Redirect Rules** → **Create rule**
2. Rule name: `me-to-dev`
3. **If incoming requests match…** → Custom filter expression:

```text
(http.host eq "gazimaksudur.me") or (http.host eq "www.gazimaksudur.me")
```

4. **Then…** → **Dynamic** redirect:

```text
concat("https://gazimaksudur.dev", http.request.uri.path)
```

5. Status code: **301**
6. Enable **Preserve query string**
7. Deploy the rule

### 6. SSL/TLS

1. **SSL/TLS** → Overview → mode **Full** (or **Flexible** is also fine for redirect-only)
2. Wait for **Universal SSL** to show Active for `gazimaksudur.me` (can take up to 24h first time; often sooner)

### 7. Verify

```bash
curl -sI https://gazimaksudur.me/
# 301 Location: https://gazimaksudur.dev/

curl -sI https://gazimaksudur.me/projects/
# 301 Location: https://gazimaksudur.dev/projects/
```

After the section-404 fix is on `main`, `/projects/` on `.dev` soft-redirects to `/#projects`.

---

## Get the deployed page link

The build already works. Deploy failed with:

> `Ensure GitHub Pages has been enabled`

### Step A — Enable GitHub Pages (required)

1. Open **[Settings → Pages](https://github.com/gazimaksudur2/my-portfolio/settings/pages)**.
2. Under **Build and deployment → Source**, choose **GitHub Actions** (not “Deploy from a branch”).
3. Save. GitHub may create a `github-pages` environment the first time the workflow runs.

### Step B — Run the deploy workflow

1. Open **[Actions → Deploy to GitHub Pages](https://github.com/gazimaksudur2/my-portfolio/actions/workflows/deploy.yml)**.
2. Click **Run workflow** → branch `main` → **Run workflow**.  
   Or push any commit to `main`.
3. Wait until both **build** and **deploy** jobs are green.

### Step C — Copy your live URLs

After a successful deploy:

| URL | When to use |
|-----|-------------|
| **https://gazimaksudur2.github.io/my-portfolio/** | Works immediately for a *project* site (this repo name). |
| **https://gazimaksudur.dev** | After DNS points to GitHub Pages (see Step D). |
| **Actions run → deploy job → environment URL** | Exact Pages URL GitHub reports for that deployment. |

> **Note on base path:** this project is configured with `basePath`-free URLs and `public/CNAME` for the custom domain (`/`). If you use only `github.io/my-portfolio` *without* a custom domain, asset paths may need a `basePath` of `/my-portfolio`. Prefer enabling the custom domain (Step D) so `/` keeps working.

### Step D — Custom domain (gazimaksudur.dev)

1. Repo already has [`public/CNAME`](public/CNAME) = `gazimaksudur.dev`.
2. In Pages settings, confirm **Custom domain** = `gazimaksudur.dev` and enable **Enforce HTTPS** after DNS propagates.
3. At your DNS provider, point the domain at GitHub Pages:
   - **Apex** `gazimaksudur.dev`: GitHub’s A/AAAA records (see [GitHub Pages custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)), **or**
   - **www** CNAME → `gazimaksudur2.github.io`
4. Prefer Cloudflare for `gazimaksudur.me` redirects (see above). [`netlify.toml`](netlify.toml) redirects are optional/legacy only.
5. Firebase Hosting configs are leftover reference only — primary host is GitHub Pages.

### Step E — Optional production secrets

In **Settings → Secrets and variables → Actions**, add:

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

Without these, the site still deploys; the contact form falls back to mailto behavior.

---

## Create a GitHub PAT for `/admin`

1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens**.
2. Resource owner: you · Repository access: **Only select repositories** → `my-portfolio`.
3. Permissions: **Contents → Read and write** (nothing else required).
4. Generate, copy once, paste into `/admin` login. Token stays in `sessionStorage` until the tab closes.

---

## Local development

```bash
cp .env.example .env.local   # EmailJS + optional NEXT_PUBLIC_ADMIN_PIN
npm install
npm run dev
```

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Public portfolio |
| http://localhost:3000/admin | Content admin |

```bash
npm run build       # static export → out/
npm run typecheck
npm run lint
```

Preview the export locally: `npx serve out`

---

## Project structure

```text
content/                 # Source of truth for editable portfolio data
  site.json              # Profile, nav, banner, about, SEO
  projects.json
  experience.json
  education.json
  skills.json
  certifications.json
  achievements.json
src/
  app/                   # App Router (page.tsx = public home, admin/*)
  components/
    sections/            # Banner, Projects, Experience, …
    layout/              # Navbar, Footer, CommandPalette, …
    admin/               # AdminShell, ContentEditor, LoginForm
  lib/
    schemas.ts           # Zod schemas
    content.ts           # Build-time loaders
    github.ts            # Octokit Contents helpers
    auth.ts              # PIN + PAT session helpers
public/                  # robots, sitemap, CNAME, favicon, manifest
.github/workflows/
  deploy.yml             # build → upload Pages artifact → deploy
```

---

## Content model (what `/admin` can edit)

| File | Manages |
|------|---------|
| `site.json` | Name, contact, socials, nav, banner, about, SEO |
| `projects.json` | Featured + grid projects |
| `experience.json` | Jobs / internships |
| `education.json` | Academic timeline |
| `skills.json` | Categories + tech logo marquee |
| `certifications.json` | Credentials + verification links |
| `achievements.json` | Highlight wins |

Schemas: [`src/lib/schemas.ts`](src/lib/schemas.ts).

---

## Environment variables

See [`.env.example`](.env.example).

| Variable | Role |
|----------|------|
| `NEXT_PUBLIC_EMAILJS_*` | Contact form |
| `NEXT_PUBLIC_GITHUB_OWNER` / `REPO` / `BRANCH` | Admin commit target (defaults to this repo / `main`) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata |
| `NEXT_PUBLIC_ADMIN_PIN` | Optional UI gate only (default `admin`) |

---

## Security notes

- Do **not** rely on the admin PIN alone — it is client-side.
- Do **not** commit PATs or put them in Actions secrets for the static site; enter the PAT in the browser when using admin.
- Prefer a fine-grained PAT limited to this repository and Contents write.
- `/admin` is `noindex` and omitted from public nav.

---

## Checklist after enabling Pages

- [ ] Settings → Pages → Source = **GitHub Actions**
- [ ] Actions → Deploy to GitHub Pages → green **build** + **deploy**
- [ ] Open the Pages URL and confirm the Next.js site (Achievements section present, `/admin` loads PIN gate)
- [ ] Custom domain + HTTPS for `gazimaksudur.dev`
- [ ] EmailJS Actions secrets (optional but recommended)
- [ ] Fine-grained PAT created; smoke-test one admin save → Actions rebuild

---

## Author

**Gazi Maksudur Rahman** — [gazimaksudur2@gmail.com](mailto:gazimaksudur2@gmail.com) · [LinkedIn](https://www.linkedin.com/in/gazimaksudur/) · [GitHub](https://github.com/gazimaksudur2)
