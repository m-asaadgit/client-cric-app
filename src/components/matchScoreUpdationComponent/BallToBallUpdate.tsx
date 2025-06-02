import axios from "axios";
import { useEffect, useState } from "react";
import { BiSolidCricketBall } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import Divider from "../../utils/Divider";
import { IoCheckbox } from "react-icons/io5";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import DismissalType from "./DismissalType";

interface overNumberInterface {
  bowlerName: string;
}
interface BallToBallUpdateProps {
  firstInning: boolean;
  batter: string[];
  teamName: string;
  bowler: {
    overNumber: overNumberInterface;
  };
  feilderPlayers: string[];
  verifyIsAdmin: () => Promise<void>;
}

interface BallStat {
  firstInning: boolean;
  batterName: string;
  bowlerName: string;
  runs: number | null;
  dot: boolean;
  single: boolean;
  double: boolean;
  triple: boolean;
  four: boolean;
  six: boolean;
  wide: boolean;
  extra: boolean;
  bye: boolean;
  no_ball: boolean;
  nonextraRuns: number | null;
  caption: string;
  wicket: boolean;
  dismissalType: string;
  dismissedVia: string;
}

function BallToBallForm({
  firstInning,
  batter,
  bowler,
  feilderPlayers,
  teamName,
  verifyIsAdmin,
}: BallToBallUpdateProps) {
  const { matchId } = useParams();
  console.log(matchId && matchId);
  const [dropFordismissalType, setDropFordismissalType] =
    useState<boolean>(false);
  const [ballToBallURL, setBallToBallURL] =
    useState<string>("http://localhost:3000/api/unlisted-match/ball-to-ball-update-first-inning/");
  const [showDismissalVia, setShowDismissalVia] = useState<boolean>(false);
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const [dropForBatter, setDropForBatter] = useState<boolean>(false);
  const [dropForDismissedVia, setDropForDismissedVia] =
    useState<boolean>(false);
  const [dismissalType, setDismissalType] = useState<string[]>([
    "Caught",
    "Sub Caught",
    "Caught Behind",
    "Bowled",
    "Retired Hurt",
    "Run Out",
    "Stump Out",
    "LBW",
    "Not Out",
  ]);

  const [formData, setFormData] = useState<BallStat>({
    firstInning: false,
    batterName: "Select Stricker",
    bowlerName: "bowler",
    runs: null,
    dot: false,
    single: false,
    double: false,
    triple: false,
    four: false,
    six: false,
    wide: false,
    extra: false,
    bye: false,
    no_ball: false,
    nonextraRuns: null,
    caption: "",
    wicket: false,
    dismissalType: "",
    dismissedVia: "",
  });

  useEffect(() => {
    batter &&
      bowler &&
      setFormData((prev) => ({
        ...prev,
        firstInning: firstInning,
        bowlerName: bowler.overNumber.bowlerName,
      }));
      if(!firstInning){

      setBallToBallURL("http://localhost:3000/api/unlisted-match/ball-to-ball-update-second-inning/");
      }
      else{
        setBallToBallURL("http://localhost:3000/api/unlisted-match//ball-to-ball-update-first-inning/");

      }
    console.log(firstInning);
  }, [firstInning]);
  const handleChange = (e: any) => {
    const { name, type, value, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
    console.log(formData, "handle change");
  };
  const handleChangeForNonExtraRunsRatioButtion = (
    name: string,
    value: number
  ) => {
    // const { name, value } = e.target;
    // console.log(e.target)
    console.log("jio");
    // console.log(value)
    // reset all scoring booleans to false first, then activate the selected one
    setFormData((prev) => ({
      ...prev,
      nonextraRuns: formData.bye==true?0:value, // convert string to number
      dot: false,
      single: false,
      double: false,
      triple: false,
      four: false,
      six: false,

      [name]: true, // dynamically activate the selected one
    }));
    console.log(formData, name);
  };
  const handleChangeForExtraRunsRatioButtion = (name: any) => {
    // reset all scoring booleans to false first, then activate the selected one
    setFormData((prev) => ({
      ...prev,
      wide: false,
      bye: false,
      extra: name=="bye"?false:true,
      no_ball: false,
      [name]: true, // dynamically activate the selected one
    }));
    console.log(formData, name);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
console.log(ballToBallURL)
    if (!formData.batterName || !formData.bowlerName) {
      alert("nope");

      return;
    }
    if (formData.wicket && formData.nonextraRuns == null) {
      return;
    }

    if (!formData.wicket && formData.nonextraRuns == null) {
      alert("nope 4");
      return;
    }
    if (formData.wicket) {
      // alert(" asaad");
      if (formData.dismissalType == "Select dismissal type") {
        alert("nope 2");
        return;
      }
      console.log(formData.dismissedVia && formData.dismissedVia);
      if (
        formData.dismissalType == "Caught" ||
        formData.dismissalType == "Caught Behind" ||
        formData.dismissalType == "Run Out" ||
        formData.dismissalType == "Stump Out"
      )
        if (formData.dismissedVia == "Select dismissal via") {
          alert("nope 3");
          return;
        }
    }
    console.log(formData);

    try {
      const res = await axios.put(
        `${ballToBallURL}${matchId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Replace with your actual token
          },
        }
      );
      console.log(formData);
      // alert('Event submitted successfully!');
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
    verifyIsAdmin();
  };



  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      dismissalType: "Not Out",
      dismissedVia: "",
    }));
  }, [formData.wicket]);

  useEffect(() => {
    if (
      formData.dismissalType == "Caught" ||
      formData.dismissalType == "Caught Behind" ||
      formData.dismissalType == "Run Out" ||
      formData.dismissalType == "Stump Out"
    ) {
      setShowDismissalVia(true);
    } else if (
      formData.dismissalType == "LBW" ||
      formData.dismissalType == "Sub Caught" ||
      formData.dismissalType == "Bowled"
    ) {
      setDropForDismissedVia(false);
      setFormData((prev) => ({
        ...prev,
        dismissedVia: formData.bowlerName,
      }));
    } else {
      setDropForDismissedVia(false);
      setFormData((prev) => ({
        ...prev,
        dismissedVia: "",
      }));
    }
  }, [formData.dismissalType]);
  useEffect(() => {
    let totalExtraRuns = 0;

    if (formData.wide) totalExtraRuns += 1;
    if (formData.no_ball) totalExtraRuns += 1;

    setFormData((prev) => ({
      ...prev,
      runs:
        prev.nonextraRuns !== null
          ? prev.nonextraRuns + totalExtraRuns
          : totalExtraRuns > 0
          ? totalExtraRuns
          : null,
    }));
  }, [formData.wide, formData.bye, formData.no_ball, formData.nonextraRuns]);

  return (
    <div className="card shadow-black flex flex-col items-center shadow-2xl text-white p-6 rounded-lg w-[95%] mx-auto min-h-[100vh] ">
      <h2 className="text-2xl w-full text-center font-bold text-white mb-6">
        {teamName && teamName} score updater form
      </h2>

      {/* Text Inputs */}
      <div className="w-[90%] mx-auto flex  flex-wrap gap-4">
        {/* <input
          type="text"
          name="batterName"
          placeholder="Batter Name"
          value={formData.batterName}
          onChange={handleChange}
          className="p-2 rounded  text-white bg-black "
        />
        <div className="p-2 rounded  text-white bg-black">efe</div> */}
        <div className="p-2  flex flex-col justify-between rounded w-full text-white bg-black">
          <button
            onClick={() => {
              setDropForBatter((prev) => !prev);
            }}
            className="w-full flex justify-between px-2"
          >
            {formData.batterName && formData.batterName}
            <IoMdArrowDropdown></IoMdArrowDropdown>
          </button>
          {dropForBatter && (
            <div className="w-full px-2">
              {batter?.map((item: any, index: number) => (
                <button
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      batterName: item.playerName,
                    }));
                    setDropForBatter(false);
                  }}
                  className="border-b-[1.3px] border-white w-full text-start pt-[1.2px] bg-black active:bg-[#07080d]"
                  key={index}
                >
                  {item.playerName}
                </button>
              ))}
            </div>
          )}
        </div>{" "}
        <div className="p-2 px-4 flex justify-between rounded w-full text-white bg-black">
          {formData.bowlerName && formData.bowlerName}
          <BiSolidCricketBall></BiSolidCricketBall>
        </div>
        <button
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              wicket: !prev.wicket,
            }));
          }}
          className="flex w-full py-1 px-4 gap-2 items-center mt-2 bg-black rounded-sm shadow-"
        >
          Out{" "}
          {formData.wicket ? (
            <IoCheckbox></IoCheckbox>
          ) : (
            <RiCheckboxBlankFill></RiCheckboxBlankFill>
          )}
        </button>
        <div className="p-2  flex flex-col justify-between rounded w-full text-white bg-black">
          <button
            onClick={() => {
              setDropFordismissalType((prev) => !prev);
            }}
            className="w-full flex justify-between px-2"
          >
            {formData.dismissalType && formData.dismissalType != "Not Out"
              ? formData.dismissalType
              : "Select Dismissal Type"}
            <IoMdArrowDropdown></IoMdArrowDropdown>
          </button>
          {dropFordismissalType && (
            <div className="w-full px-2">
              {dismissalType?.map((item: any, index: number) => (
                <button
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      dismissalType: item,
                    }));
                    setDropFordismissalType(false);
                  }}
                  className="border-b-[1.3px] border-white w-full text-start pt-[1.2px] bg-black active:bg-[#07080d]"
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>{" "}
        {showDismissalVia && (
          <div className="p-2  flex flex-col justify-between rounded w-full text-white bg-black">
            <button
              onClick={() => {
                setDropForDismissedVia((prev) => !prev);
              }}
              className="w-full flex justify-between px-2"
            >
              {formData.dismissedVia
                ? formData.dismissedVia
                : "Select dismissed via"}
              <IoMdArrowDropdown></IoMdArrowDropdown>
            </button>
            {dropForDismissedVia && (
              <div className="w-full px-2">
                {feilderPlayers?.map((item: any, index: number) => (
                  <button
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        dismissedVia: item.playerName,
                      }));
                      setDropForDismissedVia(false);
                    }}
                    className="border-b-[1.3px] border-white w-full text-start pt-[1.2px] bg-black active:bg-[#07080d]"
                    key={index}
                  >
                    {item.playerName}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        <input
          type="text"
          name="caption"
          placeholder="Caption (optional)"
          value={formData.caption}
          onChange={handleChange}
          className="py-2 px-4 w-full rounded text-white bg-black border-none outline-none focus:outline-none focus:ring-0"
        />
        <div className="w-full flex flex-col gap-3">
          <h1 className="py-2 px-4 rounded w-full flex tracking-wide text-white bg-black">
            Totalruns-{formData.runs == null ? "0" : formData.runs}
          </h1>
          {/* <input
          type="number"
          name="nonextraRuns"
          placeholder="Non Extra Runs"
          value={formData.nonextraRuns??formData.nonextraRuns}
          onChange={handleChange}
        /> */}
          <h1 className="py-2 px-4 rounded w-full flex tracking-wide text-white bg-black">
            Non-extra runs-
            {formData.nonextraRuns == null ? "0" : formData.nonextraRuns}
          </h1>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="w-[90%] pt-4 mx-auto">
        <Divider></Divider>
        {/* Runs Group */}
        <legend className="font-bold text-xl my-2 font-montserrat px-2">
          Runs
        </legend>
        <fieldset className="flex  w-full gap-[4%] flex-wrap    ">
          {[
            { label: "dot", value: 0 },
            { label: "single", value: 1 },
            { label: "double", value: 2 },
            { label: "triple", value: 3 },
            { label: "four", value: 4 },
            { label: "six", value: 6 },
          ].map(({ label, value }) => (
            <label
              key={label}
              onClick={() =>
                handleChangeForNonExtraRunsRatioButtion(label, value)
              }
              className={`flex   px-2 mb-3 shadow-md shadow-black  rounded-sm font-roboto w-[48%] gap-2 capitalize py-1 items-center ${
                formData.nonextraRuns == value
                  ? "text-[#1d4ed8] bg-[#090909] font-bold scale-y-115"
                  : "bg-black"
              } `}
            >
              <button className="w-full text-center capitalize  tracking-wide ">
                {label}
              </button>
            </label>
          ))}
        </fieldset>{" "}
        {/* Extras Group */}
        <legend className="font-bold text-xl my-2 font-montserrat px-2">
          Extra Runs
        </legend>
        <fieldset className="flex  w-full gap-[4%] flex-wrap    ">
          {[
            { item: "wide", label: "wide" },
            { item: "bye", label: "bye" },
            { item: "no ball", label: "no_ball" },
          ].map(({ label, item }) => (
            <label
              key={label}
              onClick={() => handleChangeForExtraRunsRatioButtion(label)}
              className={`flex px-2 mb-3 shadow-md shadow-black rounded-sm font-roboto w-[48%] gap-2 capitalize py-1 items-center ${
                formData[label as keyof BallStat] === true
                  ? "text-[#1d4ed8] bg-[#090909] font-bold scale-y-115"
                  : "bg-black"
              }`}
            >
              <button className="w-full text-center capitalize  tracking-wide ">
                {item}
              </button>
            </label>
          ))}
        </fieldset>{" "}
        {/* Wicket (Independent) */}
      </div>

      <button
        onClick={(e) => {
          handleSubmit(e);
        }}
        className="mt-6 w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded transition"
      >
        Submit Event
      </button>
    </div>
  );
}

export default BallToBallForm;
