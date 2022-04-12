const express = require("express");
const { getAllTeams, getOneTeam, getConstructors } = require("../Controllers/teams");
const teamsRouter = express.Router();

teamsRouter.route("/").get(getAllTeams);
teamsRouter.route("/constructors").get(getConstructors)
teamsRouter.route("/:teamname").get(getOneTeam)

module.exports = { teamsRouter };
