import { beforeAll, describe, expect, it } from "vitest";

import { ThumbHashElement } from "../../../src/index.js";
import { hash } from "../support.js";

describe("createElement", () => {
  beforeAll(() => {
    ThumbHashElement.init();
  });

  /**
   * This will throw an error if there are any illegal operations in the constructor
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
   */
  it("has a legal constructor", () => {
    const el = document.createElement("thumb-hash");
  });

  it("creates an element of type ThumbHashElement", () => {
    const el = document.createElement("thumb-hash");
    expect(el).toBeInstanceOf(ThumbHashElement);
  });

  it("attaches a shadow root", () => {
    const el = document.createElement("thumb-hash");
    expect(el.shadow).toBeInstanceOf(ShadowRoot);
    expect(el.shadowRoot).toBeInstanceOf(ShadowRoot);
    expect(el.shadow).toEqual(el.shadowRoot);
  });

  it('adds [aria-hidden="true"] when connected', () => {
    const el = document.createElement("thumb-hash");
    document.body.appendChild(el);
    expect(el.getAttribute("aria-hidden")).toBe("true");
  });

  it("has correct setters and getters", () => {
    const el: ThumbHashElement = document.createElement("thumb-hash");

    el.value = hash;
    expect(el.value).toEqual(hash);
    expect(el.getAttribute("value")).toEqual(hash);

    el.strategy = 'img';
    expect(el.strategy).toEqual('img');
    expect(el.getAttribute("strategy")).toEqual('img');
  });

  it("(re-)renders if setting [value] or [strategy]", () => {
    const el: ThumbHashElement = document.createElement("thumb-hash");
    document.body.appendChild(el);
    expect(el.shadow.innerHTML).toBe("<slot></slot>");

    el.setAttribute("value", hash);
    expect(el.shadow.querySelector("canvas")).not.toBe(null);

    el.setAttribute("strategy", "img");
    expect(el.shadow.querySelector("canvas")).toBe(null);
    expect(el.shadow.querySelector("img")).not.toBe(null);

    el.setAttribute("strategy", "average");
    expect(el.shadow.querySelector("img")).toBe(null);
    expect(el.shadow.querySelector("div")).not.toBe(null);
  });
});
