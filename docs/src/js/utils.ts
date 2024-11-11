import path from "path";
import * as ThumbHash from "thumbhash";
import { createCanvas, loadImage } from "canvas";

/**
 * Generate the thumbhash attribute from an image
 */
export async function getThumbHashAttribute(path: string) {
  const { width, height, pixels } = await getSizeAndPixels(path);
  return convertHashToString(ThumbHash.rgbaToThumbHash(width, height, pixels));
}

/**
 * Dump and die
 */
export function dd(...args: any[]) {
  console.log(...args);
  process.exit();
}

/**
 * Convert the hash array to a string for use in an attribute
 */
function convertHashToString(hash: Uint8Array): string {
  const charString = Array.from(hash)
    .map((byte) => String.fromCharCode(byte))
    .join("");

  return btoa(charString).replace(/=+$/, "");
}

/**
 * Get the width, height and pixels from an image
 */
async function getSizeAndPixels(path: string): Promise<{
  width: number;
  height: number;
  pixels: number[];
}> {
  const image = await loadImage(path);

  const { width, height } = contain(image.width, image.height, 32);

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  context.drawImage(image, 0, 0, width, height);

  // Get the RGBA pixel data
  const imageData = context.getImageData(0, 0, width, height);
  const pixels = Array.from(imageData.data);

  return { width, height, pixels };
}

/**
 * Contain width and height inside a size
 */
function contain(width: number, height: number, size: number) {
  const scaleFactor = Math.min(size / width, size / height);
  return {
    width: Math.round(width * scaleFactor),
    height: Math.round(height * scaleFactor),
  };
}

/**
 *
 * @see https://github.com/withastro/astro/issues/3373
 * @see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
 */
export async function dynamicViteAssetImport(filePath: string) {
  const { name, ext, root, base, dir } = path.parse(filePath);
  switch (ext) {
    case ".webp":
      return import(`../images/${name}.webp`);
    case ".jpg":
      return import(`../images/${name}.jpg`);
    case ".png":
      return import(`../images/${name}.png`);
    case ".svg":
      return import(`../images/${name}.svg`);
    case ".gif":
      return import(`../images/${name}.gif`);
    case ".avif":
      return import(`../images/${name}.avif`);
    case ".jpeg":
      return import(`../images/${name}.jpeg`);
    default:
      return import(`../images/${name}.jpg`);
  }
}
