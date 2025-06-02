
interface BattingAndBowlingProps {
  data: string[]; // Ensuring `data` is an array of strings
  stateType:string
}

function BattingAndBowlingDataColoumn({ data ,stateType}: BattingAndBowlingProps) {
  return (
    <div className="w-full border-b-[#4d4e50]  border-b-[2px] h-[30px] flex">
      <h1 className="w-[45%] capitalize  flex items-center">{stateType}</h1>
      <ul className="w-[55%]  flex justify-end items-center pr-2">
        {data.map((item, index) => (
          <li key={index} className={`p-2 ${index==data.length-1?"w-[28%]":"w-[18%]"} center text-white text-sm`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BattingAndBowlingDataColoumn;
