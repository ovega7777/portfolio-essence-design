import type { ReactNode } from "react";

import { NoComplySiteHeader } from "@/components/no-comply/site-header";

export function CollectionPageTopBar({
  collectionNumber,
}: {
  collectionNumber: 1 | 2;
}) {
  return (
    <NoComplySiteHeader
      pageName={`COLLECTION #${collectionNumber}`}
      activeCollection={collectionNumber === 1 ? "command" : "caught-on-film"}
    />
  );
}

type OpeningImage = {
  src: string;
  alt: string;
  position?: string;
};

export function CollectionTitleHeader({
  collectionNumber,
  pieceCount,
  title,
  artwork,
  images,
  imageSectionId,
}: {
  collectionNumber: 1 | 2;
  pieceCount: number;
  title: string;
  artwork?: ReactNode;
  images: readonly OpeningImage[];
  imageSectionId?: string;
}) {
  return (
    <div className="bg-white text-black">
      <header className="nc-collection-title-header nc-first-section mx-auto max-w-[1600px] px-5 pb-8 sm:px-8">
        <div className="nc-collection-title-rule flex flex-col gap-6 border-b border-black pb-8 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <div className="nc-display flex min-w-0 flex-nowrap items-center gap-3 text-[clamp(1.5rem,7.5vw,6rem)] leading-none tracking-[0.03em] md:gap-5">
              <h1 className="min-w-0 whitespace-nowrap [font:inherit] [letter-spacing:inherit] [line-height:inherit]">
                {title}
              </h1>
              {artwork}
            </div>
          </div>
          <p className="nc-collection-piece-count nc-display shrink-0 whitespace-nowrap text-sm uppercase tracking-[0.2em] text-black">
            COLLECTION #{collectionNumber} / {pieceCount} PIECES
          </p>
        </div>
      </header>
      <section
        id={imageSectionId}
        aria-label={`${title} editorial`}
        className="nc-collection-opening px-6 md:px-12"
      >
        <div
          className={`mx-auto grid max-w-7xl gap-1 bg-black ${images.length === 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-3"}`}
        >
          {images.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className="aspect-[3/4] h-auto w-full min-w-0 bg-white object-cover"
              style={image.position ? { objectPosition: image.position } : undefined}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
