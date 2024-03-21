export interface Driver {
  WDCs: string;
  country: string;
  dateOfBirth: string;
  driversNo: string;
  grandPrixEntered: string;
  highestGridPos: string;
  highestRaceFinish: string;
  name: string;
  placeOfBirth: string;
  podiums: string;
  totalPoints: string;
  totalWins: string;
}

export interface DriversStandings {
  car: String;
  name: String;
  nationality: String;
  points: Number;
}
