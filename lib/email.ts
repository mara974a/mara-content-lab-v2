import { ProjectRequestInput } from "./types";

interface SendEmailParams {
  to: string | string[];
  from?: string;
  subject: string;
  html: string;
  replyTo?: string;
  apiKey?: string;
}

function getEnv(key: string): string | undefined {
  if (typeof process !== "undefined" && process?.env) {
    return process.env[key];
  }
  return undefined;
}

export async function forwardViaWeb3Forms(
  data: ProjectRequestInput,
  accessKey?: string,
  recipientEmail = "mara974a@gmail.com"
): Promise<{ success: boolean; error?: string }> {
  const key = accessKey || getEnv("WEB3FORMS_ACCESS_KEY");
  if (!key) {
    console.error("[Email Failure] Web3Forms access key is not configured.");
    return { success: false, error: "Web3Forms access key not configured." };
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: key,
        subject: `🎯 New Sprint Project Request ($297): ${data.name} (${data.company || data.role})`,
        from_name: "Mara Content Lab",
        to_email: recipientEmail,
        replyto: data.email,
        name: data.name,
        email: data.email,
        role: data.role,
        company: data.company || "None",
        website: data.website || "None",
        source_url: data.sourceUrl,
        audience: data.audience,
        goal: data.goal,
        notes: data.notes || "None",
        marketing_opt_in: data.marketingOptIn ? "Yes" : "No",
      }),
    });

    const json: any = await res.json().catch(() => null);
    if (!res.ok || json?.success === false) {
      const errMsg = json?.message || `HTTP ${res.status}`;
      console.error(`[Email Failure] Web3Forms submission failed: ${errMsg}`);
      return { success: false, error: errMsg };
    }
    return { success: true };
  } catch (err: any) {
    const errMsg = err?.message || "Failed to reach Web3Forms API.";
    console.error(`[Email Failure] Network error contacting Web3Forms API: ${errMsg}`);
    return { success: false, error: errMsg };
  }
}

export async function sendEmailViaResend({
  to,
  from,
  subject,
  html,
  replyTo,
  apiKey,
}: SendEmailParams): Promise<{ success: boolean; id?: string; error?: string }> {
  const key = apiKey || getEnv("RESEND_API_KEY");
  const fromAddress = from || getEnv("NOTIFY_FROM") || "Mara Content Lab <onboarding@resend.dev>";

  if (!key) {
    console.error("[Email Failure] Resend API key is not configured.");
    return { success: false, error: "Resend API key is not configured." };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error(`[Email Failure] Resend API returned status ${res.status}: ${errText}`);
      return { success: false, error: `Resend error: ${res.status} ${errText}` };
    }

    const data: any = await res.json().catch(() => ({}));
    return { success: true, id: data?.id };
  } catch (err: any) {
    const errMsg = err?.message || "Failed to reach Resend API.";
    console.error(`[Email Failure] Network error contacting Resend API: ${errMsg}`);
    return { success: false, error: errMsg };
  }
}

