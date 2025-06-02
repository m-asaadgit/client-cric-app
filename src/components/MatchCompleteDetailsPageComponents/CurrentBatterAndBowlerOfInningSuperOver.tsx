import  { Key } from "react";
interface battersInterface {
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
interface ballsInterface {
  dismissalType: string;
}

interface dataInterface {
  bowlerName: string;
  runs: number;
  batters: battersInterface[];
  balls: ballsInterface[];
}
interface bTeamSuperOverStatInterface {
  data: dataInterface;
  teamAName: string;
  teamBName: string;
  TeamABatting: boolean;
}

function CurrentBatterAndBowlerOfFSecondInningSuperOver({
  data,
  teamAName,
  teamBName,
  TeamABatting,
}: bTeamSuperOverStatInterface) {
  const getShortForm = (str: string | undefined | null): string => {
    if (!str || typeof str !== "string") return "";

    const words = str.trim().split(/[^a-zA-Z0-9]+/);

    return words.length === 1
      ? words[0].slice(0, 3).toUpperCase() // First 3 letters for single-word names
      : words.map((word) => word[0]?.toUpperCase()).join(" "); // Acronym for multi-word names
  };

  return (
    <div className="w-[90%] mx-auto py-2 px-1 flex   h-fit ">
      <div className="w-[49%] flex flex-col   ">
        {TeamABatting ? (
          <h1 className="border-b-[1px] font-thin text-sm tracking-wide pb-[1px] border-b-white w-fit" >
            Batting <span className="font-medium text-[#1d4ed8] ">{getShortForm(teamAName)}</span>
          </h1>
        ) : (
          <h1 className="border-b-[1px] font-thin text-sm tracking-wide pb-[1px] border-b-white w-fit" >
            Batting <span className="font-medium text-[#1d4ed8] ">{getShortForm(teamBName)}</span>
          </h1>
        )}
        {data?.batters
          .filter(
            (item: { methodOfDismissal: string }) =>
              item.methodOfDismissal == "Not Out"
          )
          .map(
            (
              item: {
                batsmanName: string;
                ballsFaced: number;
                runs: number;
              },
              index: Key
            ) => (
              <div key={index} className=" text-sm w-full ">
                {`${item.batsmanName.split(" ")[0][0]} ${
                  item.batsmanName.split(" ")[1]
                }`}{" "}
                : {item.runs} ({item.ballsFaced})
              </div>
            )
          )}
      </div>

      <div className="w-[49%] text-end flex flex-col items-end  ">
        {TeamABatting ? (
          <h1 className="border-b-[1px] font-thin text-sm tracking-wide pb-[1px] border-b-white w-fit" >
            Bowling <span className="font-medium text-[#1d4ed8] ">{getShortForm(teamBName)}</span>
          </h1>
        ) : (
          <h1 className="border-b-[1px] font-thin text-sm tracking-wide pb-[1px] border-b-white w-fit" >
            Bowling <span className="font-medium text-[#1d4ed8] ">{getShortForm(teamAName)}</span>
          </h1>
        )}
        {`${data?.bowlerName.split(" ")[0][0]} ${
          data?.bowlerName.split(" ")[1]
        }`}{" "}
        :{" "}
        {
          data?.balls.filter(
            (i: { dismissalType: string }) =>
              !["retired hurt", "Run out", "Not out", "Yet to bat"].includes(
                i.dismissalType
              )
          ).length
        }
        /{data?.runs} ({""}
        {data?.balls.length > 5 ? "1" : `0.${data?.balls.length}`})
      </div>
    </div>
  );
}

export default CurrentBatterAndBowlerOfFSecondInningSuperOver;
