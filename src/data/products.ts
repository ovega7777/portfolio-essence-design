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
  /** Enables the alternate product image on its Featured Pieces carousel card. */
  carouselHover?: boolean;
  displayOrder: number;
  /** Products sharing the same swatchGroup show a unified color-selector row. */
  swatchGroup?: string;
  /** Variant ids that receive individual collection cards. Defaults to the first variant. */
  listingVariantIds?: string[];
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

import onFilmMockRedFront from "@/assets/products/caught-on-film/on-film-mock-long-sleeve/red/front.png";
import onFilmMockRedModel1 from "@/assets/products/caught-on-film/on-film-mock-long-sleeve/red/model-1.png";
import onFilmMockRedModel2 from "@/assets/products/caught-on-film/on-film-mock-long-sleeve/red/model-2.png";
import onFilmMockBlackFront from "@/assets/products/caught-on-film/on-film-mock-long-sleeve/black/front.png";
import onFilmMockBlackModel1 from "@/assets/products/caught-on-film/on-film-mock-long-sleeve/black/model-1.png";
import onFilmMockBlackModel2 from "@/assets/products/caught-on-film/on-film-mock-long-sleeve/black/model-2.png";
import onFilmMockBlueFront from "@/assets/products/caught-on-film/on-film-mock-long-sleeve/blue/front.png";
import onFilmMockBlueModel1 from "@/assets/products/caught-on-film/on-film-mock-long-sleeve/blue/model-1.png";
import onFilmMockBlueModel2 from "@/assets/products/caught-on-film/on-film-mock-long-sleeve/blue/model-2.png";

import nc17HoodieBlackFront from "@/assets/products/caught-on-film/nc17-hoodie/black/front.jpg";
import nc17HoodieBlackModel1 from "@/assets/products/caught-on-film/nc17-hoodie/black/model-1.jpg";
import nc17HoodieBlackModel2 from "@/assets/products/caught-on-film/nc17-hoodie/black/model-2.jpg";
import nc17HoodieWhiteFront from "@/assets/products/caught-on-film/nc17-hoodie/white/front.jpg";
import nc17HoodieWhiteModel1 from "@/assets/products/caught-on-film/nc17-hoodie/white/model-1.jpg";
import nc17HoodieWhiteModel2 from "@/assets/products/caught-on-film/nc17-hoodie/white/model-2.jpg";
import nc17HoodieRedFront from "@/assets/products/caught-on-film/nc17-hoodie/red/front.jpg";
import nc17HoodieRedModel1 from "@/assets/products/caught-on-film/nc17-hoodie/red/model-1.jpg";
import nc17HoodieRedModel2 from "@/assets/products/caught-on-film/nc17-hoodie/red/model-2.jpg";

import theEndTankWhiteFront from "@/assets/products/caught-on-film/the-end-studded-tank/white/front.jpg";
import theEndTankWhiteModel1 from "@/assets/products/caught-on-film/the-end-studded-tank/white/model-1.jpg";
import theEndTankWhiteModel2 from "@/assets/products/caught-on-film/the-end-studded-tank/white/model-2.jpg";
import theEndTankBlackFront from "@/assets/products/caught-on-film/the-end-studded-tank/black/front.jpg";
import theEndTankBlackModel1 from "@/assets/products/caught-on-film/the-end-studded-tank/black/model-1.jpg";
import theEndTankBlackModel2 from "@/assets/products/caught-on-film/the-end-studded-tank/black/model-2.jpg";

import theEndCrewneckBlackFront from "@/assets/products/caught-on-film/the-end-studded-crewneck/black/front.jpg";
import theEndCrewneckBlackModel1 from "@/assets/products/caught-on-film/the-end-studded-crewneck/black/model-1.jpg";
import theEndCrewneckBlackModel2 from "@/assets/products/caught-on-film/the-end-studded-crewneck/black/model-2.jpg";

import theEndWarmupJacketRedFront from "@/assets/products/caught-on-film/the-end-warmup/jacket/red/front.jpg";
import theEndWarmupJacketBlackFront from "@/assets/products/caught-on-film/the-end-warmup/jacket/black/front.jpg";
import theEndWarmupPantRedFront from "@/assets/products/caught-on-film/the-end-warmup/pant/red/front.jpg";
import theEndWarmupPantRedSide from "@/assets/products/caught-on-film/the-end-warmup/pant/red/side.jpg";
import theEndWarmupPantBlackFront from "@/assets/products/caught-on-film/the-end-warmup/pant/black/front.jpg";
import theEndWarmupPantBlackSide from "@/assets/products/caught-on-film/the-end-warmup/pant/black/side.jpg";
import theEndWarmupRedModel1 from "@/assets/products/caught-on-film/the-end-warmup/models/red/model-1.jpg";
import theEndWarmupRedModel2 from "@/assets/products/caught-on-film/the-end-warmup/models/red/model-2.jpg";
import theEndWarmupBlackModel1 from "@/assets/products/caught-on-film/the-end-warmup/models/black/model-1.jpg";
import theEndWarmupBlackModel2 from "@/assets/products/caught-on-film/the-end-warmup/models/black/model-2.jpg";

import studdedShortsBlackFront from "@/assets/products/caught-on-film/studded-shorts/black/front.jpg";
import studdedShortsBlackSide from "@/assets/products/caught-on-film/studded-shorts/black/side.jpg";
import studdedShortsBlackModel1 from "@/assets/products/caught-on-film/studded-shorts/black/model-1.jpg";
import studdedShortsBlackModel2 from "@/assets/products/caught-on-film/studded-shorts/black/model-2.jpg";

import starTruckerHatBlackFront from "@/assets/products/caught-on-film/star-studded-trucker-hat/black/front.jpg";
import starTruckerHatBlackModel1 from "@/assets/products/caught-on-film/star-studded-trucker-hat/black/model-1.jpg";
import starTruckerHatBlackModel2 from "@/assets/products/caught-on-film/star-studded-trucker-hat/black/model-2.jpg";
import starTruckerHatBlackModel3 from "@/assets/products/caught-on-film/star-studded-trucker-hat/black/model-3.jpg";

import studdedSlippersBlackFront from "@/assets/products/caught-on-film/studded-slippers/black/front.jpg";
import studdedSlippersBlackBack from "@/assets/products/caught-on-film/studded-slippers/black/back.jpg";
import studdedSlippersBlackModel1 from "@/assets/products/caught-on-film/studded-slippers/black/model-1.jpg";

import studdedBeltBlackFront from "@/assets/products/caught-on-film/studded-belt/black/front.jpg";
import studdedBeltBlackModel1 from "@/assets/products/caught-on-film/studded-belt/black/model-1.jpg";

import nc17PatchCapBlackFront from "@/assets/products/caught-on-film/nc17-patch-cap/black/front.jpg";
import nc17PatchCapBlackBack from "@/assets/products/caught-on-film/nc17-patch-cap/black/back.jpg";
import nc17PatchCapBlackModel1 from "@/assets/products/caught-on-film/nc17-patch-cap/black/model-1.jpg";
import nc17PatchCapBlackModel2 from "@/assets/products/caught-on-film/nc17-patch-cap/black/model-2.jpg";

import onFilmSkullCapFront from "@/assets/products/caught-on-film/on-film-skull-cap/black-white/front.jpg";
import onFilmSkullCapBack from "@/assets/products/caught-on-film/on-film-skull-cap/black-white/back.jpg";
import onFilmSkullCapModel1 from "@/assets/products/caught-on-film/on-film-skull-cap/black-white/model-1.jpg";

