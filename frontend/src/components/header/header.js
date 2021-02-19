import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';



export default function Header(props) {
  return (
    <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
      <Navbar.Brand as={Link} to="/">PokeWatch</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    </Navbar>

  )
};


