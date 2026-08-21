import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import commandEditorialLook01 from "../assets/no-comply/editorial/command-look-01.png";
import commandEditorialLook02 from "../assets/no-comply/editorial/command-look-02.png";
import commandAssortmentLook01 from "../assets/no-comply/editorial/command-assortment-gallery/look-01.png";
import commandAssortmentLook02 from "../assets/no-comply/editorial/command-assortment-gallery/look-02.png";
import commandAssortmentLook03 from "../assets/no-comply/editorial/command-assortment-gallery/look-03.png";
import commandAssortmentLook04 from "../assets/no-comply/editorial/command-assortment-gallery/look-04.png";
import media01 from "../assets/no-comply/media/media-01-comply-poster.png.asset.json";
import media02 from "../assets/no-comply/media/media-02-cap-portrait.png.asset.json";
import media03 from "../assets/no-comply/media/media-03-laced-vest-wide-cargo.png.asset.json";
import media04 from "../assets/no-comply/media/media-04-olive-tee-duffel.png.asset.json";
import media05 from "../assets/no-comply/media/media-05-multipocket-cargo.png.asset.json";
import media06 from "../assets/no-comply/media/media-06-olive-zip-knit.png.asset.json";
import media07 from "../assets/no-comply/media/media-07-flag.jpg.asset.json";
import media08 from "../assets/no-comply/media/media-08-oxblood-knit-pleated.png.asset.json";
import media09 from "../assets/no-comply/media/media-09-olive-anorak-back.png.asset.json";
import media10 from "../assets/no-comply/media/media-10-black-anorak-hood.png.asset.json";
import portfolioVideo from "../assets/no-comply/media/no-comply-portfolio.mp4.asset.json";
import cof01 from "../assets/no-comply/caught-on-film/cof-01-trim.png.asset.json";
import cof02 from "../assets/no-comply/caught-on-film/cof-02.png.asset.json";
import cof06 from "../assets/no-comply/caught-on-film/cof-06.png.asset.json";
import cof07 from "../assets/no-comply/caught-on-film/cof-07.png.asset.json";
import cof08 from "../assets/no-comply/caught-on-film/cof-08.png.asset.json";
import cof09 from "../assets/no-comply/caught-on-film/cof-09.png.asset.json";
import cof10 from "../assets/no-comply/caught-on-film/cof-10.png.asset.json";
import cof11 from "../assets/no-comply/caught-on-film/cof-11.png.asset.json";
import onFilmScarfModel2 from "../assets/products/caught-on-film/on-film-scarf/black-white/model-2.jpg";
import onFilmSkullCapModel1 from "../assets/products/caught-on-film/on-film-skull-cap/black-white/model-1.jpg";
import studdedBeltBlackModel1 from "../assets/products/caught-on-film/studded-belt/black/model-1.jpg";
import { EditorialPageShell } from "@/components/no-comply/editorial-page-shell";

type MediaCollection = "command" | "caught-on-film";

const filters: { id: MediaCollection; label: string }[] = [
  { id: "command", label: "No Comply Command" },
  { id: "caught-on-film", label: "Caught on Film" },
];

