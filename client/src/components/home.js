import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Nav, Navbar } from 'react-bootstrap';

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if the user is authenticated when the component mounts
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Get the JWT from local storage
                const token = localStorage.getItem('jwt');
                // Verify the JWT and get the user's ID
                const { userId } = jwt.verify(token, process.env.JWT_SECRET);
                // Send a request to the backend to check if the user exists
                const { data } = await axios.get(`/user/${userId}`);
                // Set isAuthenticated to true if the user exists
                setIsAuthenticated(true);
            } catch (error) {
                console.error(error);
            }
        };
        checkAuth();
    }, []);

    return (
        <div>
            <Navbar
                bg='light'
                expand='lg'
            >
                <Navbar.Brand>Task Scheduler</Navbar.Brand>
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
                        {isAuthenticated && (
                            <>
                                <Link
                                    to='/tasks'
                                    className='nav-link'
                                >
                                    Tasks
                                </Link>
                                <Link
                                    to='/profile'
                                    className='nav-link'
                                >
                                    Profile
                                </Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <h1>Welcome to the Task Scheduler!</h1>
            {!isAuthenticated && (
                <p>Please login or register to start using the app.</p>
            )}
        </div>
    );
};

export default Home;