import onFilmScarfFront from "@/assets/products/caught-on-film/on-film-scarf/black-white/front.jpg";
import onFilmScarfModel1 from "@/assets/products/caught-on-film/on-film-scarf/black-white/model-1.jpg";
import onFilmScarfModel2 from "@/assets/products/caught-on-film/on-film-scarf/black-white/model-2.jpg";

import onFilmToteFront from "@/assets/products/caught-on-film/on-film-tote-bag/black-white/front.jpg";
import onFilmToteModel2 from "@/assets/products/caught-on-film/on-film-tote-bag/black-white/model-2.jpg";
import onFilmToteModel3 from "@/assets/products/caught-on-film/on-film-tote-bag/black-white/model-3.jpg";

import ncTheaterGlassesFront from "@/assets/products/caught-on-film/nc-theater-glasses/black-red/front.jpg";
import ncTheaterGlassesSide from "@/assets/products/caught-on-film/nc-theater-glasses/black-red/side.jpg";

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

import eisenhowerFront from "@/assets/products/distressed-eisenhower-jacket/black/front.png";
import eisenhowerBack from "@/assets/products/distressed-eisenhower-jacket/black/back.png";
import eisenhowerDetailOpen from "@/assets/products/distressed-eisenhower-jacket/black/detail-open.png";
import eisenhowerDetailPins from "@/assets/products/distressed-eisenhower-jacket/black/detail-pins.png";
import eisenhowerModel1 from "@/assets/products/distressed-eisenhower-jacket/black/model-1.png";
import eisenhowerModel2 from "@/assets/products/distressed-eisenhower-jacket/black/model-2.png";
import eisenhowerModel3 from "@/assets/products/distressed-eisenhower-jacket/black/model-3.png";
import eisenhowerModel4 from "@/assets/products/distressed-eisenhower-jacket/black/model-4.png";

import americanHoodieFront from "@/assets/products/american-distress-hoodie-jacket/black/front.png";
import americanHoodieBack from "@/assets/products/american-distress-hoodie-jacket/black/back.png";
import americanHoodieModel1 from "@/assets/products/american-distress-hoodie-jacket/black/model-1.png";
import americanHoodieModel2 from "@/assets/products/american-distress-hoodie-jacket/black/model-2.png";
import americanHoodieModel3 from "@/assets/products/american-distress-hoodie-jacket/black/model-3.png";
import americanHoodieModel4 from "@/assets/products/american-distress-hoodie-jacket/black/model-4.png";

import chuteBlackFront from "@/assets/products/nc-chute-jacket/black/front.png";
import chuteBlackBack from "@/assets/products/nc-chute-jacket/black/back.png";
import chuteBlackModel from "@/assets/products/nc-chute-jacket/black/model.png";
import chuteOliveFront from "@/assets/products/nc-chute-jacket/olive/front.png";
import chuteOliveBack from "@/assets/products/nc-chute-jacket/olive/back.png";
import chuteOliveModel from "@/assets/products/nc-chute-jacket/olive/model.png";
import chutePantsOliveFront from "@/assets/products/nc-chute-pants/olive/front.png";
import chutePantsOliveBack from "@/assets/products/nc-chute-pants/olive/back.png";
import chutePantsOliveModel from "@/assets/products/nc-chute-pants/olive/model.png";
import chutePantsBlackFront from "@/assets/products/nc-chute-pants/black/front.png";
import chutePantsBlackBack from "@/assets/products/nc-chute-pants/black/back.png";
import chutePantsBlackModel from "@/assets/products/nc-chute-pants/black/model.png";
import flakVestBlackFront from "@/assets/products/nc-flak-vest/black/front.png";
import flakVestBlackBack from "@/assets/products/nc-flak-vest/black/back.png";
import flakVestBlackModel from "@/assets/products/nc-flak-vest/black/model.png";
import flakVestOliveFront from "@/assets/products/nc-flak-vest/olive/front.png";
import flakVestOliveBack from "@/assets/products/nc-flak-vest/olive/back.png";
import flakVestOliveModel from "@/assets/products/nc-flak-vest/olive/model.png";
import cargoCapriBlackFront from "@/assets/products/nc-cargo-capri/black/front.png";
import cargoCapriBlackBack from "@/assets/products/nc-cargo-capri/black/back.png";
import cargoCapriBlackModel1 from "@/assets/products/nc-cargo-capri/black/model-1.png";
import cargoCapriBlackModel2 from "@/assets/products/nc-cargo-capri/black/model-2.png";
import cargoMessengerBagBlackFront from "@/assets/products/cargo-messenger-bag/black/front.png";
import cargoMessengerBagBlackBack from "@/assets/products/cargo-messenger-bag/black/back.png";
import cargoMessengerBagBlackModel1 from "@/assets/products/cargo-messenger-bag/black/model-1.png";
import cargoMessengerBagBlackModel2 from "@/assets/products/cargo-messenger-bag/black/model-2.png";
import commandDuffleOliveFront from "@/assets/products/command-duffle/olive/front.png";
import commandDuffleOliveModel1 from "@/assets/products/command-duffle/olive/model-1.png";
import commandDuffleOliveModel2 from "@/assets/products/command-duffle/olive/model-2.png";
import customDogTagsSilverFront from "@/assets/products/custom-dog-tags/silver/front.png";
import customDogTagsSilverBack from "@/assets/products/custom-dog-tags/silver/back.png";
import customDogTagsSilverModel1 from "@/assets/products/custom-dog-tags/silver/model-1.png";
import customDogTagsSilverModel2 from "@/assets/products/custom-dog-tags/silver/model-2.png";
import vetLighterSilverFront from "@/assets/products/vet-lighter/silver/front.png";
import vetLighterSilverBack from "@/assets/products/vet-lighter/silver/back.png";
import vetLighterSilverDetailOpen from "@/assets/products/vet-lighter/silver/detail-open.png";
import patchKitSpecialtyPatches from "@/assets/products/nc-patch-kit/black/specialty-patches.png";
import patchKitScriptPatches from "@/assets/products/nc-patch-kit/black/script-patches.png";
import pinKitSet from "@/assets/products/nc-pin-kit/standard/pin-set.png";
import pinKitHoodieStyling from "@/assets/products/nc-pin-kit/standard/hoodie-styling.png";
import pinKitJacketStyling from "@/assets/products/nc-pin-kit/standard/jacket-styling.png";
import americanDistressHatBlackFront from "@/assets/products/american-distress-hat/black/front.png";
import americanDistressHatBlackBack from "@/assets/products/american-distress-hat/black/back.png";
import americanDistressHatBlackModelWoman from "@/assets/products/american-distress-hat/black/hat-model-woman.png";
import americanDistressHatBlackModelMan from "@/assets/products/american-distress-hat/black/hat-model-man.png";

