import { createStore } from "jotai";
import { describe, expect, test } from "vitest";
import { calcCodeSize, rankingAtom } from "./watch";

describe("watch calcCodeSize", () => {
  test("works the same as play calcCodeSize", () => {
    expect(calcCodeSize("<?php echo 1;", "php")).toBe(6);
    expect(calcCodeSize("print(1)", "swift")).toBe(8);
  });
});

describe("watch Jotai atoms", () => {
  test("rankingAtom is empty initially", () => {
    const store = createStore();
    expect(store.get(rankingAtom)).toEqual([]);
  });
});
