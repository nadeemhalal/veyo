@AGENTS.md

# Veyo Media: project guide

Marketing site for **Veyo Media** (brand mark: **veyo!**, said "VAY-oh"), a Meta ads specialist for
Australian ecommerce brands, run by a solo founder based in Sri Lanka who works Australian business hours.
Domain: **veyomedia.com** (registered at Namecheap on 2026-10-04; DNS on Cloudflare; **live and public since 2026-10-10**). Repo: personal GitHub `nadeemhalal/veyo`, branch `main`.

## The business

- **Positioning:** Meta (Facebook & Instagram) ads for Aussie ecom brands doing ~A$20k–300k/month.
  Creative included, reported against the client's P&L (MER, new-customer cost), month-to-month, and
  clients always own their ad accounts.
- **First niche:** beauty, skincare and wellness. Also fashion.
- **Second line:** white-label Meta ads for Australian agencies (NDA + non-solicitation, per-account pricing).
- **Track record (the only numbers to use):** 2 years running Meta ads for Australian brands and agencies;
  ~A$5k/month spend driving A$40–50k/month revenue; **8–10x average ROAS**.
  - One campaign hit 25x and one ad hit 149x. Use these **only** inside a case study or story post with
    full context (spend, dates, campaign type, attribution window). Never as headline claims.

## Honest-claims rules (Australian Consumer Law)

- Every published number needs evidence (Ads Manager + store data, same period) and client permission.
- Never say "Meta Partner", use Meta's logos, or claim "#1" / "guaranteed" anything.
  (The Meta Business Partner badge needs ~US$1M+ managed spend and 2 Blueprint-certified staff.)
- Say "Facebook & Instagram ads" or "Meta ads specialists" instead.
- Add "Past results don't guarantee future performance" near results.
- "Was" prices, deadlines and scarcity in any campaign must be genuine.
- Beauty/wellness claims stay cosmetic, not therapeutic (TGA).

## Brand

- **Colours:** ink `#1E1B5E` (primary), Signal lime `#C6F24E` (accent, use sparingly: logo dot,
  key numbers, one CTA per section), paper `#FAFAF7`, graphite `#16161D`, slate `#6B6F80`.
- **Logo:** lowercase "veyo" in **Instrument Sans 600**, tracking -0.04em, followed by a tapered "!"
  (wide top, narrow bottom). The "!" bar matches the text colour (ink or white); **only the dot is lime**.
  The mark's bottom sits on the text baseline. Code: `src/components/site/logo.tsx`.
- **Icon / favicon / profile picture:** white tapered "!" with lime dot on an ink square (`src/app/icon.svg`).
- **Fonts:** Geist for the site (headings bold, tight), Geist Mono for numbers, Instrument Sans for the logo only.
- **Assets:** `brand/` has SVG/PNG logos, icons and social banners. The share image `public/og.png` is built from the white logo on ink.
- No gradients on ink backgrounds; no stock handshake/rocket imagery; use real, anonymised screenshots.

## Voice: witty, honest, plain

