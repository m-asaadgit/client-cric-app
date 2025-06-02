import { useState, useEffect } from "react";
import ATeamScoreCard from "./ATeamScoreCard";
import ATeamSuperOverScoreCard from "./ATeamSuperOverScoreCard";
import BTeamScoreCard from "./BTeamScoreCard";
import BTeamSuperOverScoreCard from "./BTeamSuperOverScoreCard";
import classNames from "classnames";
import Match from "../../interface/MatchInterface";

// interface aTeamBatterStatInterface {}
// interface bTeamBatterStatInterface {}
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
  ATeamInning: [];
  BTeamInning: [];
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
  bTeamSuperOverStat:{};
}

function ScorecardData({ matchData }: { matchData: Match }) {
  const [currentCard, setCurrentCard] = useState<string>();
  const [cards, setCards] = useState<string[]>([]);

  // Use useEffect to update state when matchData changes
  useEffect(() => {
    if (matchData) {
      const newCards = [matchData.teamAName, matchData.teamBName];

      if (
        matchData.firstInningStartedOfSuperOver       ) {
        newCards.push(`${matchData.teamBName} Super Over`);
        newCards.push(`${matchData.teamAName} Super Over`);

      }

      setCurrentCard(matchData.teamAName); // Set state safely

      setCards(newCards);
      if (matchData.secondInningStarted && !matchData.secondInningEnded) {
        setCurrentCard(matchData.teamBName);
      } else if (matchData.firstInningStartedOfSuperOver) {
        setCurrentCard(`${matchData.teamBName} Super Over`);
      } else if (matchData.secondInningStartedOfSuperOver) {
        setCurrentCard(`${matchData.teamAName} Super Over`);
      }
    }
  }, [matchData]); // Runs only when matchData changes
  // const getShortForm = (str: string | undefined | null): string => {
  //   if (!str || typeof str !== "string") return "";

  //   const words = str.trim().split(/[^a-zA-Z0-9]+/);

  //   return words.length === 1
  //     ? words[0].slice(0, 3).toUpperCase() // First 3 letters for single-word names
  //     : words.map((word) => word[0]?.toUpperCase()).join(" "); // Acronym for multi-word names
  // };
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
                <div className="w-full h-full text-center">
                  {index === 0 && (
                    <button
                      onClick={() => setCurrentCard(item)}
                      className="active:bg-amber-100"
                    >
                      {item}
                    </button>
                  )}
                  {index === 1 && (
                    <button className=" h-full " onClick={() => setCurrentCard(item)}>
                      {item}j
                    </button>
                  )}
                  {index === 2 && (
                    <button className=" h-full " onClick={() => setCurrentCard(item)}>{item}</button>
                  )}
                  {index === 3 && (
                    <button className=" h-full " onClick={() => setCurrentCard(item)}>{item}</button>
                  )}
                </div>
              )}
              {cards.length < 3 && (
                <div className="w-full text-center">
                  {index === 0 && (
                    <button
                    className=" h-full "                      onClick={() => setCurrentCard(item)}
                    >
                      {item}
                    </button>
                  )}
                  {index === 1 && (
                    <button
                    className=" h-full "                      onClick={() => setCurrentCard(item)}
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
        <ATeamScoreCard
          firstInningStarted={matchData.firstInningStarted}
          aTeamPlayers={matchData?.aTeamPlayers}
          aTeamBatterStats={matchData?.aTeamBatterStats}
          bTeamBowlerStats={matchData?.bTeamBowlerStats}
          aTeamExtras={matchData?.aTeamExtras}
          aTeamFallOfWicket={matchData?.aTeamFallOfWicket}
        ></ATeamScoreCard>
      )}{" "}
      {cards.length > 1 && currentCard == cards[1] && (
        <BTeamScoreCard
          secondInningStarted={matchData.secondInningStarted}
          bTeamFallOfWicket={matchData?.bTeamFallOfWicket}
          bTeamPlayers={matchData?.bTeamPlayers}
          bTeamBatterStats={matchData?.bTeamBatterStats}
          aTeamBowlerStats={matchData?.aTeamBowlerStats}
          bTeamExtras={matchData?.bTeamExtras}
        ></BTeamScoreCard>
      )}{" "}
         {cards.length > 1 && currentCard == cards[2] && (
        <BTeamSuperOverScoreCard
        firstInningStartedOfSuperOver={matchData.firstInningStartedOfSuperOver}
        bTeamPlayers={matchData?.bTeamPlayers}
        bTeamSuperOverStat={matchData?.bTeamSuperOverStat}
          aTeamBowlerStats={matchData?.aTeamBowlerStats}
          bTeamExtras={matchData?.bTeamExtras}
        ></BTeamSuperOverScoreCard>
      )}
      {cards.length > 1 && currentCard == cards[3] && (
        <BTeamSuperOverScoreCard
        firstInningStartedOfSuperOver={matchData.secondInningStartedOfSuperOver}
        bTeamPlayers={matchData?.aTeamPlayers}
        bTeamSuperOverStat={matchData?.aTeamSuperOverStat}
  
        ></BTeamSuperOverScoreCard>
      )}
   
    </div>
  );
}

export default ScorecardData;
