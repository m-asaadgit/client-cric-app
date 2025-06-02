import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import LoaderCardForPreview from "../components/LoaderCardForPreview";
import MatchCompleteDetailsPage from "./MatchCompleteDetailsPage";
import TossInputForm from "../components/matchScoreUpdationComponent/TossUpdate";
import OpenersUpdate from "../components/matchScoreUpdationComponent/OpenersUpdate";
import AddNewBatter from "../components/matchScoreUpdationComponent/AddNewBatter";
import AddNextBowler from "../components/matchScoreUpdationComponent/AddNextBowler";
import BallToBallForm from "../components/matchScoreUpdationComponent/BallToBallUpdate";
import AddOpeners from "../components/superOverUpdater/AddOpeners";
import AddNewBatterInSuperOver from "../components/superOverUpdater/AddNewBatterInSuperOver";
import CreateSuperOver from "../components/superOverUpdater/CreateSuperOver";
import BallToBallUpdateForSuperOver from "../components/superOverUpdater/BallToBallUpdateForSuperOver";
interface SuperOverStat {
  bowlerName?: string;
  runs?: number;
  boundaries?: number;
  batters?: {
    batsmanName: string;
    isOut?: boolean;
    runs?: number;
    ballsFaced?: number;
    methodOfDismissal?:
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
  };
  balls?: Ball[];
}
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

interface Player {
  playerName?: string;
  isOut?: boolean;
  isOutSuperOver?: boolean;
  outOnBallNumber?: number;
  isTwelfthMan?: boolean;
  methodOfDismissal?:
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
}
const apiUrl = import.meta.env.VITE_API_BASE_URL;


