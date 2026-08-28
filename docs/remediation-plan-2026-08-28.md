# Remediation Plan — st-joseph-bt (2026-08-28)

Derived from `docs/code-review-audit-2026-08-28.md`. Executed test-first (TDD: red → green → refactor) per `CLAUDE.md` and the `tdd` skill. Every change re-validated against the codebase before execution (file re-reads + gate runs).

## Validation of plan against codebase (pre-execution)

- [x] H-1 root cause re-confirmed in `src/components/Header.tsx:21-25` (effect deps `[pathname]` only) — matches live repro
- [x] H-2 target locations enumerated: AGENTS.md (3 spots), CLAUDE.md (6 spots), README.md (2 spots), SKILL (4 spots) — grep-verified before editing
- [x] M-1: `README.md:141` confirmed referencing the phantom audit file
- [x] M-2: utility count re-counted in `src/index.css` (12 utilities + 2 keyframes)
- [x] M-3: `playwright.config.ts:4` comment confirmed stale
- [x] L-1: lockfile format checked — rename of root package name is compatible with `pnpm-lock.yaml` (verified post-change with `--frozen-lockfile`)
- [x] Test-count contract impact computed: unit 8→9 files, 48→53 tests; E2E 21→22 tests — doc updates enumerated below

## ToDo (execution order)

### Task 1 — H-1 + L-3: header close-on-activation fixes (TDD)
- [ ] 1.1 RED: new `src/components/Header.test.tsx` — 4 tests:
  - closes drawer when tapping a link to the **current** route (the H-1 regression)
  - closes drawer when tapping a link to a **different** route
  - Escape closes the drawer
  - toggle `aria-expanded` reflects drawer state
- [ ] 1.2 GREEN: `Header.tsx` — close drawer on in-drawer link activation (`onClickCapture` on drawer `<nav>` closing when the activated element is a link); close desktop dropdown on child-link click (`L-3`)
- [ ] 1.3 REFACTOR + review diff; run `pnpm test` (expect 9 files / 52 tests at this point)

### Task 2 — L-2: fetchPriority on above-the-fold images (TDD)
- [ ] 2.1 RED: extend `src/components/SafeImage.test.tsx` — renders `fetchpriority="high"` attribute when prop passed (5→6 tests)
- [ ] 2.2 GREEN: `SafeImage.tsx` optional `fetchPriority?: "high" | "low" | "auto"`; `Home.tsx` hero + `PageHero.tsx` pass `"high"`
- [ ] 2.3 Run `pnpm test` (expect 9 files / 53 tests)

### Task 3 — E2E regression for H-1
- [ ] 3.1 Add 1 test to `e2e/smoke.spec.ts` (7→8): mobile viewport — open drawer, tap `Home` (current route) → drawer closes; reopen, tap `News & Events` → navigates and drawer closes
- [ ] 3.2 Run full `pnpm test:e2e` (expect 22 passed)

### Task 4 — L-1: package identity
- [ ] 4.1 `package.json` name → `"st-joseph-bt"`; verify `pnpm install --frozen-lockfile` + `pnpm typecheck` unaffected

### Task 5 — M-3: playwright.config.ts comment corrected (st-joseph-bt, no rothershrine)

### Task 6 — Documentation contract repair (H-2 + M-1 + M-2 + count sync)
- [ ] 6.1 **AGENTS.md** — `src.orig/` present-tense claims → "not part of this repository"; utility count 13→"12 utilities + 2 keyframes"; test counts 8/48→9/53 and 21→22 (smoke 8); playwright.config row fix; structure tree (add Header test file + audit docs)
- [ ] 6.2 **CLAUDE.md** — same src.orig corrections; counts in Build Commands + Testing Strategy + Architecture tree + Success Metrics; route-table untouched
- [ ] 6.3 **README.md** — hierarchy: drop phantom `fresh-clone-audit` entry, list real `docs/` inventory + this audit; counts in tech-stack/verify tables; note the drawer fix behavior
- [ ] 6.4 **rothershrine-v2_SKILL.md** — front-matter `verified` line + §2 harness table + §3.1 + §11 pre-ship checklist + Quick Ref counts; src.orig clarifications
- [ ] 6.5 Cross-check: every count/claim in all four docs matches the post-remediation tree (grep audit)

### Task 7 — Verification (Iron Law)
- [ ] 7.1 Full gate: `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build`
- [ ] 7.2 Live re-check of the H-1 fix behavior against the local build (Playwright repro script re-run on `pnpm preview`)
- [ ] 7.3 Confirm no regression in SafeImage CDN-fallback E2E (route.abort spec still passes)

### Task 8 — Commit + push
- [ ] 8.1 Conventional commits to `main` (feat/fix/docs split, atomic)
- [ ] 8.2 Push via `skills/how-to-git-push-using-ssh-wrapper/scripts/ssh_git_wrapper_v3.py` with `docs/ssh-key.txt`

## Explicitly deferred (documented, not silently dropped)

- Focus trap / `role="dialog"` on the mobile drawer (I-6) — next a11y increment, needs design review
- Shortener destination verification (I-4) — parish content owner action
- SSH deploy-key rotation after migration (I-1) — owner action post-push
- WCAG 3.2.5 new-tab announcement (I-7) — advisory
