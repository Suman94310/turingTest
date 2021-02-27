import React from 'react'
import "./navbar.css"

import Number from "./number.svg"
import Document from "./document.svg"
import Baymax from "./baymax.svg"
import Contact from "./contact.svg"

  
  import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/digits" className="nav-link">
                        <img src={Number} alt="" className="nav-image"/>
                        <span className="link-text">Number Detector</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/documentReader" className="nav-link">
                        <img src={Document} alt="" className="nav-image"/>
                        <span className="link-text">Document Reader</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/baymax" className="nav-link">
                        <img src={Baymax} alt="" className="nav-image"/>
                        <span className="link-text">A.I.</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className="nav-link">
                        <img src={Contact} alt="" className="nav-image"/>
                        <span className="link-text">Contact Me</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
