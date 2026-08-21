import type { ReactNode } from "react";

import { NoComplySiteHeader } from "@/components/no-comply/site-header";

export function CollectionPageTopBar({
  collectionNumber,
  query,
  onQueryChange,
}: {
  collectionNumber: 1 | 2;
  query: string;
  onQueryChange: (query: string) => void;
}) {
  return (
    <NoComplySiteHeader
      pageName={`COLLECTION #${collectionNumber}`}
      query={query}
      onQueryChange={onQueryChange}
      activeCollection={collectionNumber === 1 ? "command" : "caught-on-film"}
    />
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
