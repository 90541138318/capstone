// src/context/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyG_x3QMa5KnCwunRrPin-lk6fpZjqIs0",
  authDomain: "fir-app-d852a.firebaseapp.com",
  projectId: "fir-app-d852a",
  storageBucket: "fir-app-d852a.firebasestorage.app",
  messagingSenderId: "285173661535",
  appId: "1:285173661535:web:4f8383903ac486c15680ea"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn("Offline persistence failed: Multiple tabs open");
  } else if (err.code === 'unimplemented') {
    console.warn("Offline persistence not available in this browser");
  }
});

export { db };
