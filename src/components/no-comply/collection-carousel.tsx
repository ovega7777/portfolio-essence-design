import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselItem = {
  key: string;
  productSlug: string;
  variantId: string;
  name: string;
  price: number;
  image: { url: string; alt: string };
  hoverImage?: { url: string; alt: string };
};

type Props = {
  items: CarouselItem[];
  label: string;
};

export function CollectionCarousel({ items, label }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync, items.length]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <div className="relative mt-10" aria-label={label} role="group">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="nc-display text-xs tracking-[0.3em] text-black/60">Featured Pieces</p>
      </div>

      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        disabled={atStart}
        aria-label={`${label}: previous products`}
        className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-black bg-white text-black transition-opacity hover:opacity-55 disabled:opacity-25 sm:-left-5"
      >
        <ChevronLeft aria-hidden className="h-5 w-5" strokeWidth={1.8} />
      </button>
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        disabled={atEnd}
        aria-label={`${label}: next products`}
        className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-black bg-white text-black transition-opacity hover:opacity-55 disabled:opacity-25 sm:-right-5"
      >
        <ChevronRight aria-hidden className="h-5 w-5" strokeWidth={1.8} />
      </button>

      <div
        ref={trackRef}
        onScroll={sync}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >

        {items.map((item) => (
          <Link
            key={item.key}
            data-carousel-card
            to="/products/$slug"
            params={{ slug: item.productSlug }}
            search={{ variant: item.variantId }}
            className="group w-[68%] shrink-0 snap-start bg-white text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black sm:w-[46%] md:w-[31%] lg:w-[calc((100%-6rem)/5)]"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
              <img
                src={item.image.url}
                alt={item.image.alt}
                loading="lazy"
                className={`h-full w-full object-contain p-4 ${
                  item.hoverImage ? "transition-opacity duration-300 group-hover:opacity-0" : ""
                }`}
              />
              {item.hoverImage && (
                <img
                  src={item.hoverImage.url}
                  alt={item.hoverImage.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-contain p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              )}
            </div>
            <div className="flex items-baseline justify-between gap-3 pt-3">
              <p className="nc-display truncate text-sm tracking-[0.15em] text-black md:text-base">
                {item.name}
              </p>
              <p className="nc-display shrink-0 text-sm tracking-[0.15em] text-black md:text-base">
                ${item.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
