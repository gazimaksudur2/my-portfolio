# Gazi Maksudur Rahman — Personal Portfolio

A modern, single-page personal portfolio website for **Gazi Maksudur Rahman**, a backend-focused software engineer based in Sylhet, Bangladesh. The site showcases professional experience, projects, skills, certifications, education, and a contact form — built with React and Vite, styled with Tailwind CSS and DaisyUI, and deployed to Firebase Hosting.

**Live site:** [gazimaksudur.me](https://gazimaksudur.me)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Page Sections](#page-sections)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Updating Content](#updating-content)
- [Visitor Analytics](#visitor-analytics)
- [Work in Progress](#work-in-progress)
- [Author & Contact](#author--contact)

---

## Overview

This portfolio is a responsive, scroll-based single-page application (SPA). Navigation uses in-page anchor links with smooth scrolling rather than separate routes. The site is optimized for recruiters, collaborators, and clients who want a quick overview of skills, real-world projects, and ways to get in touch.

The owner is a Computer Science graduate from **Shahjalal University of Science and Technology (SUST)** with a focus on backend development (Node.js, Express, PostgreSQL), cloud/DevOps (AWS, Docker, Jenkins), and full-stack delivery with React.

---

## Features

- **Hero banner** with animated typewriter roles, profile image, stats, resume download, and social links
- **Sticky navbar** with scroll-aware active section highlighting and mobile hamburger menu
- **About Me** section with quick facts and professional highlights
- **Skills** organized into five categories (Programming, Backend & DB, Frontend, Cloud & DevOps, Core Concepts)
- **Services** cards for Frontend, Backend, and Full Stack offerings
- **Projects** gallery loaded from JSON — featured project spotlight plus a responsive grid
- **Certifications** horizontal slider with modal viewer for PDFs and images (Google Drive integration)
- **Education** timeline from SSC through B.Sc. CSE at SUST
- **Achievements** highlights from real project work
- **Contact form** powered by EmailJS with validation and SweetAlert2 feedback
- **Visitor analytics** — anonymous location tracking stored in Firebase Firestore (once per browser)
- **Footer** with quick links, visitor summary stats, and contact details
- **Floating back-to-top** button after scrolling
- **Custom 404 / error page** via React Router error boundaries
- **Smooth animations** — fade-in, float, gradient backgrounds, and custom Tailwind keyframes

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 18, Vite 5 |
| **Routing** | React Router DOM 6 |
| **Styling** | Tailwind CSS 3, DaisyUI 4, PostCSS, Autoprefixer |
| **Icons** | React Icons (Feather, Heroicons) |
| **Animations** | react-simple-typewriter, custom CSS keyframes |
| **Backend / Data** | Firebase 10 (Firestore), ipapi.co (geolocation) |
| **Email** | EmailJS (`@emailjs/browser`) |
| **UI Feedback** | SweetAlert2 |
| **Hosting** | Firebase Hosting |
| **Linting** | ESLint (React, React Hooks, React Refresh plugins) |
| **Fonts** | Inter, Poppins (Google Fonts) |

---

## Project Structure

```
my-portfolio/
├── public/
│   ├── projects.json          # Project portfolio data
│   └── sponsors.json          # Technology logos (reference data)
├── src/
│   ├── components/
│   │   ├── Icon.jsx           # Dynamic icon renderer from constants
│   │   └── Navbar.jsx         # Fixed nav with scroll spy
│   ├── constants/
│   │   └── index.js           # Nav links, personal info, highlights
│   ├── data/
│   │   └── certifications.json # Certification entries
│   ├── layout/
│   │   └── MainLayout.jsx     # Root layout wrapper
│   ├── pages/
│   │   ├── Authentication/
│   │   │   └── Login.jsx      # Placeholder (WIP)
│   │   ├── ErrorPage/
│   │   │   └── ErrorPage.jsx  # 404 and error handling
│   │   ├── Home/
│   │   │   ├── Home.jsx       # Main page — composes all sections
│   │   │   ├── Banner.jsx
│   │   │   ├── AboutMe.jsx
│   │   │   ├── MySkills.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Project.jsx    # Individual project card
│   │   │   ├── Certifications.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Achievements.jsx
│   │   │   ├── Connect.jsx    # Contact form
│   │   │   └── UnderConstruction.jsx  # Optional overlay (commented out)
│   │   └── UpdatePortfolio/
│   │       └── UpdatePortfolio.jsx  # Placeholder (WIP)
│   ├── providers/
│   │   ├── AuthProvider.jsx   # Placeholder (WIP)
│   │   └── Firebase.config.js # Firebase app + Firestore init
│   ├── routes/
│   │   └── Router.jsx         # React Router config
│   ├── services/
│   │   └── visitorStats.js    # Visitor tracking & summary
│   ├── shared/
│   │   ├── Footer.jsx
│   │   └── SubSection.jsx
│   ├── index.css              # Global styles, Tailwind directives
│   └── main.jsx               # App entry point
├── .env.example               # EmailJS env template
├── firebase.json              # Firebase Hosting config
├── .firebaserc                # Firebase project alias
├── tailwind.config.js         # Theme, colors, animations
├── vite.config.js
└── package.json
```

---

## Page Sections

| Section | ID | Description |
|---------|-----|-------------|
| Banner | `#home` | Introduction, typewriter tagline, CTA buttons, stats |
| About Me | `#about` | Story, quick facts, professional highlights |
| Skills | `#skills` | Five skill category cards |
| Services | `#services` | Frontend, Backend, Full Stack service cards |
| Projects | `#projects` | Featured project + grid of up to 3 more |
| Certifications | `#certifications` | Scrollable credential cards with modal viewer |
| Education | `#education` | Academic background timeline |
| Achievements | `#achievements` | Key accomplishments |
| Contact | `#contact` | Contact info, social links, EmailJS form |

### Featured Projects

Projects are defined in `public/projects.json`:

1. **SmartAgro Connect** — B2B agricultural marketplace (React, Express, MongoDB)
2. **ElevateEx** — EdTech platform with multi-role dashboards (React, Firebase Auth, Node.js)
3. **Easy Bank** — Full-stack fintech app (React, Vite, Firebase)
4. **TripFlip** — Hotel booking management system (React, Express, MongoDB)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommended)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/gazimaksudur2/my-portfolio.git
cd my-portfolio

# Install dependencies
npm install

# Copy environment variables and fill in EmailJS credentials
cp .env.example .env
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. Vite provides hot module replacement (HMR) for fast development.

### Production Build

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## Environment Variables

Create a `.env` file in the project root (see `.env.example`):

| Variable | Description |
|----------|-------------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS email template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public API key |

The contact form in the **Connect** section requires these variables. Without them, form submission shows an error alert. Restart the dev server after changing `.env`.

Firebase configuration is in `src/providers/Firebase.config.js` and is used for Firestore visitor tracking (no extra env vars required for basic setup).

---

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Vite dev server |
| `build` | `npm run build` | Build for production → `dist/` |
| `preview` | `npm run preview` | Serve production build locally |
| `lint` | `npm run lint` | Run ESLint on `.js` / `.jsx` files |
| `deploy` | `npm run deploy` | Build and deploy to Firebase Hosting |
| `firebase` | `npm run firebase` | Run Firebase CLI via npx |

---

## Deployment

The site is hosted on **Firebase Hosting** (project: `portfolio-43a5c`).

```bash
# One-step build + deploy
npm run deploy

# Or manually
npm run build
npx firebase-tools deploy
```

`firebase.json` serves the `dist` folder and rewrites all routes to `index.html` for SPA support.

---

## Updating Content

### Personal info & navigation

Edit `src/constants/index.js` for:

- `navLinks` — navbar and footer section links
- `personalInfo` — name, title, resume URL
- `quickFacts` — location, experience, availability, languages
- `highlights` — "What I Bring" cards in About Me

### Projects

Edit `public/projects.json`. Each project object supports:

```json
{
  "projectType": "string",
  "projectTitle": "string",
  "projectDescription": "string",
  "skills": ["array", "of", "strings"],
  "liveSiteLink": "https://...",
  "githubClientRepoLink": "https://...",
  "githubServerRepoLink": "https://...",
  "bannerImgUrl": "https://...",
  "features": ["array", "of", "feature", "strings"]
}
```

The first entry is shown as the **featured** project; entries 2–4 appear in the grid.

### Certifications

Edit `src/data/certifications.json`. Each entry supports:

- `id`, `title`, `issuer`, `platform`, `date`, `description`
- `certificateUrl` — Google Drive or direct image/PDF URL
- `type` — `"pdf"` or image
- `verificationUrl`, `tags`, `topics` (optional)

The Certifications component resolves Google Drive links for embedded PDF/image previews.

### Inline section content

Skills, services, education, achievements, and banner text are defined directly in their respective component files under `src/pages/Home/`.

---

## Visitor Analytics

On first visit per browser, `trackVisitor()` in `src/services/visitorStats.js`:

1. Checks `localStorage` to avoid duplicate tracking
2. Fetches approximate location from [ipapi.co](https://ipapi.co)
3. Writes a document to the Firestore `visitor_stats` collection (city, region, country, coordinates, user agent, timestamp)

The footer calls `getVisitorSummary()` to display total visitors and top three countries.

---

## Work in Progress

These files exist as placeholders and are **not** wired into the router yet:

- `src/pages/Authentication/Login.jsx` — admin login page
- `src/pages/UpdatePortfolio/UpdatePortfolio.jsx` — portfolio CMS/update page
- `src/providers/AuthProvider.jsx` — authentication context (empty)
- `src/pages/Home/UnderConstruction.jsx` — optional full-page overlay (commented out in `Home.jsx`)

Future plans may include authenticated content management and admin-only portfolio updates.

---

## Author & Contact

**Gazi Maksudur Rahman**  
Backend-focused Software Engineer · Sylhet, Bangladesh

| | |
|---|---|
| **Email** | gazimaksudur2@gmail.com |
| **Phone** | +880 1903-219313 |
| **GitHub** | [github.com/gazimaksudur2](https://github.com/gazimaksudur2) |
| **LinkedIn** | [linkedin.com/in/gazimaksudur](https://www.linkedin.com/in/gazimaksudur/) |
| **Facebook** | [facebook.com/gazi.maksudur](https://www.facebook.com/gazi.maksudur) |
| **Resume** | [Google Drive](https://drive.google.com/file/d/1-AoHayQihlWRG17EFwtaeCt7q30zsTQt/view) |

---

## License

This project is private (`"private": true` in `package.json`). All rights reserved unless otherwise stated by the author.
