/** Rounded geometric lettering inspired by the supplied blue MID MOD artwork. */
export function MidModWordmark({ hero = false }: { hero?: boolean }) {
  const m = "M0 100V40C0 6 39 -12 65 12C91 -12 130 6 130 40V100H96V44C96 32 82 32 82 44V100H48V44C48 32 34 32 34 44V100Z";
  const d = "M0 2H43C110 2 110 100 43 100H0ZM34 32V70H43C68 70 68 32 43 32Z";
  return (
    <span className={`mid-mod-wordmark${hero ? " mid-mod-wordmark--hero" : ""}`}>
      <span className="sr-only">MID MOD</span>
      <svg aria-hidden="true" viewBox="0 0 680 102" fill="currentColor">
        <path d={m} />
        <rect x="138" y="2" width="32" height="98" rx="2" />
        <path d={d} transform="translate(178)" fillRule="evenodd" />
        <path d={m} transform="translate(310)" />
        <path d="M498 0a51 51 0 1 0 0 102a51 51 0 1 0 0-102Zm0 32a19 19 0 1 1 0 38a19 19 0 1 1 0-38Z" fillRule="evenodd" />
        <path d={d} transform="translate(557)" fillRule="evenodd" />
      </svg>
    </span>
  );
}
