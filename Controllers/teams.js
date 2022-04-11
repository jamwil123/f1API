const {changeStringToUpperCaseFirstCharOnly} = require('../utils/utilityFunctions')
const {fetchAllTeams, fetchOneTeam} = require('../Models/teams')

const getAllTeams = (req, res, next) =>{
    fetchAllTeams().then((teams)=>{
        res.status(200).send(teams)
})
}

const getOneTeam =(req, res, next)=>{
    fetchOneTeam().then((team)=>{
        console.log(team)
    })
}

module.exports={
    getAllTeams
}