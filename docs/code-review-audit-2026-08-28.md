# Code Review & Security Audit — st-joseph-bt (2026-08-28)

**Scope:** full repository — SPA source (`src/` 41 files), configs, E2E suite, docs (AGENTS.md, CLAUDE.md, README.md, rothershrine-v2_SKILL.md), CI workflow.
**Method:** tiered review per vendored skills (`code-review-checklist` 12-category scan → `code-quality-standards` six-axis → `security-and-hardening` OWASP/secret/dependency pass), plus browser-based E2E against the live deployment and a full local gate run. Every claim below carries evidence and a confidence tag (Verified / Reasoned / Assumed) per `verification-and-review-protocol`.

**Live deployment:** `https://01a043c4-cc4a-7925-a2c8-1c01b2e1b7d3.arena.site/` (arena.site wrapper — app served inside `?embed=true` iframe).

---

## Summary (counts by severity)

| Severity | Count | Items |
|---|---|---|
| Critical | 0 | — |
| High | 2 | H-1 mobile drawer same-route close bug · H-2 `src.orig/` documented but nonexistent |
| Medium | 3 | M-1 README phantom docs file · M-2 utility-count drift · M-3 stale rothershrine comment + false playwright.config claim |
| Low | 3 | L-1 generic package name · L-2 hero LCP lacks fetchPriority · L-3 desktop dropdown same-route stays open (touch) |
| Informational | 7 | I-1…I-7 (incl. 2 accepted risks) |

**Verification ledger (what was checked, how, result):**

| Check | Method | Result |
|---|---|---|
| lint / typecheck / unit / e2e / build gates | executed in this session | all green (48 unit / 21 E2E / 375.71 kB singlefile) |
| Dependency vulnerabilities | `pnpm audit` (prod + full) | 0 known vulnerabilities (Verified) |
| XSS sink scan (`dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`, `document.write`, `javascript:`) | rg over `src/` + `index.html` | 0 hits (Verified) |
| Secret scan (keys/tokens/passwords in source) | rg over `src/`, configs | 0 hits in app source; see I-1 for `docs/ssh-key.txt` (Verified) |
| `target="_blank"` hygiene | rg + file review | all 3 instances carry `rel="noreferrer"` / `noopener noreferrer` (Verified) |
| `any` / console.log / TODO / placeholder leftovers | rg | 0 hits (Verified) |
| CI workflow integrity | `od -c` byte inspection | valid `branches: [main]`; note: ordinary terminal output can mangle `[m` sequences — verify with raw bytes before flagging (Verified) |
| Route contract (17 entries, 7 aliases, 10 pages) | file review + live click-through + E2E | matches docs exactly (Verified) |
| Data contract (priests 3, ppc 16, timeline 8, grounds 3, ministries 6, faqs 6, events 6, giving 8, serve 4, devotions 6, images 11) | file review + unit tests | matches docs exactly (Verified) |
| Token contract (24 colors + 2 shadows) | manual count in `src/index.css` | matches (Verified) |
| Live E2E (desktop + mobile journeys, console, network, broken images) | Playwright inside arena wrapper | 41 pass / 5 fail → 1 real bug (H-1), 2 test-expectation errors, 2 hosting artifacts (Verified) |

---

## High

### H-1 — Mobile drawer stays open (scroll locked) when tapping a link to the current route

- **Location:** `src/components/Header.tsx:21-25`
- **Description:** The drawer closes only via `useEffect(..., [pathname])`. Tapping a drawer link whose target equals the current pathname (e.g. `Home` while on `/`) does not change `pathname`, so the effect never fires and the drawer remains open with `document.body.style.overflow = "hidden"`.
- **Evidence (Verified — live repro on the deployment, 2026-08-28):**
  ```
  drawer open: 1
  A) after clicking Home (already on /), drawer count = 1  (still open — BUG)
  B) after clicking News & Events (different route), drawer count = 0  (correct)
  ```
- **Impact:** common mobile path; user believes navigation failed; page scroll stays locked until they tap `Close menu` or press Escape.
- **Severity:** High (incorrect behavior in a common path).
- **Recommended fix:** close the drawer on any in-drawer link activation (e.g. `onClickCapture` on the drawer `<nav>` that closes when `event.target.closest("a")`), independent of pathname change. Add unit + E2E regression tests (fails before fix, passes after).
- **Confidence:** Verified.

### H-2 — All four governing docs describe `src.orig/` as a present reference snapshot; the directory does not exist and never existed in git history

