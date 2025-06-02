import { useEffect, useState } from "react";

interface Data {
  runs: number;
  balls: number;
  messege?: string;
}

function RunsNeeded({ runs, balls, messege }: Data) {
  const [rr, setRr] = useState<number>(0);
  useEffect(() => {
    runs && balls && setRr((runs / balls) * 6);
  }, [runs, balls]);
  return (
    <div className="w-full h-fit text-center text-gray-400">
      {messege ? (
        <h1>{messege}</h1>
      ) : (
        <h1>
          {runs} runs needed at {balls} {balls>1?`balls`:"ball"} (RR : {(rr).toFixed(2)}) 
        </h1>
      )}
    </div>
  );
}

export default RunsNeeded;
