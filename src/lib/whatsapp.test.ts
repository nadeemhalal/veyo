import { afterEach, describe, expect, it, vi } from "vitest";
import { buildLeadMessage, firstName, sendLeadWhatsApp, storeName, toWhatsAppNumber, whatsappTemplates } from "./whatsapp";

const lead = { source: "sri-lanka-q4", name: "  Kasun   Perera ", storeUrl: "https://www.kasunstore.lk/", whatsapp: "077 123 4567" };

describe("toWhatsAppNumber", () => {
  it("turns local and international numbers into digits with the country code", () => {
    expect(toWhatsAppNumber("077 123 4567")).toBe("94771234567");
    expect(toWhatsAppNumber("+94 78 555 6938")).toBe("94785556938");
    expect(toWhatsAppNumber("+61 412 345 678")).toBe("61412345678");
  });

  it("rejects numbers that can't include a country code", () => {
    expect(toWhatsAppNumber("123 4567")).toBeUndefined();
    expect(toWhatsAppNumber("call me")).toBeUndefined();
  });
});

describe("template values", () => {
  it("uses the first name and a short store name", () => {
    expect(firstName("  Kasun   Perera ")).toBe("Kasun");
    expect(firstName("   ")).toBe("there");
    expect(storeName("https://www.kasunstore.lk/shop/")).toBe("kasunstore.lk/shop");
    expect(storeName("Kasun\n\tStore")).toBe("Kasun Store");
  });
});

describe("buildLeadMessage", () => {
  it("builds the Q4 Sprint template for the booking form", () => {
    expect(buildLeadMessage(lead)).toEqual({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: "94771234567",
      type: "template",
      template: {
        name: "q4_sprint_booking",
        language: { code: "en" },
        components: [{ type: "body", parameters: [{ type: "text", text: "Kasun" }, { type: "text", text: "kasunstore.lk" }] }],
      },
    });
  });

  it("fills every placeholder in the template body", () => {
    for (const t of Object.values(whatsappTemplates)) {
      const placeholders = t.body.match(/\{\{\d+\}\}/g) ?? [];
      expect(t.params(lead)).toHaveLength(placeholders.length);
      expect(t.samples).toHaveLength(placeholders.length);
    }
  });

  it("sends nothing for forms without a template or without a usable number", () => {
    expect(buildLeadMessage({ ...lead, source: "audit" })).toBeUndefined();
    expect(buildLeadMessage({ ...lead, whatsapp: "" })).toBeUndefined();
    expect(buildLeadMessage({ ...lead, whatsapp: "12" })).toBeUndefined();
  });
});

describe("sendLeadWhatsApp", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("does nothing until the token and phone number id are set", async () => {
    vi.stubEnv("WHATSAPP_TOKEN", "");
    vi.stubEnv("WHATSAPP_PHONE_NUMBER_ID", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(await sendLeadWhatsApp(lead)).toBe("skipped");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts the template to the Cloud API with the token", async () => {
    vi.stubEnv("WHATSAPP_TOKEN", "tok");
    vi.stubEnv("WHATSAPP_PHONE_NUMBER_ID", "555");
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await sendLeadWhatsApp(lead)).toBe("sent");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://graph.facebook.com/v23.0/555/messages");
    expect(init.headers.Authorization).toBe("Bearer tok");
    expect(JSON.parse(init.body).to).toBe("94771234567");
  });

  it("returns failed instead of throwing when Meta refuses", async () => {
    vi.stubEnv("WHATSAPP_TOKEN", "tok");
    vi.stubEnv("WHATSAPP_PHONE_NUMBER_ID", "555");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("bad template", { status: 400 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(await sendLeadWhatsApp(lead)).toBe("failed");
  });
});
