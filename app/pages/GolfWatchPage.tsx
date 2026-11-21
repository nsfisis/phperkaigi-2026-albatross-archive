import { createStore, Provider as JotaiProvider } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { createApiClient } from "../api/client";
import type { components } from "../api/schema";
import GolfWatchApp from "../components/GolfWatchApp";
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

  const store = useMemo(() => {
    if (!game) return null;
    return createStore();
  }, [game]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error || !game || !store) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">試合が見つかりませんでした</p>
      </div>
    );
  }

  return (
    <JotaiProvider store={store}>
      <GolfWatchApp key={game.game_id} game={game} initialRanking={ranking} />
    </JotaiProvider>
  );
}
