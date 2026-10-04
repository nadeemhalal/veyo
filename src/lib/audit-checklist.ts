// The 60-point Meta Ads Audit Checklist for Australian ecommerce brands.
// Source: "Meta Ads Audit Checklist for Australian Ecommerce Brands" (Oct 2026).
// Item ids are stable keys ("t1", "s3"...) used for scoring, storage and email.

export type ChecklistItem = { id: string; text: string };
export type ChecklistSection = {
  id: string;
  title: string;
  intro: string;
  /** Short witty line shown when the section is complete. */
  doneLine: string;
  items: ChecklistItem[];
};

const items = (prefix: string, texts: string[]): ChecklistItem[] =>
  texts.map((text, i) => ({ id: `${prefix}${i + 1}`, text }));

export const checklistSections: ChecklistSection[] = [
  {
    id: "tracking",
    title: "Tracking and data",
    intro: "If Meta can't see your sales accurately, it optimises toward the wrong people.",
    doneLine: "Tracking checked. Meta can see again.",
    items: items("t", [
      "The Meta pixel fires on every page, including checkout and the thank-you page",
      "The Conversions API (server-side tracking) is connected, through your Shopify integration or similar",
      "Browser and server events are deduplicated, so each purchase is counted once",
      "Purchase events send the order value and currency (AUD)",
      "ViewContent, AddToCart and InitiateCheckout events all fire correctly",
      "Event Match Quality for Purchase is in a healthy range in Events Manager (as a rough guide, 6 or above)",
      "Your domain is verified in Business Manager",
      "Purchases in Ads Manager are within about 20% of the Meta-attributed sales your store shows",
      "You know which attribution setting your reports use (for example, 7-day click, 1-day view)",
      "You own the ad account, pixel and Business Manager, not an agency or ex-staff member",
    ]),
  },
  {
    id: "structure",
    title: "Account structure and budget",
    intro: "A simple structure lets Meta learn faster. Too many small campaigns split your budget and data.",
    doneLine: "Structure done. Fewer campaigns, fewer headaches.",
    items: items("s", [
      "Campaigns are optimised for Purchase, not clicks, traffic or engagement",
      "You run a small number of campaigns with a clear job each, such as prospecting, retargeting and testing",
      "Each ad set can realistically reach about 50 purchases a week, or budgets are consolidated so it can",
      'Ad sets are not stuck in "Learning limited"',
      "You've tested Advantage+ (automated) campaigns against your manual setup",
      "New creatives are tested in a separate structure, so tests don't disrupt winning campaigns",
      "Budgets change gradually (roughly 20% at a time) rather than in large jumps that reset learning",
      "Most of the budget goes to prospecting new customers, not retargeting the same small audience",
      "Campaigns, ad sets and ads follow a naming system anyone on the team can read",
    ]),
  },
  {
    id: "audiences",
    title: "Audiences",
    intro:
      "With good tracking and creative, broad targeting often beats tight interests. These checks make sure you're not wasting reach.",
    doneLine: "Audiences sorted. No more competing with yourself.",
    items: items("a", [
      "Location targeting matches where you actually ship",
      "You've tested broad targeting against interest-based audiences",
      "Recent purchasers are excluded from prospecting campaigns, or you've decided on purpose to include them",
      "Your customer list is uploaded and kept up to date as a Custom Audience",
      "Retargeting covers site visitors, add-to-carts and video viewers over sensible windows (for example, 7–30 days)",
      "Lookalikes, if used, are built from purchasers or high-value customers, not all site visitors",
      "Audiences in different ad sets don't overlap so much that you compete with yourself",
    ]),
  },
  {
    id: "creative",
    title: "Creative",
    intro: "Creative is now the main way you target on Meta. It decides who sees your ads and whether they stop scrolling.",
    doneLine: "Creative reviewed. The biggest lever, checked.",
    items: items("c", [
      "You launch new creatives at least every 2–4 weeks",
      "You run a mix of formats: video, statics and carousels",
      "Videos make their point in the first 3 seconds",
      "Videos have captions and work with the sound off",
      "Ads are made in vertical formats (9:16 for Reels and Stories, 4:5 for Feed)",
      "You test different angles, not just new colours or crops of the same idea",
      "At least some ads use UGC, real customers or the founder, not only polished brand shots",
      "Ads use real customer reviews or social proof",
      "Each ad shows the product clearly and makes it obvious what it does",
      "Each ad has one clear offer or reason to buy now",
      "You check frequency and CPA to spot tired ads, and replace them before results drop",
      "You know which 2–3 angles have historically worked best, and you build new ads from them",
    ]),
  },
  {
    id: "offer",
    title: "Offer and landing page",
    intro: "Good ads can't fix a page that doesn't convert. Check this on your phone, because most Meta traffic is mobile.",
    doneLine: "Landing page checked. Good ads deserve good pages.",
    items: items("o", [
      "The page an ad links to matches what the ad promised: same product, same offer",
      "The page loads in under about 3 seconds on mobile data",
      "Price, offer and an Add to Cart button are visible without scrolling on mobile",
      "Reviews and ratings appear near the top of product pages",
      "Shipping costs and delivery times are clear before checkout",
      "Returns or a guarantee are easy to find",
      "Checkout includes express options such as Shop Pay, Apple Pay or Afterpay",
      "You have bundles or offers that lift average order value",
      "Your add-to-cart rate and checkout completion rate are tracked, and you know where people drop off",
      "Abandoned cart emails or SMS are set up",
    ]),
  },
  {
    id: "reporting",
    title: "Reporting",
    intro: "Ads Manager ROAS alone can make a losing account look profitable. These checks keep you judging ads against real money.",
    doneLine: "Reporting done. Receipts, not vibes.",
    items: items("r", [
      "You track MER (total store revenue ÷ total ad spend) every week",
      "You know your cost to acquire a new customer, separate from repeat buyers",
      "You know the break-even ROAS or CPA for your margins",
      "You compare ad results with Shopify or store data, not just Ads Manager",
      "You review results on a fixed schedule (for example, weekly) rather than reacting to daily swings",
      "Key decisions and tests are written down, so you know what's been tried",
    ]),
  },
  {
    id: "compliance",
    title: "Australian compliance",
    intro:
      "Rejected ads and ACCC or TGA problems cost more than any bad campaign. This is a general guide, not legal advice.",
    doneLine: "Compliance checked. The ACCC can stay off your back.",
    items: items("p", [
      'Product claims in ads can be backed up, with no "cures", "treats" or medical-style promises for cosmetics',
      "If you sell therapeutic goods (including some sunscreens and supplements), your ads have been checked against the TGA Advertising Code",
      "Reviews and testimonials in ads are real, and you have permission to use them",
      'Sale prices compare against a genuine previous price, with no inflated "was" prices for Black Friday',
      "Before-and-after images, if used, follow Meta's ad policies and are honest",
      "You've had no recent ad rejections or account restrictions, or the ones you had are resolved",
    ]),
  },
];

