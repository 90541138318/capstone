import { useState, useContext } from 'react';
import { ListContext } from '../context/Listcontext';
import { Form, Button, Row, Col } from 'react-bootstrap';

function ListForm() {
  const [name, setName] = useState('');
  const { addList } = useContext(ListContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addList(name);
      setName('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row className="g-2">
        {/* List Name Input */}
        <Col xs={12} md={9}>
          <Form.Control
            type="text"
            placeholder="New list name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>

        {/* Add Button */}
        <Col xs={12} md={3}>
          <Button type="submit" variant="primary" className="w-100">
            Add List
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default ListForm;
