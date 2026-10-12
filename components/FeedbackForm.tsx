"use client";

import { useState } from "react";
import Link from "next/link";
import { FeedbackInput } from "@/lib/types";

const initialData: FeedbackInput = {
  name: "",
  email: "",
  rating: 5,
  mostUseful: "",
  improve: "",
  postResult: "",
  allowQuote: false,
  displayName: "",
};

type Errors = Partial<Record<keyof FeedbackInput, string>>;

function buildMailtoHref(d: FeedbackInput): string {
  const body = [
    "Feedback for Mara Content Lab",
    "",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Rating (1-5): ${d.rating}`,
    `Most useful: ${d.mostUseful}`,
    `To improve: ${d.improve}`,
    `Post performance: ${d.postResult || "N/A"}`,
    `OK to quote publicly: ${d.allowQuote ? "Yes" : "No"}`,
    `Credit name/role: ${d.displayName || "N/A"}`,
  ].join("\n");

  return `mailto:mara974a@gmail.com?subject=${encodeURIComponent(
    `Sprint Feedback (${d.rating}/5): ${d.name || "Client"}`
  )}&body=${encodeURIComponent(body)}`;
}

export default function FeedbackForm() {
  const [data, setData] = useState<FeedbackInput>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const updateField = (field: keyof FeedbackInput, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const errs: Errors = {};
    if (!data.name.trim()) errs.name = "Your full name is required.";
    if (!data.email.trim()) {
      errs.email = "Your work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = "Please enter a valid work email address.";
    }
    if (!data.rating || data.rating < 1 || data.rating > 5) {
      errs.rating = "Please select a rating between 1 and 5.";
    }
    if (!data.mostUseful.trim()) {
      errs.mostUseful = "Please share what was most useful.";
    }
    if (!data.improve.trim()) {
      errs.improve = "Please share what could be improved.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setServerError("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => null);

      if (res.ok && json?.success) {
        setSubmitted(true);
      } else {
        setServerError(
          json?.message ||
            "Unable to record feedback right now. You can retry below or send your notes directly by email."
        );
      }
    } catch {
      setServerError(
        "Network connection issue: Could not reach the server. You can retry below or send your notes directly by email."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="card" style={{ maxWidth: "680px", margin: "0 auto", padding: "clamp(2rem, 5vw, 3.5rem)", textAlign: "center" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "rgba(4, 120, 87, 0.1)",
            color: "var(--accent-green)",
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "1.25rem",
          }}
        >
          ✓
        </span>
        <span className="eyebrow" style={{ display: "block" }}>Feedback Received</span>
        <h2 className="h2" style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
          Thank you for your feedback.
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "2rem" }}>
          Parth Tiwari reads every response personally. Your feedback directly shapes editorial calibration and future sprint availability.
        </p>
        <Link href="/" className="btn btn-primary">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: "680px", margin: "0 auto", padding: "clamp(1.5rem, 4vw, 2.75rem)" }}>
      <div style={{ marginBottom: "2rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1.25rem" }}>
        <span className="eyebrow" style={{ marginBottom: "0.25rem" }}>
          Sprint Evaluation
        </span>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--text-primary)" }}>
          How did your sprint go?
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.375rem", lineHeight: 1.5 }}>
          Takes ~3 minutes. Honest and critical answers are the most useful. Nothing is published without your explicit permission.
        </p>
      </div>

      {serverError && (
        <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", color: "#991B1B", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>{serverError}</p>
          <a
            href={buildMailtoHref(data)}
            className="btn btn-secondary"
            style={{ display: "inline-block", fontSize: "0.8125rem", padding: "0.375rem 0.75rem", backgroundColor: "#ffffff" }}
          >
            ✉ Send Answers Directly via Email →
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name and Email */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
          <div className="form-group">
            <label htmlFor="fb-name" className="form-label">Full Name *</label>
            <input
              id="fb-name"
              type="text"
              required
              value={data.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="form-input"
              placeholder="e.g. Alex Morgan"
            />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="fb-email" className="form-label">Work Email *</label>
            <input
              id="fb-email"
              type="email"
              required
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="form-input"
              placeholder="alex@company.com"
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>
        </div>

        {/* 1-5 Rating */}
        <div className="form-group" style={{ margin: "1.25rem 0" }}>
          <label className="form-label">Overall, how useful was the sprint? *</label>
          <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            {[1, 2, 3, 4, 5].map((val) => {
              const selected = data.rating === val;
              return (
                <button
                  type="button"
                  key={val}
                  onClick={() => updateField("rating", val)}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-md)",
                    border: selected ? "2px solid var(--accent-blue)" : "1px solid var(--border-medium)",
                    backgroundColor: selected ? "var(--accent-blue)" : "var(--bg-surface)",
                    color: selected ? "#ffffff" : "var(--text-primary)",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {val}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "270px", marginTop: "0.375rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            <span>1 · Not useful</span>
            <span>5 · Very useful</span>
          </div>
          {errors.rating && <p className="form-error">{errors.rating}</p>}
        </div>

        {/* What was most useful */}
        <div className="form-group">
          <label htmlFor="fb-mostUseful" className="form-label">What was most useful? *</label>
          <textarea
            id="fb-mostUseful"
            required
            rows={3}
            value={data.mostUseful}
            onChange={(e) => updateField("mostUseful", e.target.value)}
            className="form-textarea"
            placeholder="e.g. The angle selection, transcript filtering, tone precision..."
          />
          {errors.mostUseful && <p className="form-error">{errors.mostUseful}</p>}
        </div>

        {/* What should be better */}
        <div className="form-group">
          <label htmlFor="fb-improve" className="form-label">What should be better? *</label>
          <textarea
            id="fb-improve"
            required
            rows={3}
            value={data.improve}
            onChange={(e) => updateField("improve", e.target.value)}
            className="form-textarea"
            placeholder="What could have made the process or deliverable significantly stronger?"
          />
          {errors.improve && <p className="form-error">{errors.improve}</p>}
        </div>

        {/* Post performance */}
        <div className="form-group">
          <label htmlFor="fb-postResult" className="form-label">
            How did the post perform for you? <span className="optional">(optional)</span>
          </label>
          <textarea
            id="fb-postResult"
            rows={2}
            value={data.postResult}
            onChange={(e) => updateField("postResult", e.target.value)}
            className="form-textarea"
            placeholder="e.g. Inbound conversation, profile views, comments from buyers..."
          />
        </div>

        {/* Testimonial consent checkbox */}
        <div style={{ margin: "1.5rem 0 1rem 0", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
            <input
              type="checkbox"
              id="fb-allowQuote"
              checked={data.allowQuote}
              onChange={(e) => updateField("allowQuote", e.target.checked)}
              style={{ marginTop: "0.25rem", width: "18px", height: "18px", cursor: "pointer" }}
            />
            <label htmlFor="fb-allowQuote" style={{ fontSize: "0.875rem", color: "var(--text-primary)", lineHeight: 1.5 }}>
              You may quote my feedback publicly as a testimonial. (Optional. Leave unchecked to keep it completely private.)
            </label>
          </div>

          {/* Credit name */}
          {data.allowQuote && (
            <div className="form-group" style={{ marginLeft: "1.75rem", marginTop: "0.25rem" }}>
              <label htmlFor="fb-displayName" className="form-label">
                How should I credit you? <span className="optional">(optional)</span>
              </label>
              <input
                id="fb-displayName"
                type="text"
                value={data.displayName}
                onChange={(e) => updateField("displayName", e.target.value)}
                className="form-input"
                placeholder="e.g. Alex Morgan, VP Growth at Acme Corp"
              />
            </div>
          )}
        </div>

        <div style={{ marginTop: "2rem" }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", padding: "0.875rem" }}
            disabled={submitting}
          >
            {submitting ? "Submitting Feedback..." : "Submit Feedback"}
          </button>
        </div>
      </form>
    </div>
  );
}
