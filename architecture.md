```
gl-cloud-computing/
│
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml                    # Build + deploy to GitHub Pages on push to main
│   │   └── preview.yml                   # Deploy PR preview on pull_request
│   ├── ISSUE_TEMPLATE/
│   │   └── contribution.md               # Template for contribution PRs
│   └── PULL_REQUEST_TEMPLATE.md          # Checklist for student PRs
│
├── src/
│   ├── content/
│   │   ├── config.ts                     # Zod schemas for all content types
│   │   │
│   │   ├── cours/                        # Lecture content (instructor-owned)
│   │   │   ├── 01-intro-cloud/
│   │   │   │   ├── seance-1.md           # frontmatter: module, title, duree, niveau, date
│   │   │   │   ├── seance-2.md
│   │   │   │   ├── seance-3.md
│   │   │   │   └── seance-4-tp.md        # TP séances reference their tp/ counterpart
│   │   │   ├── 02-microservices/
│   │   │   │   ├── seance-1.md
│   │   │   │   └── seance-2.md
│   │   │   ├── 03-conteneurisation/
│   │   │   ├── 04-iac/
│   │   │   ├── 05-cicd/
│   │   │   ├── 06-sre/
│   │   │   ├── 07-securite-cloud/
│   │   │   └── 08-projet-final/
│   │   │
│   │   ├── tp/                           # TP definitions (instructor-owned)
│   │   │   ├── tp-01-vps-deploy.md       # frontmatter: module, titre, difficulte, statut, outils[]
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
│   │   │
│   │   ├── projets/                      # Project templates (instructor-owned)
│   │   │   ├── projet-microservices.md   # frontmatter: titre, description, modules[], deadline
│   │   │   ├── projet-iac-aws.md
│   │   │   └── projet-observabilite.md
│   │   │
│   │   └── contributions/               # Student work (student-contributed via PR)
│   │       ├── etudes-de-cas/
│   │       │   ├── _schema.md            # Documents expected frontmatter for this type
│   │       │   ├── migration-laravel-microservices.md
│   │       │   ├── kubernetes-prod-retour.md
│   │       │   └── ...
│   │       ├── solutions-tp/
│   │       │   ├── _schema.md
│   │       │   ├── tp-02-solution-benali.md
│   │       │   └── ...
│   │       ├── ressources/
│   │       │   ├── _schema.md
│   │       │   ├── cheatsheet-terraform.md
│   │       │   └── ...
│   │       └── implementations/
│   │           ├── _schema.md
│   │           ├── grafana-k3s-dashboard.md
│   │           └── ...
│   │
│   ├── pages/
│   │   ├── index.astro                   # Homepage — module grid + TP list + recent contributions
│   │   ├── cours/
│   │   │   ├── index.astro               # All modules overview
│   │   │   └── [module]/
│   │   │       ├── index.astro           # Module overview page
│   │   │       └── [seance].astro        # Individual lecture page
│   │   ├── tp/
│   │   │   ├── index.astro               # All TPs listing
│   │   │   └── [slug].astro              # Individual TP page
│   │   ├── projets/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── contributions/
│   │   │   ├── index.astro               # All contributions, filterable by type
│   │   │   ├── etudes-de-cas/
│   │   │   │   └── [slug].astro
│   │   │   ├── solutions-tp/
│   │   │   │   └── [slug].astro
│   │   │   ├── ressources/
│   │   │   │   └── [slug].astro
│   │   │   └── implementations/
│   │   │       └── [slug].astro
│   │   └── contribuer.astro              # How-to-contribute guide
│   │
│   ├── layouts/
│   │   ├── Base.astro                    # HTML shell, fonts, meta tags
│   │   ├── LecturePage.astro             # 3-col: left nav + content + outline
│   │   ├── TpPage.astro                  # TP layout with enoncé + resources
│   │   ├── ContributionPage.astro        # Contribution layout with author header
│   │   └── IndexPage.astro              # Wide layout for listing pages
│   │
│   ├── components/
│   │   ├── nav/
│   │   │   ├── Navbar.astro
│   │   │   ├── Breadcrumb.astro
│   │   │   └── SidebarLeft.astro         # Module/séance navigation tree
│   │   ├── content/
│   │   │   ├── OutlineRight.astro        # Auto-generated from headings via rehype
│   │   │   ├── CodeBlock.astro           # Syntax-highlighted code with copy button
│   │   │   ├── Callout.astro             # Note / Warning / Tip admonition blocks
│   │   │   ├── GiscusComments.astro      # giscus embed, reads page URL + theme
│   │   │   └── ModuleCard.astro          # Homepage module card
│   │   ├── tp/
│   │   │   ├── TpRow.astro               # TP list row with status badge
│   │   │   └── TpStatusBadge.astro       # Ouvert / À venir / Terminé
│   │   └── contributions/
│   │       ├── ContribCard.astro         # Contribution preview card
│   │       └── AuthorTag.astro           # Avatar initials + GitHub username
│   │
│   └── styles/
│       ├── global.css                    # CSS variables, resets, base typography
│       ├── prose.css                     # Markdown-rendered content styles
│       └── syntax.css                   # Code highlighting theme (dark)
│
├── public/
│   ├── fonts/                            # Self-hosted fonts if needed
│   └── og/                              # Open Graph images per module
│
├── astro.config.mjs                      # Astro config: Tailwind, MDX, sitemap
├── tailwind.config.mjs                   # Tailwind theme: colors, fonts, spacing
├── tsconfig.json                         # TypeScript config
├── package.json
│
├── CONTRIBUTING.md                       # Full student contribution guide
├── CONTENT_GUIDE.md                      # Frontmatter reference + writing conventions
└── README.md                             # Course overview + quick links
```

---

**The three files that do the most work:**

`src/content/config.ts` — Zod schemas enforce frontmatter on every content type. A TP with a missing `statut` field or a contribution without an `auteur` field will fail `astro build` and block the PR merge automatically.

`src/components/content/GiscusComments.astro` — one component, embedded in `LecturePage.astro` and `ContributionPage.astro`, auto-maps the current page URL to a GitHub Discussion thread. Students need zero config to get comments on their contribution page.

`.github/workflows/deploy.yml` — runs `astro build` on every push to `main` and deploys `dist/` to the `gh-pages` branch. The preview workflow does the same on every PR and posts the preview URL as a comment, so instructors can review a student contribution rendered live before merging.
