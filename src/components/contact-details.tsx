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
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center text-[10px] font-semibold uppercase tracking-[0.25em] hover:text-muted-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
