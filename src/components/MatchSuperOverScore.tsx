import React from "react";

interface MatchSuperOverScoreProps {
  teamSuperOverStat: {
    runs: number;
    batters?: { isOut: boolean }[];
    balls: { extras: boolean }[];
  };
  hasStarted: boolean;
  status: string;
}

const MatchSuperOverScore: React.FC<MatchSuperOverScoreProps> = ({
  teamSuperOverStat,
  hasStarted,
  status,
}) => {
  
  if (!hasStarted) {
    return (
      <h1 className="w-[49%] text-center font-medium text-white">Yet to bat</h1>
    );
  }

  return (
    <div className="w-[100%] h-full  capitalize text-sm text-center flex gap-2 items-center justify-center rounded-sm font-medium">
      <div className=" flex gap-1">
        <h1 className="tracking-widest">
          {teamSuperOverStat.runs}/
          {teamSuperOverStat.batters?.filter((batter) => batter.isOut).length ||
            0}
        </h1>
        <h1 className="font-thin">
          (
          {teamSuperOverStat.balls.filter((ball) => !ball.extras).length > 5
            ? "1/1"
            : `0.${
                teamSuperOverStat.balls.filter((ball) => !ball.extras).length
              }/1`}
          )
        </h1>
        <h1 className="px-2">
          {" "}
          {(status && teamSuperOverStat.runs>0) ?  (
            <p>
              CR:{" "}
              {(
                (teamSuperOverStat.runs / teamSuperOverStat.balls.length) *
                6
              ).toFixed(2)}
            </p>
          ):"CR : 0"}
        </h1>
      </div>
    </div>
  );
};

export default MatchSuperOverScore;
