const {
  fetchAllDrivers,
  fetchOneDriver,
  putNewData,
  removeDriversData,
  changeDriverKeys,
} = require("../Models/drivers");
const {
  changeStringToUpperCaseFirstCharOnly,
} = require("../utils/utilityFunctions");

const getAllDrivers = (req, res, next) => {
  ("drivers contorller");
  fetchAllDrivers().then((drivers) => {
    drivers;
    res.status(200).send(drivers);
  });
};

const getSingleDrivers = (req, res, next) => {
  let driverName = changeStringToUpperCaseFirstCharOnly(req.params.drivername);
  fetchOneDriver(driverName)
    .then((driver) => {
      res.status(200).send([driver]);
    })
    .catch(({ msg, status }) => {
      res.status(status).send(msg);
    });
};

const postNewData = (req, res, next) => {
  let rawPostData = req.body;
  putNewData(rawPostData)
    .then((dataWritten) => {
      res.status(201).send(dataWritten);
    })
    .catch(() => {
      res.status(400).send("Data not written");
    });
};

const deleteDriversData = (req, res, next) => {
  let rawData = req.body;
  removeDriversData(rawData)
    .then((data) => {
      res.status(200).send("Resource deleted successfully");
    })
    .catch(() => {
      res.status(400).send("Resource not deleted");
    });
};
const updateDriverKeys = (req, res, next) => {
  changeDriverKeys().then((drivers) => {
    res.status(200).send(drivers);
  });
};

module.exports = {
  getAllDrivers,
  getSingleDrivers,
  postNewData,
  deleteDriversData,
  updateDriverKeys,
};
