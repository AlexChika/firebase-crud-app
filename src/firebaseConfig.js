import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC5eGHiAVf4MoghkX61DPjcmpMwBl0v2x8",
  authDomain: "working-with-firebase-b8225.firebaseapp.com",
  databaseURL:
    "https://working-with-firebase-b8225-default-rtdb.firebaseio.com",
  projectId: "working-with-firebase-b8225",
  storageBucket: "working-with-firebase-b8225.appspot.com",
  messagingSenderId: "481592456079",
  appId: "1:481592456079:web:e6d9e406d7e5780f2391fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "users");
const docRef = (docId) => {
  return doc(db, "users", docId);
};
export { db, colRef, docRef };
