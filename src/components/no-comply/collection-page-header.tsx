import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import noComplyUsaLogoBlack from "@/assets/no-comply-usa-logo-black-cropped.png.asset.json";
import { LogoBanner } from "@/components/no-comply/logo-banner";

export function CollectionPageTopBar({
  collectionNumber,
  menuOpen,
  onSearch,
  onMenu,
}: {
  collectionNumber: 1 | 2;
  menuOpen: boolean;
  onSearch: () => void;
  onMenu: () => void;
}) {
  return (
    <>
      <nav className="sticky top-0 z-50 border-b-2 border-black bg-black text-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link
            to="/projects/no-comply"
            className="nc-display shrink-0 text-lg tracking-widest text-white transition-colors duration-200 hover:text-white/60 sm:text-xl"
          >
            ← NO COMPLY USA
          </Link>
          <span className="nc-display ml-auto hidden text-base tracking-[0.3em] text-white lg:block lg:text-lg">
            NO COMPLY USA / COLLECTION #{collectionNumber}
          </span>
        </div>
        <div className="h-0.5 w-full bg-white" />
      </nav>

      <LogoBanner
        src={noComplyUsaLogoBlack.url}
        menuOpen={menuOpen}
        onSearch={onSearch}
        onMenu={onMenu}
      />
    </>
  );
}

export function CollectionTitleHeader({
  collectionNumber,
  pieceCount,
  title,
  theme,
}: {
  collectionNumber: 1 | 2;
  pieceCount: number;
  title: ReactNode;
  theme: "command" | "caught-on-film";
}) {
  const caughtOnFilm = theme === "caught-on-film";

  return (
    <header
      className={`nc-first-section mx-auto max-w-[1600px] px-5 pb-8 sm:px-8 ${
        caughtOnFilm ? "bg-[#070707] text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`flex flex-col gap-6 border-b pb-8 md:flex-row md:items-end md:justify-between ${
          caughtOnFilm ? "border-[#f36b21]/60" : "border-black"
        }`}
      >
        <div className="min-w-0">
          <p
            className={`mb-4 text-xs uppercase tracking-[0.32em] ${
              caughtOnFilm ? "text-[#f36b21]" : "text-black"
            }`}
          >
            Collection #{collectionNumber}
          </p>
          {title}
        </div>
        <p
          className={`nc-display shrink-0 text-sm uppercase tracking-[0.2em] ${
            caughtOnFilm ? "text-[#f36b21]" : "text-black"
          }`}
        >
          Collection #{collectionNumber} / {pieceCount} Pieces
        </p>
      </div>
    </header>
  );
}
