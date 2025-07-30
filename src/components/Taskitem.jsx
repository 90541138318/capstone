import { useContext } from 'react';
import { ListContext } from '../context/Listcontext';

function TaskItem({ listId, item }) {
  const { toggleItem, deleteItem } = useContext(ListContext);

  return (
    <li className={`flex justify-between items-center p-2 border rounded ${item.completed ? 'bg-green-100' : ''}`}>
      <div>
        <input 
          type="checkbox" 
          checked={item.completed} 
          onChange={() => toggleItem(listId, item.id)}
          className="mr-2"
        />
        <span className={item.completed ? 'line-through' : ''}>
          {item.task} <span className="text-sm text-gray-500">({item.priority})</span>
        </span>
      </div>
      <button onClick={() => deleteItem(listId, item.id)} className="text-red-500">Delete</button>
    </li>
  );
}
export default TaskItem;
