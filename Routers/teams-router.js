const express = require("express");
const {
  getAllTeams,
  getOneTeam,
  getConstructors,
  deleteTeamsData,
  updateConstructorsPoints,
  patchTeamData,
  renameKeys,
  getTeamStandings,
} = require("../Controllers/teams");
const teamsRouter = express.Router();

teamsRouter.route("/").get(getAllTeams);
teamsRouter.route("/rename").patch(renameKeys);
teamsRouter.route("/constructors").get(getConstructors);
teamsRouter.route("/standings").get(getTeamStandings);
teamsRouter.route("/:teamname").patch(patchTeamData).get(getOneTeam);
teamsRouter.route("/data/delete_data").delete(deleteTeamsData);
teamsRouter.route("/points/:teamname").patch(updateConstructorsPoints);

module.exports = { teamsRouter };
