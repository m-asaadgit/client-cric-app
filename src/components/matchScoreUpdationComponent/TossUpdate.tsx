import { useState, useEffect, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";
import axios from "axios";
import { useParams } from "react-router-dom";
import showToast from "../../utils/ShowToast";
import ShowToast from "../../utils/ShowToast";
interface Player {
  playerName: string;
  isTwelfthMan?: boolean;

}

interface TossFormInput {
  tossWinnerTeamName: string;
  tossLooserTeamName: string;
  tossDecision: string;
  aTeamPlayers: Player[];
  bTeamPlayers: Player[];
}

interface TossInputFormProps {
  playerASide: number;
  teamNames: string[];
  verifyIsAdmin: () => Promise<void>;

}
const selectedOpt = ["Bat First", "Bowl First"];

export default function TossInputForm({
  playerASide,
  verifyIsAdmin,
  teamNames,
}: TossInputFormProps) {
  const { matchId } = useParams();
  const [playerCount, setPlayerCount] = useState<number>(playerASide + 1);
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  console.log(teamNames);
  const [dropForTossWinner, setdDopForTossWinner] = useState<boolean>(false);
  const [aTeam12Checked, setaTeam12Checked] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [messege, setMessege] = useState<string>("");
  const [bTeam12Checked, setbTeam12Checked] = useState<boolean>(false);
  const [dropForTossLooser, setdDopForTossLooser] = useState<boolean>(false);
  const [dropForSelectOpt, setDropForSelectOpt] = useState<boolean>(false);
  var [formData, setFormData] = useState<TossFormInput>({
    tossWinnerTeamName: "",
    tossLooserTeamName: "",
    tossDecision: "",
    aTeamPlayers: Array.from({ length: playerASide + 1 }, () => ({
      playerName: "",
      isTwelfthMan: false,
    })),
    bTeamPlayers: Array.from({ length: playerASide + 1 }, () => ({
      playerName: "",
      isTwelfthMan: false,
    })),
  });
  // Updates player lists when playerCount changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      aTeamPlayers: Array.from(
        { length: playerCount },
        (_, i) => prev.aTeamPlayers[i] || { playerName: "" }
      ),
      bTeamPlayers: Array.from(
        { length: playerCount },
        (_, i) => prev.bTeamPlayers[i] || { playerName: "" }
      ),
    }));
  }, [playerCount]);
  const hasDuplicates = (players: { playerName: string }[]) => {
    const names = players.map((p) => p.playerName);
    return new Set(names).size !== names.length;
  };
  const handleSubmit = async () => {
    if (token) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/unlisted-match/toss-winners/${matchId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setSuccess(true)

setMessege(response.data.message)
        console.log("Response:", response.data);
      } catch (error: any) {
        console.error(
          "Error submitting data:",
          error.response?.data || error.message
        );
        setSuccess(false)
        setMessege(error.response?.data.message)
      }
    }
    verifyIsAdmin()
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    team: "aTeamPlayers" | "bTeamPlayers",
    index: number
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked; // Explicit cast for checkbox

    setFormData((prevFormData) => {
      const updatedPlayers = prevFormData[team].map((player, i) =>
        i === index
          ? { ...player, [name]: type === "checkbox" ? checked : value }
          : player
      );

      return {
        ...prevFormData,
        [team]: updatedPlayers,
      };
    });

    // Handle the 12th man selection logic separately
    if (name == "isTwelfthMan") {
      setaTeam12Checked(
        formData.aTeamPlayers.filter((player) => player.isTwelfthMan).length > 0
      );
      setbTeam12Checked(
        formData.bTeamPlayers.filter((player) => player.isTwelfthMan).length > 0
      );
    }
  };
  console.log(
    hasDuplicates(formData.aTeamPlayers),
    hasDuplicates(formData.bTeamPlayers),
    formData.tossLooserTeamName && formData.tossWinnerTeamName,
    formData.tossDecision,
    formData.aTeamPlayers.filter((item) => item.playerName.length > 3).length >=
      playerASide,
    formData.bTeamPlayers.filter((item) => item.playerName.length > 3).length >=
      playerASide,
    "hi"
  );

  return (
    <div className="p-2  w-full flex flex-col  mx-auto bg-[#0e0e0e] text-white ">
      <div className="w-full flex   flex-col ">
        <h2 className="text-xl font-bold mb-2 font-montserrat px-4">
          Update Toss Details
        </h2>
        <div className="w-full flex flex-col md:flex-row  px-3 md:gap-4">
          <div className=" w-full md:w-[25%] md:h-[10vh] h-[6vh]   relative  mb-4 card">
            <button
              onClick={() => {
                setdDopForTossWinner((prev) => !prev);
              }}
              className="w-full h-full  center  flex gap-2  font-extrabold bg-[#090909] "
            >
              {formData.tossWinnerTeamName
                ? formData.tossWinnerTeamName
                : "Select Toss Winner"}
              {!dropForTossWinner ? (
                <MdOutlineArrowDropDown></MdOutlineArrowDropDown>
              ) : (
                <MdArrowDropUp></MdArrowDropUp>
              )}
            </button>

            <div className="w-full absolute top-[100%] z-[1000] ">
              {dropForTossWinner &&
                teamNames.map((item, index) => (
                  <button
                    onClick={() => {
                      if (item == formData.tossLooserTeamName) {
                        toast(
                          `Winner and Looser of the toss cannot be the same`,
                          {
                            icon: "⚠️",
                            style: {
                              background: "#090909",
                              color: "red", // Ensure text is red
                              textAlign: "center",
                              borderRadius: "4px",
                              fontWeight: "bold",
                            },
                          }
                        );
                      } else {
                        setFormData({ ...formData, tossWinnerTeamName: item });
                        setdDopForTossWinner(false);
                      }
                    }}
                    key={index}
                    className="w-full  border-b-[#ccc5b9] border-b-[1px] p-2 text-white bg-black"
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>{" "}
          <div className=" w-full md:w-[25%] md:h-[10vh] h-[6vh]   relative  mb-4 card">
            <button
              onClick={() => {
                setdDopForTossLooser((prev) => !prev);
              }}
              className="w-full h-full  center  flex gap-2  font-extrabold bg-[#090909] "
            >
              {" "}
              {formData.tossLooserTeamName
                ? formData.tossLooserTeamName
                : "Select Toss Looser"}
              {!dropForTossLooser ? (
                <MdOutlineArrowDropDown></MdOutlineArrowDropDown>
              ) : (
                <MdArrowDropUp></MdArrowDropUp>
              )}
            </button>

            <div className="w-full absolute top-[100%] z-[1000] ">
              {dropForTossLooser &&
                teamNames.map((item, index) => (
                  <button
                    onClick={() => {
                      if (item == formData.tossWinnerTeamName) {
                        toast(
                          `Winner and Looser of the toss cannot be the same`,
                          {
                            icon: "⚠️",
                            style: {
                              background: "#090909",
                              color: "red", // Ensure text is red
                              textAlign: "center",
                              borderRadius: "4px",
                              fontWeight: "bold",
                            },
                          }
                        );
                      } else {
                        setFormData({ ...formData, tossLooserTeamName: item });
                        setdDopForTossLooser(false);
                      }
                    }}
                    key={index}
                    className="w-full  border-b-[#ccc5b9] border-b-[1px] p-2 text-white bg-black"
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>{" "}
          <div className=" w-full md:w-[25%] md:h-[10vh] h-[6vh]   relative  mb-4 card">
            <button
              onClick={() => {
                setDropForSelectOpt((prev) => !prev);
              }}
              className="w-full h-full  center  flex gap-2  font-extrabold bg-[#090909] "
            >
              {" "}
              {formData.tossDecision
                ? formData.tossDecision
                : "Select Toss Looser"}
              {!dropForSelectOpt ? (
                <MdOutlineArrowDropDown></MdOutlineArrowDropDown>
              ) : (
                <MdArrowDropUp></MdArrowDropUp>
              )}
            </button>

            <div className="w-full absolute top-[100%] z-[1000] ">
              {dropForSelectOpt &&
                selectedOpt.map((item, index) => (
                  <button
                    onClick={() => {
                      setFormData({ ...formData, tossDecision: item });
                      setDropForSelectOpt(false);
                    }}
                    key={index}
                    className="w-full  border-b-[#ccc5b9] border-b-[1px] p-2 text-white bg-black"
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex md:flex-row flex-col justify-between py-3  px-1 bg-[#090909] ">
        <div className=" w-full md:w-[48%] h-full ">
          <h3 className="text-lg font-semibold">
            Enter {teamNames[0]} Players
          </h3>
          {formData.aTeamPlayers.map((player, index) => (
            <div key={index} className="flex w-full  gap-2 mb-2">
              <input
                type="text"
                name="playerName"
                required
                placeholder={`Player ${index + 1}`}
                className="flex-1 p-2 w-[80%] bg-[#141313] text-white 
      outline-none focus:ring-none focus:ring-none"
                value={player.playerName}
                onChange={(e) => handleChange(e, "aTeamPlayers", index)} // Corrected from bTeamPlayers to aTeamPlayers
              />
              <label className="flex gap-1 items-center text-sm">
                <input
                  type="checkbox"
                  name="isTwelfthMan"
                  checked={!!player.isTwelfthMan}
                  disabled={
                    formData.aTeamPlayers.filter(
                      (player) => player.isTwelfthMan
                    ).length > 0 && !formData.aTeamPlayers[index].isTwelfthMan
                  }
                  onChange={(e) => {
                    handleChange(e, "aTeamPlayers", index); // Ensure it updates the correct team
                  }}
                />
                12th Man
              </label>
            </div>
          ))}
        </div>{" "}
        <div className=" w-full md:w-[48%] h-full ">
          <h3 className="text-lg font-semibold">
            Enter {teamNames[1]} Players
          </h3>
          {formData.bTeamPlayers.map((player, index) => (
            <div key={index} className="flex w-full  gap-2 mb-2">
              <input
                type="text"
                name="playerName"
                required
                placeholder={`Player ${index + 1}`}
                className="flex-1 p-2 w-[80%] bg-[#141313] text-white 
      outline-none focus:ring-none focus:ring-none"
                value={player.playerName}
                onChange={(e) => handleChange(e, "bTeamPlayers", index)} // Corrected from bTeamPlayers to aTeamPlayers
              />
              <label className="flex gap-1 items-center text-sm">
                <input
                  type="checkbox"
                  name="isTwelfthMan"
                  checked={!!player.isTwelfthMan}
                  disabled={
                    formData.bTeamPlayers.filter(
                      (player) => player.isTwelfthMan
                    ).length > 0
                  }
                  onChange={(e) => {
                    handleChange(e, "bTeamPlayers", index); // Ensure it updates the correct team
                  }}
                />
                12th Man
              </label>
            </div>
          ))}
        </div>
      </div>
      {!hasDuplicates(formData.aTeamPlayers) &&
        !hasDuplicates(formData.bTeamPlayers) &&
        formData.tossLooserTeamName &&
        formData.tossWinnerTeamName &&
        formData.tossDecision &&
        formData.aTeamPlayers.filter((item) => item.playerName.length > 3)
          .length >=
          playerASide + 1 &&
        formData.bTeamPlayers.filter((item) => item.playerName.length > 3)
          .length >=
          playerASide + 1 && (
          <button
            onClick={() => handleSubmit()}
            className="w-full p-2 mt-4 bg-yellow-400 outline-none focus:ring-none active:bg-yellow-500 text-black font-bold rounded"
          >
            Submit
          </button>
        )}
      {(!formData.tossLooserTeamName ||
        !formData.tossWinnerTeamName ||
        !formData.tossDecision) && (
        <ShowToast text="Select toss winner, loser, and their elected option!" />
      )}
      {hasDuplicates(formData.aTeamPlayers) ||
        hasDuplicates(formData.bTeamPlayers) ||
        formData.tossLooserTeamName ||
        formData.tossWinnerTeamName ||
        formData.tossDecision ||
        formData.aTeamPlayers.filter((item) => item.playerName.length > 3)
          .length >=
          playerASide + 1 ||
        formData.bTeamPlayers.filter((item) => item.playerName.length > 3)
          .length >=
          playerASide + 1 || (
          <ShowToast text="Please enter player name and every player should have a unique name in a single team!" />
        )}{" "}
      {hasDuplicates(formData.aTeamPlayers) ||
        hasDuplicates(formData.bTeamPlayers) ||
        formData.tossLooserTeamName ||
        formData.tossWinnerTeamName ||
        formData.tossDecision ||
        formData.aTeamPlayers.filter((item) => item.playerName.length > 3)
          .length >=
          playerASide + 1 ||
        formData.bTeamPlayers.filter((item) => item.playerName.length > 3)
          .length >=
          playerASide + 1 || (
          <ShowToast text="Please enter player name and every player should have a unique name in a single team!" />
        )}
        <h1 className={ ` text-center ${success?"text-green-700":"text-red-900"}`}  >
          {messege&& messege}
        </h1>
    </div>
  );
}
