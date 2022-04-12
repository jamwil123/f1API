const {
  changeStringToUpperCaseFirstCharOnly,
} = require("../utils/utilityFunctions");
const {
  fetchAllTeams,
  fetchOneTeam,
  fetchConstructors,
} = require("../Models/teams");

const getAllTeams = (req, res, next) => {
  fetchAllTeams().then((teams) => {
    res.status(200).send(teams);
  });
};

const getOneTeam = (req, res, next) => {
  let teamName = changeStringToUpperCaseFirstCharOnly(req.params.teamname);
  fetchOneTeam(teamName).then((team) => {
    res.status(200).send(team);
  });
};

const getConstructors = (req, res, next) => {
  const sortBy = req.query
  fetchConstructors(sortBy).then((con) => {
      res.status(200).send(con)
  }).catch(({msg, status})=>{
    res.status(status).send(msg)
})
};

module.exports = {
  getAllTeams,
  getOneTeam,
  getConstructors,
};
