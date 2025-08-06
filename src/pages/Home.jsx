import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ListContext } from "../context/Listcontext";
import { Container, Form, Button, ListGroup, Row, Col } from "react-bootstrap";

const Home = () => {
  const { lists, addList, deleteList } = useContext(ListContext);
  const [listName, setListName] = useState("");

  const handleAddList = (e) => {
    e.preventDefault();
    if (!listName.trim()) return;
    addList(listName);
    setListName("");
  };

  return (
    <Container className="py-4">
      {/* Page Title */}
      <h2 className="fw-bold mb-4">Your Lists</h2>

      {/* Create List Form */}
      <Form onSubmit={handleAddList} className="mb-4">
        <Row className="g-2">
          <Col xs={12} md={9}>
            <Form.Control
              type="text"
              placeholder="Enter list name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
          </Col>
          <Col xs={12} md={3}>
            <Button type="submit" variant="success" className="w-100">
              Create
            </Button>
          </Col>
        </Row>
      </Form>

      {/* List of Lists */}
      {lists.length === 0 ? (
        <p className="text-muted">Select or create a list to get started.</p>
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

export default Home;
