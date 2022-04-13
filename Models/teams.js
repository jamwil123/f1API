const db = require("../db/db");

const fetchAllTeams = ()=>{
    return db
    .collection('teams')
    .get()
    .then((res)=>{
       
        return res.docs.map((drivers)=>{
            return drivers.data()
        })
        
    })
    
}


const fetchOneTeam = (teamName)=>{
    return db
    .collection('teams')
    .doc(teamName)
    .get()
    .then((teams)=>{
        return [ {[teamName]: {...teams.data()}}]
    })
}

const fetchConstructors = ({sort_by}) =>{
    if(sort_by !== 'asc' && sort_by !== 'desc' && sort_by !== undefined){
        return Promise.reject({status: 400, msg: 'Invalid sort query'})
    }
    if(sort_by == undefined){
        sort_by = 'desc'
    }
        return db
    .collection('teams')
    .get()
    .then((teams)=>{
        let teamsObject = []
    teams.docs.map((teams)=>{
        teamsObject.push({[teams["_ref"]["_path"]["segments"][1]]: {...teams.data()}})
        
    })
    return teamsObject
    }).then((teamsData)=>{
       return sort_by == "desc" ? [...teamsData].sort((a, b)=>{
            
            return a[Object.keys(a)[0]]['constructors-points'] < b[Object.keys(b)[0]]['constructors-points'] ? 1 : -1
        }) : [...teamsData].sort((a, b)=>{
            
            return a[Object.keys(a)[0]]['constructors-points'] > b[Object.keys(b)[0]]['constructors-points'] ? 1 : -1
        })
       
    })
}

module.exports={
    fetchAllTeams,
    fetchOneTeam,
    fetchConstructors
}