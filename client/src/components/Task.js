import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { Table, Form, Button, Nav, Navbar } from 'react-bootstrap';
import '../App.css';
const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [editId, setEditId] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [taskDate, setTaskDate] = useState(Date.now());
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated')
    );
    const handleSubmit = () => {
        if (isEditing === true) {
            tasks.map((task) => {
                // if () {
                // }
            });
        }
    };
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };
    const deleteTask = () => {};
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
                        {isAuthenticated && (
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
            {isAuthenticated && (
                <div>
                    {' '}
                    <Table>
                        <thead>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Assignor</th>
                            <th>Assignee</th>
                            <th>Task End Time</th>
                        </thead>
                        <tbody></tbody>
                    </Table>
                    <Form>
                        <Form.Group
                            className='mb-3'
                            controlId='assignee-email'
                        >
                            <Form.Label>Assignee Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter assignee email'
                            />
                        </Form.Group>
                        <Form.Group
                            classname='mb-3'
                            controlId='title'
                        >
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter title'
                            />
                        </Form.Group>
                        <Form.Group
                            classname='mb-3'
                            controlId='assignee-email'
                        >
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type='date' />
                        </Form.Group>
                        <Form.Group
                            classname='mb-3'
                            controlId='description'
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Task Description'
                                onChange={() => {}}
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
                            onClick={deleteTask}
                        >
                            Delete
                        </Button>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default Task;
