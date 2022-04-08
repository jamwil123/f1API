const express = require("express");
const apiRouter = express.Router();
const { getAPI } = require('../Controllers/api')
const {driversRouter} = require("./drivers-router")



apiRouter.route("/").get(getAPI)
apiRouter.use("/drivers", driversRouter);



module.exports = { apiRouter };