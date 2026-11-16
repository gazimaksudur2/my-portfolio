# Gazi Maksudur Rahman — Portfolio (Next.js)

Personal portfolio rebuilt with **Next.js App Router**, TypeScript, and a Git-backed admin CMS. The public site is a static export hosted on **GitHub Pages** (free tier).

**Live site:** [gazimaksudur.dev](https://gazimaksudur.dev)

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) + TypeScript |
| Output | Static export (`output: 'export'`) |
| Styling | Tailwind CSS 3 + Framer Motion |
| Content | Versioned JSON under `content/` |
| Admin | `/admin` client UI (not in public nav) |
| Writes | GitHub Contents API via fine-grained PAT |
| Deploy | GitHub Actions → GitHub Pages |
| Contact | EmailJS |

## Project structure

```
app/                  # App Router pages (public + /admin)
components/           # Portfolio sections, layout chrome, admin UI
content/              # Editable JSON (site, projects, experience, …)
lib/                  # Schemas (zod), content loaders, GitHub/auth helpers
public/               # robots, sitemap, CNAME, manifest
.github/workflows/    # Pages deploy
```

## Local development

```bash
cp .env.example .env.local   # fill EmailJS keys if testing contact form
npm install
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Admin & content management

1. Open `/admin` (optional PIN defaults to `admin`, override with `NEXT_PUBLIC_ADMIN_PIN`).
2. Sign in with a **GitHub fine-grained PAT** scoped to this repo with **Contents: Read and write**.
3. Edit any section; validate with zod; **Commit to GitHub** or **Download JSON**.
4. A push to `main` triggers Actions → rebuild → Pages deploy (~1–3 minutes).

Security note: the PIN only hides the UI. Authorization is the GitHub token (sessionStorage only — never committed).

## Environment variables

See [`.env.example`](.env.example). For Actions, set EmailJS secrets under repository Settings → Secrets. Public `NEXT_PUBLIC_*` values are safe to expose in the static build.

## Deployment (GitHub Pages)

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main` (or run the **Deploy to GitHub Pages** workflow manually).
3. Custom domain: `public/CNAME` is set to `gazimaksudur.dev`. Point DNS (A/AAAA or CNAME) at GitHub Pages.
4. Optional: keep [`netlify.toml`](netlify.toml) redirects from `gazimaksudur.me` → `gazimaksudur.dev`.

Firebase Hosting configs remain for reference but are no longer the primary deploy path.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Next.js dev server |
| `npm run build` | Static export to `out/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Updating content without the admin UI

Edit files under `content/` and push to `main`. Schemas live in [`src/lib/schemas.ts`](src/lib/schemas.ts).

## Author

**Gazi Maksudur Rahman** — [gazimaksudur2@gmail.com](mailto:gazimaksudur2@gmail.com)
