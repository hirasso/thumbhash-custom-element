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
  shadow: ShadowRoot;

  /**
   * Do not do anything in the constructor, except calling super() and attaching the shadow DOM
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
   */
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  /**
   * Attach this class to the custom element <thumb-hash></thumb-hash>
   */
  static init() {
    if (!window.customElements.get("thumb-hash")) {
      window.customElements.define("thumb-hash", ThumbHashElement);
    }
  }

  /**
   * Get the ovserved attributes
   */
  static get observedAttributes() {
    return ["value", "strategy"];
  }

  /**
   * [value] getter and setter
   */
  get value() {
    return (this.getAttribute("value") || "").trim();
  }
  set value(newValue: string) {
    this.setAttribute("value", newValue);
  }

  /**
   * [strategy] getter and setter
   */
  get strategy(): Strategy {
    const attr = (this.getAttribute("strategy") || "").trim().toLowerCase();
    return attr === "img" || attr === "average" ? attr : "canvas";
  }
  set strategy(newStrategy: Strategy) {
    this.setAttribute("strategy", newStrategy);
  }

  /**
   * Runs anytime on of the observed attributes is set/changed
   */
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue === newValue) return;

    if (["value", "strategy"].includes(name)) {
      this.render();
    }
  }

  /**
   * Runs anytime when the element is being connnected
   */
  connectedCallback() {
    // Hide from screen readers
    this.setAttribute("aria-hidden", "true");
    this.render();
  }

  /**
   * Render the hash
   */
  render() {
    const { value: hash, strategy, shadow } = this;

    // Clear previous content
    shadow.innerHTML = "";

    if (!hash) return;

    switch (strategy) {
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

    this.shadow.appendChild(canvas);
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
    this.shadow.appendChild(div);
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

    this.shadow.appendChild(image);
  }
}
