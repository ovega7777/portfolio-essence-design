import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { Search, X } from "lucide-react";
import { z } from "zod";

import noComplyUsaLogoBlack from "../assets/no-comply-usa-logo-black-cropped.png.asset.json";
import upsideDownAmericanFlag from "../assets/no-comply/editorial/upside-down-american-flag.jpg";
import commandEditorialLook01 from "../assets/no-comply/editorial/command-look-01.png";
import commandEditorialLook02 from "../assets/no-comply/editorial/command-look-02.png";

import caughtOnFilmHeader from "../assets/no-comply/caught-on-film/caught-on-film-header.png";
import { getCategories, products } from "@/data/products";
import { CollectionCarousel, type CarouselItem } from "@/components/no-comply/collection-carousel";
import { collections } from "@/data/collections";
import { LogoBannerHUD } from "@/components/no-comply/logo-banner-hud";

const COMMAND = collections[0];
const CATEGORIES = getCategories();
const CAUGHT_ON_FILM = collections[1];
const MENU_CATEGORIES = ["Outerwear", "Tops", "Bottoms", "Accessories"];

const toCarouselItems = (
  collectionId: string,
  featuredOnly = false,
  caughtOnFilm = false,
): CarouselItem[] => {
  const seenStyles = new Set<string>();

  return products
    .filter(
      (product) => product.collectionId === collectionId && (!featuredOnly || product.featured),
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
      return {
        key: product.id,
        productName: product.name,
        collectionSlug: collectionId === COMMAND.id ? "command" : "caught-on-film",
        image:
          caughtOnFilm && !isAccessory
            ? variant.images.frontProduct
            : (variant.images.modelFront ?? variant.images.frontProduct),
      };
    });
};

const COMMAND_CAROUSEL = toCarouselItems(COMMAND.id);
const CAUGHT_ON_FILM_CAROUSEL = toCarouselItems(CAUGHT_ON_FILM.id, true, true);

