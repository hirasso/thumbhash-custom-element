import { thumbHashToAverageRGBA, thumbHashToRGBA } from "thumbhash";

/**
 * Get the bytes from a hash
 */
function getBytes(hash: string) {
  return Uint8Array.from(atob(hash), (c) => c.charCodeAt(0));
}

/**
 * Get the width, height and pixels from a thumbhash
 */
export function decodeThumbHash(hash: string) {
  const { w: width, h: height, rgba: pixels } = thumbHashToRGBA(getBytes(hash));
  return { width, height, pixels };
}

/**
 * Get the ThumbHash average as a CSS color
 */
export function getAverageColor(hash: string) {
  const { r, g, b, a } = thumbHashToAverageRGBA(getBytes(hash));

  // Scale r, g, b from 0-1 to 0-255 and round to the nearest integer
  const red = Math.round(r * 255);
  const green = Math.round(g * 255);
  const blue = Math.round(b * 255);

  // Return a CSS-compatible rgba string
  return `rgb(${red} ${green} ${blue})`;
}
