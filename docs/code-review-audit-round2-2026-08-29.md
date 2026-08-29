# Code Review Audit — Round-2 "Sacred Polish" (`4b46395..6be1715`)

**Date:** 2026-08-29 (follow-up to `docs/code-review-audit-2026-08-28.md` + `docs/ui-ux-remediation-plan-2026-08-28.md`)
**Range:** `4b46395..6be1715` — 28 files, 914+/67-, 4 commits (`f88d9b2` feat + `6be1715` docs-sync + 3 binary uploads)
**Reviewer:** Claw Code (automated audit + live 5-gate run, 2026-08-29 15:19 SGT)
**Baseline gate before:** `lint 0 / typecheck 0 / test 11/67 / e2e 27 / build 384.6kB` (per `docs/design-enhancement-round2-2026-08-29.md`)
**Gate after (verified live):** `lint 0 / typecheck 0 / test 16/89 / e2e 35 (5 specs) / build 390.25kB gzip 114.00kB` — **all 5 green**

---

## 1. Executive Verdict

**PASS with minor polish debt — safe to ship / already shipped on `main`.** The round delivers what it promised: 7 findings F-1..F-7 closed TDD-first, zero gate regressions, zero alias/route/hash regressions, zero token/CSP/SSR violations detected. No Critical or High blocking defect remains. 4 Low polish items are flagged below for the next tidy pass (none block release).

```
lint      → eslint . --max-warnings 0                 EXIT 0
typecheck → tsc --noEmit (strict, noUnusedLocals)     EXIT 0
test      → vitest run 16 files / 89 passed           EXIT 0
test:e2e  → playwright chromium 35 passed (53.4s)     EXIT 0
build     → vite build → dist/index.html 390.25kB     EXIT 0
          + dist/images/8 (2.5M) copied, not inlined
```

**What was verified:** CTA contrast AAA, head completeness (favicon/theme-color/OG/twitter/JSON-LD), keyed `page-in` route transition with hash-only stability, shared `useScrollProgress` rail+ring (rAF, clamped, guarded), drawer `aria-current` parity + stagger, themed scrollbar, kicker nowrap — all backed by unit contract + 8 E2E `enhancements.spec.ts` (green on live re-run).

---

## 2. Scope & Inventory

