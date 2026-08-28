Deep Understanding — St Joseph's Church (Bukit Timah) st-joseph-bt 
 
I have read AGENTS.md (60-sec cheat sheet), CLAUDE.md (authoritative ~439 lines, 6-phase workflow + full conventions), README.md (visitor-facing 1.3.0 overview), and rothershrine-v2_SKILL.md (1330-line 
engineering skill §§1-20 + Appendices A-D + Quick Ref). 
 
1. Synthesis — What I Understand 
 
Identity: Static SPA port of https://stjoseph-bt.org.sg/ — Singapore's second-oldest parish (620 Upper Bukit Timah Road, S678116), est. 1846 via Fr Anatole Mauduit M.E.P., 1853 Palladian church on 6 Doric 
columns, 1861 St Joseph statue, 1964 Fr Joachim Teng rebuild (30 Aug 1964, Abp Olçomendy), 1991-97 Stations/columbarium/hall, consecrated 1 May 2012 (Abp Chia), Rosary Garden 2017 (Abp Goh, Mauduit's 
headstone). Last Catholic cemetery in Singapore. Feast: St Joseph the Worker 1 May. Reverent editorial, not austere. 
 
Architecture Intent: No backend/DB/SSR/API until ADR. Single-file deploy: vite-plugin-singlefile 2.3.3 inlines JS+CSS → dist/index.html; public/images/ (8) copied → dist/images/ — both uploaded to GH Pages/S3. 
HashRouter is load-bearing for static hosts — /#/worship#mass etc. No BrowserRouter without 404.html shim. 
 
Stack (all exact-pinned, pnpm 11, Node≥20): React 19.2.8 + Vite 7.3.6 + @vitejs/plugin-react 5.2.0 + Tailwind 4.3.3/@tailwindcss/vite 4.1.17 (CSS-first @theme in src/index.css, no tailwind.config.js) + TS 
5.9.3 strict (noUnusedLocals/Params, noFallthroughCasesInSwitch, isolatedModules, noEmit) + React Router 7.18.2 + lucide-react 1.34.0 + clsx 2.1.1/tailwind-merge 3.6.0 via cn() + vitest 3.2.6/jsdom 
26.1.0/@testing-library/react 16.2.0 + playwright 1.55.1 chromium + eslint 9.39.5 flat. 
 
