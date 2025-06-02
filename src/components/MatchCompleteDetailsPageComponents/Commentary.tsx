import classNames from "classnames";
import { useEffect, useState } from "react";
import NonSuperOverCommentary from "../commentaryTempletes/NonSuperOverCommentary";

interface TeamPlayersInterface {
  playerName: string;
  isOut: boolean;
  isTwelfthMan: boolean;
}
interface WicketsFallenArray {
  ballNumber: number;
  runs: number;
  wickets: number;
  batterName: string;
}
interface MatchData {
  aTeamBatterStats: {};
  bTeamBatterStats: {};
  firstInningStartedOfSuperOver: boolean;
  secondInningStartedOfSuperOver: boolean;
  firstInningStarted: boolean;
  secondInningEnded: boolean;
  secondInningStarted: boolean;
  teamAName: string;
  playersAside: number;
  aTeamInning: [];
  bTeamInning: [];
  overs: number;
  aTeamExtras: {};
  bTeamExtras: {};
  bTeamPlayers: TeamPlayersInterface[];
  aTeamPlayers: TeamPlayersInterface[];
  teamBName: string;
  aTeamBowlerStats: {};
  bTeamBowlerStats: {};
  aTeamFallOfWicket: WicketsFallenArray[];
  bTeamFallOfWicket: WicketsFallenArray[];
}
function Commentary({ matchData }: { matchData: MatchData }) {
  const [currentCard, setCurrentCard] = useState<string>();
  const [cards, setCards] = useState<string[]>([]);

  // Use useEffect to update state when matchData changes
  useEffect(() => {
    if (matchData) {
      const newCards = [matchData.teamAName, matchData.teamBName];

      if (
        matchData.firstInningStartedOfSuperOver &&
        matchData.secondInningEnded
      ) {
        newCards.push(`${matchData.teamBName} Super Over`);
        newCards.push(`${matchData.teamAName} Super Over`);
      }
      setCurrentCard(matchData.teamAName); // Set state safely

      setCards(newCards);
      if (matchData.secondInningStarted && !matchData.secondInningEnded) {
        setCurrentCard(matchData.teamBName);
      } else if (matchData.firstInningStartedOfSuperOver) {
        setCurrentCard(`${matchData.teamAName} Super Over`);
      } else if (matchData.secondInningStartedOfSuperOver) {
        setCurrentCard(`${matchData.teamBName} Super Over`);
      }
    }
  }, [matchData]); // Runs only when matchData changes
  return (
    <div className="w-[90%]   mx-auto flex flex-col ">
      <div className="w-full mt-4 flex">
        {cards.length > 1 &&
          cards.map((item, index) => (
            <div
              className={classNames(
                `${
                  cards.length > 2 ? "w-[25%]" : "w-[50%]"
                } text-[10px] bg-black  py-1 center gap-2`, // Regular styles
                {
                  "border-b-2    border-b-white": item == currentCard,
                },
                {
                  " border-b-2 border-b-[#484545]": item != currentCard,
                }
              )}
              key={index}
            >
              {cards.length > 3 && (
                <div className="w-full text-center">
                  {index === 0 && (
                    <h1 className="active:bg-amber-100">{item}</h1>
                  )}
                  {index === 1 && <h1>{item}</h1>}
                  {index === 2 && <h1>{item}</h1>}
                  {index === 3 && <h1>{item}</h1>}
                </div>
              )}
              {cards.length < 3 && (
                <div className="w-full text-center">
                  {index === 0 && (
                    <button
                      className="w-full"
                      onClick={() => setCurrentCard(item)}
                    >
                      {item}
                    </button>
                  )}
                  {index === 1 && (
                    <button
                      className="w-full"
                      onClick={() => setCurrentCard(item)}
                    >
                      {item}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
      {cards.length > 1 && currentCard == cards[0] && (
        <NonSuperOverCommentary
          inningData={matchData.aTeamInning}
        ></NonSuperOverCommentary>
      )}{" "}
      {cards.length > 1 && currentCard == cards[1] && (
        <NonSuperOverCommentary
          inningData={matchData.bTeamInning}
        ></NonSuperOverCommentary>
      )}
      {/* {cards.length > 1 && currentCard == cards[1] && ""}{" "} */}
      {cards.length > 1 && currentCard == cards[2] && ""}{" "}
      {cards.length > 1 && currentCard == cards[3] && ""}
    </div>
  );
}

export default Commentary;
