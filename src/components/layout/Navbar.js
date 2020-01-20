import React from 'react';
import PropTypes from "prop-types";

const Navbar = (props) => {
    return (
        <div className={"navbar bg-primary sticky-top"}>
            <i className="fab fa-steam"/>
            <span className={"nav-header"}>{props.title}</span>
            <p className={"subtitle"}>SteamID-64 Search Engine</p>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired
};

export default Navbar;