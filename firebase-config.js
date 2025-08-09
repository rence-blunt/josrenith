// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDC6sfUR6XBVsbihLY9BdIVJGfVMsH8tJM",
  authDomain: "josrenithdata.firebaseapp.com",
  projectId: "josrenithdata",
  storageBucket: "josrenithdata.firebasestorage.app",
  messagingSenderId: "927727164934",
  appId: "1:927727164934:web:571201ca8783b143c76d87",
  measurementId: "G-TV2887MC0T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
