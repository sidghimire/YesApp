import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore/lite";
import { db } from "../../../../../config/adminFirebase";

export const addBankInfo = async function (bank) {
  const collection1 = collection(db, "bankInformation");
  const snap = await addDoc(collection1, bank);
};
export const addSahakariInfo = async function (bank) {
  const collection1 = collection(db, "sahakariInformation");
  const snap = await addDoc(collection1, bank);
};
export const getBankInfo = async function (bank) {
  const collection1 = collection(db, "bankInformation");
  const snap = await getDocs(collection1);
  const arr = [];
  snap.forEach((docs) => {
    arr.push(docs.data());
  });
  return arr;
};
export const getShakariInfo = async function (bank) {
  const collection1 = collection(db, "sahakariInformation");
  const snap = await getDocs(collection1);
  const arr = [];
  snap.forEach((docs) => {
    arr.push(docs.data());
  });
  return arr;
};

export const deposit = (bank) => {
  const collection1 = collection(
    db,
    "deposit",
    new Date().toISOString().split("T")[0],
    "record"
  );
  const snap = addDoc(collection1, { bank, time: serverTimestamp() });
};
