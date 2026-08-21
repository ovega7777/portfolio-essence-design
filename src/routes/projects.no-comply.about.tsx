import { createFileRoute } from "@tanstack/react-router";

import { EditorialPageShell } from "@/components/no-comply/editorial-page-shell";

export const Route = createFileRoute("/projects/no-comply/about")({
  head: () => ({
    meta: [
      { title: "About NO COMPLY USA · Nicholas Curzon" },
      {
        name: "description",
        content: "The complete NO COMPLY USA brand and case study by Nicholas Curzon.",
      },
    ],
  }),
  component: NoComplyAbout,
});

function NoComplyAbout() {
  return (
    <EditorialPageShell pageName="ABOUT">
      <main className="nc-first-section mx-auto max-w-7xl px-6 pb-20 !pt-8 sm:!pt-10 md:pb-28 lg:pb-32 lg:!pt-14">
        <header>
          <h1 className="nc-display uppercase tracking-[0.02em]">
            <span className="block text-6xl leading-[0.82] md:text-8xl lg:text-9xl">ABOUT</span>
            <span className="mt-1 block text-[2.5rem] leading-[0.88] md:text-[4rem] lg:text-[5.25rem]">
              NO COMPLY USA
            </span>
          </h1>
        </header>

        <section className="mt-8 grid gap-10 border-t-2 border-black pt-8 md:mt-10 md:grid-cols-2 md:gap-14 md:pt-10 lg:mt-12 lg:gap-20">
          <p className="font-punk-body text-xl leading-relaxed tracking-[0.035em] md:text-2xl">
            NO COMPLY USA is a unisex experimental apparel brand rooted in nonconformity and an
            open-ended approach to American style. Designed to be worn by both men and women, NO
            COMPLY USA approaches clothing without rigid gender boundaries while maintaining a
            recognizable point of view. The brand draws on the rebellious energy of American
            counterculture throughout history, translating it into a distinctly contemporary visual
            language.
          </p>
          <p className="font-punk-body text-xl leading-relaxed tracking-[0.035em] md:text-2xl">
            As a case study, NO COMPLY USA demonstrates my ability to develop a brand from start to
            finish. The project brings together brand strategy and identity, product and graphic
            design, creative direction, collection development, campaign imagery, merchandising, and
            digital presentation as one cohesive system. Each touchpoint shows how a broad range of
            references can be translated into a unified brand world while still allowing the
            individual collections to explore different visual directions.
          </p>
        </section>

        <div
          aria-hidden="true"
          className="mt-16 h-20 border-y-2 border-black bg-black md:mt-24 md:h-28"
        />
      </main>
    </EditorialPageShell>
  );
}
