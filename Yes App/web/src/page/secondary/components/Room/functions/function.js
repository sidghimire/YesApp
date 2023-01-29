import { auth, db } from "../../../../../config/adminFirebase";
import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore/lite";

export const getRoomList = async function () {
  const occupied = [];
  const date = new Date().toISOString().split("T")[0];
  const doc2 = collection(db, "bookedRoom", date, "record");
  const q1 = query(doc2, where("status", "==", "Booked"));
  const snap2 = await getDocs(q1);
  const arr2 = [];
  snap2.forEach((docs) => {
    const data = docs.data();
    occupied.push(data.roomNumber);
    arr2.push(data);
  });
  arr2.sort(function (a, b) {
    return a.roomNumber - b.roomNumber;
  });
  const q2 = query(doc2, where("status", "==", "Reserved"));
  const snap3 = await getDocs(q2);
  const arr3 = [];
  snap3.forEach((docs) => {
    const data = docs.data();
    occupied.push(data.roomNumber);
    arr3.push(data);
  });
  arr3.sort(function (a, b) {
    return a.roomNumber - b.roomNumber;
  });

  const doc1 = collection(db, "roomList");
  var q3;
  var snap;
  if (occupied.length != 0) {
    q3 = query(doc1, where("roomNumber", "not-in", occupied));
    snap = await getDocs(q3);
  } else {
    snap = await getDocs(doc1);
  }
  const arr = [];
  snap.forEach((docs) => {
    const data = docs.data();
    arr.push(data);
  });
  arr.sort(function (a, b) {
    return a.roomNumber - b.roomNumber;
  });
  return { arr, arr2, arr3 };
};

export const addData = async function (form) {
  const date = new Date().toISOString().split("T")[0];
  const doc1 = collection(db, "bookedRoom", date, "record");
  const snap = await addDoc(doc1, form);
};
