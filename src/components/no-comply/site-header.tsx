import { useState } from "react";

import { NoComplyBackButton } from "@/components/no-comply/back-button";
import { LogoBanner } from "@/components/no-comply/logo-banner";
import { NoComplyUtilityBar } from "@/components/no-comply/page-indicator";
import { StandardNoComplyMenu } from "@/components/no-comply/standard-menu";

interface NoComplySiteHeaderProps {
  pageName: string;
  activeCollection?: "command" | "caught-on-film";
}

export function NoComplySiteHeader({
  pageName,
  activeCollection,
}: NoComplySiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <NoComplyUtilityBar
        pageName={pageName}
        backControl={
          <NoComplyBackButton className="nc-display block whitespace-nowrap text-base tracking-widest text-black transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:text-lg" />
        }
      />

      <LogoBanner
        menuOpen={menuOpen}
        onMenu={() => setMenuOpen(true)}
      />

      <StandardNoComplyMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeCollection={activeCollection}
      />
    </>
  );
}
