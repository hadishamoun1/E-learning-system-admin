import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/add-class">Add Class</Link>
        </li>
        <li>
          <Link to="/list-classes">View Classes</Link>
        </li>
        <li>
          <Link to="/upload">Upload</Link> 
        </li>
        <li>
          <Link to="/request">Requests</Link> 
        </li>
      </ul>
      
    </nav>
  );
};

export default Navbar;
