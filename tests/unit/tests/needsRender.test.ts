import { beforeAll, describe, expect, it } from "vitest";

import { ThumbHashElement } from "../../../src/index.js";
import { $, hash, otherHash } from "../support.js";

describe("needsRender", () => {
  beforeAll(() => {
    ThumbHashElement.init();
  });

  it("re-renders if the shadow root is empty", () => {
    const el = document.createElement("thumb-hash");
    const { shadow } = el;
    el.value = hash;
    document.body.appendChild(el);

    expect($("canvas", shadow)).not.toBeNull();

    el.shadow.innerHTML = "";
    expect($("canvas", shadow)).toBeNull();

    el.remove();
    document.body.appendChild(el);

    expect($("canvas", shadow)).toBeInstanceOf(HTMLCanvasElement);
  });

  it("does not re-render if the shadow root is not empty", () => {
    const el = document.createElement("thumb-hash");
    const { shadow } = el;
    el.value = hash;
    document.body.appendChild(el);

    $("canvas", shadow)!.setAttribute("data-expect-me-to-exist", "");

    el.remove();
    document.body.appendChild(el);

    expect($("canvas", shadow)?.hasAttribute("data-expect-me-to-exist")).toBe(
      true
    );
  });

  it("re-renders if the hash has changed", () => {
    const el = document.createElement("thumb-hash");
    const { shadow } = el;
    el.value = hash;
    document.body.appendChild(el);

    $("canvas", shadow)!.setAttribute("data-expect-me-not-to-exist", "");
    el.value = otherHash;

    expect(
      $("canvas", shadow)!.hasAttribute("data-expect-me-not-to-exist")
    ).toBe(false);
  });

  it("re-renders if the strategy has changed", () => {
    const el = document.createElement("thumb-hash");
    const { shadow } = el;
    el.value = hash;
    document.body.appendChild(el);

    $("canvas", shadow)!.setAttribute("data-expect-me-not-to-exist", "");
    el.strategy = "img";

    expect($("canvas", shadow)).toBeNull();
    expect($("img", shadow)).not.toBe(null);
  });
});
