import React from 'react';
import { Link } from 'react-router-dom'

const NavbarElement = (props) => {
    return (
        <div>
            <li className="navbar-item">
                <Link to={props.dest} className="nav-link">{props.text}</Link>
            </li>
        </div>
    );
};

export default NavbarElement;