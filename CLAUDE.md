---
IMPORTANT: File is read fresh for every conversation. Be brief and practical.
---

# St Joseph's Church (Bukit Timah) — `st-joseph-bt`

Port of **https://stjoseph-bt.org.sg/** — **St Joseph's Church (Bukit Timah), Singapore** — Singapore's second-oldest Catholic parish (620 Upper Bukit Timah Road, Singapore 678116). The church on the hill since 1846: Kranji attap chapel → 1853 Palladian church on six Doric columns → 1861 statue of the patron → rubber and return in the 1910s → Fr Joachim Teng's 1964 rebuild (cattle, milk, food fair, blessed by Abp Michel Olçomendy 30 Aug 1964) → 1991–97 Stations/columbarium/hall → consecration by Abp Nicholas Chia 1 May 2012 and Rosary Garden blessed by Abp William Goh 25 Mar 2017 (Mauduit's headstone among the trees). Last remaining Catholic church cemetery in Singapore. Feast of St Joseph the Worker, 1 May. Static parish site — reverent, editorial, welcoming. No backend, no DB, no SSR.

**Stack:** React 19.2.8 + Vite 7.3.6 + Tailwind CSS 4.3.3 (`@tailwindcss/vite 4.1.17`) + TypeScript 5.9.3 (strict) + React Router 7.18.2 (HashRouter) + `vite-plugin-singlefile 2.3.3` (primary `dist/index.html` + `dist/images/` for GH Pages / S3) + `tailwind-merge 3.6.0` + `clsx 2.1.1` + `lucide-react 1.34.0` + `eslint 9.39.5` flat (`typescript-eslint 8.28.0` + `eslint-plugin-react-hooks 5.2.0` + `eslint-plugin-react-refresh 0.4.19` + `globals 16.1.0`) + `vitest 3.2.6` (`jsdom 26.1.0`) + `@testing-library/react 16.2.0` + `@testing-library/jest-dom 6.6.3` + `playwright 1.55.1` (chromium) · pnpm 11.0.0 (`packageManager` + `engines node>=20`, `--frozen-lockfile` in CI) · Alias `@` → `src/` · all deps pinned exact — no `^` in `package.json`

> `README.md` is the visitor-facing overview; this file is the authoritative agent onboarding doc. Keep both in sync with `package.json`, `vite.config.ts`, and `tsconfig.json`.

## Foundational Principles

### Meticulous Approach (Six-Phase Workflow)

Apply to every non-trivial task. Do not skip VALIDATE.

1. **ANALYZE** — Mine requirements in depth. Surface ambiguities, implicit needs, and trade-offs. Explore 2–3 approaches; assess feasibility and long-term cost.
2. **PLAN** — Produce a sequenced plan with phases, checklists, success criteria, and effort estimate. Present it.
3. **VALIDATE** — Obtain explicit user approval before coding. Address concerns.
4. **IMPLEMENT** — Build modular, tested, documented increments. Use library-first selection. Follow TDD Red→Green→Refactor (one commit per cycle).
5. **VERIFY** — Run typecheck / build / tests. Review against best-practice, security, performance, and WCAG AAA criteria. Cover edge cases.
6. **DELIVER** — Hand off complete solution with usage instructions, runbook, and follow-up recommendations.

### Project-Specific Principles

- **Reverent, not austere** — warm parchment/maroon/gold palette, editorial typography (Fraunces / Source Sans 3), ample whitespace. Every page is a welcome from the hill — Mandarin at dawn, English through the day — not a brochure.
- **Parish fidelity** — Singapore content is canonical. Keep dates, place names, and liturgical facts exact: 1846 Kranji attap chapel, 1853 Palladian portico, Fr Anatole Mauduit M.E.P., Fr Joachim Teng and the 1964 rebuild, Rosary Garden 2017, 620 Upper Bukit Timah Road, Cashew MRT, St Joseph the Worker 1 May. Do not reintroduce shrine/Guatemala/Oklahoma narratives — no Rother snapshot exists in this repository (see `docs/porting.md` for lineage).
- **Single-file deployability** — Must remain a standalone artifact (`index.html` + `dist/images/`) shippable to GitHub Pages or S3. No SSR, no server.
- **Accessibility is doctrinal** — WCAG AAA intent: keyboard-navigable header, color contrast over texture, meaningful alt text, `SkipLink` hash discipline under `HashRouter`, reduced-motion respect.
- **Static-first data** — Parish content lives in `src/data/content.ts` and canonical facts in `src/data/site.ts` with nav in `src/data/nav.ts`; no CMS or API until explicitly requested. Pages render from data — do not inline copy that belongs in `data/`.

## Implementation Standards

### General Coding Practices

- **Early returns** over deeply nested conditionals.
- **Composition over inheritance.** Small, focused components.
- **Self-documenting code.** Intentional names; comments explain _why_, not _what_.
- **TDD where logic exists.** Write a failing test before fixing a bug or adding a pure function.
- **No `any`.** Prefer `unknown` + narrowing. Lean on inference; add explicit return types only at public boundaries.
- **Prefer `interface` for shapes, `type` for unions/intersections.**
- **Library discipline:** Use existing primitives (Radix/shadcn if adopted); do not rebuild `Dialog`/`Dropdown` from scratch.
- **Handle all UI states:** `loading`, `error`, `empty`, `success`. Disable buttons during async ops; show feedback.

### Language & Framework Guidelines

#### TypeScript Strict (`tsconfig.json`)

