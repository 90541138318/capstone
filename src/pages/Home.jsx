import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ListContext } from "../context/Listcontext";

const Home = () => {
  const { lists, addList, deleteList } = useContext(ListContext);
  const [listName, setListName] = useState("");

  const handleAddList = (e) => {
    e.preventDefault();
    if (!listName.trim()) return;
    addList(listName);
    setListName("");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Lists</h2>

      {/* Form to Create List */}
      <form onSubmit={handleAddList} className="flex gap-2 mb-4">
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="Enter list name"
          className="border p-2 flex-1"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Create</button>
      </form>

      {/* List of Lists */}
      {lists.length === 0 ? (
        <p>Select or create a list to get started.</p>
      ) : (
        <ul>
          {lists.map((list) => (
            <li key={list.id} className="flex justify-between border-b py-2">
              <Link to={`/list/${list.id}`} className="text-blue-500">{list.name}</Link>
              <button onClick={() => deleteList(list.id)} className="text-red-500">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
