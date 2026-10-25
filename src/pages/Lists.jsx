import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ListContext } from "../context/Listcontext";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const Lists = () => {
  const { lists, addList, deleteList } = useContext(ListContext);
  const [listName, setListName] = useState("");

  const handleAddList = (e) => {
    e.preventDefault();
    if (listName.trim() === "") return;
    addList(listName);
    setListName("");
  };

  const handleDelete = (list) => {
    if (window.confirm(`Delete "${list.name}" and all its items?`)) {
      deleteList(list.id);
    }
  };

  return (
    <Container style={{ maxWidth: 760 }}>
      <div className="mb-4">
        <h1 className="page-title">My Lists</h1>
        <p className="page-sub">
          {lists.length} {lists.length === 1 ? "list" : "lists"}
        </p>
      </div>

      <Form onSubmit={handleAddList} className="surface p-3 mb-4">
        <Row className="g-2">
          <Col xs={12} sm={9}>
            <Form.Control
              type="text"
              placeholder="Name your new list (e.g. Groceries, Project X)"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
          </Col>
          <Col xs={12} sm={3}>
            <Button type="submit" variant="primary" className="w-100">
              + Create
            </Button>
          </Col>
        </Row>
      </Form>

      {lists.length === 0 ? (
        <div className="surface empty-state">
          <p className="mb-0">No lists yet. Create your first one above.</p>
        </div>
      ) : (
        lists.map((list) => (
          <div key={list.id} className="surface list-row">
            <Link to={`/list/${list.id}`} className="list-link">
              <span className="list-avatar">
                {list.name.charAt(0).toUpperCase()}
              </span>
              {list.name}
            </Link>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleDelete(list)}
            >
              Delete
            </Button>
          </div>
        ))
      )}
    </Container>
  );
};

export default Lists;