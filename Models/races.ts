import { db } from "../db/db";
import {
  formatFirstCharToUppercase,
  formatSnakeCaseToTitleCase,
} from "../utils/utilityFunctions";

export const fetchRace = (year: number): Promise<any> => {
  const currentYear = new Date().getFullYear();

  if (year < 1900 || year > currentYear) {
    return Promise.reject(
      new Error(
        "Invalid year. Please provide a year between 1900 and the current year."
      )
    );
  }

  const collectionRef = db.collection("previous-races").doc(year.toString());

  return collectionRef.get().then((race) => {
    const raceData = race.data();

    if (raceData && raceData["race-results"]) {
      return raceData["race-results"];
    } else {
      return Promise.reject(
        new Error("Race data not found for the given year.")
      );
    }
  });
};

export const fetchRaceByName = async (
  year: number,
  raceName: string
): Promise<any> => {
  // Validate input parameters
  if (
    !Number.isInteger(year) ||
    year < 1900 ||
    year > new Date().getFullYear()
  ) {
    return Promise.reject(new Error("Invalid year parameter"));
  }

  if (typeof raceName !== "string") {
    return Promise.reject(new Error("Invalid raceName parameter"));
  }

  const collectionRef = db.collection("previous-races").doc(year.toString());
  const races = await collectionRef.get();

  if (!races.exists) {
    return Promise.reject(new Error(`No race data found for the year ${year}`));
  }

  if (!races.exists) {
    return Promise.reject(new Error(`No race data found for the year ${year}`));
  }

  const raceResults = races.data();

  if (!raceResults) {
    return Promise.reject(new Error("Error: race data is undefined"));
  }

  const raceNameSanitized = raceName.includes("_")
    ? formatSnakeCaseToTitleCase(raceName)
    : formatFirstCharToUppercase(raceName);

  const filteredRaces = raceResults["race-results"].filter(
    (race: any) => race["race-name"] === raceNameSanitized
  );

  return filteredRaces.length > 0
    ? filteredRaces
    : Promise.reject(new Error("Error: Likely incorrect race name"));
};
