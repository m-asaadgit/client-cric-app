interface extras {
  byes: number;
  wides: number;
  noBalls: number;
}
function BattingTeamExtraRunsCard({ extras }: extras) {
  return (
    <div className="w-full flex py-2 items-center ">
      <h1 className="w-[48%]">Extras</h1>
      <div className="w-[52%] flex gap-2 items-center">
        <h1>
          {extras.byes + extras.wides + extras.noBalls > 0 &&
            extras.byes + extras.wides + extras.noBalls}
        </h1>
        {extras.byes === 0 && extras.wides === 0 && extras.noBalls === 0 && (
          <h1 className="text-sm text-gray-300">No extras</h1>
        )}
        {extras.byes + extras.wides + extras.noBalls > 0&&
          <div>{"( "}
           <span className="text-sm text-gray-300">
             {extras.wides>0?(`${extras.wides}`):(`0 wides`)}    
           </span>
         
         {extras.byes > 0 && (
           <span className="text-sm text-gray-300">
             ,{extras.byes} bye
           </span>
         )}
        
         {extras.noBalls > 0 && (
           <span className="text-sm text-gray-300">
             ,{extras.noBalls} no ball
           </span>
         )}
         {" )"}
       </div>}
     
          
      </div>
    </div>
  );
}

export default BattingTeamExtraRunsCard;
