import { Link, useRouterState } from "@tanstack/react-router";

interface NoComplyBackButtonProps {
  className?: string;
}

export function NoComplyBackButton({ className }: NoComplyBackButtonProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";
  const isProjectHomepage = normalizedPathname === "/projects/no-comply";

  if (isProjectHomepage) {
    return (
      <Link
        to="/"
        className={className}
        aria-label="Back to portfolio home"
        data-no-comply-back-button
      >
        ← HOME
      </Link>
    );
  }

  return (
    <Link
      to="/projects/no-comply"
      className={className}
      aria-label="Back to NO COMPLY USA"
      data-no-comply-back-button
    >
      ← NO COMPLY USA
    </Link>
  );
}
