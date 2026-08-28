# UI/UX Enhancement Audit & Remediation Plan — 2026-08-28

> Scope: visual appeal, aesthetics, UI/UX design, and motion/animation for the st-joseph-bt SPA.
> Method: skills-driven (repo `skills/frontend-design`, `skills/tailwind-patterns`, `skills/web-design-guidelines`,
> `skills/tdd-workflow`) + live-site visual pass + full source review of all 10 pages / 13 components / index.css.
> Constraints honored: Tailwind v4 CSS-first `@theme` (no one-off hex), `cn()` merging, HashRouter, `viteSingleFile`,
> global `prefers-reduced-motion` contract, all commits on `main`.

## Part 1 — Audit findings (evidence-based)

| ID | Finding | Evidence | Impact |
|----|---------|----------|--------|
| V-1 | Hero/PageHero content pops in instantly — no staged entrance; ken-burns is the only hero motion | `Home.tsx` L50–69, `PageHero.tsx` L43–54 | First impression |
| V-2 | FAQ Accordion opens/closes abruptly (`hidden` toggle, no height transition) | `Accordion.tsx` L75 | Perceived polish |
| V-3 | Desktop dropdown menu renders with no fade/slide | `Header.tsx` L118–145 | Motion coherence |
| V-4 | Mobile drawer appears with no slide/fade entrance | `Header.tsx` L168–242 | Motion coherence |
| V-5 | Card hover affordance is inconsistent — Home "grounds" cards lift + zoom, but Worship devotions, About pillars, Serve roles, Give options, NewsEvents/Home event cards are static or shadow-only | `Worship.tsx` L102, `About.tsx` L47, `Serve.tsx` L34, `Give.tsx` L60, `NewsEvents.tsx` L32, `Home.tsx` L198 | Consistency |
| V-6 | Buttons lift on hover but give no press feedback (no `active:` state) | `Button.tsx` L42 | Micro-interaction |
| V-7 | Footer + inline text links transition color only — no underline affordance | `Footer.tsx` L58–66, `NewsEvents.tsx` L44–52 | Affordance |
| V-8 | Timeline dots are static; rail feels inert next to the rest of the design | `Timeline.tsx` L14–19 | Delight |
| V-9 | Mass schedule rows and PPC table rows lack hover affordance | `Worship.tsx` L40–77, `About.tsx` L120–127 | Scanability |
| V-10 | No back-to-top affordance on long pages (History, Ministries, Worship) | all pages >2 viewports | Navigation |
| V-11 | Event cards: category/date are plain text; weak hierarchy vs. grounds cards | `Home.tsx` L196–211, `NewsEvents.tsx` L32–53 | Hierarchy |
| A-1 | Hamburger touch target 40×40 (<44px AA) | `Header.tsx` L156 | Accessibility |
| A-2 | Ministries jump pills ~30px tall touch target | `Ministries.tsx` L25 | Accessibility |
| A-3 | No `aria-current` on active nav link or active dropdown parent | `Header.tsx` L96–116 | Accessibility/UX |
| A-4 | Ministries jump pills don't mark the active section | `Ministries.tsx` L20–30 | Accessibility/UX |

