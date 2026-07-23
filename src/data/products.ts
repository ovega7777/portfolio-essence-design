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
  modelImage?: { url: string; alt: string };
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

import tigerBlackFront from "@/assets/products/tiger-tee/black/front.png.asset.json";
import tigerBlackModel from "@/assets/products/tiger-tee/black/model.png.asset.json";
import tigerForestFront from "@/assets/products/tiger-tee/forest/front.png.asset.json";
import tigerForestModel from "@/assets/products/tiger-tee/forest/model.png.asset.json";
import tigerNavyFront from "@/assets/products/tiger-tee/navy/front.png.asset.json";
import tigerNavyModel from "@/assets/products/tiger-tee/navy/model.png.asset.json";

import trousersBlackFront from "@/assets/products/pleated-trousers/black/front.png.asset.json";
import trousersBlackBack from "@/assets/products/pleated-trousers/black/back.png.asset.json";
import trousersBlackModel1Front from "@/assets/products/pleated-trousers/black/model-1-front.png.asset.json";
import trousersBlackModel1Back from "@/assets/products/pleated-trousers/black/model-1-back.png.asset.json";
import trousersBlackModel2Front from "@/assets/products/pleated-trousers/black/model-2-front.png.asset.json";
import trousersBlackModel2Back from "@/assets/products/pleated-trousers/black/model-2-back.png.asset.json";
import trousersBrownFront from "@/assets/products/pleated-trousers/brown/front.png.asset.json";
import trousersBrownBack from "@/assets/products/pleated-trousers/brown/back.png.asset.json";

import pinupWhiteFront from "@/assets/products/army-pinup-tee/white/front.png.asset.json";
import pinupWhiteModel from "@/assets/products/army-pinup-tee/white/model.png.asset.json";
import pinupBlackFront from "@/assets/products/army-pinup-tee/black/front.png.asset.json";
import pinupBlackModel from "@/assets/products/army-pinup-tee/black/model.png.asset.json";
import pinupNavyFront from "@/assets/products/army-pinup-tee/navy/front.png.asset.json";
import pinupNavyModel from "@/assets/products/army-pinup-tee/navy/model.png.asset.json";
import pinupOliveFront from "@/assets/products/army-pinup-tee/olive/front.png.asset.json";
import pinupOliveModel from "@/assets/products/army-pinup-tee/olive/model.png.asset.json";

import cargoBlackFront from "@/assets/products/cpt-cargo-pant/black/front.png.asset.json";
import cargoBlackBack from "@/assets/products/cpt-cargo-pant/black/back.png.asset.json";
import cargoBlackModel1 from "@/assets/products/cpt-cargo-pant/black/model-1.png.asset.json";
import cargoBlackModel2 from "@/assets/products/cpt-cargo-pant/black/model-2.png.asset.json";
import cargoPlaidFront from "@/assets/products/cpt-cargo-pant/plaid/front.png.asset.json";
import cargoPlaidBack from "@/assets/products/cpt-cargo-pant/plaid/back.png.asset.json";
import cargoPlaidModel1 from "@/assets/products/cpt-cargo-pant/plaid/model-1.png.asset.json";
import cargoPlaidModel2 from "@/assets/products/cpt-cargo-pant/plaid/model-2.png.asset.json";
import cargoOliveFront from "@/assets/products/cpt-cargo-pant/olive/front.png.asset.json";
import cargoOliveBack from "@/assets/products/cpt-cargo-pant/olive/back.png.asset.json";
import cargoBrownFront from "@/assets/products/cpt-cargo-pant/brown/front.png.asset.json";
import cargoBrownBack from "@/assets/products/cpt-cargo-pant/brown/back.png.asset.json";

