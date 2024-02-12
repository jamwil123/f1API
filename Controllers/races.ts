import { fetchRace, fetchRaceByName } from "../Models/races";
import {
  hyphenToCamelCase,
  formatSnakeCaseToTitleCase,
  formatFirstCharToUppercase,
} from "../utils/utilityFunctions";

export const getRace = (req, res, next) => {
  const year = req.params.raceYear;
  fetchRace(year).then((race) => {
    res.status(200).send(race);
  });
};
export const getRaceByName = (req, res, next) => {
  const { raceYear, raceName } = req.params;
  fetchRaceByName(parseInt(raceYear), raceName)
    .then((race) => {
      res.status(200).send(race);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};
