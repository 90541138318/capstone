import React, { createContext, useEffect, useState } from "react";
import {
  listenToLists,
  addList,
  deleteList,
  listenToItemsByList,
  addItemToList,
  toggleItemCompletion,
  deleteItem,
} from "./firebaseCrud";

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  const [items, setItems] = useState([]);

  // Listen to all lists in real time
  useEffect(() => {
    const unsubscribe = listenToLists(setLists);
    return () => unsubscribe();
  }, []);

  // Listen to the items of one list (returns an unsubscribe function)
  const fetchItems = (listId) => {
    setItems([]);
    return listenToItemsByList(listId, setItems);
  };

  return (
    <ListContext.Provider
      value={{
        lists,
        items,
        addList,
        deleteList,
        fetchItems,
        addItemToList,
        toggleItemCompletion,
        deleteItem,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};