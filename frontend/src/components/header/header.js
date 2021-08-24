import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';



export default function Header(props) {
  return (
    <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
      <Navbar.Brand as={Link} to="/">Omnia eSport Rent timers</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    </Navbar>

  )
};


