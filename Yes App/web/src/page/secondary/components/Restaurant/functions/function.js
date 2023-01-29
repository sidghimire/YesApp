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

export const getTableList = async function () {
  const doc1 = collection(db, "tableList");
  const snap = await getDocs(doc1);
  const arr = [];
  snap.forEach((docs) => {
    const data = docs.data();
    arr.push(data);
  });
  arr.sort(function (a, b) {
    return a.tableNumber - b.tableNumber;
  });
  return arr;
};

export const getMenuItem = async function () {
  const doc1 = collection(db, "menu");
  const snap = await getDocs(doc1);
  const arr = [];
  snap.forEach((docs) => {
    arr.push(docs.data());
  });
  return arr;
};

const addData = async function () {};