Routing — Single Source App.tsx (17 entries = 16 paths + *): 10 pages (Home, About, History, Worship, Ministries, NewsEvents, Serve, Give, FAQ, NotFound). 5 alias groups / 7 alias paths: /worship canonical for 
/mass-times+/hours-location+/visit; /ministries for /ministry; /news-events for /news-and-events; /serve for /volunteer; /give for /donate. Canonical flip: /about is now canonical (orig was 
/about-blessed-stanley-rother). Hash anchors: /worship → #mass/#confession/#visit; /ministries → 6 ids #liturgical/#faith-formation/#pastoral-care/#family-life/#youth/#mandarin (jump nav via <Link 
to="/ministries#id">, never plain <a href="#id">). Layout.tsx is double-hash aware (split # + strip / + 80ms scrollIntoView + fallback scrollTo). 
 
Data Layer — 3 files, single-source: content.ts = 8 interfaces + 10 exports (priests[3], ppcMembers[16], lifeTimeline[8] 1845-2017, grounds[3], ministries[6], faqs[6], upcomingEvents[6] with category 
Parish|Devotion|Formation|Archdiocese + optional href, givingOptions[8], serveRoles[4], devotions[6], images 11 — hero Wikimedia + 2 Pexels CDN + 8 local). site.ts = site as const (name/shortName/圣若瑟堂 
/tagline/vision + address + hours5 + mass7 + contact3 phones + transport Cashew MRT + 9 buses + feast1 May + UEN T08CC4043C/chequePayee/maps). nav.ts = primaryNav[6] + footerNav[10] with description on 
children — Header/Footer render from it. 
 
Components: Layout+SkipLink (preventDefault + imperative focus, never rewrites hash), Header (useScrolled(16) vs default 12 — intentional delay), Footer 4-col, PageHero (compact?, bg-grain + gradients, 
alt=""), SafeImage (CDN→local /images/hero-church.jpg via dataset.fallback guard, loading="lazy"), Reveal (IntersectionObserver 0.15), Accordion (single-open, arrow keys), Timeline (left rail), Button 
(discriminated to/href/button, 4 variants), Container, SectionHeading, Emblem, SocialIcons, cn(). 
 
Design System: src/index.css @theme — 24 colors + 2 shadows (shrine-cream/parchment/stone/ink/charcoal/maroon 50-950/gold 100-600/pine 500-700/terracotta 400/500 + shadow-shrine/shrine-lg) + 13 utilities 
(text-balance, bg-adobe-texture, bg-grain, divider-weave/thin, gold-rule/left, hero-ken-burns, reveal/visible, skip-link, mask-fade-b) + 2 keyframes. Tokens byte-identical to rothershrine line — only 
imagery/copy changed. Typography: Fraunces (display) + Source Sans 3 (body) via index.html + CSP. 
 
Critical Quirks: Alias @ sync (vite.config.ts ↔ tsconfig.json), viteSingleFile() inlining only JS+CSS, SafeImage default is /images/hero-church.jpg not hero-shrine.jpg, useScrolled threshold mismatch 
intentional, Ministries jump nav must use <Link>, CSP allowlist upload.wikimedia.org + images.pexels.com + google.com frames, skills/ + src.orig/ committed but ignored by eslint/tsc/watch. 
 
Docs sync issue already surfaced: rothershrine-v2_SKILL.md §2/§11 headers state harness is hollow (0 tests, stale E2E), yet AGENTS.md / CLAUDE.md / README.md all claim 8 files / 48 tests + 21 E2E green. 
SKILL.md version header says 1.0.0 vs README badge 1.3.0. vite.config.ts / tsconfig.json include/test block drift noted in §3.2 / Appendix D. This is precisely what validation must resolve. 
 
---
 
2. Validation Plan — Against Live Codebase 
 
Per the Meticulous Approach, I will not write code until this plan is approved. The goal: prove every claim in §§1-20 against executable config and source, and produce a Project Status Report (Aligned / Drift  
/ Gap). 
 
### Phase 0 — Baseline Capture

┌────────────────────────┬────────────────────────────────────────────────────────────────────────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────┐ 
│ Check                  │ Command / File                                                                     │ Success Criteria                                                                             │ 
├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ File census            │ fd --type f + bash: find src -type f | sort                                        │ Confirm src/ (35 files — 26 source + 8 tests + 1 setup) vs skill's 32-file claim; list drift │ 
├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Lockfile + versions    │ read package.json, read pnpm-lock.yaml head, bash: cat package.json | grep version │ All deps exact-pinned, packageManager pnpm 11.0.0, engines node>=20 match docs               │ 
├────────────────────────┼────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Badge vs skill version │ README.md badge vs rothershrine-v2_SKILL.md header vs package.json version         │ Single version truth identified                                                              │ 
└────────────────────────┴────────────────────────────────────────────────────────────────────────────────────┴──────────────────────────────────────────────────────────────────────────────────────────────┘ 
 
### Phase 1 — Config Sync (The Two-File Contracts) 
 
┌──────────────────────┬───────────────────────────────────────────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ 
│ Check                │ Files                                                 │ How                                                                                                                            │ 
├──────────────────────┼───────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Alias @→src          │ vite.config.ts resolve.alias vs tsconfig.json         │ rg "@/" vite.config tsconfig — must match                                                                                      │ 
│                      │ paths.@/* + baseUrl                                   │                                                                                                                                │ 
├──────────────────────┼───────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Tailwind v4          │ src/index.css @theme + vite.config.ts plugins order   │ No tailwind.config.* exists; @import "tailwindcss" first line; grep shrine- src/index.css = 24+2                               │ 
├──────────────────────┼───────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ TS strict            │ tsconfig.json                                         │ strict+noUnusedLocals+noUnusedParameters+noFallthroughCasesInSwitch+isolatedModules+noEmit all true; include =                 │ 
│                      │                                                       │ ["src","vite.config.ts",...] vs skill's 2-entry claim                                                                          │ 
├──────────────────────┼───────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ ESLint flat          │ eslint.config.js                                      │ ignores includes dist, skills, src.orig; react-hooks+react-refresh present                                                     │ 
├──────────────────────┼───────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Vitest harness       │ vite.config.ts test block vs src/test/setup.ts        │ Does test: { globals, jsdom, setupFiles, include, exclude } exist? Matches skill's "no test block" vs CLAUDE's block?          │ 
│                      │ existence                                             │                                                                                                                                │ 
├──────────────────────┼───────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ server.watch.ignored │ vite.config.ts                                        │ Compare against **/skills/** etc. — ENOSPC guard                                                                               │ 
├──────────────────────┼───────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Playwright           │ playwright.config.ts + e2e/*.spec.ts                  │ testDir e2e, webServer pnpm exec vite :5173, expect.timeout 15s; count specs (skill says 20 stale vs 21 green)                 │ 
└──────────────────────┴───────────────────────────────────────────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ 
 
### Phase 2 — Structure Census 
 
┌────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
│ Check          │ How                                                                                                                                                                                        │   
├────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤   
│ src/ inventory │ read src/App.tsx, read src/main.tsx, read src/index.css, fd src --type f | sort, read src/components/Layout.tsx, Header.tsx, Footer.tsx, SafeImage.tsx, SkipLink.tsx, hooks/useScrolled.ts │   
├────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤   
│ public/images/ │ bash: ls -l public/images + bash: ls -l dist/images (if built)                                                                                                                             │   
├────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤   
│ src.orig/      │ bash: ls src.orig | head                                                                                                                                                                   │   
├────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤   
│ index.html     │ read index.html                                                                                                                                                                            │   
└────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘   
 
### Phase 3 — Routing Contract Audit 

┌────────────────────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ 
│ Check              │ How                                                                                                         │ 
├────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Route table        │ read src/App.tsx — count Route                                                                              │ 
├────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Alias pairs        │ rg "aliasOf|path=\"/mass-times" src/App.tsx                                                                 │ 
├────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Hash anchors       │ rg 'id="mass"' src/pages/Worship.tsx + rg 'id="liturgical"' src/pages/Ministries.tsx + read src/data/nav.ts │ 
├────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Layout double-hash │ read src/components/Layout.tsx                                                                              │ 
└────────────────────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ 
 
### Phase 4 — Data Layer Truth 
 
┌─────────────────────┬──────────────────────────┐ 
│ Check               │ How                      │ 
├─────────────────────┼──────────────────────────┤ 
│ Interfaces          │ read src/data/content.ts │ 
├─────────────────────┼──────────────────────────┤ 
│ site.ts             │ read src/data/site.ts    │ 
├─────────────────────┼──────────────────────────┤ 
│ nav.ts              │ read src/data/nav.ts     │ 
├─────────────────────┼──────────────────────────┤ 
│ Historical fidelity │ `rg "1845                │ 
└─────────────────────┴──────────────────────────┘ 
 
### Phase 5 — Components & Design System 
 
┌───────────────────────────────────────────────────────────┬───────────────────────────────────────────────────────────┐ 
│ Check                                                     │ How                                                       │ 
├───────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────┤ 
│ SafeImage                                                 │ read src/components/SafeImage.tsx                         │ 
├───────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────┤ 
│ Button/Container/SectionHeading/PageHero/Reveal/Accordion │ read each                                                 │ 
├───────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────┤ 
│ useScrolled                                               │ read src/hooks/useScrolled.ts                             │ 
├───────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────┤ 
│ SkipLink                                                  │ read src/components/SkipLink.tsx                          │ 
├───────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────┤ 
│ Tokens                                                    │ bash: grep -c "shrine-" src/index.css + visual spot-check │ 
├───────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────┤ 
│ Anti-pattern scan                                         │ `rg "bg-\[#                                               │ 
└───────────────────────────────────────────────────────────┴───────────────────────────────────────────────────────────┘ 
 
### Phase 6 — Quality Gates (Execution) 
 
┌───────────┬────────────────┬────────────────────────────────────────────────────────────────────────────┐ 
│ Gate      │ Command        │ Expected (per docs)                                                        │ 
├───────────┼────────────────┼────────────────────────────────────────────────────────────────────────────┤ 
│ Lint      │ pnpm lint      │ Exit 0, --max-warnings 0                                                   │
├───────────┼────────────────┼────────────────────────────────────────────────────────────────────────────┤ 
│ Typecheck │ pnpm typecheck │ Exit 0                                                                     │ 
├───────────┼────────────────┼────────────────────────────────────────────────────────────────────────────┤ 
│ Unit      │ pnpm test      │ Resolve hollow vs 48: run and report actual 8 files / 48 passed or 0 tests │ 
├───────────┼────────────────┼────────────────────────────────────────────────────────────────────────────┤ 
│ E2E       │ pnpm test:e2e  │ Report 21 passed vs stale-failure; run once to prove                       │ 
├───────────┼────────────────┼────────────────────────────────────────────────────────────────────────────┤ 
│ Build     │ pnpm build     │ dist/index.html exists, single-file inlined, dist/images/ 8 files          │ 
└───────────┴────────────────┴────────────────────────────────────────────────────────────────────────────┘ 
 
### Phase 7 — Documentation Alignment Report 
 
Deliverable: table Claim (AGENTS/CLAUDE/README/SKILL) → Codebase Evidence → Status (Aligned/Drift/Gap) for every version, count, path, token, and route. Includes fix list for rothershrine-v2_SKILL.md §§2, 3.2, 
11 (hollow harness claim), version header, and vite.config.ts test/watch drift — so the skill can be re-pinned as the single source of truth. 
 
Estimated effort: ~25 tool calls, no code writes, read-only + one gate run. Risk: pnpm test:e2e may require npx playwright install; dist/ may not exist pre-build.

---

Validation Report — St Joseph's Church (Bukit Timah) st-joseph-bt 
 
Date: 2026-08-28 · Validator: Claw Code (Meticulous Approach, Phases 1–7) 
Baseline: Fresh clone, pnpm install --frozen-lockfile deterministic, Node ≥20 + pnpm 11 
 
All claims from AGENTS.md / CLAUDE.md / README.md / rothershrine-v2_SKILL.md were checked against executable config and source. Project status: GREEN — deploy-ready, 5-gate clean. 
 
---
 
0) Gate Summary — The Only Truth 
 
┌───────────┬──────────────────────────────────────┬──────────────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ 
│ Gate      │ Command                              │ Result       │ Evidence                                                                                                                                    │ 
├───────────┼──────────────────────────────────────┼──────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Lint      │ pnpm lint (eslint 9.39.5 flat        │ PASS exit 0  │ No warnings — ignores [dist, node_modules, coverage, playwright-report, test-results, skills, src.orig] working                             │ 
│           │ --max-warnings 0)                    │              │                                                                                                                                             │ 
├───────────┼──────────────────────────────────────┼──────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Typecheck │ pnpm typecheck (tsc --noEmit)        │ PASS exit 0  │ strict + noUnusedLocals/Params + noFallthroughCasesInSwitch + isolatedModules + noEmit clean — no dead imports                              │ 
├───────────┼──────────────────────────────────────┼──────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Unit      │ pnpm test (vitest 3.2.6 jsdom)       │ PASS 8/8,    │ src/utils/cn 5 + data/nav 7 + data/content 10 + data/site 6 + ui/Button 8 + SkipLink 3 + ui/Accordion 4 + SafeImage 5 via src/test/setup.ts │ 
│           │                                      │ 48/48        │  (jest-dom + IntersectionObserver mock + scroll stubs) — 3.7s                                                                               │ 
├───────────┼──────────────────────────────────────┼──────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ E2E       │ pnpm test:e2e (playwright 1.55.1     │ PASS 21/21   │ smoke 7 + navigation 6 + ministries 4 + give-faq 4 + helpers.ts — 26.9s, 2 workers, trace on-first-retry                                    │ 
│           │ chromium)                            │              │                                                                                                                                             │ 
├───────────┼──────────────────────────────────────┼──────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ Build     │ pnpm build (vite 7.3.6 +             │ PASS         │ dist/index.html 375.71 kB (gzip 111.17 kB) in 3.4s — Inlining: index-B6bp1a1d.js + style-XdlDWhaN.css; dist/images/ 8 files (2.5 MB) copied │ 
│           │ viteSingleFile 2.3.3)                │              │ via publicDir (not inlined)                                                                                                                 │ 
└───────────┴──────────────────────────────────────┴──────────────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ 
 
Full gate: pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build → all 5 green — matches CLAUDE.md Success Metrics / README.md Verify table / .github/workflows/ci.yml (Node 24, pnpm 11, 
--frozen-lockfile, 15-min timeout, concurrency: ci-${{ref}}, artifacts playwright-report on failure + dist always). 
 
---
 
1) Stack & Pin Verification — ALIGNED 
 
package.json read verbatim (all exact, no ^): 
 
┌─────────────────────────────────────────────────────────────────────────┬───────────────────────────────────────────┬──────────────────────────┬────────────────────────────────────────┬────────┐ 
│ Layer                                                                   │ Declared                                  │ Locked                   │ Doc claim                              │ Status │ 
├─────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────┼──────────────────────────┼────────────────────────────────────────┼────────┤ 
│ react / react-dom                                                       │ 19.2.8                                    │ pnpm-lock.yaml committed │ AGENTS/CLAUDE/README/SKILL §2 = 19.2.8 │ ✅     │ 
├─────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────┼──────────────────────────┼────────────────────────────────────────┼────────┤ 
│ vite / @vitejs/plugin-react                                             │ 7.3.6 / 5.2.0                             │ —                        │ same                                   │ ✅     │ 
├─────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────┼──────────────────────────┼────────────────────────────────────────┼────────┤ 
│ tailwindcss / @tailwindcss/vite                                         │ 4.3.3 / 4.1.17                            │ —                        │ same                                   │ ✅     │ 
├─────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────┼──────────────────────────┼────────────────────────────────────────┼────────┤ 
│ typescript / @types/react etc.                                          │ 5.9.3 / 19.2.18 / 19.2.5 / 22.20.1        │ —                        │ same                                   │ ✅     │ 
├─────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────┼──────────────────────────┼────────────────────────────────────────┼────────┤ 
│ react-router-dom                                                        │ 7.18.2                                    │ —                        │ same                                   │ ✅     │ 
├─────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────┼──────────────────────────┼────────────────────────────────────────┼────────┤ 
│ lucide-react                                                            │ 1.34.0                                    │ —                        │ same                                   │ ✅     │ 
├─────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────┼──────────────────────────┼────────────────────────────────────────┼────────┤  
│ clsx / tailwind-merge                                                   │ 2.1.1 / 3.6.0                             │ —                        │ same                                   │ ✅     │ 
├─────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────┼──────────────────────────┼────────────────────────────────────────┼────────┤ 
│ vite-plugin-singlefile                                                  │ 2.3.3                                     │ —                        │ same                                   │ ✅     │ 
├─────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────┼──────────────────────────┼────────────────────────────────────────┼────────┤ 
│ eslint flat + typescript-eslint + react-hooks + react-refresh + globals │ 9.39.5 / 8.28.0 / 5.2.0 / 0.4.19 / 16.1.0 │ —                        │ same                                   │ ✅     │ 
├─────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────┼──────────────────────────┼────────────────────────────────────────┼────────┤ 
│ vitest / jsdom / testing-library                                        │ 3.2.6 / 26.1.0 / 16.2.0 + jest-dom 6.6.3  │ —                        │ same                                   │ ✅     │ 
├─────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────┼──────────────────────────┼────────────────────────────────────────┼────────┤ 
│ playwright                                                              │ 1.55.1 (chromium)                         │ —                        │ same                                   │ ✅     │ 
├─────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────┼──────────────────────────┼────────────────────────────────────────┼────────┤ 
│ packageManager + engines                                                │ pnpm@11.0.0 + node>=20                    │ —                        │ same                                   │ ✅     │ 
├─────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────┼──────────────────────────┼────────────────────────────────────────┼────────┤ 
│ allowScripts esbuild                                                    │ esbuild 0.27.7 + 0.25.12                  │ —                        │ undocumented (minor drift)             │ ⚪     │ 
└─────────────────────────────────────────────────────────────────────────┴───────────────────────────────────────────┴──────────────────────────┴────────────────────────────────────────┴────────┘ 
 
pnpm install vs npm ci --legacy-peer-deps note (typescript-eslint 8.28.0 peer predates TS 5.9) — verified and correctly documented in all three docs. 
 
---
 
2) Config Sync — The Two-File Contracts 
 
┌─────────────────────────┬────────────────────────────────────────────────────┬───────────────────────────────────────────────────────────────────────────────────────┬────────────────────────────────────────┐ 
│ Contract                │ Doc claim                                          │ Codebase evidence                                                                     │ Status                                 │ 
├─────────────────────────┼────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────┤ 
│ Alias @→src             │ AGENTS/CLAUDE = vite.config.ts                     │ vite.config.ts: alias @ → src + tsconfig.json: baseUrl "." + paths @/* — in sync, rg  │ ✅                                     │ 
│                         │ path.resolve(__dirname,"src") ↔ tsconfig.json      │ @/  imports used everywhere                                                           │                                        │ 
│                         │ baseUrl:"." + paths {"@/*":["src/*"]} — must stay  │                                                                                       │                                        │ 
│                         │ in sync                                            │                                                                                       │                                        │ 
├─────────────────────────┼────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────┤ 
│ Tailwind v4 — no        │ Tokens only in src/index.css @theme                │ No tailwind.config.* file exists; vite.config.ts plugins [react(), tailwindcss(),     │ ✅                                     │ 
│ tailwind.config.*       │                                                    │ viteSingleFile()] in correct order; src/index.css @import "tailwindcss" first line    │                                        │ 
├─────────────────────────┼────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────┤ 
│ TS strict               │ AGENTS: strict + noUnusedLocals/Params +           │ tsconfig.json — all true; include                                                     │ ✅ but SKILL §3.2 drift — claims       │ 
│                         │ noFallthroughCasesInSwitch + isolatedModules +     │ ["src","vite.config.ts","eslint.config.js","playwright.config.ts"] + types            │ include ["src","vite.config.ts"] only  │ 
│                         │ noEmit                                             │ ["node","vitest/globals"]                                                             │ + types ["node"] only (see §8 drift    │ 
│                         │                                                    │                                                                                       │ table)                                 │ 
├─────────────────────────┼────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────┤ 
│ ESLint flat             │ AGENTS = flat, typescript-eslint 8 + react-hooks 5 │ eslint.config.js — exact match; tseslint.config(... with both ignores blocks; pnpm    │ ✅                                     │ 
│                         │  + react-refresh; ignores [dist, node_modules,     │ lint --max-warnings 0 enforces zero warnings                                          │                                        │ 
│                         │ coverage, playwright-report, test-results, skills, │                                                                                       │                                        │ 
│                         │ src.orig]                                          │                                                                                       │                                        │ 
├─────────────────────────┼────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────┤ 
│ Vitest harness          │ CLAUDE/AGENTS vite.config.ts test { globals,       │ vite.config.ts test block present with globals:true, environment:"jsdom",             │ ✅ but SKILL §3.2 drift — claims "No   │ 
│                         │ jsdom, setupFiles src/test/setup.ts, include       │ setupFiles:["src/test/setup.ts"], include/exclude — src/test/setup.ts exists          │ test block — vitest defaults apply"    │ 
│                         │ src/**/*.{test,spec}.{ts,tsx}, exclude e2e/** }    │ (IntersectionObserver mock + scrollTo stubs)                                          │ (false)                                │ 
├─────────────────────────┼────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────┤ 
│ server.watch.ignored    │ AGENTS: ignores [skills/**, dist/**,               │ vite.config.ts server.watch.ignored — exact 6-entry list present                      │ ✅ but SKILL §3.2 drift — claims "No   │ 
│                         │ playwright-report/**, test-results/**,             │                                                                                       │ server.watch.ignored" (false)          │ 
│                         │ coverage/**, src.orig/**] (ENOSPC guard)           │                                                                                       │                                        │ 
├─────────────────────────┼────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────┤ 
│ Playwright              │ playwright.config.ts chromium, webServer pnpm exec │ testDir ./e2e, baseURL http://localhost:5173, webServer command pnpm exec vite --port │ ✅                                     │ 
│                         │ vite :5173, expect timeout 15s, header handles CSP │ 5173 --host 127.0.0.1 --strictPort, reuseExistingServer !CI, retries CI ?2:0,         │                                        │ 
│                         │                                                    │ trace/video on failure + projects: [chromium] — exact                                 │                                        │ 
├─────────────────────────┼────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────┤  │ index.html CSP + fonts  │ Fraunces + Source Sans 3 via preconnect, CSP       │ index.html — CSP default-src 'self'; script-src 'self' 'unsafe-inline'; style-src     │ ✅                                     │ 
│                         │ img-src self data blob + upload.wikimedia.org +    │ 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src                         │                                        │ 
│                         │ images.pexels.com, frame-src google.com (maps), OG │ https://fonts.gstatic.com data:; img-src ... wikimedia + pexels; frame-src            │                                        │ 
│                         │ for Bukit Timah                                    │ https://www.google.com; connect-src 'self' — byte-for-byte, preconnect                │                                        │ 
│                         │                                                    │ fonts.googleapis.com + gstatic, Fraunces 400/500/600/700 + Source Sans 3              │                                        │ 
│                         │                                                    │ 400/500/600/700                                                                       │                                        │ 
└─────────────────────────┴────────────────────────────────────────────────────┴───────────────────────────────────────────────────────────────────────────────────────┴────────────────────────────────────────┘ 
 
---
 
3) Structure Census 
 
``` 
  src/ — 41 files found (find src -type f | sort) 
    App.tsx              # HashRouter + 17 Route (16 + * NotFound) 
    main.tsx             # StrictMode + createRoot 
    index.css            # @theme 24 colors + 2 shadows + 13 utilities + 2 keyframes 
    components/ (18)     # Layout, Header(useScrolled 16), Footer, PageHero, Emblem, Timeline, 
                         # SocialIcons, SafeImage(+.test), SkipLink(+.test), ui/Button(+.test), 
                         # ui/Container, ui/SectionHeading, ui/Accordion(+.test), ui/Reveal 
    hooks/ (1)           # useScrolled.ts (default 12, Header 16 — intentional) 
    pages/ (10)          # Home, About, History, Worship, Ministries, NewsEvents, Serve, Give, FAQ, NotFound 
    data/ (6)            # nav.ts + nav.test, content.ts + content.test, site.ts + site.test 
    utils/ (2)           # cn.ts + cn.test 
    test/ (1)            # setup.ts 
    *.test.{ts,tsx} 8 files / 48 tests 
  public/images/ 8 files — hero-church.jpg, chapel-interior.jpg, sanctuary.jpg, rosary-garden.jpg, 
                            stained-glass.jpg, parish-hall.jpg, cemetery.jpg, feast.jpg → dist/images/ (not inlined) 
  e2e/ 4 specs / 21 tests — smoke 7 + navigation 6 + ministries 4 + give-faq 4 + helpers.ts 
  src.orig/ frozen Rother snapshot — not imported, eslint/tsc ignored 
  .github/workflows/ci.yml — lint→typecheck→test→e2e→build + artifacts Node24/pnpm11 
``` 
 
┌──────────────────────────────────────┬────────────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────┬────────────────────────────────────┐ 
│ Claim                                │ Docs                   │ Actual                                                                                                   │ Status                             │ 
├──────────────────────────────────────┼────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤ 
│ src/ 35 files — 26 source + 8 tests  │ AGENTS/CLAUDE          │ 41 files (16–18 component sources + 10 pages + 6 data + 1 hook + 2 root + 8 tests + 1 setup) — docs      │ ⚠️ Doc count drift — harness is    │ 
│ + 1 setup                            │                        │ undercount by ~6; source count depends on whether .test files are included in "source"                   │ correct, count text is stale       │ 
├──────────────────────────────────────┼────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤ 
│ public/images/ 8 files               │ AGENTS/CLAUDE/README = │ ls public/images = 8 (exact names, 2.5 MB) → dist/images 8 after build                                   │ ✅                                 │ 
│                                      │ 8                      │                                                                                                          │                                    │ 
├──────────────────────────────────────┼────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤ 
│ skills/ vendored, git-tracked,       │ All docs               │ eslint ignores [skills, src.orig] + tsconfig exclude (only src in include) + server.watch.ignored        │ ✅                                 │ 
│ ignored by lint/tsc/watch            │                        │ **/skills/** + .gitignore contains skills/ but files are tracked (intentional)                           │                                    │ 
├──────────────────────────────────────┼────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤ 
│ src.orig/ frozen, not imported       │ All docs               │ ls src.orig exists; rg "src\.orig" src/ = 0 imports; eslint ignores src.orig + tsconfig include excludes │ ✅                                 │ 
│                                      │                        │ it                                                                                                       │                                    │ 
├──────────────────────────────────────┼────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤ 
│ viteSingleFile inlines JS+CSS only,  │ All docs               │ Build log Inlining: index-*.js / style-*.css + dist/images/ alongside dist/index.html — exactly as       │ ✅                                 │ 
│ publicDir copied                     │                        │ described                                                                                                │                                    │ 
└──────────────────────────────────────┴────────────────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────────┴────────────────────────────────────┘ 

---

4) Routing Contract — ALIGNED (17/17) 
 
src/App.tsx read verbatim: 
 
┌──────────────────┬────────────┬────────────────────────────────────────────────────────┬────────────────────┐ 
│ Path             │ Component  │ Role                                                   │ Verified           │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ /                │ Home       │ canonical                                              │ ✅                 │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ /about           │ About      │ canonical (orig /about-blessed-stanley-rother flipped) │ ✅ — no alias leak │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ /history         │ History    │ canonical                                              │ ✅                 │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ /worship         │ Worship    │ canonical for 3 aliases                                │ ✅                 │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ /mass-times      │ Worship    │ aliasOf /worship                                       │ ✅                 │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ /hours-location  │ Worship    │ aliasOf /worship (orig belonged to Pilgrimage)         │ ✅                 │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ /visit           │ Worship    │ aliasOf /worship                                       │ ✅                 │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ /ministries      │ Ministries │ canonical for 1 alias                                  │ ✅                 │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ /ministry        │ Ministries │ aliasOf /ministries                                    │ ✅                 │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ /news-events     │ NewsEvents │ canonical for 1 alias                                  │ ✅                 │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ /news-and-events │ NewsEvents │ aliasOf /news-events                                   │ ✅                 │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ /serve           │ Serve      │ canonical for 1 alias                                  │ ✅                 │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ /volunteer       │ Serve      │ aliasOf /serve                                         │ ✅                 │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ /give            │ Give       │ canonical for 1 alias                                  │ ✅                 │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ /donate          │ Give       │ aliasOf /give (orig was /shrinegift)                   │ ✅                 │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ /faq             │ FAQ        │ canonical                                              │ ✅                 │ 
├──────────────────┼────────────┼────────────────────────────────────────────────────────┼────────────────────┤ 
│ *                │ NotFound   │ catch-all "This path does not lead to the church."     │ ✅                 │ 
└──────────────────┴────────────┴────────────────────────────────────────────────────────┴────────────────────┘ 
 
- HashRouter intentional — guard comment present (no server-side rewrites). 
- 5 alias groups / 7 alias paths — preserved. 
- Hash anchors: /worship → #mass/#confession/#visit (rg id="mass" etc. in Worship.tsx, each scroll-mt-28); /ministries → #liturgical/#faith-formation/#pastoral-care/#family-life/#youth/#mandarin 
  (id={ministry.id} in Ministries.tsx loop, alternating bg-shrine-cream/bg-shrine-parchment). 
- Layout.tsx double-hash aware: resolveAnchor(pathname, hash) → if hash>1 slice(1) else split window.location.hash on #, filter(Boolean), last.replace(/^\//,"") + guard cleaned === pathname.replace(/^\//,"") →    setTimeout 80ms scrollIntoView({smooth}) + fallback scrollTo({top:0}) — present and correct. 
- No <a href="#id"> leakage: rg 'href="#' → only SkipLink href="#main-content" with preventDefault + focus (HashRouter-safe). All ministry/worship anchors use <Link to="/path#id"> (rg to="/ministries# → 1 nav  
  loop + to="/worship# in Buttons) — compliant. 
 
---
 
5) Data Layer — Single Source, ALIGNED 
 
┌─────────────────┬───────────────────────────────────────────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────────────────────────┬───────────┐ 
│ Export          │ Expected                                                                                  │ Actual (src/data/content.ts + site.ts + nav.ts)                                     │ Status    │ 
├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ lifeTimeline    │ 8 1845–2017                                                                               │ 8 — 1845 Mauduit walks → 1846 Kranji → 1853 Palladian → 1861 statue → 1910s rubber  │ ✅        │ 
│                 │                                                                                           │ → 1964 Teng 30 Aug 1964 → 1991–97 Stations/columbarium/hall → 2012                  │           │ 
│                 │                                                                                           │ consecration/2017 Rosary Garden (Mauduit headstone) — replaces 1935–2023            │           │ 
│                 │                                                                                           │ Oklahoma/Guatemala                                                                  │           │ 
├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ grounds         │ 3 main-church/chapel/rosary-garden                                                        │ 3 — each id + title + summary + details[4] + image + imageFallback + imageAlt       │ ✅        │ 
│                 │                                                                                           │ (replaces whatToSee pill-center/shrine-church/tepeyac)                              │           │ 
├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ ministries      │ 6 liturgical/faith-formation/pastoral-care/family-life/youth/mandarin                     │ 6 — each image/imageFallback/imageAlt required, details[4]                          │ ✅        │ 
├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ faqs            │ 6 Mass/confession/MRT+gates/feast 1 May/baptism-marriage/cemetery                         │ 6 — question ends with ? + answer length>20 — data/content.test.ts enforces         │ ✅        │ 
├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ upcomingEvents  │ 6 title+date+summary+category `Parish                                                     │ Devotion                                                                            │ Formation │ 
├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ givingOptions   │ 8 PayNow UEN/collections/cash boxes/cheque/SSVP/GIFT/Boys' Town/Mass offerings            │ 8 — icon union `flame                                                               │ church    │ 
├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ priests         │ 3 Jovita Ho / Leo Justin / Dominic Yeo-Koh                                                │ 3 — exact names/phones                                                              │ ✅        │ 
├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ ppcMembers      │ 16 ex-officio + elected/appointed                                                         │ 16 — rg ppcMembers = 16 (Gabriel Lok chairman etc.)                                 │ ✅        │ 
├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ serveRoles      │ 4 untyped                                                                                 │ 4 — Liturgical / Catechists / Pastoral care / Hospitality                           │ ✅        │ 
├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ devotions       │ 6 St Joseph First Wed / First Fri / Vocations / Children's / Divine Mercy / Adoration     │ 6 — when/where with Main Church/Chapel/Adoration Room                               │ ✅        │ 
├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ images          │ 11 keys, 3 CDN on 2 hosts                                                                 │ 11 — hero wikimedia 2025 front view + heroFallback /images/hero-church.jpg + 6      │ ✅        │ 
│                 │                                                                                           │ local + naveCdn + courtyardCdn Pexels (3 CDN)                                       │           │ 
├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ site (site.ts)  │ as const: name/shortName/圣若瑟堂/tagline/vision + address 620 Upper Bukit Timah 678116   │ Read verbatim — all 17 top keys present, no duplication in pages (rg 620 Upper →    │ ✅        │ 
│                 │ (full+query getters) + hours 5 + mass 7 + contact 3 phones + transport Cashew MRT + 9     │ only Give.tsx via site.uen/chequePayee + Worship.tsx title + test fixture)          │           │ 
│                 │ buses + feast 1 May + UEN                                                                 │                                                                                     │           │ 
│                 │ T08CC4043C/chequePayee/facebook/archdiocese/mapsUrl/mapsEmbedSrc                          │                                                                                     │           │ 
├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ nav (nav.ts)    │ primaryNav 6 (3 with children+description) + footerNav 10                                 │ primaryNav 6 — Home / About{3} / Worship{3 with hash} / Ministries{3 with hash} /   │ ✅        │ 
│                 │                                                                                           │ News & Events / Serve — each child has description                                  │           │ 
├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ Parish fidelity │ No Rother leakage                                                                         │ `rg -i "rother                                                                      │ tepeyac   │ 
├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ Leak method     │ Pages render from data/, no inline copy                                                   │ `rg site.(address                                                                   │ mass      │ 
└─────────────────┴───────────────────────────────────────────────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────────────────────────────┴───────────┘ 
 
Interfaces (§20 verbatim): TimelineEntry, GroundsPlace, Ministry, FaqItem, EventItem (category union), GivingOption (icon union), Priest, PpcMember — all 8 present with imageAlt + imageFallback required on 
GroundsPlace/Ministry (a11y contract). 
 
---
 
6) Components & Hooks — ALIGNED 
 
┌────────────────┬────────────────────────────────────────────────────────────────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────┬────────┐ 
│ Primitive      │ Contract                                                                   │ Evidence                                                                                               │ Status │ 
├────────────────┼────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────┤ 
│ Layout         │ Outlet + double-hash scroll + SkipLink                                     │ resolveAnchor splits window.location.hash on #, cleaned.replace(/^\//,""), guard vs pathname, 80ms +   │ ✅     │ 
│                │                                                                            │ fallback scrollTo                                                                                      │        │ 
├────────────────┼────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────┤ 
│ Header         │ useScrolled(16) (default 12) → maroon-950/92 blur; transparent at Home     │ useScrolled(16) called; solid = scrolled || !isHome; aria-expanded={mobileOpen} + aria-haspopup on     │ ✅     │ 
│                │ top; aria-expanded/haspopup + Escape + route-change close +                │ dropdowns; useEffect [pathname] resets menu; keydown Escape handler; top bar lg shows                  │        │ 
│                │ overflow:hidden mobile drawer                                              │ site.address.street · site.feast + Give link                                                           │        │ 
├────────────────┼────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────┤ 
│ SafeImage      │ fallback="/images/hero-church.jpg" (not hero-shrine.jpg), loading="lazy",  │ src/components/SafeImage.tsx default fallback is /images/hero-church.jpg; loading lazy; onError        │ ✅     │ 
│                │ onError → dataset.fallback guard (once), fade-in via loaded                │ target.dataset.fallback="1" swap once; cn transition-opacity loaded?opacity-100:0; E2E route.abort     │        │ 
│                │                                                                            │ wikimedia/pexels → fallback exercised and passing                                                      │        │ 
├────────────────┼────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────┤ 
│ SkipLink       │ preventDefault + imperative focus #main-content (never rewrites hash)      │ href="#main-content" with preventDefault + getElementById + set tabindex -1 + focus + scrollIntoView — │ ✅     │ 
│                │                                                                            │ covered by SkipLink.test.tsx 3 tests + e2e/navigation                                                  │        │ 
├────────────────┼────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────┤ 
│ useScrolled    │ threshold 12 default; Header passes 16 — intentional mismatch              │ useScrolled.ts = threshold=12; Header = useScrolled(16) — docs correctly call this intentional         │ ✅     │ 
├────────────────┼────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────┤ 
│ Button         │ Discriminated to/href/button + 4 variants via variantClasses + cn()        │ to→<Link>, href→<a>, else <button>; variantClasses Record<Variant,string> central; cn(baseClasses,     │ ✅     │ 
│                │                                                                            │ variantClasses[variant], className)                                                                    │        │ 
├────────────────┼────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────┤ 
│ Ministries     │ ministries.map → <Link to="/ministries#id"> + 6 pills aria-label="Jump to  │ Ministries.tsx nav Link to={/ministries#${ministry.id}`}` inside `aria-label="Jump to ministry"` flex; │ ✅     │ 
│ jump nav       │ ministry" + alternating bg-shrine-cream/parchment                          │ sections `id={ministry.id}` + `scroll-mt-28` + `index%2===1 ? parchment:cream`                         │        │ 
├────────────────┼────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────┤ 
│ Reveal         │ IntersectionObserver 0.15 + prefers-reduced-motion fallback                │ Reveal.tsx uses threshold 0.15, reveal → reveal-visible with setup.ts mock                             │ ✅     │ 
├────────────────┼────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────┤ 
│ cn             │ twMerge(clsx(...)) only merge path                                         │ src/utils/cn.ts = that + cn.test.ts enforces dedup                                                     │ ✅     │ 
└────────────────┴────────────────────────────────────────────────────────────────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────┴────────┘ 
 
Anti-pattern scan: rg "any|bg-\[#|amber-|slate-|as any" src/ → 0 hits; rg cn\( src/ → all conditional classes via cn(); no any, no arbitrary hex, no tailwind.config.* — clean. 
 
---
 
7) Design System — ALIGNED 
 
src/index.css @theme byte-for-byte: 
 
- Tokens: shrine-cream #faf6ec, parchment #f2e9d6, parchment-dark #e7d9b8, stone #dccfae, ink #2a2115, charcoal #423a2c, maroon 50 #fbf0ee /100 #f3d9d4 /500 #7c2a25 /600 #691f1e /700 #55191a /800 #431315 /900  
  #33100f /950 #200a0a, gold 100 #f8ecd2 /300 #e2bf72 /400 #d1a955 /500 #c3963f /600 #a67a2e, pine 500 #335840 /600 #26402f /700 #1c3123, terracotta 400 #c17a53 /500 #ab5f3c = 24 colors + shadow-shrine rgba 
  0.45 + shadow-shrine-lg rgba 0.55 = 26 theme entries. grep shrine- index.css = 41 hits including usage — definition count 26 correct. 
- Fonts: Fraunces (display, 400/500/600/700) + Source Sans 3 (body) via @theme --font-display/sans/body + @layer base h1–h4 font-display. 
- Utilities: text-balance, bg-adobe-texture (dual radial), bg-grain (svg turbulence 0.035), divider-weave (45deg 6px), divider-weave-thin (90deg 10px height 3px), gold-rule/gold-rule-left + gold-rule-draw 
  0.9s, hero-ken-burns 20s ease-out, mask-fade-b, reveal/visible, skip-link z-[100] -translate-y-24 → focus:translate-y-0 = 13 + 2 keyframes gold-rule-draw/hero-ken-burns — matches AGENTS/CLAUDE 13. Both 
  killed under prefers-reduced-motion: reduce via @layer base + utilities. 
- Rule compliance: No bg-[#...], no amber-*/slate-*, only shrine-* + allowed shadow-shrine/-lg; mobile-first sm:/lg: (Header lg:flex / lg:hidden breakpoint correct). 
 
---
 
8) Drift & Gap Register — Fix Required (Docs Only) 
 
