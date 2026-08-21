import type { ReactNode } from "react";

import { NoComplySiteHeader } from "@/components/no-comply/site-header";

interface EditorialPageShellProps {
  children: ReactNode;
  pageName: string;
}

export function EditorialPageShell({ children, pageName }: EditorialPageShellProps) {
  return (
    <div className="no-comply min-h-screen bg-white text-black">
      <NoComplySiteHeader pageName={pageName} />

      {children}
    </div>
  );
}
