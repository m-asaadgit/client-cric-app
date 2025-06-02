import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

// Connect to WebSocket server
const socket = io(apiUrl);

const IOcheck = () => {
  const [matchData, setMatchData] = useState(null);
  const categoryId = "67ded85f422b0e7db810958c"; // Replace with dynamic ID if needed

  useEffect(() => {
    // Fetch initial data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/client-side/matches-of/${categoryId}`
        );
        setMatchData(response.data.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchData(); // Load data on first render

    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("matchUpdated", ({ type, data }) => {
      console.log(`Real-time update received from: ${type}`, data);
      setMatchData(data); // Update UI dynamically
    });

    return () => {
      socket.off("matchUpdated");
    };
  }, [categoryId]);
  console.log(matchData && matchData[0].teamAName);
  return (
    <div>
      <h2>Live Match Data</h2>
      {
        matchData && matchData[0].teamAName
      }
    </div>
  );
};

export default IOcheck;
