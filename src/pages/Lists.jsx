import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ListContext } from "../context/Listcontext";
import { Container, Form, Button, ListGroup, Row, Col } from "react-bootstrap";

const Lists = () => {
  const { lists, addList, deleteList } = useContext(ListContext);
  const [listName, setListName] = useState("");

  const handleAddList = (e) => {
    e.preventDefault();
    if (listName.trim() === "") return;
    addList(listName);
    setListName("");
  };

  return (
    <Container className="py-4">
      <h1 className="fw-bold mb-4">All Lists</h1>

      {/* Create New List Form */}
      <Form onSubmit={handleAddList} className="mb-4">
        <Row className="g-2 align-items-center">
          <Col xs={12} md={8}>
            <Form.Control
              type="text"
              placeholder="Enter list name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
          </Col>
          <Col xs={12} md={4}>
            <Button type="submit" variant="primary" className="w-100">
              Create List
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Show Existing Lists */}
      {lists.length === 0 ? (
        <p className="text-muted">No lists yet. Create your first list above!</p>
      ) : (
        <ListGroup>
          {lists.map((list) => (
            <ListGroup.Item
              key={list.id}
              className="d-flex justify-content-between align-items-center"
            >
              <Link to={`/list/${list.id}`} className="text-decoration-none">
                {list.name}
              </Link>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => deleteList(list.id)}
              >
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Lists;
