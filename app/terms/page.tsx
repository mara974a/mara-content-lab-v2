const termsSections = [
  {
    title: "Operator and scope",
    text: "Mara Content Lab is operated by Parth Tiwari, an independent editor based in India.",
  },
  {
    title: "Service",
    text: "Source-grounded editorial work as described in confirmed project scope.",
  },
  {
    title: "Requests and acceptance",
    text: "A website request is an inquiry only. Mara may accept or decline requests. Work begins after source/scope approval and payment confirmation.",
  },
  {
    title: "Payment",
    text: "Prices are in USD unless stated otherwise. Payment is required before work begins through the method provided privately after fit review. Any bank or processor fees are the payer’s responsibility unless agreed otherwise.",
  },
  {
    title: "Client responsibilities",
    text: "Clients must provide accurate, complete, and legally shareable source material and represent that they have the right to share it.",
  },
  {
    title: "AI and editorial process",
    text: "AI may assist research, transcript analysis, and early drafting. Human editorial judgment, fact checking, final edits, and delivery remain human-led.",
  },
  {
    title: "Delivery and revision",
    text: "Delivery is within five business days after source, scope, and payment are confirmed. One consolidated revision round is included. Extra work or scope changes require separate agreement.",
  },
  {
    title: "Cancellation and refund",
    text: "- Before work begins: full refund.\n- After work begins but before first draft delivery: 50% refund.\n- After first draft delivery: no refund.\n- If Mara determines a source is not a fit after payment but before work begins: full refund.",
  },
  {
    title: "Usage rights",
    text: "After full payment, the client may use final approved deliverables for their professional/business content. Client source materials remain the client’s or original rights holder’s property. Mara may only use final work in a portfolio or case study with written permission from the client.",
  },
  {
    title: "No guarantees",
    text: "Mara does not guarantee audience growth, reach, engagement, leads, revenue, sales, hiring outcomes, or any other business result.",
  },
  {
    title: "Limitation of liability",
    text: "To the extent permitted by law, liability is limited to the amount paid for the relevant service and excludes indirect or consequential losses.",
  },
  {
    title: "Governing law",
    text: "These terms are governed by Indian law, subject to any mandatory consumer or local legal protections that apply.",
  },
  {
    title: "Contact",
    text: "mara974a@gmail.com",
  },
];

export default function TermsPage() {
  return (
    <main className="legal-shell">
      <div className="legal-topbar">
        <a href="/" className="back-link">
          ← Mara Content Lab
        </a>
      </div>

      <article className="legal-card">
        <p className="eyebrow">Terms of Service</p>
        <h1>Terms of Service</h1>
        <p className="legal-meta">Last updated: October 4, 2026</p>

        {termsSections.map((section) => (
          <section key={section.title} className="legal-section">
            <h2>{section.title}</h2>
            {section.title === "Cancellation and refund" ? (
              <ul className="legal-list">
                <li>Before work begins: full refund.</li>
                <li>After work begins but before first draft delivery: 50% refund.</li>
                <li>After first draft delivery: no refund.</li>
                <li>If Mara determines a source is not a fit after payment but before work begins: full refund.</li>
              </ul>
            ) : (
              <p>{section.text}</p>
            )}
          </section>
        ))}

        <div className="legal-note">
          “These terms are a working service policy and should be reviewed for the
          operator’s individual legal and business situation before being treated as
          legal advice.”
        </div>
      </article>
    </main>
  );
}
