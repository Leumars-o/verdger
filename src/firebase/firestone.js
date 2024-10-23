import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { app } from "./config";

// initialize database
const db = getFirestore(app);

// function for uploading product details
export const handleProductUpload = async function (productObj) {
  const doc = await addDoc(collection(db, "products"), productObj);
  return doc.id;
};

export const handleUpdateProduct = async function (productId, updateValueObj) {
  const docRef = doc(db, "products", productId);
  const query = await updateDoc(docRef, updateValueObj);

  if (!query)
    throw new Error(
      "There is a problem with your internet or data doesn't exists"
    );
};

//function for getting data from firestore
export const handleGetProduct = async function () {
  const query = await getDocs(collection(db, "products"));
  if (!query)
    throw new Error(
      "There is a problem with your internet or data doesn't exist"
    );

  return query;
};
