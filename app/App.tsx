import { Route, Router, Switch } from "wouter";
import { BASE_PATH } from "./config";
import DashboardPage from "./pages/DashboardPage";
import GolfWatchPage from "./pages/GolfWatchPage";
import IndexPage from "./pages/IndexPage";
import TournamentPage from "./pages/TournamentPage";

export default function App() {
  return (
    <Router base={BASE_PATH.replace(/\/$/, "")}>
      <Switch>
        <Route path="/">
          <IndexPage />
        </Route>
        <Route path="/dashboard">
          <DashboardPage />
        </Route>
        <Route path="/golf/:gameId/watch">
          {(params) => <GolfWatchPage gameId={params.gameId} />}
        </Route>
        <Route path="/tournament/:tournamentId">
          {(params) => <TournamentPage tournamentId={params.tournamentId} />}
        </Route>
        <Route>
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500 text-xl">404 - Page not found</p>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}
