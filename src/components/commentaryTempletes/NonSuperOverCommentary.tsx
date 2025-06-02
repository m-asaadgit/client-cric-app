interface Ball {
  ballNumber?: number;
  batsmanName?: string;
  runs?: number;
  dot?: boolean;
  single?: boolean;
  currentTotalRuns: number;
  currentTotalWickets: number;

  double?: boolean;
  triple?: boolean;
  four?: boolean;
  six?: boolean;
  extras?: boolean;
  wide?: boolean;
  byes?: boolean;
  noBall?: boolean;
  caption?: string;
  isWicket?: boolean;
  dismissalType?:
    | "Caught"
    | "Sub Caught"
    | "Caught Behind"
    | "Yet To Bat"
    | "Bowled"
    | "Retired Hurt"
    | "Run Out"
    | "Stump Out"
    | "Not Out"
    | "LBW";
  dismissedVia?: string;
}
interface over {
  overNumber?: {
    bowlerName?: string;
    overNumber?: number;
  };
  overCompleted?: "pending" | "ongoing" | "completed";
  balls?: Ball[];
}
interface NonSuperOverCommentaryProp {
  inningData: over[];
}
import { useEffect, useState } from "react";
import { RxDividerHorizontal } from "react-icons/rx";
import Divider from "../../utils/Divider";

function NonSuperOverCommentary({ inningData }: NonSuperOverCommentaryProp) {
  console.log(inningData && inningData);

  return (
    <div className="w-full flex flex-col gap-2 py-4">
      {inningData?.map((inningDataItem: any, inningDataIndex: number) => (
        <div className="py-2 rounded flex flex-col gap-1 bg-[#131314] px-2" key={inningDataIndex}>
          {inningDataItem.balls.map((ballsItem: any, ballsIndex: number) => (
            <div
              key={ballsIndex}
              className="w-full h-[8vh] relative bg-[#191a1e] rounded flex items-center  py-1 px-2"
            >
              <div
                className={`bg-[#373b49] w-[40px] rounded center  ${
                  ballsItem.isWicket && "bg-red-900"
                } ${ballsItem.four && "bg-blue-900"} ${
                  ballsItem.six && "bg-blue-900"
                } ${ballsItem.extra && "bg-blue-700"} `}
              >
                {ballsItem.isWicket && "W"}
                {!ballsItem.isWicket && ballsItem.runs}
                {/* { ballsItem.isWicket&& "W"}
                { ballsItem.isWicket&& "W"}
                { ballsItem.isWicket&& "W"}
                { ballsItem.isWicket&& "W"} */}
              </div>
              <RxDividerHorizontal className="mx-2"></RxDividerHorizontal>
              <h1 className="w-[20px]">
                {(() => {
                  const ballNum = ballsItem.ballNumber;
                  const over = Math.floor(ballNum / 6);
                  const ball = ballNum % 6;
                  const oversFormat = parseFloat(`${over}.${ball}`);

                  return oversFormat;
                })()}
              </h1>
              <div className="ml-4">
                <h1>
                  {inningDataItem.overNumber.bowlerName} to{" "}
                  {ballsItem.batsmanName}
                </h1>
              </div>
              <h1 className="absolute right-[10px] mt-2">
                {ballsItem.currentTotalRuns}/{ballsItem.currentTotalWickets}
              </h1>
            </div>
          ))}

           {inningDataIndex!=inningData.length-1&&   <Divider></Divider>}

        </div>
      ))}
    </div>
  );
}

export default NonSuperOverCommentary;
