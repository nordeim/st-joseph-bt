# AGENTS — st-joseph-bt

> Port of https://stjoseph-bt.org.sg/ — St Joseph's Church (Bukit Timah), Singapore's second-oldest Catholic parish (620 Upper Bukit Timah Road, Singapore 678116). Static SPA — no backend, no DB, no SSR. For deep conventions, workflow, and design system detail, read `CLAUDE.md`.

## Stack

`React 19.2.8` + `Vite 7.3.6` + `Tailwind CSS 4.3.3` (`@tailwindcss/vite 4.1.17`, CSS-first `@theme` inline in `src/index.css`) + `TypeScript 5.9.3` strict + `React Router 7.18.2` `HashRouter` + `vite-plugin-singlefile 2.3.3` (primary `dist/index.html` + `dist/images/` for GH Pages / S3) + `eslint 9.39.5` flat + `vitest 3.2.6` (`jsdom 26.1.0`) + `@testing-library/react 16.2.0` + `playwright 1.55.1` (chromium) · alias `@` → `src/` (sync `vite.config.ts` `path.resolve(__dirname,"src")` ↔ `tsconfig.json` `paths: {"@/*":["src/*"]}` + `baseUrl:"."`) · `pnpm 11.0.0` (`packageManager` + `engines node>=20`, `pnpm-lock.yaml` committed, `--frozen-lockfile` in CI), `npm` works · all deps pinned exact — no `^` in `package.json` (re-pin on upgrade, update docs)

## Commands

All commands verified in `package.json` `scripts`. Don't document a script until it exists there.

| Command | Purpose |
|---|---|
| `pnpm install` | Install deps (Node 20+ for Vite 7, pnpm 11) — pnpm is the supported path; `npm ci` needs `--legacy-peer-deps` (typescript-eslint 8.28.0 peer range predates TS 5.9) |
| `pnpm dev` | Vite HMR dev server (default `http://localhost:5173`) |
| `pnpm build` | Production single-file build → `dist/index.html` |
| `pnpm preview` | Preview `dist` locally |
| `pnpm typecheck` | Type gate `tsc --noEmit` — **run before every push** |
| `pnpm lint` | ESLint flat (`eslint . --max-warnings 0`) |
| `pnpm lint:fix` | ESLint auto-fix (`eslint . --fix`) |
| `pnpm test` | Vitest `jsdom` `run` — **currently 0 files / 0 tests** (unit tests removed pending rewrite; `src.orig` had 6 files / 29 tests) — returns exit 0 with no tests found |
| `pnpm test:watch` | Vitest watch mode (no tests to watch until rewritten) |
| `pnpm test:coverage` | Vitest with coverage (`vitest run --coverage`) — empty until tests restored |
| `pnpm test:e2e` | Playwright `chromium` (4 specs / 20 tests) — `playwright.config.ts` + `e2e/` — **STALE**: still asserts Rother Shrine content (`"shepherd who stayed"`, `"Apla's Circle"`, `#pilgrim-center`/`#shrine-church`/`#tepeyac-hill`, `/about-blessed-stanley-rother`, `/what-to-see`, `/pilgrimage`) that no longer exists; will fail until rewritten for Bukit Timah routes |
| `pnpm test:e2e:ui` | Playwright UI mode |
| `pnpm test:e2e:report` | Open last Playwright HTML report |
| `pnpm lint && pnpm typecheck && pnpm build` | Pre-push gate (current minimum — `test` is empty, `test:e2e` is stale; restore both before enforcing full gate `lint && typecheck && test && test:e2e && build`) |

## Structure

