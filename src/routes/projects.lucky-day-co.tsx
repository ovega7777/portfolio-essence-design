import { LuckyDayWordmark } from "@/components/lucky-day-wordmark";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "../components/site-chrome";
import { LuckyDayCover, LuckyDayEditorialGallery } from "@/components/lucky-day-editorial";
import { luckyDayDescription } from "@/data/lucky-day-editorial";

export const Route = createFileRoute("/projects/lucky-day-co")({
  head: () => ({
    meta: [
      { title: "Lucky Day Co — Nicholas Curzon" },
      {
        name: "description",
        content:
          "Lucky Day Co. editorial series: photo editing and graphic design by Nicholas Curzon.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Lucky Day Co — Nicholas Curzon" },
      {
        property: "og:description",
        content: "Eight black-and-white editorial portrait posters for Lucky Day Co. — photo editing and graphic design by Nicholas Curzon.",
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
        <p className="portfolio-project-intro mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl lg:mx-auto lg:max-w-[1104px] lg:text-center">
          {luckyDayDescription}
        </p>
        <dl className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/60">
          <div><dt className="sr-only">Role</dt><dd>Editorial Photo Editing</dd></div>
          <div><dt className="sr-only">Role</dt><dd>Graphic Design</dd></div>
          <div><dt className="sr-only">Credit</dt><dd>Nicholas Curzon</dd></div>
        </dl>
      </section>

      <section aria-label="Lucky Day Co. editorial cover" className="mx-auto max-w-6xl px-6 pb-12 md:pb-16">
        <LuckyDayCover />
      </section>

      <section aria-label="Lucky Day Co. editorial gallery" className="mx-auto max-w-6xl px-6 pb-12 md:pb-16">
        <p className="eyebrow mb-6">Editorial Series</p>
        <LuckyDayEditorialGallery />
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
