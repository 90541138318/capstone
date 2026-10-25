import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

// ---------- LISTS ----------

export const listenToLists = (callback) => {
  return onSnapshot(
    collection(db, "lists"),
    (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      data.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
      );
      callback(data);
    },
    (err) => console.error("listenToLists error:", err)
  );
};

export const addList = async (name) => {
  await addDoc(collection(db, "lists"), {
    name: name.trim(),
    createdAt: serverTimestamp(),
  });
};

export const deleteList = async (listId) => {
  // delete the items inside first, then the list itself
  const itemsSnap = await getDocs(collection(db, "lists", listId, "items"));
  await Promise.all(itemsSnap.docs.map((d) => deleteDoc(d.ref)));
  await deleteDoc(doc(db, "lists", listId));
};

// ---------- ITEMS ----------

export const listenToItemsByList = (listId, callback) => {
  return onSnapshot(
    collection(db, "lists", listId, "items"),
    (snap) => {
      callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    },
    (err) => console.error("listenToItemsByList error:", err)
  );
};

export const addItemToList = async (listId, item) => {
  await addDoc(collection(db, "lists", listId, "items"), {
    task: item.task,
    priority: item.priority || "Medium",
    completed: false,
    createdAt: serverTimestamp(),
  });
};

export const toggleItemCompletion = async (listId, itemId, currentCompleted) => {
  await updateDoc(doc(db, "lists", listId, "items", itemId), {
    completed: !currentCompleted,
  });
};

export const deleteItem = async (listId, itemId) => {
  await deleteDoc(doc(db, "lists", listId, "items", itemId));
};