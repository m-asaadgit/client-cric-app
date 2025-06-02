
interface TossWinner {
  teamName?: string;
  elected?: "Bat First" | "Bowl First";
}

interface Ball {
  ballNumber?: number;
  batsmanName?: string;
  runs?: number;
  dot?: boolean;
  single?: boolean;
  currentTotalRuns: number,
  currentTotalWickets: number,

  double?: boolean;
  triple?: boolean;
  four?: boolean;
  six?: boolean;
  extras?: boolean;
  wide?: boolean;
  byes?: boolean;
  noBall?: boolean;
  caption?: string;
  isWicket?: boolean;
  dismissalType?:
    | "Caught"
    | "Sub Caught"
    | "Caught Behind"
    | "Yet To Bat"
    | "Bowled"
    | "Retired Hurt"
    | "Run Out"
    | "Stump Out"
    | "Not Out"
    | "LBW"
  dismissedVia?: string;
}

interface Over {
  overNumber?: {
    bowlerName?: string;
    overNumber?: number;
  };
  overCompleted?: "pending" | "ongoing" | "completed";
  balls?: Ball[];
}

interface FallOfWicket {
  batterName?: string;
  ballNumber?: number;
  runs?: number;
  wickets?: number;
}

interface Player {
  playerName?: string;
  isOut?: boolean;
  isOutSuperOver?: boolean;
  outOnBallNumber?: number;
  isTwelfthMan?: boolean;
  methodOfDismissal?:
    | "Caught"
    | "Sub Caught"
    | "Caught Behind"
    | "Yet To Bat"
    | "Bowled"
    | "Retired Hurt"
    | "Run Out"
    | "Stump Out"
    | "Not Out"
    |"LBW"
}

interface SuperOverStat {
  bowlerName?: string;
  runs?: number;
  boundaries?: number;
  batters?: {
    batsmanName: string;
    isOut?: boolean;
    runs?: number;
    ballsFaced?: number;
    methodOfDismissal?:
      | "Caught"
      | "Sub Caught"
      | "Caught Behind"
      | "Yet To Bat"
      | "Bowled"
      | "Retired Hurt"
      | "Run Out"
      | "Stump Out"
      | "Not Out"
      |"LBW"

  };
  balls?: Ball[];
}
 interface Extras {
    byes: number;
    wides: number;
    noBalls: number;
  }
// 

 interface TeamBowlerStats {
    teamName: string;
    aTeamBowlingStats: BowlerStats[];
    bTeamBowlingStats: BowlerStats[];
  }
  interface BowlerStats {
    playerName: string;
    oversBowled: number;
    ballsBowled: number;
    runsConceded: number;
    wickets: { batterName?: string }[];
    noBalls: number;
    wides: number;
    maidens: number;
    economyRate: number;
  }
 interface PlayerStats {
    playerName: string;
    wicketTaker?: string;
    runs: number;
    ballsFaced: number;
    dot: number;
    fours: number;
    sixes: number;
    singles: number;
    doubles: number;
    triples: number;
    isOut: boolean;
    methodOfDismissal: "Caught" | "Sub Caught" | "Caught Behind" | "Yet To Bat" | "Bowled" | "Retired Hurt" | "Run Out" | "Stump Out" | "Not Out"     |"LBW"
    ;
    dismissedVia?: string | null;
  }
  
interface TeamBatterStats {
    teamName: string;
    ballsFaced: number;
    ballsYetToFace: number;
    totalRuns: number;
    totalWickets: number;
    inningComplete: boolean;
    aTeambattingStats: PlayerStats[];
    bTeambattingStats: PlayerStats[];
  }

  
interface Match {
    hostDetail: string;
    matchType?: string;
    teamAName: string;
    teamBName: string;
    addNewBatter?: boolean;
    chooseNextBowler?: boolean;
    isSuperOver?: boolean;
    resultMessege?: string;
    firstInningStarted?: boolean;
    secondInningStarted?: boolean;
    firstInningStartedOfSuperOver?: boolean;
    secondInningStartedOfSuperOver?: boolean;
    firstInningEnded?: boolean;
    secondInningEnded?: boolean;
    firstInningEndedOfSuperOver?: boolean;
    secondInningEndedOfSuperOver?: boolean;
    timing?: Date;
    overs: number;
    playersAside?: number;
    tossWinner?: TossWinner;
    aTeamInning?: Over[];
    bTeamInning?: Over[];
    aTeamFallOfWicket?: FallOfWicket[];
    bTeamFallOfWicket?: FallOfWicket[];
    aTeamPlayers?: Player[];
    bTeamPlayers?: Player[];
    aTeamSuperOverStat?: SuperOverStat;
    bTeamSuperOverStat?: SuperOverStat;
    aTeamBatterStats: TeamBatterStats;
    bTeamBatterStats: TeamBatterStats;
    aTeamBowlerStats: TeamBowlerStats;
    bTeamBowlerStats: TeamBowlerStats;
    aTeamExtras: Extras;
    bTeamExtras: Extras;
    status: "Not Started" | "In Progress" | "Completed";
    winner?: string | null;
    tournamentId?: string;
    seriesId?: string;
    MOM?: { playerName: string };
    createdAt?: string;
    updatedAt?: string;
  }
export default Match;
