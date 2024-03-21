import express from "express";
const {
  getAllDrivers,
  getSingleDrivers,
  postNewData,
  deleteDriversData,
  updateDriverKeys,
  getDriverStandings,
} = require("../Controllers/drivers");
const driversRouter = express.Router();

driversRouter.route("/").get(getAllDrivers);
driversRouter.route("/data/add_data").post(postNewData);
driversRouter.route("/data/delete_data").delete(deleteDriversData);
driversRouter.route("/rename").get(updateDriverKeys);
driversRouter.route("/standings").get(getDriverStandings);
driversRouter.route("/:drivername").get(getSingleDrivers);

module.exports = { driversRouter };
