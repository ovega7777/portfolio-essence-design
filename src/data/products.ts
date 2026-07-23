import { collections } from "./collections";

export type ProductImage = { url: string; alt: string };

export type ProductVariant = {
  id: string;
  color: string;
  swatch?: string;
  sku: string;
  sizes: string[];
  images: {
    frontProduct: ProductImage;
    backProduct?: ProductImage;
    modelFront?: ProductImage;
    modelBack?: ProductImage;
    details?: ProductImage[];
    extraShots?: ProductImage[];
  };
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  collectionId: string;
  category: string;
  price: number;
  description: string;
  featured: boolean;
  displayOrder: number;
  variants: ProductVariant[];
};

/**
 * Products live in this file. To add a new product:
 *   1. Upload images through the asset system.
 *   2. Add a new object below with all fields filled.
 *   3. Assign `collectionId`, `category`, and a unique `displayOrder`.
 * No code changes to components required.
 *
 * Sorting: always by `displayOrder` ascending. Never by date.
 */
import frontImg from "@/assets/products/oxblood-hoodie/front.png.asset.json";
import backImg from "@/assets/products/oxblood-hoodie/back.png.asset.json";
import detailFrontImg from "@/assets/products/oxblood-hoodie/detail-front.png.asset.json";
import model1Img from "@/assets/products/oxblood-hoodie/model-1.png.asset.json";
import model2Img from "@/assets/products/oxblood-hoodie/model-2.png.asset.json";

import greenFront from "@/assets/products/zip-knit-hoodie/green/front.png.asset.json";
import greenFrontPatched from "@/assets/products/zip-knit-hoodie/green/front-patched.png.asset.json";
import greenBack from "@/assets/products/zip-knit-hoodie/green/back.png.asset.json";
import greenModel1 from "@/assets/products/zip-knit-hoodie/green/model-1.png.asset.json";
import greenModel2 from "@/assets/products/zip-knit-hoodie/green/model-2.png.asset.json";

import navyFront from "@/assets/products/zip-knit-hoodie/navy/front.png.asset.json";
import navyBack from "@/assets/products/zip-knit-hoodie/navy/back.png.asset.json";

import blackFront from "@/assets/products/zip-knit-hoodie/black/front.png.asset.json";
import blackBack from "@/assets/products/zip-knit-hoodie/black/back.png.asset.json";

import oliveFront from "@/assets/products/zip-knit-hoodie/olive/front.png.asset.json";
import oliveFrontPatched from "@/assets/products/zip-knit-hoodie/olive/front-patched.png.asset.json";
import oliveBack from "@/assets/products/zip-knit-hoodie/olive/back.png.asset.json";
import oliveModel1 from "@/assets/products/zip-knit-hoodie/olive/model-1.png.asset.json";
import oliveModel2 from "@/assets/products/zip-knit-hoodie/olive/model-2.png.asset.json";

export const products: Product[] = [
  {
    id: "command-zip-knit-hoodie-oxblood",
    slug: "command-zip-knit-hoodie-oxblood",
    name: "ZIP KNIT HOODIE",
    collectionId: "collection-1",
    category: "Knitwear",
    price: 275,
    description:
      "Heavyweight ribbed knit zip hoodie. Cropped silhouette with wide sleeves, drawcord hood, and elbow patches. Finished with 'C' chest patch and 'NO COMPLY / SORRY ABOUT THAT' sleeve patches.",
    featured: true,
    displayOrder: 1,
    variants: [
      {
        id: "oxblood",
        color: "Oxblood",
        swatch: "#6b1220",
        sku: "NC-CMD-KNIT-OXB",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: frontImg.url, alt: "Oxblood zip knit hoodie — front" },
          backProduct: { url: backImg.url, alt: "Oxblood zip knit hoodie — back with elbow patches" },
          details: [
            { url: detailFrontImg.url, alt: "Front detail — 'C' chest patch and 'NO COMPLY' sleeve patches" },
          ],
          modelFront: { url: model1Img.url, alt: "Model wearing oxblood zip knit hoodie — look 1" },
          modelBack: { url: model2Img.url, alt: "Model wearing oxblood zip knit hoodie — look 2" },
        },
      },
      {
        id: "green",
        color: "Olive",
        swatch: "#4b5320",
        sku: "NC-CMD-KNIT-GRN",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: greenFront.url, alt: "Olive zip knit hoodie — front" },
          backProduct: { url: greenBack.url, alt: "Olive zip knit hoodie — back with elbow patches" },
          details: [
            { url: greenFrontPatched.url, alt: "Front detail — 'USA' chest patch and sleeve patches on olive knit" },
          ],
          modelFront: { url: greenModel1.url, alt: "Model wearing olive zip knit hoodie — look 1" },
          modelBack: { url: greenModel2.url, alt: "Model wearing olive zip knit hoodie — look 2" },
        },
      },
      {
        id: "navy",
        color: "Navy",
        swatch: "#0f1a3a",
        sku: "NC-CMD-KNIT-NVY",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: navyFront.url, alt: "Navy zip knit hoodie — front" },
          backProduct: { url: navyBack.url, alt: "Navy zip knit hoodie — back with elbow patches" },
        },
      },
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-CMD-KNIT-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: blackFront.url, alt: "Black zip knit hoodie — front" },
          backProduct: { url: blackBack.url, alt: "Black zip knit hoodie — back with elbow patches" },
        },
      },
    ],
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCollection = (collectionId: string) =>
  products
    .filter((p) => p.collectionId === collectionId)
    .sort((a, b) => a.displayOrder - b.displayOrder);

export const getCategories = (collectionId?: string) => {
  const source = collectionId
    ? products.filter((p) => p.collectionId === collectionId)
    : products;
  return Array.from(new Set(source.map((p) => p.category))).sort();
};

// re-export for convenience
export { collections };
