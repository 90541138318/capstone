import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ListContext } from "../context/Listcontext";

const Listpage = () => {
  const { listId } = useParams();
  const { lists, addItem, toggleItem, deleteItem } = useContext(ListContext);
  const list = lists.find((l) => l.id === parseInt(listId));
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium"); // ✅ Use string
  const [showCompleted, setShowCompleted] = useState(true);

  if (!list) {
    return <p>List not found.</p>;
  }

  const handleAddItem = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    addItem(list.id, task, priority); // ✅ Store priority as string
    setTask("");
    setPriority("Medium");
  };

  // ✅ Sorting priority based on defined order
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  const sortedItems = [...list.items].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  const visibleItems = showCompleted
    ? sortedItems
    : sortedItems.filter((item) => !item.completed);

  return (
    <div className="list-page">
      <h2>{list.name}</h2>
      <Link to="/" className="back-link">⬅ Back to Lists</Link>

      {/* Add Item Form */}
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Item task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit">Add Item</button>
      </form>

      {/* Show Completed Toggle */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
          Show Completed
        </label>
      </div>

      {/* List Items */}
      <ul>
        {visibleItems.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          visibleItems.map((item) => (
            <li key={item.id}>
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.task} (Priority: <strong>{item.priority}</strong>) {/* ✅ Show text */}
              </span>
              <button onClick={() => toggleItem(list.id, item.id)}>
                {item.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => deleteItem(list.id, item.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Listpage;
