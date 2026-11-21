import { describe, expect, test } from "vitest";
import { calcCodeSize } from "./codeSize";

describe("calcCodeSize", () => {
  test("ignores whitespace and PHP open tag", () => {
    expect(calcCodeSize("<?php echo 1;")).toBe(6);
    expect(calcCodeSize("<?php\necho 1;\n?>")).toBe(6);
  });
});
