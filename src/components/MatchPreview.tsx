import React from "react";
import MatchScore from "./MatchScore";
import MatchSuperOverScore from "./MatchSuperOverScore";
import { Link, Links } from "react-router-dom";
import TeamNames from "./MatchCompleteDetailsPageComponents/TeamNames";
import toast from "react-hot-toast";
interface Batter {
  isOut: boolean;
}

interface SuperOverStat {
  runs: number;
  batters: Batter[];
  balls: EachBalls[]; // Since 'balls' exists in your output
}

interface BatterStats {
  aTeambattingStats: Batter[];
  bTeambattingStats: Batter[];
  totalRuns: number; // Optional as per your output
  ballsFaced: number;
  ballsYetToFace: number;
}
interface overNumberInterface {
  bowlerName: string;
  overNumber: number;
}

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
  teamAName: string;
  overs: number;

  teamBName: string;
  timing: string; // ISO string format
  status: string;
  winner: string | null; // Nullable if match hasn’t been decided
  resultMessege: string | null; // Keep typo if API uses it

  aTeamSuperOverStat: SuperOverStat;
  bTeamSuperOverStat: SuperOverStat;
  aTeamBatterStats: BatterStats;
  bTeamBatterStats: BatterStats;

  firstInningStarted: boolean;
  firstInningStartedOfSuperOver: boolean;
  secondInningStarted: boolean;
  secondInningStartedOfSuperOver: boolean;
  aTeamInning: OverDetails[];
  bTeamInning: OverDetails[];
}

interface MatchResponse {
  data: MatchData[];
}

interface MatchPreviewProps {
  Data: MatchResponse;
  isAdmin: boolean;
}

const MatchPreview: React.FC<MatchPreviewProps> = ({ Data, isAdmin }) => {
  Data && console.log(Data.data);

  return (
    <div className="w-[96%] mx-auto flex flex-wrap items-center">
      {Data.data.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No matches available</p>
      ) : (
        Data.data.map((match, index) => (
          <div 
          key={index}
          className="w-full flex flex-col card2 mb-2 items-center justify-center ">
            {isAdmin && match.status != "Completed" && (
              <Link
                to={`/update-score/${match._id}`}
                className="my-2 bg-gray-500 px-1 rounded-[2px]"
              >
                Update Score
              </Link>
            )}
            <Link
              to={
                match.firstInningStarted == true
                  ? `/match-details/${match._id}`
                  : "#"
              }
              onClick={() => {
                if (match.firstInningStarted != true) {
                  toast(
                    `Match between ${match.teamAName} and ${match.teamBName} is not started yet`,
                    {
                      icon: "⚠️",
                      style: {
                        background: "#090909",
                        color: "gray",
                        textAlign: "center",
                        borderRadius: "4px", // Corrected from "radius" to "borderRadius"
                      },
                    }
                  );
                }
              }}
              className="w-[94%] px-2 card2  rounded-sm flex flex-col items-center justify-center  pb-2 h-fit mx-[3%] mt-2"
            >
              {match.status == "Not Started" && (
                <TeamNames
                  bTeamName={match.teamBName}
                  aTeamName={match.teamAName}
                ></TeamNames>
              )}
              {match.status != "Not Started" &&
              match.firstInningStartedOfSuperOver != true ? (
                <div className="w-[95%] mx-auto  gap-2 flex flex-col h-fit">
                  <div className="w-[90%]  mx-auto h-fit flex gap-[2%] items-center ">
                    <h1 className="w-[49%] headers min-h-[60px] px-2 capitalize text-sm center text-center  rounded-sm shadow-2xl shadow-black font-semibold ">
                      {match.teamAName}
                    </h1>
                    <h1 className="w-[49%] headers min-h-[60px] px-2 capitalize text-sm center text-center  rounded-sm shadow-2xl shadow-black font-semibold ">
                      {match.teamBName}
                    </h1>
                  </div>{" "}
                  {!match.secondInningStarted && match.resultMessege && (
                    <div className="w-full text-center">
                      {match.resultMessege}
                    </div>
                  )}
                  <MatchScore match={match} />
                </div>
              ) : (
                <div> </div>
              )}
              {/* {match.firstInningStartedOfSuperOver && <Divider></Divider>} */}
              {match.firstInningStartedOfSuperOver && (
                <div className="w-[90%]  pt-2 mx-auto h-fit flex flex-col gap-[2%]  items-center ">
                  <h1 className="w-fit mx-auto my-2 py-1 center rounded-sm text-center px-2 headers font-bold text-[#ffffff]">
                    Super over
                  </h1>
                  <div className="w-[90%]  mx-auto h-fit flex gap-[2%] items-center ">
                    <h1 className="w-[49%] headers min-h-[50px] px-2 capitalize text-sm center text-center  rounded-sm shadow-2xl shadow-black font-semibold ">
                      {match.teamBName}
                    </h1>
                    <h1 className="w-[49%] headers min-h-[50px] px-2 capitalize text-sm center text-center  rounded-sm shadow-2xl shadow-black font-semibold ">
                      {match.teamAName}
                    </h1>
                  </div>{" "}
                  <div className="flex pt-2 w-full justify-between">
                    <MatchSuperOverScore
                      teamSuperOverStat={match.bTeamSuperOverStat}
                      hasStarted={match.secondInningStartedOfSuperOver}
                      status={match.status}
                    />
                    <MatchSuperOverScore
                      teamSuperOverStat={match.aTeamSuperOverStat}
                      status={match.status}
                      hasStarted={match.firstInningStartedOfSuperOver}
                    />
                  </div>
                </div>
              )}
              {match.status === "Completed" && (
                <p className="text-[#173686] text-sm font-medium">
                  {match.resultMessege && match.resultMessege}
                </p>
              )}{" "}
              {match.status == "Not Started" && (
                <p>
                  <span className="text-[#173686] font-medium">
                    Match Timing :{" "}
                  </span>{" "}
                  {new Date(match.timing).toLocaleString()}
                </p>
              )}
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default MatchPreview;
