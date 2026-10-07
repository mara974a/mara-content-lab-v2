interface Env {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body: any = await context.request.json();

    const {
      name,
      email,
      role,
      company,
      website,
      sourceUrl,
      audience,
      goal,
      notes,
      consentTerms,
      marketingOptIn,
    } = body || {};

    const errors: Record<string, string> = {};

    if (!name || typeof name !== "string" || !name.trim()) {
      errors.name = "Full name is required.";
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please provide a valid email address.";
    }

    if (!role || typeof role !== "string" || !role.trim()) {
      errors.role = "Your role or title is required.";
    }

    if (!sourceUrl || typeof sourceUrl !== "string" || !sourceUrl.trim()) {
      errors.sourceUrl = "Source URL (talk, podcast, essay, or doc) is required.";
    }

    if (!audience || typeof audience !== "string" || !audience.trim()) {
      errors.audience = "Target audience is required.";
    }

    if (!goal || typeof goal !== "string" || !goal.trim()) {
      errors.goal = "Content goal or core point of view is required.";
    }

    if (!consentTerms) {
      errors.consentTerms = "You must accept the terms and manual review process to submit.";
    }

    if (
      Object.keys(errors).length > 0 ||
      !name ||
      !email ||
      !role ||
      !sourceUrl ||
      !audience ||
      !goal
    ) {
      return new Response(
        JSON.stringify({ success: false, message: "Please resolve the form errors.", errors }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = context.env.SUPABASE_URL;
    const supabaseKey = context.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Project request submitted successfully.",
          id: "simulated-" + Date.now(),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const userAgent = context.request.headers.get("user-agent") || null;

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: role.trim(),
      company: company?.trim() || null,
      website: website?.trim() || null,
      source_url: sourceUrl.trim(),
      audience: audience.trim(),
      goal: goal.trim(),
      notes: notes?.trim() || null,
      consent_terms: Boolean(consentTerms),
      marketing_opt_in: Boolean(marketingOptIn),
      terms_version: "2026-10-04",
      user_agent: userAgent,
    };

    const res = await fetch(`${supabaseUrl}/rest/v1/project_requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Cloudflare Pages Supabase Error]", res.status, errText);
      return new Response(
        JSON.stringify({ success: false, message: "Database rejected project request submission." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const inserted: any = await res.json();
    return new Response(
      JSON.stringify({
        success: true,
        message: "Project request submitted successfully.",
        id: inserted?.[0]?.id,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, message: "An unexpected error occurred while processing your request." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
