import { createFileRoute, Link } from "@tanstack/react-router";

import commandEditorialLook01 from "../assets/no-comply/editorial/command-look-01.png";
import { EditorialPageShell } from "@/components/no-comply/editorial-page-shell";

export const Route = createFileRoute("/projects/no-comply/about")({
  head: () => ({
    meta: [
      { title: "About NO COMPLY USA · Nicholas Curzon" },
      {
        name: "description",
        content: "The concept, visual language, and creative direction behind NO COMPLY COMMAND.",
      },
    ],
  }),
  component: NoComplyAbout,
});

function NoComplyAbout() {
  return (
    <EditorialPageShell>
      <main>
        <header className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="nc-display text-xs uppercase tracking-[0.32em] text-black/55">
            Collection #1
          </p>
          <h1 className="nc-display mt-5 text-6xl leading-[0.9] tracking-[0.02em] md:text-8xl">
            About
            <br />
            No Comply
          </h1>
          <div className="mt-12 grid gap-10 border-t border-black pt-8 md:grid-cols-2">
            <p className="max-w-xl font-punk-body text-xl uppercase leading-relaxed tracking-[0.08em] md:text-2xl">
              No Comply Command is a study in refusal, uniform, and craft—built through military
              references, distressed surfaces, graphic insignia, and uncompromising silhouettes.
            </p>
            <div className="grid grid-cols-2 gap-px bg-black">
              <div className="bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/50">
                  Collection
                </p>
                <p className="nc-display mt-3 text-2xl">#1 Command</p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/50">
                  Format
                </p>
                <p className="nc-display mt-3 text-2xl">50 Pieces</p>
              </div>
            </div>
          </div>
        </header>

        <figure className="border-y-2 border-black bg-black">
          <img
            src={commandEditorialLook01}
            alt="No Comply Command editorial look"
            className="mx-auto block max-h-[88vh] w-full max-w-7xl object-cover object-top"
          />
        </figure>

        <div className="mx-auto flex max-w-7xl flex-wrap gap-4 px-6 py-12">
          <Link
            to="/projects/no-comply"
            search={{ cat: "all", sort: "order", q: "" }}
            className="border border-black bg-black px-6 py-3 font-punk-body text-lg uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-black"
          >
            View the collection
          </Link>
          <Link
            to="/projects/no-comply/media"
            className="border border-black px-6 py-3 font-punk-body text-lg uppercase tracking-[0.08em] transition-colors hover:bg-black hover:text-white"
          >
            View media
          </Link>
        </div>
      </main>
    </EditorialPageShell>
  );
}