const media: {
  src: string;
  alt: string;
  collection: MediaCollection;
  fullWidth?: boolean;
  type?: "video";
}[] = [
  {
    src: portfolioVideo.url,
    alt: "No Comply Command portfolio film",
    collection: "command",
    fullWidth: true,
    type: "video",
  },
  { src: media01.url, alt: "I Want You! No Comply USA showgirls poster artwork", collection: "command" },
  { src: media02.url, alt: "Portrait in patched flag cap and shearling-collar leather bomber", collection: "command" },
  { src: commandEditorialLook01, alt: "No Comply Command campaign look", collection: "command" },
  { src: commandAssortmentLook01, alt: "No Comply Command Eisenhower look", collection: "command" },
  { src: commandAssortmentLook02, alt: "No Comply Command Tiger Tee look", collection: "command" },
  { src: commandAssortmentLook03, alt: "No Comply Command hoodie look", collection: "command" },
  {
    src: commandEditorialLook02,
    alt: "No Comply Command campaign portrait",
    collection: "command",
    fullWidth: true,
  },
  { src: media04.url, alt: "Olive Comply showgirls tee with waxed canvas duffel bag", collection: "command" },
  { src: media03.url, alt: "Laced utility vest with black wide-leg cargo trousers", collection: "command" },
  { src: media08.url, alt: "Oxblood ribbed zip knit hoodie with black wide-leg pleated trousers", collection: "command" },
  { src: commandAssortmentLook04, alt: "No Comply Command Sergeant Shirt look", collection: "command" },
  { src: media06.url, alt: "Olive corduroy zip knit hoodie with brown pleated trousers", collection: "command" },
  { src: media05.url, alt: "Black multi-pocket cargo trousers with ribbed tank", collection: "command" },
  { src: media09.url, alt: "Olive printed nylon anorak and balloon pants, back view with waist bag", collection: "command" },
  { src: media10.url, alt: "Black printed nylon buckle anorak worn with hood and mask", collection: "command" },
  {
    src: media07.url,
    alt: "Upside-down black-and-white American flag",
    collection: "command",
    fullWidth: true,
  },
  {
    src: cof01.url,
    alt: "NO COMPLY film-strip logotype artwork",
    collection: "caught-on-film",
    fullWidth: true,
  },
  {
    src: cof02.url,
    alt: "Model in film-strip headscarf and NC-17 rated white tee",
    collection: "caught-on-film",
  },
  {
    src: onFilmScarfModel2,
    alt: "Model with film-strip headscarf carrying the film-strip tote bag",
    collection: "caught-on-film",
  },
  {
    src: studdedBeltBlackModel1,
    alt: "Model in red film-strip mesh long-sleeve top with black wide-leg denim",
    collection: "caught-on-film",
  },
  {
    src: onFilmSkullCapModel1,
    alt: "Portrait in film-strip printed beanie pulled over the eyes",
    collection: "caught-on-film",
  },
  {
    src: cof06.url,
    alt: "Caught on Film contact sheet of eight campaign frames",
    collection: "caught-on-film",
    fullWidth: true,
  },
  {
    src: cof07.url,
    alt: "Model in white ribbed The End tank top against a red backdrop",
    collection: "caught-on-film",
  },
  {
    src: cof08.url,
    alt: "Cropped film-strip printed denim jacket with matching wide-leg jeans",
    collection: "caught-on-film",
  },
  {
    src: cof09.url,
    alt: "Black studded velour The End track jacket and matching trousers",
    collection: "caught-on-film",
  },
  {
    src: cof10.url,
    alt: "NC-17 No Comply USA cap worn over a film-strip printed headscarf with red lens sunglasses",
    collection: "caught-on-film",
  },
  {
    src: cof11.url,
    alt: "Black-and-white film-strip contact print artwork",
    collection: "caught-on-film",
  },
  {
    src: cof11.url,
    alt: "Black-and-white film-strip contact print artwork, repeated panel",
    collection: "caught-on-film",
  },
];

export const Route = createFileRoute("/projects/no-comply/media")({
  head: () => ({
    meta: [
      { title: "NO COMPLY USA Media · Nicholas Curzon" },
      {
        name: "description",
        content: "Campaign and collection imagery from NO COMPLY COMMAND.",
      },
    ],
  }),
  component: NoComplyMedia,
});

function NoComplyMedia() {
  const [active, setActive] = useState<MediaCollection>("command");
  const visible = media.filter((item) => item.collection === active);

  return (
    <EditorialPageShell pageName="MEDIA">
      <main className="nc-first-section mx-auto max-w-7xl px-6 pb-20 md:pb-28">
        <header className="mb-8 flex items-end justify-between gap-8">
          <div>
            <p className="nc-display text-xs uppercase tracking-[0.32em] text-black/55">
              No Comply USA
            </p>
            <h1 className="nc-display mt-4 text-6xl leading-none tracking-[0.02em] md:text-8xl">
              Media
            </h1>
          </div>
          <p className="nc-display hidden text-sm uppercase tracking-[0.24em] sm:block">
            {String(visible.length).padStart(2, "0")} Campaign Images
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Filter media by collection"
          className="mb-12 flex flex-wrap items-center gap-4 border-b border-black pb-4"
        >
          {filters.map((filter) => {
            const isActive = filter.id === active;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(filter.id)}
                className={`nc-display min-h-14 w-[calc(50%-0.5rem)] min-w-0 px-5 text-[17px] uppercase tracking-[0.24em] transition-colors md:min-h-[72px] md:w-[280px] md:px-8 md:text-[22px] ${
                  isActive
                    ? "bg-black text-white"
                    : "text-black/55 hover:text-black"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className="nc-display py-24 text-center text-sm uppercase tracking-[0.24em] text-black/55">
            No campaign imagery yet
          </p>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-px bg-black sm:grid-cols-2">
            {visible.map((item, index) => {
              const topAlignFirstPair =
                active === "caught-on-film" && (index === 1 || index === 2);
              return (
                <figure
                  key={`${item.src}-${index}`}
                  className={`m-0 flex ${topAlignFirstPair ? "items-start" : "items-center"} justify-center p-0 leading-none ${
                    item.type === "video" ? "bg-black" : "bg-white"
                  } ${item.fullWidth ? "sm:col-span-full" : ""}`}
                >
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      controls
                      playsInline
                      preload="metadata"
                      aria-label={item.alt}
                      className="block h-auto w-full bg-black object-contain"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full object-contain"
                    />
                  )}
                </figure>
              );
            })}
          </div>
        )}
      </main>
    </EditorialPageShell>
  );
}
