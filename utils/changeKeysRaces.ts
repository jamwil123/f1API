import { db } from "../db/db";

interface RaceResult {
  carDriven: string;
  driversName: string;
  race: string;
  driversNumber: string;
  laps: string;
  finalTime: string;
  position: string;
  pointsEarned: string;
}

interface FinalGridItem {
  carDriven: string;
  driversName: string;
  race: string;
  driversNumber: string;
  laps: string;
  finalTime: string;
  position: string;
  pointsEarned: string;
}

interface RaceData {
  date: string;
  winner: string;
  finalGrid: FinalGridItem[];
  laps: string;
  raceName: string;
  winnerCar: string;
}

function transformKeys(obj: Record<string, any>): Record<string, any> {
  const transformedObj: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    const camelCasedKey = key
      .replace(/[-_](.)/g, (_, c) => c.toUpperCase()) // Remove hyphens and underscores, and capitalize next character
      .replace(/'/g, "") // Remove apostrophes
      .replace(/^[A-Z]/g, (c) => c.toLowerCase()); // Convert the first character to lowercase

    transformedObj[camelCasedKey] =
      typeof value === "object" ? transformKeys(value) : value;
  }

  return transformedObj;
}

async function fetchAndTransformData(): Promise<RaceData[]> {
  const collectionRef = db.collection("previous-races");
  const snapshot = await collectionRef.get();

  const raceData: RaceData[] = [];

  snapshot.forEach((doc) => {
    const originalData: Record<string, any> = doc.data();
    const transformedData: RaceData = {
      date: originalData.date,
      winner: originalData.winner,
      finalGrid: originalData["race-results"].map(
        transformKeys
      ) as FinalGridItem[],
      laps: originalData.laps,
      raceName: originalData["race-name"],
      winnerCar: originalData["winner-car"],
    };
    raceData.push(transformedData);
  });

  return raceData;
}

// Usage example
fetchAndTransformData()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching and transforming data:", error);
  });