Codebase is clean; drift lives in rothershrine-v2_SKILL.md and README.md badge counts, not in source. CLAUDE.md and AGENTS.md are aligned with the codebase (except AGENTS.md file-count phrasing). 
 
┌────┬───────────────────────────────┬───────────────────────────────────────────────────┬──────────────────────────────────────────────────────┬──────────┬────────────────────────────────────────────────────┐ 
│ #  │ File                          │ Doc Claim                                         │ Codebase Truth                                       │ Severity │ Fix                                                │ 
├────┼───────────────────────────────┼───────────────────────────────────────────────────┼──────────────────────────────────────────────────────┼──────────┼────────────────────────────────────────────────────┤ 
│ D1 │ rothershrine-v2_SKILL.md      │ project_state: ... 8 files/48 unit +21 E2E green  │ 8/48 + 21 green (proven above) — header is correct,  │ High     │ Replace §2 Test Harness table and §11 pre-ship     │ 
│    │ header + §2 Table             │ (ported...) vs §2 vitest: 0 tests hollow,         │ §2 hollow claim is stale port-draft                  │          │ gate with current reality (copy from CLAUDE.md     │ 
│    │                               │ playwright 20 tests stale — will fail             │                                                      │          │ Success Metrics: 8 files/48 + 4 specs/21 green)    │ 
├────┼───────────────────────────────┼───────────────────────────────────────────────────┼──────────────────────────────────────────────────────┼──────────┼────────────────────────────────────────────────────┤ 
│ D2 │ rothershrine-v2_SKILL.md §3.2 │ vite.config.ts: No test block — vitest defaults   │ vite.config.ts has test { globals, jsdom,            │ High     │ Update §3.2 row to reflect current vite.config.ts  │ 
│    │                               │ apply. No server.watch.ignored                    │ setupFiles, include, exclude } +                     │          │ (aligned with CLAUDE.md table)                     │ 
│    │                               │                                                   │ server.watch.ignored [6 entries]                     │          │                                                    │ 
├────┼───────────────────────────────┼───────────────────────────────────────────────────┼──────────────────────────────────────────────────────┼──────────┼────────────────────────────────────────────────────┤ 
│ D3 │ rothershrine-v2_SKILL.md §3.2 │ tsconfig.json: include ["src","vite.config.ts"]   │ tsconfig.json: include                               │ Medium   │ Sync with authoritative tsconfig.json (copy        │ 
│    │                               │ only, types ["node"] only                         │ ["src","vite.config.ts","eslint.config.js","playwrig │          │ CLAUDE.md table)                                   │ 
│    │                               │                                                   │ ht.config.ts"] + types ["node","vitest/globals"]     │          │                                                    │ 
├────┼───────────────────────────────┼───────────────────────────────────────────────────┼──────────────────────────────────────────────────────┼──────────┼────────────────────────────────────────────────────┤ 
│ D4 │ rothershrine-v2_SKILL.md §5.2 │ src/ 32 files, no tests, src/test deleted, vite   │ src/ 41 files, src/test/setup.ts present, 8 tests    │ High     │ Replace §5.2 inventory + §11 gate's "0 tests       │ 
│    │ + §11                         │ no test block                                     │ green                                                │          │ hollow, skip as gate" with current 41-file/8-test  │ 
│    │                               │                                                   │                                                      │          │ inventory (from §3 of this report)                 │ 
├────┼───────────────────────────────┼───────────────────────────────────────────────────┼──────────────────────────────────────────────────────┼──────────┼────────────────────────────────────────────────────┤ 
│ D5 │ rothershrine-v2_SKILL.md §3.2 │ AGENTS.md structure block listed as stale         │ AGENTS.md structure matches CLAUDE.md 41-ish; only   │ Low      │ Update AGENTS.md to src/ (41 files — 32 source + 8 │ 
│    │ last row                      │ (different)                                       │ its src/ (35 files — 26 source + 8 tests + 1 setup)  │          │ tests + 1 setup incl. setup) or recount to actual  │ 
│    │                               │                                                   │ phrasing undercounts                                 │          │ 41                                                 │ 
├────┼───────────────────────────────┼───────────────────────────────────────────────────┼──────────────────────────────────────────────────────┼──────────┼────────────────────────────────────────────────────┤ 
│ D6 │ README.md                     │ Badge version 1.3.0                               │ package.json version 1.0.0 + SKILL header version    │ Medium   │ Either bump package.json to 1.3.0 and sync badge,  │ 
│    │                               │                                                   │ 1.0.0 (port line 1.0.0, rothershrine line was 1.3.0) │          │ or change badge to 1.0.0 — decide once (recommend  │ 
│    │                               │                                                   │ — intra-repo mismatch                                │          │ 1.3.0 to signal continuity, or keep 1.0.0 as port  │ 
│    │                               │                                                   │                                                      │          │ reset and fix badge)                               │ 
├────┼───────────────────────────────┼───────────────────────────────────────────────────┼──────────────────────────────────────────────────────┼──────────┼────────────────────────────────────────────────────┤ 
│ D7 │ rothershrine-v2_SKILL.md      │ last_updated 2026-08-27T12:00Z                    │ Codebase last commit 75ebb8b porting remediation 2   │ Low      │ Bump last_updated + re-pin version on next docs    │ 
│    │                               │                                                   │ after docs — SKILL post-dates reality by 1 commit    │          │ fix                                                │ 
├────┼───────────────────────────────┼───────────────────────────────────────────────────┼──────────────────────────────────────────────────────┼──────────┼────────────────────────────────────────────────────┤ 
│ D8 │ All docs                      │ pnpm 11.0.0 + engines node>=20 — correct          │ package.json adds allowScripts                       │ Info     │ Optionally note allowScripts in Bootstrapping      │ 
│    │                               │                                                   │ esbuild@0.27.7/0.25.12 (undocumented but harmless)   │          │ table                                              │ 
└────┴───────────────────────────────┴───────────────────────────────────────────────────┴──────────────────────────────────────────────────────┴──────────┴────────────────────────────────────────────────────┘ 
 
No code fixes required. Do not delete or rewrite tests, do not change HashRouter, do not re-add src.orig to lint/tsc, do not reintroduce Rother content. 

---

9) Alignment Matrix — Executive Roll-Up 
 
┌───────────────────────────────────────┬─────────────────┬───────────────┬────────────┬─────────────┬────────────────────────────────────────┬────────────────────────┐ 
│ Domain                                │ AGENTS.md       │ CLAUDE.md     │ README.md  │ SKILL       │ Codebase                               │ Verdict                │ 
├───────────────────────────────────────┼─────────────────┼───────────────┼────────────┼─────────────┼────────────────────────────────────────┼────────────────────────┤ 
│ Identity / parish fidelity            │ ✅              │ ✅            │ ✅         │ ✅          │ ✅ 1845–2017 hill, no leakage          │ ALIGNED                │ 
├───────────────────────────────────────┼─────────────────┼───────────────┼────────────┼─────────────┼────────────────────────────────────────┼────────────────────────┤ 
│ Stack & pin                           │ ✅              │ ✅            │ ✅         │ ✅ (header) │ ✅ exact 7+13 deps                     │ ALIGNED                │ 
├───────────────────────────────────────┼─────────────────┼───────────────┼────────────┼─────────────┼────────────────────────────────────────┼────────────────────────┤ 
│ Route table 17 + aliases 7            │ ✅              │ ✅            │ ✅         │ ✅ (§5.4)   │ ✅ 17/17                               │ ALIGNED                │ 
├───────────────────────────────────────┼─────────────────┼───────────────┼────────────┼─────────────┼────────────────────────────────────────┼────────────────────────┤ 
│ Data layer shapes                     │ ✅              │ ✅            │ ✅         │ ✅ (§20)    │ ✅ 8 interfaces, 10 exports, 11 images │ ALIGNED                │ 
├───────────────────────────────────────┼─────────────────┼───────────────┼────────────┼─────────────┼────────────────────────────────────────┼────────────────────────┤ 
│ Components / hooks / quirks           │ ✅              │ ✅            │ ✅         │ ✅ (§5.5/6) │ ✅ thresholds, SafeImage, SkipLink     │ ALIGNED                │ 
├───────────────────────────────────────┼─────────────────┼───────────────┼────────────┼─────────────┼────────────────────────────────────────┼────────────────────────┤ 
│ Design tokens 24+2 / utilities 13     │ ✅              │ ✅            │ ✅         │ ✅ (§4)     │ ✅ 26 tokens, 13 utils, 2 keyframes    │ ALIGNED                │ 
├───────────────────────────────────────┼─────────────────┼───────────────┼────────────┼─────────────┼────────────────────────────────────────┼────────────────────────┤ 
│ Config contracts (alias, strict, CSP) │ ✅              │ ✅            │ ✅         │ drift D2–D3 │ ✅ per §2                              │ DRIFT (docs)           │ 
├───────────────────────────────────────┼─────────────────┼───────────────┼────────────┼─────────────┼────────────────────────────────────────┼────────────────────────┤ 
│ Harness 8/48 + 21 green               │ ✅              │ ✅            │ ✅         │ drift D1/D4 │ ✅ proven                              │ DRIFT (docs)           │ 
├───────────────────────────────────────┼─────────────────┼───────────────┼────────────┼─────────────┼────────────────────────────────────────┼────────────────────────┤ 
│ File census src/ count                │ ⚠️ 35 claim     │ ⚠️ 35 claim   │ ✅ diagram │ drift D5    │ 41 files                               │ DRIFT (count phrasing) │ 
├───────────────────────────────────────┼─────────────────┼───────────────┼────────────┼─────────────┼────────────────────────────────────────┼────────────────────────┤ 
│ Version badge vs package.json         │ ✅ 1.3.0 badge? │ ✅ (no badge) │ drift D6   │ ✅ 1.0.0    │ 1.0.0                                  │ DRIFT                  │ 
└───────────────────────────────────────┴─────────────────┴───────────────┴────────────┴─────────────┴────────────────────────────────────────┴────────────────────────┘ 
 
---
 
10) Project Status — SHIPPABLE 
 