- **Location:** AGENTS.md (Structure tree, Quirks, Where to look next), CLAUDE.md (Architecture tree §Project-Specific Standards, Git section, Error Handling, anti-patterns), README.md (File Hierarchy, Troubleshooting-adjacent note), rothershrine-v2_SKILL.md (§2 Environment, §3.2, Appendix D)
- **Description:** Docs claim a "frozen Rother Shrine original" lives at `src.orig/` with "6 unit tests / 29 cases and 20 E2E as rewrite template". In reality:
  ```
  ls -d src.orig            → No such file or directory
  git log --all -- src.orig → (empty)
  ```
- **Evidence:** commands above (Verified).
- **Impact:** agents/maintainers following the docs will hunt for a nonexistent snapshot; the ESLint/Vite `src.orig` ignore entries are dead config presented as load-bearing; a documented test template is unavailable.
- **Severity:** High for the documentation-contract audit objective (not a runtime defect).
- **Recommended fix:** update all four docs to state plainly that `src.orig/` is **not part of this repository** (never committed); keep the ignore entries as inert defensive guards and say so. Remove the "retains 6 unit tests / 29 cases and 20 E2E" claim.
- **Confidence:** Verified.

---

## Medium

### M-1 — README File Hierarchy references `docs/fresh-clone-audit-2026-08-27.md`, which does not exist

- **Location:** `README.md` line ~141.
- **Evidence:** `ls docs/` → `porting.md, prompt-to-create.md, prompts.md, ssh-key.txt, st-joseph-bt-grok-v1.zip` (Verified).
- **Impact:** doc rot; misleads readers looking for the prior audit.
- **Recommended fix:** replace the entry with the actual docs inventory (and, since this audit ships as `docs/code-review-audit-2026-08-28.md`, list it).
- **Confidence:** Verified.

### M-2 — Utility-count drift: AGENTS.md and CLAUDE.md claim "13" utilities; `src/index.css` defines 12 named utilities (+ 2 keyframes)

- **Location:** AGENTS.md Structure (`index.css` line, "13: …"), CLAUDE.md Tailwind v4 section and Architecture tree.
- **Evidence:** count of class definitions in `@layer utilities` = 12 (`text-balance, bg-adobe-texture, bg-grain, divider-weave, divider-weave-thin, gold-rule, gold-rule-left, mask-fade-b, hero-ken-burns, reveal, reveal-visible, skip-link`) (Verified).
- **Impact:** the docs' own count contract is wrong by one (likely keyframes miscounted as utilities).
- **Recommended fix:** correct to "12 utilities + 2 keyframes" wherever the 13 appears.
- **Confidence:** Verified.

### M-3 — `playwright.config.ts` header comment says "Playwright E2E for rothershrine", and AGENTS.md asserts the config "handles wikimedia/pexels CSP" — neither matches the file

- **Location:** `playwright.config.ts:4`; AGENTS.md Structure table (`playwright.config.ts` row).
- **Evidence:** the comment predates the port; the config contains no CSP/header handling (headers belong to `index.html` meta CSP) (Verified).
- **Impact:** stale pre-port naming undermines the "no Rother-era references" contract; the AGENTS row misattributes where CSP lives.
- **Recommended fix:** update the comment to the Bukit Timah project; correct the AGENTS row to "meta CSP lives in `index.html`; config sets baseURL/webServer/timeout".
- **Confidence:** Verified.

---

## Low

### L-1 — `package.json` `name` is the generic scaffold name `"react-vite-tailwind"`

- **Evidence:** `package.json:2` (Verified). Docs never claim otherwise, but the project identity is `st-joseph-bt`.
- **Impact:** hygiene — tooling, artifact naming, and future registry use would carry a meaningless name.
- **Recommended fix:** rename to `"st-joseph-bt"` (private package, lockfile-compatible; verify with `pnpm install --frozen-lockfile`).
- **Confidence:** Verified (name); Reasoned (no side effects — verified by frozen-lockfile install after change).

### L-2 — Above-the-fold hero images lack `fetchPriority="high"` (LCP polish)

- **Location:** `src/pages/Home.tsx` hero `SafeImage`, `src/components/PageHero.tsx` background image.
- **Evidence:** code review — both use `loading="eager"` but no priority hint (Verified).
- **Impact:** marginal LCP delay on slow networks; the SPA is image-led, so the hint is cheap and standards-aligned.
- **Recommended fix:** add optional `fetchPriority` passthrough on `SafeImage`; set `"high"` for the two hero usages; unit-test the attribute.
- **Confidence:** Verified (prop absent); Reasoned (LCP benefit).

### L-3 — Desktop dropdown stays open when clicking a child link to the current route (touch-laptop edge)

