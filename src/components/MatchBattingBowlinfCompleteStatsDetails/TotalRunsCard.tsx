
interface data{
    wickets?:number;
    totalRuns?:number;
    overs?:number
}
function TotalRunsCard({wickets,totalRuns,overs}:data) {
  return (
    <div className="w-full  text-sm flex py-2 ">
      <div className="w-[49%] font-medium" > 
        Total runs
      </div>
      <div className="w-[51%] gap-4 flex" > 
<h1>
{totalRuns}

</h1>(
{`${wickets ? `${wickets} wkts` : "0 wkts"} , ${overs ? `${overs} ov` : " 0 ov"}`})

      </div>
    </div>
  )
}

export default TotalRunsCard
