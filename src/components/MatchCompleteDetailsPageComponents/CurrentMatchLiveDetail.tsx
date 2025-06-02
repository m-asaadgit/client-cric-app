import Divider from "../../utils/Divider";
import MatchSuperOverScore from "../MatchSuperOverScore";
import CurrentBatterAndBowlerOfFirstInning from "./CurrentBatterAndBowlerOfFirstInning";
import CurrentBatterAndBowlerOfFSecondInningSuperOver from "./CurrentBatterAndBowlerOfInningSuperOver";
import CurrentBatterAndBowlerOfSecondInning from "./CurrentBatterAndBowlerOfSecondInning";
import RunsNeeded from "./RunsNeeded";
import TeamNames from "./TeamNames";
import RegularLiveCard from "./RegularLiveCard";
import ScorecardAndCommentary from "./ScorecardAndCommentary";
import { useEffect, useState } from "react";
import CurrentOverData from "./CurrentOverData";

interface tossWinnerInterface {
  teamName: string;
  elected: "batFirst" | "bowlFirst";
}
interface TeamInningInterface {
  overNumber: {
    bowlerName: string;
    overNumber: string;
  };
  overCompleted: string;
  balls: ballsOrBatterStatsInterface[];
}
interface aTeamPlayersInterface {
  playerName: string;
  isOut: boolean;
  isTwelfthMan: boolean;
}
interface ballsOrBatterStatsInterface {
  ballNumber: number;
  batsmanName: string;
  playerName: string;
  runs: number;
  ballsFaced: number;
  isOut: boolean;
  dot: boolean;
  single: boolean;
  double: boolean;
  triple: boolean;
  four: boolean;
  six: boolean;
  extras: false;
  caption?: string;
  isWicket: boolean;
  dismissalType:
    | "Caught"
    | "Sub Caught"
    | "Caught behind"
    | "yet to bat"
    | "Bowled"
    | "retired hurt"
    | "Run out"
    | "stump out"
    | "Not out";
  methodOfDismissal:
    | "Caught"
    | "Sub Caught"
    | "Caught behind"
    | "yet to bat"
    | "Bowled"
    | "retired hurt"
    | "Run out"
    | "stump out"
    | "Not out";
  dismissedVia?: string | null;
}
interface teamSuperOverStatInterface {
  bowlerName: string;
  batters: BatterForSuperOverInterface[];
  runs: number;
  overComplete: number;
  balls: ballsOrBatterStatsInterface[];
}
interface BatterForSuperOverInterface {
  batsmanName: string;
  runs: number;
  ballsFaced: number;
  isOut: boolean;
  methodOfDismissal:
    | "Caught"
    | "Sub Caught"
    | "Caught behind"
    | "Yet to bat"
    | "Bowled"
    | "retired hurt"
    | "Run out"
    | "stump out"
    | "Not out";
}
interface ateamBatterStatsInterface {
  teamName: string;
  totalRuns: number;
  inningComplete: boolean;
  ballsFaced: number;
  ballsYetToFace: number;
  aTeambattingStats: ballsOrBatterStatsInterface[];
  bTeambattingStats: ballsOrBatterStatsInterface[];
}

interface TeamBowlingStatsInterface {
  playerName: string;
  oversBowled: number;
  runsConceded: number;
  wickets: [
    {
      batterName: string;
    }
  ];
  noBalls: number;
  wides: number;
  maidens: number;
  economyRate: number;
}

interface teamBowlingStatsInterface {
  teamName: string;
  aTeamBowlingStats: TeamBowlingStatsInterface[];
  bTeamBowlingStats: TeamBowlingStatsInterface[];

