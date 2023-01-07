import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';
import { Form, Button, Nav, Navbar } from 'react-bootstrap';
import '../App.css';
const Group = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
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
            // Verify the JWT and get the user's ID
            const { userId } = jwt.verify(token, process.env.JWT_SECRET);
            if (isEditing) {
                // Get the group ID from the URL
                const groupId = window.location.pathname.split('/')[2];
                // Send a request to the backend to update the group's information
                await axios.patch(`/group/${groupId}`, { name, email });
                // Display a success message
                console.log('Group updated successfully!');
            } else {
                // Send a request to the backend to create a new group
                await axios.post('/group', { name, email, userId });
                // Display a success message
                console.log('Group created successfully!');
            }
        } catch (error) {
            console.error(error);
        }
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
            {localStorage.getItem('isAuthenticated') ? (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='formBasicName'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='formBasicEmail'>
                        <Form.Label>
                            Emails(enter multiple emails separated by comma)
                        </Form.Label>
                        <Form.Control
                            type='email'
                            value={name}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>
                </Form>
            ) : (
                <h1>Please login</h1>
            )}
        </div>
    );
};

export default Group;
