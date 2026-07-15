import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "../assets/no-comply-hero.jpg";
import teeBlack from "../assets/militia/tee-black.png.asset.json";
import teeWhite from "../assets/militia/tee-white.png.asset.json";
import teeOlive from "../assets/militia/tee-olive.png.asset.json";
import teeCamo from "../assets/militia/tee-camo.png.asset.json";
import knitHoodie from "../assets/militia/knit-hoodie.png.asset.json";
import fieldShirt from "../assets/militia/field-shirt.png.asset.json";
import nylonPants from "../assets/militia/nylon-pants.png.asset.json";
import trousers from "../assets/militia/trousers.png.asset.json";
import cap from "../assets/militia/cap.png.asset.json";
import zippo from "../assets/militia/zippo.png.asset.json";

const militia = [
  { img: fieldShirt, name: "Field Shirt", code: "M-01", type: "Outerwear" },
  { img: knitHoodie, name: "Rib Knit Hoodie", code: "M-02", type: "Knitwear" },
  { img: nylonPants, name: "Nylon Wide Trouser", code: "M-03", type: "Bottoms" },
  { img: trousers, name: "Pleated Wide Trouser", code: "M-04", type: "Bottoms" },
  { img: teeBlack, name: "Comply Baby Tee — Black", code: "M-05", type: "Tee" },
  { img: teeWhite, name: "Comply Baby Tee — White", code: "M-06", type: "Tee" },
  { img: teeOlive, name: "Comply Baby Tee — Olive", code: "M-07", type: "Tee" },
  { img: teeCamo, name: "USA Camo Tee", code: "M-08", type: "Tee" },
  { img: cap, name: "Distressed Militia Cap", code: "M-09", type: "Headwear" },
  { img: zippo, name: "Bury Me Face Down Zippo", code: "M-10", type: "Object" },
];

export const Route = createFileRoute("/projects/no-comply")({
  head: () => ({
    meta: [
      { title: "NO COMPLY — Nicholas Curzon" },
      {
        name: "description",
        content:
          "NO COMPLY: a raw brutalist visual system and moodboard for a technical apparel concept by Nicholas Curzon.",
      },
      { property: "og:title", content: "NO COMPLY — Nicholas Curzon" },
      {
        property: "og:description",
        content:
          "Punk zine visual system and moodboard for a technical apparel concept.",
      },
    ],
  }),
  component: NoComply,
});

function NoComply() {
  return (
    <div className="no-comply min-h-screen">
      {/* Punk nav */}
      <nav className="sticky top-0 z-50 border-b-2 border-nc-ink bg-nc-ink text-nc-cream">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link
            to="/"
            className="nc-display text-xl tracking-widest text-nc-cream hover:text-nc-red"
          >
            ← N. Curzon
          </Link>
          <span className="nc-display text-sm tracking-[0.3em] text-nc-red">
            No Comply / Case Study
          </span>
        </div>
        <div
          className="h-2"
          style={{
            background:
              "repeating-linear-gradient(90deg, var(--nc-red) 0 20px, var(--nc-ink) 20px 40px)",
          }}
        />
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden border-b-4 border-nc-ink px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="nc-display mb-6 inline-block bg-nc-red px-3 py-1 text-sm text-nc-cream tracking-[0.3em]">
            Vol. 01 — Raw Cut
          </p>
          <h1 className="nc-display text-[clamp(3.5rem,12vw,10rem)] leading-[0.85] text-nc-ink">
            NO
            <br />
            <span className="nc-scribble-underline">COMPLY</span>
          </h1>
          <p className="mt-10 max-w-2xl font-punk-body text-lg uppercase tracking-wide text-nc-ink md:text-xl">
            A brutalist visual system for a technical apparel concept. Cut,
            paste, xerox, repeat. No stylist. No safety net.
          </p>
        </div>

        {/* Stickers */}
        <div className="nc-star absolute right-8 top-8 hidden md:block" />
        <div
          className="absolute bottom-6 left-8 hidden rotate-[-8deg] md:block"
          aria-hidden
        >
          <span className="nc-display bg-nc-ink px-3 py-1 text-nc-cream tracking-widest">
            USA / 2025
          </span>
        </div>
      </header>

      {/* Big collage */}
      <section className="border-b-4 border-nc-ink px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="nc-tile nc-tape">
            <img
              src={hero}
              alt="No Comply — brutalist streetwear collage"
              width={1600}
              height={900}
              className="block w-full"
            />
          </div>
        </div>
      </section>

      {/* Moodboard tiles */}
      <section className="border-b-4 border-nc-ink px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex items-center justify-between">
            <h2 className="nc-title text-3xl md:text-5xl">The Moodboard</h2>
            <span className="nc-display text-sm tracking-[0.3em] text-nc-ink">
              // 06 fragments
            </span>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-12">
            {[
              { tilt: "nc-tilt-l", label: "Cut" },
              { tilt: "nc-tilt-r", label: "Paste" },
              { tilt: "nc-tilt-hl", label: "Xerox" },
              { tilt: "nc-tilt-r", label: "Tape" },
              { tilt: "nc-tilt-hr", label: "Riot" },
              { tilt: "nc-tilt-l", label: "Repeat" },
            ].map((t, i) => (
              <div
                key={i}
                className={`nc-tile aspect-square ${t.tilt} ${
                  i % 3 === 1 ? "nc-tape" : ""
                }`}
              >
                <div className="flex h-full items-end justify-start bg-nc-ink p-4">
                  <span className="nc-display text-2xl text-nc-cream">
                    {String(i + 1).padStart(2, "0")} / {t.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="border-b-4 border-nc-ink bg-nc-ink px-6 py-24 text-nc-cream">
        <div className="mx-auto max-w-4xl">
          <p className="nc-display mb-6 text-sm tracking-[0.3em] text-nc-red">
            // Manifesto
          </p>
          <p className="nc-display text-4xl leading-tight md:text-6xl">
            Compliance is optional.
            <br />
            Craft is not.
          </p>
          <p className="mt-8 font-punk-body text-lg uppercase leading-relaxed tracking-wide">
            Every garment starts as a pattern. Every pattern starts as a
            refusal — to smooth the edges, to trend-chase, to make it easy.
            No Comply is what happens when a designer's hand meets an
            operator's stubbornness.
          </p>
        </div>
      </section>

      {/* Facts */}
      <section className="border-b-4 border-nc-ink px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {[
            { k: "Role", v: "Creative Direction, Systems" },
            { k: "Year", v: "2025" },
            { k: "Format", v: "Zine / Moodboard / Concept" },
          ].map((f) => (
            <div
              key={f.k}
              className="border-4 border-nc-ink bg-nc-cream p-6"
            >
              <p className="nc-display text-sm tracking-[0.3em] text-nc-red">
                {f.k}
              </p>
              <p className="nc-display mt-2 text-2xl text-nc-ink">{f.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
          <div>
            <p className="nc-display text-sm tracking-[0.3em] text-nc-red">
              Next Up
            </p>
            <Link
              to="/projects/lucky-day-co"
              className="nc-display text-4xl text-nc-ink hover:text-nc-red"
            >
              Lucky Day Co →
            </Link>
          </div>
          <Link
            to="/projects"
            className="nc-display border-b-2 border-nc-ink pb-1 text-sm tracking-[0.3em] text-nc-ink hover:text-nc-red hover:border-nc-red"
          >
            ← All Projects
          </Link>
        </div>
      </footer>
    </div>
  );
}
