import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";

interface CreateSuperOverProp {
  batterList: { playerName: string }[];
  bowlerList: { playerName: string }[];
  firstInning: boolean;
  teamName: string;
  verifyIsAdmin: () => Promise<void>;
}

interface FormDataProp {
  batter1: string;
  batter2: string;
  bowler: string;
  firstInning: boolean;
}

type DropProp = {
  [key: string]: boolean;
};

const CreateSuperOver = ({
  verifyIsAdmin,
  batterList,
  bowlerList,
  firstInning,
  teamName,
}: CreateSuperOverProp) => {
  const { matchId } = useParams();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [formData, setFormData] = useState<FormDataProp>({
    batter1: "Select Batter 1",
    batter2: "Select Batter 2",
    bowler: "Select Bowler",
    firstInning: firstInning,
  });

  const [drop, setDrop] = useState<DropProp>({
    batter1: false,
    batter2: false,
    bowler: false,
  });

  const handleSubmit = async () => {
    try {
      if (token) {
        const response = await axios.put(
          `http://localhost:3000/api/unlisted-match/super-over-openers-update/${matchId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Super Over updated:", response.data);
      } else {
        console.log("token not provided");
      }
      verifyIsAdmin();
      // You can redirect or show a success message here
    } catch (error) {
      console.error("Failed to update super over:", error);
    }
  };

  const dropDownTemplateForBattersOrBowlers = (
    playerId: keyof FormDataProp,
    exclude: string,
    slNo: number,
    players: { playerName: string }[]
  ) => {
    return (
      <div className="flex flex-col gap-2 mb-2">
        <div className="w-[70%] h-auto flex flex-col relative bg-[#302d2d] mx-auto rounded">
          <button
            onClick={() => {
              setDrop((prev) => ({
                ...prev,
                [playerId]: !prev[playerId],
              }));
            }}
            className="text-xl flex justify-between items-center px-2 py-1 font-semibold "
          >
            <h1>{formData[playerId]}</h1>
            {formData[playerId] !== `Select Batter ${slNo}` &&
            playerId != "bowler" ? (
              <RxCross2
                className="text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setFormData((prev) => ({
                    ...prev,
                    [playerId]: `Select Batter ${slNo}`,
                  }));
                }}
              />
            ) : (
              <IoMdArrowDropdown></IoMdArrowDropdown>
            )}
          </button>

          {drop[playerId] &&
            players
              .filter((item) => item.playerName !== exclude)
              .map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      [playerId]: item.playerName,
                    }));
                    setDrop((prev) => ({
                      ...prev,
                      [playerId]: false,
                    }));
                  }}
                  className="text-left px-2 py-1  hover:bg-[#272626]"
                >
                  {item.playerName}
                </button>
              ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log("batters", batterList);
    console.log("bowlers", bowlerList);
    console.log("firstInning", firstInning);
    console.log(formData, "sD");
  }, []);

  return (
    <div className=" mx-2 rounded-lg py-3  max-h-[50vh] flex flex-col justify-center  gap-2 px-2  bg-[#161616]">
      <h2 className="text-xl text-center font-semibold text-white mb-4">
        Select {teamName} Players
      </h2>
      {dropDownTemplateForBattersOrBowlers(
        "batter1",
        formData.batter2,
        1,
        batterList
      )}
      {dropDownTemplateForBattersOrBowlers(
        "batter2",
        formData.batter1,
        2,
        batterList
      )}
      {dropDownTemplateForBattersOrBowlers(
        "bowler",
        formData.bowler,
        0,
        bowlerList
      )}
      {formData.batter1 == "Select Batter 1" ||
      formData.batter2 == "Select Batter 2" ||
      formData.bowler == "Select Bowler" ? (
        <button
          disabled
          className="cursor-not-allowed bg-red-700 px-2 py-1 font-semibold text-xl w-fit mx-auto rounded text-black"
        >
          select all details
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="bg-yellow-400 px-2 py-1 font-semibold text-xl w-fit mx-auto rounded text-black"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default CreateSuperOver;
