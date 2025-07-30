import { useContext, useState } from 'react';
import { ListContext } from '../context/Listcontext';
import TaskItem from './Taskitem';
import ItemForm from './Itemform';

function TaskList({ listId }) {
  const { lists } = useContext(ListContext);
  const [showCompleted, setShowCompleted] = useState(true);

  const list = lists.find(l => l.id === listId);
  if (!list) return <p>List not found.</p>;

  const sortedItems = [...list.items].sort((a, b) => {
    const order = { High: 1, Medium: 2, Low: 3 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{list.name}</h2>
      <button 
        onClick={() => setShowCompleted(!showCompleted)} 
        className="mb-4 bg-gray-200 px-2 py-1 rounded"
      >
        {showCompleted ? 'Hide Completed' : 'Show Completed'}
      </button>
      <ul className="space-y-2">
        {sortedItems
          .filter(item => showCompleted || !item.completed)
          .map(item => <TaskItem key={item.id} listId={list.id} item={item} />)
        }
      </ul>
      <ItemForm listId={list.id} />
    </div>
  );
}
export default TaskList;
