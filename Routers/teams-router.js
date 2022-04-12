const express = require("express");
const { getAllTeams, getOneTeam } = require("../Controllers/teams");
const teamsRouter = express.Router();

teamsRouter.route("/").get(getAllTeams);
teamsRouter.route("/:teamname").get(getOneTeam)

module.exports = { teamsRouter };