- `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`, `noFallthroughCasesInSwitch: true`, `isolatedModules: true`, `noEmit: true`, `skipLibCheck: true`.
- `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `target: ES2020`, `lib: [ES2020, DOM, DOM.Iterable]`.
- Path alias: `@/*` → `src/*` (`baseUrl: "."` + `paths: { "@/*": ["src/*"] }` mirrored in `vite.config.ts` via `path.resolve(__dirname, "src")`). Always import via `@/` for cross-directory imports. Keep both files in sync.
- `types: ["node", "vitest/globals"]` — required for `describe/it/expect` globals in `src/**/*.test.*`.
- Include is `["src", "vite.config.ts", "eslint.config.js", "playwright.config.ts"]` (so `eslint.config.js` + `playwright.config.ts` are type-checked). Add future config files to `include` only if they should be type-checked.
- Unused locals/params will fail the type gate — clean before commit.

#### Vite 7 Specific

- Plugins: `@vitejs/plugin-react 5.2.0` + `@tailwindcss/vite 4.1.17` + `vite-plugin-singlefile 2.3.3`. Order matters — keep as configured.
- HMR enabled by default; do not add a separate dev server abstraction.
- **Env vars:** `VITE_*` prefix for client-exposed vars. Access via `import.meta.env.VITE_*`.
- Import alias configured in `vite.config.ts` via `path.resolve(__dirname, "src")`. Keep `tsconfig.json` `paths` + `baseUrl` in sync.
- Build is single-file: `viteSingleFile()` inlines JS+CSS (not `publicDir`). Avoid dynamic `import()` that assumes code-splitting unless you remove the plugin intentionally. `public/images/` is copied verbatim to `dist/images/` — upload both `dist/index.html` + `dist/images/` on deploy.
- `test` in `vite.config.ts` — `{ globals: true, environment: "jsdom", setupFiles: ["src/test/setup.ts"], include: ["src/**/*.{test,spec}.{ts,tsx}"], exclude: ["e2e/**", "node_modules/**", "playwright-report/**", "test-results/**"] }` — keeps `e2e/**` out of unit runs; `src/test/setup.ts` provides `jest-dom` + `IntersectionObserver` mock + `scrollTo`/`scrollIntoView` stubs.
- `server.watch.ignored: ["**/skills/**","**/dist/**","**/playwright-report/**","**/test-results/**","**/coverage/**","**/src.orig/**"]` — prevents `ENOSPC` from the vendored `skills/` tree (large `.venv`).

#### React 19 + React Router 7

- Functional components only; hooks for all state/effects. No class components.
- **Routing:** `HashRouter` is intentional at `src/App.tsx` with `Layout` outlet — static hosts (GH Pages / S3) have no SPA fallback; deep links are `/#/worship`, `/#/ministries#liturgical`, etc. Do not switch to `BrowserRouter` without adding a `404.html` redirect. Keep routing declarative in `App.tsx`; do not scatter `createBrowserRouter` elsewhere.
- **Route table (authoritative — 17 entries: 16 content paths + `*` NotFound, 5 alias groups / 7 alias paths, 10 page components):**

  | path | component | role |
  |------|-----------|------|
  | `/` | `Home` | canonical |
  | `/about` | `About` | canonical (orig canonical was `/about-blessed-stanley-rother` — flipped) |
  | `/history` | `History` | canonical |
  | `/worship` | `Worship` | canonical for `/mass-times` + `/hours-location` + `/visit` |
  | `/mass-times` | `Worship` | `aliasOf: /worship` |
  | `/hours-location` | `Worship` | `aliasOf: /worship` (orig belonged to `Pilgrimage`) |
  | `/visit` | `Worship` | `aliasOf: /worship` (orig belonged to `Pilgrimage`) |
  | `/ministries` | `Ministries` | canonical for `/ministry` |
  | `/ministry` | `Ministries` | `aliasOf: /ministries` |
  | `/news-events` | `NewsEvents` | canonical for `/news-and-events` |
  | `/news-and-events` | `NewsEvents` | `aliasOf: /news-events` |
  | `/serve` | `Serve` | canonical for `/volunteer` |
  | `/volunteer` | `Serve` | `aliasOf: /serve` |
  | `/give` | `Give` | canonical for `/donate` (orig alias was `/shrinegift`) |
  | `/donate` | `Give` | `aliasOf: /give` |
  | `/faq` | `FAQ` | canonical |
  | `*` | `NotFound` | catch-all — "This path does not lead to the church." |

  Preserve alias routes — bookmarks and printed material depend on them. When adding a canonical path, keep `aliasOf` → canonical pairs in `App.tsx` and update `src/data/nav.ts` accordingly.

- **Hash anchors (Layout double-hash aware):**

  | route | ids | nav |
  |-------|-----|-----|
  | `/worship` | `mass`, `confession`, `visit` | `primaryNav` Worship dropdown + `footerNav` + page sections (`scroll-mt-28`) |
  | `/ministries` | `liturgical`, `faith-formation`, `pastoral-care`, `family-life`, `youth`, `mandarin` | `Ministries` jump nav (`<Link to="/ministries#id">` → 6 pill links, `aria-label="Jump to ministry"`) |
  | `/serve` | _none_ | `serveRoles`/`devotions` rendered without section ids |

  `Worship` anchors and `Ministries` ids both scroll with `Layout`'s `useEffect` (`setTimeout 80ms` + `scrollIntoView`).

- **Layout behavior:** `Layout.tsx` handles double-hash scroll (`window.location.hash` split on `#` + strip `/`) + `80ms` timeout + fallback `window.scrollTo({ top: 0 })`. `Header` + `Ministries` jump nav must use `<Link to="/path#id">`, never plain `<a href="#id">` (which would replace the hash and route to `NotFound` under `HashRouter`).

- **Navigation single source:** `primaryNav: NavItem[]` (6 — `Home`, `About` with 3 children + `description`, `Worship` with 3 children + `description`, `Ministries` with 3 children + `description`, `News & Events`, `Serve`) and `footerNav: NavLink[]` (10) in `src/data/nav.ts`. Update nav there; `Header`/`Footer` render from it.

- Colocation: `components/` for layout primitives, `pages/` for route components, `data/` for typed content, `utils/` for pure helpers (`cn`), `hooks/` for `useScrolled`.
- Custom hooks → `src/hooks/` when extracted (currently only `useScrolled`).
- Server state (future): TanStack Query; global client state: Zustand. Neither is installed yet — add only when traversal proves need.
- Handle all UI states where data is async or conditional: `loading`, `error`, `empty`, `success`. Disable buttons during async ops; show feedback.
- Use library primitives when available (no UI library locked in yet; `shadcn/ui` with Radix is the intended direction per project instructions).

#### Tailwind CSS v4 — CSS-First `@theme`

- Tokens live in `src/index.css` `@theme` block. Extend there; do not introduce arbitrary `bg-[#...]` values.
- Palette (unchanged): `shrine-cream / parchment(+dark) / stone / ink / charcoal / maroon-{50,100,500,600,700,800,900,950} / gold-{100,300,400,500,600} / pine-{500,600,700} / terracotta-{400,500}` plus `shadow-shrine/shrine-lg` (24 colors + 2 shadows). Use semantic names (`shrine-maroon-600`) not hex. Tokens are unchanged — only the imagery/content they frame is now Bukit Timah (Palladian 1853 church, Fr Teng's 1964 rebuild, Rosary Garden, cemetery, feast 1 May).
- Display = `Fraunces`, body = `Source Sans 3`; heading styles set on `h1–h4, .font-display`. Google Fonts loaded in `index.html` — add weights only with purpose. CSP in `index.html` whitelists `fonts.googleapis.com`/`fonts.gstatic.com`, `upload.wikimedia.org`/`images.pexels.com` for images, and `google.com` for the maps iframe.
- Utilities: `text-balance`, `bg-adobe-texture`, `divider-weave`, `divider-weave-thin`, `gold-rule`/`gold-rule-left`, `hero-ken-burns`, `reveal`+`reveal-visible`, `skip-link`, `mask-fade-b` (13) + keyframes `gold-rule-draw`/`hero-ken-burns`. Document new utilities alongside them.
- Mobile-first, responsive (`sm:` / `lg:`), and dark-mode tolerant even though the parish theme is light-first.

#### Component Conventions

- `Button` (`components/ui/Button.tsx`): discriminated `to`/`href`/native `button` + `icon`; variants `primary|secondary|ghost|outline-light` via `variantClasses` record and `cn()` merge. Use `to` for internal navigation, `href` for external. Keep variant styles centralized there.
- `Container` (`components/ui/Container.tsx`): `max-w-7xl mx-auto px-5 sm:px-8`. All sections should wrap in `Container`.
- `SectionHeading` (`components/ui/SectionHeading.tsx`): `eyebrow? / title / description` with `align` and `light` props + `gold-rule` line.
- `PageHero` (`components/PageHero.tsx`): `maroon-950` hero with low-opacity image (`alt=""`), dual gradient overlays + `bg-grain`; accepts `compact?` (tighter padding when needed) + `children` slot (used by `Ministries` jump nav). Used by most pages.
- `Header` / `Footer`: fixed header with `scrolled` state (`scrollY > 16` via `useScrolled(16)` — hook defaults to `12` — → `maroon-950/92` translucent + blur; transparent at the top of Home), desktop dropdown on hover + click (`openDesktopMenu`, closes on child-link click), mobile drill-down whose drawer closes on any in-drawer link activation (`onClickCapture` — a link to the current route never changes `pathname`, so the pathname effect alone cannot close it), and hash-aware closing on route change. Top bar (`lg` only) shows `site.address.street · site.feast.name · site.feast.date` + `Give` link. Preserve keyboard + `aria-expanded` behavior when modifying. Footer is 4-col (`Explore` + `Get involved` from `footerNav` split + parish/visit/contact blocks), divider-weave, and consumes `site.ts` + `nav.ts` — copy is Singapore-specific (hill, Mandarin at dawn, Rosary Garden, etc.).
- `SafeImage` (`components/SafeImage.tsx`): wraps `<img>` with `fallback` default `/images/hero-church.jpg` (not the old `/images/hero-shrine.jpg`), `loading="lazy"` default plus `useState` for `current`/`loaded`, optional `fetchPriority` (`"high"` on above-the-fold heroes — Home hero + PageHero), `onError` → `dataset.fallback="1"` guard (swap `src` once), and `transition-opacity` fade-in. Use for any external CDN image; Wikimedia hero (`images.hero`) and 2 Pexels CDN images (`naveCdn`/`courtyardCdn` in `content.ts`) fall back to local `public/images/` on failure. Don't use bare `<img>` for CDN sources. Current CDN allowlist: `upload.wikimedia.org`, `images.pexels.com`.
- `SkipLink` (`components/SkipLink.tsx`): `href="#main-content"` but `preventDefault`s and imperatively focuses `#main-content` (`<main>` in `Layout`) — a native jump would rewrite the hash and route to `NotFound` under `HashRouter`. Preserve this pattern; rewrite its `src/test` coverage when restoring unit tests.
- `Reveal` (`components/ui/Reveal.tsx`): `delay`/`as` + `IntersectionObserver` (`0.15` threshold), `reveal` → `reveal-visible` with `prefers-reduced-motion` fallback.
- `Accordion` (`components/ui/Accordion.tsx`): single-open, `aria-expanded`/`aria-controls`, keyboard `ArrowDown`/`ArrowUp`/`Home`/`End`.
- `cn` (`utils/cn.ts`): `twMerge(clsx(...))` — always merge classes through `cn()`.

## Development Workflow

### Environment Setup

```bash
# Node 20+ required (Vite 7.3.6). pnpm is the supported package manager.
pnpm install --frozen-lockfile  # deterministic (versions pinned exact in package.json)
# npm is not drop-in for these pins (typescript-eslint 8.28.0 peer predates TS 5.9):
# use `npm ci --legacy-peer-deps` if you must; pnpm is the supported path.
cp .env.example .env.local 2>/dev/null || true  # no env vars required yet
pnpm dev              # http://localhost:5173
```

No backend, no DB, no `.env` contract yet. If env vars are added, document them in "Environment Variables" below. `skills/` is vendored, git-tracked reference content (index: `skills/skills-catalog.md`) — not project source; `eslint.config.js` ignores it and `tsconfig` excludes it. Do not import from it.

### Build Commands

| Command | Purpose | Verified | Notes |
|---------|---------|----------|-------|
| `pnpm dev` / `npm run dev` | Vite dev server with HMR (default http://localhost:5173) | ✅ in `package.json` |  |
| `pnpm build` / `npm run build` | Production single-file build (`vite build` + `viteSingleFile`) → `dist/index.html` + `dist/images/` | ✅ | `viteSingleFile` inlines JS+CSS only; `publicDir` is copied verbatim — upload both `dist/index.html` + `dist/images/` |
| `pnpm preview` / `npm run preview` | Preview `dist` build locally | ✅ | |
| `pnpm typecheck` / `npm run typecheck` | Type gate `tsc --noEmit` | ✅ | **Run before every push.** Strict flags will fail on unused locals/params. |
| `pnpm lint` / `npm run lint` | ESLint flat `eslint . --max-warnings 0` (`eslint.config.js`) | ✅ | Ignores `dist`, `node_modules`, `coverage`, `playwright-report`, `test-results`, `skills`, `src.orig` |
| `pnpm lint:fix` / `npm run lint:fix` | ESLint auto-fix (`eslint . --fix`) | ✅ | |
| `pnpm test` / `npm run test` | Vitest `jsdom` — `vitest run` | ✅ | **11 files / 67 tests** — `utils/cn` 5 + `data/nav` 7 + `data/content` 10 + `data/site` 6 + `ui/Button` 9 + `SkipLink` 3 + `ui/Accordion` 6 + `SafeImage` 6 + `Header` 7 + `BackToTop` 5 + `pages/Ministries` 3 via `src/test/setup.ts` |
| `pnpm test:watch` | Vitest watch mode (`vitest`) | ✅ | Watches 11 files |
| `pnpm test:coverage` | Vitest with coverage (`vitest run --coverage`) | ✅ | Coverage via `@vitest/coverage-v8` |
| `pnpm test:e2e` / `npm run test:e2e` | Playwright `chromium` — `playwright test` (27 tests: smoke 11 + navigation 8 + ministries 4 + give-faq 4 in `e2e/`) | ✅ | Green — Bukit Timah routes (`/worship`/`/ministries`/`/serve`/`/give` + `#mass`/`#liturgical` etc.) + drawer same-route close regression + rise-in entrance + event chips + back-to-top + aria-current nav |
| `pnpm test:e2e:ui` | Playwright UI mode (`playwright test --ui`) | ✅ | |
| `pnpm test:e2e:report` | Open last Playwright HTML report (`playwright show-report`) | ✅ | |
| `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build` | **Pre-push gate — all five must be green** | ✅ | Mirrored in CI (`.github/workflows/ci.yml`): lint → typecheck → test → test:e2e → build + artifacts |

> Before documenting a command as available, verify it in `package.json` scripts. Gate is `lint && typecheck && test && test:e2e && build` — CI mirrors it.

### Adding Tooling

Tooling is already wired (`eslint 9.39.5` flat + `vitest 3.2.6` + `@testing-library/react 16.2.0` + `playwright 1.55.1`). When adding new tooling, verify `package.json` scripts and update this table. Previous bootstrap (for reference):

```bash
pnpm add -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals
pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
pnpm add -D @playwright/test && npx playwright install chromium
```

## Testing Strategy

Current status: **wired — 11 unit files / 67 tests + 27 E2E, all green.** `vitest 3.2.6` (jsdom) + `@testing-library/react 16.2.0` + `jsdom 26.1.0` + `src/test/setup.ts` (`@testing-library/jest-dom/vitest` + `IntersectionObserver` mock + `window.scrollTo` stub + `matchMedia` stub) + `playwright 1.55.1` (chromium, `playwright.config.ts` + `e2e/` 4 specs, `expect.timeout` 15s). Run `pnpm test` (unit), `pnpm test:watch` (watch), `pnpm test:coverage` (coverage), `pnpm test:e2e` (E2E, `webServer` → `pnpm exec vite --port 5173 --host 127.0.0.1 --strictPort` with `reuseExistingServer: !CI`), `pnpm test:e2e:ui` (UI mode), `pnpm test:e2e:report` (HTML report). `vitest` config lives in `vite.config.ts` `test` — `{ globals: true, environment: "jsdom", setupFiles: ["src/test/setup.ts"], include: ["src/**/*.{test,spec}.{ts,tsx}"], exclude: ["e2e/**", "node_modules/**", "playwright-report/**", "test-results/**"] }` + `server.watch.ignored` for `skills`/`dist`/`coverage`/`src.orig`.

Coverage — **unit (11 files / 67):** `utils/cn` (5), `data/nav` (7), `data/content` (10: lifeTimeline 8, grounds 3, ministries 6, faqs 6, upcomingEvents 6, givingOptions 8, priests 3, ppcMembers 16, images 11, etc.), `data/site` (6), `ui/Button` (9 — 8 variant/render + active press feedback), `SkipLink` (3), `ui/Accordion` (6 — single-open + arrow/Home/End focus + inert/aria-hidden animation states), `SafeImage` (6), `Header` (7 — drawer close on same-route/different-route link activation, Escape, aria-expanded, aria-current link + parent, 44px hamburger), `BackToTop` (5 — hidden/visible/hide-on-top/click smooth/reduced-motion auto), `pages/Ministries` (3 — 6 pills, hash-matched aria-current, no hash no current).

**E2E (4 files / 27, chromium):** `e2e/smoke.spec.ts` (11 — hero + staged rise-in entrance + Worship/Ministries aliases + hash anchors + NotFound + mobile drawer + drawer same-route close regression + event category chips + back-to-top scroll journey), `e2e/navigation.spec.ts` (8 — Worship/Ministries hover dropdowns + keyboard + SkipLink hash-preserving + footer 10 links + NotFound + Give + aria-current page link + aria-current dropdown parent), `e2e/ministries.spec.ts` (4 — 6 sections + imageAlt/details, CDN fallback `route.abort`, jump nav `Link` preserves HashRouter + aria-current pills, Home grounds → Worship anchors), `e2e/give-faq.spec.ts` (4 — Give 8 SG options + alias `/donate` + FAQ accordion with animated panel visibility + Worship Find Us + maps).

Conventions: `*.test.tsx` adjacent to source, `__mocks__` only when isolating `react-router-dom`, and `src/data/content.ts` factories for fixtures. `vite.config.ts` `test.exclude` keeps `e2e/**` out of unit runs; `e2e/*.spec.ts` is Playwright only.

### When to Add More Tests (beyond the rewrite)

- Additional pure helpers (`src/utils/*`, selectors, content transforms) — unit tests.
- Routing contract — `App.tsx` alias routes + hash anchors integration (MemoryRouter) — now covered by `e2e/smoke.spec.ts` for critical paths after rewrite.
- Critical journeys — expand `e2e/` beyond smoke: devotion flows, map embed, cemetery/columbarium copy, feast page.
- Visual / a11y — add `axe` scan + `playwright` trace/video (already `on-first-retry`).

## Code Quality Standards

### Linting & Formatting (wired)

`eslint 9.39.5` flat config (`eslint.config.js`) — `typescript-eslint 8.28.0` + `eslint-plugin-react-hooks 5.2.0` + `eslint-plugin-react-refresh 0.4.19` + `globals 16.1.0` (ignores `dist`, `node_modules`, `coverage`, `playwright-report`, `test-results`, `skills`, `src.orig`). Run `pnpm lint` (`eslint . --max-warnings 0`) and `pnpm lint:fix` (`eslint . --fix`) for auto-fix.

Gate for pre-ship (5-step):

```bash
pnpm lint               # eslint flat — no warnings
pnpm typecheck          # tsc --noEmit
pnpm test               # vitest jsdom — 11 files / 67 tests
pnpm test:e2e           # playwright chromium — 27 tests (4 specs)
pnpm build              # vite build — singlefile inlines correctly
```

### Type Safety

- No `any`; `as any` is a last resort with a `// ponytail:` ceiling comment.
- `unknown` + narrowing at trust boundaries (URL params, external JSON).
- Keep `tsconfig.json` strict flags on; do not relax to silence errors.
- Prefer `interface` for shapes, `type` for unions/intersections. `EventItem.category` is a string union (`Parish|Devotion|Formation|Archdiocese`); `GivingOption.icon` is a union of 8 icon names (`flame|church|sprout|heart|book|hand-heart|landmark|globe`).

### Styling Discipline

- Use existing `shrine-*` tokens before introducing new colors. Tokens 24+2 shadows are unchanged — frame new Bukit Timah imagery with them, don't add arbitrary `bg-[#...]`.
- No redundant CSS: extend `@theme` or add a named `@utility`; do not duplicate utilities across components.
- Keep bespoke CSS to `src/index.css` `@layer` blocks. Document new utilities (`text-balance`, `bg-adobe-texture`, `bg-grain`, `divider-weave`, `gold-rule`, `hero-ken-burns`, `reveal`, `skip-link`, etc.) alongside them.

## Git & Version Control

### Branching

- `main` is the deploy branch (single-file artifact).
- Feature branches: `feat/<slug>`, fixes: `fix/<slug>`, docs: `docs/<slug>`. Short-lived (1–3 days), rebase or squash-merge.
- Do not commit `node_modules/`, `.next/`, `dist/`. `skills/` **is** committed (vendored reference content) — do not import or lint it; `eslint.config.js` ignores and `vite.config.ts` `server.watch.ignored` excludes it. **`src.orig/` is not part of this repository** (never committed); its ignore entries are inert defensive guards — do not re-add it to lint/tsc scope.

### Commit Standards

- Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `style:`.
- Atomic commits (one logical change). Subject ≤ 72 chars; body explains why.

### Push / Deploy

Gate before pushing `main` (mirrored in CI — `.github/workflows/ci.yml`):

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build
git push origin main
```

**CI (`.github/workflows/ci.yml`)** — triggers on `push`/`pull_request` to `main`, `concurrency: group: ci-${{ github.ref }}, cancel-in-progress: true`, `runs-on: ubuntu-latest`, `timeout-minutes: 15`:
`actions/checkout@v4` → `pnpm/action-setup@v4` (`version: 11`) → `actions/setup-node@v4` (`node-version: 24`, `cache: pnpm`) → `pnpm install --frozen-lockfile` → `pnpm lint` → `pnpm typecheck` → `pnpm test` → `npx playwright install --with-deps chromium` → `pnpm test:e2e` → `pnpm build` → artifacts: `playwright-report/` (on failure, `retention-days: 14`) + `dist/` (always, `retention-days: 7`).

Primary artifact `dist/index.html` (+ `dist/images/` copied from `public/` — `viteSingleFile` inlines JS+CSS, not `publicDir`) deploys directly to GitHub Pages (via `gh-pages` branch or `dist` artifact — upload both) or S3 — `HashRouter` avoids 404s on static hosts (deep links `/#/worship`, `/#/ministries#liturgical` resolve without a `404.html` redirect).

## Error Handling & Debugging

- SPA has no server failures; handle: broken image fallbacks (`SafeImage` → `/images/hero-church.jpg` CDN→local), unknown routes → `NotFound` (`pages/NotFound.tsx` — "This path does not lead to the church." + `Return home` / `Mass times`), and empty content states per page (every list has an empty state if data is async in future).
- `Layout` scroll logic should degrade gracefully when a `#hash` target is missing (current behavior: falls back to `window.scrollTo({ top: 0 })`). Preserve the `resolveAnchor` double-hash handling when extending layout concerns.
- `SafeImage` fallback pattern: guards `onError` with `dataset.fallback="1"` so the swap to `/images/hero-church.jpg` (or explicit `fallback`) fires once. After test rewrite, E2E should exercise this via `page.route("**/pexels.com/**", route.abort)` / `page.route("**/wikimedia.org/**", route.abort)` — use `SafeImage` for every external image; never bare `<img>` for CDN sources.
- For future data fetching (CMS/API): wrap with error boundaries and show user-friendly messages; never leak raw errors.
- Debugging: Vite HMR overlay + React DevTools. For `HashRouter` issues, inspect `location.pathname` + `location.hash` in `Layout`'s `useEffect` (log `window.location.hash` and `resolveAnchor` output).

## Communication & Documentation

- Explain _why_ behind parish-specific choices (historical wording — Mauduit, Teng, Palladian portico, rubber/cattle, Mauduit's headstone; liturgical dates — 1 May St Joseph the Worker; pastoral tone — Mandarin/Dialect, SSVP, Legion of Mary).
- Keep `docs/prompts.md` for lineage prompts; update when intent shifts.
- Document new routes, tokens, or images in this file and in `src/data/nav.ts` / `src/data/content.ts` / `src/data/site.ts` comments where applicable.
- Preserve dual-route aliases when renaming legacy paths (external links and printed bulletins exist — keep `/volunteer`→`/serve`, `/donate`→`/give`, `/hours-location`→`/worship`, etc. or add explicit redirects).

## Project-Specific Standards

### Architecture

```
src/ (45 files — 33 source + 11 tests + 1 setup)
  App.tsx                # HashRouter + route table: 17 Route entries (16 content paths + * NotFound), 5 alias groups / 7 alias paths + 9 hash anchors (Layout outlet)
  main.tsx               # StrictMode + createRoot
  index.css              # Tailwind v4 @theme (24 colors + 2 shadows) + @layer base/utilities (22 utilities: text-balance, bg-adobe-texture, bg-grain, divider-weave, divider-weave-thin, gold-rule, gold-rule-left, hero-ken-burns, mask-fade-b, reveal, reveal-visible, rise-in + rise-in-d1..d4, menu-in, drawer-in, dot-pulse, card-lift, link-underline, skip-link + 6 keyframes gold-rule-draw/hero-ken-burns/rise-in/menu-in/drawer-in/halo-pulse)
  components/
    Layout.tsx           # Outlet + double-hash scroll/hash restoration (split on # + strip / + 80ms setTimeout + fallback window.scrollTo + SkipLink + Header + Footer + BackToTop)
    Header.tsx           # fixed + useScrolled(16) (hook default 12) → maroon-950/92 translucent + blur; transparent at top of Home + top bar (lg: site.address·feast + Give link-underline) + desktop hover (openDesktopMenu, menu-in entrance, closes on child-link click, aria-current parent/link states) + mobile drill-down (drawer-in entrance) whose drawer closes on any in-drawer link activation (onClickCapture — same-route taps never change pathname) + hash-aware close + Escape handler + h-11 w-11 (44px) hamburger
    Footer.tsx           # 4-col (parish blurb + Explore/Get involved from footerNav + visit/contact) + divider-weave-thin + Singapore copy (St Joseph the Worker, Cashew MRT, Rosary Garden, 最); consumes site.ts + nav.ts
    PageHero.tsx         # maroon-950 hero + SafeImage (opacity-35, fetchPriority="high") + dual gradients + bg-grain + rise-in staged eyebrow/title/description/children; props: eyebrow/title/description/image/fallback/compact? (compact tightens pt/pb)
    SafeImage.tsx        # <img> wrapper: fallback="/images/hero-church.jpg", loading="lazy" default, state for current/loaded, fade-in, onError→dataset.fallback guard (once), optional fetchPriority ("high" on above-the-fold heroes), transition-opacity
    SkipLink.tsx         # preventDefault + imperative focus on #main-content (never rewrites hash under HashRouter)
    BackToTop.tsx        # fixed bottom-right (44px target, maroon-900 + gold ring): appears when scrollY > 480, aria-hidden + tabIndex -1 + pointer-events-none when hidden, click → window.scrollTo (behavior auto under prefers-reduced-motion via matchMedia; never touches the hash)
    Emblem.tsx / Timeline.tsx (left rail, now 1845–2017, dot-pulse halos) / SocialIcons.tsx
    ui/                  # Button (discriminated to/href/button + primary/secondary/ghost/outline-light + icon + active press feedback) / Container (max-w-7xl px-5 sm:px-8) / SectionHeading (eyebrow/title/description + align/light + gold-rule) / Accordion (single-open, aria-expanded, keyboard Arrow/Home/End, animated grid-rows collapse with inert closed panels) / Reveal (delay/as + IntersectionObserver 0.15 + prefers-reduced-motion)
  hooks/
    useScrolled.ts       # threshold 12 default; Header passes 16 — intentional mismatch (delayed transparent→solid on Home)
  pages/ (10, named exports)
    Home.tsx             # hero (Wikimedia) + quickFacts (Mass/MRT/feast/confession from site) + welcome (site.tagline/vision, Kranji/Teng narrative) + grounds preview (3) → /worship anchors + events (4 from upcomingEvents)
    About.tsx            # pillars (Faith formation/Community/Outreach) + clergy (priests[3] with phones) + PPC table (ppcMembers[16] ex-officio + elected/appointed)
    History.tsx          # lifeTimeline (8, 1845–2017) via Timeline
    Worship.tsx          # #mass (site.mass) + #confession (confession/adoration + devotions[6]: St Joseph First Wed/First Fri Holy Hour/Vocations/Children's/Divine Mercy/Adoration) + #visit (address/gates/MRT/buses + mapsEmbedSrc iframe + mapsUrl)
    Ministries.tsx       # jump nav (<Link to="/ministries#id"> 6 pillars) + ministries[6] alternating shrine-cream/parchment sections (id: liturgical/faith-formation/pastoral-care/family-life/youth/mandarin)
    NewsEvents.tsx (compact PageHero) / Serve.tsx (serveRoles[4] + SCC/offertory callouts, no section ids) / Give.tsx (givingOptions[8] SG) / FAQ.tsx (faqs[6] via Accordion) / NotFound.tsx ("This path does not lead to the church." + Return home / Mass times)
  data/
    nav.ts               # primaryNav (6, 3 with children+description: About[3]/Worship[3]/Ministries[3]) / footerNav (10) (single source; Header/Footer render from it)
    content.ts           # Typed data layer: 8 interfaces + 10 exports — priests[3] (Jovita Ho/Leo Justin/Dominic Yeo-Koh) + ppcMembers[16] + lifeTimeline[8] 1845–2017 + grounds[3] (main-church/chapel/rosary-garden + image/imageFallback/imageAlt) + ministries[6] (liturgical/faith-formation/pastoral-care/family-life/youth/mandarin + imageFallback) + faqs[6] (Mass/confession/MRT/feast/baptism/cemetery) + upcomingEvents[6] (title+date+summary+category Parish|Devotion|Formation|Archdiocese + optional href) + givingOptions[8] (PayNow/UEN, collections, cash boxes, cheque payable St. Joseph's Church (Bukit Timah), SSVP, GIFT, Boys' Town, Mass offerings + icon union) + serveRoles[4]/devotions[6] untyped consts + images {hero (Wikimedia 2025 front view)/heroFallback (/images/hero-church.jpg)/chapel/sanctuary/garden/glass/hall/cemetery/feast local + naveCdn/courtyardCdn (Pexels)} (11 keys, 3 CDN on 2 hosts, each grounds/ministry item carries imageFallback)
    site.ts              # canonical single source (as const): name St Joseph's Church (Bukit Timah) / shortName / chineseName 圣若瑟堂 / tagline ("A vibrant, evangelizing and missionary Church…") / vision + address 620 Upper Bukit Timah Road Singapore 678116 (street/city/zip/full+query getters) + hours (5: gates/maiChurch/chapel/bookshop/adorationRoom) + mass (weekdayMorning Mon–Sat 6.30 a.m. Chapel, weekdayEvening Mon–Fri 6.30 p.m. Chapel, saturday 5.30 p.m., sunday[4] 7.30 Mandarin + 9.30/11.30/5.30 English, confession 15 min before weekend Masses foyer, adoration Tue 8 p.m., secondCollection 4th Sunday CMOF) + contact (parish priest +65 6760 0052, assistant +65 6760 4636, office +65 6769 1666) + transport (Cashew MRT Downtown Line, buses 67/75/170/176/178/184/961/963/970) + feast St Joseph the Worker 1 May + uen T08CC4043C/chequePayee/facebook/archdiocese/mapsUrl/mapsEmbedSrc — Footer + Worship + About consume it, don't duplicate
  utils/
    cn.ts                # twMerge(clsx) — always merge via cn()
  test/
    setup.ts             # vitest jsdom setup (jest-dom + IntersectionObserver mock + scrollTo/scrollIntoView stubs + matchMedia stub)
  **/*.test.{ts,tsx}     # 11 files / 67 tests: utils/cn (5), data/nav (7), data/content (10), data/site (6), ui/Button (9), SkipLink (3), ui/Accordion (6), SafeImage (6), Header (7), BackToTop (5), pages/Ministries (3)
