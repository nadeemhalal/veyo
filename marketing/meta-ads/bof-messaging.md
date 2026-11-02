# Veyo Media: BOF messaging for Meta ads

Bottom of funnel = new prospects (not yet clients or leads) who already know us: site visitors,
checklist players, video viewers and page engagers. Split by likely value:

- **HV (high value):** brands spending A$5k–20k+/month on Meta (Growth / Scale plans), plus agencies (white label).
- **LV (low value):** brands spending A$1k–5k/month, usually the founder running ads themselves (Launch plan).

Rules for every ad: no "Meta Partner" or Meta logos, no "guaranteed" or "#1"; any ROAS number carries
"Past results don't guarantee future performance"; one joke per ad; Australian spelling.

## The grid

| | **New · HV** | **New · LV** |
|---|---|---|
| **Who** | Ecom brands at A$5k–20k+/month Meta spend, often with an agency or in-house buyer already | Founder-run stores at A$1k–5k/month, doing ads between packing orders |
| **Meta audience** | Visited `/pricing`, `/services/meta-ads`, `/case-studies` or `/about` (30 days); finished the checklist with a Steady/Scaling result; 50%+ viewers of HV videos | Visited home, `/insights/*` or `/meta-ads-audit` without finishing (30 days); 50%+ viewers of LV videos; IG/FB engagers (60 days) |
| **Exclude** | Leads (pixel `Lead`, 180 days), clients, `/sri-lanka*` visitors | Same, plus HV audience (so HV gets its own message) |
| **Main pain** | Platform ROAS looks fine, the P&L doesn't. Locked contracts, juniors on the account, creative billed extra | Not sure what's working, boosting posts, can't justify agency fees yet |
| **Core message** | Meta ads run by a specialist, reported against your store data, month-to-month | Find out what's wasting spend first, free. If you need help, the price is on the page |
| **Proof** | 2 years running Meta ads for Australian brands and agencies; 8–10x average ROAS (with disclaimer); comparison table (lock-in, creative, reporting, ownership) | Price up front (from A$1,190/month); 6 new creatives a month included; the 60-point checklist itself |
| **Objection to kill** | "Switching agencies is risky." → Your ad account stays yours; 30 days' notice; audit before any commitment | "Agencies are too expensive / I'll get locked in." → Price shown, month-to-month, free audit says if you even need us yet |
| **Offer** | Free ad account audit with the specialist who'd run it | "Roast my ads (nicely)": free audit; or the free 60-point checklist |
| **CTA button** | Apply now (→ `/services/audit`) | Learn more (→ `/services/audit`) / Get offer (→ `/meta-ads-audit`) |
| **Formats** | Founder talking-head video, P&L-vs-Ads-Manager static, comparison-table static | Ad-roast video (bad ad → fixed ad), price static, checklist screenshot carousel |

## New · HV ads

**HV1: P&L, not platform**
- Primary text: Ads Manager says 4x. Your bank account says "are you sure?" We report your Meta ads against your store data: MER, new-customer cost and margin. If it doesn't show up in Shopify, it doesn't count. Book a free audit with the specialist who'd run your account.
- Headline: Meta ads reported against your P&L
- Description: Free audit · Month-to-month
- CTA: Apply now

**HV2: The lock-in breakup**
- Primary text: Six-month lock-in. A junior on your account. Creative billed extra. We do it the other way round: month-to-month with 30 days' notice, 12+ new ads a month included, and you deal with the person you met. Your ad account stays yours, always.
- Headline: Month-to-month. Creative included.
- Description: Meta ads for Aussie ecom brands
- CTA: Apply now

**HV3: Proof (keep the disclaimer)**
- Primary text: 2 years running Meta ads for Australian brands and agencies, at an 8–10x average return on ad spend. Past results don't guarantee future performance, so we'll tell you in a free audit whether that's realistic for your account, and what we'd fix first.
- Headline: See what we'd fix in your account
- Description: Free audit · No lock-in
- CTA: Apply now

**HV4: Agencies (white label)** · audience: `/agencies` visitors
- Primary text: More clients than Meta buyers? We run Meta ads under your brand for Australian agencies. NDA and non-solicitation signed before onboarding, partner access only, 30 days' notice per account. Your clients never hear our name.
- Headline: Your agency's Meta ads team
- Description: From A$790/month per account
- CTA: Learn more (→ `/agencies`)

## New · LV ads

**LV1: Roast my ads (nicely)**
- Primary text: Running your own Meta ads between packing orders? Send them over. We'll roast them (nicely) for free: what's wasting spend, what to fix first, and whether you even need an agency yet. Sometimes the answer is no, and we'll say so.
- Headline: Roast my ads (nicely)
- Description: Free Meta ads audit
- CTA: Learn more

**LV2: Price on the page**
- Primary text: Meta ads with creative included, from A$1,190/month. 6 new ads a month, your pixel and Conversions API checked, fortnightly report and call. Month-to-month, so you're not signing your life away.
- Headline: From A$1,190/month, creative included
- Description: For brands spending A$1k–5k/month
- CTA: Learn more (→ `/pricing`)

**LV3: Not ready for an agency**
- Primary text: Not ready for an agency? Fair. Run our free 60-point Meta ads checklist and find out if your account is Leaky, Steady or Scaling. No call, no sales pitch, just your score and what to fix.
- Headline: Is your ad account leaky?
- Description: Free 60-point checklist
- CTA: Get offer (→ `/meta-ads-audit`)

## Before these go live

- The Veyo-Media-AUD-SYD ad account is under review, and the pixel isn't on the site yet. The audiences above need the pixel (and the `Lead` event) running first.
- Keep the evidence for "8–10x average ROAS" on file (Ads Manager + store data, same period).
- If the Launch/Growth/Scale prices change in `src/lib/site.ts`, update LV2 and HV2.
- BOF audiences will be small at first. If an ad set can't spend, merge HV and LV into one ad set and rotate the ads instead.
