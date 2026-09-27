import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { AuditInput } from "@/lib/audit-schema";

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

let client: SupabaseClient | null = null;

// Uses the public (publishable/anon) key. Row Level Security only allows inserts
// for this key, so leads can't be read or changed through it.
function getClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  client ??= createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return client;
}

/** Saves one lead. Returns false (and logs) if Supabase isn't configured or the insert fails. */
export async function saveAuditRequest(data: AuditInput): Promise<boolean> {
  const supabase = getClient();
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
