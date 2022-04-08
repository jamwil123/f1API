const {fetchAllDrivers} = require('../Models/drivers')


const getAllDrivers = (req, res, next) =>{
    fetchAllDrivers().then((mountains) => {
        console.log(mountains)
        res.status(200).send(mountains);
      })
}

module.exports = {getAllDrivers}