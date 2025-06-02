import { useState } from "react";
import axios from "axios";
import { MdArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";
import { useParams } from "react-router-dom";

interface OpenersUpdateProps {
  firstInningOfNormalInning: boolean;
  batter: string[];
  verifyIsAdmin: () => Promise<void>;

  bowler: string[];
}

const OpenersUpdate = ({
  firstInningOfNormalInning,
  batter,
  bowler,
  verifyIsAdmin
}: OpenersUpdateProps) => {
  const [formData, setFormData] = useState({
    batter1Name: "Select 1st batter",
    batter2Name: "Select 2nd batter",
    bowlerName: "Select Bowler",
    firstInning: firstInningOfNormalInning && firstInningOfNormalInning,
  });
  const { matchId } = useParams();

  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");

  const [message, setMessage] = useState<string>("");
  const [dropForBatter1, setdropForBatter1] = useState<boolean>(false);
  const [dropForBatter2, setDropForBatter2] = useState<boolean>(false);
  const [dropForBowler, setDropForBowler] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/unlisted-match/add-openers/${matchId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Openers added successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to add openers.");
    }
    verifyIsAdmin()
  };
  

  return (
    <div
      //   onSubmit={handleSubmit}
      className="w-full mx-auto py-4  flex flex-col items-center text-white rounded-xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold font-ubuntu text-center">
        Enter Opening Bowler and Batters
      </h2>
      <div className="w-[90%] mx-auto flex items-center justify-between px-2  h-fit">
        <div className="w-[30%] relative ">
          <button
            onClick={() => setdropForBatter1((prev) => !prev)}
            className="w-full  p-2 flex items-center justify-between  bg-black font-medium text-white focus:outline-none focus:ring-none"
          >
            {formData.batter1Name}
            {!dropForBatter1 ? (
              <MdOutlineArrowDropDown></MdOutlineArrowDropDown>
            ) : (
              <MdArrowDropUp></MdArrowDropUp>
            )}
          </button>
          {dropForBatter1 && (
            <div className="w-full absolute top-[100%]  ">
              {batter
                ?.filter((item: any) => {
                  if (batter.length > 2) {
                    return (
                      item.playerName !== formData.batter1Name &&
                      item.playerName !== formData.batter2Name
                    );
                  }
                  return item.playerName !== formData.batter1Name; // Keep all items if condition not met
                })
                .map((item: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        batter1Name: item.playerName,
                      }));
                      setdropForBatter1(false);
                    }}
                    className="bg-[#060606] w-full text-start active:bg-[#07080d] border-b-white py-1 px-2 border-b-[1.3px]"
                  >
                    {item.playerName}
                  </button>
                ))}
            </div>
          )}
        </div>{" "}
        <div className="w-[30%] relative ">
          <button
            onClick={() => setDropForBatter2((prev) => !prev)}
            className="w-full  p-2 flex items-center justify-between  bg-black font-medium text-white focus:outline-none focus:ring-none"
          >
            {formData.batter2Name}
            {!dropForBatter2 ? (
              <MdOutlineArrowDropDown></MdOutlineArrowDropDown>
            ) : (
              <MdArrowDropUp></MdArrowDropUp>
            )}
          </button>
          {dropForBatter2 && (
            <div className="w-full absolute top-[100%]  ">
              {batter
                ?.filter((item: any) => {
                  if (batter.length > 2) {
                    return (
                      item.playerName !== formData.batter1Name &&
                      item.playerName !== formData.batter2Name
                    );
                  }
                  return item.playerName !== formData.batter2Name; // Keep all items if condition not met
                })
                .map((item: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        batter2Name: item.playerName,
                      }));
                      setDropForBatter2(false);
                    }}
                    className="bg-[#060606] w-full text-start active:bg-[#07080d] border-b-white py-1 px-2 border-b-[1.3px]"
                  >
                    {item.playerName}
                  </button>
                ))}
            </div>
          )}
        </div>{" "}
        <div className="w-[30%] relative ">
          <button
            onClick={() => setDropForBowler((prev) => !prev)}
            className="w-full  p-2 flex items-center justify-between  bg-black font-medium text-white focus:outline-none focus:ring-none"
          >
            {formData.bowlerName}
            {!dropForBowler ? (
              <MdOutlineArrowDropDown></MdOutlineArrowDropDown>
            ) : (
              <MdArrowDropUp></MdArrowDropUp>
            )}
          </button>
          {dropForBowler && (
            <div className="w-full absolute top-[100%]  ">
              {bowler
                ?.filter((item: any) => item.isTwelfthMan != true)
                .map((item: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        bowlerName: item.playerName,
                      }));
                      setDropForBowler(false);
                    }}
                    className="bg-[#060606] w-full text-start active:bg-[#07080d] border-b-white py-1 px-2 border-b-[1.3px]"
                  >
                    {item.playerName}
                  </button>
                ))}
            </div>
          )}
        </div>{" "}
      </div>

      {/* <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="firstInning"
          checked={formData.firstInning}
          onChange={handleChange}
          className="accent-yellow-400 w-4 h-4"
        />
        <label>First Inning?</label>
      </div> */}
      {formData.batter1Name == "Select 1st batter" ||
      formData.batter2Name == "Select 2nd batter" ||
      formData.bowlerName == "Select Bowler" ? (
        <div   className="w-full md:w-[200px] text-center  bg-red-600 text-black font-semibold py-2 rounded ">
          
          Select all DropDowns
        </div>
      ) : (
        <button
        onClick={handleSubmit}
        className="w-full md:w-[200px] bg-yellow-400 text-black font-semibold text-center py-2 rounded hover:bg-yellow-300 transition"
      >
        Submit
      </button>
      
      )}
      {/*  */}
{}
      {message && <p className="text-center text-sm mt-2">{message}</p>}
    </div>
  );
};

export default OpenersUpdate;
