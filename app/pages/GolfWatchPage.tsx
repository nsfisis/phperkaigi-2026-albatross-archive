import type { components } from "../api/schema";
import GolfWatchAppGamingMultiplayer from "../components/GolfWatchApps/GolfWatchAppGamingMultiplayer";

type Props = {
  game: components["schemas"]["Game"];
  ranking: components["schemas"]["RankingEntry"][];
};

export default function GolfWatchPage({ game, ranking }: Props) {
  return (
    <GolfWatchAppGamingMultiplayer
      gameDisplayName={game.display_name}
      problemTitle={game.problem.title}
      problemDescription={game.problem.description}
      sampleCode={game.problem.sample_code}
      sampleCodeHtml={game.problem.sample_code_html}
      ranking={ranking}
    />
  );
}
