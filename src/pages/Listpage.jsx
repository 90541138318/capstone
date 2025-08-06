import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ListContext } from "../context/Listcontext";
import { Container, Form, Button, ListGroup, Row, Col } from "react-bootstrap";

const Listpage = () => {
  const { listId } = useParams();
  const { lists, addItem, toggleItem, deleteItem } = useContext(ListContext);
  const list = lists.find((l) => l.id === parseInt(listId));
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [showCompleted, setShowCompleted] = useState(true);

  if (!list) {
    return (
      <Container className="py-4">
        <p className="text-danger">List not found.</p>
        <Link to="/lists" className="btn btn-outline-primary mt-3">
          ← Back to Lists
        </Link>
      </Container>
    );
  }

  const handleAddItem = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    addItem(list.id, task, priority);
    setTask("");
    setPriority("Medium");
  };

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  const sortedItems = [...list.items].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  const visibleItems = showCompleted
    ? sortedItems
    : sortedItems.filter((item) => !item.completed);

  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-3">{list.name}</h2>
      <Link to="/lists" className="btn btn-link mb-3">
        ← Back to Lists
      </Link>

      {/* Add Item Form */}
      <Form onSubmit={handleAddItem} className="mb-4">
        <Row className="g-2 align-items-center">
          <Col xs={12} md={6}>
            <Form.Control
              type="text"
              placeholder="Item task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </Col>
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
          <Col xs={12} md={3}>
            <Button type="submit" variant="primary" className="w-100">
              Add Item
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Show Completed Toggle */}
      <Form.Check
        type="checkbox"
        id="showCompletedCheckbox"
        label="Show Completed"
        checked={showCompleted}
        onChange={() => setShowCompleted(!showCompleted)}
        className="mb-3"
      />

      {/* List Items */}
      {visibleItems.length === 0 ? (
        <p className="text-muted">No items yet.</p>
      ) : (
        <ListGroup>
          {visibleItems.map((item) => (
            <ListGroup.Item
              key={item.id}
              className="d-flex justify-content-between align-items-center"
              variant={item.completed ? "secondary" : undefined}
            >
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.task} (Priority: <strong>{item.priority}</strong>)
              </span>
              <div
                className="btn-group btn-group-sm"
                role="group"
                aria-label="item actions"
              >
                <Button
                  variant={item.completed ? "warning" : "success"}
                  onClick={() => toggleItem(list.id, item.id)}
                >
                  {item.completed ? "Undo" : "Complete"}
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => deleteItem(list.id, item.id)}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Listpage;
