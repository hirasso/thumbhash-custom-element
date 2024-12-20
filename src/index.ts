import ThumbHashElement from "./ThumbHashElement.js";
import type { Strategy } from "./support/defs.js";

declare global {
  interface HTMLElementTagNameMap {
    "thumb-hash": ThumbHashElement;
  }
}

export { ThumbHashElement };
export type { Strategy };
