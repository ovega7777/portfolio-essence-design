import { useEffect, useState } from "react";

import logoMain from "@/assets/no-comply-landing/logo.svg";
import logoGothic from "@/assets/no-comply-landing/logo-gothic.svg";
import logoPunk from "@/assets/no-comply-landing/logo-punk.svg";
import logoGraffiti from "@/assets/no-comply-landing/logo-graffiti.svg";

// Original header artwork and font order. Tight viewBoxes remove only empty
// canvas; each SVG keeps its original lettering, strike, and proportions.
const LOGOS = [
  { src: logoMain, viewBox: "184 242 833 85" },
  { src: logoGothic, viewBox: "133 226 1005 169" },
  { src: logoPunk, viewBox: "169 242 858 128" },
  { src: logoGraffiti, viewBox: "264 287 661 68" },
];
const TOTAL_STEPS = LOGOS.length * 3 + 1;

export function FontChangingLogo() {
  const [logoIndex, setLogoIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    let timer: number;
    let step = 0;
    const tick = () => {
      step++;
      setLogoIndex(step % LOGOS.length);
      if (step >= TOTAL_STEPS) {
        setLogoIndex(0);
        setSpinning(false);
        return;
      }
      const progress = step / TOTAL_STEPS;
      timer = window.setTimeout(tick, 60 + Math.pow(progress, 3) * 500);
    };
    // Preserve the header's start delay and exact slowing font sequence.
    // Run once per mount, with no repeat timer.
    timer = window.setTimeout(() => {
      setSpinning(true);
      timer = window.setTimeout(tick, 60);
    }, 800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div role="img" aria-label="NO COMPLY USA"
      data-font-logo-index={logoIndex} data-font-logo-spinning={spinning}
      className="relative aspect-[6/1] w-full">
      {LOGOS.map(({ src, viewBox }, i) => (
        <svg key={src} viewBox={viewBox} aria-hidden="true" focusable="false"
          className={`absolute inset-0 h-full w-full transition-opacity ${spinning ? "duration-75" : "duration-300"} ${i === logoIndex ? "opacity-100" : "opacity-0"}`}>
          <image href={src} width="1202.13" height="725.71" />
        </svg>
      ))}
    </div>
  );
}

