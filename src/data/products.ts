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
  /** Products sharing the same swatchGroup show a unified color-selector row. */
  swatchGroup?: string;
  variants: ProductVariant[];
};

export type GroupedVariant = {
  productSlug: string;
  variantId: string;
  color: string;
  swatch?: string;
  frontImage: { url: string; alt: string };
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
import oxbloodFront from "@/assets/products/oxblood-hoodie/front.png.asset.json";
import oxbloodBack from "@/assets/products/oxblood-hoodie/back.png.asset.json";
import oxbloodDetailFront from "@/assets/products/oxblood-hoodie/detail-front.png.asset.json";
import oxbloodModel1 from "@/assets/products/oxblood-hoodie/model-1.png.asset.json";
import oxbloodModel2 from "@/assets/products/oxblood-hoodie/model-2.png.asset.json";

import hoodieNavyFront from "@/assets/products/zip-knit-hoodie/navy/front.png.asset.json";
import hoodieNavyBack from "@/assets/products/zip-knit-hoodie/navy/back.png.asset.json";

import hoodieBlackFront from "@/assets/products/zip-knit-hoodie/black/front.png.asset.json";
import hoodieBlackBack from "@/assets/products/zip-knit-hoodie/black/back.png.asset.json";

import hoodieOliveFront from "@/assets/products/zip-knit-hoodie/olive/front.png.asset.json";
import hoodieOliveFrontPatched from "@/assets/products/zip-knit-hoodie/olive/front-patched.png.asset.json";
import hoodieOliveBack from "@/assets/products/zip-knit-hoodie/olive/back.png.asset.json";
import hoodieOliveModel1 from "@/assets/products/zip-knit-hoodie/olive/model-1.png.asset.json";
import hoodieOliveModel2 from "@/assets/products/zip-knit-hoodie/olive/model-2.png.asset.json";

import shirtBlackFront from "@/assets/products/sergeant-shirt/black/front.png.asset.json";
import shirtBlackBack from "@/assets/products/sergeant-shirt/black/back.png.asset.json";
import shirtBlackDetail from "@/assets/products/sergeant-shirt/black/detail.png.asset.json";
import shirtBlackModel1 from "@/assets/products/sergeant-shirt/black/model-1.png.asset.json";
import shirtBlackModel2 from "@/assets/products/sergeant-shirt/black/model-2.png.asset.json";
import shirtBlackModel3 from "@/assets/products/sergeant-shirt/black/model-3.png.asset.json";

import shirtNavyFront from "@/assets/products/sergeant-shirt/navy/front.png.asset.json";
import shirtNavyBack from "@/assets/products/sergeant-shirt/navy/back.png.asset.json";
import shirtNavyDetail from "@/assets/products/sergeant-shirt/navy/detail.png.asset.json";
import shirtNavyModel1 from "@/assets/products/sergeant-shirt/navy/model-1.png.asset.json";
import shirtNavyModel2 from "@/assets/products/sergeant-shirt/navy/model-2.png.asset.json";
import shirtNavyModel3 from "@/assets/products/sergeant-shirt/navy/model-3.png.asset.json";

import shirtOliveFront from "@/assets/products/sergeant-shirt/olive/front.png.asset.json";
import shirtOliveBack from "@/assets/products/sergeant-shirt/olive/back.png.asset.json";
import shirtWhiteFront from "@/assets/products/sergeant-shirt/white/front.png.asset.json";
import shirtWhiteBack from "@/assets/products/sergeant-shirt/white/back.png.asset.json";

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
    swatchGroup: "zip-knit-hoodie",
    variants: [
      {
        id: "oxblood",
        color: "Oxblood",
        swatch: "#6b1220",
        sku: "NC-CMD-KNIT-OXB",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: oxbloodFront.url, alt: "Oxblood zip knit hoodie — front" },
          backProduct: { url: oxbloodBack.url, alt: "Oxblood zip knit hoodie — back with elbow patches" },
          details: [
            {
              url: oxbloodDetailFront.url,
              alt: "Front detail — 'C' chest patch and 'NO COMPLY' sleeve patches",
            },
          ],
          modelFront: { url: oxbloodModel1.url, alt: "Model wearing oxblood zip knit hoodie — look 1" },
          modelBack: { url: oxbloodModel2.url, alt: "Model wearing oxblood zip knit hoodie — look 2" },
        },
      },
      {
        id: "navy",
        color: "Navy",
        swatch: "#0f1a3a",
        sku: "NC-CMD-KNIT-NVY",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: hoodieNavyFront.url, alt: "Navy zip knit hoodie — front" },
          backProduct: { url: hoodieNavyBack.url, alt: "Navy zip knit hoodie — back with elbow patches" },
        },
      },
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-CMD-KNIT-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: hoodieBlackFront.url, alt: "Black zip knit hoodie — front" },
          backProduct: { url: hoodieBlackBack.url, alt: "Black zip knit hoodie — back with elbow patches" },
        },
      },
    ],
  },
  {
    id: "command-zip-knit-hoodie-olive",
    slug: "command-zip-knit-hoodie-olive",
    name: "ZIP KNIT HOODIE",
    collectionId: "collection-1",
    category: "Knitwear",
    price: 275,
    description:
      "Heavyweight ribbed knit zip hoodie in olive. Cropped silhouette with wide sleeves, drawcord hood, and elbow patches. Finished with 'USA' chest patch and 'NO COMPLY / SORRY ABOUT THAT' sleeve patches.",
    featured: false,
    displayOrder: 2,
    swatchGroup: "zip-knit-hoodie",
    variants: [
      {
        id: "olive",
        color: "Olive",
        swatch: "#5a5a2b",
        sku: "NC-CMD-KNIT-OLV",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: hoodieOliveFront.url, alt: "Olive zip knit hoodie — front" },
          backProduct: { url: hoodieOliveBack.url, alt: "Olive zip knit hoodie — back with elbow patches" },
          details: [
            {
              url: hoodieOliveFrontPatched.url,
              alt: "Front detail — 'USA' chest patch and sleeve patches on olive knit",
            },
          ],
          modelFront: { url: hoodieOliveModel1.url, alt: "Model wearing olive zip knit hoodie — look 1" },
          modelBack: { url: hoodieOliveModel2.url, alt: "Model wearing olive zip knit hoodie — look 2" },
        },
      },
    ],
  },
  {
    id: "command-sergeant-shirt-black",
    slug: "command-sergeant-shirt-black",
    name: "SERGEANT SHIRT",
    collectionId: "collection-1",
    category: "Shirting",
    price: 245,
    description:
      "Structured button-up sergeant shirt in black with epaulets, flap chest pockets, and silver snap hardware. Finished with tonal patched detailing and three editorial look images.",
    featured: false,
    displayOrder: 3,
    swatchGroup: "sergeant-shirt",
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-CMD-SHIRT-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: shirtBlackFront.url, alt: "Black sergeant shirt — front" },
          backProduct: { url: shirtBlackBack.url, alt: "Black sergeant shirt — back" },
          details: [
            {
              url: shirtBlackDetail.url,
              alt: "Black sergeant shirt detail — front patched version with chest and sleeve graphics",
            },
          ],
          modelFront: { url: shirtBlackModel1.url, alt: "Model wearing black sergeant shirt — look 1" },
          modelBack: { url: shirtBlackModel2.url, alt: "Model wearing black sergeant shirt — look 2" },
          extraShots: [
            { url: shirtBlackModel3.url, alt: "Model wearing black sergeant shirt — look 3" },
          ],
        },
      },
    ],
  },
  {
    id: "command-sergeant-shirt-navy",
    slug: "command-sergeant-shirt-navy",
    name: "SERGEANT SHIRT",
    collectionId: "collection-1",
    category: "Shirting",
    price: 245,
    description:
      "Structured button-up sergeant shirt in navy with epaulets, flap chest pockets, and silver snap hardware. Finished with tonal patched detailing and three editorial look images.",
    featured: false,
    displayOrder: 4,
    swatchGroup: "sergeant-shirt",
    variants: [
      {
        id: "navy",
        color: "Navy",
        swatch: "#16234a",
        sku: "NC-CMD-SHIRT-NVY",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: shirtNavyFront.url, alt: "Navy sergeant shirt — front" },
          backProduct: { url: shirtNavyBack.url, alt: "Navy sergeant shirt — back" },
          details: [
            {
              url: shirtNavyDetail.url,
              alt: "Navy sergeant shirt detail — front patched version with chest and sleeve graphics",
            },
          ],
          modelFront: { url: shirtNavyModel1.url, alt: "Model wearing navy sergeant shirt — look 1" },
          modelBack: { url: shirtNavyModel2.url, alt: "Model wearing navy sergeant shirt — look 2" },
          extraShots: [
            { url: shirtNavyModel3.url, alt: "Model wearing navy sergeant shirt — look 3" },
          ],
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

/**
 * Returns swatches to render for a product's color selector. When the product
 * has a `swatchGroup`, this includes variants from every product sharing the
 * group (deduped by variant id, first occurrence wins). Otherwise it returns
 * just the product's own variants.
 */
export const getGroupedVariants = (product: Product): GroupedVariant[] => {
  const source = product.swatchGroup
    ? products
        .filter((p) => p.swatchGroup === product.swatchGroup)
        .sort((a, b) => a.displayOrder - b.displayOrder)
    : [product];
  const seen = new Set<string>();
  const out: GroupedVariant[] = [];
  for (const p of source) {
    for (const v of p.variants) {
      if (seen.has(v.id)) continue;
      seen.add(v.id);
      out.push({
        productSlug: p.slug,
        variantId: v.id,
        color: v.color,
        swatch: v.swatch,
        frontImage: v.images.frontProduct,
      });
    }
  }
  return out;
};

// re-export for convenience
export { collections };
