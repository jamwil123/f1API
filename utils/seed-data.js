const db = require('../db/db')
const {fetchAllDrivers} = require('../Models/drivers')


const seedData = (collection) =>{
    return db
    .collection('drivers')
    .get()
    .then((drivers)=>{
        const finalDrivers = []
        drivers.docs.map((drivers)=>{
            if(finalDrivers.filter((x)=>drivers.data().Team == x.Team).length < 1)
            finalDrivers.push(drivers.data())
        })
        finalDrivers.map((driver)=>{
            db
            .collection(collection)
            .doc(driver.Team)
            .set({"constructors-points": 0,
                "last-win": ''
        })
        })
    })

}

seedData('teams' )