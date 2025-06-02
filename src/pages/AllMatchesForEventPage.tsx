import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";
import AnimationLoaderForBlueBG from "../utils/AnimationLoaderForBlueBG";
import LoaderCardForPreview from "../components/LoaderCardForPreview";
import MatchPreview from "../components/MatchPreview";

interface Batter {
  isOut: boolean;
}

interface SuperOverStat {
  runs: number;
  batters: Batter[];
  balls: unknown[]; // Since 'balls' exists in your output
}

interface BatterStats {
  aTeambattingStats: Batter[];
  bTeambattingStats: Batter[];
  totalRuns?: number; // Optional as per your output
}

interface OverDetails {
  overNumber: { overNumber: number };
  overCompleted: string;
  balls: EachBalls[];
  _id: string;
}
interface EachBalls {
  ballNumber: number;
  batsmanName: string;
  runs: number;
  dot: boolean;
  single: boolean;
  double: boolean;
  triple: boolean;
  four: boolean;
  six: boolean;
  extras: boolean;
  caption: string;
  isWicket: boolean;
  dismissalType: string;
  dismissedVia: string | null;
  _id: string;
}

interface MatchData {
  _id: string;
  teamAName: string;
  teamBName: string;
  timing: string; // ISO string format
  status: string;
  winner: string | null; // Nullable if match hasn’t been decided
  resultMessege: string | null; // Keep typo if API uses it

  aTeamSuperOverStat: SuperOverStat;
  bTeamSuperOverStat: SuperOverStat;
  aTeamBatterStats: BatterStats;
  bTeamBatterStats: BatterStats;

  firstInningStarted: boolean;
  firstInningStartedOfSuperOver: boolean;
  secondInningStarted: boolean;
  secondInningStartedOfSuperOver: boolean;
  overs: number;
  aTeamInning: OverDetails[];
  bTeamInning: OverDetails[];
}

interface EventName {
  _id: string;
  name: string;
}

interface MatchResponse {
  data: MatchData[];
  eventName: EventName;
  success: boolean;
}

function AllMatchesForEventPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Added type
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [event, setEvent] = useState<string>("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get<MatchResponse>(
          `http://localhost:3000/api/client-side/matches-of/${id}`
        );
        setMatches(response.data.data);
        setEvent(response.data.eventName.name);
      } catch (err: unknown) {
        console.error("Error fetching matches:", err);
        setError("Failed to fetch matches. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    const fetchAdminVerification = async () => {
      try {
        const response = await axios.get<MatchResponse>(
          `http://localhost:3000/api/user/verify-event-updater/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
    
        if (response.data) {
          setIsAdmin(response.data.success);
        }
      } catch (err: unknown) {
        console.error("Error fetching matches:", err);
        setError("Failed to fetch matches. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    

    if (token&&id) fetchAdminVerification();

    if (id) fetchMatches();
  }, [id]); // Added id to dependencies
  return (
    <div className="bg-[#111217] w-full min-h-screen">
      <header className="w-full capitalize h-[10vh] headers relative text-xl font-semibold px-6 flex justify-between items-center mb-4">
        <h1 className="min-w-[80%] h-[80%] flex items-center">
          {event ? event : <AnimationLoaderForBlueBG />}
        </h1>
        <IoCaretBackOutline onClick={() => navigate(-1)} />
      </header>

      <div className="w-full h-fit mt-2 flex flex-col items-center ">
        {loading ? (
          <LoaderCardForPreview length={7} />
        ) : (
          <MatchPreview Data={{ data: matches }} isAdmin={isAdmin} />
        )}
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
}

export default AllMatchesForEventPage;
