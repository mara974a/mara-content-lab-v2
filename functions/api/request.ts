interface Env {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  RESEND_API_KEY?: string;
  NOTIFY_EMAIL?: string;
  WEB3FORMS_ACCESS_KEY?: string;
}

type PagesFunction<T = any> = (context: {
  request: Request;
  env: T;
  params?: Record<string, string | string[]>;
  waitUntil?: (promise: Promise<any>) => void;
  next?: () => Promise<Response>;
  data?: Record<string, any>;
}) => Promise<Response> | Response;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
};

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
        { status: 400, headers: corsHeaders }
      );
    }

    const supabaseUrl = context.env?.SUPABASE_URL;
    const supabaseKey = context.env?.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = context.env?.RESEND_API_KEY;
    const web3FormsKey = context.env?.WEB3FORMS_ACCESS_KEY;
    const adminEmail = context.env?.NOTIFY_EMAIL || "mara974a@gmail.com";

    // 1. Verify email provider configuration
    if (!resendApiKey && !web3FormsKey) {
      console.error("[Email Failure] No email provider configured: Neither RESEND_API_KEY nor WEB3FORMS_ACCESS_KEY is set in Cloudflare environment.");
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email delivery service is not configured. Please use the direct email link below.",
          error: "No email provider configured.",
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    let insertedId: string | undefined;

    // Optional Supabase persistence if credentials are provided
    if (supabaseUrl && supabaseKey) {
      try {
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
          const errText = await res.text().catch(() => "");
          console.error(`[Database Failure] Supabase insert rejected with status ${res.status}: ${errText}`);
          return new Response(
            JSON.stringify({ success: false, message: "Database rejected project request submission." }),
            { status: 500, headers: corsHeaders }
          );
        }

        const inserted: any = await res.json().catch(() => null);
        insertedId = inserted?.[0]?.id;
      } catch (dbErr: any) {
        console.error(`[Database Failure] Exception saving to Supabase: ${dbErr?.message || dbErr}`);
        return new Response(
          JSON.stringify({ success: false, message: "Database connection failed." }),
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // 2. Dispatch Notification Email (Required: if this fails, return HTTP 500)
    const adminHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111827; background: #ffffff; border: 1px solid #E5E7EB; border-radius: 8px;">
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 16px; color: #111827; border-bottom: 2px solid #2563EB; padding-bottom: 8px;">
          🎯 New Sprint Project Request ($297)
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <tr><td style="padding: 8px 0; color: #6B7280; width: 140px;"><strong>Client Name</strong></td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280;"><strong>Client Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280;"><strong>Role & Company</strong></td><td style="padding: 8px 0;">${role}${company ? ` · ${company}` : ""}</td></tr>
          ${website ? `<tr><td style="padding: 8px 0; color: #6B7280;"><strong>Website</strong></td><td style="padding: 8px 0;"><a href="${website}">${website}</a></td></tr>` : ""}
          <tr><td style="padding: 8px 0; color: #6B7280;"><strong>Source URL</strong></td><td style="padding: 8px 0;"><a href="${sourceUrl}" style="color: #2563EB; font-weight: 600;">${sourceUrl}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280;"><strong>Target Audience</strong></td><td style="padding: 8px 0;">${audience}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280;"><strong>Goal / Thesis</strong></td><td style="padding: 8px 0; line-height: 1.5;">${goal}</td></tr>
          ${notes ? `<tr><td style="padding: 8px 0; color: #6B7280;"><strong>Notes</strong></td><td style="padding: 8px 0;">${notes}</td></tr>` : ""}
        </table>
        <p style="font-size: 13px; color: #6B7280;">Reply to this email to contact <strong>${name}</strong> directly.</p>
      </div>
    `;

    if (resendApiKey) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Mara Content Lab <onboarding@resend.dev>",
            to: adminEmail,
            reply_to: email,
            subject: `[New Sprint Request] ${name} (${company || role})`,
            html: adminHtml,
          }),
        });

        if (!resendRes.ok) {
          const errText = await resendRes.text().catch(() => "");
          console.error(`[Email Failure] Resend notification email failed with status ${resendRes.status}: ${errText}`);
          return new Response(
            JSON.stringify({
              success: false,
              message: "Failed to deliver notification email. Please use the direct email link below.",
              error: `Resend status ${resendRes.status}`,
            }),
            { status: 500, headers: corsHeaders }
          );
        }
      } catch (err: any) {
        const reason = err?.message || String(err);
        console.error(`[Email Failure] Network error delivering Resend notification email: ${reason}`);
        return new Response(
          JSON.stringify({
            success: false,
            message: "Failed to deliver notification email. Please use the direct email link below.",
            error: reason,
          }),
          { status: 500, headers: corsHeaders }
        );
      }

      // 3. Client confirmation email (Best-effort: failure does not reject request)
      const clientHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111827; background: #ffffff; border: 1px solid #E5E7EB; border-radius: 8px;">
          <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 16px; color: #111827;">
            We received your sprint request — Mara Content Lab
          </h2>
          <p style="font-size: 15px; color: #374151; line-height: 1.6; margin-bottom: 16px;">
            Hi ${name.split(" ")[0]},
          </p>
          <p style="font-size: 15px; color: #374151; line-height: 1.6; margin-bottom: 16px;">
            Thank you for submitting your project request for the <strong>Source-to-Authority Sprint ($297)</strong>.
          </p>
          <p style="font-size: 15px; color: #374151; line-height: 1.6; margin-bottom: 16px;">
            I review every source material personally to ensure there is a defensible, non-obvious thesis suitable for executive authority content.
          </p>
          <div style="background: #F9FAFB; border-left: 4px solid #2563EB; padding: 14px 16px; margin-bottom: 20px; font-size: 14px; color: #4B5563;">
            <p style="margin: 0 0 6px 0;"><strong>Source reviewed:</strong> <span style="word-break: break-all;">${sourceUrl}</span></p>
            <p style="margin: 0;"><strong>Target audience:</strong> ${audience}</p>
          </div>
          <p style="font-size: 15px; color: #374151; line-height: 1.6; margin-bottom: 24px;">
            <strong>What happens next:</strong><br>
            I will review your source material and reply within <strong>one business day</strong> with confirmation of scope, thesis angles, and private checkout link.
          </p>
          <p style="font-size: 15px; color: #374151; line-height: 1.6; margin-bottom: 0;">
            Best regards,<br>
            <strong>Parth Tiwari</strong><br>
            <span style="font-size: 13px; color: #6B7280;">Founder & Editorial Lead · Mara Content Lab</span>
          </p>
        </div>
      `;

      try {
        const clientRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Mara Content Lab <onboarding@resend.dev>",
            to: email,
            reply_to: adminEmail,
            subject: "We received your sprint request — Mara Content Lab",
            html: clientHtml,
          }),
        });

        if (!clientRes.ok) {
          const clientErrText = await clientRes.text().catch(() => "");
          console.warn(`[Email Warning] Client confirmation email failed with status ${clientRes.status}: ${clientErrText}`);
        }
      } catch (clientErr: any) {
        console.warn(`[Email Warning] Client confirmation email network failure: ${clientErr?.message || clientErr}`);
      }
    } else if (web3FormsKey) {
      try {
        const w3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `🎯 New Sprint Project Request ($297): ${name} (${company || role})`,
            from_name: "Mara Content Lab",
            to_email: adminEmail,
            replyto: email,
            name,
            email,
            role,
            company: company || "None",
            website: website || "None",
            source_url: sourceUrl,
            audience,
            goal,
            notes: notes || "None",
            marketing_opt_in: marketingOptIn ? "Yes" : "No",
          }),
        });

        const json: any = await w3Res.json().catch(() => null);
        if (!w3Res.ok || json?.success === false) {
          const errMsg = json?.message || `HTTP ${w3Res.status}`;
          console.error(`[Email Failure] Web3Forms notification email failed: ${errMsg}`);
          return new Response(
            JSON.stringify({
              success: false,
              message: "Failed to deliver notification email. Please use the direct email link below.",
              error: errMsg,
            }),
            { status: 500, headers: corsHeaders }
          );
        }
      } catch (err: any) {
        const reason = err?.message || String(err);
        console.error(`[Email Failure] Web3Forms network error delivering notification email: ${reason}`);
        return new Response(
          JSON.stringify({
            success: false,
            message: "Failed to deliver notification email. Please use the direct email link below.",
            error: reason,
          }),
          { status: 500, headers: corsHeaders }
        );
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Project request submitted successfully.",
        id: insertedId || "req-" + Date.now(),
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    const reason = err?.message || String(err);
    console.error(`[Cloudflare /api/request Error] ${reason}`);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An unexpected error occurred while processing your request.",
        error: reason,
      }),
      { status: 500, headers: corsHeaders }
    );
  }
};
