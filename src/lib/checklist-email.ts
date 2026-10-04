import type { ChecklistResult } from "@/lib/audit-checklist";

const INK = "#1E1B5E";
const LIME = "#C6F24E";
const SLATE = "#6B6F80";

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

const levelColour = { Scaling: "#2E7D32", Steady: "#B26A00", Leaky: "#C62828" } as const;

/** Builds the report email. All user-supplied text is escaped. */
export function buildChecklistEmail({
  name,
  organisation,
  result,
  siteUrl,
}: {
  name: string;
  organisation: string;
  result: ChecklistResult;
  siteUrl: string;
}): { subject: string; html: string; text: string } {
  const first = name.trim().split(/\s+/)[0] ?? name;
  const subject = `Your Meta ads audit: ${result.total}/${result.max} (${result.band.label})`;
  const roast = `${siteUrl}/services/audit`;
  const pricing = `${siteUrl}/pricing`;
  const fix = result.fixFirst;

  const sectionRows = result.sections
    .map(
      (s) => `<tr>
  <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#16161D">${escapeHtml(s.title)}</td>
  <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#16161D;text-align:right;font-family:monospace">${s.score}/${s.max}</td>
  <td style="padding:8px 0 8px 12px;border-bottom:1px solid #eee;font-size:12px;font-weight:bold;color:${levelColour[s.level]};text-align:right">${s.level}</td>
</tr>`,
    )
    .join("");

  const missingBlocks = result.sections
    .filter((s) => s.missing.length > 0)
    .map(
      (s) => `<p style="margin:20px 0 6px;font-size:15px;font-weight:bold;color:${INK}">${escapeHtml(s.title)}${s.id === fix.id ? " &mdash; fix this first" : ""}</p>
<ul style="margin:0;padding-left:20px;color:#16161D;font-size:14px;line-height:1.5">${s.missing.map((i) => `<li style="margin:4px 0">${escapeHtml(i.text)}</li>`).join("")}</ul>`,
    )
    .join("");

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#FAFAF7;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF7"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:${INK};padding:24px 28px">
  <span style="font-size:26px;font-weight:bold;color:#ffffff;letter-spacing:-1px">veyo</span><span style="font-size:26px;font-weight:bold;color:${LIME}">!</span>
  <p style="margin:12px 0 0;font-size:14px;color:#CECBF6">Meta Ads Audit Checklist for Australian Ecommerce Brands</p>
</td></tr>
<tr><td style="padding:28px">
  <p style="margin:0 0 16px;font-size:16px;color:#16161D">Hi ${escapeHtml(first)},</p>
  <p style="margin:0 0 20px;font-size:15px;line-height:1.5;color:#16161D">Here's the Meta ads audit you completed for <strong>${escapeHtml(organisation)}</strong>.</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${INK};border-radius:10px"><tr><td style="padding:20px 24px">
    <p style="margin:0;font-size:13px;color:#CECBF6">Your score</p>
    <p style="margin:4px 0 0;font-size:40px;font-weight:bold;color:#ffffff;font-family:monospace">${result.total}<span style="font-size:20px;color:#CECBF6">/${result.max}</span></p>
    <p style="margin:8px 0 0;font-size:15px;color:${LIME};font-weight:bold">${escapeHtml(result.band.label)}</p>
    <p style="margin:4px 0 0;font-size:14px;color:#ffffff">${escapeHtml(result.band.message)}</p>
  </td></tr></table>
  <p style="margin:28px 0 8px;font-size:17px;font-weight:bold;color:${INK}">Score by section</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${sectionRows}</table>
  <p style="margin:28px 0 4px;font-size:17px;font-weight:bold;color:${INK}">Fix this first: ${escapeHtml(fix.title)}</p>
  <p style="margin:0;font-size:14px;color:${SLATE}">Your lowest section. Tracking problems come before everything else, because every other number depends on them.</p>
  ${missingBlocks ? `<p style="margin:28px 0 0;font-size:17px;font-weight:bold;color:${INK}">Your fix list</p>${missingBlocks}` : `<p style="margin:20px 0 0;font-size:15px;color:#16161D">You ticked every item. Your gains now come from creative volume and testing.</p>`}
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:32px 0 8px"><tr><td style="background:${INK};border-radius:8px"><a href="${roast}" style="display:inline-block;padding:12px 22px;color:#ffffff;font-weight:bold;font-size:14px;text-decoration:none">Roast my ads (nicely)</a></td></tr></table>
  <p style="margin:0;font-size:13px;color:${SLATE}">Want help? We'll record a free 10-minute video review with three fixes, or <a href="${pricing}" style="color:${INK}">see our plans</a>.</p>
</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #eee;font-size:12px;color:${SLATE}">
  You're receiving this because you asked for your audit report at ${escapeHtml(siteUrl.replace(/^https?:\/\//, ""))}. This checklist is general guidance, not legal advice.<br>Veyo Media
</td></tr>
</table></td></tr></table></body></html>`;

  const text = [
    `Hi ${first},`,
    ``,
    `Your Meta ads audit for ${organisation}: ${result.total}/${result.max} (${result.band.label})`,
    result.band.message,
    ``,
    `Score by section:`,
    ...result.sections.map((s) => `- ${s.title}: ${s.score}/${s.max} (${s.level})`),
    ``,
    `Fix this first: ${fix.title}`,
    ...result.sections
      .filter((s) => s.missing.length > 0)
      .flatMap((s) => [``, `${s.title}:`, ...s.missing.map((i) => `- ${i.text}`)]),
    ``,
    `Free ad roast: ${roast}`,
    `Pricing: ${pricing}`,
    ``,
    `This checklist is general guidance, not legal advice.`,
    `Veyo Media`,
  ].join("\n");

  return { subject, html, text };
}
