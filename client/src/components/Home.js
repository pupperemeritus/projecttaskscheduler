import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import '../App.css';
import { Nav, Navbar, Button } from 'react-bootstrap';
const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated')
    );
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };
    return (
        <div>
            <Navbar
                bg='light'
                expand='lg'
            >
                <Navbar.Brand>
                    <Link
                        to='/home'
                        className='navbar-brand'
                    >
                        Task Scheduler
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Link
                            to='/login'
                            className='nav-link'
                        >
                            Login
                        </Link>
                        <Link
                            to='/register'
                            className='nav-link'
                        >
                            Register
                        </Link>
                        {localStorage.getItem('isAuthenticated') ? (
                            <>
                                <Link
                                    to='/task'
                                    className='nav-link'
                                >
                                    Tasks
                                </Link>
                                <Link
                                    to='/user'
                                    className='nav-link'
                                >
                                    Profile
                                </Link>
                                <Link
                                    to='/group'
                                    className='nav-link'
                                >
                                    Group
                                </Link>
                                <Button
                                    variant='outline-danger'
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <p></p>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <h1>Welcome to the Task Scheduler!</h1>
            {!localStorage.getItem('isAuthenticated') && (
                <p>Please login or register to start using the app.</p>
            )}
        </div>
    );
};
export default Home;
