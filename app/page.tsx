"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";

const processSteps = [
  {
    number: "01",
    title: "Source Review",
    description: "Your raw talk, interview transcript, podcast, or essay is reviewed for a real, defensible idea.",
  },
  {
    number: "02",
    title: "Evidence Selection",
    description: "Specific moments, firsthand claims, and supporting context are extracted from the source.",
  },
  {
    number: "03",
    title: "Angle Choice",
    description: "One focused, high-leverage point of view is isolated for your specific B2B audience.",
  },
  {
    number: "04",
    title: "Drafting",
    description: "The idea is structured into an authoritative text-first LinkedIn post and supporting outline.",
  },
  {
    number: "05",
    title: "Human Review & Delivery",
    description: "Accuracy, tone, and practical usefulness are verified line-by-line before delivery.",
  },
];

const faqs = [
  {
    question: "What kinds of sources work best?",
    answer:
      "Substantive talks, podcast interviews, client strategy calls, long-form essays, or rough founder notes work best. The only prerequisite is that the source contains genuine, firsthand knowledge rather than generic opinions.",
  },
  {
    question: "What happens after I submit a project request?",
    answer:
      "Every submission is reviewed personally by Parth Tiwari within one business day. If your source is a fit, you will receive scope confirmation and private payment details. Work begins only after source approval and payment are confirmed.",
  },
  {
    question: "What is the $149 first-buy price and what do I give in return?",
    answer:
      "Your first sprint is $149 USD instead of the standard $297 USD. In exchange, you fill in a short feedback form after delivery: what was useful, what could be improved, and how the post performed for you if you choose to share that. A testimonial is completely optional and is only used if you explicitly grant permission.",
  },
  {
    question: "Does the five-business-day timeline include weekends?",
    answer:
      "No. The timeline is five business days starting from the date that your source, project scope, and payment are confirmed.",
  },
  {
    question: "What if my source is not a fit?",
    answer:
      "If Mara reviews your source and determines that it does not have enough defensible substance to produce an authoritative deliverable, we will politely decline or suggest a better source. If payment was received prior to source assessment, a 100% full refund is issued immediately.",
  },
  {
    question: "What is included in the revision round?",
    answer:
      "One consolidated revision round is included. After you review the draft, you can send consolidated feedback, and the draft will be refined to ensure it matches your exact tone and precision.",
  },
  {
    question: "Do you design LinkedIn carousels, Canva graphics, or video clips?",
    answer:
      "No. Mara is a pure text-first editorial service. We deliver high-signal copy and structured outline documents. We do not do graphic design, carousel slides, video editing, or scheduling.",
  },
  {
    question: "Do you use AI in your process?",
    answer:
      "AI may assist with raw transcription processing, research indexing, and early structural variations. However, fact verification, angle selection, editorial judgment, final polishing, and client delivery remain strictly human-led and human-accountable.",
  },
  {
    question: "Do you guarantee reach, impressions, leads, or sales?",
    answer:
      "No. There are no performance guarantees for impressions, reach, leads, or business revenue. Mara guarantees editorial precision, source fidelity, and high-standard writing.",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Header />

      <main id="main-content">
        {/* ===================================================================
            SECTION 1: HERO / SIGNAL
           =================================================================== */}
        <section className="section" style={{ paddingTop: "clamp(3.5rem, 7vw, 6rem)", backgroundColor: "var(--bg-page)" }}>
          <div className="container" style={{ maxWidth: "880px", textAlign: "center" }}>
            <span className="eyebrow">Source-Grounded Editorial Studio</span>
            <h1 className="h1">
              Find the signal.<br />Turn it into authority.
            </h1>
            <p className="lead" style={{ margin: "0 auto 2.25rem auto" }}>
              Mara turns talks, interviews, podcasts, and essays into source-grounded LinkedIn content for independent B2B founders, operators, and consultants.
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
              <Link href="/request" className="btn btn-primary">
                Request a Sprint — $149 First Buy
              </Link>
              <a href="#sample" className="btn btn-secondary">
                See Editorial Standard ↓
              </a>
            </div>

            {/* Value Highlights Bar */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1.25rem",
                padding: "1.25rem",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                textAlign: "left",
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase" }}>Deliverable</span>
                <p style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)" }}>1 Post + 1 Outline Doc</p>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase" }}>Turnaround</span>
                <p style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)" }}>~5 Business Days</p>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase" }}>Fixed Pricing</span>
                <p style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)" }}>
                  $149 USD <span style={{ textDecoration: "line-through", color: "var(--text-muted)", fontWeight: 400 }}>$297</span>
                </p>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>First-buy price with feedback</span>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase" }}>Review Model</span>
                <p style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)" }}>100% Human Editorial Review</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 2: PROBLEM / NOISE
           =================================================================== */}
        <section id="problem" className="section" style={{ backgroundColor: "var(--bg-surface)" }}>
          <div className="container">
            <div className="section-header" style={{ maxWidth: "720px" }}>
              <span className="eyebrow">The Content Problem</span>
              <h2 className="h2">Good ideas rarely arrive as finished posts.</h2>
              <p className="lead">
                They live inside a 40-minute podcast conversation, an unpolished conference talk, a founder strategy call, or a dense private essay.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              <div className="card" style={{ borderLeft: "4px solid var(--accent-blue)" }}>
                <h3 className="h3" style={{ marginBottom: "0.5rem" }}>Raw thought holds authority</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                  You already have the expertise. You’ve tested it with real clients and built deep, nuanced points of view. But you lack the 6 hours required to distill it into written clarity.
                </p>
              </div>

              <div className="card" style={{ borderLeft: "4px solid #DC2626" }}>
                <h3 className="h3" style={{ marginBottom: "0.5rem" }}>Generic AI summaries ruin credibility</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                  Dumping a transcript into ChatGPT flattens the nuances, invents trite listicles, and uses hollow buzzwords that make you sound like an amateur to the buyers who matter.
                </p>
              </div>

              <div className="card" style={{ borderLeft: "4px solid var(--accent-green)" }}>
                <h3 className="h3" style={{ marginBottom: "0.5rem" }}>The Mara standard: Source-grounded</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                  We find the single most defensible insight in your source, preserve your real voice, and craft content that establishes durable professional authority.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: OFFER / SPRINT ($297)
           =================================================================== */}
        <section id="offer" className="section" style={{ backgroundColor: "var(--bg-page)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="eyebrow">Core Offer</span>
              <h2 className="h2">Source-to-Authority Sprint</h2>
              <p className="lead" style={{ margin: "0 auto" }}>
                One substantive source. One clear editorial outcome. Fixed price, clear turnaround, zero scope creep.
              </p>
            </div>

            <div className="card" style={{ maxWidth: "860px", margin: "0 auto", padding: "clamp(2rem, 5vw, 3rem)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent-blue)", display: "block", marginBottom: "0.25rem" }}>First-Buy Price</span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.625rem" }}>
                    <h3 style={{ fontSize: "1.75rem", fontWeight: 700 }}>$149 USD</h3>
                    <span style={{ fontSize: "1.25rem", color: "var(--text-muted)", textDecoration: "line-through", fontWeight: 500 }}>$297</span>
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.25rem" }}>Standard price $297 afterwards · ~5 business days delivery</p>
                </div>
                <Link href="/request" className="btn btn-primary">
                  Request This Sprint ($149) →
                </Link>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem" }}>
                {/* Included */}
                <div>
                  <h4 style={{ fontSize: "0.875rem", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent-blue)", marginBottom: "1rem" }}>
                    ✓ What is included
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9375rem", color: "var(--text-primary)" }}>
                    <li style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{ color: "var(--accent-green)", fontWeight: 700 }}>✓</span>
                      <span><strong>1 LinkedIn authority post</strong> (180–250 words, text-first)</span>
                    </li>
                    <li style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{ color: "var(--accent-green)", fontWeight: 700 }}>✓</span>
                      <span><strong>1 document-post outline</strong> with 4–6 structured sections</span>
                    </li>
                    <li style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{ color: "var(--accent-green)", fontWeight: 700 }}>✓</span>
                      <span><strong>3 future content angles</strong> extracted from your source</span>
                    </li>
                    <li style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{ color: "var(--accent-green)", fontWeight: 700 }}>✓</span>
                      <span><strong>3 hook variations</strong> tailored to your target audience</span>
                    </li>
                    <li style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{ color: "var(--accent-green)", fontWeight: 700 }}>✓</span>
                      <span><strong>1 consolidated revision round</strong> for tone calibration</span>
                    </li>
                  </ul>
                </div>

                {/* Not Included */}
                <div>
                  <h4 style={{ fontSize: "0.875rem", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "1rem" }}>
                    ✕ What is not included
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9375rem", color: "var(--text-secondary)" }}>
                    <li style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{ color: "var(--text-muted)" }}>—</span>
                      <span>Video editing, clips, or podcast cuts</span>
                    </li>
                    <li style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{ color: "var(--text-muted)" }}>—</span>
                      <span>Graphic design, Canva templates, or carousels</span>
                    </li>
                    <li style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{ color: "var(--text-muted)" }}>—</span>
                      <span>Publishing, account management, or scheduling</span>
                    </li>
                    <li style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{ color: "var(--text-muted)" }}>—</span>
                      <span>Unlimited revisions or transcript rewriting</span>
                    </li>
                    <li style={{ display: "flex", gap: "0.5rem" }}>
                      <span style={{ color: "var(--text-muted)" }}>—</span>
                      <span>Guaranteed reach, follower growth, or sales leads</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-subtle)", fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                <p>
                  <strong>First-Buy Offer:</strong> Your first sprint is <strong>$149 USD</strong> (standard $297 USD) in exchange for completing a short <Link href="/feedback" style={{ color: "var(--accent-blue)", textDecoration: "underline" }}>feedback form</Link> after delivery. Your feedback is never published without your explicit permission. Standard price afterwards: $297 USD.
                </p>
                <p style={{ marginTop: "0.5rem" }}>
                  <strong>Payment & Safety:</strong> Every request is reviewed personally. If the source is approved as a fit, you will receive scope confirmation and private payment details. Work begins only after mutual approval and payment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 4: PROCESS (5 STEPS)
           =================================================================== */}
        <section id="process" className="section" style={{ backgroundColor: "var(--bg-surface)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="eyebrow">The Editorial Process</span>
              <h2 className="h2">From raw thought to published authority</h2>
              <p className="lead" style={{ margin: "0 auto" }}>
                A strict five-phase extraction process designed to protect accuracy and produce defensible content.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
              {processSteps.map((step) => (
                <div key={step.number} className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.5rem", fontWeight: 700, color: "var(--accent-blue)", marginBottom: "0.75rem" }}>
                    {step.number}
                  </span>
                  <h3 className="h3" style={{ marginBottom: "0.5rem" }}>{step.title}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6, marginTop: "auto" }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 5: HUMAN ACCOUNTABILITY
           =================================================================== */}
        <section className="section-tight" style={{ backgroundColor: "var(--bg-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="container" style={{ maxWidth: "780px", textAlign: "center" }}>
            <span className="eyebrow">Human Accountability</span>
            <h2 className="h2" style={{ fontSize: "1.875rem" }}>
              AI can assist with indexing. It cannot choose the angle.
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.7, margin: "1rem auto 0 auto" }}>
              AI may help summarize transcripts or explore candidate structures. But source accuracy, nuance, editorial judgment, final edits, and client-facing delivery remain 100% human-led and human-accountable.
            </p>
          </div>
        </section>

        {/* ===================================================================
            SECTION 6: EDITORIAL STANDARD (VERIFIED SAMPLE)
           =================================================================== */}
        <section id="sample" className="section" style={{ backgroundColor: "var(--bg-surface)" }}>
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">Editorial Benchmark</span>
              <h2 className="h2">The Editorial Standard: Real Source Breakdown</h2>
              <p className="lead">
                An uncommissioned demonstration showing how Mara turns a substantive source into defensible B2B content.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
              {/* Left Column: Source & Selection */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div className="card">
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Source Material</span>
                  <h3 className="h3" style={{ margin: "0.25rem 0 0.5rem 0" }}>The Power of the Marginal</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    Essay by Paul Graham (June 2006) · Derived from Usenix & RailsConf talks
                  </p>
                  <a
                    href="https://paulgraham.com/marginal.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-block", fontSize: "0.8125rem", color: "var(--accent-blue)", marginTop: "0.75rem", fontWeight: 500 }}
                  >
                    View Original Essay ↗
                  </a>
                </div>

                <div className="card">
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Evidence Selected</span>
                  <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", marginTop: "0.5rem", lineHeight: 1.6 }}>
                    Graham’s core observation: great things emerge from the margins not because outsiders are geniuses, but because they have the freedom to tackle small, unglamorous problems that insiders dismiss as “undignified” or too trivial to notice.
                  </p>
                </div>

                <div className="card">
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Editorial Angle</span>
                  <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", marginTop: "0.5rem", lineHeight: 1.6 }}>
                    Framing for B2B founders and operators: stop chasing flashy vanity milestones; your real competitive advantage comes from mastering the small, quiet details your competitors are too proud to touch.
                  </p>
                </div>
              </div>

              {/* Right Column: The Finished Draft */}
              <div className="card" style={{ backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border-medium)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.75rem", marginBottom: "1.25rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", fontWeight: 600, color: "var(--accent-blue)" }}>
                    DELIVERABLE 01 // TEXT-FIRST LINKEDIN DRAFT
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    218 WORDS
                  </span>
                </div>

                <div style={{ fontSize: "0.9375rem", color: "var(--text-primary)", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <p>
                    Most teams chase the obvious lever: the launch, the campaign, the product feature, the external signal. But the real edge often sits in the margins — in the small, neglected choices that no one else notices until they start to compound.
                  </p>
                  <p>
                    That is the quiet advantage Paul Graham points to. The work that is not glamorous is often the work with the most durable effect. A slightly clearer sentence, a tighter definition, a better constraint, a more precise decision: these do not look dramatic in isolation, but over time they shape what a team actually becomes.
                  </p>
                  <p>
                    A founder who understands this does not try to sound impressive everywhere. They choose what to exclude, what to refine, and what to hold true. That is not a trick. It is the difference between reacting to noise and building an actual point of view.
                  </p>
                </div>

                <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)" }}>
                    Why this outperforms a generic summary:
                  </span>
                  <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", marginTop: "0.5rem", fontSize: "0.8125rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <li>Extracts one defensible idea instead of a generic recap</li>
                    <li>Gives a defined B2B audience a practical mental model</li>
                    <li>Preserves nuance without buzzwords or hollow certainty</li>
                    <li>Reads like a seasoned practitioner, not an AI prompt</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 7: FIT (WHO THIS IS FOR / NOT FOR)
           =================================================================== */}
        <section id="fit" className="section" style={{ backgroundColor: "var(--bg-page)" }}>
          <div className="container">
            <div className="section-header centered">
              <span className="eyebrow">Mutual Selection</span>
              <h2 className="h2">Clear fit protects editorial quality</h2>
              <p className="lead" style={{ margin: "0 auto" }}>
                We vet every request before accepting work. We only take on projects where we can deliver high-caliber results.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", maxWidth: "920px", margin: "0 auto" }}>
              <div className="card" style={{ borderTop: "4px solid var(--accent-green)" }}>
                <h3 className="h3" style={{ color: "var(--accent-green)", marginBottom: "1rem" }}>✓ Good Fit</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.875rem", fontSize: "0.9375rem" }}>
                  <li style={{ display: "flex", gap: "0.5rem" }}>
                    <span>•</span>
                    <span>You have substantive source material (recorded talk, interview, client call, podcast, or long-form notes).</span>
                  </li>
                  <li style={{ display: "flex", gap: "0.5rem" }}>
                    <span>•</span>
                    <span>You sell high-ticket B2B expertise and need your content to command intellectual respect.</span>
                  </li>
                  <li style={{ display: "flex", gap: "0.5rem" }}>
                    <span>•</span>
                    <span>You want one precise, high-leverage idea developed thoroughly rather than 20 daily fluff posts.</span>
                  </li>
                  <li style={{ display: "flex", gap: "0.5rem" }}>
                    <span>•</span>
                    <span>You value source fidelity, accurate attribution, and disciplined writing.</span>
                  </li>
                </ul>
              </div>

              <div className="card" style={{ borderTop: "4px solid var(--text-muted)" }}>
                <h3 className="h3" style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>✕ Not a Fit</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.875rem", fontSize: "0.9375rem", color: "var(--text-secondary)" }}>
                  <li style={{ display: "flex", gap: "0.5rem" }}>
                    <span>•</span>
                    <span>You need high-volume, generic AI-generated filler to post every day.</span>
                  </li>
                  <li style={{ display: "flex", gap: "0.5rem" }}>
                    <span>•</span>
                    <span>You need full agency account management, comment reply monitoring, or outreach DMs.</span>
                  </li>
                  <li style={{ display: "flex", gap: "0.5rem" }}>
                    <span>•</span>
                    <span>You need video editing, TikTok reels, Canva templates, or carousel design.</span>
                  </li>
                  <li style={{ display: "flex", gap: "0.5rem" }}>
                    <span>•</span>
                    <span>You expect guaranteed impressions, virality, or instant inbound sales leads.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 8: ABOUT (PARTH TIWARI)
           =================================================================== */}
        <section id="about" className="section" style={{ backgroundColor: "var(--bg-surface)" }}>
          <div className="container" style={{ maxWidth: "860px" }}>
            <div className="card" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2.5rem", alignItems: "center" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: "260px", margin: "0 auto" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/media/parth-headshot.jpg"
                  alt="Parth Tiwari, Founder and Editor at Mara Content Lab"
                  width={260}
                  height={347}
                  loading="eager"
                  style={{
                    borderRadius: "var(--radius-md)",
                    objectFit: "cover",
                    boxShadow: "var(--shadow-md)",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>

              <div>
                <span className="eyebrow">About the Editor</span>
                <h2 className="h2" style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Parth Tiwari</h2>
                <p style={{ color: "var(--accent-blue)", fontWeight: 500, fontSize: "0.9375rem", marginBottom: "1rem" }}>
                  Independent editor & founder based in India
                </p>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                  “I built Mara because founders’ strongest thinking often gets flattened into generic AI summaries. When someone spends real time explaining what they know, the useful work is not summarizing every point. It is finding the one idea worth carrying forward, grounding it in the source, and giving it a clear shape for the right reader.”
                </p>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", marginTop: "1.25rem" }}>
                  <a
                    href="https://www.linkedin.com/in/parth-tiwari-988971386"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ fontSize: "0.875rem", padding: "0.5rem 1rem", minHeight: "38px" }}
                  >
                    Connect on LinkedIn ↗
                  </a>
                  <a
                    href="mailto:mara974a@gmail.com"
                    style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}
                  >
                    mara974a@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 9: FAQ
           =================================================================== */}
        <section id="faq" className="section" style={{ backgroundColor: "var(--bg-page)" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div className="section-header centered">
              <span className="eyebrow">Frequently Asked Questions</span>
              <h2 className="h2">Everything you need to know</h2>
              <p className="lead" style={{ margin: "0 auto" }}>
                Clear answers regarding sources, timelines, deliverables, and payment.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.question} className="card" style={{ padding: "1.25rem 1.5rem" }}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                        gap: "1rem",
                      }}
                      aria-expanded={isOpen}
                    >
                      <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>
                        {faq.question}
                      </span>
                      <span style={{ fontSize: "1.25rem", color: "var(--text-muted)", flexShrink: 0 }}>
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <p style={{ marginTop: "0.75rem", color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 10: FINAL CTA & WAITLIST
           =================================================================== */}
        <section className="section" style={{ backgroundColor: "var(--bg-surface)", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "760px" }}>
            <span className="eyebrow">Get Started</span>
            <h2 className="h2">Ready to turn your raw source into defensible authority?</h2>
            <p className="lead" style={{ margin: "0 auto 2rem auto" }}>
              Submit your source and project goals. Every request is manually reviewed. If it’s a fit, you’ll receive private scope confirmation within one business day.
            </p>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
              <Link href="/request" className="btn btn-primary" style={{ padding: "0.875rem 2rem", fontSize: "1rem" }}>
                Request a Project — $149 First Buy
              </Link>
            </div>

            {/* Waitlist Box */}
            <div style={{ paddingTop: "2.5rem", borderTop: "1px solid var(--border-subtle)", maxWidth: "560px", margin: "0 auto" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                Not ready yet? Join the sprint waitlist
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                Receive occasional editorial insights and priority notifications when sprint spots open.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
