import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedbackForm from "@/components/FeedbackForm";

export const metadata: Metadata = {
  title: "Share Feedback | Mara Content Lab",
  description:
    "Tell Mara Content Lab how your sprint went. Feedback is never published without your explicit permission.",
};

export default function FeedbackPage() {
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

          <div style={{ maxWidth: "680px", margin: "0 auto 2.5rem auto", textAlign: "center" }}>
            <span className="eyebrow">Client Evaluation</span>
            <h1 className="h1" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>
              Sprint Feedback
            </h1>
            <p className="lead" style={{ margin: "0 auto 1.5rem auto" }}>
              Help calibrate Mara Content Lab. Honest critique and specifics are the most valuable.
            </p>
          </div>

          <FeedbackForm />
        </div>
      </main>

      <Footer />
    </>
  );
}
