import { useContext, useState } from 'react';
import { ListContext } from '../context/Listcontext';
import TaskItem from './Taskitem';
import ItemForm from './Itemform';
import { ListGroup, Button } from 'react-bootstrap';

function TaskList({ listId }) {
  const { lists } = useContext(ListContext);
  const [showCompleted, setShowCompleted] = useState(true);

  const list = lists.find((l) => l.id === listId);
  if (!list) return <p className="text-danger">List not found.</p>;

  const sortedItems = [...list.items].sort((a, b) => {
    const order = { High: 1, Medium: 2, Low: 3 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div>
      {/* List Name */}
      <h2 className="fw-bold mb-3">{list.name}</h2>

      {/* Toggle Button */}
      <Button
        variant="secondary"
        size="sm"
        className="mb-3"
        onClick={() => setShowCompleted(!showCompleted)}
      >
        {showCompleted ? 'Hide Completed' : 'Show Completed'}
      </Button>

      {/* Task List */}
      <ListGroup className="mb-3">
        {sortedItems
          .filter((item) => showCompleted || !item.completed)
          .map((item) => (
            <TaskItem key={item.id} listId={list.id} item={item} />
          ))}
      </ListGroup>

      {/* Add Task Form */}
      <ItemForm listId={list.id} />
    </div>
  );
}

export default TaskList;
