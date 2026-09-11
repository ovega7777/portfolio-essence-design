export function ContactDetails({ compact = false }: { compact?: boolean }) {
  return (
    <div className="portfolio-contact-details min-w-0">
      <p className="eyebrow mb-3">Get in touch</p>
      <div className="flex flex-col items-start gap-2">
        <a
          href="mailto:nicholasc@curzonco.com"
          aria-label="Email nicholasc@curzonco.com"
          className={`${compact ? "text-sm" : "portfolio-contact-address font-serif text-3xl"} max-w-full min-h-11 inline-flex items-center [overflow-wrap:anywhere] hover:text-muted-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-4`}
        >
          nicholasc@curzonco.com
        </a>
        <a
          href="https://www.linkedin.com/in/nicholascurzon"
          aria-label="Nicholas Curzon on LinkedIn"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 max-w-full items-center text-sm font-normal normal-case tracking-normal [overflow-wrap:anywhere] hover:text-muted-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          linkedin.com/in/nicholascurzon
        </a>
      </div>
    </div>
  );
}
