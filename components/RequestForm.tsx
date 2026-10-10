"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProjectRequestInput } from "@/lib/types";

export default function RequestForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProjectRequestInput>({
    name: "",
    email: "",
    role: "",
    company: "",
    website: "",
    sourceUrl: "",
    audience: "",
    goal: "",
    notes: "",
    consentTerms: false,
    marketingOptIn: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const updateField = (field: keyof ProjectRequestInput, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full name is required.";
    if (!formData.email.trim()) {
      errs.email = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid work email address.";
    }
    if (!formData.role.trim()) errs.role = "Your role or title is required.";
    if (!formData.sourceUrl.trim()) errs.sourceUrl = "Source material URL is required.";
    if (!formData.audience.trim()) errs.audience = "Target audience is required.";
    if (!formData.goal.trim()) errs.goal = "Content goal or core thesis is required.";
    if (!formData.consentTerms) errs.consentTerms = "Please agree to the review process and terms.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector(".form-error");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    let normalizedSourceUrl = formData.sourceUrl.trim();
    if (!/^https?:\/\//i.test(normalizedSourceUrl)) {
      normalizedSourceUrl = "https://" + normalizedSourceUrl;
    }

    const payload = {
      ...formData,
      sourceUrl: normalizedSourceUrl,
    };

    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        router.push("/thank-you");
      } else {
        setServerError(
          data?.message ||
          "Unable to record your project request at this moment. You can retry below, or send your details directly via email."
        );
        setIsSubmitting(false);
      }
    } catch {
      setServerError(
        "Network connection issue: Could not reach the submission server. You can retry, or email your details directly to Parth at mara974a@gmail.com."
      );
      setIsSubmitting(false);
    }
  };

  const mailtoSubject = encodeURIComponent(`🎯 Project Request ($297): ${formData.name || "Sprint Inquiry"}`);
  const mailtoBody = encodeURIComponent(
    `Hi Parth,\n\nI submitted a request on Mara Content Lab with the following details:\n\n` +
    `Name: ${formData.name}\n` +
    `Email: ${formData.email}\n` +
    `Role: ${formData.role}\n` +
    `Company: ${formData.company || "N/A"}\n` +
    `Website / Profile: ${formData.website || "N/A"}\n` +
    `Source URL: ${formData.sourceUrl}\n` +
    `Target Audience: ${formData.audience}\n` +
    `Core Goal / Thesis: ${formData.goal}\n` +
    `Additional Notes: ${formData.notes || "None"}\n`
  );

  return (
    <div className="card" style={{ maxWidth: "720px", margin: "0 auto", padding: "clamp(1.5rem, 4vw, 2.75rem)" }}>
      {serverError && (
        <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", color: "#991B1B", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1.75rem", fontSize: "0.875rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>{serverError}</p>
          <a
            href={`mailto:mara974a@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`}
            className="btn btn-secondary"
            style={{ display: "inline-block", fontSize: "0.8125rem", padding: "0.375rem 0.75rem", backgroundColor: "#ffffff" }}
          >
            ✉ Email Details Directly to mara974a@gmail.com →
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* SECTION 1: CONTACT */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-subtle)" }}>
            1. Your Contact & Role
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name *</label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="form-input"
                placeholder="e.g. Alex Morgan"
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Work Email *</label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="form-input"
                placeholder="alex@company.com"
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">Your Role / Title *</label>
            <input
              id="role"
              type="text"
              required
              value={formData.role}
              onChange={(e) => updateField("role", e.target.value)}
              className="form-input"
              placeholder="e.g. Founder, Managing Partner, B2B Advisor"
            />
            {errors.role && <p className="form-error">{errors.role}</p>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            <div className="form-group">
              <label htmlFor="company" className="form-label">Company / Firm <span className="optional">(optional)</span></label>
              <input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => updateField("company", e.target.value)}
                className="form-input"
                placeholder="e.g. Morgan Advisory"
              />
            </div>

            <div className="form-group">
              <label htmlFor="website" className="form-label">Website or LinkedIn <span className="optional">(optional)</span></label>
              <input
                id="website"
                type="text"
                value={formData.website}
                onChange={(e) => updateField("website", e.target.value)}
                className="form-input"
                placeholder="e.g. linkedin.com/in/alex"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: SOURCE & SCOPE */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-subtle)" }}>
            2. Source Material & Objectives
          </h2>

          <div className="form-group">
            <label htmlFor="sourceUrl" className="form-label">Source URL *</label>
            <input
              id="sourceUrl"
              type="text"
              required
              value={formData.sourceUrl}
              onChange={(e) => updateField("sourceUrl", e.target.value)}
              className="form-input"
              placeholder="e.g. youtube.com/watch?... or podcast / essay / transcript link"
            />
            <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "block" }}>
              Link to your talk, interview transcript, podcast episode, or long-form essay.
            </span>
            {errors.sourceUrl && <p className="form-error">{errors.sourceUrl}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="audience" className="form-label">Target Audience *</label>
            <input
              id="audience"
              type="text"
              required
              value={formData.audience}
              onChange={(e) => updateField("audience", e.target.value)}
              className="form-input"
              placeholder="e.g. B2B Enterprise CEOs, Supply chain leaders, VP Engineering"
            />
            {errors.audience && <p className="form-error">{errors.audience}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="goal" className="form-label">Core Point of View / Thesis *</label>
            <textarea
              id="goal"
              required
              rows={3}
              value={formData.goal}
              onChange={(e) => updateField("goal", e.target.value)}
              className="form-textarea"
              placeholder="What core truth or takeaway from this source should your reader walk away with?"
            />
            {errors.goal && <p className="form-error">{errors.goal}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="notes" className="form-label">Additional Notes <span className="optional">(optional)</span></label>
            <textarea
              id="notes"
              rows={2}
              value={formData.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              className="form-textarea"
              placeholder="Tone preferences, specific constraints, or background context."
            />
          </div>
        </div>

        {/* SECTION 3: ENGAGEMENT TERMS & SUBMIT */}
        <div style={{ backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "1.25rem", marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>
              Source-to-Authority Sprint · $297 USD
            </span>
            <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
              ~5 business days turnaround once approved and paid
            </span>
          </div>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
            Includes 1 text-first LinkedIn authority post, 1 structured outline doc, 3 future content angles, 3 hook variations, and 1 consolidated revision round.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
            <input
              type="checkbox"
              id="consentTerms"
              checked={formData.consentTerms}
              onChange={(e) => updateField("consentTerms", e.target.checked)}
              style={{ marginTop: "0.25rem", width: "18px", height: "18px", cursor: "pointer" }}
            />
            <label htmlFor="consentTerms" style={{ fontSize: "0.875rem", color: "var(--text-primary)", lineHeight: 1.5 }}>
              I understand that Parth Tiwari reviews every source manually. If approved, I will receive scope confirmation and a private payment link. I agree to the{" "}
              <Link href="/terms" target="_blank" style={{ color: "var(--accent-blue)", textDecoration: "underline" }}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" target="_blank" style={{ color: "var(--accent-blue)", textDecoration: "underline" }}>
                Privacy Policy
              </Link>.
            </label>
          </div>
          {errors.consentTerms && <p className="form-error" style={{ marginLeft: "1.75rem" }}>{errors.consentTerms}</p>}

          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
            <input
              type="checkbox"
              id="marketingOptIn"
              checked={formData.marketingOptIn}
              onChange={(e) => updateField("marketingOptIn", e.target.checked)}
              style={{ marginTop: "0.25rem", width: "18px", height: "18px", cursor: "pointer" }}
            />
            <label htmlFor="marketingOptIn" style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
              Keep me updated on future Mara Content Lab editorial essays and sprint availability (optional).
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", padding: "0.875rem", fontSize: "1rem" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting Request..." : "Submit Project Request ($297)"}
        </button>
      </form>
    </div>
  );
}
