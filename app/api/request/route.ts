import { NextRequest, NextResponse } from "next/server";
import { insertProjectRequest } from "@/lib/supabase";
import { ProjectRequestInput } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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
    } = body as Partial<ProjectRequestInput>;

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
      return NextResponse.json(
        { success: false, message: "Please resolve the form errors.", errors },
        { status: 400 }
      );
    }

    const userAgent = req.headers.get("user-agent") || undefined;

    const result = await insertProjectRequest(
      {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: role.trim(),
        company: company?.trim(),
        website: website?.trim(),
        sourceUrl: sourceUrl.trim(),
        audience: audience.trim(),
        goal: goal.trim(),
        notes: notes?.trim(),
        consentTerms: Boolean(consentTerms),
        marketingOptIn: Boolean(marketingOptIn),
      },
      userAgent
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error || "Failed to record request." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Project request submitted successfully.", id: result.id },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[API /api/request Error]", err);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
