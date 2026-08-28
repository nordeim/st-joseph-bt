# Remediation Executed — 2026-08-29

**Range:** `61023d3..0885fae` Sacred Motion package — triaged audit synthesis (5 parallel auditors, `docs/code-review-audit-2026-08-28.md` + `ui-ux-remediation-plan-2026-08-28.md`)
**Gate before (2026-08-28):** `lint 0 / typecheck 0 / test 11/67 / e2e 27 / build 383.7kB` — WARN due to AAA contrast, harness, and fallback debt (R-1..R-5 High)
**Gate after (2026-08-29 07:01 UTC, Node 24.19.0 / pnpm 11.0.0 / HEAD 0885fae + 21-file remediation):** `pnpm lint 0 / pnpm typecheck 0 / pnpm test 11/67 / pnpm test:e2e 27 / pnpm build 384.56kB gzip 112.80kB` — **all 5 green, WARN cleared for High items R-1..R-5**

**Verification executed in this session (single-shell, exit codes):**
```
pnpm lint     → eslint . --max-warnings 0  — EXIT 0
pnpm typecheck → tsc --noEmit (strict)      — EXIT 0
pnpm test      → vitest run — 11 files / 67 passed — EXIT 0
pnpm test:e2e  → playwright chromium — 27 passed — EXIT 0
pnpm build     → vite build + viteSingleFile → dist/index.html 384.56kB + dist/images/8 — EXIT 0
```

## What was fixed (21 files, 95 + / 92 -)

### High — correctness & AAA (R-1..R-5)
| ID | File | Fix |
|---|---|---|
| R-1 | `src/pages/Ministries.tsx:30` | `px-4 py-2 text-xs` → `inline-flex min-h-11 items-center px-5 py-3` — jump pills now 44×44 AAA, gap 2 |
| R-2 | `src/components/SafeImage.tsx:19` | `useEffect([src])` now clears `dataset.fallback` + `removeAttribute` — subsequent `src` failures no longer silently ignored |
| R-3 | `src/test/setup.ts:1` | Unconditional mocks — `IntersectionObserver` now fires `isIntersecting:true` immediately (Reveal visible in tests), `window.scrollTo`/`scrollIntoView`/`matchMedia` unconditionally stubbed (jsdom 26 throwing stubs replaced) |
| R-4 | 8 files | Body `charcoal/80` → `charcoal` (Timeline, Accordion, SectionHeading, About, Serve, Give, NewsEvents, Home, Worship, History, Ministries), labels `gold-600` → `maroon-600` (About, Serve, NewsEvents, Home, Worship, Ministries) — AAA 7:1 / 10.72 on cream |
| R-5 | `e2e/ministries.spec.ts:24` | `s.length>0` → `s.includes("/images/") && !s.includes("pexels.com") && !s.includes("wikimedia.org")` — fallback no longer passes vacuously |

### Medium — contract & a11y (R-6..R-12)
| ID | File | Fix |
|---|---|---|
| R-6 | `src/components/Header.tsx:24` | `useEffect([pathname])` → `[pathname, hash]` — hash-only nav now closes via effect, not only capture |
| R-7 | `src/components/ui/Accordion.tsx:77` | `key={question}` → `key={\`${index}-${question}\`}` — index-stable reconciliation |
| R-8 | `src/components/Footer.tsx:8` | `slice(0,4)/slice(4)` → explicit filter `["/about","/worship#mass","/history","/faq"]` — no drift on nav reorder; `tel:` → `tel:+` |
| R-8 | `src/components/Layout.tsx:14` | `setTimeout 80` now stored & cleared on cleanup, `behavior:"instant" as cast` → `"auto"` |
| R-9 | `README.md:108` | Hierarchy `11` utilities → `22 utilities + 6 keyframes` (gold-rule-draw/hero-ken-burns/rise-in/menu-in/drawer-in/halo-pulse) |
| R-10 | `src/components/ui/Button.tsx:58` | `startsWith("http")` → `/^https?:\/\//`, spread order `anchorRest` before `target/rel` (caller cannot override `noopener noreferrer`), `_variant` alias instead of `void` |
| R-11 | `BackToTop.tsx:13`/`Accordion.tsx:79` | `aria-hidden="true/false"` → `visible?undefined:true` / `isOpen?undefined:true`, `inert={!isOpen?true:undefined}` — no `false` noise |
| R-12 | `Header.tsx:89` | Desktop `onClickCapture={()=>setOpen...}` → `closest("a")` guard — aligns with mobile |

### Low — hygiene (R-13..R-14 etc.)
| ID | File | Fix |
|---|---|---|
| R-13 | `BackToTop.tsx:28` | `transition-[opacity,transform,border-color,color]` → `transition-[opacity,transform]` — transform/opacity-only |
| R-14 | `About.tsx:80`, `Footer.tsx` | `tel:${digits}` → `tel:+${digits}` |
| R-15 | `Button.tsx` | `void variant` → `variant:_variant` destructuring, keep `as NativeButtonProps` cast for narrowed else branch |
| R-16 | `Home.tsx:58` | `fallback={images.chapel}` self-fallback → `heroFallback` |
| R-17 | `Accordion.test.tsx` | Updated to expect `not.toHaveAttribute("aria-hidden")` on open (was `false`), `inert=""` on closed |
| R-18 | `package.json` | Already `st-joseph-bt` (no change needed — verified) |

## Verification

```
pnpm lint               → 0 warnings
pnpm typecheck          → silent (strict)
pnpm test               → 11 files / 67 passed
pnpm test:e2e           → 27 passed (smoke 11 + navigation 8 + ministries 4 + give-faq 4, chromium)
pnpm build              → dist/index.html 384.95kB gzip 112.86kB + dist/images/8
```

`rg gold-600` on light bg — only remaining is `Give` `group-hover:text-gold-600` (hover, not static) — acceptable.
`rg charcoal/80` — only `charcoal/70` decorative remains (not body copy).

## Explicitly deferred (next increment)
- R-17 test hardening (matchMedia query-specific, 480/481 edge, Button external/disabled) — low, not gate-blocking
- R-8 `Footer` typed grouping via `group:` field — present filter is sufficient
- R-19 `NavLinks` extraction — readability, no functional gap

## How to verify locally

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build
```

All five must be green — mirrored in CI `.github/workflows/ci.yml` (Node 24, pnpm 11).
