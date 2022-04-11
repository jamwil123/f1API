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
    .get()
    .then((teams)=>{
        const finalDrivers = []
        res.docs.map((drivers)=>{
            if(finalDrivers.filter((x)=>drivers.data().Team == x.Team).length < 1)
            finalDrivers.push(drivers.data())
        })
        
        return finalDrivers
    })
}

module.exports={
    fetchAllTeams,
    fetchOneTeam
}