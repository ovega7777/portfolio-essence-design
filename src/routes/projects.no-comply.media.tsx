import { createFileRoute } from "@tanstack/react-router";

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
}[] = [
  { src: commandEditorialLook01, alt: "No Comply Command campaign look", collection: "command" },
  { src: commandEditorialLook02, alt: "No Comply Command campaign portrait", collection: "command" },
  { src: commandAssortmentLook01, alt: "No Comply Command Eisenhower look", collection: "command" },
  { src: commandAssortmentLook02, alt: "No Comply Command Tiger Tee look", collection: "command" },
  { src: commandAssortmentLook03, alt: "No Comply Command hoodie look", collection: "command" },
  { src: commandAssortmentLook04, alt: "No Comply Command Sergeant Shirt look", collection: "command" },
  { src: media01.url, alt: "I Want You! No Comply USA showgirls poster artwork", collection: "command" },
  { src: media02.url, alt: "Portrait in patched flag cap and shearling-collar leather bomber", collection: "command" },
  { src: media03.url, alt: "Laced utility vest with black wide-leg cargo trousers", collection: "command" },
  { src: media04.url, alt: "Olive Comply showgirls tee with waxed canvas duffel bag", collection: "command" },
  { src: media05.url, alt: "Black multi-pocket cargo trousers with ribbed tank", collection: "command" },
  { src: media06.url, alt: "Olive corduroy zip knit hoodie with brown pleated trousers", collection: "command" },
  {
    src: media07.url,
    alt: "Upside-down black-and-white American flag",
    collection: "command",
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
  return (
    <EditorialPageShell>
      <main className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <header className="mb-12 flex items-end justify-between gap-8 border-b border-black pb-8">
          <div>
            <p className="nc-display text-xs uppercase tracking-[0.32em] text-black/55">
              No Comply Command
            </p>
            <h1 className="nc-display mt-4 text-6xl leading-none tracking-[0.02em] md:text-8xl">
              Media
            </h1>
          </div>
          <p className="nc-display hidden text-sm uppercase tracking-[0.24em] sm:block">
            {String(media.length).padStart(2, "0")} Campaign Images
          </p>
        </header>

        <div className="grid grid-cols-1 gap-px bg-black sm:grid-cols-2">
          {media.map((item) => (
            <figure key={item.src} className="bg-white">
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full object-contain"
              />
            </figure>
          ))}
        </div>
      </main>
    </EditorialPageShell>
  );
}

