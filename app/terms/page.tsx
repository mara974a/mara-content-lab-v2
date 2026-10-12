import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Mara Content Lab",
  description:
    "Plain-language terms of service covering project scope, timelines, revisions, refund policy, and usage rights for Mara Content Lab.",
};

const termsSections = [
  {
    title: "1. Operator & Service Scope",
    content: (
      <p>
        Mara Content Lab (&ldquo;Mara&rdquo;) is operated by <strong>Parth Tiwari</strong>, an independent editor based in India. Mara provides text-first editorial and ghostwriting services designed to turn substantive source materials into defensible LinkedIn content. The standard offering is the <strong>Source-to-Authority Sprint ($297 USD)</strong>; a <strong>$149 USD first-buy price</strong> is available for a client&rsquo;s first sprint in exchange for completing a short written feedback form after delivery. The sprint includes one LinkedIn authority post, one document-post outline, three future content angles, three hook variations, and one consolidated revision round.
      </p>
    ),
  },
  {
    title: "2. Requests & Project Acceptance",
    content: (
      <p>
        Submitting a project request via this website constitutes an inquiry only. Mara reserves the right to accept or decline requests based on source fit, editorial capacity, and scope feasibility. A binding project agreement is formed only after Mara reviews and approves the source, sends written scope confirmation, and payment is received.
      </p>
    ),
  },
  {
    title: "3. Pricing & Payment Terms",
    content: (
      <p>
        The standard sprint price is $297 USD. A first sprint is offered at $149 USD in exchange for the client completing the short feedback form on this site after delivery; feedback is never published or quoted publicly without the client&rsquo;s separate, explicit permission. All prices are quoted in USD unless agreed otherwise in writing. Because Mara reserves dedicated editorial capacity, full payment is required prior to commencing work. Payments are processed via private invoice/link (such as Wise or direct electronic bank transfer). Any payment processing or international currency conversion fees imposed by your bank are your responsibility.
      </p>
    ),
  },
  {
    title: "4. Client Responsibilities & Source Rights",
    content: (
      <p>
        You represent and warrant that you own or possess all necessary rights, licenses, and permissions to share the source material (talk, interview, call recording, podcast, essay, or notes) submitted for review. You agree not to submit confidential material subject to third-party non-disclosure obligations without appropriate authorization.
      </p>
    ),
  },
  {
    title: "5. Editorial Standards & AI Usage Policy",
    content: (
      <p>
        Mara prioritizes authentic expertise over automated fluff. AI tools may assist with transcript indexing, research structuring, and early variation testing. However, all source verification, angle selection, critical editorial judgment, final polishing, and client communication remain strictly human-led by Parth Tiwari.
      </p>
    ),
  },
  {
    title: "6. Delivery Timeline & Revisions",
    content: (
      <p>
        The delivery turnaround is approximately <strong>five business days</strong> (excluding weekends and statutory holidays) starting from the date that both source approval and full payment have been confirmed. Each sprint includes <strong>one consolidated revision round</strong> to refine tone, phrasing, or emphasis. Additional revision rounds or changes in source material require a separate scope agreement.
      </p>
    ),
  },
  {
    title: "7. Cancellation & Refund Policy",
    content: (
      <>
        <p>Our refund policy is simple, fair, and transparent:</p>
        <ul className="legal-list">
          <li><strong>Before work begins:</strong> 100% full refund upon request.</li>
          <li><strong>If Mara determines a source is not a fit:</strong> If payment was received but Mara determines the source lacks sufficient substance before starting drafting, a 100% full refund is issued immediately.</li>
          <li><strong>After work begins but before first draft delivery:</strong> 50% refund (compensating dedicated research and extraction time).</li>
          <li><strong>After first draft delivery:</strong> No refunds are issued once the completed draft deliverable has been provided.</li>
        </ul>
      </>
    ),
  },
  {
    title: "8. Intellectual Property & Usage Rights",
    content: (
      <p>
        Upon receipt of full payment, you receive exclusive, worldwide rights to use, publish, adapt, and distribute the final approved deliverables for your personal or business brand. Your original source material remains your exclusive property. Mara will not display your draft or name in public case studies without your prior written consent.
      </p>
    ),
  },
  {
    title: "9. No Guarantees on Performance Outcomes",
    content: (
      <p>
        Mara guarantees high editorial rigor, source fidelity, and professional craftsmanship. However, we do not make performance guarantees regarding impressions, viral reach, follower growth, inbound leads, or revenue. Algorithmic distribution and audience reception remain outside our control.
      </p>
    ),
  },
  {
    title: "10. Limitation of Liability & Governing Law",
    content: (
      <p>
        To the maximum extent permitted by applicable law, Mara&rsquo;s total aggregate liability arising out of or related to any project shall not exceed the total fee paid for that specific sprint. These terms are governed by the laws of India, without regard to conflict of law principles.
      </p>
    ),
  },
  {
    title: "11. Contact",
    content: (
      <p>
        Questions regarding these terms may be directed to Parth Tiwari at{" "}
        <a href="mailto:mara974a@gmail.com" style={{ color: "var(--accent-blue)" }}>
          mara974a@gmail.com
        </a>.
      </p>
    ),
  },
];

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "2rem" }}>
              Last updated: October 2026 · Effective immediately
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {termsSections.map((section) => (
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
