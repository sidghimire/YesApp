import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

const firebaseConfig2 = {
  apiKey: "AIzaSyDL6WyXKcJs3TEoPxdEX9nm3QS2uBi0J_U",
  authDomain: "yeshotel-sid.firebaseapp.com",
  projectId: "yeshotel-sid",
  storageBucket: "yeshotel-sid.appspot.com",
  messagingSenderId: "550217258596",
  appId: "1:550217258596:web:7cb46d9bed7087774bf171",
};

const adminApp = initializeApp(firebaseConfig2);
const adminAuth = getAuth(adminApp);
const adminDb = getFirestore(adminApp);
const adminStorage = getStorage(adminApp);

export { adminAuth, adminDb, adminStorage };
