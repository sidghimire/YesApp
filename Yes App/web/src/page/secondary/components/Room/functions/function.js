import { child, get, ref, remove } from "firebase/database";
import { auth, database, db } from "../../../../../config/adminFirebase";
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
import { set } from "firebase/database";
import { async } from "@firebase/util";

export const getRoomList = async function () {
  const realRef = ref(database);
  const arr2 = [];
  const arr3 = [];
  const arr = [];
  const filterRoom = [];
  await get(child(realRef, `liveReserve/`)).then(async (snapshot) => {
    if (snapshot.exists()) {
      const keys = Object.keys(snapshot.val());
      const iterator = keys.values();
      for (var key of iterator) {
        await get(child(realRef, `liveReserve/` + key)).then((snapshot) => {
          if (snapshot.exists()) {
            arr2.push(snapshot.val());
            filterRoom.push(snapshot.val().roomNumber);
          }
        });
      }
    }
  });
  await get(child(realRef, `liveBooking/`)).then(async (snapshot) => {
    if (snapshot.exists()) {
      const keys = Object.keys(snapshot.val());
      const iterator = keys.values();
      for (var key of iterator) {
        await get(child(realRef, `liveBooking/` + key)).then((snapshot) => {
          if (snapshot.exists()) {
            arr3.push(snapshot.val());
            filterRoom.push(snapshot.val().roomNumber);
          }
        });
      }
    }
  });
  if (filterRoom.length == 0) {
    filterRoom.push("");
  }
  const doc1 = collection(db, "roomList");
  const q = query(doc1, where("roomNumber", "not-in", filterRoom));
  const snap = await getDocs(q);
  snap.forEach((docs) => {
    const data = docs.data();
    arr.push(data);
  });

  return { arr, arr3, arr2 };
};

export const addData = async function (form) {
  const ref1 = ref(database, "liveReserve/reserve" + form.roomNumber);
  await set(ref1, form);
};
export const checkIn = async function (form) {
  const location = "liveBooking/checkIn" + form.roomNumber;
  const ref1 = ref(database, location);
  await set(ref1, form);
  try {
    const ref1 = ref(database, "liveReserve/reserve" + form.roomNumber);
    await remove(ref1);
  } catch {}
};
