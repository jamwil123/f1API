const {fetchAllDrivers, fetchOneDriver} = require('../Models/drivers')
const {changeStringToUpperCaseFirstCharOnly} = require('../utils/utilityFunctions')


const getAllDrivers = (req, res, next) =>{
    fetchAllDrivers().then((drivers) => {
        res.status(200).send(drivers);
      })
}

const getSingleDrivers = (req, res, next) =>{
    let driverName = changeStringToUpperCaseFirstCharOnly(req.params.drivername)
    fetchOneDriver(driverName).then((driver)=>{
        res.status(200).send([driver])
    }).catch(({msg, status})=>{
        res.status(status).send(msg)
    })
}

module.exports = {getAllDrivers, getSingleDrivers}