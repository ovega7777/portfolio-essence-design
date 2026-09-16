import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "@/components/site-chrome";
import { MidModWordmark } from "@/components/mid-mod-wordmark";
import { midModDescription, midModImages } from "@/data/mid-mod";

export const Route = createFileRoute("/projects/mid-mod")({
  head: () => ({ meta: [
    { title: "MID MOD — Nicholas Curzon" },
    { name: "description", content: midModDescription },
    { property: "og:title", content: "MID MOD — Nicholas Curzon" },
    { property: "og:description", content: midModDescription },
  ] }),
  component: MidMod,
});

function MidMod() {
  return (
    <SiteFrame className="portfolio-mid-mod [--background:#fff] [&_.portfolio-nav]:bg-white">
      <section className="mx-auto max-w-6xl px-6 pt-8 pb-8 md:pt-12 md:pb-8">
        <h1 className="flex justify-center"><MidModWordmark hero /></h1>
        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <p className="eyebrow">Furniture &amp; Home Design</p>
          <p className="eyebrow">Founded 2000</p>
        </div>
        <p className="portfolio-project-intro mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          MID MOD is a mid-century modern furniture and home-design company founded in 2000. Its collection brings together new, vintage, and carefully refurbished furniture, lighting, décor, rugs, and art for distinctive, timeless interiors.
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed md:text-xl">
          Built around a lasting appreciation for mid-century form, function, and craftsmanship, MID MOD gives iconic design a place in contemporary homes. The brand balances collectible vintage pieces with restored finds and thoughtfully selected new designs.
        </p>
      </section>

      <section aria-label="MID MOD visual gallery" className="mx-auto max-w-6xl px-6 pb-12 md:pb-16">
        <div className="mid-mod-gallery">
          {midModImages.map((image, index) => (
            <img key={image.src} {...image} loading={index < 2 ? "eager" : "lazy"} className="block h-auto w-full object-contain" />
          ))}
        </div>
      </section>

      <section aria-label="Project details" className="mx-auto max-w-6xl border-t border-border px-6 py-8 md:py-10">
        <dl aria-label="Project details" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Focus", "Brand Identity, Art Direction, Campaign Imagery"],
            ["Categories", "Furniture, Lighting, Décor, Rugs, Art"],
            ["Offering", "New, Vintage, Refurbished"],
            ["Founded", "2000"],
          ].map(([label, value]) => (
            <div key={label}><dt className="eyebrow mb-4">{label}</dt><dd className="text-base leading-relaxed">{value}</dd></div>
          ))}
        </dl>
      </section>

      <section className="portfolio-next-project mx-auto max-w-6xl border-t border-border px-6 py-12 md:py-16">
        <div className="flex items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="eyebrow mb-2">Next Project</p>
            <Link
              to="/projects/no-comply"
              className="font-serif text-4xl hover:text-muted-foreground"
            >
              NO COMPLY USA <span aria-hidden="true">→</span>
            </Link>
          </div>
          <Link
            to="/projects"
            className="shrink-0 text-[11px] font-bold uppercase tracking-[0.25em] border-b border-foreground pb-1"
          >
            All Projects
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}
