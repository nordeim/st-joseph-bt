# Round-2 "Sacred Polish" — Design Enhancement Plan & Validation (2026-08-29)

**Baseline:** `0885fae` (post "Sacred Motion" + audit remediation, v1.1.0 working tree)
**Evidence sources:** `docs/UI_UX_Design_Comparison_RotherShrine_vs_StJoseph.pdf` (8-dimension comparison, 2026-08-29) + live-site DOM/computed-style probe of `https://st-joseph.jesspete.shop/` (desktop 1440×900 + mobile 375×812, 2026-08-29)
**Scope:** Visual attraction, aesthetics, UI/UX, and animation enhancements identified for st-joseph-bt — executed TDD-first (unit contract → implementation → E2E audit), all commits on `main`.

**Gate before (HEAD 0885fae):** `lint 0 / typecheck 0 / test 11 files·67 / e2e 27 / build 384.6kB`
**Gate after (this round):** `lint 0 / typecheck 0 / test 16 files·89 / e2e 35 / build 389.70kB gzip 113.98kB` — **all 5 green**

## 1. Findings addressed (from comparison report + live probe)

| # | Finding | Evidence | Severity |
|---|---------|----------|----------|
| F-1 | Dark maroon-900 CTA band headings inherit the global `h1–h4 → text-shrine-maroon-700` base rule (`src/index.css:76`) and render at **1.26:1 rendered** (theoretical 1.39:1) on maroon-900 — WCAG-failing "invisible heading" on Home "Belong here", Serve "Neighbourhood", Give "Ready to give?" bands. Same systemic root cause verified on the Rother Shrine live site. | Live computed-style probe 2026-08-29 | Critical (a11y) |
| F-2 | Head/identity debt: no favicon, no `theme-color`, partial OG (title/description/type only — no `og:url`/`og:site_name`/`og:locale`/`og:image`), no Twitter card, no structured data. Browser tabs and social share cards render unbranded. | Live DOM probe (0 icon links, 0 JSON-LD scripts) | High |
| F-3 | No route-change feedback: page content swaps instantly under HashRouter; every other surface (hero, drawer, dropdown, accordion) animates except the page shell itself. | Code audit (`Layout.tsx` bare `<Outlet/>`) | Medium (motion coherence) |
| F-4 | No reading-depth cue on long editorial pages; BackToTop appears at 480px with no destination context. | Code audit | Medium (UX affordance) |
| F-5 | Mobile drawer does not mark the active route (`aria-current` exists only on desktop nav) — parity + a11y gap on small screens. | Code audit (`Header.tsx` drawer links) | Medium (a11y parity) |
| F-6 | Unbranded native scrollbar (UA default) on Windows/ChromeOS breaks the maroon/parchment frame at full-page height. | Aesthetic review | Low (polish) |
| F-7 | Home hero kicker `Saint Joseph's Church · Bukit Timah · 圣若瑟堂` can wrap mid-token at narrow viewports (orphaned `·`). | Visual review | Low (typography) |

## 2. Plan items executed (TDD: contract test first, then implementation)

| ID | Item | Files | Test contract (written first) |
|----|------|-------|-------------------------------|
| P-1 | **CTA-band heading contrast** — explicit `text-shrine-cream` on the three dark-band `h2`s (17.5:1 AAA on maroon-900) | `src/pages/Home.tsx`, `src/pages/Serve.tsx`, `src/pages/Give.tsx` | `src/pages/cta-bands.test.tsx` (3) — each band h2 carries `text-shrine-cream` |
| P-2 | **Head completeness** — `public/favicon.svg` (gold "J" monogram on maroon-950, matches Emblem language), `theme-color #200a0a`, full OG (`url`/`site_name`/`locale en_SG`/`image`+`image:alt`), `twitter:card summary_large_image`, Church JSON-LD (`name`/`alternateName`/`address`/`openingHours`/`sameAs`) | `index.html`, `public/favicon.svg` | `src/head.test.ts` (6) — favicon, theme-color, OG trio, absolute og:image, twitter card, JSON-LD drift-checked against `site.ts` (telephone/address/zip parsed and compared) |
| P-3 | **Keyed page-in route transition** — `<Outlet/>` wrapped in `key={pathname}` container with `.page-in` (300ms, cubic-bezier(0.22,1,0.36,1), translateY(10px)→0); hash-only updates keep the same DOM node so `Layout`'s anchor-scroll effect is undisturbed | `src/components/Layout.tsx`, `src/index.css` (`@keyframes page-in` + `.page-in`) | `src/components/Layout.test.tsx` (2) — container tagged `data-route`, re-keys on navigation |
| P-4 | **Scroll-progress rail + BackToTop ring** — new `useScrollProgress()` (0..1, rAF-throttled, unscrollable-document guard, clamped) shared by a hairline gold rail at the header's bottom edge (`scaleX`, transform-only, `aria-hidden`) and an SVG ring inside BackToTop (`stroke-dashoffset` fills with depth) | `src/hooks/useScrollProgress.ts`, `src/components/ScrollProgress.tsx`, `src/components/Header.tsx`, `src/components/BackToTop.tsx` | `src/hooks/useScrollProgress.test.ts` (4) + `src/components/ScrollProgress.test.tsx` (2) + `BackToTop` ring test (+1) — both indicators share one source so they can never disagree |
| P-5 | **Drawer active-route parity** — leaf links get `aria-current="page"` + gold; a parent section gets `aria-current="true"` + gold when any child route is active; items enter with a 40ms `drawer-item-in` stagger | `src/components/Header.tsx`, `src/index.css` (`@keyframes drawer-item-in`) | `Header.test.tsx` (+4) — rail present, leaf `page`, parent `true`, stagger delays 0/40ms |
| P-6 | **Themed scrollbar** — maroon-600 thumb on parchment track (WebKit + `scrollbar-color`/`scrollbar-width`), hover maroon-500 | `src/index.css` (`@layer base`) | Visual (no behavioral contract to unit-test; verified in preview) |
| P-7 | **Hero kicker wrap safety** — three `whitespace-nowrap` spans so the `·` separators can never orphan | `src/pages/Home.tsx` | Covered by smoke hero assertions (unchanged classes) |

