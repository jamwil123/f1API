export interface Team {
  chassis: string;
  currentDrivers: string[];
  firstEntry: string;
  fullTeamName: string;
  highestRaceFinish: string;
  powerUnit: string;
  teamBase: string;
  teamChief: string;
  technicalChief: string;
  totalFastestLaps: string;
  totalPolePositions: string;
  totalWins: string;
  worldConstructorChampionships: string;
}

export interface Teams {
  name: Team[];
}

export interface TeamStandings {
  name: string;
  points: number;
}
