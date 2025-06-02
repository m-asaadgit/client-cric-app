interface TeamPlayersInterface {
  isTwelfthMan: boolean;
  isOut: boolean;
  methodOfDismissal: string;
  playerName: string;
}

interface data {
  TeamPlayers: TeamPlayersInterface[];
}
import { BsDot } from "react-icons/bs";

function YetToBat({ TeamPlayers }: data) {
  return (
    <div className="w-full py-2 flex flex-col">
      <h1 className="font-medium">Yet to bat</h1>
      <div className="w-full flex  gap-4">
        {TeamPlayers.map((item, index) => {
          return (
            <div
              key={index}
              className="w-fit pr-3 font-thin text-[#fffefa] h-fit flex  "
            >
              {item.playerName}
              {index != TeamPlayers.length - 1 && <BsDot className="mt-[5px]" ></BsDot>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default YetToBat;
