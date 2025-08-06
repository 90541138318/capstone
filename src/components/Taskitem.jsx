import { useContext } from 'react';
import { ListContext } from '../context/Listcontext';
import { ListGroup, Form, Badge, Button } from 'react-bootstrap';

function TaskItem({ listId, item }) {
  const { toggleItem, deleteItem } = useContext(ListContext);

  return (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-center"
      variant={item.completed ? 'success' : ''}
    >
      <div className="d-flex align-items-center">
        {/* Checkbox */}
        <Form.Check
          type="checkbox"
          checked={item.completed}
          onChange={() => toggleItem(listId, item.id)}
          className="me-2"
        />

        {/* Task text with strike-through if completed */}
        <span className={item.completed ? 'text-decoration-line-through' : ''}>
          {item.task}{' '}
          <Badge
            bg={
              item.priority === 'High'
                ? 'danger'
                : item.priority === 'Medium'
                ? 'warning'
                : 'secondary'
            }
          >
            {item.priority}
          </Badge>
        </span>
      </div>

      {/* Delete button */}
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => deleteItem(listId, item.id)}
      >
        Delete
      </Button>
    </ListGroup.Item>
  );
}

export default TaskItem;
