import firebase from "firebase";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCCi-U3JKSaSO8bgk7lNJ0ARvAHFV8W1M",
  authDomain: "trenscendence-156e7.firebaseapp.com",
  projectId: "trenscendence-156e7",
  storageBucket: "trenscendence-156e7.appspot.com",
  messagingSenderId: "988574834185",
  appId: "1:988574834185:web:2923f617c688b33dd0a2d8",
  measurementId: "G-ZM3NS7D6E4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);