import React from "react";
import RunsNeeded from "./MatchCompleteDetailsPageComponents/RunsNeeded";
interface Batter {
  isOut: boolean;
}

//   interface SuperOverStat {
//     runs: number;
//     batters: Batter[];
//     balls: EachBalls[]; // Since 'balls' exists in your output
//   }

interface BatterStats {
  aTeambattingStats: Batter[];
  bTeambattingStats: Batter[];
  totalRuns: number; // Optional as per your output
  ballsFaced: number;
  ballsYetToFace: number;
}
//   interface overNumberInterface {
//     bowlerName: string;
//     overNumber: number;
//   }

interface OverDetails {
  // overNumber: overNumberInterface;
  overCompleted: string;
  balls: EachBalls[];
  _id: string;
}
interface EachBalls {
  // ballNumber: number;
  // batsmanName: string;
  // runs: number;
  // dot: boolean;
  // single: boolean;
  // double: boolean;
  // triple: boolean;
  // four: boolean;
  // six: boolean;
  extras: boolean;
  // caption: string;
  // isWicket: boolean;
  // dismissalType: string;
  // dismissedVia: string | null;
  // _id: string;
}

interface MatchData {
  _id: string;
  overs: number;
  status: string;
  teamAName: string;
  firstInningEnded: boolean;
  teamBName: string;
  aTeamBatterStats: BatterStats;
  bTeamBatterStats: BatterStats;
  firstInningStarted: boolean;
  secondInningStarted: boolean;
  secondInningEnded: boolean;
  playersAside: number;
  aTeamInning: OverDetails[];
  bTeamInning: OverDetails[];
}
interface MatchScoreProps {
  match: MatchData;
}

const MatchScore: React.FC<MatchScoreProps> = ({ match }) => {
  return (
    <div className="w-[90%] mx-auto h-fit flex gap-[2%] items-center">
      <div className="w-[49%]  h-full capitalize text-sm center text-center flex gap-2 rounded-sm font-medium">
        <div className="flex ">
          <h1>{match.aTeamBatterStats.totalRuns ?? 0}</h1>{" "}
          {match.aTeamBatterStats.aTeambattingStats?.filter(
            (batter) => batter.isOut
          ).length ==
          match.playersAside - 1 ? (
            ""
          ) : (
            <h1>
              /
              {
                match.aTeamBatterStats.aTeambattingStats?.filter(
                  (batter) => batter.isOut
                ).length
              }{" "}
            </h1>
          )}
        </div>
        {/* {match.aTeamInning.filter((over) => over.overCompleted === "completed")
          .length > 0 ? (
          <h1 className="font-thin">
            (
            <span>
              {
                match.aTeamInning.filter(
                  (over) => over.overCompleted === "completed"
                ).length
              }
            </span>
            {match.aTeamInning.filter(
              (over) => over.overCompleted === "completed"
            ).length === match.overs ? (
              ""
            ) : (
              <span>
                .
                {match.aTeamInning[
                  match.aTeamInning.filter(
                    (over) => over.overCompleted === "completed"
                  ).length - 1
                ]?.balls.filter((ball) => !ball.extras).length || 0}
              </span>
            )}
            /{match.overs})
          </h1>
        ) : (
          <h1 className="font-thin">
            (
            <span>
              {
                match.aTeamInning.filter(
                  (over) => over.overCompleted === "completed"
                ).length
              }
            </span>
            /{match.overs})
          </h1>
        )}{" "}
        {match.status != "Completed" && !match.firstInningEnded && (
          <h1>
            CRR:{" "}
            {(
              (match.aTeamBatterStats.totalRuns /
                match.aTeamBatterStats.ballsFaced) *
                6 || 0
            ).toFixed(2)}
          </h1>
        )} */}
        {match && (
          <h1 className="font-thin ">
            (
            <span>
              {
                match.aTeamInning.filter(
                  (over) => over.overCompleted === "completed"
                ).length
              }
              {match.aTeamInning.filter(
                (over) => over.overCompleted === "ongoing"
              ).length > 0
                ? "."
                : ""}
              {match.aTeamInning.filter(
                (over) => over.overCompleted === "ongoing"
              ).length > 0 &&
                match.aTeamInning
                  .filter((over) => over.overCompleted === "ongoing")[0]
                  .balls.filter((item) => item.extras == false).length}
            </span>
            /{match.overs})
          </h1>
        )}
      </div>
      {match.secondInningStarted ? (
        <div className="w-[49%] h-full capitalize text-sm center text-center flex gap-2 rounded-sm font-medium">
          <h1>
            {match.bTeamBatterStats.totalRuns ?? 0}/
            {match.bTeamBatterStats.bTeambattingStats?.filter(
              (batter) => batter.isOut
            ).length || 0}
          </h1>
          {/* {match.bTeamInning.filter((over) => over.overCompleted === "completed")
        .length > 0 ? (
        <h1 className="font-thin">
          (
          <span>
            {
              match.bTeamInning.filter(
                (over) => over.overCompleted === "completed"
              ).length
            }
          </span>
          {match.bTeamInning.filter(
            (over) => over.overCompleted === "completed"
          ).length === match.overs ? (
            ""
          ) : (
            <span>
              .
              {match.bTeamInning[
                match.bTeamInning.filter(
                  (over) => over.overCompleted === "completed"
                ).length - 1
              ]?.balls.filter((ball) => !ball.extras).length || 0}
            </span>
          )}
          /{match.overs})
        </h1>
      ) : (
        <h1 className="font-thin">
          (
          <span>
            {
              match.bTeamInning.filter(
                (over) => over.overCompleted === "completed"
              ).length
            }
          </span>
          /{match.overs})
        </h1>
      )} */}
          {match && (
            <h1 className="font-thin ">
              (
              <span>
                {
                  match.bTeamInning.filter(
                    (over) => over.overCompleted === "completed"
                  ).length
                }
                {match.bTeamInning.filter(
                  (over) => over.overCompleted === "ongoing"
                ).length > 0
                  ? "."
                  : ""}
                {match.bTeamInning.filter(
                  (over) => over.overCompleted === "ongoing"
                ).length > 0 &&
                  match.bTeamInning
                    .filter((over) => over.overCompleted === "ongoing")[0]
                    .balls.filter((item) => item.extras == false).length}
              </span>
              /{match.overs})
            </h1>
          )}
          {match.status != "Completed" && match.secondInningStarted && !match.secondInningEnded && (
            <h1>
              C RR:{" "}
              {(
                (match.bTeamBatterStats.totalRuns /
                  match.bTeamBatterStats.ballsFaced) *
                  6 || 0
              ).toFixed(2)}
            </h1>
          )}{" "}
          {match.status != "Completed" && match.firstInningEnded && !match.secondInningEnded&& (
            <h1>
              R RR:{" "}
              {(
                ((match.aTeamBatterStats.totalRuns + 1) /
                  match.bTeamBatterStats.ballsYetToFace) *
                  6 || 0
              ).toFixed(2)}
            </h1>
          )}
        </div>
      ) : (
        <div className="w-[49%] h-full capitalize text-sm center text-center flex gap-2 rounded-sm font-medium">
          Yet to bat
        </div>
      )}
    </div>
  );
};

export default MatchScore;
