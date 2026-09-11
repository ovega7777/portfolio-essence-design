export function LuckyDayWordmark({ hero = false }: { hero?: boolean }) {
  return (
    <span className={`lucky-day-wordmark${hero ? " lucky-day-wordmark--hero" : ""}`}>
      Lucky Day Co.
    </span>
  );
}
