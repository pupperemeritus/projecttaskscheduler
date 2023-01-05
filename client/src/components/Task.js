import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { Table, Form, Button, Nav, Navbar } from 'react-bootstrap';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [taskDate, setTaskDate] = useState(Date.now());
    const [error, setError] = useState(null);

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
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const { userId } = jwt.verify(token, process.env.JWT_SECRET);
                const { data } = await axios.get(`/tasks/${userId}`);
                setTasks(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        if (isEditing) {
            const fetchTaskInfo = async () => {
                try {
                    const taskId = window.location.pathname.split('/')[2];
                    const { data } = await axios.get(`/task/${taskId}`);
                    setTitle(data.title);
                    setDescription(data.description);
                    setTaskDate(data.taskDate);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchTaskInfo();
        }
    }, [isEditing]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('jwt');
            const { userId } = jwt.verify(token, process.env.JWT_SECRET);
            if (isEditing) {
                const taskId = window.location.pathname.split('/')[2];
                await axios.patch(`/task/${taskId}`, {
                    title,
                    description,
                    userId,
                });
                console.log('Task updated successfully!');
            } else {
                await axios.post('/tasks', { title, description, userId });
                console.log('Task created successfully!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`/task/${taskId}`);
            console.log('Task deleted successfully!');
            // Fetch the updated list of tasks
            const token = localStorage.getItem('jwt');
            const { userId } = jwt.verify(token, process.env);
        } catch (err) {
            console.log('Task not deleted');
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
            <Table></Table>
            <Form>
                <Button onClick={handleSubmit}>Submit</Button>
                <Button onClick={deleteTask}>Delete</Button>
            </Form>
        </div>
    );
};

export default Task;
