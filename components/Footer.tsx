import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <span className="brand" style={{ marginBottom: "0.75rem", display: "inline-block" }}>
              MARA CONTENT LAB
            </span>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", maxWidth: "380px", marginBottom: "1rem" }}>
              Source-grounded LinkedIn editorial support for independent B2B founders, operators, and consultants.
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
              Operated by Parth Tiwari. Based in India.
            </p>
            <p style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>
              Direct email:{" "}
              <a href="mailto:mara974a@gmail.com" style={{ color: "var(--accent-blue)", fontWeight: 500 }}>
                mara974a@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-primary)", marginBottom: "1rem" }}>
              Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem", fontSize: "0.9375rem" }}>
              <li><a href="/#offer" className="nav-link">The Sprint ($297)</a></li>
              <li><a href="/#process" className="nav-link">5-Step Process</a></li>
              <li><a href="/#sample" className="nav-link">Editorial Sample</a></li>
              <li><a href="/#fit" className="nav-link">Fit Matrix</a></li>
              <li><a href="/#about" className="nav-link">About Parth Tiwari</a></li>
              <li><a href="/#faq" className="nav-link">FAQ</a></li>
              <li><Link href="/request" className="nav-link" style={{ color: "var(--accent-blue)", fontWeight: 600 }}>Request a Project</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-primary)", marginBottom: "1rem" }}>
              Legal & Trust
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem", fontSize: "0.9375rem" }}>
              <li><Link href="/privacy" className="nav-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="nav-link">Terms of Service</Link></li>
              <li>
                <a
                  href="https://www.linkedin.com/in/parth-tiwari-988971386"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  LinkedIn Profile ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Mara Content Lab. All rights reserved.</p>
          <p style={{ maxWidth: "560px", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
            Independent editorial support. Fixed scope confirmed before any payment. No reach guarantees or automated charges.
          </p>
        </div>
      </div>
    </footer>
  );
}
