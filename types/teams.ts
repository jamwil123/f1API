export interface Team {
  chassis: string;
  currentDrivers: string[];
  firstEntry: number;
  fullTeamName: string;
  highestRaceFinish: number;
  powerUnit: string;
  teamBase: string;
  teamChief: string;
  technicalChief: string;
  totalFastestLaps: number;
  totalPolePositions: number;
  totalWins: number;
  worldConstructorChampionships: number;
}

export interface Teams {
  name: Team[];
}

export interface TeamStandings {
  name: string;
  points: number;
}
