import type { CSSProperties } from "react";

// Natural image ratios give each mobile pair a shared height without cropping.
export function mobileImagePairStyle(images: readonly { width?: number; height?: number }[]): CSSProperties {
  return {
    "--nc-mobile-image-columns": images.slice(0, 2).map(({ width = 3, height = 4 }) =>
      `minmax(0, ${width / height}fr)`
    ).join(" "),
  } as CSSProperties;
}
