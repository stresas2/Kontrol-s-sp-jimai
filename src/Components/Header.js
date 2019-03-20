import React from 'react';
import { NavLink } from 'react-router-dom';


const Header = () => (

  <header className="navbar navbar-inverse mb-20" id="header" style={{height: "50px", backgroundColor: "#494752"}}>
      <div className="container-fluid ">

      <span style={{backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "15px 15px", color: "#494752", fontWeight: "bold", fontSize: "25px", fontFamily: "Comic Sans MS, cursive, sans-serif", paddingLeft: "5px", paddingRight: "5px"}}>Kontrolė</span>

        <nav className="nav nav-masthead justify-content-center">


            <NavLink activeClassName="selected" exact activeStyle={{ fontWeight: "bold", color: "#fff", borderBottomColor: "#fff"  }}  to="/" className="nav-link">
              Pranešimai
            </NavLink >
            <NavLink activeClassName="selected" exact activeStyle={{ fontWeight: "bold", color: "#fff", borderBottomColor: "#fff" }} to="/map" className="nav-link">
              Žemėlapis
            </NavLink >



        </nav>
      </div>
  </header>

);


export default Header;
