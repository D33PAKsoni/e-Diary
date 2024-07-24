import React from 'react'
import "../css/Dashboard.css";
import Cookies from "js-cookie";
import {Link, Outlet} from "react-router-dom"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";



const Dashboard = () => {

  
  return (
    <div className='dash-container'>
      <DashNav/>
      <div className="dash">
        <div className="outlet">
      <Outlet />
      </div>
      </div>
    </div>
  )
}


const DashNav = () => {
  const linkbtn = "hide"+Cookies.get("role");

  const handleSignOut = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('class');
    window.location.href = '/login';
  };
  return (
    <div className="nav-container">
    <Navbar expand="lg" className="nav">
      <Container>
        <div className="brand">
          <Navbar.Brand href="/">
            <img
              alt="E-Diary Logo"
              src="./src/assets/notebook.webp"
              width="60"
              height="60"
              className="d-inline-block align-top"
            />
            <span>e-Diary</span>
          </Navbar.Brand>
        </div>
        <div className="links">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/dashboard" className='nav-link px-3 align-middle text-gray'>Dashboard</Link>
              <Link to="/dashboard/students" className={"nav-link px-3 align-middle text-gray "+linkbtn}>Manage Students</Link>
              <Link onClick={handleSignOut} className='nav-link px-3 align-middle text-gray'>Sign Out</Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  </div>
  )
}




export default Dashboard