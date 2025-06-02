
import React, { useState, useEffect } from "react";
import OutViaCard from "../MatchBattingBowlinfCompleteStatsDetails/OutViaCard";

interface BattingStatInterface {
  methodOfDismissal?: string;
  batsmanName: string;
  bowlerName?: string;
  ballsFaced: number;
  fours: number;
  runs: number;
  sixes: number;
  isOut?: boolean;
  dismissedVia?: string;
  wicketTaker?: string;
}

interface BattingTeamStatsProps {
  battingStat: BattingStatInterface[]; // Dynamic length array
}

function SuperOverBatterStat({ battingStat }: BattingTeamStatsProps) {
  const [battedBatters, setBattedBatters] = useState<BattingStatInterface[]>(
    []
  );

  return (
    <div className="w-full    flex flex-col ">
      {battingStat &&
        battingStat.map((item, index) => (
          <div
            key={index}
            className="w-full border-b-[#282930] border-b-[.1px] py-[2px]  flex flex-col"
          >
            <div className="w-[100%] max-h-[20px] text-[#d3d3d3] font-normal   flex  items-center justify-center">
              <h1 className="w-[45%]   text-[#d3d3d3] font-bold text-sm  flex ">
                {" "}
                {item.batsmanName.split(" ")[0][0]}{" "}
                {item.batsmanName.split(" ")[1]  }
              </h1>{" "}
              <ul className="w-[55%] text-[10px]  flex justify-end items-center pr-2">
                <li className=" p-2 text-[15px]  w-[18%] center text-white">
                  {item.runs||0}
                </li>
                <li className=" p-2 text-[15px] w-[18%] center text-white">
                  {item.ballsFaced||0}
                </li>
                <li className=" p-2 text-[15px] w-[18%] center text-white">
                  {item.fours||0}
                </li>
                <li className=" p-2 text-[15px] w-[18%] center text-white">
                  {item.sixes||0}
                </li>
                <li className=" p-2 text-[15px] w-[28%] center text-white">
                  {((item.runs / item.ballsFaced) * 100).toFixed(2) == "NaN"
                    ? "0"
                    : ((item.runs / item.ballsFaced) * 100).toFixed(2)}
                </li>
              </ul>
            </div>
            <h1 className="w-full ">
              {item.isOut && (
                <OutViaCard
                  methodOfDismissal={item.methodOfDismissal}
                  dismissedVia={item.dismissedVia}
                  wicketTaker={item.wicketTaker}
                ></OutViaCard>
              )}{" "}
              {item.methodOfDismissal == "Retired Hurt" && (
                <OutViaCard
                  methodOfDismissal={item.methodOfDismissal}
                  dismissedVia={item.dismissedVia}
                  wicketTaker={item.wicketTaker}
                ></OutViaCard>
              )}{" "}
              {item.methodOfDismissal == "Not Out" && (
                <OutViaCard
                  methodOfDismissal={item.methodOfDismissal}
                  dismissedVia={item.dismissedVia}
                  wicketTaker={item.wicketTaker}
                ></OutViaCard>
              )}
            </h1>
          </div>
        ))}
    </div>
  );
}

export default SuperOverBatterStat;
