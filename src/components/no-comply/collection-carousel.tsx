import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  useCallback,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
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

const INPUT_RESPONSE_SCALE = 0.5;
const GESTURE_TRIGGER_DISTANCE = 24;
const WHEEL_GESTURE_IDLE_MS = 220;

export function CollectionCarousel({ items, label }: Props) {
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: false,
    duration: 42,
    loop: true,
    skipSnaps: false,
    slidesToScroll: 1,
  });
  const prefersReducedMotionRef = useRef(false);
  const wheelDeltaRef = useRef(0);
  const wheelGestureHandledRef = useRef(false);
  const wheelResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const viewportElementRef = useRef<HTMLDivElement | null>(null);
  const pointerStartXRef = useRef(0);
  const pointerStartSnapRef = useRef(0);
  const draggedRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const setViewportRef = useCallback(
    (node: HTMLDivElement | null) => {
      viewportElementRef.current = node;
      viewportRef(node);
    },
    [viewportRef],
  );

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

  useEffect(() => {
    const viewport = viewportElementRef.current;
    if (!viewport || !emblaApi) return;

    const handleWheel = (event: WheelEvent) => {
      const isHorizontalGesture = Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.35;
      if (!isHorizontalGesture && !event.shiftKey) return;

      const delta = event.shiftKey && !isHorizontalGesture ? event.deltaY : event.deltaX;
      if (delta === 0) return;

      event.preventDefault();
      wheelDeltaRef.current += delta * INPUT_RESPONSE_SCALE;

      if (wheelResetTimerRef.current) clearTimeout(wheelResetTimerRef.current);
      wheelResetTimerRef.current = setTimeout(() => {
        wheelDeltaRef.current = 0;
        wheelGestureHandledRef.current = false;
      }, WHEEL_GESTURE_IDLE_MS);

      if (
        wheelGestureHandledRef.current ||
        Math.abs(wheelDeltaRef.current) < GESTURE_TRIGGER_DISTANCE
      ) {
        return;
      }

      const jump = prefersReducedMotionRef.current;
      if (wheelDeltaRef.current > 0) emblaApi.scrollNext(jump);
      else emblaApi.scrollPrev(jump);
      wheelGestureHandledRef.current = true;
      wheelDeltaRef.current = 0;
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [emblaApi]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    pointerStartXRef.current = event.clientX;
    pointerStartSnapRef.current = emblaApi?.selectedScrollSnap() ?? 0;
    draggedRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    if (event.pointerType === "mouse" && event.button === 0) setDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (Math.abs(event.clientX - pointerStartXRef.current) > 5) draggedRef.current = true;
  };

  const settlePointerGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (emblaApi) {
      const scaledDistance = (event.clientX - pointerStartXRef.current) * INPUT_RESPONSE_SCALE;
      const step =
        Math.abs(scaledDistance) < GESTURE_TRIGGER_DISTANCE ? 0 : scaledDistance < 0 ? 1 : -1;
      const target = (pointerStartSnapRef.current + step + items.length) % items.length;
      const jump = prefersReducedMotionRef.current;

      window.setTimeout(() => emblaApi.scrollTo(target, jump), 0);
    }

    if (event.pointerType === "mouse") setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const cancelPointerGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (emblaApi) {
      const jump = prefersReducedMotionRef.current;
      window.setTimeout(() => emblaApi.scrollTo(pointerStartSnapRef.current, jump), 0);
    }
    if (event.pointerType === "mouse") setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
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

  const scrollByTwo = useCallback(
    (direction: -1 | 1) => {
      if (!emblaApi) return;
      const target =
        (emblaApi.selectedScrollSnap() + direction * 2 + items.length) % items.length;
      emblaApi.scrollTo(target, prefersReducedMotionRef.current);
    },
    [emblaApi, items.length],
  );

  if (items.length === 0) return null;

  return (
    <div className="relative mt-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="nc-display text-xs tracking-[0.3em] text-black/60">Featured Pieces</p>
      </div>

      <div className="relative">
        <div
          ref={setViewportRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={`${label} featured products. Scroll horizontally to browse.`}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={settlePointerGesture}
          onPointerCancel={cancelPointerGesture}
          onPointerLeave={(event) => {
            if (
              event.pointerType === "mouse" &&
              !event.currentTarget.hasPointerCapture(event.pointerId)
            ) {
              setDragging(false);
            }
          }}
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

        <button
          type="button"
          onClick={() => scrollByTwo(-1)}
          aria-label="Previous two featured products"
          className="group absolute left-0 top-1/2 z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white/80 text-black transition-[color,opacity,transform] hover:opacity-65 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black motion-reduce:transition-none"
        >
          <ArrowLeft
            aria-hidden="true"
            strokeWidth={1.25}
            className="size-5 transition-transform group-hover:-translate-x-0.5 group-active:-translate-x-1 motion-reduce:transition-none"
          />
        </button>

        <button
          type="button"
          onClick={() => scrollByTwo(1)}
          aria-label="Next two featured products"
          className="group absolute right-0 top-1/2 z-10 flex size-11 translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white/80 text-black transition-[color,opacity,transform] hover:opacity-65 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black motion-reduce:transition-none"
        >
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.25}
            className="size-5 transition-transform group-hover:translate-x-0.5 group-active:translate-x-1 motion-reduce:transition-none"
          />
        </button>
      </div>
    </div>
  );
}
