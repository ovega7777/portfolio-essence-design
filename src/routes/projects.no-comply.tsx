import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import hero from "../assets/no-comply-hero.png.asset.json";
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
import cargoShortsBlack from "../assets/militia/cargo-shorts-black.png.asset.json";
import teeUsaCamo from "../assets/militia/tee-usa-camo.png.asset.json";
import cargoBrownWide from "../assets/militia/cargo-brown-wide.png.asset.json";
import shirtBlackEpaulet from "../assets/militia/shirt-black-epaulet.png.asset.json";
import dogTags from "../assets/militia/dog-tags.png.asset.json";
import knitHoodieZipBlack from "../assets/militia/knit-hoodie-zip-black.png.asset.json";
import trousersBrownPatch from "../assets/militia/trousers-brown-patch.png.asset.json";
import jacketNavyBack from "../assets/militia/jacket-navy-back.png.asset.json";
import cargoBlackWide from "../assets/militia/cargo-black-wide.png.asset.json";
import cargoShortsMulti from "../assets/militia/cargo-shorts-multi.png.asset.json";
import jacketLeatherBomberBrown from "../assets/militia/jacket-leather-bomber-brown.png.asset.json";
import teeComplyShowgirlsNavy from "../assets/militia/tee-comply-showgirls-navy.png.asset.json";
import zippoAceSilver from "../assets/militia/zippo-ace-silver.png.asset.json";
import cargoPlaidCharcoal from "../assets/militia/cargo-plaid-charcoal.png.asset.json";
import jacketLeatherBomberBlackBack from "../assets/militia/jacket-leather-bomber-black-back.png.asset.json";
import pinsSetPatriot from "../assets/militia/pins-set-patriot.png.asset.json";
import knitHoodieZipRed from "../assets/militia/knit-hoodie-zip-red.png.asset.json";
import dogTagsGrimReaper from "../assets/militia/dog-tags-grim-reaper.png.asset.json";
import hoodieWashBlackBack from "../assets/militia/hoodie-wash-black-back.png.asset.json";
import shirtOliveEpaulet from "../assets/militia/shirt-olive-epaulet.png.asset.json";
import vestLacedBlack from "../assets/militia/vest-laced-black.png.asset.json";
import patchUsaGothic from "../assets/militia/patch-usa-gothic.png.asset.json";
import nylonBalloonPants from "../assets/militia/nylon-balloon-pants.png.asset.json";
import bomberShearlingBrownBack from "../assets/militia/bomber-shearling-brown-back.png.asset.json";
import overshirtCreamEpaulet from "../assets/militia/overshirt-cream-epaulet.png.asset.json";
import jacketDistressedBlackBack from "../assets/militia/jacket-distressed-black-back.png.asset.json";
import cargoBlackBack from "../assets/militia/cargo-black-back.png.asset.json";
import knitHoodieOlivePatched from "../assets/militia/knit-hoodie-olive-patched.png.asset.json";
import nylonHoodieBuckleBack from "../assets/militia/nylon-hoodie-buckle-back.png.asset.json";
import cargoOlivePleated from "../assets/militia/cargo-olive-pleated.png.asset.json";
import cargoOliveBack from "../assets/militia/cargo-olive-back.png.asset.json";
import overshirtNavyEpaulet from "../assets/militia/overshirt-navy-epaulet.png.asset.json";
import nylonHoodieBuckleOliveBack from "../assets/militia/nylon-hoodie-buckle-olive-back.png.asset.json";
import nylonHoodieBuckleBlackFront from "../assets/militia/nylon-hoodie-buckle-black-front.png.asset.json";
import bomberShearlingBlackFront from "../assets/militia/bomber-shearling-black-front.png.asset.json";
import jacketDistressedBlackFront from "../assets/militia/jacket-distressed-black-front.png.asset.json";
import vestLacedOlive from "../assets/militia/vest-laced-olive.png.asset.json";
import overshirtOliveBack from "../assets/militia/overshirt-olive-back.png.asset.json";
import overshirtBlackBack from "../assets/militia/overshirt-black-back.png.asset.json";
import capPatchedBlack from "../assets/militia/cap-patched-black.png.asset.json";
import knitHoodieNavyBack from "../assets/militia/knit-hoodie-navy-back.png.asset.json";
import patchDealerOfDeath from "../assets/militia/patch-dealer-of-death.png.asset.json";
import nylonBalloonPantsOliveFront from "../assets/militia/nylon-balloon-pants-olive-front.png.asset.json";
import anorakOliveBuckle from "../assets/militia/anorak-olive-buckle.png.asset.json";
import bomberShearlingBlackFrontV2 from "../assets/militia/bomber-shearling-black-front-v2.png.asset.json";
import knitHoodieRedBack from "../assets/militia/knit-hoodie-red-back.png.asset.json";
import nylonBalloonPantsOliveBack from "../assets/militia/nylon-balloon-pants-olive-back.png.asset.json";

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
  { img: cargoShortsBlack, name: "Tactical Cargo Short", code: "M-31", type: "Shorts" },
  { img: teeUsaCamo, name: "No Comply USA Tee — Tiger Camo", code: "M-32", type: "Tee" },
  { img: cargoBrownWide, name: "Wide Cargo Trouser — Espresso", code: "M-33", type: "Trouser" },
  { img: shirtBlackEpaulet, name: "Sergeant Overshirt", code: "M-34", type: "Shirt" },
  { img: dogTags, name: "Militia Dog Tags", code: "M-35", type: "Accessory" },
  { img: knitHoodieZipBlack, name: "Zip Knit Hoodie — Black", code: "M-36", type: "Knitwear" },
  { img: trousersBrownPatch, name: "Manifesto Trouser — Espresso", code: "M-37", type: "Trouser" },
  { img: jacketNavyBack, name: "Officer Chore Jacket — Navy", code: "M-38", type: "Outerwear" },
  { img: cargoBlackWide, name: "Wide Cargo Trouser — Black", code: "M-39", type: "Trouser" },
  { img: cargoShortsMulti, name: "Multi-Pocket Cargo Short", code: "M-40", type: "Shorts" },
  { img: jacketLeatherBomberBrown, name: "Leather Bomber — Brown", code: "M-41", type: "Outerwear" },
  { img: teeComplyShowgirlsNavy, name: "Comply Showgirls Tee — Navy", code: "M-42", type: "Tee" },
  { img: zippoAceSilver, name: "Ace Zippo — Silver", code: "M-43", type: "Accessory" },
  { img: cargoPlaidCharcoal, name: "Plaid Cargo Trouser — Charcoal", code: "M-44", type: "Trouser" },
  { img: jacketLeatherBomberBlackBack, name: "Leather Bomber — Black Back", code: "M-45", type: "Outerwear" },
  { img: pinsSetPatriot, name: "Patriot Pin Set", code: "M-46", type: "Accessory" },
  { img: knitHoodieZipRed, name: "Zip Knit Hoodie — Red", code: "M-47", type: "Knitwear" },
  { img: dogTagsGrimReaper, name: "Dog Tags — Grim Reaper", code: "M-48", type: "Accessory" },
  { img: hoodieWashBlackBack, name: "Washed Hoodie — Back", code: "M-49", type: "Hoodie" },
  { img: shirtOliveEpaulet, name: "Sergeant Overshirt — Olive", code: "M-50", type: "Shirt" },
  { img: vestLacedBlack, name: "Laced Utility Vest", code: "M-51", type: "Outerwear" },
  { img: patchUsaGothic, name: "USA Gothic Patch", code: "M-52", type: "Accessory" },
  { img: nylonBalloonPants, name: "Nylon Balloon Pant", code: "M-53", type: "Trouser" },
  { img: bomberShearlingBrownBack, name: "Shearling Bomber — Back", code: "M-54", type: "Outerwear" },
  { img: overshirtCreamEpaulet, name: "Officer Overshirt — Cream", code: "M-55", type: "Shirt" },
  { img: jacketDistressedBlackBack, name: "Distressed Rider — Back", code: "M-56", type: "Outerwear" },
  { img: cargoBlackBack, name: "Wide Cargo — Black Back", code: "M-57", type: "Trouser" },
  { img: knitHoodieOlivePatched, name: "Patched Knit Hoodie — Olive", code: "M-58", type: "Knitwear" },
  { img: nylonHoodieBuckleBack, name: "Buckle Nylon Hoodie — Back", code: "M-59", type: "Outerwear" },
  { img: cargoOlivePleated, name: "Pleated Cargo — Olive", code: "M-60", type: "Trouser" },
  { img: cargoOliveBack, name: "Pleated Cargo — Olive Back", code: "M-61", type: "Trouser" },
  { img: overshirtNavyEpaulet, name: "Officer Overshirt — Navy", code: "M-62", type: "Shirt" },
  { img: nylonHoodieBuckleOliveBack, name: "Buckle Nylon Hoodie — Olive Back", code: "M-63", type: "Outerwear" },
  { img: nylonHoodieBuckleBlackFront, name: "Buckle Nylon Hoodie — Black", code: "M-64", type: "Outerwear" },
  { img: bomberShearlingBlackFront, name: "Shearling Bomber — Black", code: "M-65", type: "Outerwear" },
  { img: jacketDistressedBlackFront, name: "Distressed Rider — Front", code: "M-66", type: "Outerwear" },
  { img: vestLacedOlive, name: "Laced Utility Vest — Olive", code: "M-67", type: "Outerwear" },
  { img: overshirtOliveBack, name: "Officer Overshirt — Olive Back", code: "M-68", type: "Shirt" },
  { img: overshirtBlackBack, name: "Officer Overshirt — Black Back", code: "M-69", type: "Shirt" },
  { img: capPatchedBlack, name: "Patched Militia Cap", code: "M-70", type: "Headwear" },
  { img: knitHoodieNavyBack, name: "Elbow-Patch Knit Hoodie — Navy", code: "M-71", type: "Knitwear" },
  { img: patchDealerOfDeath, name: "Dealer of Death Patch", code: "M-72", type: "Patch" },
  { img: nylonBalloonPantsOliveFront, name: "Nylon Balloon Pant — Olive", code: "M-73", type: "Trouser" },
  { img: anorakOliveBuckle, name: "Buckle Anorak — Olive", code: "M-74", type: "Outerwear" },
  { img: bomberShearlingBlackFrontV2, name: "Shearling Bomber — Black Front", code: "M-75", type: "Outerwear" },
  { img: knitHoodieRedBack, name: "Elbow-Patch Knit Hoodie — Oxblood", code: "M-76", type: "Knitwear" },
  { img: nylonBalloonPantsOliveBack, name: "Nylon Balloon Pant — Olive Back", code: "M-77", type: "Trouser" },
];

