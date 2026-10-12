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
    const { name, email, rating, mostUseful, improve, postResult, allowQuote, displayName } = body || {};

    const errors: Record<string, string> = {};
    if (!name || typeof name !== "string" || !name.trim()) errors.name = "Full name is required.";
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Valid work email is required.";
    }
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      errors.rating = "Rating must be between 1 and 5.";
    }
    if (!mostUseful || typeof mostUseful !== "string" || !mostUseful.trim()) {
      errors.mostUseful = "Please share what was most useful.";
    }
    if (!improve || typeof improve !== "string" || !improve.trim()) {
      errors.improve = "Please share what could be improved.";
    }

    if (Object.keys(errors).length > 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Please resolve the form errors.", errors }),
        { status: 400, headers: corsHeaders }
      );
    }

    const resendApiKey = context.env?.RESEND_API_KEY;
    const web3FormsKey = context.env?.WEB3FORMS_ACCESS_KEY;
    const adminEmail = context.env?.NOTIFY_EMAIL || "mara974a@gmail.com";

    if (!resendApiKey && !web3FormsKey) {
      console.error("[Email Failure] No email provider configured: Neither RESEND_API_KEY nor WEB3FORMS_ACCESS_KEY is set in Cloudflare environment.");
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email service is not configured. Please send your notes directly via email.",
          error: "No email provider configured.",
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    const adminHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111827; background: #ffffff; border: 1px solid #E5E7EB; border-radius: 8px;">
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 16px; color: #111827; border-bottom: 2px solid #2563EB; padding-bottom: 8px;">
          ⭐ New Sprint Feedback (${rating}/5): ${name}
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td style="padding: 10px 0; color: #6B7280; width: 140px;"><strong>Client</strong></td>
            <td style="padding: 10px 0; font-weight: 600;">${name} (<a href="mailto:${email}">${email}</a>)</td>
          </tr>
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td style="padding: 10px 0; color: #6B7280;"><strong>Rating</strong></td>
            <td style="padding: 10px 0; font-weight: 700; color: #2563EB;">${rating} / 5</td>
          </tr>
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td style="padding: 10px 0; color: #6B7280;"><strong>Most Useful</strong></td>
            <td style="padding: 10px 0; line-height: 1.5;">${mostUseful}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td style="padding: 10px 0; color: #6B7280;"><strong>To Improve</strong></td>
            <td style="padding: 10px 0; line-height: 1.5;">${improve}</td>
          </tr>
          ${postResult ? `
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td style="padding: 10px 0; color: #6B7280;"><strong>Post Performance</strong></td>
            <td style="padding: 10px 0; line-height: 1.5;">${postResult}</td>
          </tr>` : ""}
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td style="padding: 10px 0; color: #6B7280;"><strong>Allow Quoting</strong></td>
            <td style="padding: 10px 0; font-weight: 600; color: ${allowQuote ? "#047857" : "#6B7280"};">
              ${allowQuote ? "Yes (Permitted as testimonial)" : "No (Private feedback only)"}
            </td>
          </tr>
          ${displayName ? `
          <tr>
            <td style="padding: 10px 0; color: #6B7280;"><strong>Credit Name / Title</strong></td>
            <td style="padding: 10px 0;">${displayName}</td>
          </tr>` : ""}
        </table>
      </div>
    `;

    if (resendApiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Mara Content Lab <onboarding@resend.dev>",
            to: adminEmail,
            reply_to: email,
            subject: `[Sprint Feedback ${rating}/5] ${name}`,
            html: adminHtml,
          }),
        });

        if (!res.ok) {
          const errText = await res.text().catch(() => "");
          console.error(`[Email Failure] Feedback notification email via Resend failed with status ${res.status}: ${errText}`);
          return new Response(
            JSON.stringify({
              success: false,
              message: "Failed to deliver feedback email. Please send your notes directly via email.",
              error: `Resend status ${res.status}`,
            }),
            { status: 500, headers: corsHeaders }
          );
        }
      } catch (err: any) {
        const reason = err?.message || String(err);
        console.error(`[Email Failure] Network error delivering feedback notification email via Resend: ${reason}`);
        return new Response(
          JSON.stringify({
            success: false,
            message: "Failed to deliver feedback email. Please send your notes directly via email.",
            error: reason,
          }),
          { status: 500, headers: corsHeaders }
        );
      }
    } else if (web3FormsKey) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `⭐ Sprint Feedback (${rating}/5): ${name}`,
            from_name: "Mara Content Lab Feedback",
            to_email: adminEmail,
            replyto: email,
            name,
            email,
            rating,
            most_useful: mostUseful,
            to_improve: improve,
            post_result: postResult || "None",
            allow_quote: allowQuote ? "Yes" : "No",
            display_name: displayName || "None",
          }),
        });

        const json: any = await res.json().catch(() => null);
        if (!res.ok || json?.success === false) {
          const errMsg = json?.message || `HTTP ${res.status}`;
          console.error(`[Email Failure] Feedback notification email via Web3Forms failed: ${errMsg}`);
          return new Response(
            JSON.stringify({
              success: false,
              message: "Failed to deliver feedback email. Please send your notes directly via email.",
              error: errMsg,
            }),
            { status: 500, headers: corsHeaders }
          );
        }
      } catch (err: any) {
        const reason = err?.message || String(err);
        console.error(`[Email Failure] Network error delivering feedback notification email via Web3Forms: ${reason}`);
        return new Response(
          JSON.stringify({
            success: false,
            message: "Failed to deliver feedback email. Please send your notes directly via email.",
            error: reason,
          }),
          { status: 500, headers: corsHeaders }
        );
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Feedback submitted successfully." }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    const reason = err?.message || String(err);
    console.error(`[Cloudflare /api/feedback Error] ${reason}`);
    return new Response(
      JSON.stringify({ success: false, message: "An unexpected error occurred.", error: reason }),
      { status: 500, headers: corsHeaders }
    );
  }
};
