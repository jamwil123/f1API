const {fetchAllDrivers, fetchOneDriver, putNewData} = require('../Models/drivers')
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

const postNewData = (req, res, next) => {
    let rawPostData = req.body 
    putNewData(rawPostData).then((dataWritten)=>{
        dataWritten ? res.status(201).send("Data written") : res.status(400).send('Data not written')
    }).catch(()=>{
        res.status(400).send('Data not written')
    })
}

module.exports = {getAllDrivers, getSingleDrivers, postNewData}