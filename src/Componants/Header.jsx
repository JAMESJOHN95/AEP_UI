import React from 'react'
import '../App.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../Images/logo.webp'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleCustomer = ()=>{
navigate("/")
  }

  return (
    <>
          <Navbar expand="sm" className="bg-body-tertiary navbar">
        <Container>
          <Navbar.Brand href="#home"><img className='HeaderLogo' src={logo} alt="" /> MarTechBees</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto w-50 justify-content-around">
            <Nav.Link className='HeaderLinks fw-bolder' href="#Campaign">Campaign</Nav.Link>
            <Nav.Link className='HeaderLinks fw-bolder' href="#Performance">Content</Nav.Link>
              <Nav.Link className='HeaderLinks fw-bolder' onClick={handleCustomer} href="#Customer">Customer</Nav.Link>
              <Nav.Link className='HeaderLinks fw-bolder' href="#logout">Logout</Nav.Link>
              <Nav.Link className='HeaderLinks fw-bolder' href="#user"><i class="fa-regular fa-user d-inline-flex"></i> User</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header