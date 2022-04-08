const express = require("express");
const { getAllDrivers } = require("../Controllers/drivers");
const driversRouter = express.Router();

driversRouter.route("/").get(getAllDrivers)


module.exports = {driversRouter}
