import { useState } from "react";
import classNames from "classnames";
import Commentary from "./Commentary";
import ScorecardData from "./ScorecardData";

function ScorecardAndCommentary({ matchData }) {
  const [card, setCard] = useState("ScoreCard");
  const cards = ["ScoreCard", "Commentary"];
  console.log(card);
  return (
    <div className="w-full">
      {
        <div className="w-[90%] rounded-sm mx-auto   text-sm tracking-wider flex items-center font-semibold justify-between bg-[#0f0e0e]">
          {cards.map((item, index) => (
            <button
              key={index}
              className={classNames(
                "w-full font-normal capitalize center ", // Regular styles
                {
                  "border-b-2 bg-[#191919] border-b-white  ":
                    item === card,
                } // Conditional styles
              )}
              onClick={() => setCard(item)}
            >
              {item}
            </button>
          ))}
        </div>
      }
      {card == "Commentary" ? (
        <Commentary matchData={matchData}></Commentary>
      ) : (
        <ScorecardData matchData={matchData}></ScorecardData>
      )}
    </div>
  );
}

export default ScorecardAndCommentary;
