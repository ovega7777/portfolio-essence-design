import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "../components/site-chrome";
import noComplyPrimary from "../assets/home/no-comply-primary.jpg";
import noComplySecondary from "../assets/home/no-comply-secondary.jpg";
import luckyDayThumb from "../assets/lucky-day-thumb.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <SiteFrame className="[--background:#fff] [--card:#fff] [--foreground:#111] [--muted-foreground:#666] [--border:#d9d9d9]">
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:pb-20 md:pt-14">
        <div className="grid items-end gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <img
              src={noComplyPrimary}
              alt="Nicholas Curzon creative direction portrait featuring a black patched jacket"
              width={960}
              height={1280}
              className="h-auto w-full bg-neutral-100 object-contain"
            />
          </div>
          <div className="md:col-span-7 md:pb-2">
            <p className="eyebrow mb-4">Portfolio — 2026</p>
            <h1 className="font-serif text-5xl leading-[0.9] tracking-tight sm:text-6xl lg:text-8xl">
              Nicholas <span className="italic">Curzon</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/70 md:text-lg">
              Product designer, graphic designer, and creative director shaping
              apparel, brand identities, campaign imagery, and digital
              experiences with a focused commercial point of view.
            </p>
            <Link
              to="/about"
              className="mt-7 inline-flex border-b border-black pb-1 text-[11px] font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              View Resume →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-black/15 px-6 pb-16 pt-12 md:pb-20 md:pt-14">
        <div className="mb-8 flex items-end justify-between md:mb-10">
          <h2 className="font-serif text-4xl">Selected Works</h2>
          <div className="mx-6 mb-3 hidden h-px flex-1 bg-black/15 sm:block" />
          <Link
            to="/projects"
            className="text-[11px] font-bold uppercase tracking-[0.25em] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            View all
          </Link>
        </div>

        <div className="space-y-12 md:space-y-14">
          <ProjectCard
            to="/projects/no-comply"
            number="01"
            title="NO COMPLY USA"
            description="Product design, graphic design, and creative direction for an experimental apparel brand—developing its collections, visual identity, campaign imagery, graphics, and digital presentation."
            src={noComplyPrimary}
            alt="NO COMPLY USA campaign model wearing a black patched jacket"
            secondarySrc={noComplySecondary}
            secondaryAlt="NO COMPLY USA campaign models in black and navy apparel"
          />
          <ProjectCard
            to="/projects/lucky-day-co"
            number="02"
            title="LUCKY DAY CO."
            description="Product design, graphic design, and creative direction for a refined lifestyle brand—shaping its identity, packaging, campaign visuals, and cohesive customer-facing experience."
            src={luckyDayThumb}
            alt="Lucky Day Co — refined product still life"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-black/15 px-6 py-12 md:py-14">
        <div className="grid gap-7 md:grid-cols-12 md:gap-10">
          <h2 className="eyebrow text-black md:col-span-4">Project Contributions</h2>
          <div className="grid gap-x-8 gap-y-3 text-lg md:col-span-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Product Design",
              "Graphic Design",
              "Branding",
              "Creative Direction",
              "Campaign Development",
              "Digital Experience",
            ].map((contribution) => (
              <p key={contribution} className="border-t border-black/15 pt-3">
                {contribution}
              </p>
            ))}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}

function ProjectCard({
  to,
  number,
  title,
  description,
  src,
  alt,
  secondarySrc,
  secondaryAlt,
}: {
  to: "/projects/no-comply" | "/projects/lucky-day-co";
  number: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  secondarySrc?: string;
  secondaryAlt?: string;
}) {
  return (
    <Link
      to={to}
      className="group block border-t border-black pt-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="eyebrow text-black">{number}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/55">
          View Project →
        </span>
      </div>
      <div
        className={`mb-5 overflow-hidden bg-neutral-100 ${
          secondarySrc ? "grid items-start gap-2 md:grid-cols-[1.45fr_1fr]" : ""
        }`}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          width={1600}
          height={1067}
          className="h-auto w-full object-contain transition-opacity duration-300 group-hover:opacity-90"
        />
        {secondarySrc && secondaryAlt && (
          <img
            src={secondarySrc}
            alt={secondaryAlt}
            loading="lazy"
            width={1280}
            height={1280}
            className="h-auto w-full object-contain transition-opacity duration-300 group-hover:opacity-90"
          />
        )}
      </div>
      <div className="grid gap-3 md:grid-cols-12 md:gap-8">
        <h3 className="font-serif text-3xl leading-none md:col-span-4 md:text-4xl">
          {title}
        </h3>
        <div className="flex items-start gap-5 md:col-span-8">
          <p className="max-w-3xl text-sm leading-relaxed text-black/65 md:text-base">
            {description}
          </p>
          <span
            aria-hidden
            className="ml-auto grid size-9 shrink-0 place-items-center rounded-full border border-black transition-colors group-hover:bg-black group-hover:text-white"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
