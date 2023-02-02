import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { db } from "../../../../../config/adminFirebase";

export const addPurchaseBill = async function (
  billNumber,
  billDate,
  dueDate,
  billType,
  vendorName,
  invoiceNumber,
  listInfo,
  total
) {
  const doc1 = collection(db, "purchaseBill");
  const snap = await addDoc(doc1, {
    billNumber,
    billDate,
    dueDate,
    billType,
    vendorName,
    invoiceNumber,
    total,
    list: JSON.stringify(listInfo),
  });
  const doc2 = collection(
    db,
    "dailyRecord",
    new Date(billDate).toISOString().split("T")[0],
    "record"
  );
  const snap2 = await addDoc(doc2, {
    billNumber,
    billDate,
    dueDate,
    billType,
    vendorName,
    invoiceNumber,
    total,
    list: JSON.stringify(listInfo),
  });
  for (let i = 0; i < listInfo.length; i++) {
    const doc2 = collection(db, "itemList");
    const q = query(doc2, where("itemName", "==", listInfo[i][0]));
    const snap2 = await getDocs(q);
    snap2.forEach(async (docs) => {
      const data = docs.id;
      const doc2 = doc(db, "itemList", data);
      const snap2 = await updateDoc(doc2, {
        quantity: increment(parseInt(listInfo[i][1])),
      });
    });
  }
  return true;
};
