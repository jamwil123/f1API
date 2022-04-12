const db = require("../db/db");

const fetchAllTeams = ()=>{
    return db
    .collection('drivers')
    .get()
    .then((res)=>{
        const finalDrivers = []
        res.docs.map((drivers)=>{
            if(finalDrivers.filter((x)=>drivers.data().Team == x.Team).length < 1)
            finalDrivers.push(drivers.data())
        })
        return finalDrivers
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

module.exports={
    fetchAllTeams,
    fetchOneTeam
}