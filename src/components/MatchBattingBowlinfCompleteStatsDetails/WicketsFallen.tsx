import { RxDotFilled } from "react-icons/rx";

interface WicketsFallenArray {
  ballNumber: number;
  runs: number;
  wickets: number;
  batterName: string;
}

interface WicketsFallenProps {
  fallOfWickets: WicketsFallenArray[];
}

function WicketsFallen({ fallOfWickets }: WicketsFallenProps) {

  return (
    <div className="w-full mb-2">
      Fall Of Wicket
      <div className="flex items-center w-full" >
      {fallOfWickets?.map((item, index) => {
        const overs = Math.floor(item.ballNumber / 6); // Get overs
        const balls = item.ballNumber % 6; // Get remaining balls
        const [firstName, lastName] = item.batterName.split(" ");
        return (
          <div className="flex pl-2 gap-2" key={index}>
            {index !== 0 && <RxDotFilled className="mt-1" ></RxDotFilled>}
            <h1 className="text-sm">
              {item.runs}/{item.wickets}
            </h1>
            <h1 className="text-sm">
              (
              {firstName[0]}{" "}
              {lastName ? lastName : ""}, {overs}.{balls})
            </h1>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default WicketsFallen;
