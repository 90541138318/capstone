import { useState, useContext } from 'react';
import { ListContext } from '../context/Listcontext';

function ItemForm({ listId }) {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium'); // Default to "Medium"
  const { addItem } = useContext(ListContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      // Ensure priority is stored as string (High/Medium/Low)
      addItem(listId, task, priority);
      setTask('');
      setPriority('Medium'); // Reset priority to default after adding
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input 
        type="text" 
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New task"
        className="border p-2 flex-grow"
      />
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)} 
        className="border p-2"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button 
        type="submit" 
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </form>
  );
}

export default ItemForm;
