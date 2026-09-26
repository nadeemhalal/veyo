// Central content for veyomedia.com. Edit copy here rather than in page files.
//
// IMPORTANT: every number in `stats` must be backed by evidence you can show
// (Ads Manager + Shopify screenshots for the same period). Australian Consumer
// Law treats claims you can't substantiate as misleading.

export const site = {
  name: "Veyo Media",
  shortName: "Veyo",
  url: "https://veyomedia.com",
  tagline: "Ads that carry their weight.",
  description:
    "Meta ads for Australian ecommerce brands. Creative included, reported against your P&L, month-to-month. Your accounts stay yours.",
  email: "hello@veyomedia.com", // TODO: set up once the domain is registered
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "/contact",
  hours: "Mon–Fri, 9:30am–6pm AEST",
  base: "Colombo, Sri Lanka",
} as const;

export const nav = [
  {
    label: "Services",
    href: "/services/meta-ads",
    children: [
      { label: "Meta ads management", href: "/services/meta-ads" },
      { label: "Ad creative & UGC", href: "/services/creative" },
      { label: "Free ad account audit", href: "/services/audit" },
      { label: "White label for agencies", href: "/agencies" },
    ],
  },
  {
    label: "Industries",
    href: "/industries/beauty-skincare",
    children: [
      { label: "Beauty & skincare", href: "/industries/beauty-skincare" },
      { label: "Health & wellness", href: "/industries/health-wellness" },
      { label: "Fashion", href: "/industries/fashion" },
    ],
  },
  { label: "For agencies", href: "/agencies" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case studies", href: "/case-studies" },
  { label: "About", href: "/about" },
] as const;

// White-label Meta ads for Australian agencies.
export const whiteLabel = {
  headline: "Your agency's Meta ads team, without the hire",
  intro:
    "We run Meta ads for your ecommerce clients under your brand. You keep the client relationship and the margin. We do the media buying, testing and reporting behind the scenes.",
  benefits: [
    {
      title: "Your brand, not ours",
      body: "Reports, emails and calls go out under your agency's name. Your clients never need to know we exist.",
    },
    {
      title: "A specialist on day one",
      body: "Two years running Meta ads for Australian brands and agencies. No hiring, training or ramp-up.",
    },
    {
      title: "Margin you can resell",
      body: "Wholesale pricing that leaves room for you to mark up and still stay competitive.",
    },
    {
      title: "Scale up or down",
      body: "Add accounts when you win clients, pause them when you don't. No headcount risk.",
    },
  ],
  howItWorks: [
    { step: "01", title: "Partner call", body: "We learn how your agency works, your clients and your reporting style." },
    { step: "02", title: "NDA & agreement", body: "Confidentiality and non-solicitation signed before we see any client account." },
    { step: "03", title: "Onboard accounts", body: "You grant partner access to each client ad account. We audit and plan within a week." },
    { step: "04", title: "Run & report", body: "We manage the ads and send white-label reports in your template, ready to forward." },
  ],
  included: [
    "Media buying, testing and optimisation",
    "Monthly ad creative for each account",
    "White-label reports in your branding",
    "Shared Slack or Teams channel with your team",
    "Australian business-hours availability (AEST)",
    "Optional: join client calls as part of your team",
  ],
  promises: [
    "We never contact or pitch your clients directly",
    "Non-solicitation and NDA signed before onboarding",
    "Clients own their ad accounts; access runs through partner access only",
    "30 days' notice to end, per account or overall",
  ],
  // Suggested wholesale pricing. Adjust before launch.
  pricing: [
    { label: "Per client account", value: "From A$790/month", note: "For accounts spending up to A$10k/month on Meta" },
    { label: "Larger accounts", value: "Custom", note: "Priced by spend and creative volume" },
  ],
} as const;

export const stats = [
  { value: "2 years", label: "running Meta ads for Australian brands & agencies" },
  { value: "8–10x", label: "average return on ad spend, month after month" },
  { value: "A$40–50k", label: "monthly revenue driven from ~A$5k/month spend" },
] as const;

export const trustPoints = [
  "Your accounts, your data",
  "Month-to-month, no lock-in",
  "Creative included",
  "Australian business hours",
] as const;

export const problems = [
  {
    title: "CPMs keep climbing",
    body: "You're paying more for the same reach, and the account that worked last year has stalled.",
  },
  {
    title: "Creative burns out fast",
    body: "Ads fatigue in weeks. Without a steady testing pipeline, results slide and nobody knows why.",
  },
  {
    title: "ROAS doesn't match the bank",
    body: "Ads Manager says it's working. Your Shopify and your P&L tell a different story.",
  },
] as const;

export const steps = [
  {
    step: "01",
    title: "Audit",
    body: "We go through your account, pixel, offer and landing pages and show you what's costing you money.",
  },
  {
    step: "02",
    title: "Creative testing",
    body: "New hooks, angles and formats every month, tested in a structure that tells us what actually sells.",
  },
  {
    step: "03",
    title: "Scale what's profitable",
    body: "Budget moves to the winners. We scale on new-customer cost and margin, not on a platform number.",
  },
  {
    step: "04",
    title: "P&L reporting",
    body: "Clear reports on spend, revenue, MER and new-customer cost, checked against your store data.",
  },
] as const;

export const services = [
  {
    title: "Meta ads management",
    href: "/services/meta-ads",
    body: "Campaign structure, Advantage+ and manual testing, budgets, audiences and weekly optimisation on Facebook and Instagram.",
  },
  {
    title: "Ad creative & UGC",
    href: "/services/creative",
    body: "Scripts, hooks, statics and creator videos made for the feed, with a fresh batch every month.",
  },
  {
    title: "Offer & landing page strategy",
    href: "/services/meta-ads#offer",
    body: "Bundles, offers and landing page fixes that lift conversion, so every ad dollar works harder.",
  },
] as const;

export type Industry = {
  slug: string;
  name: string;
  headline: string;
  intro: string;
  angles: string[];
  compliance: string;
};

export const industries: Industry[] = [
  {
    slug: "beauty-skincare",
    name: "Beauty & skincare",
    headline: "Meta ads for Australian beauty & skincare brands",
    intro:
      "Beauty is the most visual category on Meta, and the most crowded. We build creative that shows results fast and structures that find profitable customers, not just cheap clicks.",
    angles: [
      "Routine and bundle offers that lift order value",
      "Ingredient-led and before/after style creative (within the rules)",
      "UGC and creator content that feels native to the feed",
      "Gifting and seasonal peaks planned months ahead",
    ],
    compliance:
      "Cosmetic claims must stay cosmetic. We write to ACCC guidance and avoid therapeutic claims that would pull a product under TGA rules.",
  },
  {
    slug: "health-wellness",
    name: "Health & wellness",
    headline: "Meta ads for Australian health & wellness brands",
    intro:
      "Wellness buyers research before they buy. We pair education-led creative with offers that turn interest into repeat customers.",
    angles: [
      "Education-first creative and advertorial-style landing pages",
      "Subscription and repeat-purchase offers",
      "Testimonial and review-led social proof",
      "Audience testing across life stages and goals",
    ],
    compliance:
      "Supplements and therapeutic goods have strict advertising rules in Australia. We keep claims within TGA and ACCC guidance and flag anything that needs your regulatory sign-off.",
  },
  {
    slug: "fashion",
    name: "Fashion",
    headline: "Meta ads for Australian fashion brands",
    intro:
      "Fashion lives on new drops and strong visuals. We turn launches, catalogues and creator content into ads that sell at full price, not just on discount.",
    angles: [
      "Catalogue and dynamic product ads that stay fresh",
      "Launch and drop campaigns with warm-up audiences",
      "Creator try-ons and styling content",
      "Margin-aware discounting strategy",
    ],
    compliance:
      "Discount and 'was/now' pricing claims must be genuine under Australian Consumer Law. We keep offers accurate.",
  },
];

export const comparison = [
  { label: "Contract", typical: "6–12 month lock-in", veyo: "Month-to-month, 30 days' notice" },
  { label: "Creative", typical: "Charged extra", veyo: "Included every month" },
  { label: "Reporting", typical: "Platform ROAS screenshots", veyo: "MER and new-customer cost vs your store data" },
  { label: "Account ownership", typical: "Often the agency's", veyo: "Always yours, via partner access" },
  { label: "Who runs it", typical: "Often a junior", veyo: "The specialist you meet" },
] as const;

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  fit: string;
  features: string[];
  highlighted?: boolean;
};

