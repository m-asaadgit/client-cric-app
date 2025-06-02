
import Divider from "../../utils/Divider";
import BattersList from "../MatchBattingBowlinfCompleteStatsDetails/BattersList";

import TotalRunsCard from "../MatchBattingBowlinfCompleteStatsDetails/TotalRunsCard";
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
