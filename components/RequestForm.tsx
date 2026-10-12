"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProjectRequestInput } from "@/lib/types";

export default function RequestForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
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

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full name is required.";
    if (!formData.email.trim()) {
      errs.email = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid work email address.";
    }
    if (!formData.role.trim()) errs.role = "Your role or professional title is required.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.sourceUrl.trim()) errs.sourceUrl = "Source URL (talk, podcast, doc, or essay) is required.";
    if (!formData.audience.trim()) errs.audience = "Target audience definition is required.";
    if (!formData.goal.trim()) errs.goal = "Content goal or core point of view is required.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consentTerms) {
      setErrors({ consentTerms: "You must accept the terms and manual review process to submit." });
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
        window.location.href = "/thank-you";
      } else {
        setServerError(
          data?.message ||
          "Unable to record your project request at this moment. You can retry below, or send your details directly via email."
        );
        setIsSubmitting(false);
      }
    } catch (err: any) {
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
      {/* Stepper Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1.25rem" }}>
        <div>
          <span className="eyebrow" style={{ marginBottom: "0.25rem" }}>
            Step {step} of 3
          </span>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>
            {step === 1 && "Contact & Context"}
            {step === 2 && "Source & Scope"}
            {step === 3 && "Review & Confirmation"}
          </h2>
        </div>
        <div style={{ display: "flex", gap: "0.375rem" }}>
          <span style={{ width: "28px", height: "4px", borderRadius: "2px", background: step >= 1 ? "var(--accent-blue)" : "var(--border-medium)" }} />
          <span style={{ width: "28px", height: "4px", borderRadius: "2px", background: step >= 2 ? "var(--accent-blue)" : "var(--border-medium)" }} />
          <span style={{ width: "28px", height: "4px", borderRadius: "2px", background: step >= 3 ? "var(--accent-blue)" : "var(--border-medium)" }} />
        </div>
      </div>

      {serverError && (
        <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", color: "#991B1B", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
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

      {/* STEP 1: CONTACT */}
      {step === 1 && (
        <form onSubmit={handleNext} noValidate>
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

          <div className="form-group">
            <label htmlFor="role" className="form-label">Your Role / Title *</label>
            <input
              id="role"
              type="text"
              required
              value={formData.role}
              onChange={(e) => updateField("role", e.target.value)}
              className="form-input"
              placeholder="e.g. Founder, Partner, B2B Consultant"
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
                placeholder="e.g. Morgan Strategy Group"
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
                placeholder="e.g. linkedin.com/in/alex or website"
              />
            </div>
          </div>

          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn btn-primary">
              Continue to Source & Scope →
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: SOURCE & SCOPE */}
      {step === 2 && (
        <form onSubmit={handleNext} noValidate>
          <div className="form-group">
            <label htmlFor="sourceUrl" className="form-label">Source URL *</label>
            <input
              id="sourceUrl"
              type="text"
              required
              value={formData.sourceUrl}
              onChange={(e) => updateField("sourceUrl", e.target.value)}
              className="form-input"
              placeholder="e.g. youtube.com/watch?... or podcast / essay / doc link"
            />
            <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "block" }}>
              Link to your talk, interview transcript, podcast episode, or long-form essay.
            </span>
            {errors.sourceUrl && <p className="form-error">{errors.sourceUrl}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="audience" className="form-label">Who is your target audience? *</label>
            <input
              id="audience"
              type="text"
              required
              value={formData.audience}
              onChange={(e) => updateField("audience", e.target.value)}
              className="form-input"
              placeholder="e.g. B2B SaaS Chief Revenue Officers, Supply chain directors"
            />
            {errors.audience && <p className="form-error">{errors.audience}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="goal" className="form-label">What is the core point of view or outcome? *</label>
            <textarea
              id="goal"
              required
              rows={3}
              value={formData.goal}
              onChange={(e) => updateField("goal", e.target.value)}
              className="form-textarea"
              placeholder="What specific truth or thesis in this source should your reader understand?"
            />
            {errors.goal && <p className="form-error">{errors.goal}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="notes" className="form-label">Additional Notes or Context <span className="optional">(optional)</span></label>
            <textarea
              id="notes"
              rows={2}
              value={formData.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              className="form-textarea"
              placeholder="Any specific constraints, tone preferences, or background details."
            />
          </div>

          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button type="button" onClick={() => setStep(1)} className="btn btn-secondary">
              ← Back
            </button>
            <button type="submit" className="btn btn-primary">
              Review Project Request →
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: REVIEW & CONFIRMATION */}
      {step === 3 && (
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "1.25rem", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.875rem" }}>
            <div>
              <strong style={{ color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>Requester</strong>
              <p style={{ fontWeight: 600, color: "var(--text-primary)" }}>{formData.name} ({formData.role}{formData.company ? ` at ${formData.company}` : ""})</p>
              <p style={{ color: "var(--text-secondary)" }}>{formData.email}</p>
            </div>

            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "0.5rem" }}>
              <strong style={{ color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>Source Material</strong>
              <p style={{ color: "var(--accent-blue)", wordBreak: "break-all" }}>{formData.sourceUrl}</p>
            </div>

            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "0.5rem" }}>
              <strong style={{ color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>Target Audience & Goal</strong>
              <p style={{ color: "var(--text-primary)" }}><strong>Audience:</strong> {formData.audience}</p>
              <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}><strong>Goal:</strong> {formData.goal}</p>
            </div>

            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "0.5rem" }}>
              <strong style={{ color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>Engagement Terms</strong>
              <p style={{ color: "var(--text-primary)", fontWeight: 600 }}>Source-to-Authority Sprint · $149 USD first buy ($297 standard)</p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>~5 business days turnaround once approved and paid · First buy includes short feedback exchange</p>
            </div>
          </div>

          {/* Consent Checkboxes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
              <input
                type="checkbox"
                id="consentTerms"
                checked={formData.consentTerms}
                onChange={(e) => updateField("consentTerms", e.target.checked)}
                style={{ marginTop: "0.25rem", width: "18px", height: "18px", cursor: "pointer" }}
              />
              <label htmlFor="consentTerms" style={{ fontSize: "0.875rem", color: "var(--text-primary)", lineHeight: 1.5 }}>
                I understand that this is a project inquiry. Mara reviews every source manually. If approved, I will receive scope confirmation and a private payment link. I agree to the{" "}
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

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button type="button" onClick={() => setStep(2)} className="btn btn-secondary" disabled={isSubmitting}>
              ← Back
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Submitting Request..." : "Submit Project Request ($149 First Buy)"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
