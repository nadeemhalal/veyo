import { afterEach, describe, expect, it, vi } from "vitest";
import { buildChecklistAlert, buildFormLeadAlert, sendLeadAlert, sourceLabel } from "./lead-alert";

const lead = {
  source: "sri-lanka-q4",
  name: "Kasun Perera",
  email: "kasun@store.lk",
  storeUrl: "https://store.lk",
  spend: "Rs 50,000–150,000/month",
  whatsapp: "077 123 4567",
  problems: ["Too many cash-on-delivery orders get refused"],
  message: "Black Friday is our biggest week",
};

describe("buildFormLeadAlert", () => {
  it("names the form and includes the lead's details with a WhatsApp reply link", () => {
    const text = buildFormLeadAlert(lead);
    expect(text).toContain("New lead: Q4 Sprint booking (Sri Lanka)");
    expect(text).toContain("<b>WhatsApp:</b> 077 123 4567");
    expect(text).toContain("Too many cash-on-delivery orders get refused");
    expect(text).toContain('<a href="https://wa.me/94771234567">Reply on WhatsApp</a>');
  });

  it("leaves out empty fields and escapes what visitors typed", () => {
    const text = buildFormLeadAlert({ ...lead, whatsapp: "", problems: [], message: "<b>hi</b> & bye", name: "<script>" });
    expect(text).not.toContain("WhatsApp");
    expect(text).not.toContain("Problems");
    expect(text).toContain("&lt;b&gt;hi&lt;/b&gt; &amp; bye");
    expect(text).not.toContain("<script>");
  });

  it("labels unknown forms by their source", () => {
    expect(sourceLabel("audit")).toBe("Free ad audit (Australia)");
    expect(sourceLabel("new-page")).toBe("Form: new-page");
  });
});

describe("buildChecklistAlert", () => {
  it("shows the score and the marketing opt-in", () => {
    const text = buildChecklistAlert({ name: "Sam", organisation: "Shop", email: "s@x.com", score: 41, max: 60, marketingOptIn: false });
    expect(text).toContain("Checklist completed: 41/60");
    expect(text).toContain("<b>Marketing emails OK:</b> no");
  });
});

describe("sendLeadAlert", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("does nothing until the bot token and chat id are set", async () => {
    vi.stubEnv("TELEGRAM_BOT_TOKEN", "");
    vi.stubEnv("TELEGRAM_CHAT_ID", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(await sendLeadAlert("hi")).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts the message to the bot's chat as HTML", async () => {
    vi.stubEnv("TELEGRAM_BOT_TOKEN", "123:abc");
    vi.stubEnv("TELEGRAM_CHAT_ID", "987");
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await sendLeadAlert("<b>hi</b>")).toBe(true);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.telegram.org/bot123:abc/sendMessage");
    expect(JSON.parse(init.body)).toMatchObject({ chat_id: "987", text: "<b>hi</b>", parse_mode: "HTML" });
  });

  it("returns false instead of throwing when Telegram refuses", async () => {
    vi.stubEnv("TELEGRAM_BOT_TOKEN", "123:abc");
    vi.stubEnv("TELEGRAM_CHAT_ID", "987");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("Unauthorized", { status: 401 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(await sendLeadAlert("hi")).toBe(false);
  });
});