import captainFront from "@/assets/products/captains-jacket/front.png.asset.json";
import captainFrontPatched from "@/assets/products/captains-jacket/front-patched.png.asset.json";
import captainBack from "@/assets/products/captains-jacket/back.png.asset.json";
import captainModel1 from "@/assets/products/captains-jacket/model-1.png.asset.json";
import captainModel2 from "@/assets/products/captains-jacket/model-2.png.asset.json";
import captainModel3 from "@/assets/products/captains-jacket/model-3.png.asset.json";

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
      {
        id: "olive",
        color: "Olive",
        swatch: "#5a5a2b",
        sku: "NC-CMD-SHIRT-OLV",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: shirtOliveFront.url, alt: "Olive sergeant shirt — front" },
          backProduct: { url: shirtOliveBack.url, alt: "Olive sergeant shirt — back" },
        },
      },
      {
        id: "white",
        color: "White",
        swatch: "#f2ece0",
        sku: "NC-CMD-SHIRT-WHT",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: shirtWhiteFront.url, alt: "White sergeant shirt — front" },
          backProduct: { url: shirtWhiteBack.url, alt: "White sergeant shirt — back" },
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
  {
    id: "command-tiger-tee",
    slug: "command-tiger-tee",
    name: "NC TIGER TEE",
    collectionId: "collection-1",
    category: "Tees",
    price: 99,
    description:
      "Tonal tiger camo tee with arched 'NO COMPLY USA' chest print. Boxy fit, ribbed crew, garment-washed for a lived-in hand.",
    featured: false,
    displayOrder: 5,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-CMD-TEE-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: tigerBlackFront.url, alt: "Black tiger camo tee — front" },
          modelFront: { url: tigerBlackModel.url, alt: "Model wearing black tiger camo tee" },
        },
      },
      {
        id: "forest",
        color: "Forest",
        swatch: "#3a4a2a",
        sku: "NC-CMD-TEE-FOR",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: tigerForestFront.url, alt: "Forest tiger camo tee — front" },
          modelFront: { url: tigerForestModel.url, alt: "Model wearing forest tiger camo tee" },
        },
      },
      {
        id: "navy",
        color: "Navy",
        swatch: "#16234a",
        sku: "NC-CMD-TEE-NVY",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: tigerNavyFront.url, alt: "Navy tiger camo tee — front" },
          modelFront: { url: tigerNavyModel.url, alt: "Model wearing navy tiger camo tee" },
        },
      },
    ],
  },
  {
    id: "command-pleated-trousers",
    slug: "command-pleated-trousers",
    name: "NC PLEATED TROUSERS",
    collectionId: "collection-1",
    category: "Trousers",
    price: 195,
    description:
      "Wide-leg pleated trousers with an asymmetric four-button fly, deep front pleats, belt loops, and turned-up cuffed hem. Cut in a heavyweight suiting fabric with a manifesto script patch pocket at the back.",
    featured: false,
    displayOrder: 6,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-CMD-TROUS-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: trousersBlackFront.url, alt: "Black pleated trousers — front" },
          backProduct: { url: trousersBlackBack.url, alt: "Black pleated trousers — back with manifesto patch" },
          modelFront: { url: trousersBlackModel1Front.url, alt: "Model wearing black pleated trousers — look 1 front" },
          modelBack: { url: trousersBlackModel1Back.url, alt: "Model wearing black pleated trousers — look 1 back" },
          extraShots: [
            { url: trousersBlackModel2Front.url, alt: "Model wearing black pleated trousers — look 2 front" },
            { url: trousersBlackModel2Back.url, alt: "Model wearing black pleated trousers — look 2 back" },
          ],
        },
      },
      {
        id: "brown",
        color: "Brown",
        swatch: "#3a2a1a",
        sku: "NC-CMD-TROUS-BRN",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: trousersBrownFront.url, alt: "Brown pleated trousers — front" },
          backProduct: { url: trousersBrownBack.url, alt: "Brown pleated trousers — back with manifesto patch" },
          modelFront: { url: trousersBlackModel1Front.url, alt: "Model wearing pleated trousers — look 1 front" },
          modelBack: { url: trousersBlackModel1Back.url, alt: "Model wearing pleated trousers — look 1 back" },
          extraShots: [
            { url: trousersBlackModel2Front.url, alt: "Model wearing pleated trousers — look 2 front" },
            { url: trousersBlackModel2Back.url, alt: "Model wearing pleated trousers — look 2 back" },
          ],
        },

      },
    ],
  },
  {
    id: "command-army-pinup-tee",
    slug: "command-army-pinup-tee",
    name: "NC ARMY PIN UP TEE",
    collectionId: "collection-1",
    category: "Tees",
    price: 55,
    description:
      "Cropped baby tee with pin-up 'NO COMPLY' chorus-line chest graphic. Boxy-slim fit, ribbed crew, garment-washed cotton.",
    featured: false,
    displayOrder: 7,
    variants: [
      {
        id: "white",
        color: "White",
        swatch: "#f2ece0",
        sku: "NC-CMD-PINUP-WHT",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: pinupWhiteFront.url, alt: "White NC army pin up tee — front" },
          modelFront: { url: pinupWhiteModel.url, alt: "Model wearing white NC army pin up tee" },
        },
      },
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-CMD-PINUP-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: pinupBlackFront.url, alt: "Black NC army pin up tee — front" },
          modelFront: { url: pinupBlackModel.url, alt: "Model wearing black NC army pin up tee" },
        },
      },
      {
        id: "navy",
        color: "Navy",
        swatch: "#16234a",
        sku: "NC-CMD-PINUP-NVY",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: pinupNavyFront.url, alt: "Navy NC army pin up tee — front" },
          modelFront: { url: pinupNavyModel.url, alt: "Model wearing navy NC army pin up tee" },
        },
      },
      {
        id: "olive",
        color: "Olive",
        swatch: "#5a5a2b",
        sku: "NC-CMD-PINUP-OLV",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: pinupOliveFront.url, alt: "Olive NC army pin up tee — front" },
          modelFront: { url: pinupOliveModel.url, alt: "Model wearing olive NC army pin up tee" },
        },
      },
    ],
  },
  {
    id: "command-cpt-cargo-pant-black",
    slug: "command-cpt-cargo-pant-black",
    name: "CPT. CARGO PANT",
    collectionId: "collection-1",
    category: "Trousers",
    price: 185,
    description:
      "Wide-leg cargo pant with pressed center creases, flap side pockets, welt back pockets, and buttoned hem tabs. Cut in a heavyweight garment-washed twill.",
    featured: false,
    displayOrder: 8,
    swatchGroup: "cpt-cargo-pant",
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-CMD-CARGO-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: cargoBlackFront.url, alt: "Black CPT. cargo pant — front" },
          backProduct: { url: cargoBlackBack.url, alt: "Black CPT. cargo pant — back" },
          modelFront: { url: cargoBlackModel1.url, alt: "Model wearing black CPT. cargo pant — look 1" },
          modelBack: { url: cargoBlackModel2.url, alt: "Model wearing black CPT. cargo pant — look 2" },
        },
      },
      {
        id: "olive",
        color: "Olive",
        swatch: "#5a5a2b",
        sku: "NC-CMD-CARGO-OLV",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: cargoOliveFront.url, alt: "Olive CPT. cargo pant — front" },
          backProduct: { url: cargoOliveBack.url, alt: "Olive CPT. cargo pant — back" },
        },
      },
      {
        id: "brown",
        color: "Brown",
        swatch: "#3a2a1a",
        sku: "NC-CMD-CARGO-BRN",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: cargoBrownFront.url, alt: "Brown CPT. cargo pant — front" },
          backProduct: { url: cargoBrownBack.url, alt: "Brown CPT. cargo pant — back" },
        },
      },
    ],
  },
  {
    id: "command-cpt-cargo-pant-plaid",
    slug: "command-cpt-cargo-pant-plaid",
    name: "CPT. CARGO PANT",
    collectionId: "collection-1",
    category: "Trousers",
    price: 185,
    description:
      "Wide-leg cargo pant in charcoal plaid with pressed center creases, flap side pockets, welt back pockets, and buttoned hem tabs. Cut in a heavyweight garment-washed twill.",
    featured: false,
    displayOrder: 9,
    swatchGroup: "cpt-cargo-pant",
    variants: [
      {
        id: "plaid",
        color: "Plaid",
        swatch: "#2a2a2a",
        sku: "NC-CMD-CARGO-PLD",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: cargoPlaidFront.url, alt: "Plaid CPT. cargo pant — front" },
          backProduct: { url: cargoPlaidBack.url, alt: "Plaid CPT. cargo pant — back" },
          modelFront: { url: cargoPlaidModel1.url, alt: "Model wearing plaid CPT. cargo pant — look 1" },
          modelBack: { url: cargoPlaidModel2.url, alt: "Model wearing plaid CPT. cargo pant — look 2" },
        },
      },
    ],
  },
  {
    id: "command-captains-jacket",
    slug: "command-captains-jacket",
    name: "CAPTAIN'S JACKET",
    collectionId: "collection-1",
    category: "Outerwear",
    price: 450,
    description:
      "Cropped tumbled-leather bomber with sherpa collar, silver double-slider zip, welt hand pockets, and ribbed cuffs and hem. Ships with the full patch set — 'DEALER OF DEATH' spade chest patch, arched 'NO COMPLY' shoulder tab, and 'SORRY ABOUT THAT / OOPS MY BAD / YOU'LL GET OVER IT' sleeve stack — included with purchase.",
    featured: true,
    displayOrder: 10,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-CMD-CAPT-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: { url: captainFrontPatched.url, alt: "Captain's jacket — front with full patch set" },
          backProduct: { url: captainBack.url, alt: "Captain's jacket — back" },
          details: [
            { url: captainFront.url, alt: "Captain's jacket — front, unpatched base" },
          ],
          modelFront: { url: captainModel1.url, alt: "Model wearing captain's jacket — look 1" },
          modelBack: { url: captainModel2.url, alt: "Model wearing captain's jacket — full body look 2" },
          extraShots: [
            { url: captainModel3.url, alt: "Model wearing captain's jacket — look 3" },
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
        modelImage: v.images.modelFront,
      });
    }
  }
  return out;
};

// re-export for convenience
export { collections };
