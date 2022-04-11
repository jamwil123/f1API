const db = require("../db/db");

const fetchAllDrivers = () =>{
    return db
    .collection('drivers')
    .get()
    .then((res)=>{
        const finalDrivers = []
        res.docs.map((drivers)=>{
            finalDrivers.push({name: drivers["_ref"]["_path"]["segments"][1], ...drivers.data()})
        })
        
        return finalDrivers
    })


   
}

const fetchOneDriver = (driversName) =>{
    return db
    .collection('drivers')
    .doc(driversName)
    .get()
    .then((res)=>{
        if(res.data() == undefined){
            return Promise.reject({status: 404, msg: 'Drivers Name Not Found!'})
        }
        let finalObject = {[driversName]: res.data()}
        return finalObject
    })
        
}
module.exports = {fetchAllDrivers, fetchOneDriver}