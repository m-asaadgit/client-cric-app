import { Key } from "react";
import RunsNeeded from "./RunsNeeded";

interface bTeamBatterStatsInterface {
  bTeambattingStats: bTeambattingStatsInterface[];
  ballsFaced: number;
  ballsYetToFace: number;
  totalRuns: number;
}
interface aTeamBatterStatsInterface {
  totalRuns: number;
}
interface bTeambattingStatsInterface {
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
interface bTeamInningInterface {
  overNumber: {
    bowlerName: string;
  };
  overCompleted: "pending" | "ongoing" | "completed";
  balls: ballsInterface[];
}

interface aTeamBowlingStatsInterface {
  [x: string]: any;
  playerName: string;
  oversBowled: number;
  ballsBowled: number;
  runsConceded: number;
  wickets?: Array<{
    batterName: string;
  }>;}

interface aTeamBowlerStatsInterface {
  aTeamBowlingStats: aTeamBowlingStatsInterface[];
}

interface data {
  bTeamBatterStats: bTeamBatterStatsInterface;
  aTeamBatterStats: aTeamBatterStatsInterface;
  bTeamInning: bTeamInningInterface[];
  aTeamBowlerStats: aTeamBowlerStatsInterface;
  teamAName: string;
  teamBName: string;
  overs: number;
  secondInningEnded: boolean;
  resultMessege?:string;
}
interface Data {
  data: data;
}

function CurrentBatterAndBowlerOfSecondInning({ data }: Data) {
  // console.log(data && data.aTeamBowlerStats.aTeamBowlingStats);
  // console.log(data &&data.bTeamInning[1].overNumber)
  // const [requireRunRate, setRequireRunRate] = useState<number>(0);
  // const [currentRunRate, setCurrentRunRate] = useState<number>(0);

  // const filtererBowlersStats = data?.aTeamBowlerStats.aTeamBowlingStats.filter(
  //   (item: { playerName: string }) =>
  //     item.playerName ==
  //     data?.bTeamInning[data?.bTeamInning.length - 1].overNumber.bowlerName
  // );

  // const dataToGetBallsOfPendingOver = data?.bTeamInning.filter(
  //   (item: { overNumber: { bowlerName: string }; overCompleted: string }) =>
  //     item.overNumber.bowlerName ==
  //       data?.bTeamInning[data?.bTeamInning.length - 1].overNumber.bowlerName &&
  //     item.overCompleted == "completed"
  // )[0].balls.length;

  data && console.log(data);
  console.log(data?.bTeamInning[0].balls);
  const helper = Math.floor(data?.bTeamBatterStats.ballsFaced / 6);
  const helperForBowlerName2 =
    data?.bTeamInning.filter((item) => item.overNumber.bowlerName != undefined)
      .length - 1;
  console.log(helperForBowlerName2 && helperForBowlerName2);
  // var helperForBowlerName =
  //   Math.floor((data?.bTeamBatterStats.ballsFaced) / 6) <= 0
  //     ? 0
  //     : Math.floor((data?.bTeamBatterStats.ballsFaced ) / 6);
  // console.log(helperForBowlerName);
  // if(data?.bTeamBatterStats.ballsFaced % 6 === 0){
  //   helperForBowlerName-=1
  // } // false

  const dataToGetBallsOfPendingOver =
    data?.bTeamBatterStats.ballsFaced - helper * 6;

  // console.log(dataToGetBallsOfPendingOver)
  // console.log(data?.bTeamInning.length )
  const currentBowlersStats = data?.aTeamBowlerStats.aTeamBowlingStats.filter(
    (item: { playerName: string }) =>
      item.playerName ==
      data?.bTeamInning[helperForBowlerName2]?.overNumber?.bowlerName
  );
  const previosBowlersStats = data?.aTeamBowlerStats.aTeamBowlingStats.filter(
    (item: { playerName: string }) =>
      item.playerName ==
      data?.bTeamInning[
        data?.bTeamInning.filter((item) => item.overCompleted == "completed")
          .length - 1
      ]?.overNumber?.bowlerName 
  );

  currentBowlersStats && console.log(currentBowlersStats);
console.log(data?.bTeamBatterStats.totalRuns)
  // data && setRequireRunRate((data.bTeamBatterStats.totalRuns-data.bTeamBatterStats.totalRuns)/data.bTeamBatterStats.ballsYetToFace*6);
  return (
    <div className="w-[90%]  mx-auto py-2 px-1 flex flex-col  justify-between h-fit ">
      
      {data && (
        <RunsNeeded
          runs={
            (data.aTeamBatterStats.totalRuns+1) - data.bTeamBatterStats.totalRuns
          }
          balls={data.bTeamBatterStats.ballsYetToFace}
          rr={
            ((data.aTeamBatterStats.totalRuns -
              data.bTeamBatterStats.totalRuns) /
              data.bTeamBatterStats.ballsYetToFace) *
            6
          }
          messege={data?.resultMessege}
        ></RunsNeeded>
      )}

      {/* <div className="w-full flex justify-between">
        <div className="w-[49%] flex flex-col  ">
          {data?.bTeamBatterStats?.bTeambattingStats
            ?.filter(
              (item: { methodOfDismissal: string }) =>
                item.methodOfDismissal == "Not out"
            )
            .map(
              (
                item: { playerName: string; ballsFaced: number; runs: number },
                index: Key
              ) => (
                <div key={index} className=" text-sm w-full ">
                  {item.playerName.split(" ")[0][0]}{" "}
                  {item.playerName.split(" ")[1]} : {item.runs} (
                  {item.ballsFaced})
                </div>
              )
            )}
        </div>
        <div className="w-[49%] text-end   ">
          {`${
            data?.bTeamInning[
              data?.bTeamInning.length - 1
            ].overNumber.bowlerName.split(" ")[0][0]
          } ${" "}${
            data?.bTeamInning[
              data?.bTeamInning.length - 1
            ].overNumber.bowlerName.split(" ")[1]
          }`}{" "}
          :{" "}
          {filtererBowlersStats.length > 0 &&
            filtererBowlersStats[0].wickets?.length}
          /{filtererBowlersStats && filtererBowlersStats[0].runsConceded} (
          {filtererBowlersStats && filtererBowlersStats[0].oversBowled})
          {dataToGetBallsOfPendingOver && dataToGetBallsOfPendingOver > 5
            ? ""
            : `.${dataToGetBallsOfPendingOver}`}
        </div>
      </div> */}
      
   {!data?.secondInningEnded && (
        <div className="w-full flex justify-between h-fit">
          <div className="w-[49%] flex flex-col  ">
            {data?.bTeamBatterStats?.bTeambattingStats
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
            {data?.bTeamInning[helperForBowlerName2].overNumber.bowlerName ? (
              <h1>
                {
                  data?.bTeamInning[
                    helperForBowlerName2
                  ].overNumber.bowlerName.split(" ")[0][0]
                }{" "}
                {
                  data?.bTeamInning[
                    helperForBowlerName2
                  ].overNumber.bowlerName.split(" ")[1]
                }{" "}
                {currentBowlersStats.length > 0 &&
                  currentBowlersStats[0].wickets?.length || 0}
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
                  data?.bTeamInning[
                    data?.bTeamInning.filter(
                      (item) => item.overCompleted == "completed"
                    ).length - 1
                  ].overNumber.bowlerName.split(" ")[0][0]
                }{" "}
                {
                  data?.bTeamInning[
                    data?.bTeamInning.filter(
                      (item) => item.overCompleted == "completed"
                    ).length - 1
                  ].overNumber.bowlerName.split(" ")[1]
                }{" "}
                {previosBowlersStats.length > 0 &&
                  previosBowlersStats[0].wickets?.length || 0}
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
      ) }
    </div>
  );
}

export default CurrentBatterAndBowlerOfSecondInning;
