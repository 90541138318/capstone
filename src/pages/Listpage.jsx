import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ListContext } from "../context/Listcontext";
import { Container, Form, Button, Row, Col, ProgressBar } from "react-bootstrap";

const Listpage = () => {
  const { listId } = useParams();
  const {
    lists,
    items,
    fetchItems,
    addItemToList,
    toggleItemCompletion,
    deleteItem,
  } = useContext(ListContext);

  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    const unsubscribe = fetchItems(listId);
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [listId]);

  const list = lists.find((l) => l.id === listId);

  if (!list) {
    return (
      <Container style={{ maxWidth: 760 }}>
        <p className="text-muted">Loading list...</p>
        <Link to="/lists">← Back to Lists</Link>
      </Container>
    );
  }

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    await addItemToList(list.id, { task: task.trim(), priority });
    setTask("");
    setPriority("Medium");
  };

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  const sortedItems = [...items].sort(
    (a, b) => (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)
  );
  const visibleItems = showCompleted
    ? sortedItems
    : sortedItems.filter((item) => !item.completed);

  const total = items.length;
  const doneCount = items.filter((i) => i.completed).length;
  const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  return (
    <Container style={{ maxWidth: 760 }}>
      <Link to="/lists" className="text-decoration-none">
        ← Back to Lists
      </Link>

      <div className="mt-2 mb-3">
        <h1 className="page-title">{list.name}</h1>
        <p className="page-sub">
          {doneCount} of {total} completed
        </p>
      </div>

      <ProgressBar now={percent} className="mb-4" />

      <Form onSubmit={handleAddItem} className="surface p-3 mb-4">
        <Row className="g-2">
          <Col xs={12} md={6}>
            <Form.Control
              type="text"
              placeholder="What needs to be done?"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </Col>
          <Col xs={6} md={3}>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Form.Select>
          </Col>
          <Col xs={6} md={3}>
            <Button type="submit" variant="primary" className="w-100">
              + Add
            </Button>
          </Col>
        </Row>
      </Form>

      <Form.Check
        type="switch"
        id="showCompletedSwitch"
        label="Show completed"
        checked={showCompleted}
        onChange={() => setShowCompleted(!showCompleted)}
        className="mb-3"
      />

      {visibleItems.length === 0 ? (
        <div className="surface empty-state">
          <p className="mb-0">Nothing here yet. Add your first item above.</p>
        </div>
      ) : (
        visibleItems.map((item) => (
          <div
            key={item.id}
            className={`surface task-row priority-${item.priority} ${
              item.completed ? "done" : ""
            }`}
          >
            <div className="d-flex align-items-center gap-3">
              <Form.Check
                type="checkbox"
                checked={!!item.completed}
                onChange={() =>
                  toggleItemCompletion(list.id, item.id, item.completed)
                }
                aria-label="Mark complete"
              />
              <span className="task-text">{item.task}</span>
              <span className={`pill pill-${item.priority}`}>{item.priority}</span>
            </div>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => deleteItem(list.id, item.id)}
            >
              Delete
            </Button>
          </div>
        ))
      )}
    </Container>
  );
};

export default Listpage;