const CATEGORIES = [
  "Outerwear",
  "Tops",
  "Pants & Trousers",
  "Bags",
  "Accessories",
] as const;
type Category = (typeof CATEGORIES)[number];

function categorize(type: string): Category {
  switch (type) {
    case "Outerwear":
    case "Shirt":
      return "Outerwear";
    case "Knitwear":
    case "Tee":
    case "Hoodie":
    case "Fleece":
      return "Tops";
    case "Bottoms":
    case "Trouser":
    case "Shorts":
      return "Pants & Trousers";
    case "Bag":
      return "Bags";
    default:
      return "Accessories";
  }
}

const militiaByCategory: Record<Category, typeof militia> = {
  Outerwear: [],
  Tops: [],
  "Pants & Trousers": [],
  Bags: [],
  Accessories: [],
};
for (const p of militia) militiaByCategory[categorize(p.type)].push(p);

const militiaOrdered = CATEGORIES.flatMap((c) => militiaByCategory[c]);

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

type MilitiaItem = (typeof militia)[number];

function CategoryGrid({
  items,
  onOpen,
}: {
  items: MilitiaItem[];
  onOpen: (code: string) => void;
}) {
  const tilts = ["nc-tilt-l", "", "nc-tilt-r", "", "nc-tilt-l", "nc-tilt-r"];
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-14 lg:grid-cols-3">
      {items.map((p, i) => {
        const tilt = tilts[i % tilts.length];
        return (
          <figure key={p.code} className="group">
            <button
              type="button"
              onClick={() => onOpen(p.code)}
              aria-label={`View ${p.name} larger`}
              className={`nc-tile block aspect-[4/5] w-full cursor-zoom-in bg-nc-cream ${tilt} transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-nc-red`}
            >
              <img
                src={p.img.url}
                alt={p.name}
                loading="lazy"
                className="block h-full w-full object-cover"
              />
            </button>
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
  );
}

function NoComply() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const displayed =
    activeCategory === "All" ? militiaOrdered : militiaByCategory[activeCategory];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const open = lightboxIndex !== null;

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? i : (i - 1 + displayed.length) % displayed.length,
      ),
    [displayed.length],
  );
  const next = useCallback(
    () =>
      setLightboxIndex((i) => (i === null ? i : (i + 1) % displayed.length)),
    [displayed.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, prev, next]);

  const active = lightboxIndex !== null ? displayed[lightboxIndex] : null;

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
              src={hero.url}
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
              // {militia.length} pieces / Fall 2025
            </span>
          </div>

          {/* Category filter */}
          <div className="mb-12 flex flex-wrap items-center gap-3 border-y-2 border-nc-ink py-4">
            <span className="nc-display text-xs tracking-[0.3em] text-nc-ink/70">
              Shop by
            </span>
            {(["All", ...CATEGORIES] as const).map((cat) => {
              const count =
                cat === "All" ? militia.length : militiaByCategory[cat].length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setLightboxIndex(null);
                  }}
                  className={`nc-display border-2 px-3 py-1 text-xs tracking-[0.25em] transition-colors ${
                    isActive
                      ? "border-nc-red bg-nc-red text-nc-cream"
                      : "border-nc-ink bg-nc-cream text-nc-ink hover:bg-nc-ink hover:text-nc-cream"
                  }`}
                  aria-pressed={isActive}
                >
                  {cat} <span className="opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          {activeCategory === "All" ? (
            CATEGORIES.map((cat) => {
              const items = militiaByCategory[cat];
              if (items.length === 0) return null;
              return (
                <div key={cat} className="mb-20 last:mb-0">
                  <div className="mb-8 flex items-end justify-between border-b-2 border-nc-ink pb-3">
                    <h3 className="nc-display text-3xl leading-none text-nc-ink md:text-4xl">
                      {cat}
                    </h3>
                    <span className="nc-display text-xs tracking-[0.3em] text-nc-ink/70">
                      {String(items.length).padStart(2, "0")} pieces
                    </span>
                  </div>
                  <CategoryGrid
                    items={items}
                    onOpen={(code) =>
                      setLightboxIndex(
                        militiaOrdered.findIndex((m) => m.code === code),
                      )
                    }
                  />
                </div>
              );
            })
          ) : (
            <CategoryGrid
              items={displayed}
              onOpen={(code) =>
                setLightboxIndex(displayed.findIndex((m) => m.code === code))
              }
            />
          )}
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

      {/* Lightbox */}
      {open && active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} — enlarged view`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-nc-ink/95 p-4 md:p-10"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            className="nc-display absolute right-4 top-4 z-10 border-2 border-nc-cream bg-nc-ink px-3 py-1 text-sm tracking-[0.3em] text-nc-cream hover:bg-nc-red hover:border-nc-red md:right-8 md:top-8"
          >
            Close ✕
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="nc-display absolute left-2 top-1/2 z-10 -translate-y-1/2 border-2 border-nc-cream bg-nc-ink px-3 py-2 text-lg text-nc-cream hover:bg-nc-red hover:border-nc-red md:left-6"
          >
            ←
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="nc-display absolute right-2 top-1/2 z-10 -translate-y-1/2 border-2 border-nc-cream bg-nc-ink px-3 py-2 text-lg text-nc-cream hover:bg-nc-red hover:border-nc-red md:right-6"
          >
            →
          </button>

          <figure
            className="relative flex max-h-full max-w-6xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.img.url}
              alt={active.name}
              className="max-h-[80vh] w-auto max-w-full object-contain"
            />
            <figcaption className="mt-4 flex w-full items-baseline justify-between gap-4 border-t-2 border-nc-cream pt-3 text-nc-cream">
              <div>
                <p className="nc-display text-xl leading-tight">{active.name}</p>
                <p className="nc-display text-xs tracking-[0.25em] text-nc-cream/70">
                  {active.type}
                </p>
              </div>
              <span className="nc-display text-sm tracking-[0.2em] text-nc-red">
                {active.code} · {(lightboxIndex ?? 0) + 1}/{displayed.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
