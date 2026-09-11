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
  price: number;
  productImage: { url: string; alt: string };
  modelImage?: { url: string; alt: string };
  image: { url: string; alt: string };
};

type Props = {
  items: CarouselItem[];
  label: string;
  collectionSlug: "command" | "caught-on-film";
};

// Both collection carousels use the same modest input gain. Arrow steps are independent.
const INPUT_SENSITIVITY = 1.12;
const WHEEL_RESPONSE_SCALE = 0.5 * INPUT_SENSITIVITY;
const WHEEL_DURATION = 20;
const CLICK_MOVEMENT_THRESHOLD = 5;

export function CollectionCarousel({ items, label, collectionSlug }: Props) {
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: false,
    duration: 42,
    dragFree: true,
    loop: true,
    skipSnaps: false,
    slidesToScroll: 1,
  });
  const prefersReducedMotionRef = useRef(false);
  const viewportElementRef = useRef<HTMLDivElement | null>(null);
  const pointerStartXRef = useRef(0);
  const pointerStartYRef = useRef(0);
  const activePointerRef = useRef<number | null>(null);
  const pointerLastXRef = useRef(0);
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
    };
  }, []);

  useEffect(() => {
    const viewport = viewportElementRef.current;
    if (!viewport || !emblaApi) return;

    const handleWheel = (event: WheelEvent) => {
      // Leave browser zoom gestures alone, including trackpad pinch-to-zoom.
      if (event.ctrlKey || activePointerRef.current !== null) return;
      const isHorizontalGesture = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const delta = isHorizontalGesture ? event.deltaX : event.deltaY;
      if (delta === 0) return;

      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientWidth : 1;
      // Normalize wheel units and limit a single coarse wheel event to a quarter viewport.
      const limit = viewport.clientWidth / 4;
      const distance = Math.max(-limit, Math.min(limit, delta * unit * WHEEL_RESPONSE_SCALE));
      const engine = emblaApi.internalEngine();
      engine.scrollBody
        .useBaseFriction()
        .useDuration(prefersReducedMotionRef.current ? 0 : WHEEL_DURATION);
      engine.scrollTo.distance(-distance, false);
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // A gentle proximity snap only after momentum finishes, and only on mobile.
    const settleNearCard = () => {
      if (!window.matchMedia("(max-width: 768px)").matches || activePointerRef.current !== null) return;
      const engine = emblaApi.internalEngine();
      const nearest = engine.scrollTarget.byDistance(0, true);
      const pitch = engine.slideRects[0]?.width + 4;
      if (Math.abs(nearest.distance) > 0.5 && Math.abs(nearest.distance) <= pitch * 0.18) {
        engine.scrollBody.useBaseFriction().useDuration(prefersReducedMotionRef.current ? 0 : 18);
        engine.scrollTo.distance(nearest.distance, false);
      }
    };
    emblaApi.on("settle", settleNearCard);
    return () => { emblaApi.off("settle", settleNearCard); };
  }, [emblaApi]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;

    activePointerRef.current = event.pointerId;
    pointerStartXRef.current = event.clientX;
    pointerStartYRef.current = event.clientY;
    pointerLastXRef.current = event.clientX;
    draggedRef.current = false;
    if (event.pointerType === "mouse" && event.button === 0) setDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (activePointerRef.current !== event.pointerId) return;
    const deltaX = event.clientX - pointerLastXRef.current;
    pointerLastXRef.current = event.clientX;
    const horizontal =
      Math.abs(event.clientX - pointerStartXRef.current) >
      Math.abs(event.clientY - pointerStartYRef.current);
    if (horizontal && emblaApi) {
      // Embla handles the base drag and release momentum; add only the 12% gain.
      emblaApi.internalEngine().target.add(deltaX * (INPUT_SENSITIVITY - 1));
    }
    if (
      Math.hypot(event.clientX - pointerStartXRef.current, event.clientY - pointerStartYRef.current) >
      CLICK_MOVEMENT_THRESHOLD
    ) {
      draggedRef.current = true;
      // Capture only actual drags; capturing a tap here would retarget its click away from the link.
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const settlePointerGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (activePointerRef.current !== event.pointerId) return;
    activePointerRef.current = null;

    if (event.pointerType === "mouse") setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const cancelPointerGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (activePointerRef.current !== event.pointerId) return;
    activePointerRef.current = null;
    draggedRef.current = true;

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
    <div className="nc-featured-carousel relative mt-6 lg:mt-8">
      <div className="mb-2 flex items-center justify-between gap-4 lg:mb-3">
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
          className={`overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black ${
            dragging ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
        >
          <div className="nc-featured-track flex touch-pan-y gap-6">
            {items.map((item) => (
              <Link
                key={item.key}
                data-carousel-card
                to={
                  collectionSlug === "command"
                    ? "/projects/no-comply/command"
                    : "/projects/no-comply/caught-on-film"
                }
                search={
                  collectionSlug === "command"
                    ? { cat: "all", sort: "order" }
                    : { cat: "all" }
                }
                aria-label={`View ${item.productName} in the ${label} collection`}
                onClick={(event) => {
                  if (event.detail !== 0 && draggedRef.current) {
                    event.preventDefault();
                    draggedRef.current = false;
                  }
                }}
                draggable={false}
                className="group min-w-0 w-[84%] shrink-0 bg-white text-black ring-black/25 transition-shadow hover:ring-1 focus:outline-none focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black motion-reduce:transition-none sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
              >
                <div className="nc-featured-image flex aspect-[3/4] w-full items-center justify-center bg-white">
                  <picture className="nc-featured-default">
                    <source media="(max-width: 768px)" srcSet={item.productImage.url} />
                    <img
                      src={item.image.url}
                      alt={item.image.alt}
                      loading="lazy"
                      draggable={false}
                      className="block max-h-full w-full object-contain"
                    />
                  </picture>
                  {item.modelImage && (
                    <img className="nc-featured-model" src={item.modelImage.url} alt="" loading="lazy" draggable={false} />
                  )}
                </div>
                <div className="nc-featured-details">
                  <span title={item.productName}>{item.productName}</span>
                  <span>${item.price.toFixed(2)}</span>
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
