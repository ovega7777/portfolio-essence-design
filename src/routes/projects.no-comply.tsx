import { CollectionNavigationFooter } from "@/components/no-comply/collection-navigation-footer";
import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";

import commandEditorialLook01 from "../assets/no-comply/home/command-portrait.jpg";
import commandEditorialLook02 from "../assets/no-comply/home/command-seated.jpg";

import caughtOnFilmHomeCover from "../assets/no-comply/home/caught-on-film.jpg";
import { getCategories, getProductThumbnailImage, usesDetailPrimaryImage, products } from "@/data/products";
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
        price: product.price,
        productImage: specialtyThumbnail,
        modelImage: usesDetailPrimaryImage(product) ? undefined : variant.images.modelFront,
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
type CollectionCoverImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

function CollectionCover({ images }: { images: CollectionCoverImage[] }) {
  return (
    <div
      className="collection-cover mx-auto grid w-full min-w-0 max-w-7xl items-start gap-px border border-black/20"
      // Natural aspect ratios give the portrait/square pair a 3:4 column split
      // (42.86% / 57.14%) and equal heights without cropping either original.
      style={{ gridTemplateColumns: images.map(({ width, height }) => `minmax(0, ${width / height}fr)`).join(" ") }}
    >
      {images.map((image) => (
        <img
          key={image.src}
          {...image}
          className="block h-auto w-full min-w-0 object-contain object-center"
          loading="lazy"
        />
      ))}
    </div>
  );
}

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
    <div className="no-comply nc-mobile-home min-h-screen bg-white text-black">
      <NoComplySiteHeader pageName="HOME" />

      <main>
        <section className="nc-home-collection nc-first-section bg-white px-6 text-black md:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="nc-home-collection-heading mb-5 flex flex-wrap items-end justify-between gap-5 md:mb-6">
              <div>
                <NoComplyCommandTitle linked />
              </div>
              <Link
                to="/projects/no-comply/command"
                search={{ cat: "all", sort: "order" }}
                className="nc-display border-b border-black pb-1 text-sm tracking-[0.25em] text-black transition-opacity hover:opacity-55"
              >
                Enter Collection →
              </Link>
            </div>
            <Link
              to="/projects/no-comply/command"
              search={{ cat: "all", sort: "order" }}
              aria-label="Open No Comply Command, Collection #1"
              className="block w-full min-w-0"
            >
              <CollectionCover
                images={[
                  {
                    src: commandEditorialLook01,
                    alt: "No Comply Command editorial look with Captain's Jacket and Cargo Messenger Bag",
                    width: 960,
                    height: 1280,
                  },
                  {
                    src: commandEditorialLook02,
                    alt: "No Comply Command editorial look with black and navy Sergeant Shirts",
                    width: 1254,
                    height: 1254,
                  },
                ]}
              />
            </Link>

            <CollectionCarousel
              items={COMMAND_CAROUSEL}
              label="No Comply Command"
              collectionSlug="command"
            />
          </div>
        </section>

        <section className="nc-home-collection border-b-2 border-black bg-white px-6 py-6 text-black md:px-12 lg:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="nc-home-collection-heading mb-5 flex flex-wrap items-end justify-between gap-5 md:mb-6">
              <div>
                <Link
                  to="/projects/no-comply/caught-on-film"
                  search={{ cat: "all" }}
                  className="nc-display block text-5xl leading-none tracking-[0.03em] text-black transition-opacity hover:opacity-55 md:text-8xl"
                >
                  Caught on Film
                </Link>
              </div>
              <Link
                to="/projects/no-comply/caught-on-film"
                search={{ cat: "all" }}
                className="nc-display border-b border-black pb-1 text-sm tracking-[0.25em] text-black transition-opacity hover:opacity-55"
              >
                Enter Collection →
              </Link>
            </div>
            <Link
              to="/projects/no-comply/caught-on-film"
              search={{ cat: "all" }}
              aria-label="Open Caught on Film, Collection #2"
              className="block w-full min-w-0"
            >
              <CollectionCover
                images={[
                  {
                    src: caughtOnFilmHomeCover,
                    alt: "Caught on Film collection contact sheet",
                    width: 1280,
                    height: 720,
                  },
                ]}
              />
            </Link>
            <CollectionCarousel
              items={CAUGHT_ON_FILM_CAROUSEL}
              label="Caught on Film"
              collectionSlug="caught-on-film"
            />
          </div>
        </section>

        <section className="border-b-2 border-black bg-black px-6 py-14 text-white md:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="nc-display mb-5 text-xs tracking-[0.4em] text-white">Manifesto</p>
            <p className="nc-display text-4xl leading-[1.05] tracking-[0.02em] md:text-6xl">
              NO COMPLY OR DIE.
            </p>
            <div className="mt-5 h-px w-24 bg-white md:mt-6" />
            <p className="mt-5 font-punk-body text-base uppercase leading-relaxed tracking-[0.15em] text-white/80 md:mt-6 md:text-lg">
              NO COMPLY USA rejects fixed definitions of how American clothing should look, who
              should wear it, and where inspiration should come from. The brand embraces that
              complexity, combining references across history and counterculture to create unisex
              clothing that resists classification and leaves room for individuality.
            </p>
          </div>
        </section>

        <section className="px-6 pt-10 md:pt-12">
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
              search={{ cat: "all", sort: "order" }}
              className="group flex min-h-20 items-center justify-center border border-black bg-white p-4 text-center text-black transition-colors duration-200 hover:bg-black hover:text-white"
            >
              <p className="nc-display text-xl">No Comply Command</p>
            </Link>
          </div>
        </section>
      </main>

      <CollectionNavigationFooter nextPage="lucky-day-co" />
    </div>
  );
}
