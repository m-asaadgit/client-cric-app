import { useState } from "react";
import OutViaCard from "./OutViaCard";

interface BattingStatInterface {
  playerName: string;
  maidens: number;
  ballsBowled: number;
  runsConceded: number;
  wickets: [];
}

interface bowlingTeamStatsProps {
  bowlingStat: BattingStatInterface[]; // Dynamic length array
}

function BowlingTeamStats({ bowlingStat }: bowlingTeamStatsProps) {
  return (
    <div className="w-full    flex flex-col ">
      {bowlingStat &&
        bowlingStat.map((item, index) => (
          <div
            key={index}
            className="w-full border-b-[#282930] border-b-[.1px] py-[2px]  flex flex-col"
          >
            <div className="w-[100%] max-h-[20px] text-[#d3d3d3] font-normal   flex  items-center justify-center">
              <h1 className="w-[45%]   text-[#d3d3d3] font-normal  flex ">
                {" "}
                {item.playerName.split(" ")[0][0]}{" "}
                {item.playerName.split(" ")[1]}
              </h1>{" "}
              <ul className="w-[55%] text-[10px]  flex justify-end items-center pr-2">
                <li className=" p-2 text-[15px] w-[18%] center text-white">
                  {`${Math.floor(item.ballsBowled / 6)}.${
                    item.ballsBowled % 6
                  }`}
                </li>
                <li className=" p-2 text-[15px]  w-[18%] center text-white">
                  {item.maidens}
                </li>
                <li className=" p-2 text-[15px] w-[18%] center text-white">
                  {item.runsConceded}
                </li>
                <li className=" p-2 text-[15px] w-[18%] center text-white">
                  {item.wickets.length}
                </li>
                {
  <li className=" p-2 text-[15px] w-[28%] center text-white">
                  {((item.ballsBowled == 0&&item.runsConceded>0) ?
                    ">36": ((item.runsConceded / item.ballsBowled) * 6).toFixed(2))}
                </li>
                }
              
              </ul>
            </div>
   
          </div>
        ))}
    </div>
  );
}

export default BowlingTeamStats;