Non-goals (rejected): dark mode, page-transition router animations (HashRouter + singlefile constraint,
low value for 10 static pages), carousel/marquee widgets, new deps (framer-motion — CSS is sufficient and keeps
the bundle lean), bento redesigns (anti-generic guidance: refine the existing editorial identity, don't reset it).

## Part 2 — Remediation plan ("Sacred Motion" package)

Design language: keep the maroon/cream/gold liturgical palette and Fraunces display voice.
Motion rules (from `skills/frontend-design/animation-guide.md`): ease-out entrances, transform/opacity only,
200–700ms range, staggered delays, everything gated by the existing global `prefers-reduced-motion` block.

### E1. Staged entrance motion (V-1)
`src/index.css`: add `@keyframes rise-in` (opacity 0→1, translateY 20px→0, ease-out) + utilities
`.rise-in` and delay steps `.rise-in-d1…d4` (90/180/280/380ms). Apply to Home hero eyebrow/h1/p/CTA row
and PageHero content (eyebrow/h1/description/children). CSS-only; `animation-fill-mode: both` guarantees
final opacity 1 (instant under reduced-motion via the global 0.01ms override).

### E2. Accordion height animation (V-2)
Replace `hidden` with the `grid-template-rows 0fr→1fr` technique: closed = `grid-rows-[0fr]` + inner
`overflow-hidden` wrapper, plus `aria-hidden={!open}` + `inert={!open}` to preserve semantics.
Transition 300ms ease-out. Existing aria/focus tests keep passing; RED tests assert inert/aria-hidden.

### E3. Dropdown + drawer entrances (V-3, V-4)
`src/index.css`: `@keyframes menu-in` (fade + translateY(-4px)) → `.menu-in` on desktop dropdown panel;
`@keyframes drawer-in` (fade + translateY(-12px)) → `.drawer-in` on mobile drawer. Transform/opacity only.

### E4. Card lift system (V-5, V-11)
`src/index.css`: `.card-lift` utility — `transition: transform, box-shadow, border-color` +
hover `translateY(-4px)` + `shadow-shrine` + gold border tint. Apply to Worship devotions, About pillars,
Serve roles, Give options, NewsEvents + Home event cards, keeping existing `cn()` usage.
Event cards get a bordered gold category chip and display-serif date for hierarchy.

### E5. Link underline + press feedback (V-6, V-7)
`.link-underline` utility: gold underline scales in via `background-size` on hover (footer nav + inline
arrow links). `Button.tsx` base gains `active:translate-y-0 active:scale-[0.98]` (pressed feel).

### E6. Timeline dot halo (V-8)
`@keyframes halo-pulse` (ring expands/fades, 2.4s loop, transform/opacity only) → `.dot-pulse` on the
Timeline dot; disabled by the global reduced-motion override.

### E7. Row hover affordances (V-9)
Mass schedule `dl` rows: `transition-colors hover:bg-shrine-maroon-50/60`. PPC table body rows:
hover tint via existing odd/even zebra + `hover:bg-shrine-maroon-50`.

### E8. BackToTop component (V-10) — new `src/components/BackToTop.tsx`
Fixed bottom-right circular button (maroon-900 bg, cream icon, 44px target, `shadow-shrine`),
appears when `window.scrollY > 480`, hides otherwise (`aria-hidden` + `tabIndex -1` when hidden).
Click scrolls to top with `behavior: matchMedia('(prefers-reduced-motion: reduce)') ? 'auto' : 'smooth'`.
Mounted in `Layout`. Never touches the hash (HashRouter-safe). 5 unit tests.

### E9. A11y & touch targets (A-1…A-4)
Header: hamburger `h-11 w-11` (44px); `aria-current="page"` on the active top-level link; parent dropdown
button gets `aria-current="true"` + gold tint when a child route is active. Ministries pills: `px-4 py-2`
(≥36px+ with line-height ≈ 40px+), `aria-current="true"` for the section matching `location.hash`, gold
active styling. All behavioral → unit tests.

### E10. TDD mapping (RED first for every behavior)
| Test file | New tests assert |
|---|---|
| `BackToTop.test.tsx` (new) | hidden before threshold; visible after scroll; hides at top; click → `scrollTo({top:0})`; reduced-motion → `behavior:'auto'` |
| `Header.test.tsx` (+3) | `aria-current="page"` on active link; parent `aria-current="true"` on child-active; hamburger `h-11` |
| `Accordion.test.tsx` (+2) | open panel has no `inert`/`aria-hidden`; closed panel has both (animation-ready) |
| `Ministries.test.tsx` (new) | pill `aria-current="true"` when hash matches; larger touch classes |
| `Button.test.tsx` (+1) | base classes include `active:` press feedback |

### E11. E2E additions (Playwright)
smoke: hero rise-in classes present; back-to-top appears after scroll + returns to top; event chip present.
navigation: `aria-current="page"` on desktop nav active link.
ministries: jump pill `aria-current="true"` after click.

### E12. Docs, gate, deploy, push
Update AGENTS.md / CLAUDE.md / README.md / rothershrine-v2_SKILL.md (utility counts, new component,
test counts, motion conventions). Run the five-gate. Build → serve `dist/` preview on :3000 → screenshots.
Atomic conventional commits on `main`, push via `docs/ssh-key.txt` + `ssh_git_wrapper_v3.py`.

## Part 3 — Plan ↔ codebase validation

| Claim | Verified against |
|---|---|
| All hover targets are `cn()`-styled components; `.card-lift` composes cleanly | Home/Worship/About/Serve/Give/NewsEvents card markup reviewed line-by-line |
| Global reduced-motion block already nukes new keyframes (duration 0.01ms, fill both → final state) | `index.css` L68–80, L181–191 |
| Accordion swap keeps aria-expanded/focus behavior (existing 4 unit + 1 e2e assertions untouched) | `Accordion.test.tsx`, `give-faq.spec.ts` L26–41 |
| `useLocation().hash` works under MemoryRouter for Ministries pill test | react-router 7.18.2 MemoryRouter parsing |
| BackToTop cannot break SkipLink/hash contract (uses `window.scrollTo` only) | `SkipLink.tsx` contract, `Layout.tsx` hash-scroll |
| jsdom `matchMedia` needed by BackToTop test | `src/test/setup.ts` mocks IO + scrollTo; matchMedia stub added in test if absent |
| No new dependencies; no `@apply` on utilities that Tailwind can't see (plain CSS + `var(--color-shrine-*)`) | Tailwind 4.3.3 CSS-first, `tailwind-patterns` skill |
| E2E count will change 22 → 25; unit 53 → 64 (11 files); docs updated to match | test files enumerated in plan |

**Validation verdict: plan is aligned with the codebase, the repo conventions (AGENTS.md Quirks/Don't),
and the skill guidance. Execution proceeds TDD: RED → GREEN → REFACTOR → gate → docs → deploy → push.**
