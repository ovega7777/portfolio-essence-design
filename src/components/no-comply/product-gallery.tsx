import { useRef, useState } from "react";
import type { ProductImage } from "@/data/products";

/** The same ordered images form a desktop stack and a touch-scrollable mobile gallery. */
export function ProductGallery({ images, onOpen }: { images: ProductImage[]; onOpen: (index: number) => void }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const start = useRef(0);
  const dragged = useRef(false);
  const move = (direction: number) => {
    const target = Math.max(0, Math.min(images.length - 1, index + direction));
    track.current?.scrollTo({ left: target * track.current.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return (
    <section className="nc-product-gallery" aria-label="Product images">
      <div ref={track} className="nc-product-gallery-track flex flex-col gap-6"
        onScroll={() => { if (track.current) setIndex(Math.round(track.current.scrollLeft / track.current.clientWidth)); }}
        onPointerDown={event => { start.current = event.clientX; dragged.current = false; }}
        onPointerMove={event => { if (event.buttons && Math.abs(event.clientX - start.current) > 8) dragged.current = true; }}>
        {images.map((img, i) => (
          <button key={`${img.url}-${i}`} type="button" className="group block w-full bg-white"
            aria-label={`Open ${img.alt}`} onClick={() => { if (!dragged.current) onOpen(i); }}>
            <img src={img.url} alt={img.alt} loading={i === 0 ? "eager" : "lazy"} className="block h-auto w-full object-contain" />
          </button>
        ))}
      </div>
      <div className="nc-product-gallery-controls">
        <button type="button" aria-label="Previous product image" disabled={index === 0} onClick={() => move(-1)}>←</button>
        <span aria-live="polite">{index + 1} / {images.length}</span>
        <button type="button" aria-label="Next product image" disabled={index === images.length - 1} onClick={() => move(1)}>→</button>
      </div>
    </section>
  );
}
