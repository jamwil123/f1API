import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";

const serviceAccount = require("../utils/f1-api-58639-firebase-adminsdk-vz3ne-62ad3d2b8d.json");

initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore();
