import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';
import { Form, Button, Navbar, Nav } from 'react-bootstrap';
import '../App.css';
const User = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated')
    );
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Get the JWT from local storage
            const token = localStorage.getItem('jwt');
            const { userId } = await axios.get(`/user/${event.target.value}`);

            // Send a request to the backend to update the user's information
            if (localStorage.getItem('isAuthenticated')) {
                await axios.patch(`/user/${email}`, {
                    name,
                    email,
                    password,
                });
                setUserId(userId);
                // Display a success message
                console.log('User information updated successfully!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            // Send a request to the backend to delete the user
            if (localStorage.getItem('isAuthenticated')) {
                await axios.delete(`/user/${userId}`);
                // Redirect to the login page
                window.location.replace('/login');
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            {' '}
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
                        {localStorage.getItem('isAuthenticated') && (
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
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='text'
                        value={email}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Form.Group>
                <Button
                    variant='primary'
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                <Button
                    variant='danger'
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </Form>
        </div>
    );
};
export default User;
