interface data {
  dismissedVia?: string;
  methodOfDismissal: string;
  wicketTaker?: string;
}
function OutViaCard({ dismissedVia, methodOfDismissal, wicketTaker }: data) {
  return (
    <div className="w-[100%]  text-[#e5dfdf] font-normal text-[12px] pl-1 flex items-center">
      {methodOfDismissal == "Sub Caught" && <h1> Sub C {wicketTaker}</h1>}{" "}
      {methodOfDismissal == "LBW" && <h1> lbw b {wicketTaker}</h1>}{" "}
      {methodOfDismissal == "Caught" && (
        <h1>
          {" "}
          B {wicketTaker} C {dismissedVia}
        </h1>
      )}{" "}
      {methodOfDismissal == "Caught Behind" && (
        <h1>
          {" "}
          Wk {dismissedVia}  B {wicketTaker}
        </h1>
      )}{" "}
      {methodOfDismissal == "Bowled" && <h1> B {wicketTaker}</h1>}{" "}
      {methodOfDismissal == "Retired Hurt" && <h1> Retired Hurt</h1>}{" "}
      {methodOfDismissal == "Run Out" && <h1> Run Out {dismissedVia}</h1>}{" "}
      {methodOfDismissal == "Stump Out" && (
        <h1>
          {" "}
          St {dismissedVia} B {wicketTaker} 
        </h1>
      )}{" "}
      {methodOfDismissal == "Not Out" && (
        <h1>
          {" "}
Not Out        </h1>
      )}
    </div>
  );
}

export default OutViaCard;