- Big idea: **"From ~~meh~~ to veyo!"** (component: `src/components/site/meh-to-veyo.tsx`).
- Poke fun at bad ads, never at people. One joke per piece; headlines get the wit, details stay clear.
- Joke about the delivery, never the result ("No big deal. (It's a big deal.)" is fine; fake numbers aren't).
- Main CTA: "Roast my ads (nicely)". The small header button stays "Get a free ad audit" for clarity.
- Keep plain: prices, plan details, legal pages, the BFCM playbook, and page `<title>`s for SEO.
- Australian spelling. No hype words (revolutionary, game-changing, seamless, etc.).

## Tech

Next.js 16 App Router, TypeScript, Tailwind v4, shadcn/ui (Base UI), Zod, Vitest.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
npm test
```

- **All site copy lives in `src/lib/site.ts`** (stats, services, industries, plans, FAQs, white label, BFCM).
- Route groups: `src/app/(site)/` has the full header/footer; `src/app/(landing)/` is minimal (no nav) for
  ad landing pages: `/services/audit` and `/bfcm`. The Sri Lanka pages live in `(site)` with the full nav (the header button and BFCM bar switch for
  `/sri-lanka*` paths): `/sri-lanka` (online stores, local and export, copy in `sriLankaEcom`, Starter pack in LKR,
  first month 3 creatives free then 1 a month included) and `/sri-lanka/tourism` (copy in `sriLankaTourism`).
  The Starter first-time price and creatives offer must stay genuine (ACL / honest claims).
- **Blog:** Markdown in `content/insights/*.md` with frontmatter (title, date, tag, excerpt, optional
  author/draft). Tags: Teardown, How-to, Compliance, Account lessons. Drafts only show in dev.
  The founder pastes posts in chat; Claude formats them into this folder, then commits and pushes.
  - `bfcm-targets-not-met.md` is a draft to publish after Black Friday (27 Nov 2026).
- **BFCM 2026:** `/bfcm` (Sprint offer, A$1,990 suggested) and `/bfcm/playbook` (from
  `content/playbooks/bfcm-2026.md`). The announcement bar hides itself after Cyber Monday.
  Click Frenzy dates weren't announced when written; update them once known.
- **Leads:** the audit/BFCM form saves to Supabase table `public.audit_requests`
  (name, work_email, store_url, monthly_meta_ad_spend, additional_info, source, created_at) via
  `src/lib/audit-store.ts`. It uses the **public publishable key only**; RLS allows insert and nothing else.
  Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (in `.env.local`, never committed).
  If saving fails, the visitor sees an error, never a false success.
- **Audit checklist game** (`/meta-ads-audit`): 60-point checklist from `src/lib/audit-checklist.ts`
  (7 sections; item ids like t1, s3). Flow: name/organisation/email → tick sections (live score, levels
  Leaky/Steady/Scaling, "+1" pops) → **View result** (scored on the server, saved to `checklist_results`)
  → **Send to email** (Resend). Max 3 emails per address per 24h via the `allow_checklist_email` function
  and `checklist_email_log` table (migration in `supabase/migrations/`). Email needs `RESEND_API_KEY`
  (server-only) and `EMAIL_FROM` on a domain verified in Resend; until then the button says it's not switched on.
  Links in emails use `NEXT_PUBLIC_SITE_URL`. Marketing opt-in is optional and unticked by default (Spam Act).
- **SEO:** `src/lib/seo.ts` has `pageMetadata()` (title, description, canonical, Open Graph, Twitter) and the
  JSON-LD builders; render JSON-LD with `src/components/site/json-ld.tsx`. Every page should use `pageMetadata()`:
  a page's `openGraph` replaces the root one wholesale, so partial metadata loses the share image.
  Bump `siteUpdated` in `src/app/sitemap.ts` when copy changes materially.
- **Analytics:** GA4 via `src/components/site/analytics.tsx`, on only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
  at build time and never in dev. It uses plain `<script>` tags because `next/script` injects nothing under vinext.
  Hotjar (Contentsquare tag `ccc990384f471`) and Google Tag Manager (`GTM-PPW69ZKV`) load from the same component,
  production only. GA4 is loaded directly, so never add a GA4 tag inside GTM (it would double-count).
- **Meta tracking:** the pixel loads from the same component once `NEXT_PUBLIC_META_PIXEL_ID` is set (PageView on
  every page). Each lead (audit/BFCM/Sri Lanka form, checklist "View result") fires `trackLead()` in
  `src/lib/track.ts` (pixel `Lead` + GA4 `generate_lead` + dataLayer), and the server sends the same `Lead` through
  the Conversions API (`src/lib/meta-capi.ts`, token `META_CAPI_TOKEN` as a Worker secret) with the same event id,
  so Meta deduplicates. Never add a Meta pixel tag inside GTM.
  Search Console is verified by DNS (domain property), so no code is involved.
- Tests cover backend logic only (form validation, lead mapping, blog frontmatter, checklist scoring, email builder).

## Cloudflare (vinext)

- Production host: Cloudflare Workers via **vinext** in **legacy Wrangler mode** (`vinext init --legacy-wrangler-cloudflare-init`): `wrangler.jsonc` + `vite.config.ts`, stable `@cloudflare/vite-plugin` v1.
  Commands: `npm run dev:vinext` (local Workers engine, port 3001), `npm run build:vinext`, `npm run deploy:vinext`.
- Gotchas: the default (beta) `vinext init` mode wrote a `cloudflare.config.ts` that needs the v2 beta plugin and the `cf` deploy tool
  (fails with "Could not read the generated Cloudflare Build Output config"); that was replaced by Wrangler mode.
  vinext's packages had to be installed manually (React 19.2-matching `react-server-dom-webpack`); Tailwind uses `@tailwindcss/vite` for vinext.
- **No runtime file reads.** Markdown in `content/` is bundled into git-ignored `src/generated/content.ts` by
  `scripts/build-content.mjs` (wired as pre-scripts). Never add `fs` reads to pages. Run `npm run content` after
  editing content while a dev server is running.
- Verified on the local Workers engine: all pages, both forms and the checklist (saving to Supabase) work.
- **The main line:** local `main` → GitHub `nadeemhalal/veyo` → Cloudflare Worker **`veyo`** → veyomedia.com.
  Pushing to `main` triggers a Workers Build (build `npm run build:vinext`, deploy `npx wrangler deploy`).
  `npm run deploy:vinext` deploys the same Worker straight from this machine, using `.env.local`.
  The Worker name in `wrangler.jsonc` must stay `veyo`: any other name silently creates a second Worker.
- `NEXT_PUBLIC_*` settings are build-time variables. They must be set in the `veyo` project's **build** variables
  as well as in `.env.local`, or a git build ships without them.
- After a push, check the commit's "Workers Builds: veyo" check on GitHub. A failed build leaves the previous
  version live with no other warning.

## Hosting and data

- The Supabase project and GitHub repo are personal accounts: fine for testing. Before collecting real
  leads or pointing veyomedia.com at the site, use hosting and a database you (the business) control and
  have reviewed, and confirm the Supabase storage region (a Sydney region suits Australian clients).
- The repo is also connected to Vercel, which builds every push. It is not the main line; disconnect it if unused.
- Never commit secrets or `.env` files. Never use the Supabase secret/service_role key in this app.
- Open item: an existing Supabase function `public.rls_auto_enable()` is executable by the public role.
  Lock it down (revoke EXECUTE from anon/authenticated) unless it's meant to be public.

## Before launch (open items)

- Cloudflare: redirect `www` to the apex domain and turn on "Always use HTTPS" (both still return 200).
- Email is on **Zoho Mail (free plan)**, set up Oct 2026: MX and SPF point to Zoho, so don't add Cloudflare Email Routing.
  Mailbox `nads@veyomedia.com` (alias `nadeem@`) is the address on the site; the free plan wouldn't take a `hello@` alias.
  The plan is to move to Google Workspace later (switch MX/SPF to Google then).
- Set up `@veyomedia` handles; check IP Australia class 35 for "Veyo".
- Founder name, photo and story on `/about`; booking link (`NEXT_PUBLIC_BOOKING_URL`).
- Real testimonials and case studies (with permission) in `src/lib/site.ts` (`published: true` only when ready).
- Lawyer review of `/privacy` and `/terms`; fill in the storage region; business registration number in the footer.
- HTML is served with `Cache-Control: no-store`, so Cloudflare caches no pages. Worth fixing for speed.
