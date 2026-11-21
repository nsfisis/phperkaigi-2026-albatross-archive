import { useEffect, useState } from "react";
import { createApiClient } from "../api/client";
import type { components } from "../api/schema";
import BorderedContainerWithCaption from "../components/BorderedContainerWithCaption";
import NavigateLink from "../components/NavigateLink";
import { APP_NAME } from "../config";
import { usePageTitle } from "../hooks/usePageTitle";

type Game = components["schemas"]["Game"];

export default function DashboardPage() {
  usePageTitle(`Dashboard | ${APP_NAME}`);

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiClient = createApiClient();
    apiClient
      .getGames()
      .then(({ games }) => setGames(games))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold text-gray-800">試合一覧</h1>
      <BorderedContainerWithCaption caption="試合一覧">
        <div className="px-4">
          {games.length === 0 ? (
            <p>試合はありません</p>
          ) : (
            <ul className="divide-y divide-gray-300">
              {games.map((game) => (
                <li
                  key={game.game_id}
                  className="flex justify-between items-center py-2 gap-4"
                >
                  <div>
                    <span className="font-medium text-gray-800">
                      {game.display_name}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <NavigateLink to={`/golf/${game.game_id}/watch`}>
                      結果を見る
                    </NavigateLink>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </BorderedContainerWithCaption>
    </div>
  );
}
