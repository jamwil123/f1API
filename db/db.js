const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require("../utils/f1-api-58639-2a721b987629.json");



initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();


module.exports = db; 
