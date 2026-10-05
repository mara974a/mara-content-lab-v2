"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const processSteps = [
  {
    number: "01",
    title: "Source review",
    description: "A substantive source is reviewed for a real, defensible idea.",
  },
  {
    number: "02",
    title: "Evidence selection",
    description: "Specific moments, claims, and supporting context are selected.",
  },
  {
    number: "03",
    title: "Angle choice",
    description: "One focused idea is chosen for a defined reader.",
  },
  {
    number: "04",
    title: "Drafting",
    description: "The idea becomes a text-first LinkedIn post and supporting outline.",
  },
  {
    number: "05",
    title: "Human review and delivery",
    description: "Accuracy, voice, and usefulness are checked before delivery.",
  },
];

const faqs = [
  {
    question: "What kinds of sources work best?",
    answer:
      "Substantive talks, interviews, podcast episodes, founder calls, essays, and long-form notes work best when they contain a real idea, not just a list of opinions.",
  },
  {
    question: "What happens after I submit a request?",
    answer:
      "Mara reviews the source and context manually. If it is a fit, scope confirmation and a private payment link are shared before work begins.",
  },
  {
    question: "Does five business days include weekends?",
    answer:
      "No. The timeline is five business days after source, scope, and payment are confirmed.",
  },
  {
    question: "What if my source is not a fit?",
    answer:
      "Mara may decline or redirect the request. If a payment has been received before the source is assessed and work has not begun, a full refund applies.",
  },
  {
    question: "Can I request work faster than five business days?",
    answer:
      "Fast-track work may be possible in specific cases, but it is not the default service and must be agreed separately.",
  },
  {
    question: "What is included in the revision round?",
    answer:
      "One consolidated revision round is included for the approved draft. Additional scope changes or extra rounds are billed separately.",
  },
  {
    question: "Do you design LinkedIn carousels?",
    answer:
      "No. The service is text-first editorial support and does not include carousel design, Canva files, PDF exports, or visual design work.",
  },
  {
    question: "Do you use AI?",
    answer:
      "AI may assist with research, transcript analysis, and early drafting, but source accuracy, editorial judgment, final edits, and client-facing delivery remain human-led and accountable.",
  },
  {
    question: "Do you guarantee reach, engagement, leads, or sales?",
    answer:
      "No. There are no performance guarantees for reach, engagement, leads, sales, or business outcomes.",
  },
  {
    question: "How does payment work?",
    answer:
      "Every request is reviewed manually. If the source is a fit, Mara shares scope confirmation and a private payment link. Work begins only after source approval and payment are confirmed.",
  },
  {
    question: "What file formats will I receive?",
    answer:
      "The default deliverables are a text-first LinkedIn post and a text-only outline document. No other design or export formats are included by default.",
  },
  {
    question: "Who can use the final work?",
    answer:
      "The final approved deliverables may be used by the client for professional or business content, subject to the agreed scope and source rights.",
  },
  {
    question: "Do you offer ongoing work?",
    answer:
      "Yes, in some cases. Ongoing editorial support can be discussed after a project is approved and scoped.",
  },
  {
    question: "Can agencies or publications use this service?",
    answer:
      "Yes, if the source is legally shareable and a clear scope is agreed. The service is for editorial support, not public publishing management.",
  },
  {
    question: "Do you offer multi-project discounts?",
    answer:
      "Discounts are assessed case-by-case and are not a default offering. The best path is to share the source and project context for review.",
  },
];