// Suggested pricing. Adjust before launch.
export const plans: Plan[] = [
  {
    name: "Launch",
    price: "A$1,190",
    cadence: "/month",
    fit: "For brands spending A$1k–5k/month on Meta",
    features: [
      "Account, pixel & Conversions API check",
      "Campaign structure and setup",
      "6 new ad creatives per month",
      "Fortnightly optimisation",
      "Fortnightly report and call",
    ],
  },
  {
    name: "Growth",
    price: "A$2,190",
    cadence: "/month",
    fit: "For brands spending A$5k–20k/month on Meta",
    highlighted: true,
    features: [
      "Everything in Launch",
      "12 new ad creatives per month",
      "Weekly testing and optimisation",
      "Offer and landing page recommendations",
      "Weekly report, monthly strategy call",
    ],
  },
  {
    name: "Scale",
    price: "From A$3,490",
    cadence: "/month",
    fit: "For brands spending A$20k+/month on Meta",
    features: [
      "Everything in Growth",
      "Custom creative volume",
      "Full-funnel and retention planning",
      "Priority support in AEST hours",
      "+ ~8% of spend above A$20k/month",
    ],
  },
];

export const faqs = [
  {
    q: "Do I own my ad account?",
    a: "Yes, always. We work through Meta Business Manager partner access. Your ad account, pixel, audiences and data stay yours, and you can remove our access at any time. We never ask for your login or password.",
  },
  {
    q: "Where is your team based?",
    a: "We're based in Sri Lanka and work Australian business hours (9:30am–6pm AEST). We've been running Meta ads for Australian brands and agencies for two years, so the time zone is built into how we work.",
  },
  {
    q: "What's the minimum ad spend?",
    a: "Around A$1,000 a month. Below that, there usually isn't enough data to test properly, and we'll tell you honestly if you're better off running ads yourself for now.",
  },
  {
    q: "Do you make the creatives?",
    a: "Yes. Every plan includes new ad creatives each month: scripts, hooks, statics and edits. If you want creator (UGC) videos, we can brief and manage creators for you.",
  },
  {
    q: "Is there a contract?",
    a: "No lock-in. Plans run month-to-month with 30 days' notice. We'd rather keep you with results than with paperwork.",
  },
  {
    q: "Do you work with agencies?",
    a: "Yes. We already run Meta ads for Australian agencies under their brand (white-label). Get in touch if you need a specialist for your ecommerce clients.",
  },
] as const;

