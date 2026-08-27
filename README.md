# St Joseph's Church (Bukit Timah)

![version 1.3.0](https://img.shields.io/badge/version-1.3.0-33100f)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![License Private](https://img.shields.io/badge/license-Private-lightgrey)

> **Static parish site for St Joseph's Church (Bukit Timah), Singapore** — Singapore's second-oldest Catholic parish since 1846, the last remaining Catholic church cemetery in the country, under the patronage of St Joseph the Worker (feast 1 May) at 620 Upper Bukit Timah Road. Ported from [stjoseph-bt.org.sg](https://stjoseph-bt.org.sg/).

A single-file React SPA — warm editorial design (Fraunces + Source Sans 3) on the bespoke `shrine-*` token palette, `HashRouter` for static-host deep-links, and file-backed content (`src/data/*`) with no backend or CMS. Ships as one `dist/index.html` to GitHub Pages or S3. The hill still gathers plantation-country families and city neighbours for Mandarin and English Mass.

## Key Features

Every row below is implemented — no placeholders. Pages are named exports from `src/pages/` and driven by `src/data/nav.ts` + `content.ts` + `site.ts`.

|  | Feature | What it does |
|---|---|---|
| 🏔️ | **Home — a church on the hill since 1846** | Full-bleed Wikimedia hero with `hero-ken-burns`, `site.feast`/`site.address` facts (Mass 7.30/9.30/11.30/5.30, Cashew MRT, 1 May), welcome (`site.tagline` + `site.vision`), 3-place grounds preview (`grounds` → Main Church / Chapel / Rosary Garden), and 4 featured events from `upcomingEvents`. |
| ⛪ | **About — the household** | Parish mission (3 pillars: Faith formation / Community-building / Outreach), clergy (`priests` — Fr Jovita, Fr Leo, Bro Dominic with phones), and the full Parish Pastoral Council (`ppcMembers` — 16: priests, religious, chairman Gabriel Lok, advisor, secretaries, Estate/Faith Formation/Mandarin/NCC/Safety/Youth + 3 appointed members). |
| 📜 | **History — 1845–2017** | 8-entry `lifeTimeline` via `Timeline` — attap chapel (1845 Kranji) → 1846 parish → 1853 Palladian church on six Doric columns → 1861 statue & pilgrimage → 1910s rubber & return → 1964 Fr Teng rebuild (cattle, food fair, Olçomendy blessing) → 1991–97 Stations/columbarium/hall → 2012 consecration & 2017 Rosary Garden (Mauduit headstone). |
| 🙏 | **Worship — Mass, mercy & Find Us** | Anchor-linked sections with `scroll-mt-28` + `Layout` hash restore: `#mass` (Mass schedule from `site.mass`: weekday chapel 6.30 a.m./p.m., Sat sunset, 4 Sunday Masses + 2nd collection), `#confession` (confession 15 min before weekend Masses, adoration Tue 8 p.m., + 6 `devotions`: St Joseph First Wed / First Fri Holy Hour / Vocations / Children's Mass / Divine Mercy / Adoration), `#visit` (address, gates, MRT/buses, `mapsEmbedSrc` iframe). Aliases: `/mass-times`, `/hours-location`, `/visit` → `/worship`. |
| 🧭 | **Ministries — 6 with jump nav** | Pill-bordered jump nav (`/ministries#<id>`) + alternating `shrine-cream`/`shrine-parchment` sections from `ministries` (6 ids): Liturgical (servers/choirs/hospitality), Faith Formation (CGS 3–12), Pastoral Care (SSVP/Legion/PIETA), Family Life (seniors + NCC), Youth (Alpha Youth 13–18, SAHOP), Mandarin & Dialect (7.30 a.m. Mass, Teochew/Legion). Canonical `/ministries`, alias `/ministry`. |
| 📰 | **News & Events** | 6 `upcomingEvents` (`NewsEvents` page, compact `PageHero`): MPSC Fair 22–23 Aug, Catholic Education Sunday, Youth "Encounter" Sundays, Boys' Town 29–30 Aug, First Wed St Joseph Mass, First Fri Holy Hour — categories `Parish`/`Devotion`/`Formation`/`Archdiocese` with optional `href`. Canonical `/news-events`, alias `/news-and-events`. |
| 🤝 | **Serve — take a place** | 4 `serveRoles` (Liturgical ministers / Catechists & facilitators / Pastoral care / Hospitality & grounds) + SCC/offertory callouts (offer offertory gifts ≥1 week ahead, MPSC Fair). No section ids. Canonical `/serve`, alias `/volunteer`. |
| 💛 | **Give · FAQ · NotFound** | **Give** — 8 `givingOptions` (PayNow UEN `T08CC4043C`, weekend collections + 4th-Sun CMOF, foyer/St Mary's cash boxes, cheque to `St. Joseph's Church (Bukit Timah)`, SSVP Friends in Need, GIFT Archdiocese, Boys' Town Brother Emmanuel, Mass offerings). Alias `/donate`. **FAQ** — 6 SG questions (Mass times, confession, MRT/buses + gates, 1 May feast fair, baptism/marriage/Mass intention, cemetery/columbarium) via `Accordion` (single-open) at `/faq`. **NotFound** — `*` catch-all (404, "This path does not lead to the church"). |

## Architecture

### Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| UI | React | `19.2.8` | Functional components + hooks only |
| Routing | React Router | `7.18.2` | `HashRouter` — 17 `Route` entries (16 content paths + `*` → `NotFound`), 5 alias groups / 7 alias paths, hash anchors `#mass`/`#confession`/`#visit` + 6 ministry ids (`HashRouter` + `Layout` outlet) |
| Build | Vite | `7.3.6` | HMR dev, single-file prod build (+ `@vitejs/plugin-react 5.2.0`) |
| Styling | Tailwind CSS + `@tailwindcss/vite` | `4.3.3` / `4.1.17` | CSS-first `@theme` tokens in `src/index.css` |
| Language | TypeScript | `5.9.3` | `strict` + `noUnusedLocals/Params`, `bundler` mode, `@` alias |
| Icons | lucide-react | `1.34.0` | Header/footer + page iconography |
| Utils | clsx + tailwind-merge | `2.1.1` / `3.6.0` | `cn()` class merging — always merge via `cn()` |
| Bundling | vite-plugin-singlefile | `2.3.3` | Inlines JS+CSS into `dist/index.html` (`public/images/` copied to `dist/images/`) |
| Testing | Vitest + Testing Library + jsdom | `3.2.6` / `16.2.0` / `26.1.0` | `vitest run` — **currently 0 tests** (pending rewrite; `src/test/setup.ts` removed, no `*.test.*` under `src/`) |
| E2E | Playwright | `1.55.1` | `chromium`, `webServer` → `pnpm exec vite --port 5173 --host 127.0.0.1 --strictPort`, `e2e/` — **currently STALE: 20 tests assert old Rother content and will fail until rewritten** (smoke + navigation + what-to-see + give-faq) |
| Linting | ESLint flat + typescript-eslint + react-hooks | `9.39.5` / `8.28.0` / `5.2.0` | `eslint . --max-warnings 0`, `eslint.config.js` (ignores `dist`, `skills`, `src.orig`) |
| Fonts | Google Fonts | — | `Fraunces` (display) + `Source Sans 3` (body) via `index.html` |

Versions pinned exact in `package.json` and match `pnpm-lock.yaml` (`--frozen-lockfile` in CI).

**Routing table — `src/App.tsx` (authoritative):**

| Path | Component | Alias / Canonical |
|---|---|---|
| `/` | `Home` | canonical |
| `/about` | `About` | canonical |
| `/history` | `History` | canonical |
| `/worship` | `Worship` | canonical for `/mass-times`, `/hours-location`, `/visit` |
| `/mass-times` | `Worship` | alias → `/worship` |
| `/hours-location` | `Worship` | alias → `/worship` |
| `/visit` | `Worship` | alias → `/worship` |
| `/ministries` | `Ministries` | canonical for `/ministry` |
| `/ministry` | `Ministries` | alias → `/ministries` |
| `/news-events` | `NewsEvents` | canonical for `/news-and-events` |
| `/news-and-events` | `NewsEvents` | alias → `/news-events` |
| `/serve` | `Serve` | canonical for `/volunteer` |
| `/volunteer` | `Serve` | alias → `/serve` |
| `/give` | `Give` | canonical for `/donate` |
| `/donate` | `Give` | alias → `/give` |
| `/faq` | `FAQ` | canonical |
| `*` | `NotFound` | catch-all |

Hash anchors: `/worship#mass`, `/worship#confession`, `/worship#visit` (Worship, via `primaryNav` children + footer) and `/ministries#liturgical` / `#faith-formation` / `#pastoral-care` / `#family-life` / `#youth` / `#mandarin` (Ministries jump nav — `ministries.map → /ministries#<id>`). Ministries and Worship use `<Link to="/…#id">` to preserve `HashRouter` route; plain `<a href="#id">` would replace the hash and route to `NotFound`.

### System Diagram

```mermaid
flowchart TB
  B[Browser] --> R[HashRouter — src/App.tsx — 17 entries]
  R --> L[Layout — scroll & hash restore — double-hash aware + 80ms]
  L --> H[Header — sticky + useScrolled(16) + primaryNav dropdown + mobile drawer]
  L --> P[Pages — 10: Home / About / History / Worship / Ministries / NewsEvents / Serve / Give / FAQ / NotFound]
  L --> F[Footer — 4-col + divider-weave-thin + SocialIcons + site.ts]
  P --> D[src/data — nav.ts + content.ts (priests/ppcMembers/grounds/ministries/faqs/upcomingEvents/givingOptions/serveRoles/devotions/images 11) + site.ts]
  H & F & P --> S[Tailwind @theme — src/index.css — shrine-* 24 colors + 2 shadows]
  R --> V[Vite 7.3.6 + viteSingleFile 2.3.3]
  V --> O[dist/index.html + dist/images/ — single file + public assets]
  O --> G[GitHub Pages / S3]
```

`HashRouter` is intentional — static hosts have no SPA fallback, so `/#/worship#mass` works without server rewrites.

## File Hierarchy

```
📂 st-joseph-bt/
├── 📄 index.html            # lang, viewport, meta description (St Joseph's 620 Upper Bukit Timah), CSP (allows upload.wikimedia.org + images.pexels.com), Google Fonts (Fraunces + Source Sans 3), #root
├── 📄 eslint.config.js      # flat config (typescript-eslint 8 + react-hooks 5 + react-refresh) — ignores [dist, node_modules, coverage, playwright-report, test-results, skills, src.orig]
├── 📄 playwright.config.ts  # Playwright 1.55 (chromium, webServer → pnpm exec vite :5173, expect timeout 15s)
├── 📄 vite.config.ts        # plugins [react, tailwindcss, viteSingleFile] + alias @→src (no test/server.watch block — minimal)
├── 📄 tsconfig.json         # ES2020 / ESNext / bundler / strict + noUnusedLocals/noUnusedParameters/noFallthroughCasesInSwitch/isolatedModules/noEmit + include [src, vite.config.ts] + types [node] + paths @/*
├── 📄 package.json          # scripts: dev / build / preview / typecheck / lint / test / test:e2e / test:watch + pnpm@11.0.0 + engines node>=20 (all deps pinned exact)
├── 📄 pnpm-lock.yaml        # committed — deterministic installs via `pnpm install --frozen-lockfile` (CI)
├── 📂 public/
│   └── 📂 images/           # 8 files: hero-church.jpg, chapel-interior.jpg, sanctuary.jpg, rosary-garden.jpg, stained-glass.jpg, parish-hall.jpg, cemetery.jpg, feast.jpg (Vite publicDir → dist/images/ — upload alongside dist/index.html); CDN hero (upload.wikimedia.org) + naveCdn/courtyardCdn (images.pexels.com) with SafeImage local fallback
├── 📂 src/
│   ├── 📄 App.tsx           # HashRouter + 17 Route entries (16 content paths + * → NotFound; 5 alias groups / 7 alias paths; hash anchors #mass/#confession/#visit + 6 ministry ids)
│   ├── 📄 main.tsx          # StrictMode + createRoot
│   ├── 📄 index.css         # @theme shrine-* tokens (24 colors + 2 shadows) + @layer base/utilities (text-balance, bg-adobe-texture, bg-grain, divider-weave, divider-weave-thin, gold-rule, gold-rule-left, mask-fade-b, hero-ken-burns, reveal/reveal-visible, skip-link)
│   ├── 📂 components/
│   │   ├── 📄 Layout.tsx    # Outlet + scroll/hash restoration (double-hash aware, split on #, strip /, setTimeout 80ms, fallback window.scrollTo) + SkipLink
│   │   ├── 📄 Header.tsx    # fixed maroon-950 bar, useScrolled(16), hover+click dropdown (primaryNav), mobile drawer
│   │   ├── 📄 Footer.tsx    # 4-col + divider-weave-thin + SocialIcons + site.ts address
│   │   ├── 📄 PageHero.tsx  # maroon hero primitive (compact? + bg-grain + gradients)
│   │   ├── 📄 Emblem.tsx    # inline SVG emblem (crook + wheat)
│   │   ├── 📄 SafeImage.tsx # CDN→local fallback (fallback default /images/hero-church.jpg, lazy, onError dataset.fallback guard)
│   │   ├── 📄 SkipLink.tsx  # skip-to-main-content (preventDefault + focus #main-content; never rewrites hash)
│   │   ├── 📄 SocialIcons.tsx # hand-drawn brand glyphs (lucide has no brand icons)
│   │   ├── 📄 Timeline.tsx  # left rail (border-l) + Reveal — renders lifeTimeline (1845–2017)
│   │   └── 📂 ui/           # Button (to/href/button + icon; variants primary|secondary|ghost|outline-light), Container, SectionHeading, Accordion (single-open), Reveal
│   ├── 📂 hooks/
│   │   └── 📄 useScrolled.ts # scrollY > threshold → scrolled boolean (default 12; Header passes 16)
│   ├── 📂 pages/            # Home, About, History, Worship, Ministries, NewsEvents, Serve, Give, FAQ, NotFound (10 files, all named exports)
│   ├── 📂 data/
│   │   ├── 📄 nav.ts        # primaryNav (6 top-level: Home / About{The Parish, Our History, FAQ} / Worship{Mass Times, Confession & Adoration, Find Us} / Ministries{Liturgical, Faith Formation, Pastoral Care} / News & Events / Serve) + footerNav 10 links
│   │   ├── 📄 content.ts    # 8 interfaces (TimelineEntry, GroundsPlace, Ministry, FaqItem, EventItem, GivingOption, Priest, PpcMember) + images 11 (hero Wikimedia + heroFallback + chapel/sanctuary/garden/glass/hall/cemetery/feast + naveCdn/courtyardCdn) + priests 3 + ppcMembers 16 + lifeTimeline 8 (1845–2017) + grounds 3 (main-church/chapel/rosary-garden) + ministries 6 + faqs 6 (SG) + upcomingEvents 6 (Parish/Devotion/Formation/Archdiocese) + givingOptions 8 + serveRoles 4 + devotions 6
│   │   └── 📄 site.ts       # canonical single source: name/shortName/chineseName ("圣若瑟堂")/tagline/vision, address 620 Upper Bukit Timah Road 678116, hours (gates/mainChurch/chapel/bookshop/adorationRoom), mass (weekdayMorning/weekdayEvening/saturday/sunday×4/confession/adoration/secondCollection 4th Sun CMOF), contact (parishPriest/assistantPriest/office), transport (Cashew MRT + 9 buses), feast 1 May, UEN T08CC4043C, chequePayee, facebook, archdiocese, mapsUrl/mapsEmbedSrc (Google Maps iframe)
│   └── 📂 utils/
│       └── 📄 cn.ts         # twMerge(clsx) — always merge via cn()
│   └── (no src/test/ — tests pending rewrite; no src/**/*.test.* — pnpm test currently finds 0 tests)
├── 📂 e2e/                  # ⚠️ STALE — 20 tests assert old Rother/Shinse content (will fail until rewritten)
│   ├── 📄 smoke.spec.ts     # 7 smoke (asserts "Shepherd Who Stayed", /about-blessed-stanley-rother, #pilgrim-center etc. — stale)
│   ├── 📄 navigation.spec.ts# 5 desktop hover + keyboard + skip + footer + Give (stale)
│   ├── 📄 what-to-see.spec.ts# 4 sections + imageAlt + fallback + jump nav (stale — WhatToSee removed)
│   ├── 📄 give-faq.spec.ts  # 4 Give 8 options + FAQ accordion + Pilgrimage mailto (partially stale)
│   └── 📄 helpers.ts        # gotoHash helper
├── 📄 .github/workflows/ci.yml # CI: lint → typecheck → test → test:e2e (chromium) → build (Node 24, pnpm 11)
├── 📂 docs/
│   ├── 📄 prompts.md        # Intent lineage
│   └── 📄 fresh-clone-audit-2026-08-27.md  # Prior review (pre-port, Rother-era — superseded by audit below)
├── 📂 src.orig/             # Pre-port snapshot (Rother shrine, 16 routes — reference only, ignored by lint/tsc)
├── 📄 CLAUDE.md             # Deep conventions (authoritative — update alongside README)
└── 📄 AGENTS.md             # Compact agent cheat sheet
```

Current audit (port): 17 route entries / 16 content paths / 5 alias groups (7 paths) / 10 pages vs orig 16 / 15 / 5 / 6. `whatToSee` → `grounds` (3) + `ministries` (6) split.

## Quick Start

**Requirements:** Node.js ≥20 (Vite 7), `pnpm` preferred (`npm` works).

```bash
# 1 — Clone
git clone <repo-url> st-joseph-bt && cd st-joseph-bt

# 2 — Install (deterministic)
pnpm install --frozen-lockfile
# npm is not a drop-in for these exact pins: typescript-eslint 8.28.0's peer
# range predates TypeScript 5.9, so use `npm ci --legacy-peer-deps` if you
# must use npm (pnpm is the supported path).

# 3 — Run (HMR)
pnpm dev
# → Local: http://localhost:5173

# 4 — Production build (single file + public assets)
pnpm build
# → dist/index.html  JS+CSS inlined; dist/images/ copied from public/

# Preview prod build
pnpm preview
# → http://localhost:4173
```

### Verify Setup

```bash
pnpm lint               # eslint flat — expect no output (clean)
pnpm typecheck         # tsc --noEmit — expect no output (clean)
pnpm test               # vitest jsdom — expect 0 tests (pending rewrite) — previously 6 files / 29 passed on Rother build
pnpm test:e2e           # Playwright chromium — ⚠️ currently STALE — 20 tests assert old Rother content and will FAIL until rewritten (smoke 7 + navigation 5 + what-to-see 4 + give-faq 4)
pnpm build              # expect: "✓ built in ~3s" + "Inlining: index-*.js / style-*.css"
ls -lh dist/index.html  # expect: single HTML file, no separate assets chunk
ls -lh dist/images/     # expect: 8 images (hero-church + chapel-interior + sanctuary + rosary-garden + stained-glass + parish-hall + cemetery + feast)
```

| Check | Expected |
|---|---|
| `pnpm dev` | Vite ready on `:5173`, HMR active |
| `pnpm lint` | Exit `0`, no warnings (`--max-warnings 0`) |
| `pnpm typecheck` | Exit `0`, no errors |
| `pnpm test` | `0 tests` — no `src/**/*.test.*`, no `src/test/setup.ts` (rewrite pending) |
| `pnpm test:e2e` | **STALE** — `20 tests` target old routes (`/what-to-see`, `/pilgrimage`, `#pilgrim-center`, "Shepherd Who Stayed") and **will fail** until specs are ported to `/worship#mass`, `/ministries#liturgical`, etc. |
| `pnpm build` | `dist/index.html` exists + `dist/images/` (8 files) |
| `pnpm preview` | Prod preview on `:4173`, alias routes (`/mass-times`, `/ministry`, `/donate`, `/volunteer`…) + hash anchors (`#/worship#mass`, `#/ministries#liturgical`) navigate |

## Design System

Tokens live in `src/index.css` `@theme`. Extend there — never use arbitrary `bg-[#...]`.

| Token | Hex | Usage |
|---|---|---|
| `shrine-cream` | `#faf6ec` | Page background |
| `shrine-parchment` | `#f2e9d6` | Section bands, card fills |
| `shrine-parchment-dark` | `#e7d9b8` | Dark parchment variant |
| `shrine-stone` | `#dccfae` | Borders, dividers |
| `shrine-ink` | `#2a2115` | Primary text |
| `shrine-charcoal` | `#423a2c` | Secondary text |
| `shrine-maroon-50` | `#fbf0ee` | Ghost hover bg |
| `shrine-maroon-500` | `#7c2a25` | Eyebrow, links |
| `shrine-maroon-600` | `#691f1e` | Header icon, secondary button |
| `shrine-maroon-700` | `#55191a` | Display heading |
| `shrine-maroon-800` | `#431315` | Mid-dark maroon |
| `shrine-maroon-900` | `#33100f` | Hero + footer background |
| `shrine-maroon-950` | `#200a0a` | Deepest maroon (header top strip) |
| `shrine-gold-300` | `#e2bf72` | Eyebrow on dark, header accent |
| `shrine-gold-400` | `#d1a955` | Gold mid |
| `shrine-gold-500` | `#c3963f` | Primary button |
| `shrine-gold-600` | `#a67a2e` | Gold hover |
| `shrine-pine-500` | `#335840` | Pine accent |
| `shrine-pine-600` | `#26402f` | Accent / weave |
| `shrine-terracotta-500` | `#ab5f3c` | Community badge |
| `shadow-shrine` | `0 20px 60px -20px rgba(51,16,15,.45)` | Hero, cards, emblem |
| `shadow-shrine-lg` | `0 40px 90px -30px rgba(51,16,15,.55)` | Elevated cards, header dropdown |

**Typography:** `Fraunces` (display, quote, `font-display` / `h1–h4`) + `Source Sans 3` (body, `font-sans` / `font-body` alias) — loaded in `index.html`, set in `@theme` + `@layer base`. Utilities: `text-balance`, `bg-adobe-texture`, `bg-grain`, `divider-weave` / `divider-weave-thin`, `gold-rule` / `gold-rule-left`, `reveal` / `reveal-visible`, `skip-link`, `mask-fade-b`, `hero-ken-burns` (20s Ken Burns, disabled under `prefers-reduced-motion`).

## Deployment

Primary artifact `dist/index.html` (+ `dist/images/` — 8 files) — no server, no env vars, no rewrites needed. The artifact ships a scoped `Content-Security-Policy` meta (inline JS/CSS from the singlefile build, Google Fonts, **Wikimedia** + Pexels imagery, Google Maps iframe) — set HSTS/X-Content-Type-Options at the CDN/host layer, which a static file cannot control.

CSP (current `index.html`): `img-src 'self' data: blob: https://images.pexels.com https://upload.wikimedia.org` + `frame-src https://www.google.com` + `style-src https://fonts.googleapis.com`.

```bash
pnpm build                # produces dist/index.html + dist/images/ (publicDir copy — singlefile inlines JS+CSS, not public/)
# GitHub Pages — push dist/index.html + dist/images/ to gh-pages or serve dist/ as artifact
# S3 / CloudFront — upload dist/index.html as index.html + dist/images/ assets
pnpm preview              # smoke-test before publish
```

Why `HashRouter`: deep-links like `/#/worship#mass` or `/#/ministries#liturgical` resolve without host fallback config (GitHub Pages / S3 have no SPA rewrites). Switching to `BrowserRouter` would require a `404.html` redirect shim. Legacy aliases (`/mass-times`, `/hours-location`, `/visit` → `/worship`; `/ministry` → `/ministries`; etc.) preserve old parish bookmarks.

## Contributing

This repo follows the six-phase workflow in `CLAUDE.md` (ANALYZE → PLAN → VALIDATE → IMPLEMENT → VERIFY → DELIVER).

- **TDD:** `RED → GREEN → REFACTOR → Commit` — one cycle per commit; write a failing test before fixing a bug.
- **Commits:** Conventional Commits — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `style:` — atomic, subject ≤72 chars.
- **Branches:** `feat/<slug>`, `fix/<slug>`, `docs/<slug>` — short-lived (1–3 days), squash-merge.
- **Conventions:** `PascalCase.tsx` for components/pages, `camelCase.ts` for data/utils, `primaryNav` single-source, alias routes preserved, `cn()` for merges, `shrine-*` tokens only.
- **Pre-push gate:** `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` — all five green (note: `test` currently 0 tests, `test:e2e` stale — rewrite `e2e/*.spec.ts` to new routes/content before gating on E2E).

> `skills/` is vendored, git-tracked reference content (agent skills index: `skills/skills-catalog.md`) — not project source; lint/build tooling ignores it. `src.orig/` is the pre-port Rother snapshot (ignored by `eslint.config.js` + `tsconfig.json`). See `AGENTS.md` for the compact cheat sheet.

## Troubleshooting

| Issue | Solution |
|---|---|
| `pnpm dev` port in use (`:5173`) | `pnpm dev -- --port 5174` or kill the other Vite process. |
| `Cannot find module '@/…'` or alias error | Ensure `vite.config.ts` alias `@→src` and `tsconfig.json` `paths {"@/*":["src/*"]}` stay in sync; restart dev server. |
| Hash anchor doesn't scroll (`#/worship#mass` or `#/ministries#liturgical` lands at top) | Target `id` missing — verify `id="mass"` / `id="confession"` / `id="visit"` in `Worship.tsx` or `id="liturgical"` etc. in `Ministries.tsx`; `Layout.tsx` is double-hash aware (`split on #` + strip `/`, `setTimeout 80ms`, fallback `window.scrollTo`). |
| Bare `href="#mass"` routes to NotFound | Use `<Link to="/worship#mass">` (or `/ministries#liturgical`) — plain `#id` replaces the `HashRouter` hash and routes to `*`. |
| `tsc --noEmit` fails on unused var | `noUnusedLocals/Params` is `true` — remove or prefix with `_` only if intentionally unused. |
| External image not loading | `SafeImage` falls back to `fallback` (default `/images/hero-church.jpg`) via `dataset.fallback` guard; check CDN URL (`upload.wikimedia.org` / `images.pexels.com`) and CSP `img-src` in `index.html`. |
| `pnpm test` finds 0 tests | Expected — `src/test/` and `src/**/*.test.*` were removed in the port (pending rewrite). Add tests under `src/` to restore coverage. |
| `pnpm test:e2e` fails (old Rother assertions) | Expected — `e2e/` still asserts `/what-to-see`, `/pilgrimage`, `#pilgrim-center`, "Shepherd Who Stayed". Port specs to `/worship#mass`, `/ministries#…`, `/history`, `620 Upper Bukit Timah` before relying on E2E. |

## License

Private — all rights reserved. © St Joseph's Church (Bukit Timah), Archdiocese of Singapore. No `LICENSE` file is published.

---

**Docs:** [`docs/prompts.md`](docs/prompts.md) · [`CLAUDE.md`](CLAUDE.md) · [`AGENTS.md`](AGENTS.md) · **Live:** [stjoseph-bt.org.sg](https://stjoseph-bt.org.sg/)
