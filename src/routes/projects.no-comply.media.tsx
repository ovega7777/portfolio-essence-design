import { CollectionNavigationFooter } from "@/components/no-comply/collection-navigation-footer";
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
import cof01 from "../assets/no-comply/caught-on-film/media-campaign/campaign-01.jpg";
import cof02 from "../assets/no-comply/caught-on-film/media-campaign/campaign-02.jpg";
import cof03 from "../assets/no-comply/caught-on-film/media-campaign/campaign-03.jpg";
import cof04 from "../assets/no-comply/caught-on-film/media-campaign/campaign-04.jpg";
import cof05 from "../assets/no-comply/caught-on-film/media-campaign/campaign-05.jpg";
import cof06 from "../assets/no-comply/caught-on-film/media-campaign/campaign-06.jpg";
import cof07 from "../assets/no-comply/caught-on-film/media-campaign/campaign-07.jpg";
import cof08 from "../assets/no-comply/caught-on-film/media-campaign/campaign-08.jpg";
import cof09 from "../assets/no-comply/caught-on-film/media-campaign/campaign-09.jpg";
import cof10 from "../assets/no-comply/caught-on-film/media-campaign/campaign-10.jpg";
import cof11 from "../assets/no-comply/caught-on-film/media-campaign/campaign-11.jpg";
import cof12 from "../assets/no-comply/caught-on-film/media-campaign/campaign-12.jpg";
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
    src: cof01,
    alt: "NO COMPLY horizontal filmstrip logotype artwork",
    collection: "caught-on-film",
    fullWidth: true,
  },
  {
    src: cof02,
    alt: "Model wearing a filmstrip scarf and carrying a matching tote bag",
    collection: "caught-on-film",
  },
  {
    src: cof03,
    alt: "Red filmstrip long-sleeve top with a black studded belt",
    collection: "caught-on-film",
  },
  {
    src: cof04,
    alt: "Portrait wearing a filmstrip beanie pulled over the eyes",
    collection: "caught-on-film",
  },
  {
    src: cof05,
    alt: "Model wearing red sunglasses, a filmstrip scarf, and a white NC-17 T-shirt",
    collection: "caught-on-film",
  },
  {
    src: cof06,
    alt: "Close-up portrait in a black filmstrip denim jacket",
    collection: "caught-on-film",
  },
  {
    src: cof07,
    alt: "Black studded The End velour tracksuit",
    collection: "caught-on-film",
  },
  {
    src: cof08,
    alt: "Model wearing a cropped black filmstrip denim jacket",
    collection: "caught-on-film",
  },
  {
    src: cof09,
    alt: "Portrait in a white studded The End tank top",
    collection: "caught-on-film",
  },
  {
    src: cof10,
    alt: "Model wearing The End trucker hat under a filmstrip scarf",
    collection: "caught-on-film",
  },
  {
    src: cof11,
    alt: "Caught on Film eight-frame campaign collage",
    collection: "caught-on-film",
    fullWidth: true,
  },
  {
    src: cof12,
    alt: "Square black-and-white filmstrip contact-sheet artwork",
    collection: "caught-on-film",
    fullWidth: true,
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
      <main className="nc-media-page nc-first-section mx-auto max-w-7xl px-6">
        <header className={`mb-8 flex items-end justify-between gap-8 ${active === "caught-on-film" ? "flex-wrap" : ""}`}>
          <div>
            <p className="nc-display text-xs uppercase tracking-[0.32em] text-black/55">
              No Comply USA
            </p>
            <h1 className="nc-display mt-4 text-6xl leading-none tracking-[0.02em] md:text-8xl">
              Media
            </h1>
          </div>
          <p className={`nc-display text-sm uppercase tracking-[0.24em] ${active === "command" ? "hidden sm:block" : ""}`}>
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
          <div className={`nc-media-grid grid grid-cols-1 items-stretch gap-px sm:grid-cols-2 ${active === "caught-on-film" ? "bg-white" : "bg-black"}`}>
            {visible.map((item, index) => {
              const topAlign = active === "caught-on-film";
              return (
                <figure
                  key={`${item.src}-${index}`}
                  className={`m-0 flex ${topAlign ? "items-start" : "items-center"} justify-center p-0 leading-none ${
                    item.type === "video" ? "bg-black" : "bg-white"
                  } ${item.fullWidth ? "nc-media-wide sm:col-span-full" : ""}`}
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
      <CollectionNavigationFooter nextPage="designs" />
    </EditorialPageShell>
  );
}