public/
  images/ (8)            # hero-church.jpg, chapel-interior.jpg, sanctuary.jpg, rosary-garden.jpg, stained-glass.jpg, parish-hall.jpg, cemetery.jpg, feast.jpg (Vite publicDir → dist/images/ — upload alongside dist/index.html); Wikimedia hero + 2 Pexels CDN images with SafeImage local fallback (allowlist: upload.wikimedia.org, images.pexels.com)
vite.config.ts           # alias @→src + test { globals, jsdom, setupFiles: src/test/setup.ts, include: src/**/*.{test,spec}.{ts,tsx}, exclude: e2e/** } + server.watch.ignored [skills/**, dist/**, playwright-report/**, test-results/**, coverage/**, src.orig/**] + viteSingleFile()
tsconfig.json            # strict + noUnusedLocals/noUnusedParameters/noFallthroughCasesInSwitch/isolatedModules/noEmit + include [src, vite.config.ts, eslint.config.js, playwright.config.ts] + types [node, vitest/globals] + paths @/*
eslint.config.js         # flat config (typescript-eslint 8 + react-hooks 5 + react-refresh); ignores [dist, node_modules, coverage, playwright-report, test-results, skills, src.orig]
playwright.config.ts     # Playwright 1.55.1 (chromium, webServer → pnpm exec vite :5173, expect timeout 15s; CSP is a meta tag in index.html, not a config header)
index.html               # Google Fonts Fraunces + Source Sans 3; CSP allows images from Wikimedia+Pexels and frames from google.com; OG for St Joseph's Bukit Timah; base description + viewport; #root + /src/main.tsx
e2e/ (4 specs / 27 tests) # smoke (11) + navigation (8) + ministries (4) + give-faq (4) + helpers.ts
.github/workflows/ci.yml # CI: lint → typecheck → test → test:e2e (chromium) → build + artifacts (Node 24, pnpm 11, pnpm-lock committed, --frozen-lockfile)
src.orig/                # NOT present in this repository (never committed) — Rother lineage lives in docs/porting.md; eslint/vite-watch ignore entries are inert defensive guards
```

- **SafeImage fallback pattern:** `SafeImage.tsx` guards `onError` with `dataset.fallback="1"` so the swap to local `/images/hero-church.jpg` (or explicit `fallback`) fires once, with `opacity` fade-in via `loaded` state. Use `SafeImage` for every external image; never bare `<img>` for CDN sources. CDN allowlist is exactly `upload.wikimedia.org` (hero) + `images.pexels.com` (naveCdn, courtyardCdn) — 3 URLs on 2 hosts.

- **Data ownership:** Content arrays in `content.ts` (`Priest`, `PpcMember`, `TimelineEntry` 1845–2017 Singapore mission, `GroundsPlace` 3, `Ministry` 6, `FaqItem` 6, `EventItem` 6 with optional `href` + `category` union, `GivingOption` 8 with `icon` union, plus `serveRoles`/`devotions`/`images` 11) + `site.ts` Singapore facts + `nav.ts` nav are the single source. Pages render from these arrays — do not inline copy that belongs in `data/`. Historical narrative lives in `lifeTimeline[8]` (1845 Mauduit inland → 1846 attap chapel → 1853 Palladian church → 1861 patron statue/feast → 1910s rubber & return → 1964 Fr Teng rebuild 30 Aug 1964 → 1991–97 Stations/columbarium/hall → 2012 consecration by Abp Chia + 2017 Rosary Garden by Abp Goh).
- **Routing model:** Client-side only; no loaders or server components. Alias groups (5 → 7 paths) are intentional: `/worship` canonical for `/mass-times`+`/hours-location`+`/visit`, `/ministries` canonical for `/ministry`, `/news-events` canonical for `/news-and-events`, `/serve` canonical for `/volunteer`, `/give` canonical for `/donate`. `/about` is now canonical at `/about` (orig canonical was `/about-blessed-stanley-rother` — flipped). Nav is driven by `src/data/nav.ts` — Header dropdowns + `Ministries` jump nav + Footer all render from it. Current anchor targets are `#mass`/`#confession`/`#visit` on `/worship` and `#liturgical`/`#faith-formation`/`#pastoral-care`/`#family-life`/`#youth`/`#mandarin` on `/ministries`; keep `Layout`'s `resolveAnchor` aware when adding more.
- **No global store yet.** Lift state only when cross-page need proves itself. Current state is `useState` for `Header` menus/drawer + `Accordion` single-open + `Reveal` visibility.

