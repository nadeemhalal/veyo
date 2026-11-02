import { getSupabase } from "@/lib/supabase";

// Supabase's free plan pauses a project after about a week without activity, and a paused project
// means every form on the site fails. A GitHub Action calls this once a day (.github/workflows/keep-awake.yml).
// It runs one tiny read; Row Level Security returns no rows, but the database still counts it as activity.
// A non-200 answer makes the Action fail, and GitHub emails the repo owner.
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) return Response.json({ ok: false, reason: "not configured" }, { status: 503 });

  const { error } = await supabase.from("audit_requests").select("id").limit(1);
  if (error) {
    console.error("[keep-awake] Supabase check failed:", error.code, error.message);
    return Response.json({ ok: false, reason: "database unreachable" }, { status: 503 });
  }
  return Response.json({ ok: true, checkedAt: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } });
}