```
src/ (27 files — no tests, no setup)
  App.tsx              # HashRouter + 17 Route entries (16 content paths + * NotFound; see Routing below)
  main.tsx             # StrictMode + createRoot
  index.css            # @theme tokens (24 colors + 2 shadows) + @layer base/utilities (13: text-balance, bg-adobe-texture, bg-grain, divider-weave, divider-weave-thin, gold-rule, gold-rule-left, hero-ken-burns, mask-fade-b, reveal, reveal-visible, skip-link + keyframes gold-rule-draw/hero-ken-burns)
  components/          # Layout (+SkipLink), Header (useScrolled(16)), Footer, PageHero, Emblem, Timeline, SocialIcons, SafeImage (Wikimedia/Pexels→local fallback), ui/{Button,Container,SectionHeading,Accordion,Reveal}
  hooks/               # useScrolled.ts (threshold 12 default; Header passes 16)
  pages/               # Home, About, History, Worship, Ministries, NewsEvents, Serve, Give, FAQ, NotFound (10 pages, all named exports: Home, About, History, Worship, Ministries, NewsEvents, Serve, Give, FAQ, NotFound)
  data/                # nav.ts (primaryNav + footerNav with description on children), content.ts (TimelineEntry/GroundsPlace/Ministry/FaqItem/EventItem/GivingOption/Priest/PpcMember + priests[3]/ppcMembers[16]/lifeTimeline[8 1845–2017]/grounds[3]/ministries[6]/faqs[6]/upcomingEvents[6]/givingOptions[8]/serveRoles[4]/devotions[6] + images {hero/heroFallback/chapel/sanctuary/garden/glass/hall/cemetery/feast/naveCdn/courtyardCdn}), site.ts (site as const: name/shortName/圣若瑟堂/tagline/vision + address {street/city/zip/full+query getters} + hours {gates/mainChurch/chapel/bookshop/adorationRoom} + mass {weekdayMorning/weekdayEvening/saturday/sunday[4]/confession/adoration/secondCollection} + contact {parishPriestPhone/assistantPriestPhone/officePhone} + transport {mrt/buses} + feast {Feast of St Joseph the Worker, 1 May} + uen/chequePayee/facebook/archdiocese/mapsUrl/mapsEmbedSrc)
  utils/cn.ts          # twMerge(clsx) — always merge via cn()
  # no src/test — removed pending rewrite; src.orig/test is reference only
vite.config.ts         # alias @→src (no test block — vitest defaults); viteSingleFile()
tsconfig.json          # strict + noUnusedLocals/noUnusedParameters/noFallthroughCasesInSwitch/isolatedModules/noEmit + include [src, vite.config.ts] + types [node] + paths @/*
eslint.config.js       # flat config (typescript-eslint 8 + react-hooks 5 + react-refresh); ignores [dist, node_modules, coverage, playwright-report, test-results, skills, src.orig]
playwright.config.ts   # Playwright 1.55.1 (chromium, webServer → pnpm exec vite :5173, expect timeout 15s, header handles wikimedia/pexels CSP)
e2e/                   # 20 tests STALE — smoke.spec.ts (7) + navigation.spec.ts (5) + what-to-see.spec.ts (4) + give-faq.spec.ts (4) + helpers.ts — all assert orig Rother routes/content
.github/workflows/ci.yml # CI: lint → typecheck → test → test:e2e (chromium) → build + artifacts (Node 24, pnpm 11)
public/images/         # 8 files: hero-church.jpg, chapel-interior.jpg, sanctuary.jpg, rosary-garden.jpg, stained-glass.jpg, parish-hall.jpg, cemetery.jpg, feast.jpg (Vite publicDir → dist/images/ — upload alongside dist/index.html); Wikimedia hero + 2 Pexels CDN images with SafeImage local fallback
index.html             # Google Fonts Fraunces + Source Sans 3; CSP allows images from upload.wikimedia.org + images.pexels.com, frames from google.com (maps embed); OG tags for St Joseph's Church (Bukit Timah)
src.orig/              # frozen reference snapshot of the Rother Shrine original — not imported by the app; eslint ignored, tsc excluded
```

## Quirks — would break if guessed wrong