## 3. Validation evidence (post-implementation)

### 3.1 Five-gate results (single shell, exit codes)

```
pnpm lint      → eslint . --max-warnings 0            — EXIT 0
pnpm typecheck → tsc --noEmit (strict)                — EXIT 0
pnpm test      → vitest run — 16 files / 89 passed    — EXIT 0  (was 11/67)
pnpm test:e2e  → playwright chromium — 35 passed     — EXIT 0  (was 27)
pnpm build     → dist/index.html 389.70kB gzip 113.98kB + dist/images/8 — EXIT 0
```

### 3.2 E2E Round-2 audit (`e2e/enhancements.spec.ts`, 8 tests — all green)

1. Dark CTA-band `h2` computed color is `rgb(250, 246, 236)` on `/`, `/serve`, `/give` (was maroon-700 1.26:1 → **17.5:1 AAA**).
2. Head completeness: favicon link, `theme-color #200a0a`, `og:image`, `og:url`, `twitter:card`, JSON-LD `@type: Church` with SG address/phone.
3. `GET /favicon.svg` → 200, `image/svg` content-type.
4. Route change replays the `.page-in` wrapper (`animation-name: page-in`, `data-route` updates).
5. Hash-only navigation (`/worship` → `/worship#mass`) keeps the same keyed node (`data-route` unchanged) — anchor-scroll contract intact.
6. Scroll-progress rail fills with depth (`matrix(0,…)` → `matrix(0.9…)` at bottom).
7. BackToTop ring `stroke-dashoffset` < half circumference at page bottom.
8. Mobile drawer (390×844): `/serve` leaf gets `aria-current="page"` + `rgb(226, 191, 114)`; `/history` marks the About parent `aria-current="true"`.

### 3.3 Motion & reduced-motion compliance

- New animations (`page-in`, `drawer-item-in`, scroll rail/ring) are opacity/transform-only (GPU-composited, no layout thrash); rail/ring update inside a single `requestAnimationFrame`.
- `prefers-reduced-motion: reduce` already disables the utility animation layer globally in `src/index.css`; the rail/ring are state-driven (not keyframe-driven) and render instantly at the correct value — no motion added for reduced-motion users.
- `BackToTop` still never touches the URL hash (HashRouter contract preserved); click behavior and 480px threshold unchanged.

### 3.4 WCAG summary after Round-2

| Surface | Before | After |
|---|---|---|
| Home/Serve/Give dark-band h2 (maroon-700 on maroon-900) | 1.26:1 rendered (FAIL) | 17.5:1 (cream, AAA) |
| Drawer active link (gold-300 `#e2bf72` on maroon-950) | — (not marked) | 10.75:1 (AAA) |
| Body/AAA charcoal items (Round-1) | — | unchanged, still green |

### 3.5 Deviations & notes

- `package.json` version bumped `1.0.0 → 1.1.0` (feature-grade round; badge, SKILL front-matter, AGENTS/README tables aligned).
- Docs re-inventoried: `README.md`, `AGENTS.md`, `CLAUDE.md`, `rothershrine-v2_SKILL.md` now state 16 unit files / 89 tests + 35 E2E (5 specs), 52 `src/` files, 24 utilities + 8 keyframes + themed scrollbar, favicon/OG/JSON-LD head inventory.
- The `og:image` points at `https://st-joseph.jesspete.shop/images/hero-church.jpg` (absolute, as social crawlers require); it resolves once the rebuilt bundle re-publishes.
- No new branches; all work committed on `main`.
