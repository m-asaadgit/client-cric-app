import axios from "axios";
import React, { useState } from "react";
import { MdArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";
import { useParams } from "react-router-dom";
interface AddNewBatterProps {
  firstInningOfNormalInning: boolean;
  batterList: string[];
  url: string;
  verifyIsAdmin: () => Promise<void>;

}
const AddNewBatter = ({
  firstInningOfNormalInning,
  batterList,
  verifyIsAdmin,
  url
}: AddNewBatterProps) => {
  const { matchId } = useParams();
  const [formData, setFormData] = useState({
    batterName: "Select Batter",
    firstInnning: firstInningOfNormalInning, // hardcoded to always be true
  });
  const [success, setSuccess] = useState<boolean>(false);
  const [dropForNewBatter, setDropForNewBatter] = useState<boolean>(false);
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const [messege, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    setMessage("")
    if (token) {
      try {
        const response = await axios.put(
          `${url}${matchId}`,
          {
            batterName: formData.batterName,
            firstInnning: formData.firstInnning
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response)
        setMessage(response.data.message);
        setSuccess(response.data.success);
      } catch (error: any) {
        setMessage(error?.response?.data?.message || "An error occurred");
        console.log(error)
      }
    }
    verifyIsAdmin()
  };
  

  return (
    <div className="card shadow-black flex flex-col items-center shadow-2xl p-6 rounded-lg w-[40%] mx-auto mt-10 ">
      <h2 className="text-xl font-semibold text-white mb-4">
        Add Batter Info
      </h2>

      <div className="mb-4 w-[90%] mx-auto">
        <button
          onClick={() => setDropForNewBatter((prev) => !prev)}
          className="w-full px-4 py-2  bg-black flex gap-2 items-center justify-between text-white  "
        >
          {formData.batterName}
          {!dropForNewBatter ? (
            <MdOutlineArrowDropDown></MdOutlineArrowDropDown>
          ) : (
            <MdArrowDropUp></MdArrowDropUp>
          )}
        </button>
        {dropForNewBatter && (
          <div className="w-full  bg-black border-b-white border-b-[1.3px]">
            {batterList
              ?.filter(
                (item: any) =>
                  item.playerName != formData.batterName &&
                  item.methodOfDismissal == "Yet To Bat"
              )
              .map((item: any, index: number) => (
                <button
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      batterName: item.playerName,
                    }));
                    setDropForNewBatter(false);
                  }}
                  className="px-2 w-full flex items-start active:bg-[#07080d] border-b-white border-b-[1.3px] py-1 "
                  key={index}
                >
                  {item.playerName}
                </button>
              ))}
          </div>
        )}
      </div>
      {formData.batterName == "Select Batter" ? (
        <button className="w-fit  bg-red-600 text-black font-semibold py-2 rounded px-2 ">
          Select next batter
        </button>
      ) : (
        <button onClick={()=>handleSubmit()} className="w-fit  bg-yellow-400 text-black font-semibold py-2 rounded px-2 hover:bg-yellow-300 transition">
          Submit
        </button>
      )}
  <h1 className={ ` text-center ${success?"text-green-700":"text-red-900"}`}  >
          {messege&& messege}
        </h1>    </div>
  );
};

export default AddNewBatter;