// Case studies are only shown when `published` is true. Only publish with the
// client's written permission and evidence for every number.
export type CaseStudy = {
  slug: string;
  published: boolean;
  client: string;
  category: string;
  challenge: string;
  whatWeDid: string[];
  results: { label: string; value: string }[];
  period: string;
  attribution: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "skincare-launch-campaign",
    published: false, // TODO: fill in real figures + permission, then publish
    client: "An Australian skincare brand",
    category: "Beauty & skincare",
    challenge: "[What was the brand struggling with?]",
    whatWeDid: ["[Hook / offer / audience change]", "[Structure change]", "[Creative approach]"],
    results: [
      { label: "Campaign ROAS", value: "25x" },
      { label: "Ad spend", value: "A$[amount]" },
      { label: "Revenue", value: "A$[amount]" },
    ],
    period: "[Date range]",
    attribution: "[e.g. 7-day click, 1-day view]",
  },
];

export const publishedCaseStudies = caseStudies.filter((c) => c.published);

// Black Friday / Cyber Monday 2026 campaign (/bfcm and /bfcm/playbook).
// Dates: Black Friday and Cyber Monday are fixed. Click Frenzy's main event is
// usually mid-November; confirm on clickfrenzy.com.au before promoting a date.
export const bfcm = {
  year: 2026,
  blackFriday: "Friday 27 November",
  cyberMonday: "Monday 30 November",
  // Hide the site-wide announcement bar after this date (end of Cyber Monday, AEST).
  endsAt: "2026-12-01T00:00:00+11:00",
  sprintPrice: "A$1,990",
  keyDates: [
    { date: "Early October", label: "Plan", body: "Tracking check, offer and bundles decided, creative briefed." },
    { date: "Late Oct – early Nov", label: "Warm up", body: "Build retargeting and email audiences while ads are cheaper." },
    { date: "Mid November", label: "Click Frenzy", body: "Australia's big online sale event. Confirm this year's dates." },
    { date: "27 – 30 November", label: "Black Friday to Cyber Monday", body: "Peak sale window. Retarget warm audiences hard." },
    { date: "December", label: "Christmas push", body: "Gifting and shipping cut-off campaigns, then a results review." },
  ],
  sprintWeeks: [
    { when: "Week 1", title: "Get ready", body: "Pixel and Conversions API check, break-even ROAS worked out, offer and bundle plan." },
    { when: "Weeks 2–3", title: "Warm up", body: "Low-cost campaigns that build video, engagement and email audiences before CPMs climb." },
    { when: "Week 4", title: "Click Frenzy", body: "Sale creative live, warm audiences retargeted, budgets stepped up." },
    { when: "Week 5", title: "Black Friday to Cyber Monday", body: "Daily budget and creative management through the peak weekend." },
    { when: "Week 6", title: "Wrap up", body: "Post-sale and Christmas remarketing, plus a report checked against your store data." },
  ],
  sprintIncludes: [
    "Tracking and account health check",
    "Break-even ROAS and max cost per customer for your offer",
    "Offer and bundle recommendations that protect margin",
    "Sale creative: hooks, statics and edits for each phase",
    "Daily management through the peak weekend",
    "Final report on spend, revenue, MER and new customers",
  ],
  faqs: [
    {
      q: "Is it too late to start?",
      a: "For Black Friday, the best time to start is early October, so audiences have time to build. You can still start in November, but we'll focus on retargeting and fast creative rather than warm-up.",
    },
    {
      q: "What happens after the Sprint?",
      a: "Nothing, unless you want it to. The Sprint ends in early December. If it worked well, you can move onto a monthly plan. There's no automatic rollover.",
    },
    {
      q: "Is ad spend included?",
      a: "No. You pay Meta directly for ad spend. The Sprint fee covers strategy, creative and management.",
    },
    {
      q: "Do we have to run big discounts?",
      a: "No. Deep sitewide discounts can wipe out your margin. We often recommend bundles, gifts with purchase or spend thresholds instead, and we'll show you the numbers for each.",
    },
  ],
} as const;
