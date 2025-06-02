import Divider from "../../utils/Divider";
import BattersList from "../MatchBattingBowlinfCompleteStatsDetails/BattersList";
import BattingTeamExtraRunsCard from "../MatchBattingBowlinfCompleteStatsDetails/BattingTeamExtraRunsCard";
import BattingTeamStats from "../MatchBattingBowlinfCompleteStatsDetails/BattingTeamStats";
import BowlingTeamStats from "../MatchBattingBowlinfCompleteStatsDetails/BowlingTeamStats";
import TotalRunsCard from "../MatchBattingBowlinfCompleteStatsDetails/TotalRunsCard";
import WicketsFallen from "../MatchBattingBowlinfCompleteStatsDetails/WicketsFallen";
import YetToBat from "../MatchBattingBowlinfCompleteStatsDetails/YetToBat";
import BattingAndBowlingDataColoumn from "./BattingAndBowlingDataColoumn";
import match from "../../interface/MatchInterface"
function ATeamScoreCard({
  firstInningStarted,
  aTeamBatterStats,
  aTeamPlayers,
  bTeamBowlerStats,
  aTeamExtras,
  aTeamFallOfWicket
}: match) {
  const battingData = ["R", "B", "4s", "6s", "S/R"];
  const bowlingData = ["O", "M", "R", "W", "Ecom"];
  const over = `${Math.floor(aTeamBatterStats.ballsFaced / 6)}.${
    aTeamBatterStats.ballsFaced % 6
  }`;

  return (
    <div className="w-full">
      {firstInningStarted ? (
        <div className="w-full  flex flex-col">
          <BattingAndBowlingDataColoumn
            data={battingData}
            stateType={"batting"}
          ></BattingAndBowlingDataColoumn>

          <BattingTeamStats
            battingStat={aTeamBatterStats.aTeambattingStats}
          ></BattingTeamStats>
          <BattingTeamExtraRunsCard
            extras={aTeamExtras}
          ></BattingTeamExtraRunsCard>
          <Divider></Divider>
          <TotalRunsCard
            totalRuns={aTeamBatterStats.totalRuns}
            wickets={
              aTeamBatterStats.aTeambattingStats.filter(
                (item: any) => item.isOut == true
              ).length
            }
            overs={over}
          ></TotalRunsCard>
          <Divider></Divider>

          {aTeamPlayers
            .filter((item: any) => item.methodOfDismissal == "Yet To Bat")
            .length > 1 && (
            <YetToBat
              TeamPlayers={aTeamPlayers.filter(
                (item: any) =>
                  item.methodOfDismissal == "Yet To Bat" &&
                  item.isTwelfthMan == false
              )}
            ></YetToBat>
          )}
       <Divider></Divider>
       <WicketsFallen  fallOfWickets={aTeamFallOfWicket}    ></WicketsFallen>
       <Divider></Divider>
          <BattingAndBowlingDataColoumn
            data={bowlingData}
            stateType={"bowling"}
          ></BattingAndBowlingDataColoumn>
          <Divider></Divider>
          <BowlingTeamStats
            bowlingStat={bTeamBowlerStats.bTeamBowlingStats}
          ></BowlingTeamStats>
        </div>
      ) : (
        <div className="w-full ">
          {aTeamPlayers
            .filter((item: any) => item.isTwelfthMan == false)
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

export default ATeamScoreCard;
