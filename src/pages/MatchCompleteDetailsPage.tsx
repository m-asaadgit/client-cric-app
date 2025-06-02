import { useEffect, useState } from "react";
import axios from "axios";

import LoaderCardForPreview from "../components/LoaderCardForPreview";

import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/MatchCompleteDetailsPageComponents/Header";

import CurrentMatchLiveDetail from "../components/MatchCompleteDetailsPageComponents/CurrentMatchLiveDetail";
import ErrorHandler from "../utils/ErrorHandler";
import io from "socket.io-client";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const socket = io(apiUrl); // Connect to your server
interface data {
  teamAName: string;
  teamBName: string;
  status: string;
}

const MatchCompleteDetailsPage = () => {
  const { matchId } = useParams();
  const Navigate = useNavigate();
  const [data, setData] = useState<data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/client-side/${matchId}`
        );
        console.log("API Response:", response.data); // Debugging
        setData(response.data.data);
      } catch (err: any) {
     
          setError(err.response?.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [matchId]);
  useEffect(() => {
    socket.on("matchUpdated", (updatedMatch) => {
        if (updatedMatch?.updatedMatch?._id == matchId) {
          setData(updatedMatch?.updatedMatch); // Update UI when match updates
        }
       
    });

    return () => {
        socket.off("matchUpdated"); // Cleanup listener
    };
}, [matchId]);



  if (error) return <ErrorHandler messege={error}></ErrorHandler>;

  return (
    <div className="card w-full min-h-[100vh] text-white flex flex-col items-center rounded-md shadow-md">
      <Header
        teamBName={data?.teamBName ?? ""}
        teamAName={data?.teamAName ?? ""}
        liveStatus={data?.status ?? ""}
        loading={loading}
      />{" "}
      {!loading ? (
        <CurrentMatchLiveDetail matchData={data}></CurrentMatchLiveDetail>
      ) : (
        <LoaderCardForPreview length={6}></LoaderCardForPreview>
      )}
    </div>
  );
};

export default MatchCompleteDetailsPage;
// both team score
{
  /* {data && <MatchScore match={data ?? {}}></MatchScore>} */
}
// stack card
