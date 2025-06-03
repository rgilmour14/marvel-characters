// src/components/NavBar.jsx

import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavBar() {
  return (
    <Navbar bg="info" variant="dark" expand="lg" className="p-3 mb-4">
      <Navbar.Brand href="/">Marvel Characters</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link as={NavLink} to="/" activeclassname="active">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/characters" activeclassname="active">
            Characters
          </Nav.Link>
          <Nav.Link as={NavLink} to="/addcharacter" activeclassname="active">
            Create New Character
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;