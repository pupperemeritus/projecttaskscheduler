import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Form, Button, Nav, Navbar } from 'react-bootstrap';
const Login = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    checkAuthWrapper();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send a request to the backend to log in
            const { data } = await axios.post('/login', {
                email,
                password,
            });
            // Save the JWT to local storage
            localStorage.setItem('jwt', data.token);
            // Set isLoggedIn to true
            setIsAuthenticated(true);
        } catch (error) {
            // Set the error message
            setError(error.response.data.message);
        }
    };
    const useCheckAuthWrapper = () => {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        // Check if the user is authenticated when the component mounts
        useEffect(() => {
            const checkAuth = async () => {
                try {
                    // Get the JWT from local storage
                    const token = localStorage.getItem('jwt');
                    // Verify the JWT and get the user's ID
                    const { userId } = jwt.verify(
                        token,
                        process.env.JWT_SECRET
                    );
                    // Send a request to the backend to check if the user exists
                    const { data } = await axios.get(`/user/${userId}`);
                    // Set isAuthenticated to true if the user exists
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error(error);
                }
            };
            checkAuth();
            window.isAuthenticated = isAuthenticated;
        }, []);
    };
    if (isAuthenticated) {
        return <Navigate to='/' />;
    }

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
                        {window.isAuthenticated && (
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
            {!window.isAuthenticated && (
                <p>Please login or register to start using the app.</p>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>
                {error && <p className='text-danger'>{error}</p>}
                <center>
                    <Button
                        variant='primary'
                        type='submit'
                    >
                        Login
                    </Button>
                </center>
            </Form>
        </div>
    );
};

export default Login;
