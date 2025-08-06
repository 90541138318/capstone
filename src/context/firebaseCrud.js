import { 
  collection, addDoc, deleteDoc, doc, query, where, updateDoc, onSnapshot, getDocs 
} from "firebase/firestore";
import { db } from "./firebase";

// 🔄 Real-time fetch for lists
export const listenToLists = (callback) => {
  const listsCol = collection(db, "lists");
  return onSnapshot(listsCol, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

// Add new list
export const addList = async (name) => {
  const docRef = await addDoc(collection(db, "lists"), { name });
  return docRef.id;
};

// Delete list + its items
export const deleteList = async (listId) => {
  await deleteDoc(doc(db, "lists", listId));
  const itemsQuery = query(collection(db, "items"), where("listId", "==", listId));
  const itemsSnapshot = await getDocs(itemsQuery);

  const deletePromises = itemsSnapshot.docs.map(itemDoc =>
    deleteDoc(doc(db, "items", itemDoc.id))
  );
  await Promise.all(deletePromises);
};

// 🔄 Real-time fetch for items
export const listenToItemsByList = (listId, callback) => {
  const itemsQuery = query(collection(db, "items"), where("listId", "==", listId));
  return onSnapshot(itemsQuery, (snapshot) => {
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(items.sort((a, b) => a.priority - b.priority));
  });
};

// Add item
export const addItemToList = async (listId, task, priority) => {
  await addDoc(collection(db, "items"), { listId, task, priority, completed: false });
};

// Toggle completion
export const toggleItemCompletion = async (itemId, currentStatus) => {
  const itemRef = doc(db, "items", itemId);
  await updateDoc(itemRef, { completed: !currentStatus });
};

// Delete item
export const deleteItem = async (itemId) => {
  await deleteDoc(doc(db, "items", itemId));
};
