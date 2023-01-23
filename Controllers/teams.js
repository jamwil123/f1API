const {
  changeStringToUpperCaseFirstCharOnly,
} = require("../utils/utilityFunctions");
const {
  fetchAllTeams,
  fetchOneTeam,
  fetchConstructors,
  removeTeamsData,
  updateTeamsPoints,
  updateTeamData
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

const deleteTeamsData = (req, res, next) =>{ 
  let rawData = req.body
  removeTeamsData(rawData).then((data)=>{
      res.status(200).send("Resource deleted successfully")
  }).catch(()=>{
      res.status(400).send('Resource not deleted')
  })
}

const updateConstructorsPoints = (req, res, next) =>{
  let addPoints = req.body.points
  let teamName = changeStringToUpperCaseFirstCharOnly(req.params.teamname)
  updateTeamsPoints(addPoints, teamName).then((team)=>{
    res.status(201).send(team)
  }).catch((err)=>{
    res.status(400).send(err.message)
  })
}

const patchTeamData = (req, res, next) =>{
let newTeamData = req.body 
let teamName = changeStringToUpperCaseFirstCharOnly(req.params.teamname)
updateTeamData(newTeamData, teamName).then((team)=>{
  res.status(200).send(team)
})
}

module.exports = {
  getAllTeams,
  getOneTeam,
  getConstructors,
  deleteTeamsData,
  updateConstructorsPoints,
  patchTeamData
};