function Aperture({
  videoSrc,
  posterSrc,
  mobileStaticSrc,
  aspectRatio,
  className = "",
  caption,
}: {
  videoSrc?: string;
  posterSrc: string;
  mobileStaticSrc?: string;
  aspectRatio?: string;
  className?: string;
  caption?: string;
}) {
  return (
    <div
      className={`aperture-container ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <div className="aperture-frame">
        {videoSrc && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            poster={posterSrc}
            className={`aperture-video ${mobileStaticSrc ? "desktop-video-only" : ""}`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        {mobileStaticSrc && (
          <Image
            src={mobileStaticSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            aria-hidden="true"
            className="aperture-mobile-img"
          />
        )}
        <Image
          src={posterSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 1280px"
          aria-hidden="true"
          className="aperture-poster-fallback"
        />
      </div>
      {caption && <span className="aperture-caption">{caption}</span>}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`monolith-header ${menuOpen ? "header-active" : ""} ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-shell">
        <a href="#top" className="wordmark" aria-label="Mara Content Lab home" onClick={closeMenu}>
          Mara Content Lab
        </a>

        <nav
          id="primary-navigation"
          className={`site-nav ${menuOpen ? "nav-visible" : ""}`}
          aria-label="Primary navigation"
        >
          <a href="#offer" onClick={closeMenu}>The Sprint</a>
          <a href="#process" onClick={closeMenu}>Process</a>
          <a href="#sample" onClick={closeMenu}>Sample</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#request" onClick={closeMenu}>Request</a>
          <a
            href="https://www.linkedin.com/in/parth-tiwari-988971386"
            target="_blank"
            rel="noreferrer"
            className="external-link"
            onClick={closeMenu}
          >
            LinkedIn ↗
          </a>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="toggle-bar" />
          <span className="toggle-bar" />
        </button>
      </div>
    </header>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-register" aria-label="Frequently asked questions">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;
        const numberLabel = String(index + 1).padStart(2, "0");
        return (
          <div key={item.question} className={`faq-entry ${isOpen ? "is-expanded" : ""}`}>
            <button
              type="button"
              className="faq-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="faq-index" aria-hidden="true">{numberLabel}</span>
              <span className="faq-title">{item.question}</span>
              <span className="faq-icon" aria-hidden="true">{isOpen ? "—" : "+"}</span>
            </button>
            <div className={`faq-panel ${isOpen ? "panel-open" : ""}`} hidden={!isOpen}>
              <div className="faq-body">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RequestForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    role: "",
    sourceUrl: "",
    audience: "",
    contentGoal: "",
    linkedin: "",
    notes: "",
    acknowledgement: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    "Contact & Context",
    "Source & Goal",
    "Review",
  ];

  const validateStep = (step: number) => {
    const nextErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.fullName.trim()) nextErrors.fullName = "Full name is required.";
      if (!formData.email.trim()) nextErrors.email = "Work email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        nextErrors.email = "Enter a valid email address.";
      }
    }

    if (step === 1) {
      if (!formData.sourceUrl.trim()) nextErrors.sourceUrl = "Source URL is required.";
      if (!formData.audience.trim()) nextErrors.audience = "Target audience is required.";
      if (!formData.contentGoal.trim()) nextErrors.contentGoal = "Content goal is required.";
    }

    if (step === 2 && !formData.acknowledgement) {
      nextErrors.acknowledgement = "You must acknowledge the manual review before submitting.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const updateField = (field: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!validateStep(2)) {
      event.preventDefault();
      setCurrentStep(2);
      return;
    }

    setIsSubmitting(true);
  };

  return (
    <div className="monolith-form-container">
      <div className="form-stepper" aria-label="Request progression steps">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`stepper-node ${index === currentStep ? "current" : ""} ${index < currentStep ? "completed" : ""}`}
          >
            <span className="stepper-num">0{index + 1}</span>
            <span className="stepper-label">{step}</span>
          </div>
        ))}
      </div>

      <form
        action="https://formsubmit.co/mara974a@gmail.com"
        method="POST"
        className="editorial-form"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="_subject" value="New Mara Content Lab request" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />

        {currentStep === 0 && (
          <div className="field-group">
            <div className="field-grid">
              <label className="field-item">
                <span className="field-label">Full Name *</span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Jane Doe"
                  value={formData.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  required
                />
                {errors.fullName && <span className="field-error">{errors.fullName}</span>}
              </label>

              <label className="field-item">
                <span className="field-label">Work Email *</span>
                <input
                  type="email"
                  name="email"
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  required
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </label>

              <label className="field-item">
                <span className="field-label">Company or Project Website</span>
                <input
                  type="text"
                  name="company"
                  placeholder="company.com"
                  value={formData.company}
                  onChange={(event) => updateField("company", event.target.value)}
                />
              </label>

              <label className="field-item">
                <span className="field-label">Role</span>
                <input
                  type="text"
                  name="role"
                  placeholder="Founder / CEO / Operator"
                  value={formData.role}
                  onChange={(event) => updateField("role", event.target.value)}
                />
              </label>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="field-group">
            <div className="field-grid">
              <label className="field-item field-span-full">
                <span className="field-label">Source URL *</span>
                <input
                  type="url"
                  name="sourceUrl"
                  placeholder="https://youtube.com/... or podcast / essay link"
                  value={formData.sourceUrl}
                  onChange={(event) => updateField("sourceUrl", event.target.value)}
                  aria-invalid={Boolean(errors.sourceUrl)}
                  required
                />
                {errors.sourceUrl && <span className="field-error">{errors.sourceUrl}</span>}
              </label>

              <label className="field-item field-span-full">
                <span className="field-label">Target Audience *</span>
                <input
                  type="text"
                  name="audience"
                  placeholder="Who needs to read this? (e.g. Series A founders, B2B CTOs)"
                  value={formData.audience}
                  onChange={(event) => updateField("audience", event.target.value)}
                  aria-invalid={Boolean(errors.audience)}
                  required
                />
                {errors.audience && <span className="field-error">{errors.audience}</span>}
              </label>

              <label className="field-item field-span-full">
                <span className="field-label">Content Goal *</span>
                <textarea
                  name="contentGoal"
                  rows={3}
                  placeholder="What is the key takeaway or position you want this post to establish?"
                  value={formData.contentGoal}
                  onChange={(event) => updateField("contentGoal", event.target.value)}
                  aria-invalid={Boolean(errors.contentGoal)}
                  required
                />
                {errors.contentGoal && <span className="field-error">{errors.contentGoal}</span>}
              </label>

              <label className="field-item field-span-full">
                <span className="field-label">LinkedIn Profile URL</span>
                <input
                  type="url"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedin}
                  onChange={(event) => updateField("linkedin", event.target.value)}
                />
              </label>

              <label className="field-item field-span-full">
                <span className="field-label">Anything Else to Know?</span>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Context, deadlines, or constraints"
                  value={formData.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                />
              </label>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="field-group review-group">
            <h3 className="review-title">Review request specification</h3>
            <div className="review-register">
              <div className="review-row">
                <span className="review-key">Full Name</span>
                <span className="review-val">{formData.fullName || "—"}</span>
              </div>
              <div className="review-row">
                <span className="review-key">Work Email</span>
                <span className="review-val">{formData.email || "—"}</span>
              </div>
              <div className="review-row">
                <span className="review-key">Company</span>
                <span className="review-val">{formData.company || "—"}</span>
              </div>
              <div className="review-row">
                <span className="review-key">Role</span>
                <span className="review-val">{formData.role || "—"}</span>
              </div>
              <div className="review-row">
                <span className="review-key">Source URL</span>
                <span className="review-val">{formData.sourceUrl || "—"}</span>
              </div>
              <div className="review-row">
                <span className="review-key">Target Audience</span>
                <span className="review-val">{formData.audience || "—"}</span>
              </div>
              <div className="review-row">
                <span className="review-key">Content Goal</span>
                <span className="review-val">{formData.contentGoal || "—"}</span>
              </div>
              <div className="review-row">
                <span className="review-key">LinkedIn</span>
                <span className="review-val">{formData.linkedin || "—"}</span>
              </div>
              <div className="review-row">
                <span className="review-key">Notes</span>
                <span className="review-val">{formData.notes || "—"}</span>
              </div>
            </div>

            <label className="checkbox-field">
              <input
                type="checkbox"
                name="acknowledgement"
                checked={formData.acknowledgement}
                aria-invalid={Boolean(errors.acknowledgement)}
                onChange={(event) => updateField("acknowledgement", event.target.checked)}
              />
              <span className="checkbox-text">
                I understand this request will be reviewed manually and does not create an automatic booking.
              </span>
            </label>
            {errors.acknowledgement && (
              <span className="field-error">{errors.acknowledgement}</span>
            )}
          </div>
        )}

        <div className="form-controls">
          {currentStep > 0 && (
            <button
              type="button"
              className="editorial-btn secondary-btn"
              onClick={previousStep}
            >
              Back
            </button>
          )}

          {currentStep < steps.length - 1 && (
            <button
              type="button"
              className="editorial-btn primary-btn"
              onClick={nextStep}
            >
              Continue
            </button>
          )}

          {currentStep === steps.length - 1 && (
            <button
              type="submit"
              className="editorial-btn primary-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit for review"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll(".reveal-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="void-monolith" id="top">
      <Header />

      {/* CHAPTER 01 — SIGNAL / HERO */}
      <section className="chapter-monolith hero-monolith reveal-section" aria-labelledby="hero-title">
        <div className="monolith-container">
          <div className="two-rail-layout">
            <aside className="rail-left">
              <div className="rail-meta-stack">
                <span className="chapter-index">01 / SIGNAL</span>
                <Aperture
                  videoSrc="/media/hero-loop.mp4"
                  posterSrc="/media/hero.jpg"
                  mobileStaticSrc="/media/hero-mobile.jpg"
                  aspectRatio="9/19"
                  className="hero-aperture"
                  caption="APERTURE // LIGHT CONSTRAINED"
                />
              </div>
            </aside>

            <div className="rail-right">
              <div className="hero-editorial-panel">
                <p className="chapter-kicker">SOURCE-GROUNDED EDITORIAL SUPPORT</p>
                <h1 id="hero-title" className="hero-editorial-heading">
                  Find the signal.<br />
                  Turn it into authority.
                </h1>
                <p className="hero-editorial-lead">
                  Mara turns talks, interviews, and essays into source-grounded LinkedIn content
                  for founders and operators.
                </p>

                <div className="hero-action-row">
                  <a className="editorial-btn primary-btn" href="#request">
                    Request a project
                  </a>
                  <a className="editorial-btn secondary-btn" href="#sample">
                    See the editorial standard
                  </a>
                </div>

                <div className="hero-transmission-line">
                  <span>From source → evidence → angle → draft</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 02 — NOISE / PROBLEM */}
      <section id="problem" className="chapter-monolith problem-monolith reveal-section" aria-labelledby="problem-heading">
        <div className="monolith-container">
          {/* Interstitial shallow horizontal aperture */}
          <div className="noise-interstitial-aperture" aria-hidden="true">
            <Aperture
              videoSrc="/media/motion-loop.mp4"
              posterSrc="/media/motion.jpg"
              aspectRatio="21/5"
              className="motion-aperture"
              caption="SIGNAL DISPERSION // 01"
            />
          </div>

          <div className="two-rail-layout">
            <aside className="rail-left">
              <div className="rail-meta-stack">
                <span className="chapter-index">01 / THE PROBLEM</span>
                <span className="rail-marginalia">RAW THOUGHT DENSITY</span>
              </div>
            </aside>

            <div className="rail-right">
              <div className="problem-editorial-body">
                <h2 id="problem-heading" className="problem-statement">
                  Good ideas rarely arrive as finished posts.
                </h2>
                <p className="problem-observation">
                  They live inside a 40-minute conversation, an unfinished talk, a founder call, or a dense essay.
                </p>
                <div className="problem-thesis-stack">
                  <p>Raw thought holds authority.</p>
                  <p>Most of it gets buried.</p>
                  <p>Most of it gets flattened.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 03 — FOCUS / THE SPRINT */}
      <section id="offer" className="chapter-monolith offer-monolith reveal-section" aria-labelledby="offer-heading">
        <div className="monolith-container">
          <div className="two-rail-layout">
            <aside className="rail-left">
              <div className="rail-sticky-stack">
                <span className="chapter-index">02 / THE SPRINT</span>
                <h2 id="offer-heading" className="offer-service-title">
                  Source-to-Authority Sprint
                </h2>
                <div className="offer-price-spec">
                  <span className="price-tag">$297 USD</span>
                  <span className="price-term">Fixed engagement</span>
                </div>
                <p className="delivery-spec">
                  Delivered within five business days after source, scope, and payment are confirmed.
                </p>
                <div className="offer-margin-artifact" aria-hidden="true">
                  <Image src="/media/texture.jpg" alt="" fill sizes="140px" className="texture-artifact-img" />
                </div>
                <div className="offer-cta-wrap">
                  <a className="editorial-btn primary-btn btn-full" href="#request">
                    Request this sprint
                  </a>
                </div>
              </div>
            </aside>

            <div className="rail-right">
              <div className="offer-register">
                <div className="offer-headline-group">
                  <p className="offer-mantra">
                    One substantive source. One clear editorial outcome.
                  </p>
                </div>

                <div className="offer-spec-columns">
                  <div className="spec-col included-col">
                    <h3 className="spec-col-heading">Included</h3>
                    <ul className="spec-list">
                      <li>One LinkedIn authority post, 180–250 words, text-first</li>
                      <li>One text-only document-post outline with 4–6 sections</li>
                      <li>Three future content angles</li>
                      <li>Three hook options</li>
                      <li>One consolidated revision round</li>
                    </ul>
                  </div>

                  <div className="spec-col excluded-col">
                    <h3 className="spec-col-heading">Not included</h3>
                    <ul className="spec-list">
                      <li>Video editing or clips</li>
                      <li>Graphic design, Canva files, carousel design, or PDF export</li>
                      <li>Publishing or scheduling</li>
                      <li>X/Twitter threads by default</li>
                      <li>Daily social-media management</li>
                      <li>Full marketing strategy</li>
                      <li>Rewriting an entire transcript</li>
                      <li>Unlimited revisions</li>
                      <li>Free completed custom drafts</li>
                      <li>Guaranteed business outcomes</li>
                      <li>Calls unless separately agreed</li>
                    </ul>
                  </div>
                </div>

                <div className="offer-payment-terms">
                  <h4 className="payment-heading">Payment and scope</h4>
                  <p>
                    Every request is reviewed personally. If the source is a fit, Mara shares scope confirmation and a private payment link. Work begins only after source approval and payment are confirmed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 04 — REFRACTION / PROCESS */}
      <section id="process" className="chapter-monolith process-monolith reveal-section" aria-labelledby="process-heading">
        <div className="monolith-container">
          {/* Illuminated editorial baseline aperture (approx 21:4 aspect ratio) */}
          <div className="process-baseline-aperture" aria-hidden="true">
            <Aperture
              videoSrc="/media/process-loop.mp4"
              posterSrc="/media/detail.jpg"
              aspectRatio="21/4"
              className="process-aperture"
              caption="EDITORIAL BASELINE // REFRACTION"
            />
          </div>

          <div className="two-rail-layout">
            <aside className="rail-left">
              <div className="rail-sticky-stack">
                <span className="chapter-index">03 / THE PROCESS</span>
                <h2 id="process-heading" className="rail-section-title">
                  Refraction
                </h2>
                <p className="rail-summary">
                  A strict five-phase extraction from dense unedited thought to authoritative delivery.
                </p>
                <div className="process-progress-track" aria-hidden="true">
                  <div className="process-progress-bar" />
                </div>
              </div>
            </aside>

            <div className="rail-right">
              <div className="process-sequence">
                {processSteps.map((step) => (
                  <article className="process-sequence-item" key={step.number}>
                    <span className="step-sequence-num">{step.number}</span>
                    <div className="step-sequence-body">
                      <h3 className="step-sequence-title">{step.title}</h3>
                      <p className="step-sequence-desc">{step.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 05 — PROOF / SAMPLE */}
      <section id="sample" className="chapter-monolith sample-monolith reveal-section" aria-labelledby="sample-heading">
        <div className="monolith-container">
          <div className="two-rail-layout">
            <aside className="rail-left">
              <div className="rail-sticky-stack">
                <span className="chapter-index">04 / THE EDITORIAL STANDARD</span>
                <h2 id="sample-heading" className="rail-section-title">
                  Independent editorial example
                </h2>
                <p className="sample-disclosure">
                  Uncommissioned and unaffiliated.
                </p>

                <div className="sample-margin-note">
                  <span className="margin-note-label">Source Document</span>
                  <p className="margin-note-title">
                    The Power of the Margins
                  </p>
                  <p className="margin-note-author">Paul Graham</p>
                  <a
                    href="https://paulgraham.com/margins.html"
                    target="_blank"
                    rel="noreferrer"
                    className="margin-note-link"
                  >
                    View public source ↗
                  </a>
                </div>

                <div className="sample-margin-note">
                  <span className="margin-note-label">Evidence Selected</span>
                  <p className="margin-note-quote">
                    A paraphrase of Graham’s core point: the most useful work is often done not at the center of a field, but in the small margins around it — the quiet decisions, the under-appreciated constraints, and the repeated improvements that compounds over time.
                  </p>
                </div>
              </div>
            </aside>

            <div className="rail-right">
              <div className="manuscript-reading-zone">
                <div className="manuscript-block">
                  <span className="manuscript-section-tag">Why this angle</span>
                  <p className="manuscript-angle-text">
                    Founders and operators do not need another broad list of startup rules. They need to see where real leverage actually lives: in the details that are easy to overlook and costly to ignore.
                  </p>
                </div>

                <div className="manuscript-draft-container">
                  <span className="manuscript-section-tag">The draft</span>
                  <div className="draft-body">
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
                </div>

                <div className="manuscript-distinction-block">
                  <span className="manuscript-section-tag">Why this differs from a generic summary</span>
                  <ul className="distinction-list">
                    <li>Starts from a specific source-grounded observation</li>
                    <li>Selects one useful idea rather than recapping everything</li>
                    <li>Gives a defined reader a practical framing</li>
                    <li>Preserves nuance rather than manufacturing certainty</li>
                    <li>Creates an editorial angle, not just a transcript rewrite</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 06 — HUMAN JUDGMENT / ACCOUNTABILITY */}
      <section id="accountability" className="chapter-monolith accountability-monolith reveal-section" aria-labelledby="accountability-heading">
        <div className="monolith-container">
          <div className="accountability-editorial-stack">
            <span className="chapter-index centered-index">05 / HUMAN ACCOUNTABILITY</span>
            <h2 id="accountability-heading" className="accountability-headline">
              AI can assist with research, transcript analysis, and early drafting.
            </h2>

            <div className="accountability-aperture-wrap">
              <Aperture
                videoSrc="/media/accountability-loop.mp4"
                posterSrc="/media/human-light.jpg"
                aspectRatio="1/1"
                className="human-aperture"
                caption="HUMAN LIGHT // CONSTRAINED JUDGMENT"
              />
            </div>

            <div className="accountability-statement-bottom">
              <p className="accountability-core-thought">
                But a source does not choose its own angle.
              </p>
              <p className="accountability-sub-thought">
                Source accuracy, editorial judgment, final edits, and client-facing delivery remain human-led and human-accountable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 07 — FIT */}
      <section id="fit" className="chapter-monolith fit-monolith reveal-section" aria-labelledby="fit-heading">
        <div className="monolith-container">
          <div className="two-rail-layout">
            <aside className="rail-left">
              <div className="rail-sticky-stack">
                <span className="chapter-index">06 / FIT</span>
                <h2 id="fit-heading" className="rail-section-title">
                  Selection Decision
                </h2>
                <p className="rail-summary">
                  Clear boundaries protect editorial quality. Fit is verified before any payment or commitment.
                </p>
              </div>
            </aside>

            <div className="rail-right">
              <div className="fit-split-register">
                <div className="fit-column good-fit-col">
                  <h3 className="fit-col-title">Good fit</h3>
                  <ul className="fit-bullet-list">
                    <li>You have a substantive talk, interview, podcast, call, or essay.</li>
                    <li>You have a clear audience you want to reach.</li>
                    <li>You want one precise idea developed carefully.</li>
                    <li>You value source accuracy and editorial judgment.</li>
                  </ul>
                </div>

                <div className="fit-column not-fit-col">
                  <h3 className="fit-col-title not-fit-title">Not a fit</h3>
                  <ul className="fit-bullet-list not-fit-bullets">
                    <li>You need generic AI posts at volume.</li>
                    <li>You need daily social-media management.</li>
                    <li>You need video editing, graphic design, or Canva production.</li>
                    <li>You need unlimited revisions.</li>
                    <li>You need guaranteed reach, leads, revenue, or business outcomes.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 08 — OPERATOR / ABOUT */}
      <section id="about" className="chapter-monolith about-monolith reveal-section" aria-labelledby="about-heading">
        <div className="monolith-container">
          <div className="two-rail-layout">
            <aside className="rail-left">
              <div className="rail-sticky-stack">
                <span className="chapter-index">07 / ABOUT</span>
                <div className="operator-portrait-aperture">
                  <div className="portrait-frame">
                    <span className="portrait-monogram">PT</span>
                  </div>
                  <div className="portrait-meta">
                    <span className="operator-name">Parth Tiwari</span>
                    <span className="operator-role">Independent editor based in India.</span>
                  </div>
                </div>
              </div>
            </aside>

            <div className="rail-right">
              <div className="about-editorial-prose">
                <h2 id="about-heading" className="about-manifesto-heading">
                  I built Mara because founders’ strongest thinking often gets flattened into generic AI summaries.
                </h2>
                <p className="about-narrative">
                  When someone spends real time explaining what they know, the useful work is not summarizing every point. It is finding the one idea worth carrying forward, grounding it in the source, and giving it a clear shape for the right reader.
                </p>
                <p className="about-conclusion">
                  That is what Mara is built to do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 09 — REFERENCE / FAQ */}
      <section id="faq" className="chapter-monolith faq-monolith reveal-section" aria-labelledby="faq-heading">
        <div className="monolith-container">
          <div className="two-rail-layout">
            <aside className="rail-left">
              <div className="rail-sticky-stack">
                <span className="chapter-index">08 / FAQ</span>
                <h2 id="faq-heading" className="rail-section-title">
                  Reference Index
                </h2>
                <p className="rail-summary">
                  Explicit answers regarding source requirements, revisions, payment structure, and service scope.
                </p>
              </div>
            </aside>

            <div className="rail-right">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 10 — LANDING / REQUEST */}
      <section id="request" className="chapter-monolith request-monolith reveal-section" aria-labelledby="request-heading">
        <div className="monolith-container">
          <div className="two-rail-layout">
            <aside className="rail-left">
              <div className="rail-sticky-stack">
                <span className="chapter-index">09 / REQUEST A PROJECT</span>
                {/* Visual signal terminal mark resolving into calm */}
                <div className="signal-resolution-line" aria-hidden="true" />
                <h2 id="request-heading" className="request-rail-heading">
                  Share the source, context, and outcome you have in mind.
                </h2>
                <p className="request-rail-notice">
                  Every request is reviewed personally. You’ll hear back within one business day. If the source is a fit, Mara will send scope confirmation and a private payment link.
                </p>
                <div className="request-security-indicator">
                  <span className="indicator-dot" aria-hidden="true" />
                  <span>Manual review • No automatic charges</span>
                </div>
              </div>
            </aside>

            <div className="rail-right">
              <RequestForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="monolith-footer">
        <div className="monolith-container">
          <div className="footer-register">
            <div className="footer-brand-col">
              <span className="footer-brand-name">Mara Content Lab</span>
              <a href="mailto:mara974a@gmail.com" className="footer-contact-email">
                mara974a@gmail.com
              </a>
            </div>

            <div className="footer-links-col">
              <a
                href="https://www.linkedin.com/in/parth-tiwari-988971386"
                target="_blank"
                rel="noreferrer"
                className="footer-nav-link"
              >
                LinkedIn ↗
              </a>
              <a href="/privacy" className="footer-nav-link">
                Privacy
              </a>
              <a href="/terms" className="footer-nav-link">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
