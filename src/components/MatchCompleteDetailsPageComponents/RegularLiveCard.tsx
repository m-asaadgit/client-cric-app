import React from "react";

interface Over {
  overCompleted: string;
  balls: { extras: boolean }[];
}

interface TeambattingStatsInterface {
  isOut: boolean;
}
interface TeamBatterStatsInterface {
  totalRuns: number;
  ballsFaced: number;
  ballsYetToFace: number;
}
interface TeamInningInterface {
  overCompleted: string;
  balls: { extras: boolean }[];
}

interface RegularLiveCardProps {
  TeamBatterStats: TeamBatterStatsInterface;
  TeamInning: TeamInningInterface[];
  overs: number;
  TeambattingStats: TeambattingStatsInterface[];
  playerAside: number;
  showRRR: boolean;
  inning1Ended: boolean;
  target: number;
  teamA: boolean;
  inning2Ended: boolean;
}

const RegularLiveCard: React.FC<RegularLiveCardProps> = ({
  TeamBatterStats,
  TeambattingStats,
  TeamInning,
  overs,
  playerAside,
  showRRR,
  teamA,
  target,
  inning2Ended,
  inning1Ended,
}) => {
  console.log(TeambattingStats);
  return (
    <div className="capitalize text-sm w-[49%]  center text-center flex flex-col g rounded-sm font-medium">
   
      <div className="flex ">
        {TeamBatterStats.totalRuns ?? 0}
        {TeambattingStats?.filter((batter) => batter.isOut).length ==
        playerAside - 1 ? (
          ""
        ) : (
          <h1>/{TeambattingStats?.filter((batter) => batter.isOut).length} </h1>
        )}
        <h1 className="font-thin  ml-2 ">
          (
          <span>
            {
              TeamInning.filter((over) => over.overCompleted === "completed")
                .length
            }
            {TeamInning.filter((over) => over.overCompleted === "ongoing")
              .length > 0
              ? "."
              : ""}
            {TeamInning.filter((over) => over.overCompleted === "ongoing")
              .length > 0 &&
              TeamInning.filter(
                (over) => over.overCompleted === "ongoing"
              )[0].balls.filter((item) => item.extras == false).length}
          </span>
          /{overs})
        </h1>
      </div>
      
      <div className="flex gap-2">
        {!teamA ||
          (!inning1Ended && (
            <h1 className="text-[12px] font-thin">
              Cur RR :{" "}
              {(TeamBatterStats.totalRuns / TeamBatterStats.ballsFaced) * 6
                ? (TeamBatterStats.totalRuns / TeamBatterStats.ballsFaced) *
                    6 !=
                    Infinity ?
                  (
                    (TeamBatterStats.totalRuns / TeamBatterStats.ballsFaced) *
                    6
                  ).toFixed(2):("NA")
                : 0}
            </h1>
          ))}
        {showRRR && !inning2Ended && (
          <h1 className="text-[12px] font-thin">
            Req RR :{" "}
            {!isNaN(
              (target+1-TeamBatterStats.totalRuns / TeamBatterStats.ballsYetToFace) * 6
            ) && TeamBatterStats.ballsYetToFace > 0
              ? (
                  ((target+1-TeamBatterStats.totalRuns) / TeamBatterStats.ballsYetToFace) *
                  6
                ).toFixed(2)
              : 0}
          </h1>
        )}
        
      </div>
    </div>
  );
};

export default RegularLiveCard;
