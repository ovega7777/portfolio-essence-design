import type { ReactNode } from "react";

export function CollectionProductGrid({ children, className }: { children: ReactNode; className: string }) {
  return <div className={`nc-mobile-product-grid ${className}`}>{children}</div>;
}
