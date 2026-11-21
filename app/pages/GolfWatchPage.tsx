import { useEffect, useState } from "react";
import { createApiClient } from "../api/client";
import type { components } from "../api/schema";
import GolfWatchAppGamingMultiplayer from "../components/GolfWatchApps/GolfWatchAppGamingMultiplayer";
import { APP_NAME } from "../config";
import { usePageTitle } from "../hooks/usePageTitle";

type Game = components["schemas"]["Game"];
type RankingEntry = components["schemas"]["RankingEntry"];

export default function GolfWatchPage({ gameId }: { gameId: string }) {
  const [game, setGame] = useState<Game | null>(null);
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const gameIdNum = Number(gameId);

  usePageTitle(
    game
      ? `Golf Watching ${game.display_name} | ${APP_NAME}`
      : `Golf Watching | ${APP_NAME}`,
  );

  useEffect(() => {
    const apiClient = createApiClient();
    Promise.all([
      apiClient.getGame(gameIdNum),
      apiClient.getGameWatchRanking(gameIdNum),
    ])
      .then(([{ game }, { ranking }]) => {
        setGame(game);
        setRanking(ranking);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [gameIdNum]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">試合が見つかりませんでした</p>
      </div>
    );
  }

  return (
    <GolfWatchAppGamingMultiplayer
      gameDisplayName={game.display_name}
      problemTitle={game.problem.title}
      problemDescription={game.problem.description}
      sampleCode={game.problem.sample_code}
      ranking={ranking}
    />
  );
}
