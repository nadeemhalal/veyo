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

## Before launch

- [ ] **Saving leads:** the audit form validates input but does **not store leads yet**. Planned: a Supabase `audit_requests` table (company Supabase account) or an email notification. See the TODO in `src/app/actions/audit.ts`.
- [ ] Set up `hello@veyomedia.com` and `NEXT_PUBLIC_BOOKING_URL`.
- [ ] Add founder name, photo and story on `/about`.
- [ ] Case studies: fill in real figures in `src/lib/site.ts` and set `published: true` only with client permission and evidence.
- [ ] Every number in `stats` must be backed by Ads Manager + store data for the same period (Australian Consumer Law).
- [ ] Have `/privacy` and `/terms` reviewed by a lawyer. Update privacy once analytics or a Meta pixel is added.
- [ ] Add business registration number to the footer.
- [ ] Replace the text logo with a designed one; add an OG image and favicon.
- [ ] Write the first posts for `/insights` (currently a "coming soon" list).

## Deployment

Not deployed yet. Once the form stores real lead data, deploy only to an approved host.
