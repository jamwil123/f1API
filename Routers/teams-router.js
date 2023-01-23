const express = require("express");
const { getAllTeams, getOneTeam, getConstructors, deleteTeamsData, updateConstructorsPoints, patchTeamData} = require("../Controllers/teams");
const teamsRouter = express.Router();

teamsRouter.route("/").get(getAllTeams);
teamsRouter.route("/constructors").get(getConstructors)
teamsRouter.route("/:teamname").patch(patchTeamData).get(getOneTeam)
teamsRouter.route("/data/delete_data").delete(deleteTeamsData)
teamsRouter.route("/points/:teamname").patch(updateConstructorsPoints)

module.exports = { teamsRouter };
