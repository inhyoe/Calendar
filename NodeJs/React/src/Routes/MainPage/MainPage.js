import React from 'react'
import axios from 'axios'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
export default function MainPage() {

  const data = sessionStorage.getItem("user_id")
  
  let navigate = useNavigate()
  function distroySession() {
    sessionStorage.removeItem("user_id")
    sessionStorage.removeItem("user_name")
    sessionStorage.removeItem("user_grade")

    navigate('/')
  }
  function NavScrollExample() {
    return (
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#/club">Access User</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>

              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
        <Button variant="outline-success" style={{ marginRight: "10px" }}>

          {data !== null ? <Nav.Link onClick={distroySession}>Logout</Nav.Link> :
            <Nav.Link href="#/login">Login</Nav.Link>
          }
        </Button>
      </Navbar>
    );
  }

  return (
    <div>
      <NavScrollExample></NavScrollExample>
      <div id="body">
        <h1>메인페이지입니다</h1>
        
        {console.log("data : ",data)}
        
        {/* <Link to = '/login' > 로그인 하러 가기 </Link> */}
      </div>
    </div>

  )
}
