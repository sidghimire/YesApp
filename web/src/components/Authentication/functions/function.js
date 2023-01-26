import { adminAuth } from "../../../config/adminFirebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const createNewAccount = async (email, password) => {
  await createUserWithEmailAndPassword(adminAuth, email, password);
  sendEmailVerification(adminAuth.currentUser);
  signOut(adminAuth);
};
export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(adminAuth, email, password);
};
export const signOutFromAccount = () => {
  signOut(adminAuth);
};