  // totalWickets:number;
  // inningComplete:boolean
  // aTeambowlingStats: BowlerForSuperOverInterface[]
}
interface TeamExtrasInterface {
  byes: number;
  wides: number;
  noBalls: number;
}
interface Data {
  _id: string; // Add this line
  matchType: string;
  hostDetail: string;
  teamAName: string;
  teamBName: string;
  resultMessege: string;
  firstInningStarted: boolean;
  secondInningStarted: boolean;
  secondInningEnded: boolean;
  firstInningStartedOfSuperOver: boolean;
  secondInningStartedOfSuperOver: boolean;
  secondInningEndedOfSuperOver: boolean;
  firstInningEndedOfSuperOver: boolean;
  timing: Date;
  overs: number;
  playersAside: number;
  tossWinner: tossWinnerInterface;
  aTeamInning: TeamInningInterface[];
  bTeamInning: TeamInningInterface[]; // Ensure this property exists
  aTeamPlayers: aTeamPlayersInterface[];
  bTeamPlayers: aTeamPlayersInterface[];
  isSuperOver: string;
  aTeamSuperOverStat: teamSuperOverStatInterface;
  bTeamSuperOverStat: teamSuperOverStatInterface;
  aTeamBatterStats: ateamBatterStatsInterface;
  bTeamBatterStats: ateamBatterStatsInterface;
  aTeamBowlerStats: teamBowlingStatsInterface;
  bTeamBowlerStats: teamBowlingStatsInterface;
  aTeamExtras: TeamExtrasInterface;
  bTeamExtras: TeamExtrasInterface;
  status: "Not Started" | "In Progress" | "Completed";
  winner: string;
  tournamentId: string;
  seriesId: string;
  MOM: {
    playerName: string;
  };
  aTeamFallOfWicket: WicketsFallenArray[];
  bTeamFallOfWicket: WicketsFallenArray[];
}
interface WicketsFallenArray {
  ballNumber: number;
  runs: number;
  wickets: number;
  batterName: string;
}
interface CurrentMatchLiveDetailProps {
  matchData: Data | null;
  anotherVariable: string; // Example of another variable with a different datatype
}

