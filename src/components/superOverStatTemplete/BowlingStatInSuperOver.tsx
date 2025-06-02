import { useState } from "react";

interface BattingStatInterface {
  bowlerName: string;
  maidens: number;
  ballsBowled: number;
  runsConceded: number;
  wickets: [];
}

interface bowlingTeamStatsProps {
    bowlerName: string;
    overs:number;
    runs:number;
    wickets:number;
}

function BowlingStatInSuperOver({ bowlerName,overs,runs,wickets }: bowlingTeamStatsProps) {
  return (
    <div className="w-full    flex flex-col ">
  
          <div
            className="w-full border-b-[#282930] border-b-[.1px] py-[2px]  flex flex-col"
          >
            <div className="w-[100%] max-h-[20px] text-[#d3d3d3] font-normal   flex  items-center justify-center">
              <h1 className="w-[45%]   text-[#d3d3d3] font-normal  flex ">
                {" "}
                {bowlerName.split(" ")[0][0]}{" "}
                {bowlerName.split(" ")[1]}
              </h1>{" "}
              <ul className="w-[55%] text-[10px]  flex justify-end -center pr-2">
                <li className=" p-2 text-[15px] w-[18%] center text-white">
                {overs}
                </li>
                <li className=" p-2 text-[15px]  w-[18%] center text-white">
                  -
                </li>
                <li className=" p-2 text-[15px] w-[18%] center text-white">
                  {runs}
                </li>
                <li className=" p-2 text-[15px] w-[18%] center text-white">
                  {wickets}
                </li>
                {
  <li className=" p-2 text-[15px] w-[28%] center text-white">
                    {overs==6&& 1}
              {overs==0&& 0}
              {overs>0&&overs<6&& `0.${overs}`}
                </li>
                }
         
              </ul>
            </div>
   
          </div>
    </div>
  );
}

export default BowlingStatInSuperOver;