export const allItemIds = new Set(checklistSections.flatMap((s) => s.items.map((i) => i.id)));
export const checklistMax = allItemIds.size; // 60

export type SectionLevel = "Leaky" | "Steady" | "Scaling";

export type SectionResult = {
  id: string;
  title: string;
  score: number;
  max: number;
  pct: number;
  level: SectionLevel;
  missing: ChecklistItem[];
};

export type ChecklistResult = {
  total: number;
  max: number;
  band: { label: string; message: string };
  sections: SectionResult[];
  /** The section with the lowest percentage; ties go to the earlier section (tracking first). */
  fixFirst: SectionResult;
};

export function sectionLevel(pct: number): SectionLevel {
  if (pct >= 80) return "Scaling";
  if (pct >= 50) return "Steady";
  return "Leaky";
}

export function scoreBand(total: number): { label: string; message: string } {
  if (total >= 50) return { label: "Solid account", message: "A solid account. Your gains now come from creative volume and testing." };
  if (total >= 35) return { label: "A few leaks", message: "A few leaks are costing you money. Start with your lowest section." };
  return { label: "Back to basics", message: "The basics need fixing before more budget will help. Begin with tracking." };
}

/** Scores a set of ticked item ids. Unknown ids are ignored. */
export function scoreChecklist(checkedIds: Iterable<string>): ChecklistResult {
  const checked = new Set([...checkedIds].filter((id) => allItemIds.has(id)));
  const sections = checklistSections.map((s) => {
    const score = s.items.filter((i) => checked.has(i.id)).length;
    const max = s.items.length;
    const pct = Math.round((score / max) * 100);
    return { id: s.id, title: s.title, score, max, pct, level: sectionLevel(pct), missing: s.items.filter((i) => !checked.has(i.id)) };
  });
  const total = sections.reduce((a, s) => a + s.score, 0);
  const fixFirst = sections.reduce((low, s) => (s.pct < low.pct ? s : low), sections[0]);
  return { total, max: checklistMax, band: scoreBand(total), sections, fixFirst };
}
