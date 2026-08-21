import type { ReactNode } from "react";

export function NoComplyPageIndicator({ pageName }: { pageName: string }) {
  return (
    <span
      data-no-comply-page-indicator
      className="nc-display ml-auto min-w-0 truncate whitespace-nowrap text-right text-[10px] uppercase leading-none tracking-[0.14em] text-white sm:text-xs sm:tracking-[0.2em] md:text-sm md:tracking-[0.24em] lg:text-lg lg:tracking-[0.3em]"
    >
      NO COMPLY USA / {pageName}
    </span>
  );
}

export function NoComplyUtilityBar({
  backControl,
  pageName,
  sticky = false,
  className = "",
}: {
  backControl: ReactNode;
  pageName: string;
  sticky?: boolean;
  className?: string;
}) {
  return (
    <nav
      className={`${sticky ? "sticky top-0 z-50" : ""} border-b-2 border-black bg-black text-white ${className}`}
      aria-label="Page navigation"
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <div className="min-w-0 shrink-0">{backControl}</div>
        <NoComplyPageIndicator pageName={pageName} />
      </div>
      <div className="h-0.5 w-full bg-white" aria-hidden="true" />
    </nav>
  );
}