### File Organization & Naming

- Components: `PascalCase.tsx` (e.g., `PageHero.tsx`, `SafeImage.tsx`); hooks: `useThing.ts` (`hooks/useScrolled.ts` with threshold `12` default, `16` in `Header` — intentional delay).
- Data/utils: `camelCase.ts` (`content.ts`, `site.ts`, `nav.ts`, `cn.ts`).
- Pages: `PascalCase.tsx` matching route intent (`About.tsx`, `History.tsx`, `Worship.tsx`, `Ministries.tsx`, `NewsEvents.tsx`, `Serve.tsx`, `Give.tsx`, `FAQ.tsx`, `NotFound.tsx`) — 10 pages, all named exports (`Home`, `About`, `History`, `Worship`, `Ministries`, `NewsEvents`, `Serve`, `Give`, `FAQ`, `NotFound`).
- Assets: `public/images/<slug>.jpg` (8 files) — reference as `/images/<slug>.jpg` (absolute from root, Vite `publicDir` → `dist/images/` — upload alongside `dist/index.html`; singlefile inlines JS+CSS, not `public/`). Local keys: `heroFallback`/`chapel`/`sanctuary`/`garden`/`glass`/`hall`/`cemetery`/`feast`; CDN keys: `hero` (Wikimedia), `naveCdn`/`courtyardCdn` (Pexels) — `*Fallback` local via `SafeImage` `fallback` prop.
- Tests: `*.test.{ts,tsx}` adjacent to source — **11 files / 67 tests**: `src/utils/cn.test.ts` (5), `src/data/nav.test.ts` (7), `src/data/content.test.ts` (10), `src/data/site.test.ts` (6), `src/components/ui/Button.test.tsx` (9), `src/components/SkipLink.test.tsx` (3), `src/components/ui/Accordion.test.tsx` (6), `src/components/SafeImage.test.tsx` (6), `src/components/Header.test.tsx` (7), `src/components/BackToTop.test.tsx` (5), `src/pages/Ministries.test.tsx` (3) + `src/test/setup.ts` (jest-dom + IntersectionObserver mock + matchMedia stub). `vite.config.ts` `test.exclude` keeps `e2e/**` out of unit runs; `e2e/*.spec.ts` is Playwright only.

