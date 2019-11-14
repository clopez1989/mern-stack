import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand" href="#">Scholars</Link>

                <div className="collapse navbar-collapse" id="navbarToggle">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/create" className="nav-link">Add Class</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user" className="nav-link">Create New Scholar</Link>
                        </li>
                    </ul>
                </div>
            </nav> 
        );
    }
}