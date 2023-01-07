import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Form, Button, Nav, Navbar } from 'react-bootstrap';
import '../App.css';
const Login = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated')
    );
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

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
            localStorage.setItem('email', email);
            localStorage.setItem('isAuthenticated', true);
        } catch (error) {
            // Set the error message
            setError(error.response.data.message);
        }
    };
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };
    if (localStorage.getItem('isAuthenticated')) {
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
                        {isAuthenticated === true && (
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
                                    class='outline-danger'
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <h1>Welcome to the Task Scheduler!</h1>
            {!(isAuthenticated === true) && (
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