### Design System

- Tokens: see `src/index.css` `@theme`. Additions require design rationale in PR description. Tokens unchanged (24 colors + 2 shadows: `shrine-cream/parchment/parchment-dark/stone/ink/charcoal`, `maroon-50..950` (8), `gold-100..600` (5), `pine-500..700` (3), `terracotta-400/500` (2) + `shadow-shrine/shrine-lg`). Only the imagery/content they frame changed to Bukit Timah (Palladian 1853 church, Fr Teng's 1964 rebuild, Rosary Garden, cemetery, feast 1 May) — keep tokens stable.
- Typography scale: `Fraunces` for display/quote, `Source Sans 3` for body. Use `font-display` class for intentional display turns. `index.html` loads both with `preconnect`.
- Elevation: `shadow-shrine` (`0 20px 60px -20px rgba(51,16,15,.45)`) and `shadow-shrine-lg` (`0 40px 90px -30px rgba(51,16,15,.55)`). Use sparingly (hero, cards, emblem).
- Utilities: `text-balance`, `bg-adobe-texture`, `bg-grain`, `divider-weave`/`divider-weave-thin`, `gold-rule`/`gold-rule-left` (+ `gold-rule-draw` keyframe), `hero-ken-burns` (+ `hero-ken-burns` keyframe), `reveal`/`reveal-visible`, `skip-link`, `mask-fade-b`. `prefers-reduced-motion: reduce` disables `reveal` + `hero-ken-burns` + smooth scroll.
- Do not introduce purple gradients, `Inter` defaults, or generic card-grid templates — anti-generic enforcement (see Avant-Garde stance below).
- Reference skill: `avant-garde-design-v4` for direction when adding new sections; extract from stjoseph-bt.org.sg only via `agent-browser` workflows when explicitly requested.

### State & Data Layer

- No API or DB. Content arrays in `src/data/content.ts` (plus `site.ts` canonical facts, `nav.ts` nav) are the data layer. Validate shape with TypeScript interfaces (`TimelineEntry`, `GroundsPlace`, `Ministry`, `FaqItem`, `EventItem`, `GivingOption`, `Priest`, `PpcMember`) and the `images` const; add Zod schemas only if external data arrives.
- `EventItem` shape is `{ title, date, summary, category: Parish|Devotion|Formation|Archdiocese, href?: string }` — orig was `{ date, title, location, description, category: Feast|Pilgrimage|Formation|Community }`. Do not reintroduce `location`.
- `GivingOption` icons are Singapore-specific: `flame` (GIFT), `church` (collections), `sprout` (Boys' Town), `heart` (Mass offerings), `book` (cheque), `hand-heart` (SSVP), `landmark` (cash boxes), `globe` (PayNow UEN T08CC4043C) — replaces orig `[General Fund, Pipe Organ, Tepeyac Hill, Apla's Circle, Education & Formation, Hospitality Ministry, Shrine Church, Guatemala Mission]`.
- For future CMS integration (e.g., Sanity), isolate fetch + Portable Text rendering behind a `lib/cms` boundary and keep `content.ts` as the local fallback.

### Environment Variables

| Variable | Purpose | Example | Status |
|----------|---------|---------|--------|
| `VITE_*` | Client-exposed Vite vars (prefix required for `import.meta.env` exposure) | `VITE_MAPS_KEY=...` | None required yet — no `.env` contract; `site.ts` hard-codes `mapsUrl`/`mapsEmbedSrc` with Google `?api=1&query=` + `&output=embed` |
| _none_ | _No backend, no DB, no SSR_ | — | — |

When adding vars, document them here and in `.env.example`, and guard with `import.meta.env` typing in `src/env.d.ts`. `VITE_*` is the only prefix Vite exposes to the client. Never duplicate `site.ts` address/hours/mass across pages when a var is added — keep `site.ts` canonical.

### Accessibility & SEO

- `index.html` ships `lang="en"`, `viewport`, CSP, `description` ("Singapore's second-oldest Catholic parish…"), preconnected Google Fonts (Fraunces + Source Sans 3), and Open Graph (`og:title`/`og:description` = St Joseph's Bukit Timah + stjoseph-bt.org.sg). CSP allowlist: `default-src 'self'`, `script-src 'self' 'unsafe-inline'`, `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`, `font-src https://fonts.gstatic.com data:`, `img-src 'self' data: blob: https://images.pexels.com https://upload.wikimedia.org`, `frame-src https://www.google.com` (maps embed), `connect-src 'self'`.
- Header mobile toggle uses `aria-label` + `aria-expanded`; dropdowns expose `aria-expanded` + `description` on children via `primaryNav`. Mobile drawer traps scroll via `document.body.style.overflow`.
- Images: `alt` for content (`chapel`, `sanctuary`, `garden`, `glass`, `hall`, `cemetery`, `feast`, `naveCdn`/`courtyardCdn` fallbacks all have `imageAlt`; `grounds`/`ministries` cards preserve `imageAlt`), `alt=""` for decorative hero overlays (as `PageHero` does — no `aria-hidden` on the img itself).
- Skip link: `SkipLink.tsx` `preventDefault`s and focuses `#main-content` with `tabindex="-1"` + `scrollIntoView` — it never rewrites the hash (route loss under `HashRouter`). Covered by `src/components/SkipLink.test.tsx` (3 tests) and `e2e/navigation.spec.ts`.
- `Accordion` provides `aria-expanded`/`aria-controls`/`role="region"` + keyboard `ArrowDown`/`ArrowUp`/`Home`/`End` navigation.
- Keep color contrast ≥ 4.5:1 for body text (`shrine-ink` on `shrine-cream` meets it; verify new pairings — `shrine-cream/75` on `maroon-950` and `shrine-charcoal/80` on `cream` are the critical checks).
- `prefers-reduced-motion: reduce` disables `reveal`, `hero-ken-burns`, and smooth scroll via `@layer base`/`@layer utilities` overrides.

## Anti-Patterns to Avoid

- **Copy-paste from templates as truth** — verify every command in `package.json` before documenting it.
- **Extending `@theme` with one-off hex values** — add a named `shrine-*` token or reuse an existing one. Tokens 24+2 shadows are the budget.
- **Prop-drilling nav arrays** — consume `primaryNav` / `footerNav` directly from `data/nav.ts`; Header/Footer already do.
- **Converting `HashRouter` to `BrowserRouter` without a static-host fallback** — breaks deep-links on GitHub Pages/S3 unless you add a `404.html` redirect (e.g., `https://github.com/rafgraph/spa-github-pages`). Hash links must stay `/#/worship`, `/#/ministries#liturgical`.
- **Breaking alias routes** — external parish/school/programme links + printed bulletins depend on legacy paths (`/mass-times`, `/hours-location`, `/visit` → `/worship`; `/ministry` → `/ministries`; `/news-and-events` → `/news-events`; `/volunteer` → `/serve`; `/donate` → `/give`); keep aliases or add explicit redirects. The 7 aliases exist for this reason.
- **Alias desync** — changing `App.tsx` routes without updating `src/data/nav.ts` nav children/dropdown `Link to=` targets, or vice versa. Keep `to: "/worship#mass"` etc. in sync with `Worship` section `id`s and `Ministries` `id`s.
- **Using `<a href="#id">` instead of `<Link to="/path#id">`** — plain `#id` replaces the hash and routes to `NotFound` under `HashRouter`; `Ministries` jump nav and `Header` dropdowns must preserve the route.
- **Importing Google Fonts imperatively in components** — fonts belong in `index.html` + `@theme`; do not add runtime font loaders. CSP already whitelists `fonts.googleapis.com`/`fonts.gstatic.com`.
- **Bypassing `cn()` for conditional classes** — always merge via `cn()` so `tailwind-merge` deduplicates correctly (e.g., `variantClasses` in `Button`).
- **Adding a UI library without adopting its primitives** — if `shadcn/ui` (Radix) is introduced, use its primitives; do not rebuild Dialog/Dropdown from scratch.
- **Over-hydrating or adding SSR** — this is a static SPA; do not introduce server rendering or API routes without a deliberate architecture decision (`CLAUDE.md` isolates future CMS behind `lib/cms`).
- **Reintroducing Rother-era content or reassigning `site.ts` facts** — hours, mass, address, and `images` are the single source — don't duplicate them across pages or swap in Oklahoma/Guatemala place names, `700 SE 89th St`, or `Tepeyac Hill` imagery. `site.ts` is canonical; pages render from it.
- **Bare `<img>` for CDN sources** — every Wikimedia/Pexels image must go through `SafeImage` with `fallback` to `/images/hero-church.jpg` or explicit `images.*Fallback`.
- **Ignoring `noUnusedLocals`/`noUnusedParameters`** — `tsc --noEmit` will fail on dead code; clean before commit.

## Success Metrics

You are done when:

- `pnpm lint`, `pnpm typecheck`, `pnpm test` (11 files / 67 tests), `pnpm test:e2e` (27 tests, chromium), and `pnpm build` are all green (94 total — 11 unit files + 4 E2E specs via `lint && typecheck && test && test:e2e && build`).
- All 10 pages + 7 alias paths in 5 groups (`/worship`↔`/mass-times`↔`/hours-location`↔`/visit`; `/ministries`↔`/ministry`; `/news-events`↔`/news-and-events`; `/serve`↔`/volunteer`; `/give`↔`/donate`) + 9 hash anchors (`#mass`/`#confession`/`#visit` on `/worship` + `#liturgical`/`#faith-formation`/`#pastoral-care`/`#family-life`/`#youth`/`#mandarin` on `/ministries`; plus `/serve` has no anchors) navigate correctly, including direct hash URLs on static hosts (HashRouter, no 404.html needed, `Layout`'s double-hash `resolveAnchor` survives `/#/ministries#liturgical`).
- Header is fixed, `useScrolled(16)` translucency works (transparent at top of Home → `maroon-950/92` blur on scroll), top bar (`lg`) shows `620 Upper Bukit Timah Road · Feast of St Joseph the Worker · 1 May` + `Give →/give`, mobile drawer closes on navigation (`aria-expanded`), desktop Worship/Ministries dropdowns show children + `description`, and keyboard + `SkipLink` (`#main-content`, hash-preserving, `tabindex="-1"`) covers all nav items.
- Content renders from `src/data/*` without inline duplication: `content.ts` 8 interfaces (1845–2017 timeline, `grounds` 3, `ministries` 6 with jump nav, `faqs` 6 SG, `upcomingEvents` 6 Parish/Devotion/Formation/Archdiocese with optional `href`, `givingOptions` 8 SG, `priests` 3, `ppcMembers` 16, `serveRoles` 4, `devotions` 6, `images` 11) + `site.ts` hours 5 keys + mass 7 keys + address/CSP/phones/transport/feast/UEN + nav `primaryNav` 6 / `footerNav` 10; new tokens live in `src/index.css` `@theme` (24 colors + 2 shadows).
- `SafeImage` fallback verified (CDN→local `/images/hero-church.jpg` on `route.abort` of `wikimedia.org`/`pexels.com`), no `any`, no unused locals/params, no missing `imageAlt`/`alt` on content images, every `PageHero` supplies `image`+`fallback`, `NotFound` reads "This path does not lead to the church" + offers `Return home` → `/` and `Mass times` → `/worship`, CI artifacts green.

## System Integration

### Available Tools (in this workspace)

- `read` / `write` / `edit` / `bash` / `fd` / `rg` / `agent_browser` (prefer native `agent_browser` tool — do not run direct `agent-browser` bash unless debugging) / `subagent_spawn` / `workflow` — standard Pi harness.
- `skills` is vendored, git-tracked reference content (index: `skills/skills-catalog.md`) — not project source. Do not import from or lint it; `eslint.config.js` `ignores` + `tsconfig` excludes it. Vendored size can trigger `ENOSPC` — see Vite `server.watch.ignored` note.

### Related Skills

- `framework-templates` — companion to `claude-md` for framework sections (Vite+React used here).
- `avant-garde-design-v4` / `super-frontend-design` / `claude-design` — when refining parish aesthetics (warm editorial, Palladian church, Rosary Garden, cemetery — not Tepeyac Hill).
- `webapp-testing-journey` / `agent-browser` / `playwright-cli` — when exercising journeys or visual QA (use `agent_browser` native tool for `HashRouter` hash-aware navigation).
- `verification-and-review-protocol` — before claiming work done.
- `lint-and-validate` / `clean-code` / `testing-patterns` / `tdd-workflow` — quality gates (Red→Green→Refactor for the test rewrite).

## Continuous Improvement

- When a command is added to `package.json` scripts, update the Build Commands table and note if it is hollow/stale.
- When a token or utility is added to `src/index.css`, document its intent in this file and in a code comment (`@theme` or `@layer`).
- When a route alias or hash anchor is added or removed, update `App.tsx`, `src/data/nav.ts` nav children, the Routing Contract table, and the Architecture hash-anchor rows together.
- When a new `GivingOption` icon or `EventItem` category is added, update the `GivingOption.icon` / `EventItem.category` union and this file's Data section.
- Re-audit this file after any framework bump (React 19, Vite 7, Tailwind 4) or after restoring tests/lint/CMS — verify counts via `fd` and grep `src/App.tsx` for `Route` entries.
- Keep `README.md` + `AGENTS.md` + this file in sync on version, routing, and data shape after every port change.

---

### Validation Checklist (for maintainers)

| # | Section | Required | Present |
|---|---------|----------|---------|
| 1 | Core Identity & Purpose (Bukit Timah 620 Upper Bukit Timah Road, 1846, St Joseph the Worker 1 May) | Yes | ✅ |
| 2 | Foundational Principles (Six-Phase) | Yes | ✅ |
| 3 | Implementation Standards (General + TS Strict + Vite 7 + React 19 + Tailwind v4 CSS-first + Components) | Yes | ✅ |
| 4 | Development Workflow (Env Setup + Build Commands) | Yes | ✅ |
| 5 | Testing Strategy (wired — 11 unit files / 67 tests + 27 E2E) | Yes | ✅ |
| 6 | Code Quality Standards (Lint + Type Safety + Styling) | Yes | ✅ |
| 7 | Git & Version Control (branching + Conventional Commits + CI Node 24/pnpm 11 + HashRouter deploy) | Yes | ✅ |
| 8 | Error Handling & Debugging (SafeImage / NotFound "does not lead to the church" / Layout scroll) | Yes | ✅ |
| 9 | Communication & Documentation (parish-specific why, docs/prompts.md, alias preservation) | Yes | ✅ |
| 10 | Project-Specific Standards (Architecture 42-file tree + Data ownership 8 interfaces/11 images + Routing 17/7/9 + File Org) | Yes | ✅ |
| 11 | Success Metrics (10 pages + 7 aliases + 9 anchors + Singapore content from data/* + tokens 24+2) | — | ✅ |
| 12 | System Integration (tools + skills vendored note) | — | ✅ |
| 13 | Anti-Patterns to Avoid (11: hex, alias desync, `<Link>` vs `<a>`, HashRouter, SafeImage, noUsed, etc.) | — | ✅ |
| 14 | Continuous Improvement (re-audit after bumps/tests/CMS) | — | ✅ |

