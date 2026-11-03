import full01 from "@/assets/lucky-day/editorial/ldc-editorial-01.jpg.asset.json";
import full02 from "@/assets/lucky-day/editorial/ldc-editorial-02.jpg.asset.json";
import full03 from "@/assets/lucky-day/editorial/ldc-editorial-03.jpg.asset.json";
import full04 from "@/assets/lucky-day/editorial/ldc-editorial-04.jpg.asset.json";
import full05 from "@/assets/lucky-day/editorial/ldc-editorial-05.jpg.asset.json";
import full06 from "@/assets/lucky-day/editorial/ldc-editorial-06.jpg.asset.json";
import full07 from "@/assets/lucky-day/editorial/ldc-editorial-07.jpg.asset.json";
import full08 from "@/assets/lucky-day/editorial/ldc-editorial-08.jpg.asset.json";
import thumb01 from "@/assets/lucky-day/editorial/ldc-editorial-01-thumb.jpg.asset.json";
import thumb02 from "@/assets/lucky-day/editorial/ldc-editorial-02-thumb.jpg.asset.json";
import thumb03 from "@/assets/lucky-day/editorial/ldc-editorial-03-thumb.jpg.asset.json";
import thumb04 from "@/assets/lucky-day/editorial/ldc-editorial-04-thumb.jpg.asset.json";
import thumb05 from "@/assets/lucky-day/editorial/ldc-editorial-05-thumb.jpg.asset.json";
import thumb06 from "@/assets/lucky-day/editorial/ldc-editorial-06-thumb.jpg.asset.json";
import thumb07 from "@/assets/lucky-day/editorial/ldc-editorial-07-thumb.jpg.asset.json";
import thumb08 from "@/assets/lucky-day/editorial/ldc-editorial-08-thumb.jpg.asset.json";

/** Full artwork is 3:4 portrait (1600×2133 web copy). */
export const LUCKY_DAY_EDITORIAL_WIDTH = 1600;
export const LUCKY_DAY_EDITORIAL_HEIGHT = 2133;

export type LuckyDayEditorialImage = { src: string; thumb: string; alt: string };

const alt = (subject: string) => `Lucky Day Co. editorial: ${subject}`;

/** Bottom four posters (05–08) lead; 01–04 follow in original order. */
export const luckyDayEditorial: LuckyDayEditorialImage[] = [
  { src: full05.url, thumb: thumb05.url, alt: alt("man in sunglasses and suspenders wearing silver rings and hoop earrings") },
  { src: full06.url, thumb: thumb06.url, alt: alt("woman with a spiked mullet wearing a studded collar and silver piercings") },
  { src: full07.url, thumb: thumb07.url, alt: alt("man in a cap with a neck tattoo wearing a silver padlock chain") },
  { src: full08.url, thumb: thumb08.url, alt: alt("smiling girl with braids wearing a silver pendant necklace and hoops") },
  { src: full01.url, thumb: thumb01.url, alt: alt("tattooed man with feather and cross earrings, “Handcrafted Good Fortune”") },
  { src: full02.url, thumb: thumb02.url, alt: alt("woman wearing layered silver coin necklaces and ornate earrings") },
  { src: full03.url, thumb: thumb03.url, alt: alt("man with an afro wearing chunky silver chains") },
  { src: full04.url, thumb: thumb04.url, alt: alt("woman in a puffer jacket wearing silver religious medallion necklaces") },
];

export const luckyDayDescription =
  "Editorial photo editing and graphic design for Lucky Day Co., a jewelry and lifestyle brand — a series of eight black-and-white portrait posters finished with brand typography, layout, and borders.";
