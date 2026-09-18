import wordmark from "@/assets/no-comply/wordmark.png";

export function MenuWordmark({ dark = false }: { dark?: boolean }) {
  return (
    <img
      src={wordmark}
      alt="NO COMPLY USA"
      width={931}
      height={126}
      className={`block h-auto w-[180px] min-w-0 shrink object-contain ${dark ? "mix-blend-screen" : "invert"}`}
    />
  );
}
