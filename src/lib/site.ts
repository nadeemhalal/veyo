// Central content for veyomedia.com. Edit copy here rather than in page files.
//
// IMPORTANT: every number in `stats` must be backed by evidence you can show
// (Ads Manager + Shopify screenshots for the same period). Australian Consumer
// Law treats claims you can't substantiate as misleading.

export const site = {
  name: "Veyo Media",
  shortName: "Veyo",
  url: "https://veyomedia.com",
  tagline: "From meh to veyo!",
  description:
    "Meta ads for Australian ecommerce brands. Creative included, reported against your P&L, month-to-month. Your accounts stay yours.",
  email: "nads@veyomedia.com",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "/contact",
  hours: "Mon–Fri, 9:30am–6pm AEST",
  base: "Colombo, Sri Lanka",
  // Digits only, with country code (e.g. 9477xxxxxxx). The WhatsApp button on /sri-lanka shows only when set.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
} as const;

export type NavItem = { label: string; href: string; children?: readonly { label: string; href: string }[] };

export const nav = [
  {
    label: "Services",
    href: "/services/meta-ads",
    children: [
      { label: "Meta ads management", href: "/services/meta-ads" },
      { label: "Ad creative & UGC", href: "/services/creative" },
      { label: "Free ad account audit", href: "/services/audit" },
      { label: "60-point audit checklist", href: "/meta-ads-audit" },
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

// Menu on the Sri Lankan pages: local links instead of the Australian services and A$ pricing.
export const sriLankaNav: readonly NavItem[] = [
  { label: "Online stores", href: "/sri-lanka" },
  { label: "Tourism", href: "/sri-lanka/tourism" },
  { label: "Pricing", href: "/sri-lanka#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "/about" },
];

// White-label Meta ads for Australian agencies.
export const whiteLabel = {
  headline: "Your agency's Meta ads team. No recruitment drama.",
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
  "Your accounts stay yours",
  "Month-to-month (commitment issues are valid)",
  "Creative included",
  "Aussie business hours",
] as const;

export const problems = [
  {
    title: "CPMs keep climbing. Rude.",
    body: "You're paying more for the same reach, and the account that worked last year has stalled.",
  },
  {
    title: "Creative that burns out by Tuesday",
    body: "Ads fatigue in weeks. Without a steady testing pipeline, results slide and nobody knows why.",
  },
  {
    title: "Ads Manager says yes. Your bank says no.",
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
    a: "Yes, always. We work through Meta Business Manager partner access. Your ad account, pixel, audiences and data stay yours, and you can remove our access at any time. We never ask for your login or password. We're here to run your ads, not hold them hostage.",
  },
  {
    q: "Where is your team based?",
    a: "We're based in Sri Lanka and work Australian business hours (9:30am–6pm AEST). We've been running Meta ads for Australian brands and agencies for two years, so the time zone is built into how we work. (Yes, we've done the time-zone maths.)",
  },
  {
    q: "What's the minimum ad spend?",
    a: "Around A$1,000 a month. Below that, Meta doesn't get enough data to learn properly. We'll tell you honestly if you're better off running ads yourself for now.",
  },
  {
    q: "Do you make the creatives?",
    a: "Yes. Every plan includes new ad creatives each month: scripts, hooks, statics and edits. If you want creator (UGC) videos, we can brief and manage creators for you. No surprise \"can you just resize this\" invoices.",
  },
  {
    q: "Is there a contract?",
    a: "No lock-in. Plans run month-to-month with 30 days' notice. If we're not earning our keep, you shouldn't be stuck with us.",
  },
  {
    q: "Do you work with agencies?",
    a: "Yes. We already run Meta ads for Australian agencies under their brand (white-label). Your logo on the report, our hands on the keyboard. Get in touch if you need a specialist for your ecommerce clients.",
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

// Landing page for Sri Lankan tourism businesses (/sri-lanka/tourism).
// We have no tourism results yet: the page says so, and uses only the Australian
// ecommerce track record in `stats`. Every ad in `makeovers` is a made-up example.
export const sriLankaTourism = {
  audiences: [
    { title: "Villas & boutique stays", body: "Fill the calendar without handing every booking to a booking site." },
    { title: "Hotels & resorts", body: "Reach the right guests in each country, in the right season." },
    { title: "Tours & experiences", body: "Safaris, surf camps, retreats, whale watching and driver-guides." },
  ],
  makeovers: [
    {
      type: "Villa",
      meh: {
        text: "Your island escape awaits 🌴 Luxury, comfort and unforgettable memories. Book now!",
        headline: "Paradise is calling",
        cta: "Learn more",
        notes: ["Could be any villa on any island", "No price, no dates, no reason to act today", "\"Learn more\" about what?"],
      },
      veyo: {
        text: "4 bedrooms, a 12-metre pool and a chef who does a proper rice and curry. 8 minutes' walk to the surf. Bring seven friends and it's US$40 each a night.",
        headline: "Whole villa from US$320/night · December dates open",
        cta: "Check dates",
        tag: "From US$320",
        notes: ["Says exactly what the guest gets", "A price up front filters out the wrong enquiries", "The button matches the next step"],
      },
    },
    {
      type: "Hotel",
      meh: {
        text: "Experience the true essence of Sri Lankan hospitality. Your dream getaway starts here ✨",
        headline: "A stay like no other",
        cta: "Book now",
        notes: ["Every hotel says this", "The same ad runs in every country, all year", "Nothing here beats the booking site's price"],
      },
      veyo: {
        text: "Swapping a grey January for the beach? 5 nights with breakfast and airport pick-up included. Book direct and the sunset cruise is on us.",
        headline: "5 nights from US$690 · Book direct",
        cta: "See rooms",
        tag: "5 nights US$690",
        notes: ["Written for one market: a northern winter", "Guests in other countries get their own version", "Gives a reason to book direct"],
      },
    },
    {
      type: "Tour",
      meh: {
        text: "Explore the wonders of Sri Lanka with us! Tailor-made tours for every traveller 🐘🌊🏛️",
        headline: "Discover Sri Lanka",
        cta: "Contact us",
        notes: ["\"Every traveller\" means no traveller in particular", "No route, no length, no price", "Asks for contact before giving anything"],
      },
      veyo: {
        text: "★★★★★ \"A real guest's review goes here, word for word.\" 8 days, private driver-guide, 6 people at most. Sigiriya, the Kandy to Ella train and two safaris.",
        headline: "8 days from US$1,150 per person · Quote in 24 hours",
        cta: "Get my itinerary",
        tag: "8 days · 6 guests max",
        notes: ["Opens with a guest's words, not ours", "Route, group size and price in one read", "Promises something specific after the click"],
      },
    },
  ],
  // From Meta's public Ad Library: keyword searches for Sri Lanka holiday ads shown in
  // Australia, the UK, Germany and India. Re-check and update the date before re-promoting.
  adLibrary: {
    checkedOn: "11 October 2026",
    url: "https://www.facebook.com/ads/library/",
    theyDo: [
      { title: "Put the offer in the ad", body: "Days, inclusions, price and deposit, all before the click." },
      { title: "Lead with a guest's words", body: "A named five-star review as the first line, not a slogan." },
      { title: "Collect interest early", body: "Brochures, quotes and competitions for people who aren't ready to book yet." },
      { title: "Sell to a type of traveller", body: "Surfers, solo travellers, over-50s. Not just \"visitors to Sri Lanka\"." },
    ],
    localsMiss: [
      "One ad for every country, whatever the season there",
      "Beautiful words with no price, dates or offer",
      "Clicks land on pages with no prices and no reviews",
      "No owner, host or guest ever appears",
    ],
  },
  leakCheck: [
    {
      stage: "The scroll",
      items: [
        { id: "who", label: "Your ad says who it's for (surfers, families, honeymooners), not just \"Sri Lanka\"" },
        { id: "markets", label: "You run different ads for different countries and seasons" },
      ],
    },
    {
      stage: "The ad",
      items: [
        { id: "price", label: "The ad shows a price or a \"from\" rate" },
        { id: "real", label: "It uses a real guest's words or a real photo, not a brochure line" },
      ],
    },
    {
      stage: "The click",
      items: [
        { id: "page", label: "The click lands on a page about that offer, not your homepage" },
        { id: "proof", label: "Reviews and prices are on that page, without leaving it" },
      ],
    },
    {
      stage: "The question",
      items: [{ id: "reply", label: "WhatsApp and email enquiries get a reply within an hour, during the guest's daytime" }],
    },
    {
      stage: "The booking",
      items: [{ id: "track", label: "You can tell which ad a booking or enquiry came from" }],
    },
  ],
  whatYouGet: [
    { title: "Ads for each market", body: "Separate ads for each country and season you sell to, so nobody is told to escape a winter they aren't having." },
    { title: "Creative included", body: "Hooks, scripts, statics and video edits every month, built from your real photos, footage and guest reviews." },
    { title: "The page after the click", body: "Advice on the landing page, prices, reviews and enquiry flow, because a good ad can't rescue a page with no prices." },
    { title: "Counted to the booking", body: "Reports on enquiries and bookings, checked against your own records. Not likes, not reach." },
    { title: "Your accounts stay yours", body: "We work through Meta partner access. Your ad account, pixel and data are always yours." },
    { title: "Month-to-month", body: "No lock-in. If we're not earning our keep, you shouldn't be stuck with us." },
  ],
  faqs: [
    {
      q: "Have you run ads for tourism businesses before?",
      a: "Not yet, and we'd rather say so. We've spent two years running Meta ads for Australian online stores and agencies. The work is the same: a clear offer, creative that stops the scroll, a page that converts and honest counting. Where tourism is different, we'll tell you what we don't know yet.",
    },
    {
      q: "Which countries can you advertise in?",
      a: "Any country Meta reaches. You tell us where your guests come from, and we write separate ads for each market rather than one ad for everyone.",
    },
    {
      q: "Do I need a booking engine on my website?",
      a: "No. Ads can send people to WhatsApp, an enquiry form or your booking page. What we do need is a way to count enquiries and bookings, so we know which ads are working.",
    },
    {
      q: "Will this replace Booking.com or Airbnb?",
      a: "No. Booking sites bring guests you might never reach yourself. The aim is to grow the share of bookings that come to you directly, where you keep the commission and the guest's contact details.",
    },
    {
      q: "How much do I need to spend on ads?",
      a: "It depends on your prices and how many rooms or seats you need to fill. We'll give you an honest number after the free review, including if the answer is \"not yet\". Ad spend is paid directly to Meta, never through us.",
    },
    {
      q: "What does it cost?",
      a: "Plans are month-to-month with 30 days' notice. We'll quote after the free review, based on how many properties and markets are involved.",
    },
    {
      q: "Who owns the ad account?",
      a: "You do, always. We work through Meta Business Manager partner access and never ask for your login or password.",
    },
  ],
} as const;

// Landing page for Sri Lankan online stores (/sri-lanka), selling in Sri Lanka or overseas.
// We have no Sri Lankan client results yet: the page says so, and uses only the Australian
// track record in `stats`. Every ad in `makeovers` is a made-up example.
// Starter pack prices: the regular price is what later clients pay and what first-time clients
// pay from month four, so the first-time discount is genuine. Keep it that way.
export const sriLankaEcom = {
  markets: [
    {
      id: "local",
      title: "Selling in Sri Lanka",
      body: "Islandwide delivery, cash on delivery, orders on WhatsApp. Ads that sell to shoppers here, counted on orders that actually get paid for.",
      points: [
        "Price in the ad, so the comments aren't all \"PM price?\"",
        "Click-to-WhatsApp and Messenger ads for stores that sell in chat",
        "Ads judged on paid orders, not placed ones, so refused cash-on-delivery orders don't flatter the numbers",
        "Orders that come in on WhatsApp and Messenger tracked, not guessed",
        "Offers that make paying online worth it, without wrecking your margin",
      ],
    },
    {
      id: "overseas",
      title: "Selling overseas",
      body: "Tea, spices, skincare, fashion, gifts. Ads for shoppers in Australia and beyond, from someone who's sold to Australians for two years.",
      points: [
        "Prices in the buyer's currency, with shipping time and cost up front",
        "Your Sri Lankan origin as the selling point, not a footnote",
        "Claims kept within the buyer's country's rules (Australia's are strict on health claims)",
        "Ads for Sri Lankans abroad, too: gifts home, and a taste of home",
      ],
    },
  ],
  makeovers: [
    {
      type: "Skincare · local",
      meh: {
        text: "✨ Glow like never before! Best quality products 🔥🔥 Islandwide delivery. Order now!",
        headline: "Hurry! Stocks are moving fast!",
        cta: "Shop now",
        notes: [
          "Every store says \"hurry\", and every shopper knows it",
          "No price, so the comments fill up with \"PM price?\"",
          "Nothing on what it does or who it's for",
        ],
      },
      veyo: {
        text: "Rosehip oil, 30ml. Two or three drops at night, after cleansing. Rs 2,450, delivered islandwide in 2–4 days. Cash on delivery, or pay online and save Rs 200.",
        headline: "Rs 2,450 · Cash on delivery islandwide",
        cta: "Shop now",
        tag: "Rs 2,450",
        notes: [
          "The price is in the ad, so the questions stop",
          "Says exactly how to use it, with no miracle claims",
          "Delivery time and payment answer the next two questions",
        ],
      },
    },
    {
      type: "Fashion · local",
      meh: {
        text: "New arrivals 😍😍 Limited stock! Inbox for prices 📩",
        headline: "New collection",
        cta: "Send message",
        notes: [
          "\"Inbox for prices\" turns a buyer into a negotiator",
          "Limited stock, every single week?",
          "Sends everyone to your inbox to ask the same question",
        ],
      },
      veyo: {
        text: "Linen co-ord set, S to XL, three colours. Rs 6,900, and a free exchange if the size is wrong. Order in two taps and we'll confirm on WhatsApp.",
        headline: "Linen co-ord · Rs 6,900 · Free size exchange",
        cta: "Shop now",
        tag: "Rs 6,900",
        notes: [
          "Sizes, colours and price in one read",
          "The free exchange removes the biggest worry about buying clothes online",
          "WhatsApp confirms the order instead of starting a negotiation",
        ],
      },
    },
    {
      type: "Tea · overseas",
      meh: {
        text: "Pure Ceylon tea from the hills of Sri Lanka 🇱🇰🍃 Best quality. Worldwide shipping.",
        headline: "100% Pure Ceylon Tea",
        cta: "Shop now",
        notes: [
          "Every Ceylon tea brand says \"pure\"",
          "\"Worldwide shipping\" raises more questions than it answers",
          "Doesn't say why to buy from you, not the supermarket",
        ],
      },
      veyo: {
        text: "Picked and packed in Nuwara Eliya this season, at your door in Melbourne in 6–9 days. Single-estate black tea, 100g for A$24. Free shipping on orders over A$60.",
        headline: "Single-estate Ceylon tea · A$24 · Ships to Australia",
        cta: "Shop now",
        tag: "A$24 · 6–9 days",
        notes: [
          "Origin is the selling point, so it leads",
          "Answers \"how long?\" and \"how much?\" up front",
          "Priced in the buyer's currency, not rupees",
        ],
      },
    },
  ],
  // From Meta's public Ad Library. Re-check the count and date before re-promoting.
  adLibrary: {
    checkedOn: "25 October 2026",
    url: "https://www.facebook.com/ads/library/",
    islandwideAds: "6,900",
    local: [
      "\"Hurry! Stocks are moving fast!\" on ads that have run for over a year",
      "\"Inbox for price\" instead of a price",
      "Big health claims that can get ads rejected and accounts restricted",
      "Results judged on orders placed, including the ones that never get paid for",
    ],
    overseas: [
      "In Australia, most ads that mention \"Ceylon\" came from overseas brands selling Ceylon cinnamon, not from Sri Lankan brands",
      "The Sri Lankan brands we did see were mostly selling gifts to Sri Lankans abroad",
    ],
  },
  leakCheck: [
    {
      stage: "The scroll",
      items: [
        { id: "price", label: "The ad shows the price (no \"PM for price\")" },
        { id: "photos", label: "Your ads use your own product photos or videos, not stock images" },
      ],
    },
    {
      stage: "The click",
      items: [
        { id: "page", label: "The ad goes to the product or order page, not your homepage or Facebook page" },
        { id: "delivery", label: "Delivery time and cost are clear before checkout" },
      ],
    },
    {
      stage: "The order",
      items: [
        { id: "pay", label: "Buyers can pay online or cash on delivery, and paying online gets a small reward" },
        { id: "chat", label: "Orders that come through WhatsApp or Messenger are counted" },
      ],
    },
    {
      stage: "The delivery",
      items: [
        { id: "refused", label: "You know what share of cash-on-delivery orders get refused" },
        { id: "pixel", label: "Your Meta pixel reports purchases, not just page views" },
      ],
    },
  ],
  trustPoints: ["Meta ads only", "Price on the page", "Month-to-month", "Your ad account stays yours"],
  // The first-month creatives offer. Must stay true: 3 free in month one, then 1 a month included.
  firstMonthOffer: "First month: 3 ad creatives free",
  // What we saw on Sri Lankan agency pages that rank for "Meta ads Sri Lanka" (October 2026).
  // Keep the "typical" column fair and hedged: it describes common patterns, not every agency.
  comparison: [
    { label: "What they do", typical: "Websites, SEO, social posting, apps, and ads", veyo: "Facebook and Instagram ads. Nothing else." },
    { label: "Price", typical: "Usually \"contact us for a quote\"", veyo: "On this page" },
    { label: "Contract", typical: "Sometimes a 6-month minimum", veyo: "Month-to-month, 30 days' notice" },
    { label: "Reported on", typical: "Often reach, likes and messages", veyo: "Cost per paid order" },
    { label: "Who runs your ads", typical: "Varies. Worth asking who will", veyo: "The specialist you talk to" },
  ],
  starter: {
    name: "Starter",
    fit: "For one store selling in one market: Sri Lanka, or one country overseas.",
    monthly: { regular: "Rs 45,000", firstTime: "Rs 35,000", firstTimeFor: "your first 3 months" },
    setup: { regular: "Rs 50,000", firstTime: "Rs 35,000" },
    includes: [
      "Meta pixel and Conversions API set up to count real orders",
      "Campaign structure, audiences and budgets",
      "3 ad creatives free in your first month, then 1 included every month (in English)",
      "Need more? Add extra creatives, or send us your own photos and videos",
      "Weekly checks and optimisation",
      "Monthly report on spend, orders and cost per paid order, plus a call",
      "Month-to-month, 30 days' notice",
    ],
  },
  custom: {
    name: "Bigger or more markets",
    fit: "More products, more countries, or more creative each month.",
    includes: [
      "Several markets, e.g. Sri Lanka plus Australia",
      "Catalogue ads for larger product ranges",
      "More creatives a month, including short videos",
      "Launch and sale-season campaigns",
    ],
  },
  faqs: [
    {
      q: "Have you run ads for Sri Lankan stores before?",
      a: "Not as clients of Veyo yet, and we'd rather say so. We've spent two years running Meta ads for Australian online stores and agencies. Selling overseas is home ground. Selling in Sri Lanka adds cash on delivery and WhatsApp orders, which we plan and track for from day one.",
    },
    {
      q: "We sell through Facebook and Instagram, with no website. Can you still help?",
      a: "Yes. Ads can send buyers to WhatsApp, Messenger or an order form. A website makes tracking and scaling easier, and we'll tell you honestly if it's time to get one.",
    },
    {
      q: "Most of our orders are cash on delivery. Does that matter?",
      a: "It matters a lot. Some cash-on-delivery orders never get paid for, so judging ads on orders placed makes them look better than they are. We count paid orders and set the ads up to learn from them.",
    },
    {
      q: "Can you advertise our products in Australia or other countries?",
      a: "Yes. That's where our experience is. We'll check your shipping times and costs, pricing in the buyer's currency, and any rules on what you can claim in that country before anything goes live.",
    },
    {
      q: "What's in the first-time client price?",
      a: "Everything in the Starter pack. You pay Rs 35,000 setup instead of Rs 50,000, and Rs 35,000 a month instead of Rs 45,000 for your first 3 months. From month four it's the regular Rs 45,000 a month. Your first month also comes with 3 ad creatives free; after that, 1 a month is included. No lock-in either way.",
    },
    {
      q: "Do you make the ad creatives?",
      a: "Yes. Your first month comes with 3 ad creatives free, and after that 1 new creative a month is included. Want more? Extra creatives are an add-on, or you can send us your own product photos and videos and we'll turn them into ads.",
    },
    {
      q: "Do you make ads in Sinhala or Tamil?",
      a: "No, our ads are in English only. Plenty of Sri Lankan shoppers buy from English ads, and so do buyers in Australia and the UK. If most of your buyers only shop in Sinhala or Tamil, tell us in the review and we'll be honest about whether we're the right fit.",
    },
    {
      q: "Is boosting a post the same as running ads?",
      a: "Not quite. The Boost button is the quickest way to spend money on Meta, but it mostly buys reach and engagement. Ads Manager lets you choose the result you want (sales, WhatsApp chats, leads), test different ads against each other and track what happened after the click. For a store, that's the difference between likes and orders.",
    },
    {
      q: "We get likes and messages but few sales. Why?",
      a: "Usually one of three things. The campaign is set up to buy engagement, so Meta finds people who like things. The ad hides the price, so people message to ask and drift off. Or the page after the click makes ordering hard. The free review checks all three.",
    },
    {
      q: "How much should we spend on ads?",
      a: "We suggest at least Rs 50,000 a month in ad spend to start, so Meta has enough results to learn from. Overseas markets cost more per click than Sri Lanka. If your budget is smaller, we'll tell you honestly whether you're better off boosting posts yourself for now.",
    },
    {
      q: "Is ad spend included?",
      a: "No. You pay Meta directly for ad spend, and it's never routed through us.",
    },
    {
      q: "Who owns the ad account?",
      a: "You do, always. We work through Meta Business Manager partner access and never ask for your login or password.",
    },
  ],
} as const;
