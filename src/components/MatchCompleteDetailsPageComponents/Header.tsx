import { IoCaretBackOutline } from "react-icons/io5";
import AnimationLoaderForBlueBG from "../../utils/AnimationLoaderForBlueBG";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  teamAName: string;
  teamBName: string;
  loading: boolean;
  liveStatus: string;
}

function Header({ teamBName, teamAName, loading, liveStatus }: HeaderProps) {
  const navigate = useNavigate(); // Fixed naming

  return (
    <div className="w-full flex items-center justify-center bg-[#173686] h-[10vh]">
      <div className="w-[90%] rounded-sm h-[90%]">
        {loading ? (
          <AnimationLoaderForBlueBG />
        ) : (
          <div className="h-full relative font-semibold text-lg flex items-center justify-between gap-1">
            {liveStatus == "In Progress" && (
              <h1 className="absolute -top-1 right-1 font-medium tracking-wide text-sm text-green-500">
                Live
              </h1>
            )}{" "}
            {/* {liveStatus == "Not Started" && (
              <h1 className="absolute -top-1 right-1 font-medium tracking-wide text-sm text-yellow-500">
                yet to start
              </h1>
            )} */}
            <div className="h-full flex items-center">
              <div className="text-center text-lg">{teamAName}</div>
              <div className="font-bold text-sm max-w-[10%] bg-[#1d4ed8] m-2 px-1 rounded-md">
                VS
              </div>
              <div className="text-lg text-center">{teamBName}</div>
            </div>
            <button onClick={() => navigate(-1)} className="h-[70%]">
              <IoCaretBackOutline />
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Header;
