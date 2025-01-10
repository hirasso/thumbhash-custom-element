import { beforeAll, describe, expect, it } from "vitest";

import { ThumbHashElement } from "../../../src/index.js";
import { hash } from "../support.js";

describe("lightDom", () => {
  beforeAll(() => {
    ThumbHashElement.init();
  });

  it("Renders light DOM content via <slot>", () => {
    // Add the element to the document
    document.body.innerHTML = `
      <thumb-hash value="${hash}">
        <span>Test Content</span>
      </thumb-hash>
    `;

    const thumbHash = document.querySelector("thumb-hash")!;
    const shadowContent = thumbHash.shadowRoot!.querySelector("slot")!;

    // Ensure the slot is rendered and light DOM content is accessible
    const assignedNodes = shadowContent
      .assignedNodes({ flatten: true })
      .filter((node) => node.nodeType === Node.ELEMENT_NODE);

    expect(assignedNodes).toHaveLength(1);
    expect(assignedNodes[0].textContent).toBe("Test Content");
  });
});
