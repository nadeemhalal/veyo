# veyomedia.com

Marketing site for **Veyo Media**: Meta ads for Australian ecommerce brands.

Built with Next.js (App Router), TypeScript, Tailwind CSS and shadcn/ui.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Unit tests for the audit form validation (Vitest) |

## Where things live

| Path | Contents |
|---|---|
| `src/lib/site.ts` | **All site copy**: stats, services, industries, pricing, FAQs, case studies. Edit here first. |
| `src/lib/audit-schema.ts` | Audit form validation (Zod) + honeypot spam check |
| `src/app/actions/audit.ts` | Server Action that handles audit form submissions |
| `src/app/(site)/` | Pages with the full header and footer |
| `src/app/(landing)/services/audit/` | Ad landing page with a minimal header (no main nav) |
| `src/components/site/` | Header, footer, sections, form and shared blocks |

## Pages

`/`, `/services/meta-ads`, `/services/creative`, `/services/audit`, `/industries/{beauty-skincare,health-wellness,fashion}`, `/pricing`, `/case-studies`, `/insights`, `/about`, `/contact`, `/privacy`, `/terms`, plus `sitemap.xml` and `robots.txt`.

## Adding a blog post

Posts live in `content/insights/`. The file name becomes the URL, e.g. `content/insights/pdrn-ad-teardown.md` → `/insights/pdrn-ad-teardown`.

```md
---
title: "What the top PDRN skincare ads in Australia have in common"
date: "2026-10-01"
tag: "Teardown"          # Teardown | How-to | Compliance | Account lessons
excerpt: "One or two sentences shown on the list page and in Google."
author: "Veyo Media"     # optional
draft: false             # optional; drafts only show in npm run dev
---

Write the post in Markdown here. Tables, lists, links and images all work.
```

Commit and push to publish. The build fails with a clear message if the frontmatter is wrong.

## Leads (Supabase)

Audit and BFCM form submissions are saved to the `audit_requests` table in Supabase (columns: name, work_email, store_url, monthly_meta_ad_spend, additional_info, source, created_at). View them in the Supabase dashboard → Table Editor.

- The site uses the **public** key only. Row Level Security allows it to **insert** rows, nothing else, so leads can't be read, changed or deleted through the website.
- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` and in Vercel (Settings → Environment Variables).
- If saving fails, visitors see an error with the contact email instead of a false success.
- The current project is on a personal Supabase account (test only). Move to the company Supabase account before collecting real leads.

## Before launch

- [ ] Set up `hello@veyomedia.com` and `NEXT_PUBLIC_BOOKING_URL`.
- [ ] Add founder name, photo and story on `/about`.
- [ ] Case studies: fill in real figures in `src/lib/site.ts` and set `published: true` only with client permission and evidence.
- [ ] Every number in `stats` must be backed by Ads Manager + store data for the same period (Australian Consumer Law).
- [ ] Have `/privacy` and `/terms` reviewed by a lawyer. Update privacy once analytics or a Meta pixel is added.
- [ ] Add business registration number to the footer.
- [ ] Add an OG (social share) image.
- [ ] Write the first posts for `/insights` (currently a "coming soon" list).

## Deployment

Not deployed yet. Once the form stores real lead data, deploy only to an approved host.
