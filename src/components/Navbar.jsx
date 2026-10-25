import { Navbar as BsNavbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <BsNavbar expand="sm" sticky="top" className="app-navbar">
      <Container>
        <BsNavbar.Brand as={NavLink} to="/" className="brand">
          <span className="brand-mark">✓</span> TaskFlow
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="main-nav" />
        <BsNavbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/lists">My Lists</Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;