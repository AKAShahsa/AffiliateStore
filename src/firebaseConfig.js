// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDuwefOR0oGyhmIYcKX3WkBXaTn5DoxHTE",
  authDomain: "affiliate-store-5792e.firebaseapp.com",
  databaseURL: "https://affiliate-store-5792e-default-rtdb.firebaseio.com",
  projectId: "affiliate-store-5792e",
  storageBucket: "affiliate-store-5792e.appspot.com",
  messagingSenderId: "922571468296",
  appId: "1:922571468296:web:52104b59598e29c87f2bbd",
  measurementId: "G-3TJL5JDKMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, analytics, auth, database };