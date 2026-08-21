import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";

import commandEditorialLook01 from "../assets/no-comply/editorial/command-look-01.png";
import commandEditorialLook02 from "../assets/no-comply/editorial/command-look-02.png";

import caughtOnFilmHomeCover from "../assets/no-comply/caught-on-film/caught-on-film-home-cover.jpg";
import { getCategories, getProductThumbnailImage, products } from "@/data/products";
import { CollectionCarousel, type CarouselItem } from "@/components/no-comply/collection-carousel";
import { collections } from "@/data/collections";
import { NoComplyCommandTitle } from "@/components/no-comply/no-comply-command-title";
import { NoComplySiteHeader } from "@/components/no-comply/site-header";

const COMMAND = collections[0];
const CATEGORIES = getCategories();
const CAUGHT_ON_FILM = collections[1];
const COMMAND_APPAREL_CATEGORIES = new Set(["outerwear", "tops", "bottoms"]);

const toCarouselItems = (
  collectionId: string,
  featuredOnly = false,
  caughtOnFilm = false,
): CarouselItem[] => {
  const seenStyles = new Set<string>();

  return products
    .filter(
      (product) =>
        product.collectionId === collectionId &&
        (!featuredOnly || product.featured) &&
        (collectionId !== COMMAND.id ||
          COMMAND_APPAREL_CATEGORIES.has(product.category.toLowerCase())),
    )
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .filter((product) => {
      const styleKey = product.swatchGroup ?? product.name;
      if (seenStyles.has(styleKey)) return false;
      seenStyles.add(styleKey);
      return true;
    })
    .map((product) => {
      const variant = product.variants[0];
      const isAccessory = product.category.toLowerCase() === "accessories";
      const specialtyThumbnail = getProductThumbnailImage(product, variant);
      return {
        key: product.id,
        productName: product.name,
        collectionSlug: collectionId === COMMAND.id ? "command" : "caught-on-film",
        image:
          collectionId === COMMAND.id || (caughtOnFilm && !isAccessory)
            ? specialtyThumbnail
            : specialtyThumbnail !== variant.images.frontProduct
              ? specialtyThumbnail
              : (variant.images.modelFront ?? variant.images.frontProduct),
      };
    });
};

const COMMAND_CAROUSEL = toCarouselItems(COMMAND.id);
const CAUGHT_ON_FILM_CAROUSEL = toCarouselItems(CAUGHT_ON_FILM.id, true, true);
const COLLECTION_FEATURE_MEDIA_CLASS = "aspect-[16/9] sm:aspect-[5/2] lg:aspect-[3/1]";