- **Location:** `src/components/Header.tsx` desktop dropdown (`openDesktopMenu`).
- **Evidence:** Reasoned — same effect-dependency class as H-1; hover/blur closes it with a mouse, but focus-open + same-route tap (no pointer move) leaves it open until blur.
- **Impact:** minor; touch devices at `lg` width only.
- **Recommended fix:** `onClick` on dropdown links to `setOpenDesktopMenu(null)` (fold into the H-1 commit).
- **Confidence:** Reasoned (not reproduced live; logic verified by code inspection).

---

## Informational / Accepted risks

| # | Finding | Note |
|---|---|---|
| I-1 | **Accepted risk:** `docs/ssh-key.txt` contains an SSH private key committed to the repository | Required by the user's push workflow (deploy key + wrapper). Recommend rotating/removing it once migration is complete; anyone with repo read access has the key. (Verified present) |
| I-2 | arena.site wrapper serves the SPA inside an `?embed=true` iframe and **does not forward hash deep links** (`/#/worship#mass` lands on Home through the wrapper) | Hosting artifact, not an SPA defect — the artifact is built for direct static hosting (GH Pages/S3), where deep links work (proven by 21-test E2E against vite server + HashRouter design). Documented so testers don't misattribute. (Verified live) |
| I-3 | On the arena deployment, the host's injected Cloudflare beacon is blocked by the app's own CSP (`script-src 'self' 'unsafe-inline'`) | Console error on that host only; it is evidence the CSP is doing its job, not an app bug. (Verified live) |
| I-4 | `EventItem.href` / Serve CTAs use opaque shorteners (`tinyurl.com`, `forms.gle`) and the label says "Join the WhatsApp community" | Opaque redirect targets cannot be verified in CI; confirm destinations at publish time. (Verified present) |
| I-5 | CSP requires `'unsafe-inline'` for `script-src`/`style-src` | Inherent to the `vite-plugin-singlefile` architecture; acceptable for a no-input static SPA. Note as conscious trade-off. (Verified in `index.html`) |
| I-6 | Mobile drawer and desktop dropdowns have no focus trap; drawer lacks `role="dialog"`/`aria-modal` | Escape + route-change close + `aria-expanded`/`aria-controls` are present; full focus management is the next a11y increment (WCAG AAA intent). (Verified by code inspection) |
| I-7 | `SafeImage` fallbacks on locally-served images are self-referential (`chapel → chapel`); footer Facebook link doesn't announce new-tab | Harmless by design (fallback only matters for the 3 CDN images); new-tab announcement is a WCAG 3.2.5 advisory. (Verified) |

---

## What was checked and found clean (evidence-backed)

- **Five-step gate green in this session:** `pnpm lint` (0 warnings) → `pnpm typecheck` (silent) → `pnpm test` (8 files / 48 passed) → `pnpm test:e2e` (21 passed, chromium) → `pnpm build` (375.71 kB `dist/index.html` + 8 `dist/images/`).
- **Security:** zero dangerous DOM sinks; zero secrets in app source; all external anchors use `noopener noreferrer`; `pnpm audit` clean; CSP verified live (blocked injected beacon); map iframe restricted to `https://www.google.com` by `frame-src`.
- **Contract alignment:** route table (17 entries), hash anchors (3 + 6), data shapes/counts, token inventory, pinned-exact dependency list, CI pipeline mirror — all match the four governing docs.
- **Content fidelity:** zero Rother-era strings in shipped source (`oklahoma|tepeyac|guatemala|89th st|apla|blessed stanley` → 0 hits in `src/`, `index.html`, `public/`).
- **Live journeys:** all 10 pages + 7 aliases render; 9 hash-anchor targets exist; FAQ single-open accordion works; footer 14 links; UEN/cheque payee render; 0 broken images; 0 page errors on desktop and mobile (post-beacon-filtering).
- **Test quality:** unit tests assert real data shapes and behavior (no mock-theater); E2E covers aliases, anchors, dropdowns, keyboard nav, SafeImage `route.abort` fallback, single-open accordion.

---

## Remediation backlog (shipped in this pass — see `remediation-plan-2026-08-28.md`)

1. **H-1** — drawer same-route close fix (TDD: failing unit test + E2E regression first)
2. **H-2 / M-1 / M-2 / M-3** — documentation contract repair across AGENTS/CLAUDE/README/SKILL
3. **L-1** — package rename
4. **L-2** — `fetchPriority` on hero images (TDD: attribute unit test)
5. **L-3** — dropdown close hardening (same commit as H-1)
6. Re-run five-step gate; update all test-count contracts (9 files / 53 unit tests; 4 specs / 22 E2E); re-verify live
