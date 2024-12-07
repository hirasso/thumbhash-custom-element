import {
  decodeThumbHash,
  getAverageColor,
  getDataURI,
} from "./support/functions.js";

import type { Strategy } from "./support/defs.js";

/**
 * A custom element that automatically renders a thumbhash placeholder
 */
export default class ThumbHashElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    // Hide from screen readers
    this.setAttribute("aria-hidden", "true");
  }

  /**
   * Attach this class to the custom element <thumb-hash></thumb-hash>
   */
  static init() {
    if (!window.customElements.get("thumb-hash")) {
      window.customElements.define("thumb-hash", ThumbHashElement);
    }
  }

  connectedCallback() {
    const hash = this.value.trim();
    if (!hash) {
      return;
    }

    switch (this.strategy) {
      case "img":
        this.renderImage(hash);
        break;

      case "average":
        this.renderAverage(hash);
        break;

      default:
        this.renderCanvas(hash);
        break;
    }
  }

  get value() {
    return this.getAttribute("value") || "";
  }

  get strategy(): Strategy {
    const attr = (this.getAttribute("strategy") || "").trim();
    if (attr === "img" || attr === "average") {
      return attr;
    }
    return "canvas";
  }

  get average() {
    return !!this.getAttribute("average");
  }

  /**
   * Render and append a canvas using the thumbhash data
   */
  renderCanvas(hash: string) {
    const { width, height, pixels } = decodeThumbHash(hash);
    const canvas = document.createElement("canvas");

    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const imageData = ctx.createImageData(width, height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);

    this.shadowRoot!.appendChild(canvas);
  }

  /**
   * Renders the average color
   */
  renderAverage(hash: string) {
    const rgba = getAverageColor(hash);
    const div = document.createElement("div");
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.background = rgba;
    this.shadowRoot!.appendChild(div);
  }

  /**
   * Render an image with a dataURI
   */
  renderImage(hash: string) {
    const image = document.createElement("img");
    image.style.width = "100%";
    image.style.height = "100%";
    image.alt = "";
    image.src = getDataURI(hash);

    this.shadowRoot!.appendChild(image);
  }
}
