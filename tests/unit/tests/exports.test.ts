import { describe, expect, it } from "vitest";

import * as UMDBuild from "../../../src/ThumbHashElement.js";

describe("Exports", () => {
  it("should only have a default export for the UMD bundle", () => {
    expect(Object.keys(UMDBuild)).toEqual(["default"]);
  });
});
