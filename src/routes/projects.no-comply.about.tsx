import { CollectionNavigationFooter } from "@/components/no-comply/collection-navigation-footer";
import { createFileRoute } from "@tanstack/react-router";

import { EditorialPageShell } from "@/components/no-comply/editorial-page-shell";
import wordmark from "@/assets/no-comply/wordmark.png";

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
      <main className="nc-about-page nc-first-section mx-auto max-w-7xl px-6">
        <header>
          <h1 className="nc-display text-6xl leading-none tracking-[0.02em] md:text-8xl">
            ABOUT
          </h1>
        </header>

        <section className="mt-6 grid gap-10 border-t-2 border-black pt-8 md:mt-8 md:grid-cols-2 md:gap-14 md:pt-10 lg:gap-20">
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

        <img
          src={wordmark}
          alt="NO COMPLY USA"
          className="mx-auto mt-10 block h-auto w-[85%] max-w-[640px] invert min-[769px]:mt-32 min-[769px]:w-full"
        />
      </main>
      <CollectionNavigationFooter nextPage="media" />
    </EditorialPageShell>
  );
}
