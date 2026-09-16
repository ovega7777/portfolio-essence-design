import { LuckyDayWordmark } from "@/components/lucky-day-wordmark";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "../components/site-chrome";
import hero from "../assets/lucky-day-main.jpg";
import thumb from "../assets/lucky-day-thumb.jpg";

export const Route = createFileRoute("/projects/lucky-day-co")({
  head: () => ({
    meta: [
      { title: "Lucky Day Co — Nicholas Curzon" },
      {
        name: "description",
        content:
          "Lucky Day Co: a refined commercial framework for luxury sales and distribution by Nicholas Curzon.",
      },
      { property: "og:title", content: "Lucky Day Co — Nicholas Curzon" },
      {
        property: "og:description",
        content: "Brand strategy and commercial framework for Lucky Day Co.",
      },
    ],
  }),
  component: LuckyDay,
});

function LuckyDay() {
  return (
    <SiteFrame className="[--background:#fff] [&_.portfolio-nav]:bg-white">
      <section className="mx-auto max-w-6xl px-6 pt-8 pb-8 md:pt-12 md:pb-12">
        <h1 className="flex items-center justify-center text-center font-serif text-5xl leading-[1] md:text-7xl">
          <LuckyDayWordmark hero />
        </h1>
        <p className="portfolio-project-intro mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Lucky Day Co. is an elegant jewelry and lifestyle brand centered on timeless design,
          ethically sourced materials, and consistent, transparent pricing based on material and
          labor costs. Drawing from symbols of good fortune found across cultures, each piece is
          designed as a personal charm—created to carry meaning and invite good luck into everyday
          life.
        </p>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-6 pb-12 md:space-y-8 md:pb-16">
        <img
          src={hero}
          alt="Lucky Day Co. silver signet rings on a tattooed hand resting on an open book"
          width={1125}
          height={1280}
          className="portfolio-main-image block h-auto w-full object-contain"
        />
        <img
          src={thumb}
          alt="Lucky Day Co — product still life"
          loading="lazy"
          width={1600}
          height={1067}
          className="w-full object-cover"
        />
      </section>

      <section className="portfolio-next-project mx-auto max-w-6xl border-t border-border px-6 py-12 md:py-16">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="eyebrow mb-2">Next Project</p>
            <Link
              to="/projects/mid-mod"
              className="font-serif text-4xl hover:text-muted-foreground"
            >
              MID MOD <span aria-hidden="true">→</span>
            </Link>
          </div>
          <Link
            to="/projects"
            className="text-[11px] font-bold uppercase tracking-[0.25em] border-b border-foreground pb-1"
          >
            All Projects
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}
