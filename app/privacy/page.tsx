const policySections = [
  {
    title: "Operator",
    text: "Mara Content Lab is operated by Parth Tiwari, an independent editor based in India.",
  },
  {
    title: "Information collected",
    text: "Name, email, company/project information if submitted, role, source URL, target audience, content goal, LinkedIn URL if provided, free-text messages, and acknowledgement data. Basic technical data may be collected by hosting, form, and payment providers.",
  },
  {
    title: "How information is used",
    text: "Review requests, communicate about scope, deliver services, process payments, maintain records, and meet legal/tax obligations.",
  },
  {
    title: "Legal bases where applicable",
    text: "Contract/pre-contract steps, legitimate interests in operating the service, and consent where applicable.",
  },
  {
    title: "Service providers",
    text: "Hosting, form/email providers, cloud storage, and payment processors such as Wise may process information as needed to provide their services.",
  },
  {
    title: "No sale of personal data",
    text: "Mara does not sell personal data.",
  },
  {
    title: "International processing",
    text: "Data may be processed in India and other countries where service providers operate. Appropriate safeguards are used where required by applicable law.",
  },
  {
    title: "Retention",
    text: "Keep request/project information only as long as needed for the inquiry, service delivery, recordkeeping, or legal/tax requirements.",
  },
  {
    title: "Rights",
    text: "Visitors may have rights to access, correct, delete, restrict, object to, or receive copies of their personal data, subject to applicable law.",
  },
  {
    title: "Contact",
    text: "mara974a@gmail.com",
  },
];

export default function PrivacyPage() {
  return (
    <main className="legal-shell">
      <div className="legal-topbar">
        <a href="/" className="back-link">
          ← Mara Content Lab
        </a>
      </div>

      <article className="legal-card">
        <p className="eyebrow">Privacy Policy</p>
        <h1>Privacy Policy</h1>
        <p className="legal-meta">Last updated: October 4, 2026</p>

        {policySections.map((section) => (
          <section key={section.title} className="legal-section">
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </section>
        ))}

        <div className="legal-note">
          “This policy is a working service policy and should be reviewed for the
          operator’s specific legal and tax circumstances before being relied on as
          legal advice.”
        </div>
      </article>
    </main>
  );
}
