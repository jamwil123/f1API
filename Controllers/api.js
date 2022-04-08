

getAPI = (req, res, next) => {
    res.status(200).send({"temp data": 'TEMP'});
  };
  
  module.exports = { getAPI };