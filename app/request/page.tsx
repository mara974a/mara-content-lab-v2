import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequestForm from "@/components/RequestForm";

export const metadata: Metadata = {
  title: "Request a Sprint ($297) | Mara Content Lab",
  description:
    "Submit your raw talk, podcast, interview, or essay for the Source-to-Authority Sprint. Reviewed personally within one business day.",
};

export default function RequestPage() {
  return (
    <>
      <Header />

      <main style={{ backgroundColor: "var(--bg-page)", minHeight: "80vh", paddingBottom: "5rem" }}>
        <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "1.5rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              fontWeight: 500,
            }}
          >
            ← Back to Mara Content Lab
          </Link>

          <div style={{ maxWidth: "720px", margin: "0 auto 2.5rem auto", textAlign: "center" }}>
            <span className="eyebrow">Project Application</span>
            <h1 className="h1" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>
              Request a Source-to-Authority Sprint
            </h1>
            <p className="lead" style={{ margin: "0 auto 1.5rem auto" }}>
              Share your source, target audience, and content goals. Every request is reviewed manually by Parth Tiwari within one business day.
            </p>

            {/* Micro Process Checklist */}
            <div
              style={{
                display: "inline-flex",
                gap: "1.5rem",
                flexWrap: "wrap",
                justifyContent: "center",
                padding: "0.75rem 1.25rem",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
              }}
            >
              <span><strong>1.</strong> Manual Fit Review</span>
              <span><strong>2.</strong> Scope & Payment Link</span>
              <span><strong>3.</strong> 5-Day Delivery</span>
            </div>
          </div>

          <RequestForm />
        </div>
      </main>

      <Footer />
    </>
  );
}
