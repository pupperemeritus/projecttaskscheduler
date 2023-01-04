import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Table, Form, Button } from 'react-bootstrap';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [taskDate, setTaskDate] = useState(Date.now());
    const [error, setError] = useState(null);

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
};

export default Task;
