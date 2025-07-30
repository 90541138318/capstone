import React, { createContext, useState, useEffect } from "react";

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState(() => {
    // Load from localStorage on initial render
    const savedLists = localStorage.getItem("lists");
    return savedLists ? JSON.parse(savedLists) : [];
  });

  // Save to localStorage whenever lists change
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  const addList = (name) => {
    setLists([...lists, { id: Date.now(), name, items: [] }]);
  };

  const deleteList = (id) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  const addItem = (listId, task, priority) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: [
                ...list.items,
                { id: Date.now(), task, priority, completed: false },
              ],
            }
          : list
      )
    );
  };

  const toggleItem = (listId, itemId) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : list
      )
    );
  };

  const deleteItem = (listId, itemId) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.filter((item) => item.id !== itemId),
            }
          : list
      )
    );
  };

  return (
    <ListContext.Provider
      value={{ lists, addList, deleteList, addItem, toggleItem, deleteItem }}
    >
      {children}
    </ListContext.Provider>
  );
};