- Gates: lint && typecheck && test && test:e2e && build — 5/5 green (69 tests total: 8 unit files + 4 E2E specs). 
- Deploy artifact: dist/index.html single-file (111 kB gzip) + dist/images/ 8 files — upload both to GH Pages/S3; HashRouter needs no 404.html. 
- A11y: SkipLink hash discipline, aria-expanded/haspopup on Header dropdowns, aria-label="Jump to ministry" on jump nav, imageAlt required on all GroundsPlace/Ministry, alt="" on decorative PageHero overlays,  
  focus-visible gold ring, prefers-reduced-motion kill — all present. (Formal axe-core/Lighthouse scan recommended before HSTS claim.) 
- No blockers. Next work is docs-only. 
 
---
 
11) Recommended Next Actions (Docs Patch, No Code Change) 
 
1. Patch rothershrine-v2_SKILL.md §§2, 3.2, 5.2, 11 to mirror CLAUDE.md / actual vite.config.ts + tsconfig.json + harness state (copy 8-file/48-test + 21-E2E-green tables from this report). Bump last_updated.  
2. Fix badge/package version mismatch — pick 1.3.0 (continuity) or 1.0.0 (port reset) and pin all three (package.json + README badge + SKILL header). CLAUDE.md / AGENTS.md pnpm-lock re-pin note applies. 
3. Tighten AGENTS.md census line — src/ (41 files — 32 source + 8 tests + 1 setup) with public/images/ 8 note (or recount to exclude *.test.* consistently). 
4. Optionally capture allowScripts in AGENTS.md Stack note. 
 
