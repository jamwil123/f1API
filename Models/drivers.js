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
module.exports = {fetchAllDrivers}