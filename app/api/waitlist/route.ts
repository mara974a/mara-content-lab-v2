import { NextRequest, NextResponse } from "next/server";
import { insertWaitlistEntry } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, consent } = body;

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { success: false, message: "Consent is required to receive updates." },
        { status: 400 }
      );
    }

    const result = await insertWaitlistEntry({
      email: email.trim().toLowerCase(),
      consent: Boolean(consent),
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error || "Failed to record waitlist entry." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Successfully added to sprint waitlist." },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[API /api/waitlist Error]", err);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
