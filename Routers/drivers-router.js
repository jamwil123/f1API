const express = require("express");
const { getAllDrivers, getSingleDrivers, postNewData} = require("../Controllers/drivers");
const driversRouter = express.Router();

driversRouter.route("/").get(getAllDrivers)
driversRouter.route("/data/add_data").post(postNewData)
driversRouter.route("/:drivername").get(getSingleDrivers)


module.exports = {driversRouter}