function UpdateScorePage() {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [batter, setBatter] = useState<string[]>([]);
  const [bowler, setBowler] = useState<string[]>([]);
  const [batterForSuperOver, setBatterForSuperOver] = useState<string[]>([]);
  const [bowlerForSuperOver, setBowlerForSuperOver] = useState<string[]>([]);
  const [currentBowler, setCurrentBowler] = useState<string[]>([]);
  const [firstInningOfNormalInning, setFirstInningOfNormalInning] =
    useState<boolean>(true);
  const [playerASide, setplayerASide] = useState<number>(0);
  const [openersUpdate, setOpenersUpdate] = useState<boolean>(false);
  const [firstInningEnded, setFirstInningEnded] = useState<boolean>(false);
  const [secondInningEnded, setSecondInningEnded] = useState<boolean>(false);
  const [firstInningStarted, setFirstInningStarted] = useState<boolean>(false);
  const [secondInningStarted, setSecondInningStarted] =
    useState<boolean>(false);
  const [firstInningStartedOfSuperOver, setFirstInningStartedOfSuperOver] =
    useState<boolean>(false);
  const [secondInningStartedOfSuperOver, setSecondInningStartedOfSuperOver] =
    useState<boolean>(false);
  const [firstInningEndedOfSuperOver, setFirstInningEndedOfSuperOver] =
    useState<boolean>(false);
  const [secondInningEndedOfSuperOver, setSecondInningEndedOfSuperOver] =
    useState<boolean>(false);
  const [isSuperOver, setIsSuperOver] = useState<boolean>(false);
  const [teamSuperOverStat, setTeamSuperOverStat] = useState<SuperOverStat>({});
  const [player, setPlayer] = useState<Player>({});

  const [addNewBatter, setAddNewBatter] = useState<boolean>(false);
  const [addNextBowler, setAddNextBowler] = useState<boolean>(false);
  const [resultMessege, setResultMessege] = useState<string>("");
  const [ballToBallUpdate, seTBallToBallUpdate] = useState<boolean>(false);

  const [success, setSuccess] = useState<boolean>(false);
  const [teamAName, setteamAName] = useState<string>("");
  const [teamBName, setteamBName] = useState<string>("");
  const [scoreCard, setScoreCard] = useState<boolean>(false);
  const [updateToss, setUpdateToss] = useState<boolean>(false);
  const [updateOpener, setUpdateOpener] = useState<boolean>(false);
  const [updateBall, setUpdateBall] = useState<boolean>(false);
  const [updateBatter, setUpdateBatter] = useState<boolean>(false);
  const [updateBowler, setUpdateBowler] = useState<boolean>(false);

  const [updateSuperOverStat, setUpdateSuperOverStat] =
    useState<boolean>(false);
  const [updateSuperOverBall, setUpdateSuperOverBall] =
    useState<boolean>(false);
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const [messege, setMessege] = useState<string>("");
  var verifyIsAdmin = async () => {
    if (!matchId || !token) return; // Ensure matchId and token exist

    try {
      var response = await axios.get(
        `${apiUrl}/api/user/verify-match-updater/${matchId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setplayerASide(response.data.matchData.playersAside);
      setteamAName(response.data.matchData.teamAName);
      setSuccess(response.data.success);

      setAddNewBatter(response.data.matchData.addNewBatter);
      setResultMessege(response.data.matchData.resultMessege);
      setAddNextBowler(response.data.matchData.chooseNextBowler);
      setOpenersUpdate(!response.data.matchData.firstInningStarted);
      seTBallToBallUpdate(!response.data.matchData.secondInningEnded);
      setFirstInningStarted(response.data.matchData.firstInningStarted);
      setFirstInningEnded(response.data.matchData.firstInningEnded);
      setSecondInningStarted(response.data.matchData.secondInningStarted);
      setSecondInningEnded(response.data.matchData.secondInningEnded);
      setFirstInningStartedOfSuperOver(
        response.data.matchData.firstInningStartedOfSuperOver
      );
      setSecondInningStartedOfSuperOver(
        response.data.matchData.secondInningStartedOfSuperOver
      );
      setFirstInningEndedOfSuperOver(
        response.data.matchData.firstInningEndedOfSuperOver
      );
      setFirstInningStartedOfSuperOver(
        response.data.matchData.firstInningStartedOfSuperOver
      );
      setIsSuperOver(response.data.matchData.isSuperOver);

      setteamBName(response.data.matchData.teamBName);
      setIsAdmin(response.data.success); // Ensure proper state update
      if (
        !response.data.matchData.isSuperOver &&
        response.data.matchData.firstInningEnded == false
      ) {
        setBatter(
          response.data.matchData.aTeamPlayers.filter((item: any) => {
            return item.isTwelfthMan == false && item.isOut == false;
          })
        );

        setBowler(response.data.matchData.bTeamPlayers);
        setCurrentBowler(response.data.matchData.aTeamInning);
      } else {
        if (!response.data.matchData.isSuperOver) {
          setBatter(
            response.data.matchData.bTeamPlayers.filter((item: any) => {
              return item.isTwelfthMan == false && item.isOut == false;
            })
          );
          setBowler(response.data.matchData.aTeamPlayers);
          setCurrentBowler(response.data.matchData.bTeamInning);
        }
      }
      if (
        response.data.matchData.isSuperOver &&
        !response.data.matchData.secondInningStartedOfSuperOver
      ) {
        setBowler(response.data.matchData.bTeamPlayers);
        setBatter(response.data.matchData.bTeamPlayers.filter((item:any)=>{
          item.isOutSuperOver==false&& item.isTwelfthMan==false
        }))
      }
      if (
        response.data.matchData.isSuperOver &&
        response.data.matchData.secondInningStartedOfSuperOver
      ) {
        setBowler(response.data.matchData.aTeamPlayers);
         setBatter(response.data.matchData.aTeamPlayers.filter((item:any)=>{
          item.isOutSuperOver==false&& item.isTwelfthMan==false
        }))
      }

      if (
        response.data.matchData.isSuperOver &&
        !response.data.matchData.firstInningStartedOfSuperOver
      ) {
        setBatterForSuperOver(
          response.data.matchData.bTeamPlayers.filter((item: any) => {
            return item.isTwelfthMan == false;
          })
        );
        setBowlerForSuperOver(response.data.matchData.aTeamPlayers);
      }
      if (
        response.data.matchData.isSuperOver &&
        response.data.matchData.firstInningStartedOfSuperOver &&
        response.data.matchData.firstInningEndedOfSuperOver
      ) {
        setBatterForSuperOver(
          response.data.matchData.aTeamPlayers.filter((item: any) => {
            return item.isTwelfthMan == false;
          })
        );
        setBowlerForSuperOver(response.data.matchData.bTeamPlayers);
      }
      if (
        response.data.matchData.isSuperOver &&
        response.data.matchData.firstInningStartedOfSuperOver &&
        !response.data.matchData.firstInningEndedOfSuperOver
      ) {
        setBatter(response.data.matchData.bTeamPlayers);
        setTeamSuperOverStat(response.data.matchData.bTeamSuperOverStat);
      }
      if (
        response.data.matchData.isSuperOver &&
        response.data.matchData.secondInningStartedOfSuperOver &&
        !response.data.matchData.secondInningEndedOfSuperOver
      ) {
        setBatter(response.data.matchData.aTeamPlayers);

        setTeamSuperOverStat(response.data.matchData.aTeamSuperOverStat);
      }
      console.log(response.data);
      setFirstInningOfNormalInning(!response.data.matchData.firstInningEnded);
    } catch (error: any) {
      console.error("Error verifying admin:", error);
      navigate("/Border%20Gavaskar/all-matches/67ded85f422b0e7db810958c");
      toast(`You are not allowed to update the match`, {
        icon: "⚠️",
        style: {
          background: "#090909",
          color: "gray",
          textAlign: "center",
          borderRadius: "4px", // Corrected from "radius" to "borderRadius"
        },
      });
      setMessege(error.data.messege); // Ensure proper state update\
    }
  };
  console.log(batter && batter, "haha");
  useEffect(() => {
    if (token) verifyIsAdmin();
  }, [matchId, token]); // Added dependencies


  return (
    <div className="w-full min-h-[100vh] flex flex-col text-white justify-center card">
      {/* {isAdmin ? (
        <div className="w-full">
          <TossInputForm
            teamNames={[teamAName,teamBName]}
            playerASide={playerASide}
          ></TossInputForm>
        </div>
      ) : (
        <LoaderCardForPreview length={8}></LoaderCardForPreview>
      )} */}
      {isAdmin &&
        (!firstInningStarted || (!secondInningStarted && firstInningEnded)) && (
          <div className="w-full">
            <OpenersUpdate
              verifyIsAdmin={verifyIsAdmin}
              batter={batter}
              bowler={bowler}
              firstInningOfNormalInning={firstInningOfNormalInning}
            ></OpenersUpdate>
          </div>
        )}{" "}
      {/* {isAdmin &&
        (!firstInningEnded || (!secondInningStarted && firstInningEnded)) && (
          <div className="w-full">
            <OpenersUpdate
              verifyIsAdmin={verifyIsAdmin}
              batter={batter}
              bowler={bowler}
              firstInningOfNormalInning={firstInningOfNormalInning}
            ></OpenersUpdate>
          </div>
        )}{" "} */}
      {isAdmin && addNewBatter && !firstInningEnded && !secondInningStarted && (
        <div className="w-full">
          <AddNewBatter
            verifyIsAdmin={verifyIsAdmin}
            batterList={batter}
            firstInningOfNormalInning={firstInningOfNormalInning}
            url={`${apiUrl}/api/unlisted-match/new-batter/`}
          ></AddNewBatter>
        </div>
      )}
      {isAdmin && addNewBatter && !secondInningEnded && firstInningEnded && (
        <div className="w-full">
          <AddNewBatter
            verifyIsAdmin={verifyIsAdmin}
            batterList={batter}
            firstInningOfNormalInning={firstInningOfNormalInning}
            url={`${apiUrl}/api/unlisted-match/new-batter/`}
          ></AddNewBatter>
        </div>
      )}
      {isAdmin && addNextBowler && !secondInningEnded && (
        <div className="w-full">
          <AddNextBowler
            verifyIsAdmin={verifyIsAdmin}
            bowlerList={bowler.filter((item: any) => {
              return item.isTwelfthMan == false;
            })}
            firstInningOfNormalInning={firstInningOfNormalInning}
            url={`${apiUrl}/api/unlisted-match/new-bowler/`}
          ></AddNextBowler>
        </div>
      )}
      {isAdmin &&
        ballToBallUpdate &&
        !addNewBatter &&
        !addNextBowler &&
        ((firstInningStarted == true && firstInningEnded == false) ||
          (secondInningEnded == false && secondInningStarted == true)) && ( // This simplifies to `true` because `2==2` is true
          <div className="w-full">
            <BallToBallForm
              verifyIsAdmin={verifyIsAdmin}
              teamName={firstInningOfNormalInning ? teamAName : teamBName}
              firstInning={firstInningOfNormalInning}
              batter={batter.filter(
                (item: any) => item.methodOfDismissal == "Not Out"
              )}
              bowler={currentBowler[currentBowler.length - 1]}
              feilderPlayers={bowler}
            />
          </div>
        )}
      {secondInningEnded && !isSuperOver && (
        <div className="w-full flex items-center font-bold justify-center   text-xl h-full ">
          {resultMessege && resultMessege}{" "}
        </div>
      )}
      {/* {isSuperOver && !firstInningStartedOfSuperOver && (
        <AddOpeners></AddOpeners>
      )}{" "} */}
      {isSuperOver &&
        firstInningEndedOfSuperOver &&
        secondInningStartedOfSuperOver && <AddOpeners></AddOpeners>}
      {isSuperOver &&
        teamSuperOverStat.batters?.filter(
          (item) => item.methodOfDismissal == "Not Out"
        ).length == 1 &&
        !firstInningEndedOfSuperOver && (
          <AddNewBatterInSuperOver
            batterList={batter.filter((item:any)=>{
           return   item.isOutSuperOver==false && item.isTwelfthMan==false
            })}
            firstInninfInSuperOver={
              !secondInningStartedOfSuperOver && firstInningStartedOfSuperOver
            }
            verifyIsAdmin={verifyIsAdmin}

          ></AddNewBatterInSuperOver>
        )}{" "}
      {/* {isSuperOver &&
        firstInningEndedOfSuperOver &&
        secondInningStartedOfSuperOver && <AddOpeners></AddOpeners>}
      {isSuperOver &&
        teamSuperOverStat.batters?.filter(
          (item) => item.dismissalType == "Not Out"
        ).length == 1 &&
        !firstInningEndedOfSuperOver && <div>d</div>}
      {isSuperOver &&
        teamSuperOverStat.batters?.filter(
          (item) => item.dismissalType == "Not Out"
        ).length == 1 && 
        firstInningEndedOfSuperOver &&
        !secondInningEndedOfSuperOver && (
          <AddNewBatterInSuperOver
verifyIsAdmin={verifyIsAdmin}
batterList={}
          ></AddNewBatterInSuperOver>
        )} */}
      {/* {isSuperOver && !firstInningStartedOfSuperOver && (
        <CreateSuperOver
          teamName={
            isSuperOver && !firstInningStartedOfSuperOver
              ? teamBName
              : teamAName
          }
          verifyIsAdmin={verifyIsAdmin}
          firstInning={
            !secondInningStartedOfSuperOver && !firstInningStartedOfSuperOver
          }
          bowlerList={bowlerForSuperOver.filter((item: any) => {
            return item.isTwelfthMan == false;
          })}
          batterList={batterForSuperOver}
        ></CreateSuperOver>
      )} */}
      {isSuperOver &&
        teamSuperOverStat.batters?.filter(
          (item) => item.methodOfDismissal == "Not Out"
        ).length != 1&&
        !secondInningStartedOfSuperOver &&
        !addNewBatter &&
        !addNextBowler &&
        firstInningStartedOfSuperOver &&
        !firstInningEndedOfSuperOver && (
          <BallToBallUpdateForSuperOver
            firstInning={
              !secondInningStartedOfSuperOver && firstInningStartedOfSuperOver
            }
            batter={teamSuperOverStat.batters?.filter(
              (item) => item.methodOfDismissal == "Not Out"
            )}
            bowler={teamSuperOverStat.bowlerName}
            feilderPlayers={bowler}
            teamName={secondInningStartedOfSuperOver ? teamAName : teamBName}
            verifyIsAdmin={verifyIsAdmin}
          ></BallToBallUpdateForSuperOver>
        )}
      {isSuperOver &&
        !secondInningStartedOfSuperOver &&
        addNewBatter &&
        // addNextBowler &&
        // firstInningStartedOfSuperOver &&
        // !firstInningEndedOfSuperOver &&
        "ghvg"}
    </div>
  );
}

export default UpdateScorePage;
