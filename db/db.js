const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require("../utils/f1-api-58639-2a721b987629.json");
const drivers = require('./drivers.json')



initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();


const addData = (collection, doc, data) => {
    return db
          .collection(collection)
          .doc(doc)
          .set(data).then((res)=>{
              console.log(res)
          })
}




module.exports = db; 
