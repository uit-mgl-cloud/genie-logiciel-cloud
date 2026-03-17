# Specifications — Génie Logiciel pour le Cloud Computing
>
> Plateforme éducative collaborative · M2 Informatique  
> Version 1.0 · Mars 2025

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Goals & Constraints](#2-goals--constraints)
3. [User Roles & Use Cases](#3-user-roles--use-cases)
4. [Architecture](#4-architecture)
5. [Tech Stack](#5-tech-stack)
6. [Content Model](#6-content-model)
7. [Site Structure & Routing](#7-site-structure--routing)
8. [UI & Design System](#8-ui--design-system)
9. [Component Inventory](#9-component-inventory)
10. [Contribution Workflow](#10-contribution-workflow)
11. [CI/CD Pipeline](#11-cicd-pipeline)
12. [Repository Structure](#12-repository-structure)
13. [Frontmatter Schemas](#13-frontmatter-schemas)
14. [Non-Goals (v1)](#14-non-goals-v1)
15. [Open Questions](#15-open-questions)

---

## 1. Project Overview

**GL·Cloud** is an open, collaborative educational platform for the master's-level course *Génie Logiciel pour le Cloud Computing*. It serves structured course content (lectures, TPs, project templates) while enabling students to contribute their own work — case studies, TP solutions, implementations, resources — directly to the repository via GitHub Pull Requests.

The platform is fully static, hosted on GitHub Pages at zero cost, and uses GitHub Discussions (via giscus) for per-page comments and Q&A. There is no backend, no database, and no paid service dependency.

The repository is the single source of truth. Every content change — instructor or student — goes through Git, making the platform itself a live demonstration of the DevOps and cloud engineering practices taught in the course.

---

## 2. Goals & Constraints

### Hard Constraints

| Constraint | Detail |
|---|---|
| **Cost** | $0 ongoing. GitHub Free tier only (Pages, Actions, Discussions). |
| **No server** | Fully static output. No SSR, no API routes, no database. |
| **No external services** | Comments via GitHub Discussions (giscus). No Disqus, no Firebase, no Algolia. |
| **Public repo** | All content publicly readable. GitHub accounts required only for contributions and comments. |

### Goals

- **Structured navigation** — students can orient themselves within the course at a glance.
- **Content-first, minimal UI** — the interface recedes; the content leads.
- **Student contributions as first-class citizens** — the site grows with each cohort. Contributions are not a secondary feature but a core purpose.
- **Git literacy** — the contribution workflow (fork → branch → PR) teaches the same skills covered in the CI/CD module.
- **Build-time validation** — malformed student submissions fail the build and are caught before merge, not after.
- **Zero maintenance overhead** — the platform should run without active maintenance between course editions.

---

## 3. User Roles & Use Cases

### 3.1 Instructor (content owner / moderator)

- Publishes and updates course content (lectures, TPs, project templates) by committing to `main`.
- Reviews and merges student Pull Requests via the GitHub web interface.
- Moderates GitHub Discussions.
- Has write access to the repository. No special tooling required.

**Key use cases:**

- Add a new lecture séance as a Markdown file.
- Update a TP to fix an error — push directly to `main`.
- Review a student contribution PR — read the preview URL posted by the CI bot, approve or request changes.
- Pin an important GitHub Discussion thread.

### 3.2 Student (reader + contributor)

- Reads course content, TPs, and peer contributions.
- Asks questions and participates in discussions via giscus on each page.
- Submits contributions (case studies, solutions, resources, implementations) via Pull Request.

**Key use cases:**

- Read the séance notes before/after class.
- Post a question on a specific lecture page — directly tied to that page's Discussion thread.
- Fork the repo, add a case study Markdown file, open a PR.
- Browse peer contributions before writing their own TP solution.

### 3.3 External visitor (open-source community)

- Reads all content without authentication.
- Can view GitHub Discussions but must authenticate to comment.
- May fork the repo to reuse content for their own course.

---

## 4. Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Repository                     │
│  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐ │
│  │  Markdown   │   │  Astro pages │   │  GitHub      │ │
│  │  content    │──▶│  + layouts   │──▶│  Actions     │ │
│  │  (src/      │   │  + components│   │  (build +    │ │
│  │  content/)  │   │              │   │  deploy)     │ │
│  └─────────────┘   └──────────────┘   └──────┬───────┘ │
│                                               │         │
└───────────────────────────────────────────────┼─────────┘
                                                │
                                                ▼
                                     ┌──────────────────┐
                                     │   GitHub Pages   │
                                     │   (static HTML)  │
                                     └────────┬─────────┘
                                              │
                              ┌───────────────┼───────────────┐
                              ▼               ▼               ▼
                         Instructor       Students        Visitors
                           (read +         (read +        (read
                           write)         comment +       only)
                                         contribute)
```

**Data flows:**

- **Content updates** (instructor): commit to `main` → Actions triggers build → GitHub Pages serves updated site within ~60 seconds.
- **Student contributions**: fork → add Markdown file → PR → Actions builds preview → instructor reviews → merge → auto-deploy.
- **Comments**: giscus widget on each page ↔ GitHub Discussions API. Comments stored in Discussions, rendered client-side. Zero build dependency.

---

## 5. Tech Stack

### Core

| Layer | Technology | Rationale |
|---|---|---|
| **SSG** | [Astro](https://astro.build) v4+ | Zero JS by default, file-based routing, first-class content collections with Zod schemas, MDX support. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) v3 | Utility-first, no runtime, easy to keep consistent with custom design tokens. |
| **Content** | Markdown / MDX | Universal format, version-controlled, editable in the GitHub web editor without cloning. |
| **Type safety** | TypeScript + [Zod](https://zod.dev) | Frontmatter schemas validated at build time via Astro content collections. Invalid frontmatter = build failure. |

### Content & Search

| Tool | Role |
|---|---|
| [Pagefind](https://pagefind.app) | Static full-text search. Runs post-build, indexes HTML, serves a WASM search widget with zero server dependency. |
| [rehype-slug](https://github.com/rehypejs/rehype-slug) + [rehype-autolink-headings](https://github.com/rehypejs/rehype-autolink-headings) | Auto-generates anchor IDs on headings for the right-sidebar outline. |
| [remark-math](https://github.com/remarkjs/remark-math) + [rehype-katex](https://github.com/remarkjs/rehype-katex) | LaTeX math rendering for algorithm complexity notation. |
| [Shiki](https://shiki.style) | Syntax highlighting, built into Astro. Theme: `github-dark-default`. |

### Comments & Collaboration

| Tool | Role |
|---|---|
| [giscus](https://giscus.app) | GitHub Discussions-powered comments. One component, auto-maps page URL to Discussion thread. |
| GitHub Discussions | Backend for all comments. Instructors moderate from the GitHub UI. |
| GitHub Pull Requests | Student contribution mechanism. PRs = contribution reviews. |

### CI/CD & Hosting

| Tool | Role |
|---|---|
| GitHub Actions | Build and deploy on push to `main`. PR preview deployments on open PRs. |
| GitHub Pages | Static hosting. Free, automatic TLS, custom domain support. |

### Development

| Tool | Role |
|---|---|
| Node.js 20+ | Runtime for Astro build toolchain. |
| `npm` | Package manager. `package-lock.json` committed for reproducible builds. |
| GitHub Codespaces | Zero-setup dev environment for contributors. `.devcontainer/devcontainer.json` pre-installs everything. |

---

## 6. Content Model

Content is organized into four **collections**, each defined with a Zod schema in `src/content/config.ts`. Astro validates frontmatter against these schemas at build time.

### 6.1 `cours` — Lecture notes

Authored by instructors. One file per séance.

```typescript
// src/content/config.ts
const cours = defineCollection({
  type: 'content',
  schema: z.object({
    module: z.number().int().min(1).max(12),          // 01–12
    seance: z.number().int().min(1),                  // séance within module
    titre: z.string().max(80),
    description: z.string().max(200),
    duree: z.string(),                                // e.g. "3h"
    niveau: z.enum(['fondamental', 'intermédiaire', 'avancé']),
    date: z.date(),
    outils: z.array(z.string()).optional(),           // e.g. ["Docker", "kubectl"]
    tp_associe: z.string().optional(),                // slug of related TP
    draft: z.boolean().default(false),
  }),
});
```

### 6.2 `tp` — Travaux pratiques

Authored by instructors. One file per TP.

```typescript
const tp = defineCollection({
  type: 'content',
  schema: z.object({
    numero: z.number().int().min(1).max(20),
    titre: z.string().max(100),
    description: z.string().max(300),
    module: z.number().int(),
    difficulte: z.enum(['débutant', 'intermédiaire', 'avancé']),
    duree_estimee: z.string(),                        // e.g. "4h"
    statut: z.enum(['ouvert', 'a-venir', 'termine']),
    outils: z.array(z.string()),
    prerequis: z.array(z.string()).optional(),
    date_ouverture: z.date().optional(),
  }),
});
```

### 6.3 `projets` — Project templates

Authored by instructors. One file per project.

```typescript
const projets = defineCollection({
  type: 'content',
  schema: z.object({
    titre: z.string(),
    description: z.string().max(400),
    modules: z.array(z.number()),
    deadline: z.date().optional(),
    equipe: z.number().int().min(1).max(5).default(2),
    livrable: z.string(),
  }),
});
```

### 6.4 `contributions` — Student work

Authored by students via Pull Request. Four sub-types enforced by a `type` field.

```typescript
const contributions = defineCollection({
  type: 'content',
  schema: z.object({
    type: z.enum(['etude-de-cas', 'solution-tp', 'ressource', 'implementation']),
    titre: z.string().max(120),
    description: z.string().max(300),
    auteur: z.string(),                               // GitHub username
    module: z.number().int().optional(),
    tp_reference: z.string().optional(),              // TP slug if solution-tp
    outils: z.array(z.string()).optional(),
    date: z.date(),
    draft: z.boolean().default(false),
  }),
});
```

---

## 7. Site Structure & Routing

```
/                           → Homepage (module grid + TP list + recent contributions)
/cours                      → All modules overview
/cours/[module]             → Module overview (e.g. /cours/03-conteneurisation)
/cours/[module]/[seance]    → Individual lecture page (e.g. /cours/03-conteneurisation/seance-2)
/tp                         → All TPs listing
/tp/[slug]                  → Individual TP page
/projets                    → Project templates listing
/projets/[slug]             → Individual project page
/contributions              → All contributions, filterable by type
/contributions/[type]/[slug]→ Individual contribution page
/contribuer                 → How-to-contribute guide (static page)
/recherche                  → Pagefind search UI
```

All routes are statically generated at build time. No dynamic routes, no SSR, no API endpoints.

### URL conventions

- Module slugs: `01-intro-cloud`, `02-microservices`, `03-conteneurisation`, etc. Zero-padded number + kebab-case name.
- Séance slugs: `seance-1`, `seance-2`, etc.
- TP slugs: `tp-01-vps-deploy`, `tp-02-docker-compose`, etc.
- Contribution slugs: `<github-username>-<short-title>` (enforced by `_schema.md` in each contributions sub-folder).

---

## 8. UI & Design System

### Visual Direction

**Editorial minimalism with a technical edge.** Dark base, monospaced type, clean grid, generous negative space. The aesthetic of a well-designed CS textbook or engineering handbook — serious, content-first, distinctly not a SaaS product.

### Color Tokens

```css
:root {
  --bg:        #0e0f11;   /* Page background */
  --bg-2:      #16181c;   /* Surface / card background */
  --bg-3:      #1e2026;   /* Raised surface */
  --border:    #2a2d35;   /* Default border */
  --border-2:  #363a45;   /* Emphasized border */
  --text:      #e8e9ec;   /* Primary text */
  --muted:     #7a7f8e;   /* Secondary text */
  --hint:      #4a4f5c;   /* Tertiary / disabled */
  --accent:    #c8f080;   /* Primary accent (lime green) */
  --accent-2:  #80d4f0;   /* Secondary accent (cyan blue) */
}
```

### Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / headings | Fraunces (serif, Google Fonts) | 300 (light) / 600 | 36–52px |
| UI labels, body, code | DM Mono (monospace, Google Fonts) | 400 / 500 | 11–14px |
| Inline code | DM Mono | 400 | 12px |

Fraunces italic is used for emphasis within headings (e.g. "Génie Logiciel pour le *Cloud*").

### Layout Patterns

**Homepage**: Full-width sections separated by horizontal rules. Module grid (3 columns), TP table (full-width), contributions grid (2 columns).

**Lecture page**: Three-column layout.

- Left (220px): module/séance navigation tree, sticky.
- Center (fluid, max 680px): content area.
- Right (200px): auto-generated outline from `##` headings, sticky. Includes a linked TP card when a `tp_associe` is set.

**TP page**: Two-column layout.

- Main: énoncé content.
- Sidebar: metadata (module, difficulty, tools, status), linked séance.

**Contribution page**: Single-column with an author header (avatar initials, GitHub username, contribution type badge, date).

### Spacing Scale

Tailwind's default spacing scale (4px base unit). Key values: `p-4` (16px) for content padding, `gap-5` (20px) for grid gaps, `py-8` (32px) for section padding.

### Component States

- **Hover**: background shifts to `--bg-2`, transition 150ms.
- **Active sidebar item**: right border `2px solid var(--accent)`, background `--bg-2`.
- **Active outline item**: left border `1px solid var(--accent)`, text `--accent`.
- **Focus**: `outline: 2px solid var(--accent)` with 2px offset.

---

## 9. Component Inventory

### Navigation

| Component | File | Description |
|---|---|---|
| `Navbar` | `src/components/nav/Navbar.astro` | Top navigation bar. Logo, nav links, "Contribuer" CTA button. Sticky with `backdrop-filter: blur`. |
| `Breadcrumb` | `src/components/nav/Breadcrumb.astro` | Contextual breadcrumb on lecture and TP pages. Reads from Astro's route params. |
| `SidebarLeft` | `src/components/nav/SidebarLeft.astro` | Module/séance tree navigation. Marks active item from current URL. Grouped by module. |

### Content

| Component | File | Description |
|---|---|---|
| `OutlineRight` | `src/components/content/OutlineRight.astro` | Auto-generates outline from `##` and `###` headings via rehype. Highlights active heading on scroll via IntersectionObserver. |
| `CodeBlock` | `src/components/content/CodeBlock.astro` | Syntax-highlighted code block with language badge and copy-to-clipboard button. Wraps Shiki output. |
| `Callout` | `src/components/content/Callout.astro` | Admonition block. Variants: `note` (accent), `warning` (amber), `tip` (cyan). Used as `<Callout type="note">` in MDX. |
| `GiscusComments` | `src/components/content/GiscusComments.astro` | giscus embed. Reads `Astro.url.pathname` to map to Discussion thread. Respects `data-theme` based on `prefers-color-scheme`. |
| `ModuleCard` | `src/components/content/ModuleCard.astro` | Homepage module card. Props: `numero`, `titre`, `description`, `tags[]`, `statut`, `seances`. |

### TP

| Component | File | Description |
|---|---|---|
| `TpRow` | `src/components/tp/TpRow.astro` | Single row in the TP listing table. Shows index, title, module reference, status badge. |
| `TpStatusBadge` | `src/components/tp/TpStatusBadge.astro` | Badge with three states: `ouvert` (accent green), `a-venir` (muted), `termine` (gray). |

### Contributions

| Component | File | Description |
|---|---|---|
| `ContribCard` | `src/components/contributions/ContribCard.astro` | Preview card for contributions listing. Author avatar (initials), type badge, title, module reference. |
| `AuthorTag` | `src/components/contributions/AuthorTag.astro` | Author avatar circle (initials from GitHub username) + username display. |

---

## 10. Contribution Workflow

### Student steps

```
1. Fork the repository on GitHub
2. Create a branch: git checkout -b contrib/etude-cas-kubernetes-prod
3. Add a Markdown file in the correct sub-folder under src/content/contributions/
4. Fill in the required frontmatter (see _schema.md in each folder)
5. Open a Pull Request against main
6. The CI bot posts a preview URL as a PR comment
7. Wait for instructor review
8. Address feedback if requested
9. Instructor merges → site updates automatically
```

### Frontmatter enforcement

Astro's content collections validate all frontmatter via Zod schemas at build time. A PR with missing or invalid frontmatter will fail the `astro build` step in the CI pipeline, and the PR check will fail. This prevents bad submissions from ever reaching `main`.

### Contribution guidelines (summary)

Full guide lives at `/contribuer` and `CONTRIBUTING.md`.

- One contribution per PR.
- File must be placed in the correct sub-folder (`etudes-de-cas/`, `solutions-tp/`, `ressources/`, `implementations/`).
- Filename format: `<github-username>-<short-kebab-title>.md` (e.g. `benali-docker-multi-stage.md`).
- Content must be in French or English (French preferred).
- No copyrighted material, no credentials, no personal data.
- Code snippets must be in fenced code blocks with language specified.
- Images go in `public/contributions/<github-username>/` and are referenced with relative paths.

### Instructor review checklist

The `PULL_REQUEST_TEMPLATE.md` presents contributors with a self-checklist. Instructors verify:

- [ ] Frontmatter is valid and complete.
- [ ] Content is technically accurate.
- [ ] No credentials, API keys, or personal data.
- [ ] Correct sub-folder and filename convention.
- [ ] Preview renders correctly (check the preview URL).

---

## 11. CI/CD Pipeline

### `deploy.yml` — Production deploy

Triggers on: `push` to `main`.

```yaml
name: Deploy
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build          # astro build + pagefind
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/
  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

**Total deploy time**: ~45–90 seconds for a typical course site.

### `preview.yml` — PR preview

Triggers on: `pull_request` events (`opened`, `synchronize`, `reopened`).

- Builds the site with the PR branch's content.
- Deploys to a `pr-<number>` environment on GitHub Pages.
- Posts the preview URL as a comment on the PR.
- Cleans up the environment on PR close.

This allows instructors to review student contributions rendered live before merging.

### Build script

```json
// package.json
"scripts": {
  "dev": "astro dev",
  "build": "astro build && npx pagefind --site dist",
  "preview": "astro preview",
  "check": "astro check"
}
```

Pagefind runs post-build to index the static HTML output. The search index is written to `dist/pagefind/` and served alongside the site.

---

## 12. Repository Structure

```
gl-cloud-computing/
│
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml
│   │   └── preview.yml
│   ├── ISSUE_TEMPLATE/
│   │   └── contribution.md
│   └── PULL_REQUEST_TEMPLATE.md
│
├── .devcontainer/
│   └── devcontainer.json             # Codespaces: Node 20 + extensions
│
├── src/
│   ├── content/
│   │   ├── config.ts                 # All Zod schemas
│   │   ├── cours/
│   │   │   ├── 01-intro-cloud/
│   │   │   │   ├── seance-1.md
│   │   │   │   ├── seance-2.md
│   │   │   │   ├── seance-3.md
│   │   │   │   └── seance-4-tp.md
│   │   │   ├── 02-microservices/
│   │   │   ├── 03-conteneurisation/
│   │   │   ├── 04-iac/
│   │   │   ├── 05-cicd/
│   │   │   ├── 06-sre/
│   │   │   ├── 07-securite-cloud/
│   │   │   └── 08-projet-final/
│   │   ├── tp/
│   │   │   ├── tp-01-vps-deploy.md
│   │   │   ├── tp-02-docker-compose.md
│   │   │   ├── tp-03-kubernetes.md
│   │   │   ├── tp-04-terraform-aws.md
│   │   │   ├── tp-05-github-actions.md
│   │   │   ├── tp-06-helm-charts.md
│   │   │   ├── tp-07-observabilite.md
│   │   │   ├── tp-08-service-mesh.md
│   │   │   ├── tp-09-serverless.md
│   │   │   ├── tp-10-securite.md
│   │   │   ├── tp-11-multicloud.md
│   │   │   └── tp-12-projet-integr.md
│   │   ├── projets/
│   │   │   ├── projet-microservices.md
│   │   │   ├── projet-iac-aws.md
│   │   │   └── projet-observabilite.md
│   │   └── contributions/
│   │       ├── etudes-de-cas/
│   │       │   └── _schema.md        # Documents expected frontmatter + naming rules
│   │       ├── solutions-tp/
│   │       │   └── _schema.md
│   │       ├── ressources/
│   │       │   └── _schema.md
│   │       └── implementations/
│   │           └── _schema.md
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── cours/
│   │   │   ├── index.astro
│   │   │   └── [module]/
│   │   │       ├── index.astro
│   │   │       └── [seance].astro
│   │   ├── tp/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── projets/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── contributions/
│   │   │   ├── index.astro
│   │   │   ├── etudes-de-cas/[slug].astro
│   │   │   ├── solutions-tp/[slug].astro
│   │   │   ├── ressources/[slug].astro
│   │   │   └── implementations/[slug].astro
│   │   ├── contribuer.astro
│   │   └── recherche.astro
│   │
│   ├── layouts/
│   │   ├── Base.astro
│   │   ├── LecturePage.astro
│   │   ├── TpPage.astro
│   │   ├── ContributionPage.astro
│   │   └── IndexPage.astro
│   │
│   ├── components/
│   │   ├── nav/
│   │   │   ├── Navbar.astro
│   │   │   ├── Breadcrumb.astro
│   │   │   └── SidebarLeft.astro
│   │   ├── content/
│   │   │   ├── OutlineRight.astro
│   │   │   ├── CodeBlock.astro
│   │   │   ├── Callout.astro
│   │   │   └── GiscusComments.astro
│   │   ├── tp/
│   │   │   ├── TpRow.astro
│   │   │   └── TpStatusBadge.astro
│   │   └── contributions/
│   │       ├── ContribCard.astro
│   │       └── AuthorTag.astro
│   │       └── ModuleCard.astro
│   │
│   └── styles/
│       ├── global.css
│       ├── prose.css
│       └── syntax.css
│
├── public/
│   ├── fonts/
│   ├── og/
│   └── contributions/               # Student-uploaded images (one folder per username)
│
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── package-lock.json
│
├── CONTRIBUTING.md
├── CONTENT_GUIDE.md
├── specifications.md                 # This file
└── README.md
```

---

## 13. Frontmatter Schemas

### Cours — example

```markdown
---
module: 1
seance: 1
titre: "Introduction au Cloud Computing"
description: "Modèles de service, providers, économie du cloud. IaaS, PaaS, SaaS."
duree: "3h"
niveau: "fondamental"
date: 2025-02-10
outils: []
tp_associe: "tp-01-vps-deploy"
draft: false
---
```

### TP — example

```markdown
---
numero: 1
titre: "Déploiement d'une app Node.js sur un VPS"
description: "Premier contact avec l'IaaS. Provisionner un serveur, configurer nginx, déployer une app."
module: 1
difficulte: "débutant"
duree_estimee: "4h"
statut: "ouvert"
outils: ["ssh", "nginx", "pm2", "ufw"]
prerequis: ["Bases Linux", "Node.js notions"]
date_ouverture: 2025-02-12
---
```

### Contribution — example

```markdown
---
type: "etude-de-cas"
titre: "Migration d'un monolithe Laravel vers microservices — retour d'expérience"
description: "Analyse des défis rencontrés lors de la décomposition d'une application Laravel en 5 microservices déployés sur Kubernetes."
auteur: "a.mansouri"
module: 2
outils: ["Laravel", "Docker", "Kubernetes", "RabbitMQ"]
date: 2025-03-08
draft: false
---
```

---

## 14. Non-Goals (v1)

These features are explicitly out of scope for the initial release and should not be built or planned for:

- **Authentication / user accounts** — no login, no profiles, no roles managed by the platform itself. GitHub is the identity layer.
- **Progress tracking** — no "mark as read", no completion percentage, no student dashboards.
- **Interactive components** — no live terminals, no embedded playgrounds, no JS-heavy widgets. Pure static content only.
- **Grading or submission management** — TPs are submitted via GitHub PR, not through the site.
- **Internationalization** — French-first, English tolerated in contributions. No i18n framework.
- **Dark/light mode toggle** — dark mode only in v1. System preference respected via `prefers-color-scheme` for giscus only.
- **Analytics** — no tracking scripts, no page view counters, no third-party analytics.
- **Email notifications** — GitHub's native notification system handles this.
- **CMS interface** — instructors edit Markdown directly in the repository. No Decap CMS, no headless CMS.

---

## 15. Open Questions

These questions should be resolved before or during development:

| # | Question | Owner | Priority |
|---|---|---|---|
| 1 | What is the final GitHub organization/repo name? Determines the Pages URL and giscus config. | Instructor | High |
| 2 | Custom domain? (e.g. `cloud.dept.university.ma`). Requires DNS access and a `CNAME` file. | Instructor | Medium |
| 3 | Should the `main` branch be protected (require PR review for instructor pushes too)? Adds friction but enforces review for all changes. | Instructor | Medium |
| 4 | How many modules and TPs for the first edition? Impacts initial content scaffolding effort. | Instructor | High |
| 5 | What GitHub Discussions category should giscus use? Needs to be created manually in the repo settings before first deploy. | Instructor | High |
| 6 | Should student contributions require a co-authored-by instructor tag, or is PR review + merge sufficient attribution? | Instructor | Low |
| 7 | Are images in contributions allowed? If yes, what is the size limit policy? | Instructor | Medium |
| 8 | Should the site be bilingual (FR/EN) from the start, or French-only with English tolerated? | Instructor | Low |
