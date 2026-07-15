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
import hoodieFlag from "../assets/militia/hoodie-flag.png.asset.json";
import shirtNavyPatched from "../assets/militia/shirt-navy-patched.png.asset.json";
import knitHoodieBack from "../assets/militia/knit-hoodie-back.png.asset.json";
import jacketCream from "../assets/militia/jacket-cream.png.asset.json";
import cargoBrown from "../assets/militia/cargo-brown.png.asset.json";
import trousersPleated from "../assets/militia/trousers-pleated.png.asset.json";
import trousersManifesto from "../assets/militia/trousers-manifesto.png.asset.json";
import duffelOlive from "../assets/militia/duffel-olive.png.asset.json";
import patchN from "../assets/militia/patch-n.png.asset.json";
import patchFlag from "../assets/militia/patch-flag.png.asset.json";
import hoodieRedZip from "../assets/militia/hoodie-red-zip.png.asset.json";
import teeNightCamo from "../assets/militia/tee-night-camo.png.asset.json";
import cargoPlaid from "../assets/militia/cargo-plaid.png.asset.json";
import hoodieOliveZip from "../assets/militia/hoodie-olive-zip.png.asset.json";
import hoodieOliveBack from "../assets/militia/hoodie-olive-back.png.asset.json";
import bagUtilityFront from "../assets/militia/bag-utility-front.png.asset.json";
import patchC from "../assets/militia/patch-c.png.asset.json";
import bagUtilityBack from "../assets/militia/bag-utility-back.png.asset.json";
import jacketCroppedBlack from "../assets/militia/jacket-cropped-black.png.asset.json";
import patchLabelSet from "../assets/militia/patch-label-set.png.asset.json";

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
  { img: hoodieFlag, name: "Kill Me I'm American Hoodie", code: "M-11", type: "Fleece" },
  { img: knitHoodieBack, name: "Elbow-Patch Knit Hoodie", code: "M-12", type: "Knitwear" },
  { img: shirtNavyPatched, name: "Patched Service Overshirt", code: "M-13", type: "Outerwear" },
  { img: jacketCream, name: "Bone Chore Jacket", code: "M-14", type: "Outerwear" },
  { img: cargoBrown, name: "Field Cargo Trouser", code: "M-15", type: "Bottoms" },
  { img: trousersPleated, name: "Asymmetric Button Trouser", code: "M-16", type: "Bottoms" },
  { img: trousersManifesto, name: "Manifesto Patch Trouser", code: "M-17", type: "Bottoms" },
  { img: duffelOlive, name: "Stencil Duffel — Olive", code: "M-18", type: "Object" },
  { img: patchN, name: "Chainstitch N Patch", code: "M-19", type: "Patch" },
  { img: patchFlag, name: "Subdued Flag Patch", code: "M-20", type: "Patch" },
  { img: hoodieRedZip, name: "Zip Hoodie — Oxblood", code: "M-21", type: "Knitwear" },
  { img: teeNightCamo, name: "Night Camo Logo Tee", code: "M-22", type: "Tee" },
  { img: cargoPlaid, name: "Plaid Cargo Trouser", code: "M-23", type: "Bottoms" },
  { img: hoodieOliveZip, name: "Zip Hoodie — Olive", code: "M-24", type: "Knitwear" },
  { img: hoodieOliveBack, name: "Olive Elbow-Patch Hoodie", code: "M-25", type: "Knitwear" },
  { img: bagUtilityFront, name: "Utility Carryall — Front", code: "M-26", type: "Bag" },
  { img: bagUtilityBack, name: "Utility Carryall — Back", code: "M-27", type: "Bag" },
  { img: jacketCroppedBlack, name: "Pinned Cropped Jacket", code: "M-28", type: "Outerwear" },
  { img: patchC, name: "Chainstitch C Patch", code: "M-29", type: "Patch" },
  { img: patchLabelSet, name: "Militia Label Set", code: "M-30", type: "Patch" },
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

      {/* MILITIA collection */}
      <section className="border-b-4 border-nc-ink px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="nc-display mb-3 inline-block bg-nc-red px-3 py-1 text-sm text-nc-cream tracking-[0.3em]">
                Drop 01
              </p>
              <h2 className="nc-display text-5xl leading-[0.9] text-nc-ink md:text-7xl">
                No Comply <span className="nc-scribble-underline">Militia</span>
              </h2>
            </div>
            <span className="nc-display text-sm tracking-[0.3em] text-nc-ink">
              // 30 pieces / Fall 2025
            </span>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-14 lg:grid-cols-3">
            {militia.map((p, i) => {
              const tilts = ["nc-tilt-l", "", "nc-tilt-r", "", "nc-tilt-l", "nc-tilt-r"];
              const tilt = tilts[i % tilts.length];
              return (
                <figure key={p.code} className="group">
                  <div className={`nc-tile aspect-[4/5] bg-nc-cream ${tilt}`}>
                    <img
                      src={p.img.url}
                      alt={p.name}
                      loading="lazy"
                      className="block h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-baseline justify-between gap-3">
                    <div>
                      <p className="nc-display text-xl text-nc-ink leading-tight">
                        {p.name}
                      </p>
                      <p className="nc-display text-xs tracking-[0.25em] text-nc-ink/70">
                        {p.type}
                      </p>
                    </div>
                    <span className="nc-display text-sm tracking-[0.2em] text-nc-red">
                      {p.code}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
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
