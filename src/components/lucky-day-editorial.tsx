import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  luckyDayEditorial,
  LUCKY_DAY_EDITORIAL_HEIGHT,
  LUCKY_DAY_EDITORIAL_WIDTH,
} from "@/data/lucky-day-editorial";

/** 2×4 cover collage of all eight full portrait artworks (no cropping). */
export function LuckyDayCover({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-4 gap-1 bg-white sm:gap-2 ${className}`}
      role="img"
      aria-label="Lucky Day Co. editorial series: eight black-and-white portrait posters"
    >
      {luckyDayEditorial.map((image) => (
        <img
          key={image.thumb}
          src={image.thumb}
          alt=""
          loading="lazy"
          width={480}
          height={640}
          className="ldc-shake-target block aspect-[3/4] h-auto w-full min-w-0 object-contain transition-opacity duration-300 group-hover:opacity-90"
        />
      ))}
    </div>
  );
}

/** Full gallery of all eight artworks with an accessible lightbox. */
export function LuckyDayEditorialGallery() {
  const [index, setIndex] = useState<number | null>(null);
  const total = luckyDayEditorial.length;
  const go = useCallback(
    (step: number) => setIndex((i) => (i === null ? i : (i + step + total) % total)),
    [total],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const current = index === null ? null : luckyDayEditorial[index];

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8" aria-label="Lucky Day Co. editorial gallery">
        {luckyDayEditorial.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open image ${i + 1} of ${total}: ${image.alt}`}
              className="ldc-shake group block w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={i < 2 ? "eager" : "lazy"}
                width={LUCKY_DAY_EDITORIAL_WIDTH}
                height={LUCKY_DAY_EDITORIAL_HEIGHT}
                className="ldc-shake-target block aspect-[3/4] h-auto w-full object-contain transition-opacity duration-300 group-hover:opacity-90"
              />
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={index !== null} onOpenChange={(open) => !open && setIndex(null)}>
        <DialogContent className="flex h-[100dvh] max-h-[100dvh] w-screen max-w-none items-center justify-center rounded-none border-0 bg-white p-4 text-black sm:p-10 [&>button:last-child]:hidden">
          <DialogTitle className="sr-only">Lucky Day Co. editorial image</DialogTitle>
          <DialogDescription className="sr-only">
            Use the left and right arrow keys to move between images, Escape to close.
          </DialogDescription>
          {current && (
            <figure className="flex h-full w-full flex-col items-center justify-center gap-3">
              <img
                src={current.src}
                alt={current.alt}
                width={LUCKY_DAY_EDITORIAL_WIDTH}
                height={LUCKY_DAY_EDITORIAL_HEIGHT}
                className="block max-h-[calc(100dvh-6rem)] w-auto max-w-full object-contain"
              />
              <figcaption className="text-[11px] font-semibold uppercase tracking-[0.25em] text-black/60" aria-live="polite">
                {index! + 1} / {total}
              </figcaption>
            </figure>
          )}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 text-black focus-visible:outline-2 focus-visible:outline-black sm:left-6"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 text-black focus-visible:outline-2 focus-visible:outline-black sm:right-6"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={() => setIndex(null)}
            aria-label="Close gallery"
            className="absolute right-3 top-3 p-2 text-black focus-visible:outline-2 focus-visible:outline-black sm:right-6 sm:top-6"
          >
            <X className="h-6 w-6" />
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
