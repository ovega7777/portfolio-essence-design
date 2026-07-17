import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "../components/site-chrome";
import noComplyThumb from "../assets/no-comply-hero.png.asset.json";
import luckyDayThumb from "../assets/lucky-day-thumb.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <SiteFrame>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-32 md:pt-24 md:pb-40">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-8">Portfolio — 2026</p>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Intersection of
              <br />
              <span className="italic">Design & Commerce.</span>
            </h1>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Nicholas Curzon blends the precision of pattern-making with the
              strategic rigor of international business. Currently scaling
              family-led sales operations with a designer's eye.
            </p>
          </div>
          <div className="flex flex-col justify-end pb-2 lg:col-span-4">
            <div className="space-y-8 border-l border-border pl-6 md:pl-8 text-base md:text-lg">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
                  Education
                </p>
                <p className="font-semibold">Fashion Institute of Technology</p>
                <p className="text-muted-foreground">
                  Bachelor of Science in Fashion Business Management
                </p>
              </div>
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
                  Focus
                </p>
                <p className="font-semibold">Sales Strategy & Product Design</p>
              </div>
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
                  Based
                </p>
                <p className="font-semibold">New York / Miami</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-4xl">Selected Works</h2>
          <div className="mx-8 mb-3 h-px flex-1 bg-border" />
          <Link
            to="/projects"
            className="text-[11px] font-bold uppercase tracking-[0.25em] hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-16 md:grid-cols-2">
          <ProjectCard
            to="/projects/no-comply"
            title="No Comply"
            meta="Visual Identity & Apparel Design"
            src={noComplyThumb.url}
            alt="No Comply — brutalist streetwear moodboard"
          />
          <ProjectCard
            to="/projects/lucky-day-co"
            title="Lucky Day Co"
            meta="Business Development & Brand Strategy"
            src={luckyDayThumb}
            alt="Lucky Day Co — refined product still life"
          />
        </div>
      </section>

      {/* About preview */}
      <section className="mx-auto max-w-6xl px-6 py-24 border-t border-border">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">About</p>
          </div>
          <div className="md:col-span-8">
            <p className="font-serif text-3xl leading-snug md:text-4xl">
              A designer's discipline applied to the architecture of sales —
              built on a foundation of pattern-making, international business,
              and a family legacy of commercial craft.
            </p>
            <Link
              to="/about"
              className="mt-10 inline-block text-[11px] font-bold uppercase tracking-[0.25em] border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground"
            >
              Read More
            </Link>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}

function ProjectCard({
  to,
  title,
  meta,
  src,
  alt,
}: {
  to: "/projects/no-comply" | "/projects/lucky-day-co";
  title: string;
  meta: string;
  src: string;
  alt: string;
}) {
  return (
    <Link to={to} className="group block">
      <div className="mb-6 overflow-hidden bg-secondary">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          width={1600}
          height={1067}
          className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-serif text-2xl">{title}</h3>
          <p className="mt-1 text-sm italic text-muted-foreground">{meta}</p>
        </div>
        <span className="grid size-10 place-items-center rounded-full border border-border transition-colors group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent">
          →
        </span>
      </div>
    </Link>
  );
}