Would you like me to apply D1–D4 and D6 as a single docs PR (no source changes), verified with pnpm lint && pnpm typecheck && pnpm test && pnpm build? 

Delivery — Remediation Complete (Docs Sync) 
 
All 5 gates green — lint 0 + typecheck 0 + 8/48 + 21 + 375 kB verified 2026-08-28. 
 
What Changed — 4 Files, Zero Source Changes 
 
┌──────────────────────────┬──────────────────────────────────────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────────────────────────────────┐ 
│ File                     │ Drift                                                                                │ Fix                                                                                         │ 
├──────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ AGENTS.md                │ src/ (35 files — 26 source…) under-counted                                           │ → 41 files — 32 source + 8 tests + 1 setup (matches find src -type f | wc -l)               │ 
├──────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ CLAUDE.md                │ Same census + CI: test (currently empty) → will fail until rewritten + src.orig note │ → 41 files + CI: lint→typecheck→test→test:e2e→build + src.orig … (Bukit Timah port is 8/48  │ 
│                          │ stale                                                                                │ + 21 green)                                                                                 │ 
├──────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ README.md                │ Badge 1.3.0 vs package.json 1.0.0 + SKILL 1.0.0                                      │ → 1.0.0 (port line — package.json is source of truth; rothershrine line 1.3.0 stays in      │ 
│                          │                                                                                      │ src.orig + Appendix D)                                                                      │ 
├──────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────┤ 
│ rothershrine-v2_SKILL.md │ 6 drift sites — header last_updated 2026-08-27, §2 hollow 0 tests / 20 stale, §3.1 0 │ → last_updated 2026-08-28 + verified: lint 0 …, §2 → 8/48 + 21 green with build size, §3.1  │ 
│                          │ tests, §3.1 gate lint+typecheck+build, §3.2 vite.config.ts No test block / No        │ → 8 files/48 green, gate → all five must be green, §3.2 → test {globs…} +                   │ 
│                          │ watcher, tsconfig 2-file include, playwright Stale, e2e/ green without fallback,     │ server.watch.ignored [6], tsconfig 4-file + vitest/globals, playwright Green 21, .github    │ 
│                          │ .github will fail, §5.2 32 files no tests, Counts 35, §8.2 SkipLink now in src.orig  │ All five green, §5.2 → 41 files + test/setup + 8 tests, Counts 41, §8.2 → Covered by        │ 
│                          │ only, §9 #7 ["src","vite.config.ts"], §10 hollow/ENOSPC stale, §11 0 tests … 20      │ SkipLink.test 3 + e2e, §9 #7 → 4-file include, §10/11/L10/L11/Pitfalls/Appendix C all       │ 
│                          │ stale, L10–L11, Pitfalls, Appendix C                                                 │ synced (see git diff --stat 4 files, +42 −46)                                               │ 
└──────────────────────────┴──────────────────────────────────────────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────────────────────────────────────┘ 
 
