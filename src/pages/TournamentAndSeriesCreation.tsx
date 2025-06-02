import { useState } from "react";
import axios from "axios";
import { MdArrowDropUp } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import toast from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const TournamentAndSeriesCreation = () => {
  const [matchType, setMatchType] = useState<string>("series");
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [showDropDownToChooseEventType, setShowDropDownToChooseEventTypet] =
    useState<boolean>(false);
  const [choosenEvent, setChoosenEvent] = useState<string>("Series");

  const eventOptions: string[] = ["Series", "Tournament"];

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    if (!token) {
      toast(`You are not allowed to create ${matchType}`, {
        icon: "⚠️",
        style: {
          background: "#090909",
          color: "gray",
          textAlign: "center",
          borderRadius: "4px", // Corrected from "radius" to "borderRadius"
        },
      });
      return;
    }
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post<{ message: string; success: boolean }>(
        `${apiUrl}/api/tournaments-series`,
        { matchType, name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.message);
      setSuccess(response.data.success);
    } catch (error: any) {
      setMessage(
        "Error: " + (error.response?.data?.message || "Something went wrong")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center card2  w-full h-[100vh] pt-[20vh]">
      <div className="h-fit py-[3vh] relative rounded-md w-[90%] card flex justify-center flex-col items-center">
        <div className="rounded-lg shadow-lg w-[90%] mx-auto h-[10vh] relative text-xl font-semibold px-6 flex  justify-between items-center mb-4">
          <h1>{choosenEvent}</h1>
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
            {showDropDownToChooseEventType && (
              <ul className="w-[90px] py-2 flex flex-col gap-2 bg-[#0f2e75]">
                {eventOptions.map((eventType) => (
                  <li
                    key={eventType}
                    onClick={() => {
                      setChoosenEvent(eventType);
                      setMatchType(eventType.toLowerCase());
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
        </div>
        <div className="rounded-lg shadow-lg w-[90%] mx-auto">
          <input
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            className="w-full p-2 bg-gray-700 text-white rounded mb-3 focus:outline-none focus:ring-none"
            placeholder="Enter name"
            required
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded mb-4"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
          {message && (
            <p
              className={`mt-4 ${
                success == true ? "text-green-600" : "text-red-700"
              } text-sm text-center  `}
            >
              {message}{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentAndSeriesCreation;
