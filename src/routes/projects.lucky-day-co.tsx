import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "../components/site-chrome";
import hero from "../assets/lucky-day-hero.jpg";
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
    <SiteFrame>
      <section className="mx-auto max-w-6xl px-6 pt-8 pb-8 md:pt-12 md:pb-12">
        <h1 className="font-serif text-5xl leading-[1] md:text-7xl">
          Lucky Day <span className="italic">Co.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          A refined commercial framework for luxury sales and distribution —
          developed to translate a family legacy of commercial craft into a
          contemporary, service-forward brand.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <img
          src={hero}
          alt="Lucky Day Co — tailored menswear detail"
          width={1600}
          height={900}
          className="w-full object-cover"
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">The Brief</p>
          </div>
          <div className="md:col-span-8 space-y-6 text-lg leading-relaxed">
            <p>
              Lucky Day Co needed a commercial identity that could stand next
              to the objects it sold — something restrained, honest, and quiet
              enough to let the product lead. The work spans naming systems,
              sales collateral, and a repeatable framework for how the brand
              introduces itself to new accounts.
            </p>
            <p>
              The result is a system built on typographic discipline, warm
              neutral photography, and a service voice that reads more like a
              trusted operator than a marketer.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <Fact label="Role">Brand Strategy, Sales Systems</Fact>
          <Fact label="Year">2024</Fact>
          <Fact label="Scope">Identity, Collateral, Sales Playbook</Fact>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <img
          src={thumb}
          alt="Lucky Day Co — product still life"
          loading="lazy"
          width={1600}
          height={1067}
          className="w-full object-cover"
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-border">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="eyebrow mb-2">Next Project</p>
            <Link
              to="/projects/no-comply"
              className="font-serif text-4xl hover:text-muted-foreground"
            >
              No Comply →
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

function Fact({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border pt-6">
      <p className="eyebrow mb-3">{label}</p>
      <p className="text-base">{children}</p>
    </div>
  );
}
