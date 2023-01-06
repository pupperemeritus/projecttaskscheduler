import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Form, Button } from 'react-bootstrap';
import { useCheckAuthWrapper } from './Home';
const User = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useCheckAuthWrapper();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Get the JWT from local storage
            const token = localStorage.getItem('jwt');
            const { userId } = await axios.get(`/user/${event.target.value}`);
            // Send a request to the backend to update the user's information
            if (isAuthenticated) {
                await axios.patch(`/user/${userId}`, {
                    name,
                    email,
                    password,
                });

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
            if (window.isAuthenticated) {
                await axios.delete(`/user/${userId}`);
                // Redirect to the login page
                window.location.replace('/login');
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type='text'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </label>
            <Button onClick={handleDelete}>Delete</Button>
        </Form>
    );
};
export default User;
