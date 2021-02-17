import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';



export default function Header(props) {
  return (
    <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
      <Navbar.Brand as={Link} to="/">PokeWatch</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto ml-2">
          <Nav.Link>
            About
          </Nav.Link>
        </Nav>
        <Nav className="mr-sm-2">
          <Nav.Link key="1" as={Link} to="/login">Login</Nav.Link>
          <Nav.Link key="2" as={Link} to="/signup">Signup</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  )
};


