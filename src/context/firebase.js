import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaeNwZhSpmNi3aYzDQAnqQK1MgxHOmeRA",
  authDomain: "taskmanager-5e446.firebaseapp.com",
  projectId: "taskmanager-5e446",
  storageBucket: "taskmanager-5e446.firebasestorage.app",
  messagingSenderId: "95489329299",
  appId: "1:95489329299:web:4ecd8f9ff49f318076a566",
  measurementId: "G-S5ZS2PSJN6",
};

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});