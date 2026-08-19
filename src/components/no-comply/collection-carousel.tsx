import { Link } from "@tanstack/react-router";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
  useRef,
  useState,
} from "react";

export type CarouselItem = {
  key: string;
  productName: string;
  collectionSlug: "command" | "caught-on-film";
  image: { url: string; alt: string };
};

type Props = {
  items: CarouselItem[];
  label: string;
};

export function CollectionCarousel({ items, label }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef({ x: 0, scrollLeft: 0 });
  const draggedRef = useRef(false);
  const [dragging, setDragging] = useState(false);

  const prefersReducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({
      left: direction * step,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const canScroll =
      (event.deltaY > 0 && el.scrollLeft < maxScrollLeft) ||
      (event.deltaY < 0 && el.scrollLeft > 0);

    if (canScroll) {
      event.preventDefault();
      el.scrollLeft += event.deltaY;
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;

    pointerStartRef.current = { x: event.clientX, scrollLeft: el.scrollLeft };
    draggedRef.current = false;
    setDragging(true);
    el.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging || event.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;

    const distance = event.clientX - pointerStartRef.current.x;
    if (Math.abs(distance) > 5) draggedRef.current = true;
    el.scrollLeft = pointerStartRef.current.scrollLeft - distance;
  };

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    scrollByCard(event.key === "ArrowRight" ? 1 : -1);
  };

  if (items.length === 0) return null;

  return (
    <div className="relative mt-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="nc-display text-xs tracking-[0.3em] text-black/60">Featured Pieces</p>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label={`${label} featured products. Scroll horizontally to browse.`}
        tabIndex={0}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onKeyDown={handleKeyDown}
        className={`flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black motion-reduce:scroll-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none snap-none" : "cursor-grab"
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.key}
            data-carousel-card
            to={
              item.collectionSlug === "command"
                ? "/projects/no-comply/command"
                : "/projects/no-comply/caught-on-film"
            }
            search={
              item.collectionSlug === "command"
                ? { cat: "all", sort: "order", q: "" }
                : { cat: "all", q: "" }
            }
            aria-label={`View ${item.productName} in the ${label} collection`}
            onClick={(event) => {
              if (draggedRef.current) {
                event.preventDefault();
                draggedRef.current = false;
              }
            }}
            draggable={false}
            className="group w-[84%] shrink-0 snap-start bg-white text-black ring-black/25 transition-shadow hover:ring-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 motion-reduce:transition-none sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
          >
            <div className="flex aspect-[3/4] w-full items-center justify-center bg-white">
              <img
                src={item.image.url}
                alt={item.image.alt}
                loading="lazy"
                draggable={false}
                className="block max-h-full w-full object-contain"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
