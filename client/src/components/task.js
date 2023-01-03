import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Table, Form, Button } from 'react-bootstrap';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const { userId } = jwt.verify(token, process.env.JWT_SECRET);
                const { data } = await axios.get(`/api/tasks?userId=${userId}`);
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
                    const { data } = await axios.get(`/api/tasks/${taskId}`);
                    setTitle(data.title);
                    setDescription(data.description);
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
                await axios.patch(`/api/tasks/${taskId}`, {
                    title,
                    description,
                    userId,
                });
                console.log('Task updated successfully!');
            } else {
                await axios.post('/api/tasks', { title, description, userId });
                console.log('Task created successfully!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`/api/tasks/${taskId}`);
            console.log('Task deleted successfully!');
            // Fetch the updated list of tasks
            const token = localStorage.getItem('jwt');
            const { userId } = jwt.verify(token, process.env);
        } catch (err) {
            console.log('Task not deleted');
        }
    };
};
