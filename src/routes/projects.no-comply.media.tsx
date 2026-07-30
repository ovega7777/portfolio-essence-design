import { createFileRoute } from "@tanstack/react-router";

import commandEditorialLook01 from "../assets/no-comply/editorial/command-look-01.png";
import commandEditorialLook02 from "../assets/no-comply/editorial/command-look-02.png";
import commandAssortmentLook01 from "../assets/no-comply/editorial/command-assortment-gallery/look-01.png";
import commandAssortmentLook02 from "../assets/no-comply/editorial/command-assortment-gallery/look-02.png";
import commandAssortmentLook03 from "../assets/no-comply/editorial/command-assortment-gallery/look-03.png";
import commandAssortmentLook04 from "../assets/no-comply/editorial/command-assortment-gallery/look-04.png";
import { EditorialPageShell } from "@/components/no-comply/editorial-page-shell";

const media = [
  { src: commandEditorialLook01, alt: "No Comply Command campaign look" },
  { src: commandEditorialLook02, alt: "No Comply Command campaign portrait" },
  { src: commandAssortmentLook01, alt: "No Comply Command Eisenhower look" },
  { src: commandAssortmentLook02, alt: "No Comply Command Tiger Tee look" },
  { src: commandAssortmentLook03, alt: "No Comply Command hoodie look" },
  { src: commandAssortmentLook04, alt: "No Comply Command Sergeant Shirt look" },
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
            06 Campaign Images
          </p>
        </header>

        <div className="grid grid-cols-1 gap-px bg-black sm:grid-cols-2">
          {media.map((item) => (
            <figure key={item.src} className="bg-white">
              <img
                src={item.src}
                alt={item.alt}
                className="block h-full min-h-[420px] w-full object-cover object-top"
              />
            </figure>
          ))}
        </div>
      </main>
    </EditorialPageShell>
  );
}
