import React from "react";
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
  const occupied = [0];
  const doc2 = collection(db, "bookedRoom");
  const q1 = query(doc2, where("status", "==", "Booked"));
  const snap2 = await getDocs(q1);
  const arr2 = [];
  snap2.forEach((docs) => {
    const data = docs.data();
    occupied.push(data.roomNo);
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
    occupied.push(data.roomNo);
    arr3.push(data);
  });
  arr3.sort(function (a, b) {
    return a.roomNumber - b.roomNumber;
  });

  const doc1 = collection(db, "roomList");
  const q3 = query(doc1, where("roomNo", "not-in", occupied));
  const snap = await getDocs(doc1);
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
