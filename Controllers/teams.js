const {changeStringToUpperCaseFirstCharOnly} = require('../utils/utilityFunctions')
const {fetchAllTeams, fetchOneTeam} = require('../Models/teams')

const getAllTeams = (req, res, next) =>{
    fetchAllTeams().then((teams)=>{
        res.status(200).send(teams)
})
}

const getOneTeam =(req, res, next)=>{
    let teamName = changeStringToUpperCaseFirstCharOnly(req.params.teamname) 
    fetchOneTeam(teamName).then((team)=>{
        res.status(200).send(team)
    })
}

module.exports={
    getAllTeams,
    getOneTeam
}