import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import moodboard from "@/assets/lucky-day/process/moodboard.jpg.asset.json";
import moodboardThumb from "@/assets/lucky-day/process/moodboard-thumb.jpg.asset.json";
import aiJewelry from "@/assets/lucky-day/process/ai-jewelry.jpg.asset.json";
import aiJewelryThumb from "@/assets/lucky-day/process/ai-jewelry-thumb.jpg.asset.json";
import aiPurse from "@/assets/lucky-day/process/ai-purse.jpg.asset.json";
import aiPurseThumb from "@/assets/lucky-day/process/ai-purse-thumb.jpg.asset.json";
import tpChoker from "@/assets/lucky-day/process/tp-chainmail-choker.jpg.asset.json";
import tpHand from "@/assets/lucky-day/process/tp-chainmail-hand-piece.jpg.asset.json";
import tpPurse from "@/assets/lucky-day/process/tp-Dalmatian-coin-purse.jpg.asset.json";
import tpChokerFull from "@/assets/lucky-day/process/tp-chainmail-choker-full.jpg.asset.json";
import tpHandFull from "@/assets/lucky-day/process/tp-chainmail-hand-piece-full.jpg.asset.json";
import tpPurseFull from "@/assets/lucky-day/process/tp-Dalmatian-coin-purse-full.jpg.asset.json";
import pdfChoker from "@/assets/lucky-day/process/chainmail-choker.pdf.asset.json";
import pdfHand from "@/assets/lucky-day/process/chainmail-hand-piece.pdf.asset.json";
import pdfPurse from "@/assets/lucky-day/process/Dalmatian-coin-purse.pdf.asset.json";

type Item = {
  label: string;
  title: string;
  thumb: string;
  alt: string;
  full: string;
  pdf?: string;
  ratio: string;
};

export const luckyDayProcess: Item[] = [
  { label: "Mood Board", title: "Lucky Day Co. mood board", thumb: moodboardThumb.url, full: moodboard.url, alt: "Lucky Day Co. mood board collage", ratio: "4525 / 6033" },
  { label: "AI Generated", title: "AI concept — chainmail jewelry", thumb: aiJewelryThumb.url, full: aiJewelry.url, alt: "AI generated concept of silver chainmail choker, hand piece and earrings", ratio: "1059 / 1486" },
  { label: "AI Generated", title: "AI concept — Dalmatian coin purse", thumb: aiPurseThumb.url, full: aiPurse.url, alt: "AI generated concept of a Dalmatian-print coin purse with silver frame", ratio: "1059 / 1486" },
  { label: "Tech Pack", title: "Tech pack — chainmail choker", thumb: tpChoker.url, full: tpChokerFull.url, pdf: pdfChoker.url, alt: "First page of the chainmail choker tech pack", ratio: "842 / 1191" },
  { label: "Tech Pack", title: "Tech pack — chainmail hand piece", thumb: tpHand.url, full: tpHandFull.url, pdf: pdfHand.url, alt: "First page of the chainmail hand piece tech pack", ratio: "842 / 1191" },
  { label: "Tech Pack", title: "Tech pack — Dalmatian coin purse", thumb: tpPurse.url, full: tpPurseFull.url, pdf: pdfPurse.url, alt: "First page of the Dalmatian coin purse tech pack", ratio: "842 / 1191" },
];

const ROTATIONS = [-3, 2, -1.5, 2.5, -2, 1.5];

/** Overlapping horizontal stack of process work: mood board, AI concepts, tech packs. */
export function LuckyDayProcessStack() {
  const [index, setIndex] = useState<number | null>(null);
  const total = luckyDayProcess.length;
  const go = useCallback(
    (step: number) => setIndex((i) => (i === null ? null : (i + step + total) % total)),
    [total],
  );
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const current = index === null ? null : luckyDayProcess[index];
  const ctrl =
    "bg-white text-black shadow-[0_2px_10px_rgb(0_0_0/0.25)] p-2 sm:p-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

  return (
    <>
      <ul className="ldc-stack" aria-label="Lucky Day Co. process work">
        {luckyDayProcess.map((item, i) => {
          const style = { "--r": `${ROTATIONS[i]}deg`, zIndex: total - i } as React.CSSProperties;
          return (
            <li key={item.title} className="ldc-stack-item" style={style}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Enlarge ${item.title}${item.pdf ? " (tech pack preview)" : ""}`}
                className="ldc-stack-card"
              >
                <img src={item.thumb} alt={item.alt} loading="lazy" style={{ aspectRatio: item.ratio }} className="block w-full h-auto object-contain bg-white" />
                <span className="ldc-stack-label">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <DialogPrimitive.Root open={index !== null} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="ldc-viewer-overlay fixed inset-0 z-50 bg-transparent" />
          <DialogPrimitive.Content
            className="ldc-viewer fixed inset-0 z-50 flex items-center justify-center bg-transparent p-4 outline-none sm:p-10"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
            onClick={(e) => e.target === e.currentTarget && setIndex(null)}
          >
            <DialogPrimitive.Title className="sr-only">{current?.title ?? "Process work"}</DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Use the left and right arrow keys to move between the six process items, Escape to close.
            </DialogPrimitive.Description>
            {current && (
              <figure className="pointer-events-none flex max-h-full flex-col items-center gap-3">
                <img
                  src={current.full}
                  alt={current.alt}
                  className="pointer-events-auto block max-h-[calc(100dvh-8rem)] w-auto max-w-[calc(100vw-2rem)] bg-white object-contain shadow-[0_20px_60px_rgb(0_0_0/0.35)] sm:max-w-[calc(100vw-10rem)]"
                />
                <figcaption className="pointer-events-auto flex flex-wrap items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-black shadow-[0_2px_10px_rgb(0_0_0/0.2)]" aria-live="polite">
                  <span>{index! + 1} / {total} · {current.title}</span>
                  {current.pdf && (
                    <a href={current.pdf} target="_blank" rel="noopener noreferrer" className="ml-1 inline-flex items-center gap-1 border-b border-black focus-visible:outline-2 focus-visible:outline-black">
                      Open PDF <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  )}
                </figcaption>
              </figure>
            )}
            <button type="button" onClick={() => go(-1)} aria-label="Previous item" className={`absolute left-2 top-1/2 -translate-y-1/2 sm:left-6 ${ctrl}`}>
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next item" className={`absolute right-2 top-1/2 -translate-y-1/2 sm:right-6 ${ctrl}`}>
              <ChevronRight className="h-6 w-6" />
            </button>
            <DialogPrimitive.Close aria-label="Close viewer" className={`absolute right-3 top-3 sm:right-6 sm:top-6 ${ctrl}`}>
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
