# Gazi Maksudur Rahman — Portfolio

A static Next.js portfolio with a private, Git-backed admin CMS. Visitors get a fully static site on **GitHub Pages**; you edit JSON content through `/admin` (or by hand in `content/`), and GitHub Actions rebuilds the public HTML on every push to `main`.

| | |
|---|---|
| **Live site** | [https://gazimaksudur.dev](https://gazimaksudur.dev) |
| **Alias** | [https://gazimaksudur.me](https://gazimaksudur.me) → 301 to `.dev` (Cloudflare) |
| **Repo** | [gazimaksudur2/my-portfolio](https://github.com/gazimaksudur2/my-portfolio) |
| **Admin** | [`/admin/`](https://gazimaksudur.dev/admin/) (not linked in public nav; `noindex`) |
| **Stack** | Next.js 15 · React 19 · TypeScript · Tailwind · Framer Motion · Zod · Octokit · EmailJS |

---

## Current status

| Item | Status |
|------|--------|
| Public site on GitHub Pages | Live at [gazimaksudur.dev](https://gazimaksudur.dev) |
| Custom domain + HTTPS | Working (GitHub Pages + Let’s Encrypt; Cloudflare proxy optional) |
| `gazimaksudur.me` → `.dev` | Cloudflare free Redirect Rule (301, path + query preserved) |
| Admin CMS (`/admin`) | PIN gate + fine-grained GitHub PAT → Contents API commits |
| Contact form | EmailJS when `NEXT_PUBLIC_EMAILJS_*` secrets are set; otherwise `mailto:` fallback |
| Bot / scanner mitigation | Cloudflare (Bot Fight Mode, WAF path blocks) in front of the edge |

---

## Architecture overview

This is intentionally a **static-export** architecture: there is no Node server in production. Content is data files in Git; the build turns them into HTML/CSS/JS; Pages serves the `out/` folder.

```text
┌──────────────────────────────────────────────────────────────────────────┐
│                         CONTENT SOURCE OF TRUTH                          │
│                     content/*.json  (in this repo)                       │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐     ┌─────────────────┐     ┌─────────────────────┐
│ npm run build │     │ /admin UI       │     │ Manual git edit     │
│ Zod-validate  │     │ Octokit commit  │     │ push to main        │
│ → out/        │     │ content/*.json  │     │                     │
└───────┬───────┘     └────────┬────────┘     └──────────┬──────────┘
        │                      │                         │
        │                      └──────────┬──────────────┘
        │                                 │
        │                                 ▼
        │                      GitHub Actions (deploy.yml)
        │                      checkout → npm ci → build → upload out/
        │                                 │
        ▼                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  GitHub Pages  ←── public/CNAME = gazimaksudur.dev                       │
│  Static files only (HTML / CSS / JS / assets)                            │
└────────────────────────────────┬───────────────────────────────────────┘
                                 │
                    Cloudflare (DNS / proxy / redirects / bot rules)
                                 │
                 ┌───────────────┴────────────────┐
                 ▼                                ▼
        gazimaksudur.dev                   gazimaksudur.me
        (portfolio origin)                 (301 → .dev + path)
```

### Design principles

1. **Git is the CMS database.** Editable portfolio data lives only in `content/*.json`. No external CMS, no database, no serverless write API on the host.
2. **Build-time data binding.** `src/lib/content.ts` imports those JSON files and parses them with Zod. The public home page is a Server Component that reads content at build time and passes it into client section components.
3. **Static export.** `next.config.mjs` sets `output: "export"`, `images.unoptimized: true`, and `trailingSlash: true` so the site works on GitHub Pages without a Node runtime.
4. **Admin is a client-only writer.** `/admin` never talks to a custom backend. It uses the visitor’s fine-grained PAT in the browser to call the GitHub Contents API, then relies on Actions to republish.
5. **Authorization is GitHub’s, not the PIN.** The local PIN only unlocks the UI shell. Real write access is the PAT’s repository Contents permission.

---

## How the public site works

### Request path

1. Browser hits `https://gazimaksudur.dev/` (or is redirected there from `.me`).
2. Cloudflare may proxy/filter the request (bot rules, WAF).
3. GitHub Pages serves the prebuilt file from the latest Actions deploy (`out/index.html`, assets, etc.).
4. The single-page portfolio hydrates: navbar, section dots, command palette (`Ctrl+K`), Framer Motion sections, contact form.

### Page composition

`src/app/page.tsx` loads all content once at build time via `getAllContent()`, then renders `PortfolioHome`:

| Section | Component | Content source |
|---------|-----------|----------------|
| Hero | `Banner` | `site.banner`, `site.personalInfo` |
| Projects | `Projects` / `ProjectCard` | `projects.json` |
| Experience | `Experience` | `experience.json` |
| Skills | `Skills` | `skills.json` |
| About | `About` | `site.about`, `quickFacts`, `highlights` |
| Education | `Education` | `education.json` |
| Achievements | `Achievements` | `achievements.json` |
| Certifications | `Certifications` | `certifications.json` |
| Contact | `Connect` | `site.personalInfo` + EmailJS env |

Chrome around the page: `Navbar`, `Footer`, `ProgressBar`, `SectionDots`, `CommandPalette`, skip-to-content link, back-to-top.

### Routing model

- The portfolio is a **single route** `/` with in-page hash sections (`/#projects`, `/#contact`, …).
- `trailingSlash: true` means exported paths look like `/admin/`, `/admin/projects/`.
- Legacy SPA-style paths such as `/projects/` are handled in `src/app/not-found.tsx`: the client soft-redirects known section names to `/#section`. Unknown paths show a real 404.
- `public/robots.txt` allows `/` and disallows `/admin/`. Admin layout also sets `robots: { index: false, follow: false }`.

### Contact form

`Connect` uses `@emailjs/browser` when all three `NEXT_PUBLIC_EMAILJS_*` values are present at build time (injected in Actions from repository secrets). If any are missing, submit falls back to a `mailto:` link with the subject/body filled in. A honeypot field helps ignore trivial bots.

### SEO

Root layout builds metadata (title, description, Open Graph, Twitter card, canonical) and JSON-LD (`Person` + `WebSite`) from `site.json` SEO fields. Sitemap and robots live under `public/`.

---

## How the admin CMS works

### Auth layers

```text
Browser /admin
   │
   ├─ 1. Local PIN  (NEXT_PUBLIC_ADMIN_PIN, default "admin")
   │     → sessionStorage flag only — hides UI, not a security boundary
   │
   └─ 2. Fine-grained GitHub PAT
         → verified with Octokit (getAuthenticated + repos.get)
         → stored in sessionStorage for the tab session
         → used for Contents read/write on this repo only
```

Logout clears both the PIN flag and the PAT from `sessionStorage`.

### Edit → live pipeline

1. Open `https://gazimaksudur.dev/admin/` (or `http://localhost:3000/admin` locally).
2. Unlock with PIN, paste PAT (Contents: Read and write on `my-portfolio` only).
3. Choose a section (Site, Projects, Experience, …).
4. Edit via structured forms or raw JSON mode.
5. **Validate** against the matching Zod schema in `src/lib/schemas.ts`.
6. **Commit to GitHub** → `commitContentFile()` base64-encodes JSON and calls `repos.createOrUpdateFileContents` on `main` (with the existing file SHA for updates).
7. Push to `main` triggers [Deploy to GitHub Pages](.github/workflows/deploy.yml).
8. After the workflow is green (~1–3 minutes), hard-refresh the live site.

Offline / mock path: **Download JSON** saves a file locally without committing (useful when you do not want to use a PAT).

### Admin routes

| Path | Edits |
|------|--------|
| `/admin/` | Dashboard overview |
| `/admin/site/` | Profile, nav, banner, about, SEO |
| `/admin/projects/` | Featured + grid projects |
| `/admin/experience/` | Roles / internships |
| `/admin/education/` | Academic timeline |
| `/admin/skills/` | Categories + tech logo marquee |
| `/admin/certifications/` | Credentials |
| `/admin/achievements/` | Highlight wins |

Implementation: `AdminShell` (gate + nav) + `ContentEditor` / `ItemForm` + `src/lib/github.ts` + `src/lib/auth.ts`.

---

## How deploy works

Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

| Trigger | `push` to `main`, or manual **workflow_dispatch** |
|---------|-----------------------------------------------------|
| Build | Node 22 · `npm ci` · `npm run build` → `out/` |
| Env baked into the static bundle | EmailJS secrets (optional), GitHub owner/repo/branch, `NEXT_PUBLIC_SITE_URL` |
| Artifact | `actions/upload-pages-artifact` on `out/` |
| Deploy | `actions/deploy-pages` into the `github-pages` environment |
| Concurrency | One Pages deploy at a time; newer runs cancel in-progress ones |

`public/CNAME` ships `gazimaksudur.dev` with the export so Pages keeps the custom domain on each deploy.

> `firebase.json` is leftover from an older hosting setup. **Primary host is GitHub Pages.** Do not treat Firebase as the production path.

---

## Hosting, DNS, and Cloudflare

### gazimaksudur.dev (origin)

1. GitHub → **Settings → Pages** → Source = **GitHub Actions**.
2. Custom domain = `gazimaksudur.dev`, **Enforce HTTPS** after DNS is ready.
3. DNS at your registrar / Cloudflare: apex A/AAAA (or appropriately proxied records) per [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
4. Prefer the custom domain so asset paths stay at `/` (no `/my-portfolio` `basePath`).

### gazimaksudur.me → .dev (Cloudflare free)

Namecheap-style URL forward does not give reliable HTTPS on `.me`. Cloudflare Redirect Rules terminate TLS at the edge and 301 to `.dev`.

**DNS (proxied):**

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | `@` | `192.0.2.1` (documentation IP; redirect runs at edge) | Proxied |
| CNAME | `www` | `gazimaksudur.me` | Proxied |

**Redirect Rule** (custom expression):

```text
(http.host eq "gazimaksudur.me") or (http.host eq "www.gazimaksudur.me")
```

Dynamic target:

```text
concat("https://gazimaksudur.dev", http.request.uri.path)
```

Status **301**, preserve query string. SSL/TLS mode **Full** (or Flexible for redirect-only).

**Verify:**

```bash
curl -sI https://gazimaksudur.me/ | rg -i '^(HTTP/|location:)'
# → 301 Location: https://gazimaksudur.dev/

curl -sI https://gazimaksudur.me/projects/ | rg -i '^(HTTP/|location:)'
# → 301 Location: https://gazimaksudur.dev/projects/
```

### Recommended Cloudflare hardening (free)

On the proxied zone(s):

- **Bot Fight Mode** on; block AI scrapers if desired
- Security Level Medium/High; Browser Integrity Check on
- SSL/TLS **Full** when origin is GitHub Pages HTTPS
- Optional WAF custom rule to block common probes, e.g. paths containing `wp-admin`, `wp-login`, `xmlrpc`, `.env`, or ending in `.php`

**Smoke check:**

```bash
echo "DEV:";  curl -sI https://gazimaksudur.dev/ | rg -i '^(HTTP/|server:|cf-ray:|cf-mitigated:|location:)'; \
echo "ME:";   curl -sI https://gazimaksudur.me/ | rg -i '^(HTTP/|server:|location:|cf-ray:)'; \
echo "BOT:";  curl -sI -A 'python-requests/2.31.0' https://gazimaksudur.dev/ | rg -i '^(HTTP/|server:|cf-mitigated:|cf-ray:)'; \
echo "SCAN:"; curl -sI https://gazimaksudur.dev/wp-admin/ | rg -i '^(HTTP/|server:|cf-mitigated:|cf-ray:)'
```

Datacenter/VPS curls often get `403` + `cf-mitigated: challenge` when Bot Fight Mode is working — that is expected.

---

## Content model

All editable data is under [`content/`](content/), validated by [`src/lib/schemas.ts`](src/lib/schemas.ts).

| File | Responsibility |
|------|----------------|
| `site.json` | Personal info, nav links, banner/hero, about, quick facts, highlights, SEO |
| `projects.json` | Featured projects + grid items |
| `experience.json` | Work / internship timeline |
| `education.json` | Academic timeline |
| `skills.json` | Skill categories + tech logo marquee URLs |
| `certifications.json` | Credentials + verification links |
| `achievements.json` | Highlight wins |

Build-time loaders: [`src/lib/content.ts`](src/lib/content.ts). Path map used by admin commits: `contentFilePaths`.

---

## Project structure

```text
content/                      # Source of truth for portfolio data
src/
  app/
    page.tsx                  # Public home (build-time content → PortfolioHome)
    layout.tsx                # Global metadata + JSON-LD
    not-found.tsx             # Section-path soft redirects + 404
    admin/                    # Static admin routes (layout is noindex)
  components/
    sections/                 # Banner, Projects, Experience, Skills, …
    layout/                   # Navbar, Footer, CommandPalette, ProgressBar, SectionDots
    admin/                    # AdminShell, LoginForm, ContentEditor, ItemForm
    ui/                       # Shared UI bits
  lib/
    schemas.ts                # Zod schemas + ContentFileKey
    content.ts                # Import + parse JSON at build time
    github.ts                 # Octokit verify / get / commit helpers
    auth.ts                   # PIN + PAT sessionStorage helpers
  hooks/                      # useCountUp, useScrollNav, …
  utils/                      # Motion helpers
public/
  CNAME                       # gazimaksudur.dev
  robots.txt / sitemap.xml
  favicon.svg / site.webmanifest
.github/workflows/deploy.yml  # Build + GitHub Pages deploy
next.config.mjs               # output: "export", trailingSlash, unoptimized images
```

---

## Local development

```bash
cp .env.example .env.local   # EmailJS + optional admin PIN + GitHub targets
npm install
npm run dev
```

| URL | Purpose |
|-----|---------|
| http://localhost:3000/ | Public portfolio |
| http://localhost:3000/admin/ | Content admin |

```bash
npm run build       # static export → out/
npm run typecheck
npm run lint
npx serve out       # preview the exact Pages artifact locally
```

Admin against the real repo from localhost still uses your browser PAT and commits to the configured owner/repo/branch (`NEXT_PUBLIC_GITHUB_*`).

---

## Environment variables

See [`.env.example`](.env.example). All of these are `NEXT_PUBLIC_*` and therefore visible in the client bundle — never put secret write credentials here except the user-pasted PAT at runtime (which is not an env var).

| Variable | Role |
|----------|------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Contact form service |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Contact form template |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `NEXT_PUBLIC_GITHUB_OWNER` | Admin API owner (fallback `gazimaksudur2`) |
| `NEXT_PUBLIC_GITHUB_REPO` | Admin API repo (fallback `gazimaksudur`) |
| `NEXT_PUBLIC_GITHUB_BRANCH` | Commit branch (fallback `main`) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (fallback `https://gazimaksudur.dev`) |
| `NEXT_PUBLIC_ADMIN_PIN` | Optional UI gate only (fallback `admin` in app code) |

### Where to put production EmailJS secrets

`NEXT_PUBLIC_*` values are **inlined at `next build` time**. The deploy job never injects them into the already-built HTML/JS.

Because this repo’s deploy uses the GitHub-created **`github-pages` environment**, put the three EmailJS keys there:

1. Repo → **Settings → Environments → `github-pages`**
2. **Environment secrets** → add (exact names):
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
3. Re-run **Actions → Deploy to GitHub Pages** on `main` (or push a commit).

Repository-level **Settings → Secrets and variables → Actions → Secrets** also work, but environment secrets under `github-pages` are only visible to jobs that declare `environment: github-pages`. The build job does that so your form does not silently fall back to `mailto:`.

If any of the three are missing at build time, the workflow fails the verify step instead of shipping a mailto-only form by mistake.

### Optional config variables (github-pages Environment variables)

Same rule as EmailJS: values must be present **during `next build`**. Set these under **Settings → Environments → `github-pages` → Environment variables** if you want to override defaults; otherwise leave them unset and the workflow uses the fallbacks below.

| Variable | Fallback if unset |
|----------|-------------------|
| `NEXT_PUBLIC_ADMIN_PIN` | app default `admin` (empty env → code fallback) |
| `NEXT_PUBLIC_GITHUB_OWNER` | `gazimaksudur2` |
| `NEXT_PUBLIC_GITHUB_REPO` | `gazimaksudur` |
| `NEXT_PUBLIC_GITHUB_BRANCH` | `main` |
| `NEXT_PUBLIC_SITE_URL` | `https://gazimaksudur.dev` |

Resolution order in the deploy workflow: **environment/repo `vars` → same-named `secrets` → fallback**.

After changing any of these, re-run **Deploy to GitHub Pages** on `main`. The build log prints the resolved owner/repo/branch/site URL (PIN value stays hidden).

---

## Create a GitHub PAT for `/admin`

1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens**.
2. Resource owner: you · Repository access: **Only** `gazimaksudur` (this repo).
3. Permissions: **Contents → Read and write** (nothing else required).
4. Generate, copy once, paste into `/admin` login.
5. Token stays in `sessionStorage` until the tab closes or you log out — it is never committed.

---

## Security notes

- The admin PIN is **client-side only**. Anyone who can open DevTools can bypass it; treat it as a soft gate.
- Real protection is the **scoped PAT** and GitHub permissions. Prefer fine-grained, repo-limited, Contents-only tokens; rotate if leaked.
- Do **not** commit PATs or bake them into Actions secrets for the static site.
- `/admin` is omitted from public nav, disallowed in `robots.txt`, and marked `noindex`.
- Contact form includes a honeypot; Cloudflare bot/WAF rules add edge filtering.
- Static hosting means there is no server-side session or privileged API on Pages itself.

---

## End-to-end checklist

- [ ] Pages source = **GitHub Actions**; latest Deploy workflow green
- [ ] `https://gazimaksudur.dev/` serves the Next.js portfolio
- [ ] `https://gazimaksudur.me/` 301s to `.dev` with path preserved
- [ ] `/admin/` shows PIN / PAT gate; public nav has no Admin link
- [ ] One admin save → commit on `main` → Actions rebuild → live content updates
- [ ] EmailJS secrets on **Environments → github-pages** (or repo Actions secrets); Deploy workflow verify step green; form does not open mailto
- [ ] Cloudflare bot / WAF settings as desired

---

## Author

**Gazi Maksudur Rahman** — [gazimaksudur2@gmail.com](mailto:gazimaksudur2@gmail.com) · [LinkedIn](https://www.linkedin.com/in/gazimaksudur/) · [GitHub](https://github.com/gazimaksudur2)
