// src/components/TaskDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, Button, ListGroup, Container } from "react-bootstrap";
import Card from "./Card"; // adjust path to where your Card lives
import { db } from "../context/firebase";
import {
  doc, collection, onSnapshot, updateDoc, addDoc, deleteDoc,
  query, orderBy, serverTimestamp,
} from "firebase/firestore";

export default function TaskDetail() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let first = true;
    return onSnapshot(doc(db, "tasks", taskId), (snap) => {
      if (!snap.exists()) return;
      const data = { id: snap.id, ...snap.data() };
      setTask(data);
      if (first) {
        setDescription(data.description || "");
        first = false;
      }
    });
  }, [taskId]);

  useEffect(() => {
    const q = query(
      collection(db, "tasks", taskId, "items"),
      orderBy("createdAt", "asc")
    );
    return onSnapshot(q, (snap) =>
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [taskId]);

  const saveDescription = async () => {
    setSaving(true);
    await updateDoc(doc(db, "tasks", taskId), { description });
    setSaving(false);
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    await addDoc(collection(db, "tasks", taskId, "items"), {
      text: newItem.trim(),
      done: false,
      createdAt: serverTimestamp(),
    });
    setNewItem("");
  };

  const toggleItem = (item) =>
    updateDoc(doc(db, "tasks", taskId, "items", item.id), { done: !item.done });

  const removeItem = (item) =>
    deleteDoc(doc(db, "tasks", taskId, "items", item.id));

  if (!task) return <Container className="py-4">Loading...</Container>;

  return (
    <Container className="py-4" style={{ maxWidth: 700 }}>
      <Link to="/">← Back</Link>
      <h2 className="my-3">{task.title}</h2>

      <Card title="Details">
        <Form.Control
          as="textarea"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details..."
          className="mb-2"
        />
        <Button onClick={saveDescription} disabled={saving}>
          {saving ? "Saving..." : "Save details"}
        </Button>
      </Card>

      <Card title="Checklist">
        <Form onSubmit={addItem} className="d-flex gap-2 mb-3">
          <Form.Control
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add an item"
          />
          <Button type="submit">Add</Button>
        </Form>

        <ListGroup>
          {items.map((item) => (
            <ListGroup.Item
              key={item.id}
              className="d-flex align-items-center justify-content-between"
            >
              <Form.Check
                type="checkbox"
                checked={item.done}
                onChange={() => toggleItem(item)}
                label={item.text}
                className={item.done ? "text-decoration-line-through" : ""}
              />
              <Button variant="outline-danger" size="sm" onClick={() => removeItem(item)}>
                ✕
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}