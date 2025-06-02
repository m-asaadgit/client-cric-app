import { useState } from "react";

interface BallsOrBatterStatsInterface {
  ballNumber: number;
  batsmanName: string;
  playerName: string;
  runs: number;
  ballsFaced: number;
  isOut: boolean;
  dot: boolean;
  wide: boolean;
  byes: boolean;
  noBall: boolean;
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
interface over {
  overNumber: {};
  overCompleted: string;
  balls: BallsOrBatterStatsInterface[];
}
function CurrentOverData({ data, length }: { data: over; length?: number }) {
  const [score, setScore] = useState<any>();
console.log(length && length)
  return (
    <div className="w-fit  mx-auto py-4  flex  gap-4 ">
      {data[0]?.balls.map((item: any, index: number) => (
        <div
          key={index}
          className="w-fit  min-w-[26px]  text-center rounded-sm bg-[#242431]"
        >
          {!item.wide && item.runs == 5 && (
            <h1 className="w-full px-1  rounded-sm font-medium h-full bg-blue-400">
              WD 4
            </h1>
          )}
          {item.single && item.isWicket && (
            <h1 className="w-full rounded-sm font-medium h-full bg-red-700">
              W 1
            </h1>
          )}
          {item.single && item.wide && (
            <h1 className="w-full rounded-sm font-medium h-full bg-blue-400 ">
              WD 1
            </h1>
          )}
          {item.single && item.noBall && (
            <h1 className="w-full rounded-sm font-medium h-full bg-blue-400 ">
              NB 1
            </h1>
          )}
          {item.single && item.byes && (
            <h1 className="w-full rounded-sm font-medium h-full ">B 1</h1>
          )}
          {item.double && item.isWicket && (
            <h1 className="w-full rounded-sm font-medium h-full bg-red-700 ">
              W 2
            </h1>
          )}
          {item.double && item.wide && (
            <h1 className="w-full rounded-sm font-medium bg-blue-400 h-full ">
              WD 2
            </h1>
          )}
          {item.double && item.noBall && (
            <h1 className="w-full rounded-sm font-medium h-full bg-blue-400 ">
              NB 2
            </h1>
          )}
          {item.double && item.byes && (
            <h1 className="w-full rounded-sm font-medium h-full ">B 2</h1>
          )}
          {item.triple && item.isWicket && (
            <h1 className="w-full rounded-sm font-medium h-full bg-red-700 ">
              W 3
            </h1>
          )}
          {item.triple && item.wide && (
            <h1 className="w-full rounded-sm font-medium bg-blue-400 h-full ">
              WD 3
            </h1>
          )}
          {item.triple && item.noBall && (
            <h1 className="w-full rounded-sm font-medium h-full bg-blue-400 ">
              NB 3
            </h1>
          )}
          {item.triple && item.byes && (
            <h1 className="w-full rounded-sm font-medium h-full ">B 3</h1>
          )}
          {item.four && item.isWicket && (
            <h1 className="w-full rounded-sm font-medium h-full bg-red-700 ">
              W 4
            </h1>
          )}
          {item.four && item.noBall && (
            <h1 className="w-full rounded-sm font-medium h-full bg-green-600 ">
              NB 4
            </h1>
          )}
          {item.four && item.wide && (
            <h1 className="w-full rounded-sm font-medium h-full bg-green-600">
              WD 4
            </h1>
          )}
          {item.four && item.byes && (
            <h1 className="w-full rounded-sm font-medium h-full bg-green-600 ">
              B 4
            </h1>
          )}
          {item.six && item.noBall && (
            <h1 className="w-full rounded-sm font-medium bg-green-600 h-full ">
              NB 6
            </h1>
          )}
          {item.isWicket &&
            !item.single &&
            !item.double &&
            !item.triple &&
            !item.four &&
            !item.six &&
            !item.byes &&
            !item.wide &&
            !item.noBall && (
              <h1 className="w-full rounded-sm font-medium bg-red-700 h-full ">
                W
              </h1>
            )}
          {item.dot && !item.isWicket && (
            <h1 className="w-full rounded-sm font-medium h-full ">0</h1>
          )}
          {item.single &&
            !item.isWicket &&
            !item.wide &&
            !item.noBall &&
            !item.byes && (
              <h1 className="w-full rounded-sm font-medium h-full ">1</h1>
            )}
          {item.double &&
            !item.isWicket &&
            !item.wide &&
            !item.noBall &&
            !item.byes && (
              <h1 className="w-full rounded-sm font-medium h-full ">2</h1>
            )}
          {item.triple &&
            !item.isWicket &&
            !item.wide &&
            !item.noBall &&
            !item.byes && (
              <h1 className="w-full rounded-sm font-medium h-full ">3</h1>
            )}
          {item.four &&
            !item.isWicket &&
            !item.wide &&
            !item.noBall &&
            !item.byes && (
              <h1 className="w-full rounded-sm font-medium bg-green-600 h-full ">
                4
              </h1>
            )}
          {item.six && !item.noBall && (
            <h1 className="w-full rounded-sm font-medium bg-green-600 h-full ">
              6
            </h1>
          )}
          {item.wide &&
            !item.single &&
            !item.double &&
            !item.triple &&
            !item.four &&
            !item.six &&
            !item.isWicket && (
              <h1 className="w-full rounded-sm font-medium bg-blue-400 h-full ">
                WD
              </h1>
            )}
          {item.noBall &&
            !item.single &&
            !item.double &&
            !item.triple &&
            !item.four &&
            !item.six &&
            !item.isWicket && (
              <h1 className="w-full rounded-sm font-medium bg-blue-400 h-full ">
                NB
              </h1>
            )}
        </div>
      ))}
 
    </div>
  );
}

export default CurrentOverData;
