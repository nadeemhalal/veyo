import type { AuditInput } from "@/lib/audit-schema";
import { getSupabase } from "@/lib/supabase";

// Row shape of public.audit_requests in Supabase.
export type AuditRow = {
  name: string;
  work_email: string;
  store_url: string;
  monthly_meta_ad_spend: string;
  additional_info: string | null;
  source: string;
};

export function toAuditRow(data: AuditInput): AuditRow {
  return {
    name: data.name,
    work_email: data.email,
    store_url: data.storeUrl,
    monthly_meta_ad_spend: data.spend,
    additional_info: data.message ? data.message : null,
    source: data.source,
  };
}

/** Saves one lead. Returns false (and logs) if Supabase isn't configured or the insert fails. */
export async function saveAuditRequest(data: AuditInput): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) {
    console.error("[audit] Supabase env vars missing: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY");
    return false;
  }
  // No .select(): the public key can insert but not read rows back.
  const { error } = await supabase.from("audit_requests").insert(toAuditRow(data));
  if (error) {
    console.error("[audit] Supabase insert failed:", error.code, error.message);
    return false;
  }
  return true;
}
