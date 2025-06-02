import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import axios from "axios";
import Loader from "../utils/Loader";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { MdArrowDropUp } from "react-icons/md";
import { Link } from "react-router-dom";
import LoaderCardForPreview from "../components/LoaderCardForPreview";

interface EventData {
  _id: string;
  name: string;
  isCompleted?: boolean;
  hostId: string;
  winner?: string;
  runner?: string;
}

const allEvents = ["All", "Series", "Tournament"];
const apiUrl = import.meta.env.VITE_API_BASE_URL;

function AllEventsPage() {
  const [series, setSeries] = useState<EventData[]>([]);
  const [tournaments, setTournaments] = useState<EventData[]>([]);
  const [choosenEvent, setChoosenEvent] = useState<string>("All");
  const [showDropDownToChooseEventType, setShowDropDownToChooseEventTypet] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useRef to store fetched data persistently
  const cachedData = useRef<{ series: EventData[]; tournaments: EventData[] } | null>(null);

  // Memoized function to fetch events only if data is not cached
  const fetchAllEventsData = useCallback(async () => {
    if (cachedData.current) {
      setSeries(cachedData.current.series);
      setTournaments(cachedData.current.tournaments);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${apiUrl}/api/client-side/all-events`);

      setSeries(response.data.seriesData);
      setTournaments(response.data.tournamentData);

      // Store fetched data in useRef to avoid re-fetching
      cachedData.current = {
        series: response.data.seriesData,
        tournaments: response.data.tournamentData,
      };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Cannot fetch events.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data when the component mounts
  useEffect(() => {
    fetchAllEventsData();
  }, [fetchAllEventsData]);

  // Memoized list of events based on the chosen category
  const filteredEvents = useMemo(() => {
    switch (choosenEvent) {
      case "Series":
        return series;
      case "Tournament":
        return tournaments;
      default:
        return [...series, ...tournaments]; // "All"
    }
  }, [choosenEvent, series, tournaments]);

  // Memoized dropdown list to avoid unnecessary re-renders
  const eventOptions = useMemo(
    () => allEvents.filter((event) => event !== choosenEvent),
    [choosenEvent]
  );

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-[100vh] bg-[#111217]">
      {/* Header Section */}
      <header className="w-full h-[10vh] headers relative text-xl font-semibold px-6 flex justify-between items-center mb-4">
        <h1>{choosenEvent} Events</h1>

        {/* Dropdown Button */}
        <div className="px-2 py-1 my-2 h-fit absolute right-[20px] top-[1.5vh] flex flex-col shadow-[#172486] shadow-sm bg-[#0f2e75]">
          <button
            onClick={() => setShowDropDownToChooseEventTypet((prev) => !prev)}
            className="flex justify-center items-center w-[90px] text-sm gap-1"
          >
            {choosenEvent}
            {showDropDownToChooseEventType ? (
              <MdArrowDropUp />
            ) : (
              <IoMdArrowDropdown />
            )}
          </button>

          {/* Dropdown List */}
          {showDropDownToChooseEventType && (
            <ul className="w-[90px] py-2 flex flex-col gap-2 bg-[#0f2e75]">
              {eventOptions.map((eventType) => (
                <li
                  key={eventType}
                  onClick={() => {
                    setChoosenEvent(eventType);
                    setShowDropDownToChooseEventTypet(false);
                  }}
                  className="text-sm font-medium cursor-pointer hover:bg-[#0d254a] px-2 py-1"
                >
                  {eventType}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* Event List */}
      <ul className=" w-full  px-[3%] flex flex-col items-center gap-2">
        {!loading ? (
          filteredEvents.map((event) => (
            <Link
              to={`/${event.name}/all-matches/${event._id}`}
              key={event._id}
              className="p-2 flex w-[90%] gap-1 rounded-sm px-8 items-center bg-[#000000] text-white hover:bg-[#1a1a1a] transition"
            >
              <h1 className="capitalize tracking-wide font-semibold text-md">
                {event.name}
              </h1>
              <IoMdArrowDropright />
            </Link>
          ))
        ) : (
          <LoaderCardForPreview length={7} />
        )}
      </ul>
      <Link to={"/abc"} >wjcewoj</Link>
    </div>
  );
}

export default AllEventsPage;
