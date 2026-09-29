import { useEffect, useId, useRef, useState } from "react";

import wordmark from "@/assets/no-comply/wordmark.png";

// Timing adapted from Riot Cinema's NavBar.tsx (Lovable project 4fc0db89).
// Its 13-step spin starts at 60 ms and slows by progress^3 * 500 ms.
const STEPS = 13;
const HEIGHT = 126;
const WIDTH = 931;
const stepTimes = [0];
for (let step = 0; step < STEPS; step++) {
  stepTimes.push(stepTimes[step] + 60 + Math.pow(step / STEPS, 3) * 500);
}
const duration = stepTimes[STEPS];
// Letter windows in the original artwork; the final pixels are never re-typeset.
const letters = [[78, 145], [145, 215], [243, 310], [310, 379], [379, 460],
  [460, 525], [525, 570], [570, 639], [660, 727], [727, 794], [794, 866]];

const CYCLE_PAUSE_MS = 5000;

export function AnimatedWordmark({ banner = false, animated = true, cycle = false }: { banner?: boolean; animated?: boolean; cycle?: boolean }) {
  const id = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    if (!animated) return;
    const root = rootRef.current;
    if (!root) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let started = false;
    let animations: Animation[] = [];
    let cycleTimer: number | undefined;
    const finish = () => {
      animations.forEach((animation) => animation.cancel());
      animations = [];
      if (disposed) return;
      setPhase("done");
      if (cycle && !media.matches) {
        cycleTimer = window.setTimeout(() => {
          if (!disposed && !media.matches) void play();
        }, CYCLE_PAUSE_MS);
      }
    };
    const play = async () => {
      if (disposed || media.matches) return finish();
      try {
        await root.querySelector("img")?.decode();
      } catch {
        return finish();
      }
      if (disposed || media.matches) return;
      const reels = Array.from(root.querySelectorAll<SVGGElement>("[data-wordmark-reel]"));
      if (!reels[0]?.animate) return finish();
      setPhase("running");
      animations = reels.map((reel, index) => reel.animate(
        stepTimes.map((time, step) => ({
          transform: `translateY(${-step * HEIGHT}px)`,
          offset: time / duration,
        })),
        { duration, delay: index * 35, iterations: 1, fill: "both", easing: "linear" },
      ));
      Promise.all(animations.map((animation) => animation.finished)).then(finish).catch(() => {});
    };
    const observer = new IntersectionObserver((entries) => {
      if (started || !entries.some((entry) => entry.isIntersecting)) return;
      started = true;
      observer.disconnect();
      void play();
    }, { threshold: 0.1 });
    const onMotionChange = () => {
      if (!media.matches) return;
      started = true;
      observer.disconnect();
      window.clearTimeout(cycleTimer);
      finish();
    };
    if (media.matches) onMotionChange();
    else observer.observe(root);
    media.addEventListener("change", onMotionChange);
    return () => {
      disposed = true;
      observer.disconnect();
      media.removeEventListener("change", onMotionChange);
      window.clearTimeout(cycleTimer);
      animations.forEach((animation) => animation.cancel());
    };
  }, [animated, cycle]);

  return (
    <span
      ref={rootRef}
      data-wordmark-state={animated ? phase : "done"}
      data-no-comply-header-logo={banner || undefined}
      className={banner
        ? "inline-flex h-7 w-[206.888889px] max-w-[42vw] shrink-0 items-center invert sm:max-w-none"
        : "inline-block w-[7.388889em] max-w-full align-bottom invert"}
    >
      <span className="relative block w-full" style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}>
        <img src={wordmark} alt="NO COMPLY USA" width={WIDTH} height={HEIGHT} className="block h-auto w-full" />
        {animated && <svg
          aria-hidden="true"
          focusable="false"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="pointer-events-none absolute inset-0 h-full w-full motion-reduce:!hidden"
          style={{ visibility: phase === "running" ? "visible" : "hidden" }}
        >
          <defs>
            {letters.map(([left, right], index) => (
              <clipPath id={`${id}-letter-${index}`} key={index}>
                <rect x={left} width={right - left} height={HEIGHT} />
              </clipPath>
            ))}
            <clipPath id={`${id}-strike`}><rect y={59} width={WIDTH} height={13} /></clipPath>
          </defs>
          {letters.map((_, index) => (
            <g key={index} clipPath={`url(#${id}-letter-${index})`}>
              <g data-wordmark-reel>
                {stepTimes.map((_, step) => (
                  <image key={step} href={wordmark} y={step * HEIGHT} width={WIDTH} height={HEIGHT} />
                ))}
              </g>
            </g>
          ))}
          <image href={wordmark} width={WIDTH} height={HEIGHT} clipPath={`url(#${id}-strike)`} />
        </svg>}
      </span>
    </span>
  );
}