const SORTS = ["order", "featured", "az", "za", "price-asc", "price-desc"] as const;
const searchSchema = z.object({
  cat: fallback(z.string(), "all").default("all"),
  sort: fallback(z.enum(SORTS), "order").default("order"),
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/projects/no-comply")({
  validateSearch: zodValidator(searchSchema),
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusMenuSearch, setFocusMenuSearch] = useState(false);
  const [menuQuery, setMenuQuery] = useState("");
  const navigate = Route.useNavigate();

  const openProductSearch = () => {
    setFocusMenuSearch(true);
    setMenuOpen(true);
  };
  const openProductMenu = () => {
    setFocusMenuSearch(false);
    setMenuOpen(true);
  };
  const goToDesigns = (cat: string, q = "") => {
    setMenuOpen(false);
    navigate({ to: "/projects/no-comply/designs", search: { cat, sort: "order", q } });
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="no-comply min-h-screen bg-white text-black">
      <div className="sticky top-0 z-[100] w-full">
        <nav className="w-full border-b border-white/20 bg-black text-white">
          <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
            <Link
              to="/"
              className="nc-display shrink-0 text-lg tracking-widest text-white transition-colors duration-200 hover:text-white/60 sm:text-xl"
            >
              <span className="sm:hidden">← NC</span>
              <span className="hidden sm:inline">← Nicholas Curzon</span>
            </Link>
            <span className="nc-display ml-auto hidden text-base tracking-[0.3em] text-white lg:block lg:text-lg">
              NO COMPLY USA / CASE STUDY
            </span>
          </div>
        </nav>
        <LogoBannerHUD
          src={noComplyUsaLogoBlack.url}
          menuOpen={menuOpen}
          onSearch={openProductSearch}
          onMenu={openProductMenu}
          theme="dark"
        />
      </div>


      {menuOpen && (
        <div className="fixed inset-0 z-[120]">
          <button
            type="button"
            aria-label="Close product menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 cursor-default bg-black/45"
          />
          <aside
            aria-label="Product navigation"
            className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col overflow-y-auto border-l border-black/10 bg-white px-6 py-6 text-black shadow-2xl sm:px-9 sm:py-8"
          >
            <div className="flex items-start justify-between gap-6 border-b border-black/15 pb-6">
              <p className="nc-display text-4xl leading-none tracking-[0.04em] sm:text-5xl">
                NO COMPLY
              </p>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-45"
              >
                Close
                <X aria-hidden className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                goToDesigns("all", menuQuery);
              }}
              className="mt-6 flex h-14 items-center gap-4 border border-black/25 bg-white px-4 transition-colors focus-within:border-black"
            >
              <input
                type="search"
                value={menuQuery}
                onChange={(event) => setMenuQuery(event.target.value)}
                autoFocus={focusMenuSearch}
                placeholder="Search products"
                aria-label="Search products in menu"
                className="min-w-0 flex-1 bg-transparent font-punk-body text-lg tracking-[0.06em] text-black placeholder:text-black/40 focus:outline-none"
              />
              <button type="submit" aria-label="Search">
                <Search aria-hidden className="h-5 w-5 shrink-0" strokeWidth={1.5} />
              </button>
            </form>

            <nav
              aria-label="No Comply editorial pages"
              className="mt-7 flex flex-col items-start border-t border-black/10"
            >
              <Link
                to="/projects/no-comply/about"
                onClick={() => setMenuOpen(false)}
                className="w-full border-b border-black/10 py-6 font-punk-body text-xl uppercase tracking-[0.06em] transition-opacity hover:opacity-45"
              >
                About
              </Link>
              <Link
                to="/projects/no-comply/media"
                onClick={() => setMenuOpen(false)}
                className="w-full border-b border-black/10 py-6 font-punk-body text-xl uppercase tracking-[0.06em] transition-opacity hover:opacity-45"
              >
                Media
              </Link>
            </nav>

            <div className="mt-7 border-t border-black/10 pt-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-black/55">
                Collections
              </p>
              <div className="mt-5 flex flex-col items-start gap-3">
                <Link
                  to="/projects/no-comply/command"
                  search={{ cat: "all", sort: "order", q: "" }}
                  onClick={() => setMenuOpen(false)}
                  className="whitespace-nowrap text-left font-punk-body text-xl uppercase tracking-[0.06em] transition-opacity hover:opacity-45"
                >
                  #1 No Comply Command
                </Link>
                <Link
                  to="/projects/no-comply/caught-on-film"
                  search={{ cat: "all", q: "" }}
                  onClick={() => setMenuOpen(false)}
                  className="whitespace-nowrap text-left font-punk-body text-xl uppercase tracking-[0.06em] transition-opacity hover:opacity-45"
                >
                  #2 Caught on Film
                </Link>
              </div>
            </div>

            <div className="mt-7 border-t border-black/10 pt-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-black/55">
                Designs
              </p>
              <div className="mt-5 flex flex-col items-start gap-3.5">
                <button
                  type="button"
                  onClick={() => goToDesigns("all")}
                  className="font-punk-body text-xl uppercase tracking-[0.06em] transition-opacity hover:opacity-45"
                >
                  All Designs
                </button>
                {MENU_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => goToDesigns(category)}
                    className="font-punk-body text-xl uppercase tracking-[0.06em] transition-opacity hover:opacity-45"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}

      <main>
        <section className="bg-white px-6 pb-10 pt-20 text-black md:px-12 md:pb-14 md:pt-28">

          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="nc-display text-xs tracking-[0.35em] text-black/60">Collection #1</p>
                <div className="mt-3 flex flex-nowrap items-center gap-3 text-5xl md:gap-5 md:text-8xl">
                  <Link
                    to="/projects/no-comply/command"
                    search={{ cat: "all", sort: "order", q: "" }}
                    className="nc-display inline-flex min-w-0 items-center whitespace-nowrap leading-none tracking-[0.03em] text-black transition-opacity hover:opacity-55"
                  >
                    No Comply Command
                  </Link>
                  <img
                    src={upsideDownAmericanFlag}
                    alt="Upside-down black-and-white American flag"
                    className="inline-block h-[0.7em] w-auto shrink-0 object-contain"
                  />
                </div>
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
              <div className="grid aspect-[1672/940] w-full grid-cols-2 gap-px bg-black/20 transition-transform duration-700 group-hover:scale-[1.01]">
                <img
                  src={commandEditorialLook01}
                  alt="No Comply Command editorial look with Captain's Jacket and Cargo Messenger Bag"
                  className="h-full w-full bg-white object-cover object-top"
                  loading="lazy"
                />
                <img
                  src={commandEditorialLook02}
                  alt="No Comply Command editorial look with black and navy Sergeant Shirts"
                  className="h-full w-full bg-white object-cover object-top"
                  loading="lazy"
                />
              </div>
            </Link>

            <CollectionCarousel items={COMMAND_CAROUSEL} label="No Comply Command" />
          </div>
        </section>

        <section className="border-b-2 border-black bg-white px-6 pb-20 pt-10 text-black md:px-12 md:pb-28 md:pt-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
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
              <div className="aspect-[1672/940] w-full overflow-hidden">
                <img
                  src={caughtOnFilmHeader}
                  alt="Caught on Film collection contact sheet"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.01]"
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
              <br />
              Craft is not.
            </p>
            <div className="mt-6 h-px w-24 bg-white md:mt-8" />
            <p className="mt-6 font-punk-body text-base uppercase leading-relaxed tracking-[0.15em] text-white/80 md:mt-8 md:text-lg">
              Every garment starts as a pattern. Every pattern starts as a refusal — to smooth the
              edges, to trend-chase, to make it easy. No Comply is what happens when a designer&apos;s
              hand meets an operator&apos;s stubbornness.
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
