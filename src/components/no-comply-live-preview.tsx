import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const SITE_URL = "https://riot-reveal-commerce.lovable.app";
const FRAME_WIDTH = 1440;
const FRAME_HEIGHT = 900;

/** Browser-style window containing the live NO COMPLY USA site, scaled to fit its container. */
export function NoComplyLivePreview() {
  const holder = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    const element = holder.current;
    if (!element) return;
    const update = () => setScale(element.clientWidth / FRAME_WIDTH);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-black/15 bg-white shadow-[0_18px_50px_-20px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-2 border-b border-black/10 bg-neutral-100 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate rounded bg-white px-3 py-1 text-[10px] tracking-wide text-black/50">
          riot-reveal-commerce.lovable.app
        </span>
      </div>
      <div
        ref={holder}
        className="relative w-full overflow-hidden bg-black"
        style={{ height: FRAME_HEIGHT * scale }}
      >
        <iframe
          src={SITE_URL}
          title="NO COMPLY USA live website preview"
          loading="lazy"
          allow="autoplay; fullscreen"
          className="absolute left-0 top-0 origin-top-left border-0"
          style={{ width: FRAME_WIDTH, height: FRAME_HEIGHT, transform: `scale(${scale})` }}
        />
      </div>
    </div>
  );
}

export function NoComplyPreviewActions() {
  const button =
    "flex min-h-12 w-full items-center justify-center border border-black px-7 py-4 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors sm:w-auto";
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
      <Link to="/projects/no-comply" className={`${button} bg-black text-white hover:bg-white hover:text-black`}>
        Enter Shop
      </Link>
      <a
        href={SITE_URL}
        target="_blank"
        rel="noreferrer noopener"
        className={`${button} hover:bg-black hover:text-white`}
      >
        View Full Website
      </a>
    </div>
  );
}

export function NoComplyPreviewDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[min(1100px,94vw)] max-w-none overflow-y-auto border-black/10 bg-white p-4 text-black sm:p-6">
        <DialogTitle className="text-[11px] font-bold uppercase tracking-[0.25em]">
          NO COMPLY USA — Live Website
        </DialogTitle>
        <DialogDescription className="sr-only">
          A live embedded preview of the NO COMPLY USA website.
        </DialogDescription>
        {open && <NoComplyLivePreview />}
        <NoComplyPreviewActions />
      </DialogContent>
    </Dialog>
  );
}
