const express = require("express");
const { getAllTeams } = require("../Controllers/teams");
const teamsRouter = express.Router();

teamsRouter.route("/").get(getAllTeams)


module.exports = {teamsRouter}
