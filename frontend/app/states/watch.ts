import { atom } from "jotai";
import type { components } from "../api/schema";
import type { SupportedLanguage } from "../types/SupportedLanguage";

type LatestGameState = components["schemas"]["LatestGameState"];
type RankingEntry = components["schemas"]["RankingEntry"];

export const rankingAtom = atom<RankingEntry[]>([]);

const rawLatestGameStatesAtom = atom<{
  [key: string]: LatestGameState | undefined;
}>({});
export const latestGameStatesAtom = atom((get) => get(rawLatestGameStatesAtom));
export const setLatestGameStatesAtom = atom(
  null,
  (_, set, value: { [key: string]: LatestGameState | undefined }) => {
    set(rawLatestGameStatesAtom, value);
  },
);

function cleanCode(code: string, language: SupportedLanguage) {
  if (language === "php") {
    return code
      .replace(/\s+/g, "")
      .replace(/^<\?php/, "")
      .replace(/^<\?/, "")
      .replace(/\?>$/, "");
  } else {
    return code.replace(/\s+/g, "");
  }
}

export function calcCodeSize(
  code: string,
  language: SupportedLanguage,
): number {
  const trimmed = cleanCode(code, language);
  const utf8Encoded = new TextEncoder().encode(trimmed);
  return utf8Encoded.length;
}

export type GameResultKind = "winA" | "winB" | "draw";

export function checkGameResultKind(
  stateA: LatestGameState | null,
  stateB: LatestGameState | null,
): GameResultKind {
  const scoreA = stateA?.score;
  const scoreB = stateB?.score;
  if (scoreA == null && scoreB == null) {
    return "draw";
  }
  if (scoreA == null) {
    return "winB";
  }
  if (scoreB == null) {
    return "winA";
  }
  if (scoreA === scoreB) {
    // If score is non-null, state and best_score_submitted_at should also be non-null.
    const submittedAtA = stateA!.best_score_submitted_at!;
    const submittedAtB = stateB!.best_score_submitted_at!;
    return submittedAtA < submittedAtB ? "winA" : "winB";
  } else {
    return scoreA < scoreB ? "winA" : "winB";
  }
}
