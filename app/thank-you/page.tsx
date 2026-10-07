import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Request Received | Mara Content Lab",
  description:
    "Your project request has been received. Parth Tiwari will review your source and reply within one business day.",
};

export default function ThankYouPage() {
  return (
    <>
      <Header />

      <main style={{ backgroundColor: "var(--bg-page)", minHeight: "80vh", padding: "4rem 0 6rem" }}>
        <div className="container" style={{ maxWidth: "680px", textAlign: "center" }}>
          <div className="card" style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}>
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

            <span className="eyebrow" style={{ display: "block" }}>Inquiry Logged</span>
            <h1 className="h1" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", marginBottom: "1rem" }}>
              Your project request has been received.
            </h1>
            <p className="lead" style={{ fontSize: "1rem", margin: "0 auto 1.75rem auto" }}>
              Parth Tiwari will personally review your source material and reply within one business day.
            </p>

            <div
              style={{
                textAlign: "left",
                backgroundColor: "var(--bg-subtle)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                marginBottom: "2rem",
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <span style={{ fontWeight: 700, color: "var(--accent-blue)" }}>1.</span>
                <span><strong>Source Assessment:</strong> We verify that the source has enough depth and defensible ideas to build an authoritative deliverable.</span>
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <span style={{ fontWeight: 700, color: "var(--accent-blue)" }}>2.</span>
                <span><strong>Scope & Payment:</strong> If it’s a fit, you’ll receive an email with confirmed scope details and a private payment link.</span>
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <span style={{ fontWeight: 700, color: "var(--accent-blue)" }}>3.</span>
                <span><strong>5-Day Delivery:</strong> Work begins immediately upon payment confirmation and is delivered within five business days.</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/" className="btn btn-primary">
                Return to Homepage
              </Link>
              <a
                href="https://www.linkedin.com/in/parth-tiwari-988971386"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Connect with Parth on LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
