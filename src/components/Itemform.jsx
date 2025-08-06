import { useState, useContext } from 'react';
import { ListContext } from '../context/Listcontext';
import { Form, Button, Row, Col } from 'react-bootstrap';

function ItemForm({ listId }) {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium'); // Default to "Medium"
  const { addItem } = useContext(ListContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addItem(listId, task, priority);
      setTask('');
      setPriority('Medium');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
      <Row className="g-2">
        {/* Task Input */}
        <Col xs={12} md={6}>
          <Form.Control
            type="text"
            placeholder="New task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </Col>

        {/* Priority Dropdown */}
        <Col xs={12} md={3}>
          <Form.Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Form.Select>
        </Col>

        {/* Add Button */}
        <Col xs={12} md={3}>
          <Button type="submit" variant="success" className="w-100">
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default ItemForm;
