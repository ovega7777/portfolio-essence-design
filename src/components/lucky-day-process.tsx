import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import moodboard from "@/assets/lucky-day/process/moodboard.jpg.asset.json";
import moodboardThumb from "@/assets/lucky-day/process/moodboard-thumb.jpg.asset.json";
import aiJewelry from "@/assets/lucky-day/process/ai-jewelry.jpg.asset.json";
import aiJewelryThumb from "@/assets/lucky-day/process/ai-jewelry-thumb.jpg.asset.json";
import aiPurse from "@/assets/lucky-day/process/ai-purse.jpg.asset.json";
import aiPurseThumb from "@/assets/lucky-day/process/ai-purse-thumb.jpg.asset.json";
import tpChoker from "@/assets/lucky-day/process/tp-chainmail-choker.jpg.asset.json";
import tpHand from "@/assets/lucky-day/process/tp-chainmail-hand-piece.jpg.asset.json";
import tpPurse from "@/assets/lucky-day/process/tp-Dalmatian-coin-purse.jpg.asset.json";
import pdfChoker from "@/assets/lucky-day/process/chainmail-choker.pdf.asset.json";
import pdfHand from "@/assets/lucky-day/process/chainmail-hand-piece.pdf.asset.json";
import pdfPurse from "@/assets/lucky-day/process/Dalmatian-coin-purse.pdf.asset.json";

type Item = {
  label: string;
  title: string;
  thumb: string;
  alt: string;
  full?: string;
  pdf?: string;
  ratio: string;
};

export const luckyDayProcess: Item[] = [
  { label: "Mood Board", title: "Lucky Day Co. mood board", thumb: moodboardThumb.url, full: moodboard.url, alt: "Lucky Day Co. mood board collage", ratio: "4525 / 6033" },
  { label: "AI Generated", title: "AI concept — chainmail jewelry", thumb: aiJewelryThumb.url, full: aiJewelry.url, alt: "AI generated concept of silver chainmail choker, hand piece and earrings", ratio: "1059 / 1486" },
  { label: "AI Generated", title: "AI concept — Dalmatian coin purse", thumb: aiPurseThumb.url, full: aiPurse.url, alt: "AI generated concept of a Dalmatian-print coin purse with silver frame", ratio: "1059 / 1486" },
  { label: "Tech Pack", title: "Tech pack — chainmail choker", thumb: tpChoker.url, pdf: pdfChoker.url, alt: "First page of the chainmail choker tech pack", ratio: "842 / 1191" },
  { label: "Tech Pack", title: "Tech pack — chainmail hand piece", thumb: tpHand.url, pdf: pdfHand.url, alt: "First page of the chainmail hand piece tech pack", ratio: "842 / 1191" },
  { label: "Tech Pack", title: "Tech pack — Dalmatian coin purse", thumb: tpPurse.url, pdf: pdfPurse.url, alt: "First page of the Dalmatian coin purse tech pack", ratio: "842 / 1191" },
];

const ROTATIONS = [-4, 2.5, -1.5, 3, -2.5, 1.5];

/** Overlapping horizontal stack of process work: mood board, AI concepts, tech packs. */
export function LuckyDayProcessStack() {
  const [open, setOpen] = useState<Item | null>(null);

  return (
    <>
      <div className="ldc-stack-scroll" aria-label="Lucky Day Co. process work">
        <ul className="ldc-stack">
          {luckyDayProcess.map((item, i) => {
            const style = { "--r": `${ROTATIONS[i]}deg`, zIndex: i + 1 } as React.CSSProperties;
            const inner = (
              <>
                <img src={item.thumb} alt={item.alt} loading="lazy" style={{ aspectRatio: item.ratio }} className="block w-full h-auto object-contain bg-white" />
                <span className="ldc-stack-label">
                  {item.label}
                  {item.pdf && <span className="sr-only"> (PDF, opens in new tab)</span>}
                </span>
              </>
            );
            return (
              <li key={item.title} className="ldc-stack-item" style={style}>
                {item.pdf ? (
                  <a href={item.pdf} target="_blank" rel="noopener noreferrer" aria-label={`${item.title} — open PDF in new tab`} className="ldc-stack-card">
                    {inner}
                  </a>
                ) : (
                  <button type="button" onClick={() => setOpen(item)} aria-label={`Enlarge ${item.title}`} className="ldc-stack-card">
                    {inner}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="flex h-[100dvh] max-h-[100dvh] w-screen max-w-none items-center justify-center rounded-none border-0 bg-white p-4 text-black sm:p-10 [&>button:last-child]:hidden">
          <DialogTitle className="sr-only">{open?.title ?? "Process image"}</DialogTitle>
          <DialogDescription className="sr-only">Press Escape to close.</DialogDescription>
          {open && (
            <figure className="flex h-full w-full flex-col items-center justify-center gap-3">
              <img src={open.full} alt={open.alt} className="block max-h-[calc(100dvh-6rem)] w-auto max-w-full object-contain" />
              <figcaption className="text-[11px] font-semibold uppercase tracking-[0.25em] text-black/60">{open.title}</figcaption>
            </figure>
          )}
          <button type="button" onClick={() => setOpen(null)} aria-label="Close image" className="absolute right-3 top-3 p-2 text-black focus-visible:outline-2 focus-visible:outline-black sm:right-6 sm:top-6">
            <X className="h-6 w-6" />
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
