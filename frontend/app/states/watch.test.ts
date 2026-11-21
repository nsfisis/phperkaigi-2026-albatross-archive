import { createStore } from "jotai";
import { describe, expect, test } from "vitest";
import {
  calcCodeSize,
  checkGameResultKind,
  latestGameStatesAtom,
  rankingAtom,
  setLatestGameStatesAtom,
} from "./watch";

describe("checkGameResultKind", () => {
  test("returns draw when both scores are null", () => {
    expect(checkGameResultKind(null, null)).toBe("draw");
  });

  test("returns draw when both states have null scores", () => {
    const stateA = {
      code: "",
      status: "none" as const,
      score: null,
      best_score_submitted_at: null,
    };
    const stateB = {
      code: "",
      status: "none" as const,
      score: null,
      best_score_submitted_at: null,
    };
    expect(checkGameResultKind(stateA, stateB)).toBe("draw");
  });

  test("returns winB when only A has null score", () => {
    const stateA = {
      code: "",
      status: "none" as const,
      score: null,
      best_score_submitted_at: null,
    };
    const stateB = {
      code: "echo 1;",
      status: "success" as const,
      score: 10,
      best_score_submitted_at: 1000,
    };
    expect(checkGameResultKind(stateA, stateB)).toBe("winB");
  });

  test("returns winA when only B has null score", () => {
    const stateA = {
      code: "echo 1;",
      status: "success" as const,
      score: 10,
      best_score_submitted_at: 1000,
    };
    const stateB = {
      code: "",
      status: "none" as const,
      score: null,
      best_score_submitted_at: null,
    };
    expect(checkGameResultKind(stateA, stateB)).toBe("winA");
  });

  test("returns winA when A has lower score (code golf)", () => {
    const stateA = {
      code: "a",
      status: "success" as const,
      score: 5,
      best_score_submitted_at: 1000,
    };
    const stateB = {
      code: "abcdefghij",
      status: "success" as const,
      score: 10,
      best_score_submitted_at: 1000,
    };
    expect(checkGameResultKind(stateA, stateB)).toBe("winA");
  });

  test("returns winB when B has lower score (code golf)", () => {
    const stateA = {
      code: "abcdefghij",
      status: "success" as const,
      score: 10,
      best_score_submitted_at: 1000,
    };
    const stateB = {
      code: "a",
      status: "success" as const,
      score: 5,
      best_score_submitted_at: 1000,
    };
    expect(checkGameResultKind(stateA, stateB)).toBe("winB");
  });

  test("breaks tie by earlier submission time - A wins", () => {
    const stateA = {
      code: "echo 1;",
      status: "success" as const,
      score: 10,
      best_score_submitted_at: 1000,
    };
    const stateB = {
      code: "echo 1;",
      status: "success" as const,
      score: 10,
      best_score_submitted_at: 1060,
    };
    expect(checkGameResultKind(stateA, stateB)).toBe("winA");
  });

  test("breaks tie by earlier submission time - B wins", () => {
    const stateA = {
      code: "echo 1;",
      status: "success" as const,
      score: 10,
      best_score_submitted_at: 1060,
    };
    const stateB = {
      code: "echo 1;",
      status: "success" as const,
      score: 10,
      best_score_submitted_at: 1000,
    };
    expect(checkGameResultKind(stateA, stateB)).toBe("winB");
  });
});

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

  test("latestGameStatesAtom is empty initially", () => {
    const store = createStore();
    expect(store.get(latestGameStatesAtom)).toEqual({});
  });

  test("setLatestGameStatesAtom updates states", () => {
    const store = createStore();
    const states = {
      player1: {
        code: "echo 1;",
        status: "success" as const,
        score: 10,
        best_score_submitted_at: 1000,
      },
    };
    store.set(setLatestGameStatesAtom, states);
    expect(store.get(latestGameStatesAtom)).toEqual(states);
  });
});
