import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";

export const addJournal = async (userId, journalData) => {
  const journalsRef = collection(db, "users", userId, "journals");
  await addDoc(journalsRef, journalData);
};

export const getJournals = async (userId) => {
  const journalsRef = collection(db, "users", userId, "journals");
  const q = query(journalsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateJournal = async (userId, journalId, updatedData) => {
  const journalRef = doc(db, "users", userId, "journals", journalId);
  await updateDoc(journalRef, updatedData);
};

export const deleteJournal = async (userId, journalId) => {
  const journalRef = doc(db, "users", userId, "journals", journalId);
  await deleteDoc(journalRef);
};
