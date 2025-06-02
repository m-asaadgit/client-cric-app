import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllEventsPage from "../pages/AllEventsPage";
import AllMatchesForEventPage from "../pages/AllMatchesForEventPage";
import MatchCompleteDetailsPage from "../pages/MatchCompleteDetailsPage";
import IOcheck from "../pages/IOcheck";
import Home from "../pages/Home";
import ResetPassword from "../components/loginSignupComponents/ResetPassword";
import TournamentAndSeriesCreation from "../pages/TournamentAndSeriesCreation";
import UpdateScorePage from "../pages/UpdateScorePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>} />{" "}
      <Route path="/all-events" element={<AllEventsPage></AllEventsPage>} />
      <Route
        path="/:eventName/all-matches/:id"
        element={<AllMatchesForEventPage></AllMatchesForEventPage>}
      />{" "}
      <Route
        path="match-details/:matchId"
        element={<MatchCompleteDetailsPage></MatchCompleteDetailsPage>}
      />{" "}
      <Route path="/abc" element={<IOcheck></IOcheck>} />
      <Route path="/create/event" element={<TournamentAndSeriesCreation></TournamentAndSeriesCreation>} />
      <Route path="/reset-password/:token" element={<ResetPassword></ResetPassword>} />
      <Route path="/update-score/:matchId" element={<UpdateScorePage></UpdateScorePage>} />
    </Routes>
  );
}

export default AppRoutes;
