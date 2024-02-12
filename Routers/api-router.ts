const express = require("express");
const apiRouter = express.Router();
const { getAPI } = require("../Controllers/api");
const { driversRouter } = require("./drivers-router");
const { teamsRouter } = require("./teams-router");
const { racesRouter } = require("./races-router");

apiRouter.route("/").get(getAPI);
apiRouter.use("/drivers", driversRouter);
apiRouter.use("/teams", teamsRouter);
apiRouter.use("/races", racesRouter);

module.exports = { apiRouter };
