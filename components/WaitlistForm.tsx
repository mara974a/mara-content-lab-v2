"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid work email address.");
      return;
    }

    if (!consent) {
      setStatus("error");
      setMessage("Please check the consent box below to receive sprint updates.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), consent }),
      });

      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setStatus("success");
        setMessage("You're on the list. We will notify you when sprint availability opens.");
        setEmail("");
        setConsent(false);
      } else {
        setStatus("error");
        setMessage(data?.message || "Failed to join waitlist. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Connection issue: Could not reach the server. Please try again or email mara974a@gmail.com directly.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="waitlist-box" aria-label="Join sprint waitlist">
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "flex-start" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="your.email@company.com"
          required
          aria-label="Your work email address"
          className="form-input"
          style={{ flex: "1 1 240px", minHeight: "46px" }}
          disabled={status === "loading" || status === "success"}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "loading" || status === "success"}
          style={{ flexShrink: 0 }}
        >
          {status === "loading" ? "Joining..." : "Join Sprint Waitlist"}
        </button>
      </div>

      <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
        <input
          type="checkbox"
          id="waitlist-consent"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (status === "error") setStatus("idle");
          }}
          style={{ marginTop: "0.2rem", width: "16px", height: "16px", cursor: "pointer" }}
        />
        <label htmlFor="waitlist-consent" style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
          I agree to receive occasional editorial updates and sprint openings from Mara Content Lab. Unsubscribe at any time.
        </label>
      </div>

      {status === "error" && (
        <p className="form-error" role="alert" style={{ marginTop: "0.5rem" }}>
          {message}
        </p>
      )}
      {status === "success" && (
        <p style={{ color: "var(--accent-green)", fontSize: "0.875rem", fontWeight: 600, marginTop: "0.5rem" }} role="status">
          ✓ {message}
        </p>
      )}
    </form>
  );
}
