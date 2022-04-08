const express = require("express");
const { getAllDrivers, getSingleDrivers} = require("../Controllers/drivers");
const driversRouter = express.Router();

driversRouter.route("/").get(getAllDrivers)
driversRouter.route("/:drivername").get(getSingleDrivers)


module.exports = {driversRouter}
