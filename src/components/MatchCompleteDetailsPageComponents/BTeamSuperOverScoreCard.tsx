// interface BatterStat {
//   batsmanName: string;
//   runs: number;
//   ballsFaced: number;
//   fours: number;
//   sixes: number;
//   strikeRate: number;
//   isOut: boolean;
//   methodOfDismissal?: "Caught" | "Sub Caught" | "Caught behind" | "Yet to bat" | "Bowled" | "Retired hurt" | "Run out" | "Stump out" | "Not out";
//   dismissedVia?: string;
// }
// interface OverDetail {
//   bowlerName: string;
//   overNumber: number;
// }

// interface BallDetail {
//   ballNumber: number;
//   batsmanName: string;
//   runs: number;
//   dot: boolean;
//   single: boolean;
//   double: boolean;
//   triple: boolean;
//   four: boolean;
//   six: boolean;
//   extras: boolean;
//   caption?: string;
//   isWicket: boolean;
//   dismissalType: "Caught" | "Sub Caught" | "Caught behind" | "yet to bat" | "Bowled" | "retired hurt" | "Run out" | "stump out" | "Not out";
//   dismissedVia?: string;
// }

// interface Inning {
//   overNumber: OverDetail;
//   overCompleted: "pending" | "ongoing" | "completed";
//   balls: BallDetail[];
// }

// interface Player {
//   playerName: string;
//   isOut: boolean;
//   isTwelfthMan: boolean;
// }

// interface TossWinner {
//   teamName: string;
//   elected: "batFirst" | "bowlFirst";
// }

// interface SuperOverStat {
//   bowlerName: string;
//   runs: number;
//   batters: {
//     batsmanName: string;
//     runs: number;
//     ballsFaced: number;
//     isOut: boolean;
//     methodOfDismissal: "Caught" | "Sub Caught" | "Caught behind" | "Yet to bat" | "Bowled" | "retired hurt" | "Run out" | "stump out" | "Not out";
//   }[];
//   overComplete: boolean;
//   balls: BallDetail[];
// }
// interface MatchData {
//   hostDetail: string;
//   matchType?: string;
//   teamAName: string;
//   resultMessage?: string;
//   teamBName: string;
//   firstInningStarted: boolean;
//   secondInningStarted: boolean;
//   firstInningStartedOfSuperOver: boolean;
//   secondInningStartedOfSuperOver: boolean;
//   timing?: Date;
//   overs: number;
//   playersAside: number;
//   tossWinner?: TossWinner;
//   aTeamInning: Inning[];
//   bTeamInning: Inning[];
//   aTeamPlayers: Player[];
//   bTeamPlayers: Player[];
//   isSuperOver: boolean;
//   aTeamSuperOverStat?: SuperOverStat;
//   bTeamSuperOverStat?: SuperOverStat;
//   aTeamBatterStats: BatterStat[];
//   bTeamBatterStats: BatterStat[];
// }
import Divider from "../../utils/Divider";
import BattersList from "../MatchBattingBowlinfCompleteStatsDetails/BattersList";
import BattingTeamExtraRunsCard from "../MatchBattingBowlinfCompleteStatsDetails/BattingTeamExtraRunsCard";

import BowlingTeamStats from "../MatchBattingBowlinfCompleteStatsDetails/bowlingTeamStats";
import TotalRunsCard from "../MatchBattingBowlinfCompleteStatsDetails/TotalRunsCard";
import WicketsFallen from "../MatchBattingBowlinfCompleteStatsDetails/WicketsFallen";
import YetToBat from "../MatchBattingBowlinfCompleteStatsDetails/YetToBat";
import BattingAndBowlingDataColoumn from "./BattingAndBowlingDataColoumn";
import match from "../../interface/MatchInterface"
import SuperOverBatterStat from "../superOverStatTemplete/SuperOverBatterStat";
import BowlingStatInSuperOver from "../superOverStatTemplete/BowlingStatInSuperOver";
function BTeamSuperOverScoreCard({
  firstInningStartedOfSuperOver,
  bTeamSuperOverStat,
  bTeamPlayers,
}: match) {
  console.log()
  console.log(bTeamSuperOverStat?.batters)
  const battingData = ["R", "B", "4s", "6s", "S/R"];
  const bowlingData = ["O", "M", "R", "W", "Ecom"];
  const over = bTeamSuperOverStat?.balls?.filter((item) => item.extras === false).length



  return (
    <div className="w-full mb-10  ">
      {firstInningStartedOfSuperOver ? (
        <div className="w-full  flex flex-col">
          <BattingAndBowlingDataColoumn
            data={battingData}
            stateType={"batting"}
          ></BattingAndBowlingDataColoumn>
          <SuperOverBatterStat
            battingStat={bTeamSuperOverStat?.batters}
          ></SuperOverBatterStat>
     
          <Divider></Divider>
          <TotalRunsCard
            totalRuns={bTeamSuperOverStat?.runs}
            wickets={
              bTeamSuperOverStat?.batters?.filter(
                (item: any) => item.isOut == true
              ).length
            }
            overs={over > 5 ? 1 : `0.${over}`}
          ></TotalRunsCard>

          <Divider></Divider>
   

          <Divider></Divider>
          <BattingAndBowlingDataColoumn
            data={bowlingData}
            stateType={"bowling"}
          ></BattingAndBowlingDataColoumn>
          <Divider></Divider>
          <BowlingStatInSuperOver
            bowlerName={bTeamSuperOverStat?.bowlerName}
            runs={bTeamSuperOverStat?.runs}
            overs={over}
            wickets={bTeamSuperOverStat?.batters?.filter((item)=>{
              return item.isOut==true&&item.methodOfDismissal!="Run Out"&& item.methodOfDismissal!="Retired Hurt"
            }).length}

          ></BowlingStatInSuperOver>
        </div>
      ) : (
        <div className="w-full ">
          {bTeamPlayers
            .filter((item:any) => item.isTwelfthMan == false)
            .map((item: any, index: number) => (
              <BattersList
                playerName={item.playerName}
                index={index}
              ></BattersList>
            ))}
       
        </div>
      )}
    </div>
  );
}

export default BTeamSuperOverScoreCard;
