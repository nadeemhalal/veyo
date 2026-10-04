import { describe, expect, it } from "vitest";
import { scoreChecklist } from "./audit-checklist";
import { buildChecklistEmail, escapeHtml } from "./checklist-email";
import { checklistSubmissionSchema } from "./checklist-input";

const result = scoreChecklist(["t1", "t2", "s1"]);

describe("buildChecklistEmail", () => {
  it("includes the score, band, fix-first section and missing items", () => {
    const e = buildChecklistEmail({ name: "Sam Example", organisation: "Example Co", result, siteUrl: "https://example.com" });
    expect(e.subject).toBe("Your Meta ads audit: 3/60 (Back to basics)");
    expect(e.html).toContain("Hi Sam,");
    expect(e.html).toContain("Fix this first: Audiences");
    expect(e.text).toContain("- Tracking and data: 2/10 (Leaky)");
    expect(e.text).toContain("https://example.com/services/audit");
  });

  it("escapes user-supplied name and organisation", () => {
    const e = buildChecklistEmail({ name: "<script>x</script>", organisation: 'A "B" & <C>', result, siteUrl: "https://example.com" });
    expect(e.html).not.toContain("<script>");
    expect(e.html).toContain("A &quot;B&quot; &amp; &lt;C&gt;");
  });
});

describe("escapeHtml", () => {
  it("escapes the five HTML special characters", () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe("&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
  });
});

describe("checklistSubmissionSchema", () => {
  const base = { name: "Sam Example", organisation: "Example Co", email: "sam@example.com" };

  it("keeps only known, unique item ids", () => {
    const r = checklistSubmissionSchema.parse({ ...base, checked: ["t1", "t1", "nope", "c12"] });
    expect(r.checked).toEqual(["t1", "c12"]);
    expect(r.marketingOptIn).toBe(false);
  });

  it("rejects a bad email", () => {
    expect(checklistSubmissionSchema.safeParse({ ...base, email: "nope", checked: [] }).success).toBe(false);
  });
});
