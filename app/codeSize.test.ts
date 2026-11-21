import { describe, expect, test } from "vitest";
import { calcCodeSize } from "./codeSize";

describe("calcCodeSize", () => {
  test("ignores whitespace and PHP open tag", () => {
    expect(calcCodeSize("<?php echo 1;", "php")).toBe(6);
    expect(calcCodeSize("print(1)", "swift")).toBe(8);
  });
});
