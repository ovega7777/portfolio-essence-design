import { useCallback, useEffect, useState } from "react";
import type { ProductImage } from "@/data/products";

type Props = {
  images: ProductImage[];
  startIndex?: number;
  onClose: () => void;
  name?: string;
  price?: number;
};

export function Lightbox({ images, startIndex = 0, onClose, name, price }: Props) {
  const [index, setIndex] = useState(startIndex);
  const count = images.length;

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count]
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  if (count === 0) return null;
  const img = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white p-4 md:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="nc-display absolute right-4 top-4 z-10 border-2 border-black bg-white px-3 py-1 text-sm tracking-[0.3em] text-black transition-colors duration-200 hover:bg-black hover:text-white md:right-8 md:top-8"
      >
        Close ✕
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="nc-display absolute left-2 top-1/2 z-10 -translate-y-1/2 border-2 border-black bg-white px-3 py-2 text-lg text-black transition-colors duration-200 hover:bg-black hover:text-white md:left-6"
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
            className="nc-display absolute right-2 top-1/2 z-10 -translate-y-1/2 border-2 border-black bg-white px-3 py-2 text-lg text-black transition-colors duration-200 hover:bg-black hover:text-white md:right-6"
          >
            →
          </button>
        </>
      )}

      <figure
        className="relative flex max-h-full max-w-6xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={img.url}
          src={img.url}
          alt={img.alt}
          className="max-h-[75vh] w-auto max-w-full object-contain"
        />
        {(name || typeof price === "number") && (
          <div className="mt-6 flex w-full items-baseline justify-between gap-6 px-2">
            {name && (
              <p className="nc-display text-lg tracking-[0.15em] text-black md:text-xl">
                {name}
              </p>
            )}
            {typeof price === "number" && (
              <p className="nc-display text-lg tracking-[0.15em] text-black md:text-xl">
                ${price}
              </p>
            )}
          </div>
        )}
        <figcaption className="nc-display mt-3 text-xs tracking-[0.3em] text-black">
          {index + 1} / {count}
        </figcaption>
      </figure>
    </div>
  );
}
