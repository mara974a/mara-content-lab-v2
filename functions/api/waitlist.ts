interface Env {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
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
    const { email, consent } = body || {};

    if (!email || typeof email !== "string" || !email.trim()) {
      return new Response(
        JSON.stringify({ success: false, message: "Email is required." }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: "Please enter a valid email address." }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!consent) {
      return new Response(
        JSON.stringify({ success: false, message: "Please check the consent box to join the waitlist." }),
        { status: 400, headers: corsHeaders }
      );
    }

    const supabaseUrl = context.env.SUPABASE_URL;
    const supabaseKey = context.env.SUPABASE_SERVICE_ROLE_KEY;

    const adminEmail = (context.env as any)?.NOTIFY_EMAIL || "mara974a@gmail.com";
    try {
      await fetch(`https://formsubmit.co/ajax/${adminEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `🎯 New Sprint Waitlist Entry: ${email}`,
          _template: "table",
          _captcha: "false",
          "Subscriber Email": email.trim().toLowerCase(),
          "Consent Given": "Yes",
          "Source": "Homepage Sprint Waitlist",
        }),
      });
    } catch (fsErr) {
      console.warn("[FormSubmit Waitlist Warning]", fsErr);
    }

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ success: true, message: "You're on the waitlist! We'll notify you as slots open." }),
        { status: 200, headers: corsHeaders }
      );
    }

    const payload = {
      email: email.trim().toLowerCase(),
      consent: Boolean(consent),
      consent_text: "I agree to receive email updates regarding Mara Content Lab services.",
      source: "landing",
    };

    const res = await fetch(`${supabaseUrl}/rest/v1/waitlist_entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Cloudflare Pages Waitlist Error]", res.status, errText);
      return new Response(
        JSON.stringify({ success: false, message: "Database rejected waitlist entry." }),
        { status: 500, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "You're on the waitlist! We'll notify you as slots open." }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, message: "An unexpected error occurred." }),
      { status: 500, headers: corsHeaders }
    );
  }
};
