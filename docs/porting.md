Done — all four docs have been ported from the Rother Shrine (Oklahoma City) original to the current src/ port of https://stjoseph-bt.org.sg/ (St Joseph's Church, Bukit Timah). Workflow wf_b48e9e04ecbf 
finished 7/7 agents ok in 5 phases, with verification gates green. 
 
### What changed (audit-proven) 
 
Identity: rothershrine / National Shrine of Blessed Stanley Rother, 700 SE 89th St, Oklahoma City → st-joseph-bt / St Joseph's Church (Bukit Timah), 620 Upper Bukit Timah Road S678116 — second-oldest Catholic  
parish since 1846, last Catholic church cemetery, St Joseph the Worker (1 May), Kranji attap chapel → 1853 Palladian (six Doric) → 1861 statue → 1910s rubber → 1964 Fr Joachim Teng rebuild → 1991-97 
Stations/columbarium/hall → 2012 consecration (Abp Chia) / 2017 Rosary Garden (Abp Goh, Mauduit headstone). 
 
Routing: src/App.tsx — 17 Route entries (16 + *), 5 alias groups / 7 alias paths: 
- /worship canonical for /mass-times + /hours-location + /visit (#mass/#confession/#visit) 
- /ministries ↔ /ministry (#liturgical/#faith-formation/#pastoral-care + family-life/youth/mandarin) 
- /news-events ↔ /news-and-events 
- /serve ↔ /volunteer 
- /give ↔ /donate 
- Replaces old: /about-blessed-stanley-rother→/about, /what-to-see→/ministries, /pilgrimage→/worship (now 3 aliases) 
 
Data: 
- content.ts — 8 interfaces, lifeTimeline 8 (1845–2017 SG vs 1935–2023 Rother), grounds 3 (main-church/chapel/rosary-garden) replaces whatToSee 3, ministries 6 
  (liturgical/faith-formation/pastoral-care/family-life/youth/mandarin) new, faqs 6 SG, upcomingEvents 6 (Parish|Devotion|Formation|Archdiocese + optional href), givingOptions 8 SG (PayNow UEN T08CC4043C / 
  SSVP / GIFT / Boys' Town…), priests 3 + ppcMembers 16 + serveRoles 4 + devotions 6 new, images 10 keys (wikimedia hero + 2 Pexels CDN + 8 local) 
- site.ts — Singapore canonical: hours 4 keys (gates/mainChurch/chapel/bookshop/adorationRoom), mass (weekdayMorning/weekdayEvening/saturday/sunday[4]/confession/adoration/secondCollection), contact (priest 
  phones + office), transport (Cashew MRT + buses), feast 1 May, uen, chequePayee, facebook, archdiocese 
- nav.ts — primaryNav 6 (About/Worship/Ministries children+description), footerNav 10 (slice 0-4 Explore, 4-10 Get Involved) 
- public/images — 8 files (vs old 4): hero-church.jpg/chapel-interior.jpg/sanctuary.jpg/rosary-garden.jpg/stained-glass.jpg/parish-hall.jpg/cemetery.jpg/feast.jpg 
 
Components: SafeImage fallback → /images/hero-church.jpg, PageHero fallback? prop, Layout hash-scroll still double-hash aware (anchors now #mass/#confession/#visit + 6 ministry ids), Header top bar 
(address/feast + useScrolled(16)), Footer Singapore 4-col, NotFound text “This path does not lead to the church” 
 
Testing: src/test + src/**/*.test.* removed — 0 unit tests (vs old 6/29); e2e/ 20 tests STALE (still assert “shepherd who stayed”, Apla's Circle, #pilgrim-center etc.) — docs now mark gate as lint && typecheck 
&& build minimum until rewrite 
 
### Files rewritten 
 
┌──────────────────────────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬──────────────────────────────────────────────┐ 
│ File                     │ New identity                                                                                                                        │ Verification                                 │ 
├──────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────┤ 
│ AGENTS.md                │ st-joseph-bt port, 7 aliases, 9 hash anchors, stale-test disclaimer, 8-image quirk, ministries jump-nav                             │ ✅ pnpm typecheck green, no lingering        │ 
│                          │                                                                                                                                     │ Oklahoma primary                             │ 
├──────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────┤ 
│ README.md                │ Intro + Key Features 8 rows (10 pages), Architecture 17 routes, File Hierarchy 10 pages/8 images/3 data files, Verify Setup notes 0 │ ✅                                           │ 
│                          │ tests, Troubleshooting SG anchors                                                                                                   │                                              │ 
├──────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────┤ 
│ CLAUDE.md                │ 466 lines, full skeleton preserved, SG history verbatim, 14-section + Validation Checklist, src/ 32 files, stale-test flagged       │ ✅ pnpm lint + typecheck green               │ 
├──────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────┤ 
│ rothershrine-v2_SKILL.md │ Renamed header st-joseph-bt v1.0.0, 20 §§ + 4 appendices, Appendix D port diff, interfaces match src/data/* byte-for-byte           │ ✅ 100 KB, copy-pasteable contracts          │ 
└──────────────────────────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴──────────────────────────────────────────────┘ 
 
Build gate: pnpm typecheck PASS, pnpm lint PASS, pnpm build SUCCESS → dist/index.html 375 kB singlefile + dist/images/ 8 files 
 
│ Next to restore full confidence: rewrite e2e/ for Worship/Ministries/Serve aliases + #mass hash, and re-add src/**/*.test.ts for cn/nav/content/site invariants — the docs now document the target shape for 
│ that work.

---

Restore full confidence — Meticulous Plan for st-joseph-bt 
 
│ Current src/ is the Singapore port of stjoseph-bt.org.sg. src.orig/ is frozen (Rother Shrine). Previous doc-migration is done. What's broken now: 0 unit tests, 0 test config, 20 E2E all stale — pnpm lint &&  
│ typecheck && build passes but the gate is hollow. This plan restores the 5-step gate. 
 
0 — ANALYZE findings (ground truth) 
 
Contracts (from src/ reads): 
- src/App.tsx — 17 Route entries (16 + *), 5 alias groups / 7 aliases: /mass-times|/hours-location|/visit → /worship, /ministry → /ministries, /news-and-events → /news-events, /volunteer → /serve, /donate → 
  /give. Hash anchors: #mass, #confession, #visit (Worship) + #liturgical, #faith-formation, #pastoral-care, #family-life, #youth, #mandarin (Ministries). 
- src/data/content.ts — 8 interfaces + priests[3], ppcMembers[16], lifeTimeline[8] (1845–2017 Kranji→Palladian→rubber→Teng→Rosary Garden), grounds[3] (main-church/chapel/rosary-garden), ministries[6] 
  (liturgical/faith-formation/pastoral-care/family-life/youth/mandarin), faqs[6] SG, upcomingEvents[6] (Parish|Devotion|Formation|Archdiocese + href?), givingOptions[8] 
  (PayNow/Weekend/Cash/Cheque/SSVP/GIFT/Boys' Town/Mass offerings), serveRoles[4], devotions[6], images 11 keys (wikimedia hero + pexels nave/courtyard + 8 local /images/*.jpg). 
- src/data/site.ts — stjoseph-bt.org.sg verified: address 620 Upper Bukit Timah SG 678116, hours 4 keys, mass (weekdayMorning/Evening, saturday, sunday[4], confession, adoration, secondCollection), contact 3   
  phones, transport, feast 1 May, UEN T08CC4043C, cheque payee, facebook, archdiocese, maps URLs. 
- src/data/nav.ts — primaryNav[6]: Home, About (3 children), Worship (3 children #mass|#confession|#visit), Ministries (3 children #liturgical|#faith-formation|#pastoral-care), News & Events, Serve. 
  footerNav[10]. 
- vite.config.ts — no test block, no server.watch.ignored. tsconfig.json — include: ["src","vite.config.ts"] only, types: ["node"] (missing vitest/globals). No src/test/setup.ts. Result: pnpm test exits 0 with 
  no tests; stale harness silently passes. 
- e2e/*.spec.ts — still asserts Rother content: "shepherd who stayed", "National Shrine · Oklahoma City", "/about-blessed-stanley-rother", "/what-to-see" + #pilgrim-center|#shrine-church|#tepeyac-hill, 
  "/pilgrimage" + mailto pilgrimage@rothershrine.org, Give → Tepeyac Hill|Guatemala Mission|Apla's Circle|General Fund + rothershrine.org/give, FAQ → "Is the Shrine open". Will all fail on current src/. 
 
Trade-offs evaluated: 
- Option A — restore harness exactly as src.orig had it (vitest jsdom + setup + 6–8 files): lowest risk, reuses proven pattern, docs already expect it. Chosen. 
- Option B — switch to minimal no-jsdom pure-data tests only: would avoid IntersectionObserver mocks but loses Button/SkipLink coverage. Rejected. 
- Option C — full E2E greenfield with new helpers vs surgical patch: patch retains stale selectors and is brittle; greenfield rewrite against src/ anchors is cleaner. Chosen — rewrite 4 specs. 
 
Risks: Pexels route.abort flakiness (keep 500ms wait + fallback check), HashRouter double-hash timing (Layout 80ms timeout — tests must await hash URL + element visible), pnpm test with --max-warnings 0 + 
strict flags will fail on any unused param (enforce _ prefix). 
 
---
 
1 — PLAN (sequenced, checkable, estimated) 
 
### Phase 1 — Restore test harness (prereq, ~0.3d) 
 
Goal: pnpm typecheck && pnpm lint && pnpm test runs without “no tests” hollow pass. 
 
- [ ] 1a vite.config.ts — re-add test: { globals:true, environment:"jsdom", setupFiles:["src/test/setup.ts"], include:["src/**/*.{test,spec}.{ts,tsx}"], 
      exclude:["e2e/**","node_modules/**","playwright-report/**","test-results/**"] } + server: { watch:{ ignored: 
      ["**/skills/**","**/dist/**","**/playwright-report/**","**/test-results/**","**/coverage/**","**/src.orig/**"] }} — src.orig already ignored in eslint but not in vite watcher (prevents ENOSPC). 
- [ ] 1b tsconfig.json — include: ["src","vite.config.ts","eslint.config.js","playwright.config.ts"] + compilerOptions.types: ["node","vitest/globals"] — restores global describe/it/expect. 
- [ ] 1c Restore src/test/setup.ts verbatim from src.orig/test/setup.ts (jest-dom/vitest + IntersectionObserver mock + scrollTo/scrollIntoView stubs). 
- [ ] 1d Verify scripts need no change (vitest run + playwright test already pinned); add allowScripts already present. 
 
Verify: pnpm typecheck silent, pnpm lint 0 warnings, pnpm test reports No test files found (expected before Phase 2). 
 
### Phase 2 — Unit tests: port 6→8 files / ~35 tests (~0.5d) 
 
TDD — copy src.orig pattern (getMockX not needed; these are invariant tests).

┌──────────────────────────────────┬──────────────────────────────┬──────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ 
│ File                             │ Source of truth              │ Tests        │ Key assertions (new vs old)                                                                                                  │ 
├──────────────────────────────────┼──────────────────────────────┼──────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ src/utils/cn.test.ts             │ src/utils/cn.ts              │ 5 (reuse     │ twMerge dedup, clsx falsy                                                                                                    │ 
│                                  │                              │ verbatim)    │                                                                                                                              │ 
├──────────────────────────────────┼──────────────────────────────┼──────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ src/data/nav.test.ts             │ src/data/nav.ts              │ 6 (ported)   │ primaryNav 6, 2 items with children+description (About, Worship+Ministries actually 3 with children — adjust to 3 or keep    │ 
│                                  │                              │              │ 2+3 split; see note), all labels/to non-empty, Worship children == ["/worship#mass","/worship#confession","/worship#visit"], │ 
│                                  │                              │              │ Ministries children == ["/ministries#liturgical","/ministries#faith-formation","/ministries#pastoral-care"], footerNav 10,   │ 
│                                  │                              │              │ labels contain Give/FAQ/Mass Times                                                                                           │ 
├──────────────────────────────────┼──────────────────────────────┼──────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ src/data/content.test.ts         │ src/data/content.ts          │ 7 (expanded) │ lifeTimeline 8 (year/title/desc), grounds 3 ids [main-church,chapel,rosary-garden] + imageAlt, ministries 6 ids              │ 
│                                  │                              │              │ [liturgical,faith-formation,pastoral-care,family-life,youth,mandarin] + imageAlt, faqs 6 (ends ?), upcomingEvents 6          │ 
│                                  │                              │              │ categories `Parish                                                                                                           │ 
├──────────────────────────────────┼──────────────────────────────┼──────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ src/data/site.test.ts            │ src/data/site.ts             │ 4–5 (ported) │ address 620 Upper Bukit Timah / 678116 / query encoded, maps URLs google.com, contact phones + office + UEN T08CC4043C +     │ 
│                                  │                              │              │ chequePayee, hours 4 keys + mass sunday[4] + confession + feast 1 May                                                        │ 
├──────────────────────────────────┼──────────────────────────────┼──────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ src/components/ui/Button.test.ts │ src/components/ui/Button.tsx │ 6 (reuse     │ to→Link, href→a, button→button, variants primary/secondary/ghost/outline-light + icon                                        │ 
│ x                                │                              │ verbatim)    │                                                                                                                              │ 
├──────────────────────────────────┼──────────────────────────────┼──────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ src/components/SkipLink.test.tsx │ src/components/SkipLink.tsx  │ 3 (reuse     │ href "#main-content", activation does not rewrite hash under HashRouter, focus moves to #main-content                        │ 
│                                  │                              │ verbatim)    │                                                                                                                              │ 
├──────────────────────────────────┼──────────────────────────────┼──────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ src/components/ui/Accordion.test │ (new, from src.orig)         │ 2            │ single-open + aria-expanded (FAQ page contract)                                                                              │ 
│ .tsx                             │                              │              │                                                                                                                              │ 
├──────────────────────────────────┼──────────────────────────────┼──────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ src/components/SafeImage.test.ts │ (new, from src.orig)         │ 2            │ onError fallback once via dataset guard, loading lazy default                                                                │ 
│ x                                │                              │              │                                                                                                                              │ 
└──────────────────────────────────┴──────────────────────────────┴──────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ 
 
│ Note on nav children count: current src/data/nav.ts has 3 items with children (About, Worship, Ministries) vs orig 2 (About, WhatToSee). Decide to document 3 and update test accordingly — do not “fix” data   
│ to fit old test. 
 
Verify: pnpm test — 8 files / ~35 passed. 
 
### Phase 3 — E2E: rewrite 4 specs / 20 tests (~0.7d) 
 
Keep playwright.config.ts as-is (chromium, baseURL http://localhost:5173, expect 15s cold-start headroom). e2e/helpers.ts stays. 
 
┌────────────────────────────────┬───────────────────────────────────────────┬─────────────────────────────────────────────────────────────────────────────────────────────┬────────────────────────────────────┐ 
│ Spec                           │ Old stale                                 │ New target (current src/)                                                                   │ Anchors & aliases to cover         │ 
├────────────────────────────────┼───────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤ 
│ e2e/smoke.spec.ts (7)          │ shepherd who stayed,                      │ Home hero “A church on the hill since 1846.” + fact labels Sunday Mass / Find us / Feast    │ 17 routes + 7 aliases + 6+ hash    │ 
│                                │ /about-blessed-stanley-rother,            │ day / Confession; alias /about (About H1 “A home under St Joseph's care”); /mass-times +    │                                    │ 
│                                │ /what-to-see + tepeyac, /pilgrimage       │ /hours-location + /visit → Worship H1 “Mass, mercy…”; Ministries #liturgical etc.; Worship  │                                    │ 
│                                │                                           │ #visit + #mass + #confession; NotFound text “This path does not lead to the church.”;       │                                    │ 
│                                │                                           │ mobile drawer closes on nav (link Serve)                                                    │                                    │ 
├────────────────────────────────┼───────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤ 
│ e2e/navigation.spec.ts (5)     │ hover What to See → 3 children, footer    │ hover Ministries → 3 children (Liturgical/Faith Formation/Pastoral Care + descriptions),    │ desktop 1280×800 hover,            │ 
│                                │ Tepeyac Hill                              │ hover Worship → 3 children (Mass Times/Confession & Adoration/Find Us); SkipLink keeps URL  │ aria-expanded, mobile 375×812      │ 
│                                │                                           │ #/ and focuses #main-content; keyboard nav Worship→Ministries; footer 10 links (Explore     │                                    │  │                                │                                           │ History, Get involved Liturgical etc.); header Give → /give; drawer a11y aria-expanded      │                                    │ 
├────────────────────────────────┼───────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤ 
│ e2e/ministries.spec.ts (new,   │ `#pilgrim-center                          │ #shrine-church                                                                              │ #tepeyac-hill` + fallback          │ 
│ replaces what-to-see.spec.ts)  │                                           │                                                                                             │                                    │ 
│ (4)                            │                                           │                                                                                             │                                    │ 
├────────────────────────────────┼───────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤ 
│ e2e/give-faq.spec.ts (4)       │ `Apla's Circle                            │ Tepeyac Hill                                                                                │ Guatemala                          │ 
│                                │                                           │                                                                                             │ Mission+rothershrine.org/give`     │ 
└────────────────────────────────┴───────────────────────────────────────────┴─────────────────────────────────────────────────────────────────────────────────────────────┴────────────────────────────────────┘ 
 
Keep smoke 7 + navigation 5 + ministries 4 + give-faq 4 = 20. Preserve helpers.ts gotoHash. 
 
Verify: pnpm test:e2e — 20 passed (chromium), traces/videos on-first-retry clean. 
 
### Phase 4 — Pre-push gate + CI alignment (~0.2d) 
 
- [ ] Gate restores to five green: pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build (was hollow lint && typecheck && build). 
- [ ] .github/workflows/ci.yml — confirm pnpm/action-setup v4 (11) → setup-node 24 → pnpm install --frozen-lockfile → lint → typecheck → test → playwright install --with-deps chromium → test:e2e → build + 
      artifacts still mirrors gate; no change needed unless CI typecheck failed due to tsconfig include. 
- [ ] pnpm build — singlefile dist/index.html (~375 kB gzip ~111 kB) + dist/images/ 8 files uploaded — unchanged. 
- [ ] Docs final sync — AGENTS.md Commands table + Structure e2e/ 20 tests STALE → green + Quirks test harness hollow → vitest 3.2.6 jsdom (8/35 + 20 E2E); CLAUDE.md Testing Strategy + Validation Checklist (#5 
      Testing row); README.md Verify Setup table; rothershrine-v2_SKILL.md §3 + §11 Pre-Ship checklist (re-enable pnpm test + test:e2e rows). 
 
### Phase 5 — Optional hardening (if time, not gate-blocking) 
 
- Axe scan on Worship/FAQ, prefers-reduced-motion for hero-ken-burns, CSP img-src already allows upload.wikimedia.org + images.pexels.com (verified). 
 
Success criteria (done =): 
- pnpm lint 0 warnings, pnpm typecheck 0 errors, pnpm test 8 files / ~34–36 passed, pnpm test:e2e 20 passed (chromium), pnpm build inlines correctly. All 10 pages + 7 alias paths + 9 hash anchors navigate on   
  /#/ including double-hash /#/worship#mass and /#/ministries#liturgical. No any, no unused locals, no missing imageAlt. 
 
Risks & mitigations: Pexels CDN abort timing → assert “all src non-empty” not exact fallback string; cold-start blank → keep 15s expect timeout; ENOSPC from skills/ → watch.ignored already in plan. 
 
---
 
Effort: ~1.7d total. Smallest increment that restores confidence is Phase 1+2 (unit) then Phase 3 (E2E) — either can land independently.