| Bucket | Files | Delta |
|---|---|---|
| **Source (10)** | `hooks/useScrollProgress.ts` NEW, `components/ScrollProgress.tsx` NEW, `Header.tsx`, `BackToTop.tsx`, `Layout.tsx`, `index.html`, `index.css`, `pages/Home.tsx`, `pages/Serve.tsx`, `pages/Give.tsx`, `public/favicon.svg` NEW |  |
| **Tests (7)** | `hooks/useScrollProgress.test.ts` NEW, `components/ScrollProgress.test.tsx` NEW, `components/Layout.test.tsx` NEW, `head.test.ts` NEW, `pages/cta-bands.test.tsx` NEW, `BackToTop.test.tsx` +ring, `Header.test.tsx` +4 drawer/rail | 67 → 89 |
| **E2E** | `e2e/enhancements.spec.ts` NEW (8) | 27 → 35 |
| **Docs** | `AGENTS.md`, `CLAUDE.md`, `README.md`, `rothershrine-v2_SKILL.md`, `docs/design-enhancement-round2-2026-08-29.md`, coverage PDF/HTML/zip | re-inventoried to 16/89 + 35 |
| **No-change** | `package.json` **only** version `1.0.0→1.1.0`; deps unchanged (all pinned exact, `pnpm 11`, `node≥20`); `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `playwright.config.ts`, `App.tsx`, `data/*`, `SafeImage`, `PageHero`, `Accordion`, `cn` untouched | intentional |

Routing contract unchanged — `App.tsx` 17 entries (16 content + `*`), 5 alias groups / 7 paths, 9 hash anchors, `HashRouter` — verified (see §3).

---

## 3. Findings — Severity-Ranked

> **Scale:** `C1` Critical (blocks deploy/route), `H` High (blocks type/build or WCAG fail), `M` Medium (functional nit, a11y parity, drift), `L` Low (cosmetic, docs, polish). All entries are evidence-backed with `file:line`.

### 3.1 Structural / Correctness — PASS

| # | Severity | Location | Finding | Evidence | Verdict |
|---|---|---|---|---|---|
| S-01 | — | `src/App.tsx:14-40` | HashRouter + 17 routes intact, aliases preserved | `rg "Route.*path"` → all 16 paths + `*`; no `BrowserRouter` | **PASS** |
| S-02 | — | `vite.config.ts:15` ↔ `tsconfig.json:19-21` | `@` alias `path.resolve(__dirname,"src")` ↔ `paths {"@/*":["src/*"]}` + `baseUrl "."` synced | `grep alias` + `grep paths` match; `tsc 0` proves it | **PASS** |
| S-03 | — | `src/index.css:1` | Tailwind v4 CSS-first `@theme` only, no `tailwind.config.*` introduced | `ls tailwind.config.*` → none; tokens 24c+2s via `@theme` | **PASS** |
| S-04 | — | `index.html:11` | CSP still `img-src 'self' data: blob: https://images.pexels.com https://upload.wikimedia.org; frame-src https://www.google.com;` — allowlist matches `images.hero/naveCdn/courtyardCdn` | `grep CSP` + `rg upload.wikimedia` | **PASS** |
| S-05 | — | `src/data/nav.ts` ↔ `App.tsx` | `primaryNav` children `to: "/worship#mass"` etc. in sync with `Worship.tsx` `id="mass"` etc. and `Ministries.tsx` 6 ids | `rg "worship#\|ministries#"` nav vs pages | **PASS** |
| S-06 | **M** | `src/components/BackToTop.tsx:42` | `className="relative fixed bottom-6…"` — `relative` and `fixed` conflict; `tailwind-merge` (`cn()`) keeps last → `fixed` wins, `relative` is dead code; SVG `absolute inset-0` still works (fixed is positioned), but intent is confusing | `node -e twMerge("relative fixed") → "fixed"` live-probed; `twMerge("fixed relative") → "relative"` | **Polish — not breaking.** Fix: remove `relative` (keep plain `fixed`); button is already a positioned ancestor for the ring. |
| S-07 | **M** | `index.html:22/27/41` + `src/data/site.ts` | OG/JSON-LD canonical domain `https://st-joseph.jesspete.shop/` hard-coded in 3 places in `index.html`, not derived from `site.ts`; `site.ts` has no `origin`/`url` field — domain move would require 4+ manual edits and `src/head.test.ts` would fail independently | `rg jesspete` → 3 in `index.html` + 2 in `head.test.ts`; `rg origin\|url` in `site.ts` → only `mapsUrl` | **Debt — not blocking.** Recommend `site.origin = "https://st-joseph.jesspete.shop"` (or env) and template `og:url`/`og:image`/`jsonld.url` from it; update `head.test.ts` to assert `${site.origin}/` prefix. |
| S-08 | **L** | `public/favicon.svg:2` | `rect fill="#33100f"` (maroon-900) vs `index.html:15` `theme-color="#200a0a"` (maroon-950) — 1-step mismatch; favicon circle `stroke #e2bf72` matches gold-300 correctly | `cat favicon.svg` vs `grep theme-color` | **Cosmetic.** Align favicon `rect fill` to `#200a0a` to match browser chrome. |

### 3.2 Token & Style Discipline — PASS

| # | Location | Check | Result |
|---|---|---|---|
| T-01 | `src/**/*.tsx` (excl tests) | No `bg-[#…]` / `text-[#…]` arbitrary hex — only `shrine-*` tokens | `rg "bg-\[\|text-\[" → empty` — **PASS** |
| T-02 | `src/index.css:4-32` | All hex lives only in `@theme` (24c+2s), no ad-hoc hex in components | `rg "\#[0-9a-f]" src/**/*.tsx → none` — **PASS** |
| T-03 | `src/components/*` | All class merges via `cn()` (24 call sites) — no template-literal `className={`…${cond?…`}` | `rg "className=\`" → empty; rg "cn\(" → 24` — **PASS** |
| T-04 | `src/index.css:74` | Global `h1–h4 → text-shrine-maroon-700` base rule is what caused F-1; CTA fix uses explicit `text-shrine-cream` on dark bands to override — correct pattern (not arbitrary hex) | see `Give.tsx:85`, `Serve.tsx:53`, `Home.tsx:231` — **PASS** |

### 3.3 Per-File Correctness

#### `hooks/useScrollProgress.ts` — PASS (model patch)

- `max = scrollHeight - innerHeight` — guarded `max>0 ? clamp(0..1) : 0` handles jsdom unscrollable (`0`→`0`), midpoint `(600/1200)=0.5`, overscroll clamped to `1`.
- rAF throttle: `schedule()` sets `raf=requestAnimationFrame(update)` only if `raf===0`; `update()` resets `raf=0` then `setProgress(...)`. `useEffect` registers `scroll`+`resize` as `passive:true`; cleanup cancels pending rAF and removes listeners. Verified live-parity with `ScrollProgress`+`BackToTop` (single source so indicators cannot disagree).
- **Nit (L):** Does not observe `MutationObserver`/`ResizeObserver` for dynamic height changes (e.g., accordion open). Not needed for current static content; could be added if content grows.

#### `components/ScrollProgress.tsx` — PASS

- `absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-shrine-gold-500 via-shrine-gold-300 to-shrine-gold-500` + `style={{transform: \`scaleX(${progress})\`}}` — **transform-only, GPU-friendly, no layout thrash**. `aria-hidden="true"` + `pointer-events-none` + `data-testid="scroll-progress"` — decorative, correct. Parent is `header` (`fixed`) → positioned ancestor for `absolute`; `origin-left` correct.
- Contract: `scaleX(0)` at top, advances toward `1` at bottom — E2E polls `getComputedStyle(transform)` from `matrix(0…)` → `matrix(0.9…)` (green).

#### `components/Header.tsx` — PASS

- Imports + renders `<ScrollProgress />` at header bottom edge (`<Container>…</Container>` then `<ScrollProgress />` then `{mobileOpen? drawer}`) — correct DOM order, rail sits on header chrome not on drawer.
- Drawer parity: `drawerChildActive = children.some(c=>c.to.split("#")[0]===pathname)` → parent button gets `aria-current="true"` + `text-shrine-gold-300` when any child route active; leaf `Link to=item.to` gets `aria-current="page"` + gold when `pathname===to`. Verified by `Header.test.tsx` (+2 leaf/parent) and E2E mobile 390×844 `/serve` leaf `page` + `/history` parent `true` with `rgb(226,191,114)`.
- Stagger: `<li class="drawer-item-in" style={{animationDelay: index*40ms}}>` + final `Give` item at `primaryNav.length*40ms` — `Header.test.tsx` asserts `0ms`/`40ms` and `getAllByRole("listitem").length>2`.
- Preserved contracts: `onClickCapture` drawer close on any inner `<a>` (same-route tap), `Escape` + `useEffect([pathname,hash])` close, `desktop dropdown` hover+focus+blur capture, `useScrolled(16)` intentional mismatch, `aria-expanded`/`aria-haspopup`.

#### `components/BackToTop.tsx` — PASS with polish note

- Now consumes `useScrollProgress()` (`progress 0..1`) + renders SVG ring: `RING_RADIUS=20`, `CIRCUMFERENCE=2πr≈125.66`, `strokeDasharray=CIRCUMFERENCE`, `strokeDashoffset=CIRCUMFERENCE*(1-progress)`. Top `offset≈CIRC` (empty), mid `≈CIRC/2` (half), bottom `0` (full). Covered by `BackToTop.test.tsx` (+1 ring test) and E2E `stroke-dashoffset < CIRC/2` at bottom.
- Threshold/visibility/hash-safe `scrollTo` untouched (`480`, `aria-hidden+tabIndex-1+pointer-events-none` when hidden, `matchMedia prefers-reduced-motion` → `auto` else `smooth`).
- **Polish:** line 42 `relative fixed` — see S-06.

#### `components/Layout.tsx` — PASS

- `key={pathname}` (not `pathname+hash`) + `data-route={pathname}` + `className="page-in"` — route change remounts and replays `page-in` (300ms), hash-only (`/worship→/worship#mass`) keeps same node so `Layout` anchor-scroll (`80ms setTimeout + resolveAnchor double-hash` + fallback `window.scrollTo`) is undisturbed. `Layout.test.tsx` (2) and E2E 4+5 verify both.
- `resolveAnchor(pathname,hash)` still double-hash aware (`split "#".filter(Boolean)` + strip `/` + `cleaned===pathname` guard). No regression.

#### `index.css` — PASS

- New `@keyframes page-in {0:opacity0+translateY10px → 1:opacity1+translateY0}` + `.page-in {animation: page-in 0.3s cubic-bezier(0.22,1,0.36,1) both}` — transform/opacity only.
- New `@keyframes drawer-item-in {from translateX(-8px) → to 0}` + `.drawer-item-in {animation: … 0.3s … both}` — transform/opacity only, stagger via inline `animationDelay`.
- Themed scrollbar: `html {scrollbar-color: maroon-600 parchment; scrollbar-width: thin;}` + `::-webkit-scrollbar {width:10px}` / `track: parchment` / `thumb: maroon-600 border 2px parchment radius 8px` / `thumb:hover: maroon-500` — Firefox + WebKit split, correct. No behavioral test (visual, as noted in plan P-6).
- **Nit (L):** Reduced-motion: new `page-in`/`drawer-item-in` rely on global `* {animation-duration:0.01ms !important}` in `@media (prefers-reduced-motion: reduce)`. The explicit `@media` override block only lists `.reveal/.hero-ken-burns/.dot-pulse::after`; adding `page-in/drawer-item-in` explicitly (`animation:none`) would be clearer, though functionally identical today.

#### `pages/Home.tsx` / `Serve.tsx` / `Give.tsx` — PASS (Critical a11y fix)

- Dark `bg-shrine-maroon-900` bands: `h2` now `text-shrine-cream` explicitly — defeats global `h1–h4 → maroon-700` base rule. Theoretical `cream #faf6ec` vs `maroon-900 #33100f` = **15.93:1** (node luminance calc), docs claim `17.5:1` on `maroon-950` — both **AAA** (was `maroon-700 #55191a` on `maroon-900` = **1.26:1 rendered FAIL**). `cta-bands.test.tsx` (3) checks `className` and E2E checks computed `rgb(250,246,236)` — double gate.
- Kicker `Saint Joseph's Church · Bukit Timah · 圣若瑟堂` now three `whitespace-nowrap` spans — `·` never orphans. Smoke hero assertions unchanged (class-preserving), not regressed.

#### `index.html` — PASS (head completeness)

- Added: `theme-color #200a0a` (maroon-950 — matches deepest maroon token), `favicon.svg` link (`image/svg+xml`), `og:url/site_name/locale en_SG`, `og:image` absolute `https://st-joseph.jesspete.shop/images/hero-church.jpg` + `og:image:alt`, `twitter:card summary_large_image`, Church `JSON-LD` (`@type Church`, `name=site.name`, `alternateName [圣若瑟堂, St Joseph's Bukit Timah]`, `telephone=+65 6769 1666`, `address PostalAddress 620 Upper Bukit Timah / SG 678116`, `openingHours Mo-Su 08:00-21:00`, `sameAs [facebook, catholic.sg]`). `head.test.ts` (6) drift-checks `telephone/street/zip` vs `site.ts` — guards domain move only partially (see S-07). CSP unchanged.
- Copy/paste fidelity: `og:title/og:description` unchanged, `og:type website` preserved.

#### `public/favicon.svg` — PASS

- 48×48 `rx:10` maroon rect + gold `J` monogram + subtle circle ring — matches Emblem language, renders as `image/svg`. `GET /favicon.svg → 200 image/svg` E2E green. Content is static, no CSP impact.

### 3.4 Security — PASS

| # | Check | Result |
|---|---|---|
| SEC-01 | No `dangerouslySetInnerHTML` / `innerHTML` / `eval` / `Function(` in `src/` | `rg` empty — **PASS** |
| SEC-02 | JSON-LD is a static inline `<script type="application/ld+json">` with no interpolation of user input | **PASS** — not an XSS vector |
| SEC-03 | No secrets: `T08CC4043C` (public UEN), `+65 6769 1666` etc. are canonical parish facts | **PASS** |
| SEC-04 | CSP not weakened (`base-uri 'self'`, `form-action 'self'` still present) | **PASS** |

### 3.5 Performance & Motion — PASS

| # | Check | Result |
|---|---|---|
| PERF-01 | No dynamic `import()` / `React.lazy` / code-split — `viteSingleFile` still single `dist/index.html` | `rg "import\("` empty — **PASS** |
| PERF-02 | New keyframes are **transform/opacity only** — GPU-composited (`page-in translateY(10px)`, `drawer-item-in translateX(-8px)`) | **PASS** |
| PERF-03 | `useScrollProgress` rAF throttle — single rAF, single state update per frame; `ScrollProgress` + `BackToTop` **share one hook** so two visual sinks never disagree; second listener is `BackToTop` visibility (`scrollY>480`) — total 2 scroll listeners + 1 rAF loop | **PASS** |
| PERF-04 | Bundle `384.6kB → 390.25kB (+5.65kB, +1.5%)` — no deps added, `singlefile` inlines clean, `dist/images/8` still external (2.5M) | **PASS** |
| PERF-05 | Reduced-motion: global `* {animation-duration:0.01ms}` kills page-in/drawer-item-in; rail/ring are **state-driven `scaleX`/`strokeDashoffset`** not keyframe-driven → render instantly at correct value for reduced-motion users | **PASS** |

### 3.6 WCAG AAA — PASS

| Surface | Contrast | Ratio | Verdict |
|---|---|---|---|
| Dark CTA `h2` cream `#faf6ec` on `maroon-900 #33100f` | AAA | **15.93:1** (node calc; docs claim 17.5:1 on maroon-950 — both AAA) | **PASS — was 1.26:1 FAIL** |
| Drawer leaf gold-300 `#e2bf72` on maroon-950 `#200a0a` | AAA | **10.75:1** | **PASS — new mark, not previously tracked** |
| Cream `#faf6ec` on maroon-950 | AAA | 17.54:1 | **PASS** |
| Previous body pairs (`shrine-ink #2a2115` on cream etc. per `rothershrine-v2_SKILL.md:8.1`) | AAA | ~13:1 / ~10:1 | **Unchanged — green** |
| `aria-current` contract — leaf `page` vs parent section `true` (distinct) | spec | — | **PASS** (spec-correct per ARIA) |
| Decorative `ScrollProgress` `aria-hidden="true"` | spec | — | **PASS** |
| `BackToTop` hidden `aria-hidden+tabIndex-1+pointer-events-none` | spec | — | **PASS** (contract preserved) |

Calculated via `relative luminance` (`0.2126R+0.7152G+0.0722B`) — values cross-checked against `docs/design-enhancement-round2-2026-08-29.md` (§3.4).

### 3.7 Tests & E2E — PASS (full re-run)

| Suite | Expected | Got |
|---|---|---|
| `pnpm test` | 16 files / 89 | **16/89** (utils/cn 5 + nav 7 + content 10 + site 6 + Button 9 + SkipLink 3 + Accordion 6 + SafeImage 6 + Header 11 + BackToTop 6 + Ministries 3 + cta-bands 3 + Layout 2 + useScrollProgress 4 + ScrollProgress 2 + head 6) |
| `pnpm test:e2e` | 35 (smoke 11 + navigation 8 + ministries 4 + give-faq 4 + enhancements 8) | **35/35 (53.4s, chromium)** — enhancements 8/8 green |

Contract: `utils/cn` 5, `data/nav` 7, `data/content` 10, `data/site` 6, `ui/Button` 9, `SkipLink` 3, `ui/Accordion` 6, `SafeImage` 6, `Header` 11 (+4 rail/aria-current/stagger), `BackToTop` 6 (+1 ring), `Ministries` 3, `cta-bands` 3, `Layout` 2, `useScrollProgress` 4, `ScrollProgress` 2, `head` 6. All adjacent to source, `vite.config.ts test.include src/**/*.{test,spec}.{ts,tsx}` + `exclude e2e/**` honoured.

### 3.8 Docs Drift — CLOSE

| File | Claim | Actual | Verdict |
|---|---|---|---|
| `AGENTS.md:22` | `16 files / 89 tests` | 16/89 | **aligned** |
| `AGENTS.md:33` | `src/ (45 files — 33+11+1)` | **52 files — 35+16+1** (`find src -type f \| wc -l = 52`) | **Stale — L.** `CLAUDE.md:275` correctly says `52 — 35+16+1`. Fix `AGENTS.md` line 33 to match. |
| `AGENTS.md:36` | `22 utilities … + 6 keyframes` | **24 utilities + 8 keyframes** (`page-in`, `drawer-item-in` added, themed scrollbar) | **Stale — L.** `CLAUDE.md:278` correctly says `24 … + 8 … + themed scrollbar`. Fix `AGENTS.md` 36. |
| `CLAUDE.md` / `README.md` / `rothershrine-v2_SKILL.md` | `16/89 + 35 E2E (5 specs)`, `52 src`, `v1.1.0`, head inventory | verified | **aligned** |
| `package.json` | `1.1.0` | `1.1.0` | **aligned** |
| `src/index.css` | `@theme 24c+2s` | 24c+2s via `@theme` | **aligned** |
| `docs/design-enhancement-round2-2026-08-29.md` | §3.1 gates `389.70kB gzip 113.98` | live `390.25kB gzip 114.00` — delta +0.55kB (≈0.1%) from doc time | **not drift — rebased `1cfaa18/d939759/5a49f1c` binary uploads** |

---

## 4. Remediation Backlog (post-ship, non-blocking)

| ID | Severity | Action | Effort |
|---|---|---|---|
| R-01 | L | `src/components/BackToTop.tsx:42` remove dead `relative` (keep `fixed` only) — `cn("relative fixed…")` → `cn("fixed…")` | 1-line |
| R-02 | M | Extract `site.origin` (e.g. `"https://st-joseph.jesspete.shop"`) to `src/data/site.ts`, derive `og:url` + `og:image` + `jsonld.url` from it; update `src/head.test.ts` to assert `${site.origin}/` | 3-file, 10-line |
| R-03 | L | `public/favicon.svg:2` align `rect fill` to `#200a0a` (theme-color) or change `theme-color` to `#33100f` — pick one canonical maroon | 1-line |
| R-04 | L | `src/index.css` `@media (prefers-reduced-motion: reduce)` explicitly add `.page-in, .drawer-item-in { animation: none }` alongside `.reveal/.hero-ken-burns/.dot-pulse` — clarity, not functional change | 4-line |
| R-05 | L | `AGENTS.md` lines 33 + 36 fix `45 files`→`52` and `22 utilities+6 keyframes`→`24+8+themed scrollbar` to match `CLAUDE.md` | 2-line |
| R-06 | L | `src/head.test.ts` depends on `readFileSync(../index.html)` outside `src` `include`; if `tsconfig include` tightens, consider inlining head expectations via `document.head` in a DOM test (as `enhancements.spec.ts` already does for E2E) — keep as-is for now | optional |

None of R-01..R-06 blocks the 5-gate or the deployed artifact.

---

## 5. Validation Evidence (paste-ready)

```bash
# 2026-08-29 15:19 SGT — live gate (single shell)
pnpm lint      # eslint . --max-warnings 0            — EXIT 0
pnpm typecheck # tsc --noEmit (strict)                — EXIT 0
pnpm test      # vitest run — 16 files / 89 passed   — EXIT 0
pnpm test:e2e  # playwright chromium — 35 passed     — EXIT 0 (53.4s)
pnpm build     # dist/index.html 390.25kB gzip 114.00kB + dist/images/8 — EXIT 0
```

E2E `enhancements.spec.ts` asserts head-to-toe (green):

1. CTA-band `h2` computed `rgb(250,246,236)` on `/`, `/serve`, `/give`
2. Head: `favicon /favicon.svg`, `theme-color #200a0a`, `og:image https://st-joseph.jesspete.shop/images/hero-church.jpg`, `og:url`, `twitter:card summary_large_image`, JSON-LD `@type Church` with `+65 6769 1666` / `620 Upper Bukit Timah Road` / `678116`
3. `GET /favicon.svg → 200 image/svg`
4. `.page-in` wrapper `animation-name: page-in`, `data-route` tracks `/worship`→`/news-events`
5. Hash-only `/worship→/worship#mass` keeps `data-route="/worship"`
6. Rail `matrix(0,…)` → `matrix(0.9…)` at bottom
7. Ring `stroke-dashoffset ≈125.66` → `<63` at bottom
8. Drawer 390×844: `/serve` leaf `aria-current="page"` + `gold rgb(226,191,114)`, `/history` parent `aria-current="true"`

---

## 6. References

- This round's plan & evidence: `docs/design-enhancement-round2-2026-08-29.md` (§§1-3) + `docs/UI_UX_Design_Comparison_cover_source.html` + `docs/UI_UX_Design_Comparison_RotherShrine_vs_StJoseph.pdf` + `docs/visual-ux-aethetics_comparison.zip`
- Pre-round audit lineage: `docs/code-review-audit-2026-08-28.md` + `docs/ui-ux-remediation-plan-2026-08-28.md` (0C/2H/3M/3L → remediated)
- Design system authority: `src/index.css` `@theme` (tokens) + `@layer base/utilities` (utilities + keyframes)
- Gate config: `package.json` `scripts`, `vite.config.ts` `test` + `server.watch.ignored`, `tsconfig.json` `strict`, `eslint.config.js` flat, `playwright.config.ts` (`webServer → vite :5173, expect 15s`)
- No `src.orig/` in repo (never committed) — lint/vite ignores are inert guards (`docs/porting.md` holds lineage)

---

**Verdict reaffirmed:** **PASS — ship.** The 7-item Sacred Polish closes its 7 findings with the right fix at the right layer (contrast `shrine-cream`, head identity, keyed `page-in`, single-source rAF rail+ring, drawer parity, scrollbar polish, kicker nowrap), tests first, E2E proving computed styles not just classes, and no deploy or HashRouter regression. Take R-01..R-06 as a tidy 30-minute follow-up.
