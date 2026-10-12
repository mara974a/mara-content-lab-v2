import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Mara Content Lab",
  description:
    "Plain-language privacy policy explaining what information Mara Content Lab collects, how it is used, and how your data is protected.",
};

const policySections = [
  {
    title: "1. Operator & Data Controller",
    content: (
      <p>
        Mara Content Lab (&ldquo;Mara&rdquo;) is operated by <strong>Parth Tiwari</strong>, an independent editor based in India. For any privacy inquiries, data subject requests, or questions regarding this policy, contact{" "}
        <a href="mailto:mara974a@gmail.com" style={{ color: "var(--accent-blue)" }}>
          mara974a@gmail.com
        </a>.
      </p>
    ),
  },
  {
    title: "2. Information We Collect",
    content: (
      <>
        <p>We collect only the information necessary to evaluate and fulfill editorial projects:</p>
        <ul className="legal-list">
          <li><strong>Contact Information:</strong> Name and work email address.</li>
          <li><strong>Professional Context:</strong> Your role, title, company or firm name, and website or LinkedIn URL (if provided).</li>
          <li><strong>Project Inputs:</strong> The source URL (talk, podcast, call, or essay), target audience description, core content goal, and any notes or constraints you submit.</li>
          <li><strong>Client Feedback:</strong> If you submit the feedback form at /feedback, we collect your name, email, ratings (1–5), feedback comments, and whether you explicitly consent to public quotation. Feedback is never published or quoted without your separate, explicit permission.</li>
          <li><strong>Consent Records:</strong> Confirmation of your acceptance of our terms, date and time of submission, and marketing opt-in choice.</li>
          <li><strong>Technical Data:</strong> Basic technical logs (such as IP address, browser type, and operating system) collected automatically by our hosting platform (Vercel) to protect service security and performance.</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. How Information Is Used",
    content: (
      <>
        <p>Your information is used strictly to:</p>
        <ul className="legal-list">
          <li>Review your source material and assess fit for the Source-to-Authority Sprint.</li>
          <li>Communicate regarding scope confirmation, timeline, and private payment details.</li>
          <li>Deliver agreed editorial drafts, outlines, and revision rounds.</li>
          <li>Maintain business records, invoices, and comply with tax and legal requirements.</li>
          <li>Send occasional service updates or sprint opening alerts if you specifically opted in to the waitlist or email updates (you may unsubscribe at any time).</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Service Providers & Third Parties",
    content: (
      <p>
        We do not sell, rent, or trade your personal information. We share data only with trusted third-party infrastructure providers necessary to operate the service, including:
        Vercel (hosting and compute), Supabase (database storage), and payment processors (such as Wise or direct bank transfer) for invoicing and payment collection. Each provider processes data in accordance with their respective security standards.
      </p>
    ),
  },
  {
    title: "5. Cookies & Tracking",
    content: (
      <p>
        Mara Content Lab does not use marketing cookies, tracking pixels, or third-party behavioral advertising scripts. Essential cookies or local session storage may be used solely for security, performance, or form state management.
      </p>
    ),
  },
  {
    title: "6. Data Retention",
    content: (
      <p>
        Project inquiries and source submissions are retained only as long as necessary to review the request, fulfill the agreed project, maintain standard business and tax records, or resolve any inquiries. If a project does not move forward, source materials and private notes are routinely purged upon request.
      </p>
    ),
  },
  {
    title: "7. Your Rights",
    content: (
      <p>
        Regardless of your jurisdiction, you have the right to request access to the personal data we hold about you, request corrections to inaccurate information, or request the deletion of your personal data. To exercise any of these rights, email{" "}
        <a href="mailto:mara974a@gmail.com" style={{ color: "var(--accent-blue)" }}>
          mara974a@gmail.com
        </a>. Requests are handled personally within three business days.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main style={{ backgroundColor: "var(--bg-page)", minHeight: "85vh", padding: "2.5rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
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

          <article className="legal-card">
            <span className="eyebrow">Legal & Compliance</span>
            <h1 className="h1" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", marginBottom: "0.5rem" }}>
              Privacy Policy
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "2rem" }}>
              Last updated: October 2026 · Effective immediately
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {policySections.map((section) => (
                <section key={section.title} className="legal-section">
                  <h2>{section.title}</h2>
                  {section.content}
                </section>
              ))}
            </div>

            <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-subtle)", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
              Mara Content Lab · Operated by Parth Tiwari · Contact: mara974a@gmail.com
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
