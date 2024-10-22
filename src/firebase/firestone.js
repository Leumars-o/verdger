import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "./config";

// initialize database
const db = getFirestore(app);

// function for uploading product details
export const handleProductUpload = async function (productObj) {
  try {
    const doc = await addDoc(collection(db, "products"), productObj);
    return doc.id;
  } catch (error) {
    throw error;
  }
};

//function for getting data from firestore
export const handleGetProduct = async function () {
  try {
    const query = await getDocs(collection(db, "products"));
    if (!query)
      throw new Error(
        "There is a problem with your internet or data doesn't exist"
      );
  } catch (error) {
    throw error;
  }
};
