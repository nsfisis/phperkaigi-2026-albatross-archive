import { API_BASE_PATH } from "../config";
import type { components } from "./schema";

// The API responses are archived as static JSON files (see /archive.sh).

type Schemas = components["schemas"];

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_PATH}${path}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status}`);
  }
  return (await res.json()) as T;
}

class ApiClient {
  getGames() {
    return fetchJson<{ games: Schemas["Game"][] }>("games.json");
  }

  getGame(gameId: number) {
    return fetchJson<{ game: Schemas["Game"] }>(`games/${gameId}.json`);
  }

  getGameWatchRanking(gameId: number) {
    return fetchJson<{ ranking: Schemas["RankingEntry"][] }>(
      `games/${gameId}/watch/ranking.json`,
    );
  }

  getTournament(tournamentId: number) {
    return fetchJson<{ tournament: Schemas["Tournament"] }>(
      `tournaments/${tournamentId}.json`,
    );
  }
}

const apiClient = new ApiClient();

export function createApiClient() {
  return apiClient;
}
