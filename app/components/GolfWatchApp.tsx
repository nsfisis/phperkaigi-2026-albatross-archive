import { useHydrateAtoms } from "jotai/utils";
import type { components } from "../api/schema";
import { rankingAtom } from "../states/watch";
import GolfWatchAppGamingMultiplayer from "./GolfWatchApps/GolfWatchAppGamingMultiplayer";

type Game = components["schemas"]["Game"];
type RankingEntry = components["schemas"]["RankingEntry"];

export type Props = {
  game: Game;
  initialRanking: RankingEntry[];
};

export default function GolfWatchApp({ game, initialRanking }: Props) {
  useHydrateAtoms([[rankingAtom, initialRanking]]);

  return (
    <GolfWatchAppGamingMultiplayer
      gameDisplayName={game.display_name}
      problemTitle={game.problem.title}
      problemDescription={game.problem.description}
      problemLanguage={game.problem.language}
      sampleCode={game.problem.sample_code}
    />
  );
}
