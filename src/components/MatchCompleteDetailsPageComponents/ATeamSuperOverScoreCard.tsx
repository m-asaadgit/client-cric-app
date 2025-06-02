interface BatterStat {
  batsmanName: string;
  runs: number;
  ballsFaced: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isOut: boolean;
  methodOfDismissal?: "Caught" | "Sub Caught" | "Caught behind" | "Yet to bat" | "Bowled" | "Retired hurt" | "Run out" | "Stump out" | "Not out";
  dismissedVia?: string;
}
interface OverDetail {
  bowlerName: string;
  overNumber: number;
}

interface BallDetail {
  ballNumber: number;
  batsmanName: string;
  runs: number;
  dot: boolean;
  single: boolean;
  double: boolean;
  triple: boolean;
  four: boolean;
  six: boolean;
  extras: boolean;
  caption?: string;
  isWicket: boolean;
  dismissalType: "Caught" | "Sub Caught" | "Caught behind" | "yet to bat" | "Bowled" | "retired hurt" | "Run out" | "stump out" | "Not out";
  dismissedVia?: string;
}

interface Inning {
  overNumber: OverDetail;
  overCompleted: "pending" | "ongoing" | "completed";
  balls: BallDetail[];
}

interface Player {
  playerName: string;
  isOut: boolean;
  isTwelfthMan: boolean;
}

interface TossWinner {
  teamName: string;
  elected: "batFirst" | "bowlFirst";
}

interface SuperOverStat {
  bowlerName: string;
  runs: number;
  batters: {
    batsmanName: string;
    runs: number;
    ballsFaced: number;
    isOut: boolean;
    methodOfDismissal: "Caught" | "Sub Caught" | "Caught behind" | "Yet to bat" | "Bowled" | "retired hurt" | "Run out" | "stump out" | "Not out";
  }[];
  overComplete: boolean;
  balls: BallDetail[];
}
interface MatchData {
  hostDetail: string;
  matchType?: string;
  teamAName: string;
  resultMessage?: string;
  teamBName: string;
  firstInningStarted: boolean;
  secondInningStarted: boolean;
  firstInningStartedOfSuperOver: boolean;
  secondInningStartedOfSuperOver: boolean;
  timing?: Date;
  overs: number;
  playersAside: number;
  tossWinner?: TossWinner;
  aTeamInning: Inning[];
  bTeamInning: Inning[];
  aTeamPlayers: Player[];
  bTeamPlayers: Player[];
  isSuperOver: boolean;
  aTeamSuperOverStat?: SuperOverStat;
  bTeamSuperOverStat?: SuperOverStat;
  aTeamBatterStats: BatterStat[];
  bTeamBatterStats: BatterStat[];
}
function ATeamSuperOverScoreCard() {
  return (
    <div className='min-w-[25%]' >
      ATeamSuperOverScoreCard
    </div>
  )
}

export default ATeamSuperOverScoreCard