export const products: Product[] = [
  {
    id: "command-zip-knit-hoodie-oxblood",
    slug: "command-zip-knit-hoodie-oxblood",
    name: "ZIP KNIT HOODIE",
    collectionId: "collection-1",
    category: "Tops",
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
    category: "Tops",
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
    category: "Tops",
    price: 185,
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
    category: "Tops",
    price: 185,
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
    category: "Tops",
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
    category: "Bottoms",
    price: 195,
    description:
      "Wide-leg pleated trousers with an asymmetric four-button fly, deep front pleats, belt loops, and turned-up cuffed hem. Cut in a heavyweight suiting fabric with a manifesto script patch pocket at the back.",
    featured: false,
    displayOrder: 11,
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
    category: "Tops",
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
    category: "Bottoms",
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
    category: "Bottoms",
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
  {
    id: "command-distressed-eisenhower-jacket",
    slug: "command-distressed-eisenhower-jacket",
    name: "EISENHOWER DISTRESS JACKET",
    collectionId: "collection-1",
    category: "Outerwear",
    price: 300,
    description:
      "Cropped black Eisenhower jacket cut in heavyweight cotton with hand-distressed abrasion, exposed repair work, a belted hem, and silver hardware. Finished with a removable trio of No Comply campaign pins.",
    featured: false,
    displayOrder: 12,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-CMD-EIS-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: eisenhowerFront,
            alt: "Black Eisenhower distress jacket — front",
          },
          backProduct: {
            url: eisenhowerBack,
            alt: "Black Eisenhower distress jacket — back",
          },
          details: [
            {
              url: eisenhowerDetailOpen,
              alt: "Black distressed Eisenhower jacket — open construction detail",
            },
            {
              url: eisenhowerDetailPins,
              alt: "Distressed Eisenhower jacket — campaign pin detail",
            },
          ],
          modelFront: {
            url: eisenhowerModel1,
            alt: "Model wearing black distressed Eisenhower jacket — look 1",
          },
          modelBack: {
            url: eisenhowerModel2,
            alt: "Model wearing black distressed Eisenhower jacket — look 2",
          },
          extraShots: [
            {
              url: eisenhowerModel3,
              alt: "Model wearing black distressed Eisenhower jacket — look 3",
            },
            {
              url: eisenhowerModel4,
              alt: "Model wearing black distressed Eisenhower jacket — look 4",
            },
          ],
        },
      },
    ],
  },
  {
    id: "command-american-distress-hoodie-jacket",
    slug: "command-american-distress-hoodie-jacket",
    name: "AMERICAN DISTRESS HOODIE",
    collectionId: "collection-1",
    category: "Outerwear",
    price: 195,
    description:
      "Oversized black hoodie jacket with raw distressed seams, a fractured American flag chest graphic, and removable campaign pins. Cut in heavyweight washed cotton with a double-layer hood, dropped shoulders, and a deep kangaroo pocket.",
    featured: false,
    displayOrder: 13,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-CMD-AMER-HOOD-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: americanHoodieFront,
            alt: "Black American Distress Hoodie Jacket — front",
          },
          backProduct: {
            url: americanHoodieBack,
            alt: "Black American Distress Hoodie Jacket — back",
          },
          modelFront: {
            url: americanHoodieModel1,
            alt: "Model wearing black American Distress Hoodie Jacket — look 1",
          },
          modelBack: {
            url: americanHoodieModel2,
            alt: "Model wearing black American Distress Hoodie Jacket — look 2",
          },
          extraShots: [
            {
              url: americanHoodieModel3,
              alt: "Model wearing black American Distress Hoodie Jacket — look 3",
            },
            {
              url: americanHoodieModel4,
              alt: "Model wearing black American Distress Hoodie Jacket — look 4",
            },
          ],
        },
      },
    ],
  },
  {
    id: "command-nc-chute-jacket",
    slug: "command-nc-chute-jacket",
    name: "NC CHUTE JACKET",
    collectionId: "collection-1",
    category: "Outerwear",
    price: 275,
    description:
      "Technical pullover chute jacket cut in tonal patterned shell fabric with a high funnel hood, adjustable shoulder straps, sculpted utility pockets, and buckle tabs at the cuffs and hem.",
    featured: false,
    displayOrder: 14,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-CMD-CHUTE-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: chuteBlackFront,
            alt: "Black NC Chute Jacket — front",
          },
          backProduct: {
            url: chuteBlackBack,
            alt: "Black NC Chute Jacket — back",
          },
          modelFront: {
            url: chuteBlackModel,
            alt: "Model wearing black NC Chute Jacket",
          },
        },
      },
      {
        id: "olive",
        color: "Olive",
        swatch: "#5a5a45",
        sku: "NC-CMD-CHUTE-OLV",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: chuteOliveFront,
            alt: "Olive NC Chute Jacket — front",
          },
          backProduct: {
            url: chuteOliveBack,
            alt: "Olive NC Chute Jacket — back",
          },
          modelFront: {
            url: chuteOliveModel,
            alt: "Model wearing olive NC Chute Jacket",
          },
        },
      },
    ],
  },
  {
    id: "command-nc-chute-pants",
    slug: "command-nc-chute-pants",
    name: "NC CHUTE PANTS",
    collectionId: "collection-1",
    category: "Bottoms",
    price: 250,
    description:
      "Technical wide-leg chute pants cut in tonal patterned shell fabric with an elasticated waist, sculpted seam lines, oversized curved pockets, a removable rear utility pouch, and adjustable buckle tabs at the waist and cuffs.",
    featured: false,
    displayOrder: 15,
    variants: [
      {
        id: "olive",
        color: "Olive",
        swatch: "#5a5a45",
        sku: "NC-CMD-CHUTE-PANT-OLV",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: chutePantsOliveFront,
            alt: "Olive NC Chute Pants — front",
          },
          backProduct: {
            url: chutePantsOliveBack,
            alt: "Olive NC Chute Pants — back",
          },
          modelFront: {
            url: chutePantsOliveModel,
            alt: "Model wearing olive NC Chute Pants",
          },
        },
      },
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-CMD-CHUTE-PANT-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: chutePantsBlackFront,
            alt: "Black NC Chute Pants — front",
          },
          backProduct: {
            url: chutePantsBlackBack,
            alt: "Black NC Chute Pants — back",
          },
          modelFront: {
            url: chutePantsBlackModel,
            alt: "Model wearing black NC Chute Pants",
          },
        },
      },
    ],
  },
  {
    id: "command-nc-flak-vest",
    slug: "command-nc-flak-vest",
    name: "NC FLAK VEST",
    collectionId: "collection-1",
    category: "Outerwear",
    price: 225,
    description:
      "Structured utility vest cut in tonal patterned shell fabric with a padded funnel collar, two-way front zip, snap placket, oversized cargo pockets, and adjustable lace-up side panels.",
    featured: false,
    displayOrder: 16,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-CMD-FLAK-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: flakVestBlackFront,
            alt: "Black NC Flak Vest — front",
          },
          backProduct: {
            url: flakVestBlackBack,
            alt: "Black NC Flak Vest — back",
          },
          modelFront: {
            url: flakVestBlackModel,
            alt: "Model wearing black NC Flak Vest",
          },
        },
      },
      {
        id: "olive",
        color: "Olive",
        swatch: "#4b4c28",
        sku: "NC-CMD-FLAK-OLV",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: flakVestOliveFront,
            alt: "Olive NC Flak Vest — front",
          },
          backProduct: {
            url: flakVestOliveBack,
            alt: "Olive NC Flak Vest — back",
          },
          modelFront: {
            url: flakVestOliveModel,
            alt: "Model wearing olive NC Flak Vest",
          },
        },
      },
    ],
  },
  {
    id: "command-nc-cargo-capri",
    slug: "command-nc-cargo-capri",
    name: "NC CARGO CAPRI",
    collectionId: "collection-1",
    category: "Bottoms",
    price: 200,
    description:
      "Wide-leg cargo capri pants cut in washed black cotton with articulated utility pockets, metal hardware, adjustable waist tabs, and a cropped mid-calf length.",
    featured: false,
    displayOrder: 17,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-CMD-CAPRI-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: cargoCapriBlackFront,
            alt: "Black NC Cargo Capri — front",
          },
          backProduct: {
            url: cargoCapriBlackBack,
            alt: "Black NC Cargo Capri — back",
          },
          modelFront: {
            url: cargoCapriBlackModel1,
            alt: "Model wearing black NC Cargo Capri — look 1",
          },
          modelBack: {
            url: cargoCapriBlackModel2,
            alt: "Model wearing black NC Cargo Capri — look 2",
          },
        },
      },
    ],
  },
  {
    id: "command-cargo-messenger-bag",
    slug: "command-cargo-messenger-bag",
    name: "CARGO MESSENGER BAG",
    collectionId: "collection-1",
    category: "Accessories",
    price: 275,
    description:
      "Oversized black cargo messenger bag with a softly structured body, dual buckle pockets, reinforced top handles, an adjustable shoulder strap, and antiqued silver hardware.",
    featured: false,
    displayOrder: 18,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-CMD-MSGR-BLK",
        sizes: ["ONE SIZE"],
        images: {
          frontProduct: {
            url: cargoMessengerBagBlackFront,
            alt: "Black Cargo Messenger Bag — front",
          },
          backProduct: {
            url: cargoMessengerBagBlackBack,
            alt: "Black Cargo Messenger Bag — back",
          },
          modelFront: {
            url: cargoMessengerBagBlackModel1,
            alt: "Model wearing the black Cargo Messenger Bag — look 1",
          },
          modelBack: {
            url: cargoMessengerBagBlackModel2,
            alt: "Model wearing the black Cargo Messenger Bag — look 2",
          },
        },
      },
    ],
  },
  {
    id: "command-duffle",
    slug: "command-duffle",
    name: "COMMAND DUFFLE",
    collectionId: "collection-1",
    category: "Accessories",
    price: 215,
    description:
      "Soft-structured olive duffle bag with tonal No Comply artwork, contrast brown carry handles, a padded handle wrap, double-zip closure, and aged brass hardware.",
    featured: false,
    displayOrder: 19,
    variants: [
      {
        id: "olive",
        color: "Olive",
        swatch: "#6b673f",
        sku: "NC-CMD-DUFFLE-OLV",
        sizes: ["ONE SIZE"],
        images: {
          frontProduct: {
            url: commandDuffleOliveFront,
            alt: "Olive Command Duffle — front",
          },
          modelFront: {
            url: commandDuffleOliveModel1,
            alt: "Model carrying the olive Command Duffle — look 1",
          },
          modelBack: {
            url: commandDuffleOliveModel2,
            alt: "Model carrying the olive Command Duffle — look 2",
          },
        },
      },
    ],
  },
  {
    id: "custom-dog-tags",
    slug: "custom-dog-tags",
    name: "CUSTOM DOG TAGS",
    collectionId: "collection-1",
    category: "Accessories",
    price: 195,
    description:
      "Custom silver-tone dog tag necklace with a polished ball chain, paired engraved pendants, and signature No Comply artwork. Personalize the reverse with a name and date.",
    featured: false,
    displayOrder: 20,
    variants: [
      {
        id: "silver",
        color: "Silver",
        swatch: "#c3c3c3",
        sku: "NC-CMD-DOGTAG-SLV",
        sizes: ["ONE SIZE"],
        images: {
          frontProduct: {
            url: customDogTagsSilverFront,
            alt: "Silver Custom Dog Tags — front",
          },
          backProduct: {
            url: customDogTagsSilverBack,
            alt: "Silver Custom Dog Tags — reverse engraving",
          },
          modelFront: {
            url: customDogTagsSilverModel1,
            alt: "Model wearing the Silver Custom Dog Tags — look 1",
          },
          modelBack: {
            url: customDogTagsSilverModel2,
            alt: "Model wearing the Silver Custom Dog Tags — look 2",
          },
        },
      },
    ],
  },
  {
    id: "vet-lighter",
    slug: "vet-lighter",
    name: "VET LIGHTER",
    collectionId: "collection-1",
    category: "Accessories",
    price: 75,
    description:
      "Weathered silver-tone flip-top lighter engraved with signature No Comply graphics, an Ace of Spades skull emblem, and a defiant veteran-style inscription.",
    featured: false,
    displayOrder: 21,
    variants: [
      {
        id: "standard",
        color: "Silver",
        sku: "NC-CMD-LGHTR-SLV",
        sizes: [],
        images: {
          frontProduct: {
            url: vetLighterSilverFront,
            alt: "Silver Vet Lighter — engraved front",
          },
          backProduct: {
            url: vetLighterSilverBack,
            alt: "Silver Vet Lighter — Ace of Spades face",
          },
          details: [
            {
              url: vetLighterSilverDetailOpen,
              alt: "Silver Vet Lighter — open mechanism detail",
            },
          ],
        },
      },
    ],
  },
  {
    id: "nc-patch-kit",
    slug: "nc-patch-kit",
    name: "NC PATCH KIT",
    collectionId: "collection-1",
    category: "Accessories",
    price: 150,
    description:
      "Complete No Comply patch set featuring 20 black-and-white script patches in four silhouettes, plus four specialty patches: a monochrome flag, USA wordmark, and gothic N and C initials.",
    featured: false,
    displayOrder: 22,
    variants: [
      {
        id: "standard",
        color: "Black / White",
        sku: "NC-CMD-PATCH-KIT",
        sizes: [],
        images: {
          frontProduct: {
            url: patchKitSpecialtyPatches,
            alt: "NC Patch Kit — four specialty patches",
          },
          backProduct: {
            url: patchKitScriptPatches,
            alt: "NC Patch Kit — 20 script patches",
          },
        },
      },
    ],
  },
  {
    id: "nc-pin-kit",
    slug: "nc-pin-kit",
    name: "NC PIN KIT",
    collectionId: "collection-1",
    category: "Accessories",
    price: 75,
    description:
      "Set of three No Comply campaign pins featuring the Kill Me I'm American slogan, an Ace of Spades skull emblem, and the signature No Comply U.S.A. mark.",
    featured: false,
    displayOrder: 23,
    variants: [
      {
        id: "standard",
        color: "Multicolor",
        sku: "NC-CMD-PIN-KIT",
        sizes: [],
        images: {
          frontProduct: {
            url: pinKitSet,
            alt: "NC Pin Kit — set of three campaign pins",
          },
          modelFront: {
            url: pinKitHoodieStyling,
            alt: "NC Pin Kit — styled on the American Distress Hoodie Jacket",
          },
          extraShots: [
            {
              url: pinKitJacketStyling,
              alt: "NC Pin Kit — styled on the Eisenhower Distress Jacket",
            },
          ],
        },
      },
    ],
  },
  {
    id: "american-distress-hat",
    slug: "american-distress-hat",
    name: "AMERICAN DISTRESS HAT",
    collectionId: "collection-1",
    category: "Accessories",
    price: 150,
    description:
      "Distressed black six-panel cap with a monochrome American flag patch, removable No Comply campaign pins, hand-worked abrasion, and an adjustable back strap.",
    featured: false,
    displayOrder: 24,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-CMD-HAT-BLK",
        sizes: ["ONE SIZE"],
        images: {
          frontProduct: {
            url: americanDistressHatBlackFront,
            alt: "Black American Distress Hat — front",
          },
          backProduct: {
            url: americanDistressHatBlackBack,
            alt: "Black American Distress Hat — back",
          },
          modelFront: {
            url: americanDistressHatBlackModelWoman,
            alt: "Woman wearing the black American Distress Hat",
          },
          modelBack: {
            url: americanDistressHatBlackModelMan,
            alt: "Man wearing the black American Distress Hat",
          },
        },
      },
    ],
  },
  {
    id: "caught-nc17-hoodie",
    slug: "caught-nc17-hoodie",
    name: "NC-17 HOODIE",
    collectionId: "collection-2",
    category: "Tops",
    price: 145,
    description:
      "Pullover hoodie printed with the Caught on Film collection's NC-17 content-warning graphic. Cut with a relaxed fit, drawstring-free hood, and kangaroo pocket.",
    featured: true,
    displayOrder: 7,
    listingVariantIds: ["black", "white"],
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-COF-HOOD-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: nc17HoodieBlackFront,
            alt: "Black NC-17 Hoodie — front product shot",
          },
          modelFront: {
            url: nc17HoodieBlackModel1,
            alt: "Model wearing the black NC-17 Hoodie — look 1",
          },
          modelBack: {
            url: nc17HoodieBlackModel2,
            alt: "Model wearing the black NC-17 Hoodie — look 2",
          },
        },
      },
      {
        id: "white",
        color: "White",
        swatch: "#f4f4f1",
        sku: "NC-COF-HOOD-WHT",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: nc17HoodieWhiteFront,
            alt: "White NC-17 Hoodie — front product shot",
          },
          modelFront: {
            url: nc17HoodieWhiteModel1,
            alt: "Model wearing the white NC-17 Hoodie — look 1",
          },
          modelBack: {
            url: nc17HoodieWhiteModel2,
            alt: "Model wearing the white NC-17 Hoodie — look 2",
          },
        },
      },
      {
        id: "red",
        color: "Red",
        swatch: "#a80f19",
        sku: "NC-COF-HOOD-RED",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: nc17HoodieRedFront,
            alt: "Red NC-17 Hoodie — front product shot",
          },
          modelFront: {
            url: nc17HoodieRedModel1,
            alt: "Model wearing the red NC-17 Hoodie — look 1",
          },
          modelBack: {
            url: nc17HoodieRedModel2,
            alt: "Model wearing the red NC-17 Hoodie — look 2",
          },
        },
      },
    ],
  },
  {
    id: "caught-the-end-studded-tank",
    slug: "caught-the-end-studded-tank",
    name: "THE END STUDDED TANK",
    collectionId: "collection-2",
    category: "Tops",
    price: 115,
    description:
      "Fitted ribbed tank finished with a sculpted The End script graphic and studded metal details across the chest.",
    featured: true,
    displayOrder: 8,
    listingVariantIds: ["white", "black"],
    variants: [
      {
        id: "white",
        color: "White",
        swatch: "#f4f4f1",
        sku: "NC-COF-END-TANK-WHT",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: theEndTankWhiteFront,
            alt: "White The End Studded Tank — front product shot",
          },
          modelFront: {
            url: theEndTankWhiteModel1,
            alt: "Model wearing the white The End Studded Tank — look 1",
          },
          modelBack: {
            url: theEndTankWhiteModel2,
            alt: "Model wearing the white The End Studded Tank — look 2",
          },
        },
      },
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-COF-END-TANK-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: theEndTankBlackFront,
            alt: "Black The End Studded Tank — front product shot",
          },
          modelFront: {
            url: theEndTankBlackModel1,
            alt: "Model wearing the black The End Studded Tank — look 1",
          },
          modelBack: {
            url: theEndTankBlackModel2,
            alt: "Model wearing the black The End Studded Tank — look 2",
          },
        },
      },
    ],
  },
  {
    id: "caught-the-end-studded-crewneck",
    slug: "caught-the-end-studded-crewneck",
    name: "THE END STUDDED CREWNECK",
    collectionId: "collection-2",
    category: "Tops",
    price: 215,
    description:
      "Black crewneck top finished with a studded star motif and sculpted The End script graphic across the chest.",
    featured: true,
    displayOrder: 9,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-COF-END-CREW-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: theEndCrewneckBlackFront,
            alt: "Black The End Studded Crewneck — front product shot",
          },
          modelFront: {
            url: theEndCrewneckBlackModel1,
            alt: "Model wearing the black The End Studded Crewneck — look 1",
          },
          modelBack: {
            url: theEndCrewneckBlackModel2,
            alt: "Model wearing the black The End Studded Crewneck — look 2",
          },
        },
      },
    ],
  },
  {
    id: "caught-the-end-warmup-jacket",
    slug: "caught-the-end-warmup-jacket",
    name: "THE END WARMUP JACKET",
    collectionId: "collection-2",
    category: "Outerwear",
    price: 250,
    description:
      "Studded velour warmup jacket with a stand collar, full zip front, side pockets, and The End script artwork across the chest.",
    featured: true,
    displayOrder: 10,
    variants: [
      {
        id: "red",
        color: "Red",
        swatch: "#790d18",
        sku: "NC-COF-END-JKT-RED",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: theEndWarmupJacketRedFront,
            alt: "Red The End Warmup Jacket — front product shot",
          },
          modelFront: {
            url: theEndWarmupRedModel1,
            alt: "Model wearing the red The End Warmup Jacket — look 1",
          },
          modelBack: {
            url: theEndWarmupRedModel2,
            alt: "Model wearing the red The End Warmup Jacket — look 2",
          },
        },
      },
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-COF-END-JKT-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: theEndWarmupJacketBlackFront,
            alt: "Black The End Warmup Jacket — front product shot",
          },
          modelFront: {
            url: theEndWarmupBlackModel1,
            alt: "Model wearing the black The End Warmup Jacket — look 1",
          },
          modelBack: {
            url: theEndWarmupBlackModel2,
            alt: "Model wearing the black The End Warmup Jacket — look 2",
          },
        },
      },
    ],
  },
  {
    id: "caught-the-end-warmup-pant",
    slug: "caught-the-end-warmup-pant",
    name: "THE END WARMUP PANT",
    collectionId: "collection-2",
    category: "Bottoms",
    price: 150,
    description:
      "Wide-leg velour warmup pant with an elastic waist, side pockets, and double rows of silver studs along each outer seam.",
    featured: true,
    displayOrder: 11,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-COF-END-PANT-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: theEndWarmupPantBlackFront,
            alt: "Black The End Warmup Pant — front product shot",
          },
          backProduct: {
            url: theEndWarmupPantBlackSide,
            alt: "Black The End Warmup Pant — side product shot",
          },
          modelFront: {
            url: theEndWarmupBlackModel1,
            alt: "Model wearing the black The End Warmup Pant — look 1",
          },
          modelBack: {
            url: theEndWarmupBlackModel2,
            alt: "Model wearing the black The End Warmup Pant — look 2",
          },
        },
      },
      {
        id: "red",
        color: "Red",
        swatch: "#790d18",
        sku: "NC-COF-END-PANT-RED",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: theEndWarmupPantRedFront,
            alt: "Red The End Warmup Pant — front product shot",
          },
          backProduct: {
            url: theEndWarmupPantRedSide,
            alt: "Red The End Warmup Pant — side product shot",
          },
          modelFront: {
            url: theEndWarmupRedModel1,
            alt: "Model wearing the red The End Warmup Pant — look 1",
          },
          modelBack: {
            url: theEndWarmupRedModel2,
            alt: "Model wearing the red The End Warmup Pant — look 2",
          },
        },
      },
    ],
  },
  {
    id: "caught-studded-shorts",
    slug: "caught-studded-shorts",
    name: "STUDDED SHORTS",
    collectionId: "collection-2",
    category: "Bottoms",
    price: 185,
    description:
      "Relaxed black velour shorts with an elastic drawstring waist, side pockets, and double rows of silver studs along each outer seam.",
    featured: true,
    displayOrder: 12,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-COF-STUD-SHORT-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: studdedShortsBlackFront,
            alt: "Black Studded Shorts — front product shot",
          },
          backProduct: {
            url: studdedShortsBlackSide,
            alt: "Black Studded Shorts — side product shot",
          },
          modelFront: {
            url: studdedShortsBlackModel1,
            alt: "Model wearing the black Studded Shorts — look 1",
          },
          modelBack: {
            url: studdedShortsBlackModel2,
            alt: "Model wearing the black Studded Shorts — look 2",
          },
        },
      },
    ],
  },
  {
    id: "caught-star-studded-trucker-hat",
    slug: "caught-star-studded-trucker-hat",
    name: "STAR STUDDED TRUCKER HAT",
    collectionId: "collection-2",
    category: "Accessories",
    price: 95,
    description:
      "Black mesh-back trucker hat finished with a silver-studded star and The End script across the front panel.",
    featured: false,
    displayOrder: 13,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-COF-STAR-HAT-BLK",
        sizes: ["ONE SIZE"],
        images: {
          frontProduct: {
            url: starTruckerHatBlackFront,
            alt: "Black Star Studded Trucker Hat — front product shot",
          },
          modelFront: {
            url: starTruckerHatBlackModel1,
            alt: "Model wearing the black Star Studded Trucker Hat — look 1",
          },
          modelBack: {
            url: starTruckerHatBlackModel2,
            alt: "Model wearing the black Star Studded Trucker Hat — look 2",
          },
          extraShots: [
            {
              url: starTruckerHatBlackModel3,
              alt: "Model wearing the black Star Studded Trucker Hat — look 3",
            },
          ],
        },
      },
    ],
  },
  {
    id: "caught-studded-slippers",
    slug: "caught-studded-slippers",
    name: "STUDDED SLIPPERS",
    collectionId: "collection-2",
    category: "Accessories",
    price: 215,
    description:
      "Black slip-on slippers with a tonal textured upper and double rows of silver studs around the platform sole.",
    featured: false,
    displayOrder: 14,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-COF-STUD-SLIP-BLK",
        sizes: ["5", "6", "7", "8", "9", "10", "11", "12", "13"],
        images: {
          frontProduct: {
            url: studdedSlippersBlackFront,
            alt: "Black Studded Slippers — front product view",
          },
          backProduct: {
            url: studdedSlippersBlackBack,
            alt: "Black Studded Slippers — rear product view",
          },
          modelFront: {
            url: studdedSlippersBlackModel1,
            alt: "Model wearing the black Studded Slippers — look 1",
          },
          modelBack: {
            url: studdedShortsBlackModel2,
            alt: "Model wearing the black Studded Slippers — look 2",
          },
        },
      },
    ],
  },
  {
    id: "caught-studded-belt",
    slug: "caught-studded-belt",
    name: "STUDDED BELT",
    collectionId: "collection-2",
    category: "Accessories",
    price: 185,
    description:
      "Black belt edged with silver studs and finished with polished silver buckle and tip hardware.",
    featured: false,
    displayOrder: 15,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-COF-STUD-BELT-BLK",
        sizes: ["ONE SIZE FITS ALL"],
        images: {
          frontProduct: {
            url: studdedBeltBlackFront,
            alt: "Black Studded Belt — product shot",
          },
          modelFront: {
            url: studdedBeltBlackModel1,
            alt: "Model wearing the black Studded Belt",
          },
        },
      },
    ],
  },
  {
    id: "caught-nc17-patch-cap",
    slug: "caught-nc17-patch-cap",
    name: "NC-17 PATCH CAP",
    collectionId: "collection-2",
    category: "Accessories",
    price: 115,
    description:
      "Black adjustable cap with the NC-17 rating patch at the front and crossed-out No Comply USA embroidery at the back.",
    featured: true,
    displayOrder: 16,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-COF-NC17-CAP-BLK",
        sizes: ["ONE SIZE FITS ALL"],
        images: {
          frontProduct: {
            url: nc17PatchCapBlackFront,
            alt: "Black NC-17 Patch Cap — front product view",
          },
          backProduct: {
            url: nc17PatchCapBlackBack,
            alt: "Black NC-17 Patch Cap — back product view",
          },
          modelFront: {
            url: nc17PatchCapBlackModel1,
            alt: "Model wearing the black NC-17 Patch Cap — look 1",
          },
          modelBack: {
            url: nc17PatchCapBlackModel2,
            alt: "Model wearing the black NC-17 Patch Cap — look 2",
          },
        },
      },
    ],
  },
  {
    id: "caught-on-film-skull-cap",
    slug: "caught-on-film-skull-cap",
    name: "ON FILM SKULL CAP",
    collectionId: "collection-2",
    category: "Accessories",
    price: 115,
    description:
      "Close-fitting skull cap covered in the black-and-white Caught on Film contact-sheet print.",
    featured: true,
    carouselHover: true,
    displayOrder: 17,
    variants: [
      {
        id: "black-white-film-print",
        color: "Black/White film print",
        swatch: "#1a1a1a",
        sku: "NC-COF-FILM-SKULL-CAP",
        sizes: ["ONE SIZE FITS ALL"],
        images: {
          frontProduct: {
            url: onFilmSkullCapFront,
            alt: "Black and white On Film Skull Cap — front product view",
          },
          backProduct: {
            url: onFilmSkullCapBack,
            alt: "Black and white On Film Skull Cap — alternate product views",
          },
          modelFront: {
            url: onFilmSkullCapModel1,
            alt: "Model wearing the black and white On Film Skull Cap",
          },
        },
      },
    ],
  },
  {
    id: "caught-on-film-scarf",
    slug: "caught-on-film-scarf",
    name: "ON FILM SCARF",
    collectionId: "collection-2",
    category: "Accessories",
    price: 75,
    description:
      "Lightweight scarf covered in the black-and-white Caught on Film contact-sheet print.",
    featured: true,
    carouselHover: true,
    displayOrder: 18,
    variants: [
      {
        id: "black-white-film-print",
        color: "Black/White film print",
        swatch: "#1a1a1a",
        sku: "NC-COF-FILM-SCARF",
        sizes: ["ONE SIZE FITS ALL"],
        images: {
          frontProduct: {
            url: onFilmScarfFront,
            alt: "Black and white On Film Scarf — product shot",
          },
          modelFront: {
            url: onFilmScarfModel1,
            alt: "Model wearing the black and white On Film Scarf — look 1",
          },
          modelBack: {
            url: onFilmScarfModel2,
            alt: "Model wearing the black and white On Film Scarf — look 2",
          },
        },
      },
    ],
  },
  {
    id: "caught-on-film-tote-bag",
    slug: "caught-on-film-tote-bag",
    name: "ON FILM TOTE BAG",
    collectionId: "collection-2",
    category: "Accessories",
    price: 150,
    description:
      "Structured black-and-white tote bag covered in the Caught on Film contact-sheet print with long black handles.",
    featured: true,
    carouselHover: true,
    displayOrder: 19,
    variants: [
      {
        id: "black-white",
        color: "BLACK/WHITE",
        swatch: "#1a1a1a",
        sku: "NC-COF-FILM-TOTE",
        sizes: ["ONE SIZE FITS ALL"],
        images: {
          frontProduct: {
            url: onFilmToteFront,
            alt: "Black and white On Film Tote Bag — product shot",
          },
          modelFront: {
            url: onFilmScarfModel2,
            alt: "Model carrying the black and white On Film Tote Bag — look 1",
          },
          modelBack: {
            url: onFilmToteModel2,
            alt: "Model carrying the black and white On Film Tote Bag — look 2",
          },
          extraShots: [
            {
              url: onFilmToteModel3,
              alt: "Model carrying the black and white On Film Tote Bag — look 3",
            },
          ],
        },
      },
    ],
  },
  {
    id: "caught-nc-theater-glasses",
    slug: "caught-nc-theater-glasses",
    name: "NC THEATER GLASSES",
    collectionId: "collection-2",
    category: "Accessories",
    price: 150,
    description:
      "Black theater glasses with red lenses and polished stud detailing along the temples.",
    featured: true,
    carouselHover: true,
    displayOrder: 20,
    variants: [
      {
        id: "black-red",
        color: "BLACK / RED",
        swatch: "#111111",
        sku: "NC-COF-THEATER-GLASSES",
        sizes: ["ONE SIZE FITS ALL"],
        images: {
          frontProduct: {
            url: ncTheaterGlassesFront,
            alt: "Black and red NC Theater Glasses — front product view",
          },
          backProduct: {
            url: ncTheaterGlassesSide,
            alt: "Black and red NC Theater Glasses — side product view",
          },
          modelFront: {
            url: onFilmScarfModel1,
            alt: "Model wearing the black and red NC Theater Glasses — look 1",
          },
          modelBack: {
            url: studdedShortsBlackModel1,
            alt: "Model wearing the black and red NC Theater Glasses — look 2",
          },
          extraShots: [
            {
              url: studdedSlippersBlackModel1,
              alt: "Model wearing the black and red NC Theater Glasses — look 3",
            },
          ],
        },
      },
    ],
  },
  {
    id: "caught-on-film-mock-long-sleeve-red",
    slug: "caught-on-film-mock-long-sleeve-red",
    name: "ON FILM MOCK LONG SLEEVE",
    collectionId: "collection-2",
    category: "Tops",
    price: 195,
    description:
      "Fitted mock-neck long sleeve printed throughout with the Caught on Film contact-sheet motif.",
    featured: true,
    displayOrder: 5,
    swatchGroup: "on-film-mock-long-sleeve",
    variants: [
      {
        id: "red",
        color: "Red",
        swatch: "#9f1017",
        sku: "NC-COF-MOCK-RED",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: onFilmMockRedFront,
            alt: "Red On Film Mock Long Sleeve — front product shot",
          },
          modelFront: {
            url: onFilmMockRedModel1,
            alt: "Model wearing the red On Film Mock Long Sleeve — look 1",
          },
          modelBack: {
            url: onFilmMockRedModel2,
            alt: "Model wearing the red On Film Mock Long Sleeve — look 2",
          },
        },
      },
      {
        id: "blue",
        color: "Blue",
        swatch: "#315e7d",
        sku: "NC-COF-MOCK-BLU",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: onFilmMockBlueFront,
            alt: "Blue On Film Mock Long Sleeve — front product shot",
          },
          modelFront: {
            url: onFilmMockBlueModel1,
            alt: "Model wearing the blue On Film Mock Long Sleeve — look 1",
          },
          modelBack: {
            url: onFilmMockBlueModel2,
            alt: "Model wearing the blue On Film Mock Long Sleeve — look 2",
          },
        },
      },
    ],
  },
  {
    id: "caught-on-film-mock-long-sleeve-black",
    slug: "caught-on-film-mock-long-sleeve-black",
    name: "ON FILM MOCK LONG SLEEVE",
    collectionId: "collection-2",
    category: "Tops",
    price: 195,
    description:
      "Fitted mock-neck long sleeve printed throughout with the Caught on Film contact-sheet motif.",
    featured: true,
    displayOrder: 6,
    swatchGroup: "on-film-mock-long-sleeve",
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-COF-MOCK-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: onFilmMockBlackFront,
            alt: "Black On Film Mock Long Sleeve — front product shot",
          },
          modelFront: {
            url: onFilmMockBlackModel1,
            alt: "Model wearing the black On Film Mock Long Sleeve — look 1",
          },
          modelBack: {
            url: onFilmMockBlackModel2,
            alt: "Model wearing the black On Film Mock Long Sleeve — look 2",
          },
        },
      },
    ],
  },
  {
    id: "caught-nc17-rating-tee-black",
    slug: "caught-nc17-rating-tee-black",
    name: "NC-17 RATING TEE",
    collectionId: "collection-2",
    category: "Tops",
    price: 75,
    description:
      "Cropped NC-17 rating tee printed with the Caught on Film collection's content-warning graphic. Cut in a relaxed silhouette with a clean crew neckline.",
    featured: true,
    displayOrder: 1,
    swatchGroup: "nc17-tee",
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#0a0a0a",
        sku: "NC-COF-NC17-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: "/__l5e/assets-v1/44741192-ffc9-4eae-abdf-5b6ccbc8fdc1/nc17-black-front.png",
            alt: "Black NC-17 Rating Tee — front flat lay",
          },
          modelFront: {
            url: "/__l5e/assets-v1/556cf18d-c953-4c2b-b578-c0b1f2c6a772/nc17-black-model-2.png",
            alt: "Model wearing the black NC-17 Rating Tee — look 1",
          },
          modelBack: {
            url: "/__l5e/assets-v1/cd030686-bf3f-45b7-b689-1b5c87873efa/nc17-black-model-1.png",
            alt: "Model wearing the black NC-17 Rating Tee — look 2",
          },
          extraShots: [
            {
              url: "/__l5e/assets-v1/b6689eb8-8cb0-4b24-95c5-8f08439c49c5/nc17-rating-detail.png",
              alt: "NC-17 rating label graphic detail",
            },
          ],
        },
      },
      {
        id: "white",
        color: "White",
        swatch: "#f4f4f1",
        sku: "NC-COF-NC17-WHT",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: "/__l5e/assets-v1/7b3a6376-3d3c-47ec-84e0-00d45d52ce1d/nc17-white-front.png",
            alt: "White NC-17 Rating Tee — front flat lay",
          },
          modelFront: {
            url: "/__l5e/assets-v1/4dfad4d4-79c6-4bf2-a260-ccb1870fed0d/nc17-white-model-1.png",
            alt: "Male model wearing the white NC-17 Rating Tee",
          },
          modelBack: {
            url: "/__l5e/assets-v1/b38640a7-1c71-494f-bfd8-cdcceac22403/nc17-white-model-2.png",
            alt: "Female model wearing the white NC-17 Rating Tee",
          },
          extraShots: [
            {
              url: "/__l5e/assets-v1/b6689eb8-8cb0-4b24-95c5-8f08439c49c5/nc17-rating-detail.png",
              alt: "NC-17 rating label graphic detail",
            },
          ],
        },
      },
    ],
  },
  {
    id: "caught-nc17-rating-tee-red",
    slug: "caught-nc17-rating-tee-red",
    name: "NC-17 RATING TEE",
    collectionId: "collection-2",
    category: "Tops",
    price: 75,
    description:
      "Cropped NC-17 rating tee printed with the Caught on Film collection's content-warning graphic. Cut in a relaxed silhouette with a clean crew neckline.",
    featured: true,
    displayOrder: 2,
    swatchGroup: "nc17-tee",
    variants: [
      {
        id: "red",
        color: "Red",
        swatch: "#9f1017",
        sku: "NC-COF-NC17-RED",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: "/__l5e/assets-v1/9665427a-039f-4eb1-9b3b-f709f9a1080f/nc17-red-front.png",
            alt: "Red NC-17 Rating Tee — front flat lay",
          },
          modelFront: {
            url: "/__l5e/assets-v1/68c007f3-a8c9-45f6-837b-4a2cba69aa91/nc17-red-model-1.png",
            alt: "Model wearing the red NC-17 Rating Tee — look 1",
          },
          modelBack: {
            url: "/__l5e/assets-v1/69caff9a-8aa1-40d7-b415-8fcaedf611b0/nc17-red-model-2.png",
            alt: "Model wearing the red NC-17 Rating Tee — look 2",
          },
          extraShots: [
            {
              url: "/__l5e/assets-v1/b6689eb8-8cb0-4b24-95c5-8f08439c49c5/nc17-rating-detail.png",
              alt: "NC-17 rating label graphic detail",
            },
          ],
        },
      },
      {
        id: "white",
        color: "White",
        swatch: "#f4f4f1",
        sku: "NC-COF-NC17-WHT",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: "/__l5e/assets-v1/7b3a6376-3d3c-47ec-84e0-00d45d52ce1d/nc17-white-front.png",
            alt: "White NC-17 Rating Tee — front flat lay",
          },
          modelFront: {
            url: "/__l5e/assets-v1/4dfad4d4-79c6-4bf2-a260-ccb1870fed0d/nc17-white-model-1.png",
            alt: "Male model wearing the white NC-17 Rating Tee",
          },
          modelBack: {
            url: "/__l5e/assets-v1/b38640a7-1c71-494f-bfd8-cdcceac22403/nc17-white-model-2.png",
            alt: "Female model wearing the white NC-17 Rating Tee",
          },
          extraShots: [
            {
              url: "/__l5e/assets-v1/b6689eb8-8cb0-4b24-95c5-8f08439c49c5/nc17-rating-detail.png",
              alt: "NC-17 rating label graphic detail",
            },
          ],
        },
      },
    ],
  },
  {
    id: "caught-on-film-denim-jacket",
    slug: "caught-on-film-denim-jacket",
    name: "ON FILM DENIM JACKET",
    collectionId: "collection-2",
    category: "Outerwear",
    price: 215,
    description:
      "Structured denim jacket printed with the Caught on Film contact-sheet motif. Finished with a pointed collar, chest pockets, and metal hardware.",
    featured: true,
    displayOrder: 3,
    variants: [
      {
        id: "black",
        color: "Black",
        swatch: "#121212",
        sku: "NC-COF-DJKT-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: "/__l5e/assets-v1/ff7c79cb-4882-4b87-a947-46f01dc55106/denim-jacket-black-front-v2.png",
            alt: "Black On Film Denim Jacket — front flat lay",
          },
          modelFront: {
            url: "/__l5e/assets-v1/275e1b78-aae9-4279-a1f2-b054f43f01e2/denim-black-look-3.png",
            alt: "Model wearing the black On Film Denim Jacket — look 1",
          },
          modelBack: {
            url: "/__l5e/assets-v1/fdf170ff-7dea-4dae-9a82-64ee06b98de8/denim-black-look-2.png",
            alt: "Model wearing the black On Film Denim Jacket — look 2",
          },
          extraShots: [
            {
              url: "/__l5e/assets-v1/446e518c-67e9-4a98-8370-e00b5a06ede4/denim-black-look-1.png",
              alt: "Model wearing the black On Film Denim Jacket — look 3",
            },
          ],
        },
      },
      {
        id: "blue",
        color: "Blue",
        swatch: "#315e7d",
        sku: "NC-COF-DJKT-BLU",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: "/__l5e/assets-v1/cddb074d-ebd9-4aa6-a219-07226cdc5192/denim-jacket-blue-front.png",
            alt: "Blue On Film Denim Jacket — front flat lay",
          },
          modelFront: {
            url: "/__l5e/assets-v1/ab4bdd8a-0c73-475d-988e-b75bb469521c/denim-blue-look-1.png",
            alt: "Model wearing the blue On Film Denim Jacket — look 1",
          },
          modelBack: {
            url: "/__l5e/assets-v1/4bc5bec0-527c-4ced-a9f9-65e383bfe267/denim-blue-look-2.png",
            alt: "Model wearing the blue On Film Denim Jacket — look 2",
          },
          extraShots: [
            {
              url: "/__l5e/assets-v1/ee31c6ee-3211-491d-9c94-749b4c0189c2/denim-blue-look-3.webp",
              alt: "Model wearing the blue On Film Denim Jacket — look 3",
            },
            {
              url: "/__l5e/assets-v1/57e74f6a-a10b-4abb-89a2-40bcefe2fa82/denim-blue-look-4.png",
              alt: "Model wearing the blue On Film Denim Jacket — look 4",
            },
          ],
        },
      },
    ],
  },
  {
    id: "caught-on-film-denim-jeans",
    slug: "caught-on-film-denim-jeans",
    name: "ON FILM DENIM JEANS",
    collectionId: "collection-2",
    category: "Bottoms",
    price: 185,
    description:
      "Wide-leg denim jeans printed throughout with the Caught on Film contact-sheet motif. A relaxed full-length cut designed as the counterpart to the On Film Denim Jacket.",
    featured: true,
    displayOrder: 4,
    variants: [
      {
        id: "blue",
        color: "Blue",
        swatch: "#315e7d",
        sku: "NC-COF-DJNS-BLU",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: "/__l5e/assets-v1/26a5920b-bf24-4940-917c-84ed1512e223/denim-jeans-blue-front.png",
            alt: "Blue On Film Denim Jeans — front flat lay",
          },
          modelFront: {
            url: "/__l5e/assets-v1/ab4bdd8a-0c73-475d-988e-b75bb469521c/denim-blue-look-1.png",
            alt: "Model wearing the blue On Film Denim Jeans — look 1",
          },
          modelBack: {
            url: "/__l5e/assets-v1/4bc5bec0-527c-4ced-a9f9-65e383bfe267/denim-blue-look-2.png",
            alt: "Model wearing the blue On Film Denim Jeans — look 2",
          },
          extraShots: [
            {
              url: "/__l5e/assets-v1/57e74f6a-a10b-4abb-89a2-40bcefe2fa82/denim-blue-look-4.png",
              alt: "Model wearing the blue On Film Denim Jeans — look 3",
            },
          ],
        },
      },
      {
        id: "black",
        color: "Black",
        swatch: "#121212",
        sku: "NC-COF-DJNS-BLK",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: {
          frontProduct: {
            url: "/__l5e/assets-v1/13905228-029d-4859-8246-21830a298af3/denim-jeans-black-front.png",
            alt: "Black On Film Denim Jeans — front flat lay",
          },
          modelFront: {
            url: "/__l5e/assets-v1/398582cf-3eca-4246-b492-9d8747c4628a/denim-black-look-4.png",
            alt: "Model wearing the black On Film Denim Jeans — look 1",
          },
          modelBack: {
            url: "/__l5e/assets-v1/275e1b78-aae9-4279-a1f2-b054f43f01e2/denim-black-look-3.png",
            alt: "Model wearing the black On Film Denim Jeans — look 2",
          },
          extraShots: [
            {
              url: "/__l5e/assets-v1/fdf170ff-7dea-4dae-9a82-64ee06b98de8/denim-black-look-2.png",
              alt: "Model wearing the black On Film Denim Jeans — look 3",
            },
            {
              url: "/__l5e/assets-v1/446e518c-67e9-4a98-8370-e00b5a06ede4/denim-black-look-1.png",
              alt: "Model wearing the black On Film Denim Jeans — look 4",
            },
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
        modelImage:
          v.images.modelFront ??
          (p.slug === "vet-lighter" || p.slug === "nc-patch-kit"
            ? v.images.backProduct
            : undefined),
      });
    }
  }
  return out;
};

// re-export for convenience
export { collections };