- **HashRouter is intentional** — static hosts (GH Pages / S3) have no SPA fallback. Don't switch to `BrowserRouter` without adding a `404.html` redirect. Deep links are `/#/worship`, `/#/ministries#liturgical`, etc.
- **`viteSingleFile()` inlines JS+CSS** — `public/images/` is still copied to `dist/images/` (Vite `publicDir` is not inlined; upload both). No assumed code-splitting. Dynamic `import()` that expects chunks will be inlined or break.
- **Alias `@` must stay in sync** — `vite.config.ts` (`path.resolve(__dirname,"src")`) ↔ `tsconfig.json` (`paths: {"@/*":["src/*"]}`, `baseUrl:"."`) — change both.
- **Tailwind v4 has no `tailwind.config.js`** — tokens live only in `src/index.css` `@theme`. Don't add arbitrary `bg-[#...]`; extend `@theme` with a named `shrine-*` token.
- **TS strict will fail on unused code** — `noUnusedLocals:true` + `noUnusedParameters:true` + `noFallthroughCasesInSwitch:true` + `isolatedModules:true` + `noEmit:true`. Clean unused vars/params before commit.
- **Test/lint harness is hollow** — `eslint 9.39.5` flat + `vitest 3.2.6` (jsdom) + `@testing-library/react 16.2.0` + `playwright 1.55.1` (chromium) still installed, but `src/` has **no tests** (`src/test/setup.ts` deleted). `pnpm test` exits 0 with no tests; `e2e/` (20 tests) is stale Rother-era and fails. CI's `lint → typecheck → test → test:e2e → build` gate will fail on `test:e2e` until specs are rewritten. `eslint` ignores `skills/` + `src.orig/`; `vite.config.ts` has no `test` block (vitest defaults apply); `tsconfig.json` includes only `src` + `vite.config.ts` (no `eslint.config.js`/`playwright.config.ts`). Don't re-add `src.orig` to lint/tsc scope.
- **`skills` is vendored, git-tracked reference content** (not project source; `skills/skills-catalog.md` is the index). Tooling ignores it: `eslint.config.js` `ignores` + `tsconfig` excludes it. Don't lint or import from it.
- **Google Fonts loaded in `index.html`** — `Fraunces` (display) + `Source Sans 3` (body). CSP in that file whitelists `fonts.googleapis.com`/`fonts.gstatic.com`, `upload.wikimedia.org`/`images.pexels.com` for images, and `google.com` for the maps iframe. Don't add runtime font loaders in components.
- **`Layout.tsx` handles hash scroll** — double-hash aware (`#/ministries#liturgical` → split on `#` + strip `/`) + `setTimeout 80ms` + fallback `window.scrollTo`. Current anchor targets are `#mass`/`#confession`/`#visit` on `/worship` and `#liturgical`/`#faith-formation`/`#pastoral-care`/`#family-life`/`#youth`/`#mandarin` on `/ministries`. Preserve when extending layout.
- **`vite.config.ts` has no `server.watch.ignored`** — the previous `skills/**`/`dist/**` ignore was removed. If `ENOSPC` watcher errors return from the vendored `skills/` tree, re-add `server.watch.ignored: ['**/skills/**','**/dist/**','**/playwright-report/**','**/test-results/**','**/coverage/**']`.
- **`SafeImage` fallback** — `src/components/SafeImage.tsx` wraps `<img>` with `fallback` default `/images/hero-church.jpg` (not the old `/images/hero-shrine.jpg`), `loading="lazy"` default, and `onError` → `dataset.fallback` guard to swap `src` once. Wikimedia hero (`images.hero`) and 2 Pexels CDN images (`naveCdn`/`courtyardCdn` in `content.ts`) fall back to local `public/images/` on failure. Use `SafeImage` for any external image; don't use bare `<img>` for CDN sources. Current CDN allowlist: `upload.wikimedia.org`, `images.pexels.com`.
- **SkipLink never rewrites the hash** — `src/components/SkipLink.tsx` `preventDefault`s and imperatively focuses `#main-content` (`<main>` in `Layout`). A native jump would rewrite the hash and route to NotFound under HashRouter. Previously covered by `SkipLink.test.tsx` (now in `src.orig` only); rewrite that test when restoring unit tests.
- **`useScrolled` threshold** — `src/hooks/useScrolled.ts` defaults to `12`; `Header.tsx` calls `useScrolled(16)` to delay the transparent→solid switch on Home. Don't "fix" the mismatch — it's intentional.
- **`Ministries` jump nav** — uses `<Link to="/ministries#id">` (not plain `<a href="#id">`) to preserve HashRouter route; plain `#id` would replace the hash and route to NotFound. Renders `ministries.map` → 6 pill links (`#liturgical`, `#faith-formation`, `#pastoral-care`, `#family-life`, `#youth`, `#mandarin`) with `aria-label="Jump to ministry"` and alternating `bg-shrine-cream`/`bg-shrine-parchment` sections. The predecessor `WhatToSee` quirk (`/what-to-see#pilgrim-center`/`#shrine-church`/`#tepeyac-hill`) is gone.

