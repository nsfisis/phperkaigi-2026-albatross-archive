import { useHydrateAtoms } from "jotai/utils";
import type { components } from "../api/schema";
import { rankingAtom, setLatestGameStatesAtom } from "../states/watch";
import GolfWatchAppGaming1v1 from "./GolfWatchApps/GolfWatchAppGaming1v1";
import GolfWatchAppGamingMultiplayer from "./GolfWatchApps/GolfWatchAppGamingMultiplayer";

type Game = components["schemas"]["Game"];
type LatestGameState = components["schemas"]["LatestGameState"];
type RankingEntry = components["schemas"]["RankingEntry"];

export type Props = {
  game: Game;
  initialGameStates: { [key: string]: LatestGameState };
  initialRanking: RankingEntry[];
};

export default function GolfWatchApp({
  game,
  initialGameStates,
  initialRanking,
}: Props) {
  useHydrateAtoms([
    [rankingAtom, initialRanking],
    [setLatestGameStatesAtom, initialGameStates],
  ]);

  const playerA = game.main_players[0];
  const playerB = game.main_players[1];

  const playerProfileA = playerA
    ? {
        id: playerA.user_id,
        displayName: playerA.display_name,
        iconPath: playerA.icon_path ?? null,
      }
    : null;
  const playerProfileB = playerB
    ? {
        id: playerB.user_id,
        displayName: playerB.display_name,
        iconPath: playerB.icon_path ?? null,
      }
    : null;

  return game.game_type === "1v1" ? (
    <GolfWatchAppGaming1v1
      gameDisplayName={game.display_name}
      playerProfileA={playerProfileA}
      playerProfileB={playerProfileB}
      problemTitle={game.problem.title}
      problemDescription={game.problem.description}
      problemLanguage={game.problem.language}
      sampleCode={game.problem.sample_code}
    />
  ) : (
    <GolfWatchAppGamingMultiplayer
      gameDisplayName={game.display_name}
      problemTitle={game.problem.title}
      problemDescription={game.problem.description}
      problemLanguage={game.problem.language}
      sampleCode={game.problem.sample_code}
    />
  );
}
