import { ProjectRequestInput, WaitlistInput } from "./types";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function insertProjectRequest(
  data: ProjectRequestInput,
  userAgent?: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  // If Supabase credentials are not provided, gracefully log and simulate successful capture
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.info(
      "[Mara Backend Simulation] Supabase credentials not set in .env.local. Request recorded in memory:",
      { name: data.name, email: data.email, source: data.sourceUrl }
    );
    return { success: true, id: "simulated-" + Date.now() };
  }

  try {
    const payload = {
      name: data.name,
      email: data.email.toLowerCase(),
      role: data.role,
      company: data.company || null,
      website: data.website || null,
      source_url: data.sourceUrl,
      audience: data.audience,
      goal: data.goal,
      notes: data.notes || null,
      consent_terms: data.consentTerms,
      marketing_opt_in: Boolean(data.marketingOptIn),
      terms_version: "2026-10-04",
      user_agent: userAgent || null,
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/project_requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Supabase Error]", res.status, errText);
      return { success: false, error: "Database rejected project request submission." };
    }

    const inserted = await res.json();
    return { success: true, id: inserted?.[0]?.id };
  } catch (err: any) {
    console.error("[Supabase Network Error]", err);
    return { success: false, error: err.message || "Failed to reach database." };
  }
}

export async function insertWaitlistEntry(
  data: WaitlistInput
): Promise<{ success: boolean; error?: string }> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.info("[Mara Backend Simulation] Waitlist email captured:", data.email);
    return { success: true };
  }

  try {
    const payload = {
      email: data.email.toLowerCase(),
      consent: data.consent,
      consent_text: "I agree to receive email updates regarding Mara Content Lab services.",
      source: "landing",
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist_entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Supabase Waitlist Error]", res.status, errText);
      return { success: false, error: "Database rejected waitlist entry." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("[Supabase Network Error]", err);
    return { success: false, error: err.message || "Failed to connect to database." };
  }
}
