import React from 'react'
import '../App.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../Images/logo.webp'

function Header() {
  return (
    <>
          <Navbar expand="sm" className="bg-body-tertiary navbar">
        <Container>
          <Navbar.Brand href="#home"><img className='HeaderLogo' src={logo} alt="" /> MarTechBees</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto w-50 justify-content-around">
              <Nav.Link className='HeaderLinks' href="#home">Home</Nav.Link>
              <Nav.Link className='HeaderLinks' href="#link">Testing</Nav.Link>
              <Nav.Link className='HeaderLinks' href="#logout">Logout</Nav.Link>
              <Nav.Link className='HeaderLinks' href="#user"><i class="fa-regular fa-user"></i> User</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header