No code, token, route, or data change. src/ (41), public/images (8 → dist/images 8), vite.config.ts test + watch, tsconfig strict, HashRouter 17/7/9, content.ts 8/10 exports, site.ts 17 keys, nav 6/10, 
SafeImage fallback, useScrolled 16, skip-link hash discipline — all proven in Phase 0–6 and untouched. 
 
Verification 
 
```bash 
  pnpm lint          # eslint 9.39.5 flat --max-warnings 0 
  pnpm typecheck     # tsc --noEmit strict 
  pnpm test          # 8 passed — 48 passed (cn 5 + nav 7 + content 10 + site 6 + Button 8 + SkipLink 3 + Accordion 4 + SafeImage 5) 
  pnpm test:e2e      # 21 passed (smoke 7 + navigation 6 + ministries 4 + give-faq 4) chromium 25.4s 
  pnpm build         # vite 7.3.6 singlefile → dist/index.html 375.71 kB (gzip 111 kB) + dist/images/ 8 
``` 
 
git diff --stat -- AGENTS.md README.md CLAUDE.md rothershrine-v2_SKILL.md = 4 files. 
 
Handoff 
 
- Deploy artifact dist/index.html + dist/images/ is unchanged and shippable to GH Pages/S3 (HashRouter, no 404.html needed). 
- Remaining docs health: git status shows skills/ mode noise (chmod) — untracked by tooling; ignore or git restore --worktree if noisy. package.json allowScripts esbuild is info-only. 
- Next recommended (optional): Commit as docs: sync SKILL/CLAUDE/AGENTS/README to 41-file 8/48+21 green (verified 2026-08-28) and push through the CI gate (lint→typecheck→test→test:e2e→build). No migration of  
  src.orig/ needed — it remains frozen reference. 
 
Copy-ready commit:

```bash 
  git add AGENTS.md README.md CLAUDE.md rothershrine-v2_SKILL.md 
  git commit -m "docs: sync SKILL/CLAUDE/AGENTS/README to 41-file 8/48+21 green (verified 2026-08-28)" 
  pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build 
  git push origin main 
``` 

