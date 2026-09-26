import { describe, expect, it } from "vitest";
import { parseAuditForm } from "./audit-schema";

const valid = {
  name: "Sam Example",
  email: "sam@example.com",
  storeUrl: "example-store.com.au",
  spend: "A$1k–5k/month",
  message: "",
};

describe("parseAuditForm", () => {
  it("accepts a valid submission and normalises the store URL", () => {
    const result = parseAuditForm(valid);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.storeUrl).toBe("https://example-store.com.au");
  });

  it("keeps an existing https:// prefix", () => {
    const result = parseAuditForm({ ...valid, storeUrl: "https://shop.example.com" });
    expect(result.ok && result.data.storeUrl).toBe("https://shop.example.com");
  });

  it("rejects a bad email with a field error", () => {
    const result = parseAuditForm({ ...valid, email: "not-an-email" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fieldErrors.email).toBeDefined();
  });

  it("rejects an unknown spend option", () => {
    const result = parseAuditForm({ ...valid, spend: "A$1m" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fieldErrors.spend).toBeDefined();
  });

  it("flags the honeypot as a bot", () => {
    const result = parseAuditForm({ ...valid, company: "Spam Co" });
    expect(result).toEqual({ ok: false, bot: true, fieldErrors: {} });
  });

  it("reports missing required fields", () => {
    const result = parseAuditForm({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.fieldErrors).sort()).toEqual(["email", "name", "spend", "storeUrl"]);
    }
  });
});
