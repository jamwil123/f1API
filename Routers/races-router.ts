import express from "express";
import { getRace, getRaceByName } from "../Controllers/races";

const racesRouter = express.Router();

racesRouter.route("/:raceYear").get(getRace);
racesRouter.route("/:raceYear/:raceName").get(getRaceByName);

export { racesRouter };
