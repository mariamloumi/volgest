import React from 'react';
import '../assets/fonts/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
        Aerotrip
        </a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
        <li>
            <a href="/flights">Flights</a>
          </li>
          <li>
            <a href="/reservations">Reservations</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <a href="/user" className="user-icon">
          <i className="fas fa-user" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;