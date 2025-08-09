// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC6sfUR6XBVsbihLY9BdIVJGfVMsH8tJM",
  authDomain: "josrenithdata.firebaseapp.com",
  projectId: "josrenithdata",
  storageBucket: "josrenithdata.firebasestorage.app",
  messagingSenderId: "927727164934",
  appId: "1:927727164934:web:571201ca8783b143c76d87",
  measurementId: "G-TV2887MC0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);