import { Firestore } from "firebase-admin/firestore";
import { Driver } from "../types/drivers";

import { db } from "../db/db";

export const fetchAllDrivers = (): Promise<Driver[]> => {
  return db
    .collection("drivers")
    .get()
    .then((res) => {
      return res.docs.map(
        (drivers) =>
          ({
            ...drivers.data(),
          } as Driver)
      );
    })
    .catch((error) => {
      console.error("Error fetching drivers:", error);
      throw error; // Re-throw the error to propagate it
    });
};

export const fetchOneDriver = async (
  driversName: string
): Promise<{ [key: string]: Driver }> => {
  return db
    .collection("drivers")
    .doc(driversName)
    .get()
    .then((res) => {
      if (res.data() === undefined) {
        return Promise.reject({ status: 404, msg: "Drivers Name Not Found!" });
      }
      let finalObject: { [key: string]: Driver } = {
        [driversName]: res.data() as Driver,
      };
      return finalObject;
    });
};

export const putNewData = async (rawData: {
  [key: string]: any;
}): Promise<Driver[]> => {
  const res = await db.collection("drivers").get();

  await Promise.all(
    res.docs.map((driver) => {
      let driversObjNewFields = { ...driver.data() };
      Object.keys(rawData).map((key, i) => {
        driversObjNewFields[key] = Object.values(rawData)[i];
        return db.collection("drivers").doc(driver.id).set(driversObjNewFields);
      });
    })
  );

  const finalData = await db.collection("drivers").get();

  return finalData.docs.map((x) => x.data() as Driver);
};

// Deletes a key on the drivers object. Example: deletes `"Years in F1": "1"` recursively from all drivers

export const removeDriversData = (rawData: {
  [key: string]: any;
}): Promise<void[]> => {
  return db
    .collection("drivers")
    .get()
    .then((res) => {
      return Promise.all(
        res.docs.map(async (drivers) => {
          let driversObj = { ...drivers.data() };
          Object.keys(rawData).forEach((x) => {
            delete driversObj[x];
          });
          await db.collection("drivers").doc(driversObj.name).set(driversObj);
        })
      );
    });
};

export const changeDriverKeys = async () => {
  try {
    const snapshot = await db.collection("drivers").get();

    const updatedDrivers = snapshot.docs.map((doc) => {
      const originalData = doc.data();
      const transformedData = transformKeys(originalData);

      // Update the document with the transformed data
      return doc.ref.set(transformedData);
    });

    // Wait for all updates to complete
    await Promise.all(updatedDrivers);
  } catch (error) {
    console.error("Error updating driver keys:", error);
  }
};

function transformKeys(obj: Record<string, any>): Record<string, any> {
  const transformedObj: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    const camelCasedKey = key
      .replace(/[-_](.)/g, (_, c) => c.toUpperCase()) // Remove hyphens and underscores, and capitalize next character
      .replace(/'/g, ""); // Remove apostrpphie

    transformedObj[camelCasedKey] =
      typeof value === "object" ? transformKeys(value) : value;
  }

  return transformedObj;
}
