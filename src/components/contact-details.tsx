export function ContactDetails({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`portfolio-contact-details min-w-0 ${compact ? "portfolio-contact-details--compact" : ""}`}>
      <p className="eyebrow portfolio-contact-heading">Get in touch</p>
      <div className="portfolio-contact-links">
        <a
          href="mailto:nicholasc@curzonco.com"
          aria-label="Email nicholasc@curzonco.com"
          className="portfolio-contact-address"
        >
          nicholasc@curzonco.com
        </a>
        <a
          href="https://www.linkedin.com/in/nicholascurzon"
          aria-label="Nicholas Curzon on LinkedIn"
          target="_blank"
          rel="noreferrer"
          className="portfolio-contact-linkedin"
        >
          linkedin.com/in/nicholascurzon
        </a>
      </div>
    </div>
  );
}
