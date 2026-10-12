import { NextRequest, NextResponse } from "next/server";
import { FeedbackInput } from "@/lib/types";
import { sendEmailViaResend } from "@/lib/email";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<FeedbackInput>;
    const { name, email, rating, mostUseful, improve, postResult, allowQuote, displayName } = body;

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
      return NextResponse.json(
        { success: false, message: "Please resolve the form errors.", errors },
        { status: 400 }
      );
    }

    const adminEmail = process.env.NOTIFY_EMAIL || "mara974a@gmail.com";
    const resendApiKey = process.env.RESEND_API_KEY;
    const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!resendApiKey && !web3FormsKey) {
      console.error("[Email Failure] No email provider configured: Neither RESEND_API_KEY nor WEB3FORMS_ACCESS_KEY is set.");
      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured. Please send your notes directly via email.",
          error: "No email provider configured.",
        },
        { status: 500 }
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

    try {
      if (resendApiKey) {
        const resendResult = await sendEmailViaResend({
          to: adminEmail,
          subject: `[Sprint Feedback ${rating}/5] ${name}`,
          html: adminHtml,
          replyTo: email,
          apiKey: resendApiKey,
        });

        if (!resendResult.success) {
          console.error(`[Email Failure] Feedback notification email via Resend failed: ${resendResult.error || "Unknown error"}`);
          return NextResponse.json(
            {
              success: false,
              message: "Failed to deliver feedback email. Please send your notes directly via email.",
              error: resendResult.error,
            },
            { status: 500 }
          );
        }
      } else if (web3FormsKey) {
        const w3Res = await fetch("https://api.web3forms.com/submit", {
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

        const json: any = await w3Res.json().catch(() => null);
        if (!w3Res.ok || json?.success === false) {
          const errMsg = json?.message || `HTTP ${w3Res.status}`;
          console.error(`[Email Failure] Feedback notification email via Web3Forms failed: ${errMsg}`);
          return NextResponse.json(
            {
              success: false,
              message: "Failed to deliver feedback email. Please send your notes directly via email.",
              error: errMsg,
            },
            { status: 500 }
          );
        }
      }
    } catch (mailErr: any) {
      const reason = mailErr?.message || String(mailErr);
      console.error(`[Email Failure] Exception during feedback email dispatch: ${reason}`);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to deliver feedback email. Please send your notes directly via email.",
          error: reason,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Feedback submitted successfully." },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[API /api/feedback Error]", err);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