export async function dispatchProjectRequestEmails(
  data: ProjectRequestInput,
  apiKey?: string,
  adminEmailOverride?: string
) {
  const adminEmail = adminEmailOverride || getEnv("NOTIFY_EMAIL") || "mara974a@gmail.com";

  // 1. Email notification to Admin (Parth / Mara)
  const adminHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111827; background: #ffffff; border: 1px solid #E5E7EB; border-radius: 8px;">
      <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 16px; color: #111827; border-bottom: 2px solid #2563EB; padding-bottom: 8px;">
        🎯 New Sprint Project Request ($297)
      </h2>
      <p style="font-size: 14px; color: #4B5563; margin-bottom: 20px;">
        A new client has submitted a request for the <strong>Source-to-Authority Sprint</strong> on Mara Content Lab.
      </p>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
        <tr style="border-bottom: 1px solid #F3F4F6;">
          <td style="padding: 10px 0; color: #6B7280; width: 140px;"><strong>Client Name</strong></td>
          <td style="padding: 10px 0; color: #111827; font-weight: 600;">${data.name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #F3F4F6;">
          <td style="padding: 10px 0; color: #6B7280;"><strong>Client Email</strong></td>
          <td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #2563EB; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #F3F4F6;">
          <td style="padding: 10px 0; color: #6B7280;"><strong>Role & Company</strong></td>
          <td style="padding: 10px 0; color: #111827;">${data.role}${data.company ? ` · ${data.company}` : ""}</td>
        </tr>
        ${data.website ? `
        <tr style="border-bottom: 1px solid #F3F4F6;">
          <td style="padding: 10px 0; color: #6B7280;"><strong>Website / Profile</strong></td>
          <td style="padding: 10px 0;"><a href="${data.website}" style="color: #2563EB; word-break: break-all;">${data.website}</a></td>
        </tr>` : ""}
        <tr style="border-bottom: 1px solid #F3F4F6;">
          <td style="padding: 10px 0; color: #6B7280;"><strong>Source Material URL</strong></td>
          <td style="padding: 10px 0;"><a href="${data.sourceUrl}" style="color: #2563EB; font-weight: 600; word-break: break-all;">${data.sourceUrl}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #F3F4F6;">
          <td style="padding: 10px 0; color: #6B7280;"><strong>Target Audience</strong></td>
          <td style="padding: 10px 0; color: #111827;">${data.audience}</td>
        </tr>
        <tr style="border-bottom: 1px solid #F3F4F6;">
          <td style="padding: 10px 0; color: #6B7280;"><strong>Core Goal / Thesis</strong></td>
          <td style="padding: 10px 0; color: #111827; line-height: 1.5;">${data.goal}</td>
        </tr>
        ${data.notes ? `
        <tr style="border-bottom: 1px solid #F3F4F6;">
          <td style="padding: 10px 0; color: #6B7280;"><strong>Notes / Constraints</strong></td>
          <td style="padding: 10px 0; color: #4B5563; line-height: 1.5;">${data.notes}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 10px 0; color: #6B7280;"><strong>Marketing Opt-in</strong></td>
          <td style="padding: 10px 0; color: #111827;">${data.marketingOptIn ? "Yes" : "No"}</td>
        </tr>
      </table>

      <div style="background: #F9FAFB; padding: 16px; border-radius: 6px; font-size: 13px; color: #6B7280; text-align: center;">
        Reply directly to this email to contact <strong>${data.name}</strong> at <a href="mailto:${data.email}" style="color: #2563EB;">${data.email}</a>.
      </div>
    </div>
  `;

  let adminResult: { success: boolean; id?: string; error?: string };
  const resendKey = apiKey || getEnv("RESEND_API_KEY");
  const web3Key = getEnv("WEB3FORMS_ACCESS_KEY");

  if (!resendKey && !web3Key) {
    console.error("[Email Failure] No email provider configured: Neither RESEND_API_KEY nor WEB3FORMS_ACCESS_KEY is set.");
    return {
      adminResult: { success: false, error: "No email provider configured." },
      clientResult: { success: false, error: "No email provider configured." },
    };
  }

  if (resendKey) {
    adminResult = await sendEmailViaResend({
      to: adminEmail,
      subject: `[New Sprint Request] ${data.name} (${data.company || data.role})`,
      html: adminHtml,
      replyTo: data.email,
      apiKey: resendKey,
    });
  } else {
    adminResult = await forwardViaWeb3Forms(data, web3Key, adminEmail);
  }

  if (!adminResult.success) {
    console.error(`[Email Failure] Notification email to ${adminEmail} failed: ${adminResult.error || "Unknown error"}`);
    return {
      adminResult,
      clientResult: { success: false, error: "Skipped client confirmation because notification email failed." },
    };
  }

  // 2. Confirmation email to the Requester (Best-effort: failure is logged but does not fail the request)
  const clientHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111827; background: #ffffff; border: 1px solid #E5E7EB; border-radius: 8px;">
      <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 16px; color: #111827;">
        We received your sprint request — Mara Content Lab
      </h2>
      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin-bottom: 16px;">
        Hi ${data.name.split(" ")[0]},
      </p>
      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin-bottom: 16px;">
        Thank you for submitting your project request for the <strong>Source-to-Authority Sprint ($297)</strong>.
      </p>
      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin-bottom: 16px;">
        I review every source material personally to ensure there is a defensible, non-obvious thesis suitable for executive authority content.
      </p>
      <div style="background: #F9FAFB; border-left: 4px solid #2563EB; padding: 14px 16px; margin-bottom: 20px; font-size: 14px; color: #4B5563;">
        <p style="margin: 0 0 6px 0;"><strong>Source reviewed:</strong> <span style="word-break: break-all;">${data.sourceUrl}</span></p>
        <p style="margin: 0;"><strong>Target audience:</strong> ${data.audience}</p>
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

  let clientResult: { success: boolean; id?: string; error?: string } = { success: true };
  if (resendKey) {
    try {
      clientResult = await sendEmailViaResend({
        to: data.email,
        subject: `We received your sprint request — Mara Content Lab`,
        html: clientHtml,
        replyTo: adminEmail,
        apiKey: resendKey,
      });
      if (!clientResult.success) {
        console.warn(`[Email Warning] Client confirmation email to ${data.email} failed: ${clientResult.error || "Unknown error"}`);
      }
    } catch (e: any) {
      const reason = e?.message || String(e);
      console.warn(`[Email Warning] Client confirmation email to ${data.email} failed: ${reason}`);
      clientResult = { success: false, error: reason };
    }
  }

  return { adminResult, clientResult };
}
