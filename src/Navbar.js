import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(prevShowMenu => !prevShowMenu);
  };

  const goBack = () => {
    window.history.back();
  };

  const menuStyle = {
    display: showMenu ? 'flex' : 'none', 
    position: 'absolute',                
    top: '100%',                         
    left: '0',
    right: '0',
    backgroundColor: 'black',            
    zIndex: 1000,                        
  };

  return (
    <nav className="navbar">
      <div className="back-button" onClick={goBack}>&lt; Back</div>
      <div className="navbar-title">Weight Lifting Tracker</div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`line ${showMenu ? 'active' : ''}`}></div>
        <div className={`line ${showMenu ? 'active' : ''}`}></div>
        <div className={`line ${showMenu ? 'active' : ''}`}></div>
      </div>
      <div className="menu-items" style={menuStyle}>
        <a href="/LandingPage" className="nav-link">Home</a>
      </div>
    </nav>
  );
};

export default Navbar;
