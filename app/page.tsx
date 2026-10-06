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

function Header({
  videosPaused = false,
  onToggleVideos,
}: {
  videosPaused?: boolean;
  onToggleVideos?: () => void;
}) {
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
          {onToggleVideos && (
            <button
              type="button"
              className={`motion-toggle-pill ${videosPaused ? "is-paused" : "is-live"}`}
              onClick={onToggleVideos}
              aria-label={videosPaused ? "Resume video motion" : "Pause all video layers"}
            >
              <span className="motion-status-led" aria-hidden="true" />
              <span>{videosPaused ? "MOTION: OFF" : "MOTION: LIVE"}</span>
            </button>
          )}
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

const faqCategories = [
  { id: "all", label: "ALL [15]" },
  { id: "scope", label: "SCOPE & DELIVERABLES" },
  { id: "timeline", label: "TIMELINE & PAYMENT" },
  { id: "editorial", label: "EDITORIAL & ACCOUNTABILITY" },
];

const categoryMap: Record<number, string> = {
  0: "scope",       // What kinds of sources work best?
  1: "timeline",    // What happens after I submit a request?
  2: "timeline",    // Does five business days include weekends?
  3: "scope",       // What if my source is not a fit?
  4: "timeline",    // Can I request work faster than five business days?
  5: "scope",       // What is included in the revision round?
  6: "scope",       // Do you design LinkedIn carousels?
  7: "editorial",   // Do you use AI?
  8: "editorial",   // Do you guarantee reach, engagement, leads, or sales?
  9: "timeline",    // How does payment work?
  10: "scope",      // What file formats will I receive?
  11: "scope",      // Who can use the final work?
  12: "scope",      // Do you offer ongoing work?
  13: "editorial",  // Can agencies or publications use this service?
  14: "timeline",   // Do you offer multi-project discounts?
};

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredFaqs = faqs
    .map((item, originalIndex) => ({ ...item, originalIndex }))
    .filter((item) => activeCategory === "all" || categoryMap[item.originalIndex] === activeCategory);

  return (
    <div className="faq-ledger-wrapper">
      {/* Category Filter Selector */}
      <div className="faq-category-pills" role="tablist" aria-label="FAQ categories">
        {faqCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat.id}
            className={`faq-pill-btn ${activeCategory === cat.id ? "pill-active" : ""}`}
            onClick={() => {
              setActiveCategory(cat.id);
              setOpenIndex(null);
            }}
          >
            <span className="pill-indicator-dot" aria-hidden="true" />
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="faq-register" aria-label="Frequently asked questions">
        {filteredFaqs.map((item) => {
          const isOpen = openIndex === item.originalIndex;
          const numberLabel = String(item.originalIndex + 1).padStart(2, "0");
          return (
            <div key={item.question} className={`faq-entry technical-modular-card ${isOpen ? "is-expanded" : ""}`}>
              <button
                type="button"
                className="faq-trigger"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : item.originalIndex)}
              >
                <div className="faq-trigger-left">
                  <span className="faq-index" aria-hidden="true">{numberLabel}</span>
                  <span className="faq-title">{item.question}</span>
                </div>
                <div className="faq-trigger-right">
                  {isOpen && <span className="faq-telemetry-status">[ OPEN_RECORD ]</span>}
                  <span className="faq-icon" aria-hidden="true">{isOpen ? "—" : "+"}</span>
                </div>
              </button>
              <div 
                className={`faq-panel-collapsible ${isOpen ? "is-open" : ""}`}
                id={`faq-panel-${numberLabel}`}
                role="region"
                aria-hidden={!isOpen}
              >
                <div className="faq-panel-inner">
                  <div className="faq-panel-content">
                    <div className="faq-body">
                      <div className="faq-record-tag" aria-hidden="true">
                        <span>RECORD_ID {"//"} REG_{numberLabel}</span>
                        <span>MANUAL_POLICY {"//"} VERIFIED</span>
                      </div>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
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
    { phase: "PHASE 01 // DETAILS", label: "Contact & Context" },
    { phase: "PHASE 02 // SOURCE & SCOPE", label: "Source & Goal" },
    { phase: "PHASE 03 // VERIFICATION", label: "Review" },
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
    <div className="monolith-form-container hud-console-container">
      {/* Corner HUD marks */}
      <div className="card-hud-corner c-tl" aria-hidden="true">┌</div>
      <div className="card-hud-corner c-tr" aria-hidden="true">┐</div>
      <div className="card-hud-corner c-bl" aria-hidden="true">└</div>
      <div className="card-hud-corner c-br" aria-hidden="true">┘</div>

      {/* HUD Telemetry Header */}
      <div className="hud-console-header">
        <div className="hud-console-telemetry-left">
          <span className="hud-status-indicator pulse-slow" aria-hidden="true" />
          <span className="hud-console-code">INTAKE_PROTOCOL {"//"} V2.4</span>
        </div>
        <div className="hud-console-telemetry-right">
          <span className="hud-console-telemetry-item">[ TRANSMISSION {"//"} ENCRYPTED ]</span>
        </div>
      </div>

      {/* Technical Stepper */}
      <div className="hud-stepper" aria-label="Request progression steps">
        {steps.map((step, index) => (
          <div
            key={step.phase}
            className={`hud-stepper-node ${index === currentStep ? "current" : ""} ${index < currentStep ? "completed" : ""}`}
          >
            <div className="hud-stepper-bar-track">
              <div className="hud-stepper-bar-fill" />
            </div>
            <div className="hud-stepper-info">
              <span className="hud-stepper-phase">{step.phase}</span>
              <span className="hud-stepper-label">{step.label}</span>
            </div>
          </div>
        ))}
      </div>

      <form
        action="https://formsubmit.co/mara974a@gmail.com"
        method="POST"
        className="editorial-form hud-editorial-form"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="_subject" value="New Mara Content Lab request" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />

        {/* Horizontal sliding steps viewport */}
        <div className="hud-console-viewport">
          <div
            className="hud-console-track"
            style={{ transform: `translateX(-${currentStep * 100}%)` }}
          >
            {/* Phase 01: Contact & Context */}
            <div
              className={`hud-console-step ${currentStep === 0 ? "active-step" : ""}`}
              aria-hidden={currentStep !== 0}
            >
              <div className="field-group">
                <div className="field-grid">
                  <label className="field-item hud-field-item">
                    <span className="field-label hud-field-label">Full Name *</span>
                    <div className="hud-input-wrapper">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="e.g. Jane Doe"
                        value={formData.fullName}
                        onChange={(event) => updateField("fullName", event.target.value)}
                        aria-invalid={Boolean(errors.fullName)}
                        required={currentStep === 0}
                        className="hud-hairline-input"
                      />
                      <div className="hud-hairline-beam" aria-hidden="true" />
                    </div>
                    {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                  </label>

                  <label className="field-item hud-field-item">
                    <span className="field-label hud-field-label">Work Email *</span>
                    <div className="hud-input-wrapper">
                      <input
                        type="email"
                        name="email"
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        required={currentStep === 0}
                        className="hud-hairline-input"
                      />
                      <div className="hud-hairline-beam" aria-hidden="true" />
                    </div>
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </label>

                  <label className="field-item hud-field-item">
                    <span className="field-label hud-field-label">Company or Project Website</span>
                    <div className="hud-input-wrapper">
                      <input
                        type="text"
                        name="company"
                        placeholder="company.com"
                        value={formData.company}
                        onChange={(event) => updateField("company", event.target.value)}
                        className="hud-hairline-input"
                      />
                      <div className="hud-hairline-beam" aria-hidden="true" />
                    </div>
                  </label>

                  <label className="field-item hud-field-item">
                    <span className="field-label hud-field-label">Role</span>
                    <div className="hud-input-wrapper">
                      <input
                        type="text"
                        name="role"
                        placeholder="Founder / CEO / Operator"
                        value={formData.role}
                        onChange={(event) => updateField("role", event.target.value)}
                        className="hud-hairline-input"
                      />
                      <div className="hud-hairline-beam" aria-hidden="true" />
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Phase 02: Source & Goal */}
            <div
              className={`hud-console-step ${currentStep === 1 ? "active-step" : ""}`}
              aria-hidden={currentStep !== 1}
            >
              <div className="field-group">
                <div className="field-grid">
                  <label className="field-item hud-field-item field-span-full">
                    <span className="field-label hud-field-label">Source URL *</span>
                    <div className="hud-input-wrapper">
                      <input
                        type="url"
                        name="sourceUrl"
                        placeholder="https://youtube.com/... or podcast / essay link"
                        value={formData.sourceUrl}
                        onChange={(event) => updateField("sourceUrl", event.target.value)}
                        aria-invalid={Boolean(errors.sourceUrl)}
                        required={currentStep === 1}
                        className="hud-hairline-input"
                      />
                      <div className="hud-hairline-beam" aria-hidden="true" />
                    </div>
                    {errors.sourceUrl && <span className="field-error">{errors.sourceUrl}</span>}
                  </label>

                  <label className="field-item hud-field-item field-span-full">
                    <span className="field-label hud-field-label">Target Audience *</span>
                    <div className="hud-input-wrapper">
                      <input
                        type="text"
                        name="audience"
                        placeholder="Who needs to read this? (e.g. Series A founders, B2B CTOs)"
                        value={formData.audience}
                        onChange={(event) => updateField("audience", event.target.value)}
                        aria-invalid={Boolean(errors.audience)}
                        required={currentStep === 1}
                        className="hud-hairline-input"
                      />
                      <div className="hud-hairline-beam" aria-hidden="true" />
                    </div>
                    {errors.audience && <span className="field-error">{errors.audience}</span>}
                  </label>

                  <label className="field-item hud-field-item field-span-full">
                    <span className="field-label hud-field-label">Content Goal *</span>
                    <div className="hud-input-wrapper">
                      <textarea
                        name="contentGoal"
                        rows={3}
                        placeholder="What is the key takeaway or position you want this post to establish?"
                        value={formData.contentGoal}
                        onChange={(event) => updateField("contentGoal", event.target.value)}
                        aria-invalid={Boolean(errors.contentGoal)}
                        required={currentStep === 1}
                        className="hud-hairline-input hud-hairline-textarea"
                      />
                      <div className="hud-hairline-beam" aria-hidden="true" />
                    </div>
                    {errors.contentGoal && <span className="field-error">{errors.contentGoal}</span>}
                  </label>

                  <label className="field-item hud-field-item field-span-full">
                    <span className="field-label hud-field-label">LinkedIn Profile URL</span>
                    <div className="hud-input-wrapper">
                      <input
                        type="url"
                        name="linkedin"
                        placeholder="https://linkedin.com/in/username"
                        value={formData.linkedin}
                        onChange={(event) => updateField("linkedin", event.target.value)}
                        className="hud-hairline-input"
                      />
                      <div className="hud-hairline-beam" aria-hidden="true" />
                    </div>
                  </label>

                  <label className="field-item hud-field-item field-span-full">
                    <span className="field-label hud-field-label">Anything Else to Know?</span>
                    <div className="hud-input-wrapper">
                      <textarea
                        name="notes"
                        rows={2}
                        placeholder="Context, deadlines, or constraints"
                        value={formData.notes}
                        onChange={(event) => updateField("notes", event.target.value)}
                        className="hud-hairline-input hud-hairline-textarea"
                      />
                      <div className="hud-hairline-beam" aria-hidden="true" />
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Phase 03: Review */}
            <div
              className={`hud-console-step ${currentStep === 2 ? "active-step" : ""}`}
              aria-hidden={currentStep !== 2}
            >
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
            </div>
          </div>
        </div>

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
  const [pageLoaded, setPageLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [videosPaused, setVideosPaused] = useState(false);

  const toggleVideos = () => {
    setVideosPaused((prev) => {
      const next = !prev;
      document.querySelectorAll("video").forEach((vid) => {
        if (next) vid.pause();
        else vid.play().catch(() => {});
      });
      return next;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 200);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          
          // Calculate active step for Chapter 04 Process
          const stepElements = document.querySelectorAll(".process-sequence-item");
          if (stepElements.length) {
            const viewportCenter = window.innerHeight * 0.45;
            let closestIndex = 0;
            let closestDistance = Infinity;

            stepElements.forEach((el, index) => {
              const rect = el.getBoundingClientRect();
              const elCenter = rect.top + rect.height / 2;
              const distance = Math.abs(elCenter - viewportCenter);
              if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
              }
            });

            setActiveStep(closestIndex);
          }

          // Paragraph opacity stepping for Chapter 06 Editorial Sample
          const steppedElements = document.querySelectorAll(".draft-body p, .manuscript-angle-text, .distinction-list li");
          if (steppedElements.length) {
            const viewportMiddle = window.innerHeight * 0.55;
            steppedElements.forEach((el) => {
              const rect = el.getBoundingClientRect();
              if (rect.top <= viewportMiddle) {
                el.classList.add("is-stepped");
              } else {
                el.classList.remove("is-stepped");
              }
            });
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll(".technical-modular-card");
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });

      const portrait = document.querySelector(".liquid-cursor-frame");
      if (portrait) {
        const rect = (portrait as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const normX = ((x / rect.width) - 0.5) * 2;
        const normY = ((y / rect.height) - 0.5) * 2;
        (portrait as HTMLElement).style.setProperty("--cursor-norm-x", normX.toFixed(3));
        (portrait as HTMLElement).style.setProperty("--cursor-norm-y", normY.toFixed(3));
        (portrait as HTMLElement).style.setProperty("--cursor-x-px", `${x}px`);
        (portrait as HTMLElement).style.setProperty("--cursor-y-px", `${y}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

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
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="void-monolith" id="top">
      <Header videosPaused={videosPaused} onToggleVideos={toggleVideos} />

      {/* Global Background Vertical Optical Signal Axis */}
      <div className="optical-signal-axis" aria-hidden="true">
        <div className="axis-line" />
        <div className="axis-node node-signal" />
        <div className="axis-node node-problem" />
        <div className="axis-node node-sprint" />
        <div className="axis-node node-process" />
        <div className="axis-node node-accountability" />
        <div className="axis-node node-sample" />
        <div className="axis-node node-fit" />
        <div className="axis-node node-about" />
        <div className="axis-node node-faq" />
        <div className="axis-node node-request" />
      </div>

      {/* CHAPTER 01 — SIGNAL / HERO (THE LUMINOUS TUNNEL) */}
      <section
        className={`kinetic-hero-section tunnel-hero-section reveal-section ${pageLoaded ? "hero-loaded" : "hero-pristine"}`}
        aria-labelledby="hero-title"
        id="hero"
      >
        {/* Layer 1: Full-Bleed Video Base Layer (Shifts from blur(14px) to sharp on load) */}
        <div className="tunnel-video-base" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/media/hero.jpg"
            className="tunnel-hero-video desktop-video-only"
          >
            <source src="/media/hero-loop.mp4" type="video/mp4" />
          </video>
          <Image
            src="/media/hero-mobile.jpg"
            alt=""
            fill
            sizes="100vw"
            priority
            className="tunnel-hero-mobile-img"
          />
        </div>

        {/* Layer 2: Vignette & Luminous Corridor Overlay */}
        <div className="tunnel-vignette-overlay" aria-hidden="true">
          <div className="tunnel-central-corridor" />
          <div className="tunnel-chromatic-dust" />
        </div>

        {/* Layer 3: Interaction & Typography Layer with 3D Scroll Parallax */}
        <div className="tunnel-interaction-layer">
          <div className="monolith-container tunnel-monolith-container">
            <div className="tunnel-hero-content">
              <div className="hero-header-lineage">
                <span className="chapter-index">01 / SIGNAL</span>
                <div className="hero-hairline-draw" />
              </div>

              <div 
                className="tunnel-headline-stack"
                style={{
                  transform: `perspective(1200px) translate3d(0, ${scrollY * 0.18}px, -${Math.min(scrollY * 0.65, 300)}px)`,
                  opacity: Math.max(1 - scrollY * 0.0018, 0.15)
                }}
              >
                <p className="chapter-kicker split-axis-kicker">SOURCE-GROUNDED EDITORIAL SUPPORT</p>
                <h1 id="hero-title" className="hero-editorial-heading tunnel-hero-heading">
                  Find the signal.<br />
                  Turn it into authority.
                </h1>
                <p className="hero-editorial-lead tunnel-editorial-lead">
                  Mara turns talks, interviews, and essays into source-grounded LinkedIn content
                  for founders and operators.
                </p>

                <div className="hero-action-row split-axis-actions">
                  <a className="editorial-btn primary-btn tunnel-primary-btn" href="#request">
                    Request a project
                  </a>
                  <a className="editorial-btn secondary-btn tunnel-secondary-btn" href="#sample">
                    See the editorial standard
                  </a>
                </div>

                <div className="hero-transmission-line tunnel-transmission-line">
                  <span>From source → evidence → angle → draft</span>
                </div>
              </div>

              <div className="hero-optical-caption tunnel-optical-caption" aria-hidden="true">
                <span className="hud-status-indicator pulse-slow" />
                <span className="aperture-caption">TUNNEL OPTIC // CORRIDOR ALIGNED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TUNNEL PINCH TRANSITION: Core pinches into a thin horizontal laser line */}
      <div className="tunnel-pinch-transition" aria-hidden="true">
        <div className="pinch-glow-conduit" />
        <div className="pinch-laser-hairline" />
      </div>

      {/* CHAPTER 02 — NOISE / PROBLEM */}
      <section id="problem" className="chapter-monolith problem-monolith reveal-section" aria-labelledby="problem-heading">
        <div className="monolith-container">
          {/* Large kinetic shape with motion-loop.mp4 and HUD overlay */}
          <div className="kinetic-noise-scaffold" aria-hidden="true">
            <div className="hud-corner-bracket hud-top-left">┌</div>
            <div className="hud-corner-bracket hud-top-right">┐</div>
            <div className="hud-corner-bracket hud-bottom-left">└</div>
            <div className="hud-corner-bracket hud-bottom-right">┘</div>

            <div className="hud-telemetry-header">
              <span className="hud-flicker-mono">[ SPECTRAL_DENSITY // UNPROCESSED ]</span>
              <span className="hud-flicker-mono">[ NOISE_FLOOR // 84.6% ]</span>
              <span className="hud-flicker-mono">[ SYS.REFRACT // ACTIVE ]</span>
            </div>

            <div className="kinetic-noise-lens">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/media/motion.jpg"
                className="kinetic-noise-video"
              >
                <source src="/media/motion-loop.mp4" type="video/mp4" />
              </video>
              <div className="kinetic-noise-scanline" />
              <div className="kinetic-noise-radial-vignette" />

              <div className="kinetic-noise-badge">
                <span className="noise-badge-tag">SIGNAL DISPERSION // 01</span>
                <span className="noise-badge-reticle">⌖</span>
              </div>
            </div>

            <div className="hud-telemetry-footer">
              <span className="hud-flicker-mono">LATENCY // 0.00ms</span>
              <div className="hud-telemetry-ruler">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <span className="hud-flicker-mono">DISPERSION VECTOR [0.72, -0.41, 0.94]</span>
            </div>
          </div>

          <div className="two-rail-layout problem-kinetic-layout">
            <aside className="rail-left">
              <div className="rail-meta-stack">
                <span className="chapter-index">01 / THE PROBLEM</span>
                <span className="rail-marginalia">[ RAW THOUGHT DENSITY ]</span>
              </div>
            </aside>

            <div className="rail-right">
              <div className="problem-editorial-body">
                <h2 id="problem-heading" className="problem-statement glitch-reveal-heading">
                  Good ideas rarely arrive as finished posts.
                </h2>
                <p className="problem-observation glitch-reveal-observation">
                  They live inside a 40-minute conversation, an unfinished talk, a founder call, or a dense essay.
                </p>
                <div className="problem-thesis-stack rhythmic-thesis-stack">
                  <div className="rhythmic-thesis-item glitch-reveal-item-1">
                    <span className="rhythmic-index">[ 01 ]</span>
                    <p>Raw thought holds authority.</p>
                  </div>
                  <div className="rhythmic-thesis-item glitch-reveal-item-2">
                    <span className="rhythmic-index">[ 02 ]</span>
                    <p>Most of it gets buried.</p>
                  </div>
                  <div className="rhythmic-thesis-item glitch-reveal-item-3">
                    <span className="rhythmic-index">[ 03 ]</span>
                    <p>Most of it gets flattened.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 03 — FOCUS / THE SPRINT */}
      <section id="offer" className="chapter-monolith offer-monolith reveal-section" aria-labelledby="offer-heading">
        <div className="monolith-container offer-relative-container">
          {/* Ambient loop inspired by texture.jpg: slow-drifting glass tiles behind offer container at low opacity */}
          <div className="ambient-glass-tiles-backdrop" aria-hidden="true">
            <div className="drifting-tile tile-alpha" />
            <div className="drifting-tile tile-beta" />
            <div className="drifting-tile tile-gamma" />
            <div className="drifting-tile tile-delta" />
            <div className="drifting-tile tile-epsilon" />
          </div>

          {/* Calm sanctuary: single frosted glass slate with hairline chrome border */}
          <div className="frosted-slate-sanctuary">
            <div className="slate-chrome-border-glow" aria-hidden="true" />

            {/* Glass Star Entity Technical Spec Banner (Image 2 motif) */}
            <div className="slate-spec-telemetry" aria-hidden="true">
              <div className="spec-telemetry-col">
                <span className="spec-k">ENTITY {"//"}</span>
                <span className="spec-v">SPRINT_SPECIFICATION</span>
              </div>
              <div className="spec-telemetry-col">
                <span className="spec-k">MATERIAL {"//"}</span>
                <span className="spec-v">FROSTED_CHROME_VOID</span>
              </div>
              <div className="spec-telemetry-col">
                <span className="spec-k">DELIVERY {"//"}</span>
                <span className="spec-v">5_BUSINESS_DAYS</span>
              </div>
              <div className="spec-telemetry-col">
                <span className="spec-k">LOCK_STATE {"//"}</span>
                <span className="spec-v">[ ACTIVE {"//"} FIXED_ENGAGEMENT ]</span>
              </div>
            </div>
            
            <div className="two-rail-layout offer-slate-grid">
              <aside className="rail-left">
                <div className="rail-sticky-stack">
                  <span className="chapter-index">02 / THE SPRINT</span>
                  <h2 id="offer-heading" className="offer-service-title">
                    Source-to-Authority Sprint
                  </h2>
                  
                  {/* Subtle reticle/target motif from layout-reference.jpg */}
                  <div className="offer-reticle-target-box">
                    <div className="reticle-tick reticle-top-left">┌</div>
                    <div className="reticle-tick reticle-top-right">┐</div>
                    <div className="reticle-tick reticle-bottom-left">└</div>
                    <div className="reticle-tick reticle-bottom-right">┘</div>

                    <div className="reticle-status-line">
                      <span className="reticle-target-lock-dot">●</span>
                      <span className="reticle-status-text">TARGET LOCK: ACTIVE</span>
                    </div>

                    <div className="offer-price-spec">
                      <span className="price-tag">$297 USD</span>
                      <span className="price-term">Fixed engagement</span>
                    </div>

                    <div className="reticle-coordinates">
                      <span>[ RETICLE {"//"} 297.00 ]</span>
                    </div>
                  </div>

                  <p className="delivery-spec">
                    Delivered within five business days after source, scope, and payment are confirmed.
                  </p>
                  <div className="offer-margin-telemetry" aria-hidden="true">
                    <span className="telemetry-bar-line" />
                    <span className="telemetry-bar-label">[ SPR-297 // VERIFIED ]</span>
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
                    <div className="spec-col included-col technical-sub-viewport">
                      <div className="card-hud-corner c-tl" aria-hidden="true">┌</div>
                      <div className="card-hud-corner c-tr" aria-hidden="true">┐</div>
                      <div className="card-hud-corner c-bl" aria-hidden="true">└</div>
                      <div className="card-hud-corner c-br" aria-hidden="true">┘</div>
                      <div className="sub-viewport-badge">[ MODULE {"//"} DELIVERABLE_SPEC ]</div>
                      
                      <h3 className="spec-col-heading">Included</h3>
                      <ul className="spec-list">
                        <li>One LinkedIn authority post, 180–250 words, text-first</li>
                        <li>One text-only document-post outline with 4–6 sections</li>
                        <li>Three future content angles</li>
                        <li>Three hook options</li>
                        <li>One consolidated revision round</li>
                      </ul>
                    </div>

                    <div className="spec-col excluded-col technical-sub-viewport">
                      <div className="card-hud-corner c-tl" aria-hidden="true">┌</div>
                      <div className="card-hud-corner c-tr" aria-hidden="true">┐</div>
                      <div className="card-hud-corner c-bl" aria-hidden="true">└</div>
                      <div className="card-hud-corner c-br" aria-hidden="true">┘</div>
                      <div className="sub-viewport-badge">[ BOUNDARY {"//"} EXCLUSION_SPEC ]</div>

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
        </div>
      </section>

      {/* CHAPTER 04 — REFRACTION / PROCESS */}
      <section id="process" className="chapter-monolith process-monolith reveal-section" aria-labelledby="process-heading">
        <div className="monolith-container">
          <div className="process-header-center">
            <span className="chapter-index centered-index">03 / THE PROCESS</span>
            <h2 id="process-heading" className="process-portal-title">
              Refraction
            </h2>
            <p className="process-portal-summary">
              A strict five-phase extraction from dense unedited thought to authoritative delivery.
            </p>
          </div>

          <div className="process-pinned-portal-wrapper">
            {/* Pinned Vertical Portal: process-loop.mp4 clipped inside a large centered vertical portal with rotating prism */}
            <div className="process-sticky-portal-anchor">
              <div className="process-centered-portal">
                {/* Rotating optical prism (rotates by ~72° per step) */}
                <div 
                  className="optical-prism-ring"
                  style={{ transform: `rotate(${activeStep * 72}deg)` }}
                  aria-hidden="true"
                >
                  <div className="prism-node prism-node-0" />
                  <div className="prism-node prism-node-1" />
                  <div className="prism-node prism-node-2" />
                  <div className="prism-node prism-node-3" />
                  <div className="prism-node prism-node-4" />
                  <div className="prism-facet-halo" />
                </div>

                {/* Vertical Optical Lens clipping process-loop.mp4 */}
                <div className="process-vertical-lens">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/media/detail.jpg"
                    className="portal-process-video"
                  >
                    <source src="/media/process-loop.mp4" type="video/mp4" />
                  </video>
                  <div className="lens-specular-glare" />
                  <div className="lens-aperture-reticle" aria-hidden="true">
                    <span className="lens-reticle-line-h" />
                    <span className="lens-reticle-line-v" />
                    <div className="lens-telemetry-badge">
                      [ PRISM {"//"} STEP {processSteps[activeStep]?.number} {"//"} {activeStep * 72}° ]
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5 Steps sequence: each step fades from 40% opacity to 100% white as it becomes active */}
            <div className="process-steps-sequence-column">
              {processSteps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <article 
                    className={`process-sequence-item technical-modular-card ${isActive ? "step-active" : "step-inactive"}`} 
                    key={step.number}
                  >
                    <div className="card-hud-corner c-tl" aria-hidden="true">┌</div>
                    <div className="card-hud-corner c-tr" aria-hidden="true">┐</div>
                    <div className="card-hud-corner c-bl" aria-hidden="true">└</div>
                    <div className="card-hud-corner c-br" aria-hidden="true">┘</div>
                    
                    <div className="step-card-header">
                      <span className="step-sequence-num">{step.number}</span>
                      <span className="step-telemetry-badge">[ SEQUENCE {"//"} STAGE_0{index + 1} ]</span>
                      {isActive && <span className="step-active-hud-label">[ ACTIVE PHASE {"//"} {index * 72}° ]</span>}
                    </div>
                    <div className="step-sequence-body">
                      <h3 className="step-sequence-title">{step.title}</h3>
                      <p className="step-sequence-desc">{step.description}</p>
                    </div>
                    {isActive && <div className="step-laser-vector-connector" aria-hidden="true" />}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 05 — HUMAN ACCOUNTABILITY */}
      <section id="accountability" className="chapter-monolith accountability-monolith reveal-section" aria-labelledby="accountability-heading">
        {/* Layer 1: accountability-loop.mp4 layered directly behind copy */}
        <div className="accountability-native-backdrop" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/human-light.jpg"
            className="accountability-native-video"
          >
            <source src="/media/accountability-loop.mp4" type="video/mp4" />
          </video>
          <div className="accountability-vignette-veil" />
          <div className="accountability-beam-conduit" />

          {/* Letterbox boundary markings */}
          <div className="letterbox-hud-corner lb-top-left">┌</div>
          <div className="letterbox-hud-corner lb-top-right">┐</div>
          <div className="letterbox-hud-corner lb-bottom-left">└</div>
          <div className="letterbox-hud-corner lb-bottom-right">┘</div>
          <div className="letterbox-hud-status">
            <span>[ SYSTEM {"//"} HUMAN_SUPERVISION_LOCKED ]</span>
            <span>HUMAN LIGHT {"//"} CONSTRAINED JUDGMENT</span>
          </div>
        </div>

        <div className="monolith-container accountability-reading-container">
          {/* Dynamic Light Beam Masked Editorial Content */}
          <div className="accountability-statement-slate accountability-beam-lens">
            <span className="chapter-index centered-index">05 / HUMAN ACCOUNTABILITY</span>
            
            <h2 id="accountability-heading" className="accountability-headline beam-masked-headline">
              AI can assist with research, transcript analysis, and early drafting.
            </h2>

            <div className="accountability-statement-divider">
              <span className="divider-crosshair">+</span>
            </div>

            <div className="accountability-statement-bottom">
              <p className="accountability-core-thought beam-focused-core">
                But a source does not choose its own angle.
              </p>
              <p className="accountability-sub-thought beam-ambient-sub">
                Source accuracy, editorial judgment, final edits, and client-facing delivery remain human-led and human-accountable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 06 — PROOF / EDITORIAL SAMPLE */}
      <section id="sample" className="chapter-monolith sample-monolith reveal-section" aria-labelledby="sample-heading">
        <div className="monolith-container sample-split-monolith-container">
          <div className="sample-meta-header">
            <span className="chapter-index centered-index">04 / THE EDITORIAL STANDARD</span>
            <h2 id="sample-heading" className="sample-master-heading">
              Independent editorial example
            </h2>
            <p className="sample-disclosure">
              Uncommissioned and unaffiliated.
            </p>
          </div>

          <div className="sample-split-screen-grid">
            {/* Left Rail: Fixed, calm sample text on dark background */}
            <div className="sample-left-calm-rail">
              <div className="sample-context-card technical-modular-card">
                <div className="card-hud-corner c-tl" aria-hidden="true">┌</div>
                <div className="card-hud-corner c-tr" aria-hidden="true">┐</div>
                <div className="card-hud-corner c-bl" aria-hidden="true">└</div>
                <div className="card-hud-corner c-br" aria-hidden="true">┘</div>
                <div className="context-card-badge">[ EVIDENCE_REGISTER {"//"} SPEC_04 ]</div>
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

              <div className="manuscript-block technical-modular-card angle-block-card">
                <div className="card-hud-corner c-tl" aria-hidden="true">┌</div>
                <div className="card-hud-corner c-tr" aria-hidden="true">┐</div>
                <div className="card-hud-corner c-bl" aria-hidden="true">└</div>
                <div className="card-hud-corner c-br" aria-hidden="true">┘</div>
                <div className="card-telemetry-badge">[ EDITORIAL_DIRECTION {"//"} ANGLE_LOCK ]</div>
                <span className="manuscript-section-tag">Why this angle</span>
                <p className="manuscript-angle-text">
                  Founders and operators do not need another broad list of startup rules. They need to see where real leverage actually lives: in the details that are easy to overlook and costly to ignore.
                </p>
              </div>

              <div className="manuscript-draft-container draft-tablet-chassis">
                <div className="card-hud-corner c-tl" aria-hidden="true">┌</div>
                <div className="card-hud-corner c-tr" aria-hidden="true">┐</div>
                <div className="card-hud-corner c-bl" aria-hidden="true">└</div>
                <div className="card-hud-corner c-br" aria-hidden="true">┘</div>
                
                <div className="draft-tablet-telemetry" aria-hidden="true">
                  <span className="draft-telemetry-badge">[ DELIVERABLE_01 {"//"} 218_WORDS {"//"} TEXT_FIRST ]</span>
                  <span className="draft-telemetry-status">
                    <span className="status-dot-active" />
                    VERIFIED_OUTPUT
                  </span>
                </div>

                <span className="manuscript-section-tag draft-title-tag">The draft</span>
                <div className="draft-body">
                  <div className="draft-paragraph-wrap" data-step="01">
                    <span className="para-tag" aria-hidden="true">[ 01 {"//"} HOOK ]</span>
                    <p>
                      Most teams chase the obvious lever: the launch, the campaign, the product feature, the external signal. But the real edge often sits in the margins — in the small, neglected choices that no one else notices until they start to compound.
                    </p>
                  </div>

                  <div className="draft-paragraph-wrap" data-step="02">
                    <span className="para-tag" aria-hidden="true">[ 02 {"//"} EVIDENCE ]</span>
                    <p>
                      That is the quiet advantage Paul Graham points to. The work that is not glamorous is often the work with the most durable effect. A slightly clearer sentence, a tighter definition, a better constraint, a more precise decision: these do not look dramatic in isolation, but over time they shape what a team actually becomes.
                    </p>
                  </div>

                  <div className="draft-paragraph-wrap" data-step="03">
                    <span className="para-tag" aria-hidden="true">[ 03 {"//"} RESOLUTION ]</span>
                    <p>
                      A founder who understands this does not try to sound impressive everywhere. They choose what to exclude, what to refine, and what to hold true. That is not a trick. It is the difference between reacting to noise and building an actual point of view.
                    </p>
                  </div>
                </div>
              </div>

              <div className="manuscript-distinction-block technical-modular-card">
                <div className="card-hud-corner c-tl" aria-hidden="true">┌</div>
                <div className="card-hud-corner c-tr" aria-hidden="true">┐</div>
                <div className="card-hud-corner c-bl" aria-hidden="true">└</div>
                <div className="card-hud-corner c-br" aria-hidden="true">┘</div>
                <div className="card-telemetry-badge">[ VALUE_DIFFERENTIAL {"//"} RIGOR_CHECK ]</div>
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

            {/* Right Rail: Cropped looping window of motion-loop.mp4 as an energetic "engine" */}
            <div className="sample-right-engine-rail">
              <div className="sample-engine-sticky-window">
                <div className="engine-window-chassis">
                  <div className="card-hud-corner c-tl" aria-hidden="true">┌</div>
                  <div className="card-hud-corner c-tr" aria-hidden="true">┐</div>
                  <div className="card-hud-corner c-bl" aria-hidden="true">└</div>
                  <div className="card-hud-corner c-br" aria-hidden="true">┘</div>

                  <div className="engine-telemetry-header" aria-hidden="true">
                    <div className="engine-status-group">
                      <span className="status-dot-active" />
                      <span className="engine-status-text">KINETIC_ENGINE {"//"} ONLINE</span>
                    </div>
                    <span className="engine-telemetry-code">[ ROTOR: 60FPS ]</span>
                  </div>

                  {/* Cropped looping window */}
                  <div className="engine-video-viewport" aria-hidden="true">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster="/media/motion.jpg"
                      className="engine-motion-video"
                    >
                      <source src="/media/motion-loop.mp4" type="video/mp4" />
                    </video>
                    <div className="engine-scanline-veil" />
                    <div className="engine-crosshair-reticle">
                      <div className="engine-reticle-circle" />
                      <div className="engine-reticle-cross-h" />
                      <div className="engine-reticle-cross-v" />
                    </div>
                  </div>

                  <div className="engine-telemetry-footer" aria-hidden="true">
                    <span className="engine-footer-tag">[ DRAFT_REFRACTION_CYCLE ]</span>
                    <span className="engine-footer-flux">FLUX: LOCKED</span>
                  </div>
                </div>
              </div>
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
                <div className="fit-telemetry-tag">
                  <span className="hud-status-indicator pulse-slow" />
                  <span>[ CRITERIA {"//"} ACTIVE_VERIFICATION ]</span>
                </div>
              </div>
            </aside>

            <div className="rail-right">
              <div className="fit-split-register">
                <div className="fit-column good-fit-col technical-modular-card">
                  <div className="card-hud-corner c-tl">┌</div>
                  <div className="card-hud-corner c-tr">┐</div>
                  <div className="card-hud-corner c-bl">└</div>
                  <div className="card-hud-corner c-br">┘</div>
                  <div className="card-telemetry-badge">[ ADMISSION_GATE {"//"} RESONANT_SIGNAL ]</div>

                  <h3 className="fit-col-title">Good fit</h3>
                  <ul className="fit-bullet-list">
                    <li>You have a substantive talk, interview, podcast, call, or essay.</li>
                    <li>You have a clear audience you want to reach.</li>
                    <li>You want one precise idea developed carefully.</li>
                    <li>You value source accuracy and editorial judgment.</li>
                  </ul>
                </div>

                <div className="fit-column not-fit-col technical-modular-card">
                  <div className="card-hud-corner c-tl">┌</div>
                  <div className="card-hud-corner c-tr">┐</div>
                  <div className="card-hud-corner c-bl">└</div>
                  <div className="card-hud-corner c-br">┘</div>
                  <div className="card-telemetry-badge">[ DEFLECTION_FILTER {"//"} NOISE_ELIMINATED ]</div>

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
                
                {/* Parth's headshot in an asymmetric glass frame with fine technical marks */}
                <div className="operator-portrait-aperture">
                  <div className="portrait-asymmetric-chassis liquid-cursor-frame" style={{ position: "relative", width: "100%", maxWidth: "260px" }}>
                    <div className="portrait-frame" style={{ position: "relative", width: "100%", maxWidth: "260px", height: "320px", overflow: "hidden" }}>
                      <Image
                        src="/media/parth-headshot.jpg"
                        alt="Parth Tiwari"
                        width={260}
                        height={320}
                        className="portrait-img liquid-portrait-img"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        priority
                      />
                      <div className="portrait-liquid-displacement" aria-hidden="true" />
                      <div className="portrait-glass-gradient" />
                      <div className="portrait-reticle-overlay" aria-hidden="true">
                        <div className="portrait-corner p-tl">┌</div>
                        <div className="portrait-corner p-tr">┐</div>
                        <div className="portrait-corner p-bl">└</div>
                        <div className="portrait-corner p-br">┘</div>
                        <span className="portrait-reticle-dot" />
                      </div>
                    </div>
                  </div>
                  <div className="portrait-meta">
                    <div className="portrait-meta-tag">[ OPERATOR {"//"} PT-01 ]</div>
                    <span className="operator-name">Parth Tiwari</span>
                    <span className="operator-role">Independent editor based in India.</span>
                    <div className="operator-coordinate-tag">[ COORD {"//"} 28.6139° N, 77.2090° E ]</div>
                    <div className="operator-status-badge">
                      <span className="status-dot-active" />
                      STATUS: ACTIVE_REVIEW
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <div className="rail-right">
              <div className="about-editorial-prose technical-modular-card">
                <div className="card-hud-corner c-tl">┌</div>
                <div className="card-hud-corner c-tr">┐</div>
                <div className="card-hud-corner c-bl">└</div>
                <div className="card-hud-corner c-br">┘</div>
                <div className="card-telemetry-badge">[ ARCHITECTURAL_CREED {"//"} MARA_FOUNDING ]</div>
                
                <h2 id="about-heading" className="about-manifesto-heading">
                  I built Mara because founders’ strongest thinking often gets flattened into generic AI summaries.
                </h2>
                <p className="about-narrative">
                  When someone spends real time explaining what they know, the useful work is not summarizing every point. It is finding the one idea worth carrying forward, grounding it in the source, and giving it a clear shape for the right reader.
                </p>
                <p className="about-conclusion">
                  That is what Mara is built to do.
                </p>

                {/* 3-Stage Editorial Pipeline Schematic */}
                <div className="about-pipeline-schematic" aria-hidden="true">
                  <div className="schematic-stage">
                    <span className="schematic-step-code">STAGE_01</span>
                    <span className="schematic-step-title">RAW THOUGHT</span>
                    <span className="schematic-step-desc">Unedited depth</span>
                  </div>
                  <div className="schematic-laser-conduit">
                    <span className="laser-beam" />
                    <span className="conduit-arrow">→</span>
                  </div>
                  <div className="schematic-stage active-schematic">
                    <span className="schematic-step-code">STAGE_02</span>
                    <span className="schematic-step-title">MARA APERTURE</span>
                    <span className="schematic-step-desc">Human precision</span>
                  </div>
                  <div className="schematic-laser-conduit">
                    <span className="laser-beam" />
                    <span className="conduit-arrow">→</span>
                  </div>
                  <div className="schematic-stage">
                    <span className="schematic-step-code">STAGE_03</span>
                    <span className="schematic-step-title">DEFENSIVE AUTHORITY</span>
                    <span className="schematic-step-desc">Durable signal</span>
                  </div>
                </div>
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
                <div className="faq-telemetry-stamp">
                  <span>[ INDEX_COUNT: 15 ]</span>
                </div>
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
