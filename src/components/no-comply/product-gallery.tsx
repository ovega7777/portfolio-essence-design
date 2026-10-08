import { useEffect, useRef, useState } from "react";
import type { ProductImage } from "@/data/products";

const mobileGalleryQuery = "(max-width: 768px), (max-width: 1024px) and (max-height: 500px)";

/** Desktop image stack and a mobile gallery that loops through every product's images. */
export function ProductGallery({ images }: { images: ProductImage[] }) {
  const track = useRef<HTMLDivElement>(null);
  const selected = useRef(0);
  const pointerDown = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [index, setIndex] = useState(0);
  const count = images.length;
  const loops = count > 1;

  const settle = () => {
    const element = track.current;
    if (!element || !loops || pointerDown.current || !window.matchMedia(mobileGalleryQuery).matches)
      return;
    const position = Math.round(element.scrollLeft / element.clientWidth);
    // The end copies let swipes and arrows continue naturally; return invisibly
    // to the matching real image once scrolling has finished.
    if (position === 0 || position === count + 1) {
      element.scrollTo({
        left: (position === 0 ? count : 1) * element.clientWidth,
        behavior: "instant",
      });
    }
  };

  const scheduleSettle = () => {
    if (settleTimer.current !== null) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(settle, 150);
  };

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const media = window.matchMedia(mobileGalleryQuery);
    const align = () => {
      element.scrollTo({
        left: media.matches ? (selected.current + (loops ? 1 : 0)) * element.clientWidth : 0,
        behavior: "instant",
      });
    };
    align();
    const observer = new ResizeObserver(align);
    observer.observe(element);
    media.addEventListener("change", align);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", align);
      if (settleTimer.current !== null) clearTimeout(settleTimer.current);
    };
  }, [loops]);

  const move = (direction: number) => {
    const element = track.current;
    if (!element || !loops) return;
    const target = selected.current + 1 + direction;
    element.scrollTo({
      left: target * element.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  const figure = (img: ProductImage, key: string, copy = false, eager = false) => (
    <figure
      key={key}
      aria-hidden={copy || undefined}
      className={`block w-full bg-white${copy ? " nc-product-gallery-loop-copy" : ""}`}
    >
      <img
        src={img.url}
        alt={copy ? "" : img.alt}
        loading={eager ? "eager" : "lazy"}
        className="block h-[min(65svh,540px)] w-full object-contain object-center py-4"
      />
    </figure>
  );

  return (
    <section className="nc-product-gallery" aria-label="Product images">
      <div
        ref={track}
        className="nc-product-gallery-track flex flex-col gap-6"
        onPointerDown={() => {
          pointerDown.current = true;
        }}
        onPointerUp={() => {
          pointerDown.current = false;
          scheduleSettle();
        }}
        onPointerCancel={() => {
          pointerDown.current = false;
          scheduleSettle();
        }}
        onScroll={() => {
          const element = track.current;
          if (
            !element ||
            !count ||
            !element.clientWidth ||
            !window.matchMedia(mobileGalleryQuery).matches
          )
            return;
          const position = Math.round(element.scrollLeft / element.clientWidth);
          selected.current = (((position - (loops ? 1 : 0)) % count) + count) % count;
          setIndex(selected.current);
          scheduleSettle();
        }}
      >
        {loops && figure(images[count - 1], "loop-last", true, true)}
        {images.map((img, i) => figure(img, `${img.url}-${i}`, false, i === 0))}
        {loops && figure(images[0], "loop-first", true, true)}
      </div>
      <div className="nc-product-gallery-controls">
        <button
          type="button"
          aria-label="Previous product image"
          disabled={!loops}
          onClick={() => move(-1)}
        >
          ←
        </button>
        <span aria-live="polite">
          {count ? index + 1 : 0} / {count}
        </span>
        <button
          type="button"
          aria-label="Next product image"
          disabled={!loops}
          onClick={() => move(1)}
        >
          →
        </button>
      </div>
    </section>
  );
}
