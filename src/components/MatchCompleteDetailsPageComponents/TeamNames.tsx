interface TeamProps {
  aTeamName: string;
  bTeamName: string;
  reverse?: boolean;
}
import { TiArrowSortedDown } from "react-icons/ti";

function TeamNames({ aTeamName, bTeamName, reverse }: TeamProps) {
  if (reverse)
    return (
      <div className="w-[90%] mb-2 mx-auto h-fit flex gap-[2%] items-center">
        <h1 className="w-[49%] flex flex-col items-center justify-center gap-1 min-h-[60px] px-2 capitalize text-sm headers  text-center rounded-sm  font-semibold">
          {bTeamName}

          <TiArrowSortedDown></TiArrowSortedDown>
        </h1>
        <h1 className="w-[49%] ce%] flex flex-col items-center justify-center gap-1 min-h-[60px] px-2 capitalize headers  text-sm text-center  rounded-sm  font-semibold">
        {aTeamName}
        <TiArrowSortedDown></TiArrowSortedDown>
        </h1>
      </div>
    );
  return (
    <div className="w-[90%] mb-2 mx-auto h-fit flex gap-[2%] items-center">
      <h1 className="w-[49%] flex flex-col items-center justify-center gap-1 min-h-[60px] px-2 capitalize text-sm headers  text-center rounded-sm  font-semibold">
        {aTeamName}
        <TiArrowSortedDown></TiArrowSortedDown>
      </h1>
      <h1 className="w-[49%] ce%] flex flex-col items-center justify-center gap-1 min-h-[60px] px-2 capitalize headers  text-sm text-center  rounded-sm  font-semibold">
        {bTeamName}
        <TiArrowSortedDown></TiArrowSortedDown>
      </h1>
    </div>
  );
}

export default TeamNames;