## Conventions

- **Routing:** `App.tsx` is the only route table — 17 `Route` entries (16 content paths + `*` NotFound) covering 10 pages, with 7 alias paths in 5 groups (`/worship` canonical for `/mass-times`+`/hours-location`+`/visit`; `/ministries` canonical for `/ministry`; `/news-events` canonical for `/news-and-events`; `/serve` canonical for `/volunteer`; `/give` canonical for `/donate`) and hash anchors on two pages: `/worship` → `#mass`/`#confession`/`#visit` (Mass schedule, Confession & Adoration, Find Us) and `/ministries` → `#liturgical`/`#faith-formation`/`#pastoral-care`/`#family-life`/`#youth`/`#mandarin` (6 ministry sections). `About` is now canonical at `/about` (orig was `/about-blessed-stanley-rother` canonical with `/about` as alias — flipped). Nav is driven by `src/data/nav.ts` (`primaryNav` with `description` on children + `footerNav: NavLink[]`) — update there, `Header`/`Footer` render from it. `Header` dropdowns and `Ministries` jump nav must use `<Link to="/path#id">`, never `<a href="#id">`.
- **Data:** `src/data/content.ts` is the data layer — 8 exported interfaces (`TimelineEntry`, `GroundsPlace`, `Ministry`, `FaqItem`, `EventItem`, `GivingOption`, `Priest`, `PpcMember`) and 10 exports: `priests[3]` (Jovita Ho, Leo Justin Chinnappan, Dominic Yeo-Koh) + `ppcMembers[16]` (ex-officio clergy + appointed/elected PPC) + `lifeTimeline[8]` spanning **1845–2017** Singapore mission (1845 Mauduit inland → 1846 Kranji attap chapel → 1853 Palladian church at Upper Bukit Timah → 1861 patron statue/feast → 1910s rubber & return → 1964 Fr Joachim Teng rebuild/30 Aug 1964 reopening → 1991–97 Stations/columbarium 1995/hall 1997 → 2012 consecration by Abp Nicholas Chia + 2017 Rosary Garden by Abp William Goh, Mauduit's headstone among the trees; replaces the 1935–2023 Oklahoma/Guatemala martyr timeline) + `grounds[3]` (`main-church`/`chapel`/`rosary-garden`, each with `image`+`imageFallback` — replaces `whatToSee[3]` piligrim-center/shrine-church/tepeyac-hill) + `ministries[6]` (`liturgical`/`faith-formation`/`pastoral-care`/`family-life`/`youth`/`mandarin`) + `faqs[6]` (Mass/confession/MRT-feast/baptism-marriage/cemetery-columbarium) + `upcomingEvents[6]` (`title`+`date`+`summary`+`category` Parish|Devotion|Formation|Archdiocese + optional `href`; replaces orig `date`+`title`+`location`+`description` shape) + `givingOptions[8]` (PayNow UEN T08CC4043C, weekend collections/4th-Sunday Church Maintenance, cash boxes, cheque payable St. Joseph's Church (Bukit Timah), SSVP–Friends in Need, GIFT, Boys' Town Brother Emmanuel August, Mass offerings — replaces General Fund/Pipe Organ/Tepeyac Hill/Apla's Circle etc.) + `serveRoles[4]`/`devotions[6]` untyped consts + `images` (11 keys: `hero` Wikimedia 2025 front view, `heroFallback` `/images/hero-church.jpg`, `chapel`/`sanctuary`/`garden`/`glass`/`hall`/`cemetery`/`feast` local, `naveCdn`/`courtyardCdn` Pexels; CDN count 3 on two hosts). `src/data/site.ts` (`site as const`) is the canonical single source for `name` St Joseph's Church (Bukit Timah) / `shortName` / `chineseName` 圣若瑟堂 / `tagline`/`vision` + `address` 620 Upper Bukit Timah Road Singapore 678116 (`full`/`query` getters) + `hours` (5 keys: `gates` Daily 8 a.m.–9 p.m., `mainChurch`, `chapel`, `bookshop` Sat 4.30–7 / Sun 8.30–1 + 2nd Sun 5.30–7, `adorationRoom` Tue 8 p.m.) + `mass` (weekdayMorning Mon–Sat 6.30 a.m. Chapel, weekdayEvening Mon–Fri 6.30 p.m. Chapel, `saturday` 5.30 p.m. Sunset, `sunday[4]` 7.30 Mandarin + 9.30/11.30/5.30 English, `confession` 15 min before weekend Masses foyer, `adoration` Tue 8 p.m., `secondCollection` 4th Sunday) + `contact` (parish priest +65 6760 0052, assistant +65 6760 4636, office +65 6769 1666) + `transport` (Cashew MRT Downtown Line, buses 67/75/170/176/178/184/961/963/970) + `feast` St Joseph the Worker 1 May + `uen` T08CC4043C/`chequePayee`/`facebook`/`archdiocese`/`mapsUrl`/`mapsEmbedSrc` — Footer + Worship + About consume it, don't duplicate. Pages render from data — don't inline copy.
- **Components:** `Button` (discriminated `to`/`href`/native `button` + `icon`; variants `primary|secondary|ghost|outline-light`), `Container` (`max-w-7xl px-5 sm:px-8`), `SectionHeading` (`eyebrow/title/description` + `align/light` + line), `PageHero` (`compact?`, `bg-grain` + dual gradients), `Reveal` (`delay`/`as`), `Accordion` (single-open), `Timeline` (left rail — now fed 1845–2017 parish milestones), `SafeImage` (`src` + `fallback` + `alt` + `loading`; always via `cn()`). Extend via `cn()`, not ad-hoc class strings.
- **Styling:** Use `shrine-cream/parchment(+dark)/stone/ink/charcoal/maroon-*/gold-*/pine-*/terracotta-*` + `shadow-shrine`/`shadow-shrine-lg` + utilities `text-balance` / `bg-adobe-texture` / `bg-grain` / `divider-weave`/`divider-weave-thin` / `gold-rule`/`gold-rule-left` / `hero-ken-burns` / `reveal`+`reveal-visible` / `skip-link` / `mask-fade-b`. Mobile-first (`sm:`/`lg:`). Tokens are unchanged — only the imagery/content they frame is now Bukit Timah (Palladian 1853 church, Fr Teng's 1964 rebuild, Rosary Garden, cemetery, feast on 1 May).

## Don't

- Switch `HashRouter` → `BrowserRouter`, break alias routes, or prop-drill nav arrays. The 7 aliases exist for bookmarks/printed material — keep each `aliasOf` → canonical pair in `App.tsx`.
- Add one-off hex colors or bypass `cn()` (`tailwind-merge` dedup matters).
- Rebuild `Dialog`/`Dropdown` from scratch if `shadcn/ui` (Radix) is adopted — use its primitives.
- Add SSR, API routes, or a CMS without an explicit architecture decision — this is a static SPA (`CLAUDE.md` isolates future CMS behind `lib/cms`).
- Reintroduce Rother Shrine content (Oklahoma City, Tepeyac Hill / Pilgrim Center / Shrine Church, 700 SE 89th St, Padre Apla's Circle, Guatemala Mission) or reassign `src/data/site.ts` parish facts. Hours, Mass, and address are the single source — don't duplicate them across pages.
- Assume `pnpm test` / `pnpm test:e2e` are green — `src/` has no unit tests and `e2e/` is stale. Don't ship without restoring the gate (`lint && typecheck && test && test:e2e && build`).

## Where to look next

- `CLAUDE.md` — full six-phase workflow, detailed conventions, anti-patterns, env contract, and validation checklist.
- `docs/prompts.md` — intent lineage.
- `src/index.css` — authoritative token list.
- `src.orig/` — frozen copy of the Rother Shrine original for diff reference (not built or linted).

