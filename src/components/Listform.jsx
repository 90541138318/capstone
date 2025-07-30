import { useState, useContext } from 'react';
import { ListContext } from '../context/Listcontext';

function ListForm() {
  const [name, setName] = useState('');
  const { addList } = useContext(ListContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addList(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New list name"
        className="border p-2 flex-grow"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add List</button>
    </form>
  );
}
export default ListForm;
