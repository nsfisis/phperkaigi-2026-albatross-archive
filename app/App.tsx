import type { PageData } from "./pageData";
import DashboardPage from "./pages/DashboardPage";
import GolfWatchPage from "./pages/GolfWatchPage";
import IndexPage from "./pages/IndexPage";
import TournamentPage from "./pages/TournamentPage";

export default function App({ data }: { data: PageData }) {
  switch (data.page) {
    case "index":
      return <IndexPage />;
    case "dashboard":
      return <DashboardPage games={data.games} />;
    case "watch":
      return <GolfWatchPage game={data.game} ranking={data.ranking} />;
    case "tournament":
      return <TournamentPage tournament={data.tournament} />;
  }
}
