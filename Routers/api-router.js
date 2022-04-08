const express = require("express");
const apiRouter = express.Router();
const { getAPI } = require('../Controllers/api')



// apiRouter.use("/drivers", driversRouter);
apiRouter.route("/").get(getAPI)



module.exports = { apiRouter };