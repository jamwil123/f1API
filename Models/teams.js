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

// Deletes a key on the teams object. Example: deletes `"Years in F1": "1"` recursively from all teams

const removeTeamsData = (rawData) =>{
    return db
    .collection("teams")
    .get()
    .then((res) => {
      return Promise.all(res.docs.map((teams) => {
        let teamsObj = {...teams.data()}
        let nameOfTeam = teams.id
        Object.keys(rawData).forEach((x)=>{
            delete teamsObj[x]
        })
        return db
        .collection('teams')
        .doc(nameOfTeam)
        .set(teamsObj)
        
      }))
    });
    
}

const updateTeamsPoints = (points, teamName) =>{
    return db
    .collection('teams')
    .doc(teamName)
    .get()
    .then((res)=>{
        if(res.data() == undefined){
            throw new Error('team does not exist')
        }
        let teamObject = res.data()
        teamObject['constructors-points'] += points 
        return db
        .collection('teams')
        .doc(teamName)
        .set(teamObject).then(()=>{

            return db
            .collection("teams")
            .doc(teamName)
            .get()
            .then((res)=>{
                return res.data()

            })

            })
        })
}


const updateTeamData = (teamData, teamName)=>{
    return db
    .collection('teams')
    .doc(teamName)
    .get()
    .then((res)=>{
        if(res.data() == undefined){
            throw new Error('team does not exist')
        }
        let oldTeamData = {...res.data()}
        teamData.forEach((key)=>{
            let newKeys = Object.keys(key)
            oldTeamData[newKeys] = key[newKeys]
        })
        return oldTeamData
    }).then((res)=>{
        return db
        .collection('teams')
        .doc(teamName)
        .set(res)
        }).then(()=>{
            return db
            .collection("teams")
            .doc(teamName)
            .get()
            .then((res)=>{
                return [{[`${teamName}`]: {...res.data()}}]

            })
        })
}



module.exports={
    fetchAllTeams,
    fetchOneTeam,
    fetchConstructors,
    removeTeamsData,
    updateTeamsPoints,
    updateTeamData
}