export const Route = createFileRoute("/projects/no-comply")({
  head: () => ({
    meta: [
      { title: "NO COMPLY USA — Collections · Nicholas Curzon" },
      {
        name: "description",
        content:
          "NO COMPLY USA by Nicholas Curzon — Collection #1 No Comply Command and Collection #2 Caught on Film.",
      },
      { property: "og:title", content: "NO COMPLY USA — Collections" },
      {
        property: "og:description",
        content: "Two collections: No Comply Command and Caught on Film.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NoComply,
});

function NoComply() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (pathname !== "/projects/no-comply") {
    return <Outlet />;
  }

  return <NoComplyHome />;
}

function NoComplyHome() {
  return (
    <div className="no-comply min-h-screen bg-white text-black">
      <NoComplySiteHeader pageName="HOME" />

      <main>
        <section className="nc-first-section bg-white px-6 pb-10 text-black md:px-12 md:pb-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-5 md:mb-6">
              <div>
                <p className="nc-display text-xs tracking-[0.35em] text-black/60">Collection #1</p>
                <NoComplyCommandTitle linked className="mt-3" />
              </div>
              <Link
                to="/projects/no-comply/command"
                search={{ cat: "all", sort: "order", q: "" }}
                className="nc-display border-b border-black pb-1 text-sm tracking-[0.25em] text-black transition-opacity hover:opacity-55"
              >
                Enter Collection →
              </Link>
            </div>
            <Link
              to="/projects/no-comply/command"
              search={{ cat: "all", sort: "order", q: "" }}
              aria-label="Open No Comply Command, Collection #1"
              className="group block w-full max-w-7xl overflow-hidden border border-black/20"
            >
              <div
                className={`grid min-h-0 w-full grid-cols-2 gap-px overflow-hidden bg-black/20 transition-transform duration-700 group-hover:scale-[1.01] ${COLLECTION_FEATURE_MEDIA_CLASS}`}
              >
                <img
                  src={commandEditorialLook01}
                  alt="No Comply Command editorial look with Captain's Jacket and Cargo Messenger Bag"
                  className="h-full min-h-0 w-full bg-white object-cover object-[center_28%]"
                  loading="lazy"
                />
                <img
                  src={commandEditorialLook02}
                  alt="No Comply Command editorial look with black and navy Sergeant Shirts"
                  className="h-full min-h-0 w-full bg-white object-cover object-[center_34%]"
                  loading="lazy"
                />
              </div>
            </Link>

            <CollectionCarousel items={COMMAND_CAROUSEL} label="No Comply Command" />
          </div>
        </section>

        <section className="border-b-2 border-black bg-white px-6 pb-20 pt-10 text-black md:px-12 md:pb-28 md:pt-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-5 md:mb-6">
              <div>
                <p className="nc-display text-xs tracking-[0.35em] text-black/60">Collection #2</p>
                <Link
                  to="/projects/no-comply/caught-on-film"
                  search={{ cat: "all", q: "" }}
                  className="nc-display mt-3 block text-5xl leading-none tracking-[0.03em] text-black transition-opacity hover:opacity-55 md:text-8xl"
                >
                  Caught on Film
                </Link>
              </div>
              <Link
                to="/projects/no-comply/caught-on-film"
                search={{ cat: "all", q: "" }}
                className="nc-display border-b border-black pb-1 text-sm tracking-[0.25em] text-black transition-opacity hover:opacity-55"
              >
                Enter Collection →
              </Link>
            </div>
            <Link
              to="/projects/no-comply/caught-on-film"
              search={{ cat: "all", q: "" }}
              aria-label="Open Caught on Film, Collection #2"
              className="block w-full max-w-7xl overflow-hidden border border-black/20"
            >
              <div className={`w-full overflow-hidden ${COLLECTION_FEATURE_MEDIA_CLASS}`}>
                <img
                  src={caughtOnFilmHomeCover}
                  alt="Caught on Film collection contact sheet"
                  className="h-full w-full bg-black object-contain object-center transition-transform duration-700 hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </Link>
            <CollectionCarousel items={CAUGHT_ON_FILM_CAROUSEL} label="Caught on Film" />
          </div>
        </section>

        <section className="border-b-2 border-black bg-black px-6 py-14 text-white md:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="nc-display mb-5 text-xs tracking-[0.4em] text-white">Manifesto</p>
            <p className="nc-display text-4xl leading-[1.05] tracking-[0.02em] md:text-6xl">
              Compliance is optional.
            </p>
            <div className="mt-5 h-px w-24 bg-white md:mt-6" />
            <p className="mt-5 font-punk-body text-base uppercase leading-relaxed tracking-[0.15em] text-white/80 md:mt-6 md:text-lg">
              NO COMPLY USA draws from the contradictions, communities, and countercultures that
              continue to shape American identity. Unisex and unrestricted by a single aesthetic,
              the brand treats clothing as open territory for experimentation, resistance, and
              self-expression.
            </p>
          </div>
        </section>

        <section className="border-b-2 border-black px-6 py-10 md:py-12">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            <Link
              to="/projects/no-comply/media"
              className="group flex min-h-20 items-center justify-center border border-black bg-white p-4 text-center text-black transition-colors duration-200 hover:bg-black hover:text-white"
            >
              <p className="nc-display text-xl">Media</p>
            </Link>
            <Link
              to="/projects/no-comply/about"
              className="group flex min-h-20 items-center justify-center border border-black bg-white p-4 text-center text-black transition-colors duration-200 hover:bg-black hover:text-white"
            >
              <p className="nc-display text-xl">About</p>
            </Link>
            <Link
              to="/projects/no-comply/command"
              search={{ cat: "all", sort: "order", q: "" }}
              className="group flex min-h-20 items-center justify-center border border-black bg-white p-4 text-center text-black transition-colors duration-200 hover:bg-black hover:text-white"
            >
              <p className="nc-display text-xl">No Comply Command</p>
            </Link>
          </div>
        </section>
      </main>

      <footer className="px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
          <div>
            <p className="nc-display text-sm tracking-[0.3em] text-black">Next Up</p>
            <Link
              to="/projects/lucky-day-co"
              className="nc-display text-4xl text-black hover:text-black/60"
            >
              Lucky Day Co →
            </Link>
          </div>
          <Link
            to="/projects"
            className="nc-display border-b-2 border-black pb-1 text-sm tracking-[0.3em] text-black hover:border-black/60 hover:text-black/60"
          >
            ← All Projects
          </Link>
        </div>
      </footer>
    </div>
  );
}
