import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA8AEt6aaQMoSSe5_2O6GF_Xv6Myi04kfE",
  authDomain: "digital-planner-app-fe2e7.firebaseapp.com",
  databaseURL:
    "https://digital-planner-app-fe2e7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "digital-planner-app-fe2e7",
  storageBucket: "digital-planner-app-fe2e7.firebasestorage.app",
  messagingSenderId: "1002669135887",
  appId: "1:1002669135887:web:33914eadc484d99363eb7a",
  measurementId: "G-ET4ZY6K59P",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

console.log(auth, db, storage);
