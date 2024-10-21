import { addDoc, collection, getFirestore } from "firebase/firestore";
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
