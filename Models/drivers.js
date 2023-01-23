const db = require("../db/db");

const fetchAllDrivers = () => {
  return db
    .collection("drivers")
    .get()
    .then((res) => {
      const finalDrivers = [];
      res.docs.map((drivers) => {
        finalDrivers.push({
          name: drivers["_ref"]["_path"]["segments"][1],
          ...drivers.data(),
        });
      });

      return finalDrivers;
    });
};

const fetchOneDriver = (driversName) => {
  return db
    .collection("drivers")
    .doc(driversName)
    .get()
    .then((res) => {
      if (res.data() == undefined) {
        return Promise.reject({ status: 404, msg: "Drivers Name Not Found!" });
      }
      let finalObject = { [driversName]: res.data() };
      return finalObject;
    });
};

const putNewData = async (rawData) => {
  const res = await db.collection("drivers").get();

  await Promise.all(
    res.docs.map((driver) => {
      let driversObjNewFields = { ...driver.data() };
      Object.keys(rawData).map((key, i) => {
        driversObjNewFields[key] = Object.values(rawData)[i];
        return db
          .collection("drivers")
          .doc(driver["_ref"]["_path"]["segments"][1])
          .set(driversObjNewFields);
      });
    })
  )
    const finalData = await db
    .collection('drivers')
    .get()

    return finalData.docs.map((x)=>{return x.data()})
  

};

// Deletes a key on the drivers object. Example: deletes `"Years in F1": "1"` recursively from all drivers 

const removeDriversData = (rawData) =>{
    return db
    .collection("drivers")
    .get()
    .then((res) => {
      return Promise.all(res.docs.map((drivers) => {
        let driversObj = {...drivers.data()}
        Object.keys(rawData).forEach((x)=>{
            delete driversObj[x]
        })
        return db
        .collection('drivers')
        .doc(driversObj.name)
        .set(driversObj)
        
      }))
    });
    
}
module.exports = { fetchAllDrivers, fetchOneDriver, putNewData, removeDriversData };
