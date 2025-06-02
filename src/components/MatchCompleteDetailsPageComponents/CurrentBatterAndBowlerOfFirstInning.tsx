import { Key } from "react";
import RunsNeeded from "./RunsNeeded";
import MatchScore from "../MatchScore";

interface aTeamBatterStatsInterface {
  aTeambattingStats: aTeambattingStatsInterface[];
  totalRuns: number;
  ballsFaced: number;
  ballsYetToFace: number;
}
interface aTeambattingStatsInterface {
  playerName: string;
  ballsFaced: number;
  runs: number;
  isOut: boolean;
  methodOfDismissal: string;
}
interface ballsInterface {
  batsmanName: string;
  extras: boolean;
}
interface aTeamInningInterface {
  overNumber: {
    bowlerName: string;
  };
  overCompleted: "pending" | "ongoing" | "completed";
  balls: ballsInterface[];
}
interface bTeamBowlingStatsInterface {
  [x: string]: any;
  playerName: string;
  oversBowled: number;
  ballsBowled: number;
  runsConceded: number;
  wickets?: Array<{
    batterName: string;
  }>;
}

interface bTeamBowlerStatsInterface {
  bTeamBowlingStats: bTeamBowlingStatsInterface;
}

interface data {
  aTeamBatterStats: aTeamBatterStatsInterface;
  aTeamInning: aTeamInningInterface[];
  bTeamInning: aTeamInningInterface[];
  bTeamBowlerStats: bTeamBowlerStatsInterface;
  teamAName: string;
  teamBName: string;
  overs: number;
  firstInningEnded: boolean;
  resultMessege?: string;
}
interface Data {
  data: data;
}

function CurrentBatterAndBowlerOfFirstInning({ data }: Data) {
  data && console.log(data);
  console.log(data?.aTeamInning[0].balls);
  const helper = Math.floor(data?.aTeamBatterStats.ballsFaced / 6);
  const helperForBowlerName2 =
    data?.aTeamInning.filter((item) => item.overNumber.bowlerName != undefined)
      .length - 1;
  console.log(helperForBowlerName2 && helperForBowlerName2);
  // var helperForBowlerName =
  //   Math.floor((data?.aTeamBatterStats.ballsFaced) / 6) <= 0
  //     ? 0
  //     : Math.floor((data?.aTeamBatterStats.ballsFaced ) / 6);
  // console.log(helperForBowlerName);
  // if(data?.aTeamBatterStats.ballsFaced % 6 === 0){
  //   helperForBowlerName-=1
  // } // false

  const dataToGetBallsOfPendingOver =
    data?.aTeamBatterStats.ballsFaced - helper * 6;

  // console.log(dataToGetBallsOfPendingOver)
  // console.log(data?.aTeamInning.length )
  const currentBowlersStats = data?.bTeamBowlerStats.bTeamBowlingStats.filter(
    (item: { playerName: string }) =>
      item.playerName ==
      data?.aTeamInning[helperForBowlerName2]?.overNumber?.bowlerName
  );
  const previosBowlersStats = data?.bTeamBowlerStats.bTeamBowlingStats.filter(
    (item: { playerName: string }) =>
      item.playerName ==
      data?.aTeamInning[
        data?.aTeamInning.filter((item) => item.overCompleted == "completed")
          .length - 1
      ]?.overNumber?.bowlerName
  );

  currentBowlersStats && console.log(currentBowlersStats);

  return (
    <div className="w-[90%] mx-auto py-2 px-1 flex flex-col justify-between h-fit ">
   
      {!data?.firstInningEnded ? (
        <div className="w-full flex justify-between h-fit">
          <div className="w-[49%] flex flex-col  ">
            {data?.aTeamBatterStats?.aTeambattingStats
              ?.filter(
                (item: { methodOfDismissal: string }) =>
                  item.methodOfDismissal == "Not Out"
              )
              .map(
                (
                  item: {
                    playerName: string;
                    ballsFaced: number;
                    runs: number;
                  },
                  index: Key
                ) => (
                  <div key={index} className=" text-sm w-full ">
                    {`${item.playerName.split(" ")[0][0]} ${
                      item.playerName.split(" ")[1]
                    }`}{" "}
                    : {item.runs} ({item.ballsFaced})
                  </div>
                )
              )}
          </div>
          <div className="w-[49%]  text-end  ">
            {data?.aTeamInning[helperForBowlerName2].overNumber.bowlerName ? (
              <h1>
                {
                  data?.aTeamInning[
                    helperForBowlerName2
                  ].overNumber.bowlerName.split(" ")[0][0]
                }{" "}
                {
                  data?.aTeamInning[
                    helperForBowlerName2
                  ].overNumber.bowlerName.split(" ")[1]
                }{" "}
                {currentBowlersStats.length > 0 &&
                  currentBowlersStats[0].wickets.length}
                -
                {currentBowlersStats.length > 0 &&
                  currentBowlersStats[0].runsConceded}{" "}
                {currentBowlersStats.length > 0 &&
                  currentBowlersStats[0].oversBowled}
                {dataToGetBallsOfPendingOver && dataToGetBallsOfPendingOver > 5
                  ? ""
                  : `.${dataToGetBallsOfPendingOver}`}
              </h1>
            ) : (
              <h1>
                {
                  data?.aTeamInning[
                    data?.aTeamInning.filter(
                      (item) => item.overCompleted == "completed"
                    ).length - 1
                  ].overNumber.bowlerName.split(" ")[0][0]
                }{" "}
                {
                  data?.aTeamInning[
                    data?.aTeamInning.filter(
                      (item) => item.overCompleted == "completed"
                    ).length - 1
                  ].overNumber.bowlerName.split(" ")[1]
                }{" "}
                {previosBowlersStats.length > 0 &&
                  previosBowlersStats[0].wickets.length}
                -
                {previosBowlersStats.length > 0 &&
                  previosBowlersStats[0].runsConceded}{" "}
                {previosBowlersStats.length > 0 &&
                  previosBowlersStats[0].oversBowled}
                {dataToGetBallsOfPendingOver && dataToGetBallsOfPendingOver > 5
                  ? ""
                  : `.${dataToGetBallsOfPendingOver}`}
              </h1>
            )}
          </div>
        </div>
      ) : (
        <h1 className="w-[90%] mx-auto text-center">{data.resultMessege}</h1>
      )}
    </div>
  );
}

export default CurrentBatterAndBowlerOfFirstInning;
