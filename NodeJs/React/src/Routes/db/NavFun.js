import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
export default function NavFun() {
   const data = sessionStorage.getItem("user_id")
   let navigate = useNavigate()
   function distroySession() {
      sessionStorage.removeItem("user_id")
      sessionStorage.removeItem("user_name")
      sessionStorage.removeItem("user_grade")
      alert('로그아웃 되었습니다.')
      navigate('/')
    }
    function isLog(){
         if(data === null) {
            alert('Please Login')
         }
    }
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
                  
                  <Nav.Link href={data === null ? "#/login" : "#/club"} onClick={isLog}>Calendar</Nav.Link>
                  <Nav.Link href={data === null ? "#/login" : "#/notice" }onClick={isLog}>Notice</Nav.Link>
                  <Nav.Link href={data === null ? "#/login" : "#/chat"} onClick={isLog}>Chat</Nav.Link>
               </Nav>
               <Button variant="outline-success" style={{ marginRight: "10px", marginLeft: "10px" }}>

                  {data !== null ? <Nav.Link onClick={distroySession}>Logout</Nav.Link> :
                     <Nav.Link href="#/login">Login</Nav.Link>
                  }
               </Button>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

