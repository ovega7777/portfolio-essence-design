import { Link } from "@tanstack/react-router";

import upsideDownAmericanFlag from "@/assets/no-comply/editorial/upside-down-american-flag.jpg";

const groupClassName =
  "nc-display flex min-w-0 flex-nowrap items-center gap-3 text-[clamp(2.5rem,7.5vw,6rem)] leading-none tracking-[0.03em] md:gap-5";

const titleClassName =
  "min-w-0 whitespace-nowrap [font:inherit] [letter-spacing:inherit] [line-height:inherit]";

export function NoComplyCommandTitle({
  linked = false,
  className = "",
}: {
  linked?: boolean;
  className?: string;
}) {
  return (
    <div className={`${groupClassName} ${className}`}>
      {linked ? (
        <Link
          to="/projects/no-comply/command"
          search={{ cat: "all", sort: "order", q: "" }}
          className={`${titleClassName} text-black transition-opacity hover:opacity-55`}
        >
          NO COMPLY COMMAND
        </Link>
      ) : (
        <h1 className={`${titleClassName} text-black`}>NO COMPLY COMMAND</h1>
      )}
      <img
        src={upsideDownAmericanFlag}
        alt="Upside-down black-and-white American flag"
        className="h-[0.7em] w-auto shrink-0 object-contain"
      />
    </div>
  );
}