function CurrentMatchLiveDetail({ matchData }: CurrentMatchLiveDetailProps) {
  const [aTeamCurrentOver, setATeamCurrentOver] = useState<
    TeamInningInterface[]
  >([]);
  const [bTeamCurrentOver, setBTeamCurrentOver] = useState<
    TeamInningInterface[]
  >([]);
  const [bTeamCurrentOverOfSuperOver, setBTeamCurrentOverOfSuperOver] = useState<
    TeamInningInterface[]
  >([]);
  const [aTeamCurrentOverOfSuperOver, setATeamCurrentOverOfSuperOver] = useState<
    TeamInningInterface[]
  >([]);

  useEffect(() => {
    setATeamCurrentOver(
      matchData?.aTeamInning.filter((item) => item.overCompleted == "ongoing")
    );
    setBTeamCurrentOver(
      matchData?.bTeamInning.filter((item) => item.overCompleted == "ongoing")
    );
    setATeamCurrentOverOfSuperOver(matchData?.aTeamSuperOverStat.balls)
    setBTeamCurrentOverOfSuperOver(matchData?.bTeamSuperOverStat.balls)
    // setATeamCurrentOverLength(
    //   matchData?.aTeamInning.filter(
    //     (item: any) => item.overNumber.bowlerName != null
    //   ).length
    // );
    // setBTeamCurrentOver(
    //   matchData?.bTeamInning.filter(
    //     (item: any) => item.overNumber.bowlerName != null
    //   ).length
    // );
  }, [matchData]);
  console.log(aTeamCurrentOver && aTeamCurrentOver, "hh");
  console.log(bTeamCurrentOver && bTeamCurrentOver, "hh");

  // matchData && matchData.status == "Completed"
  //   ? cards.push("Summary").[0]
  //   : cards.push("OverView").[0];
  return (
    <div className="w-full    pb-2  h-fit">
      {matchData?.status == "In Progress" && (
        <h1 className=" w-[90%] mx-auto min-h-[10px] py-2 text-green-600 tracking-wide font-bold text-end">
          LIVE
        </h1>
      )}{" "}
      {matchData?.status == "Completed" && (
        <h1 className=" w-[90%] mx-auto min-h-[10px] py-2 text-[#1d4ed8] tracking-wide font-bold text-end">
          Completed
        </h1>
      )}
      {/* sealed */}
      {!matchData?.firstInningStartedOfSuperOver && matchData?.isSuperOver && (
        <div className="flex flex-col gap-2 my-2">
          <h1 className="text-white w-fit  mx-auto px-2 bg-[#173686] rounded-sm font-semibold text-center   ">
            Super Over
          </h1>
        </div>
      )}
      {/* sealed true */}
      {matchData &&
        (matchData.firstInningStartedOfSuperOver ? (
          <TeamNames
            aTeamName={matchData?.teamAName}
            bTeamName={matchData?.teamBName}
            reverse={true}
          ></TeamNames>
        ) : (
          <TeamNames
            aTeamName={matchData?.teamAName}
            bTeamName={matchData?.teamBName}
            reverse={false}
          ></TeamNames>
        ))}
      {/* sealed true */}
      {matchData && !matchData.firstInningStartedOfSuperOver && (
        <div className="w-[90%] mx-auto pt-2  mb-2 h-fit flex justify-center gap-2   ">
          {" "}
          {matchData.firstInningStarted ? (
            <RegularLiveCard
              TeamBatterStats={matchData?.aTeamBatterStats}
              TeambattingStats={matchData?.aTeamBatterStats.aTeambattingStats}
              TeamInning={matchData?.aTeamInning}
              overs={matchData?.overs}
              playerAside={matchData?.playersAside}
              teamA={true}
              showRRR={false}
              // fallenWicket={matchData?.aTeamFallOfWicket}
              target={matchData?.aTeamBatterStats.totalRuns}
              inning1Ended={matchData?.secondInningStarted}
              inning2Ended={matchData?.secondInningEnded}
            ></RegularLiveCard>
          ) : (
            <div className="capitalize text-sm  w-[49%]  center text-center flex gap-2 rounded-sm font-medium">
              Yet To Bat
            </div>
          )}
          {matchData.secondInningStarted ? (
            <RegularLiveCard
              TeamBatterStats={matchData?.bTeamBatterStats}
              TeambattingStats={matchData?.bTeamBatterStats.bTeambattingStats}
              TeamInning={matchData?.bTeamInning}
              teamA={false}
              overs={matchData?.overs}
              // fallenWicket={matchData?.bTeamFallOfWicket}

              playerAside={matchData?.playersAside}
              showRRR={true}
              target={matchData?.aTeamBatterStats.totalRuns}
              inning1Ended={matchData?.secondInningStarted}
              inning2Ended={matchData?.secondInningEnded}
            ></RegularLiveCard>
          ) : (
            <div className="capitalize text-sm w-[49%]  center text-center flex gap-2 rounded-sm font-medium">
              Yet To Bat
            </div>
          )}
        </div>
      )}
      <div className="w-[90%] mx-auto">
        <Divider></Divider>
      </div>
      {matchData?.status !== "Completed" &&
        !matchData?.firstInningStartedOfSuperOver &&
        (matchData?.secondInningStarted === false
          ? aTeamCurrentOver.length > 0 && (
              <CurrentOverData
                data={aTeamCurrentOver}
                length={
                  6 -
                  aTeamCurrentOver[0]?.balls.filter(
                    (item) => item.extras == false
                  ).length
                }
              />
            )
          : bTeamCurrentOver.length > 0 && (
              <CurrentOverData
                data={bTeamCurrentOver}
                length={
                  6 -
                  bTeamCurrentOver[0]?.balls.filter(
                    (item) => item.extras == false
                  ).length
                }
              />
            ))}{" "}
      {/* {matchData?.status !== "Completed" &&
        matchData?.firstInningStartedOfSuperOver &&
        (matchData?.firstInningEndedOfSuperOver === false
          ? bTeamCurrentOverOfSuperOver.length > 0 && (
              <CurrentOverData
                data={bTeamCurrentOverOfSuperOver}
                length={
                  6 -
                  aTeamCurrentOver[0]?.balls.filter(
                    (item) => item.extras == false
                  ).length
                }
              />
            )
          : aTeamCurrentOverOfSuperOver.length > 0 && (
              <CurrentOverData
                data={aTeamCurrentOverOfSuperOver}
                length={
                  6 -
                  bTeamCurrentOver[0]?.balls.filter(
                    (item) => item.extras == false
                  ).length
                }
              />
            ))} */}
      {/* {matchData?.aTeamInning} */}
      {/* sealed true */}
      {matchData &&
        !matchData.firstInningStartedOfSuperOver &&
        matchData.firstInningStarted &&
        (!matchData.secondInningStarted ? (
          <CurrentBatterAndBowlerOfFirstInning data={matchData} />
        ) : (
          <CurrentBatterAndBowlerOfSecondInning data={matchData} />
        ))}
      {/* sealed true*/}
      {matchData && matchData.firstInningStartedOfSuperOver && (
        <Divider></Divider>
      )}
      {/* not sealed as messege data is to be set */}
      {matchData?.firstInningStartedOfSuperOver && (
        <div className="w-[90%] mt-2 mx-auto h-fit flex flex-col  gap-[2%] items-center">
          <div className="flex w-full justify-between">
            {matchData.firstInningStartedOfSuperOver ? (
              <MatchSuperOverScore
                status={matchData.status}
                teamSuperOverStat={matchData.bTeamSuperOverStat}
                hasStarted={matchData.firstInningStartedOfSuperOver}
              />
            ) : (
              <div className="capitalize text-sm w-[49%]  center text-center flex gap-2 rounded-sm font-medium">
                Yet To Bat
              </div>
            )}
            {matchData.secondInningStartedOfSuperOver ? (
              <MatchSuperOverScore
                status={matchData.status}
                teamSuperOverStat={matchData.aTeamSuperOverStat}
                hasStarted={matchData.firstInningStartedOfSuperOver}
              />
            ) : (
              <div className="capitalize text-sm w-[49%]  center text-center flex gap-2 rounded-sm font-medium">
                Yet To Bat
              </div>
            )}
          </div>
          {matchData.secondInningStartedOfSuperOver &&
            !matchData.secondInningEndedOfSuperOver && (
              <RunsNeeded
                runs={
                  matchData.bTeamSuperOverStat.runs -
                  matchData.aTeamSuperOverStat.runs
                }
                balls={6 - matchData?.aTeamSuperOverStat.balls.length}
                messege={""}
                // rr={matchData.}
              />
            )}
        </div>
      )}
      {/* sealed */}
      {matchData?.firstInningStartedOfSuperOver &&
        (matchData.secondInningStartedOfSuperOver ? (
          <CurrentBatterAndBowlerOfFSecondInningSuperOver
            data={matchData.aTeamSuperOverStat}
            teamAName={matchData.teamAName}
            teamBName={matchData.teamBName}
            TeamABatting={true}
          ></CurrentBatterAndBowlerOfFSecondInningSuperOver>
        ) : (
          <CurrentBatterAndBowlerOfFSecondInningSuperOver
            data={matchData.bTeamSuperOverStat}
            teamAName={matchData.teamAName}
            teamBName={matchData.teamBName}
            TeamABatting={false}
          ></CurrentBatterAndBowlerOfFSecondInningSuperOver>
        ))}
      {matchData?.firstInningStartedOfSuperOver && (
        <div className="h-[2px] w-[90%] mx-auto mt-2 bg-white"></div>
      )}
      <ScorecardAndCommentary matchData={matchData}></ScorecardAndCommentary>
    </div>
  );
}

export default CurrentMatchLiveDetail;
