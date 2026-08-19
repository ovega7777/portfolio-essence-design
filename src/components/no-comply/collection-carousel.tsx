import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import {
  useCallback,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
  useEffect,
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
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: false,
    duration: 28,
    loop: true,
    skipSnaps: false,
    slidesToScroll: 1,
  });
  const prefersReducedMotionRef = useRef(false);
  const wheelDeltaRef = useRef(0);
  const wheelResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerStartXRef = useRef(0);
  const draggedRef = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      prefersReducedMotionRef.current = mediaQuery.matches;
    };
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
      if (wheelResetTimerRef.current) clearTimeout(wheelResetTimerRef.current);
    };
  }, []);

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!emblaApi) return;

    const isHorizontalGesture = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    if (!isHorizontalGesture && !event.shiftKey) return;

    const delta = event.shiftKey && !isHorizontalGesture ? event.deltaY : event.deltaX;
    if (delta === 0) return;

    event.preventDefault();
    wheelDeltaRef.current += delta;

    if (wheelResetTimerRef.current) clearTimeout(wheelResetTimerRef.current);
    wheelResetTimerRef.current = setTimeout(() => {
      wheelDeltaRef.current = 0;
    }, 120);

    if (Math.abs(wheelDeltaRef.current) < 24) return;

    const jump = prefersReducedMotionRef.current;
    if (wheelDeltaRef.current > 0) emblaApi.scrollNext(jump);
    else emblaApi.scrollPrev(jump);
    wheelDeltaRef.current = 0;
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStartXRef.current = event.clientX;
    draggedRef.current = false;
    if (event.pointerType === "mouse" && event.button === 0) setDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (Math.abs(event.clientX - pointerStartXRef.current) > 5) draggedRef.current = true;
  };

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") setDragging(false);
  };

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (!emblaApi || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
      event.preventDefault();
      const jump = prefersReducedMotionRef.current;
      if (event.key === "ArrowRight") emblaApi.scrollNext(jump);
      else emblaApi.scrollPrev(jump);
    },
    [emblaApi],
  );

  if (items.length === 0) return null;

  return (
    <div className="relative mt-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="nc-display text-xs tracking-[0.3em] text-black/60">Featured Pieces</p>
      </div>

      <div
        ref={viewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${label} featured products. Scroll horizontally to browse.`}
        tabIndex={0}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={stopDragging}
        onKeyDown={handleKeyDown}
        className={`overflow-hidden pb-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        <div className="flex touch-pan-y gap-6">
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
              className="group min-w-0 w-[84%] shrink-0 bg-white text-black ring-black/25 transition-shadow hover:ring-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 motion-reduce:transition-none sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
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
    </div>
  );
}
