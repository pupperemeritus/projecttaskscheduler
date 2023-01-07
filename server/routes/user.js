import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
const User = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Fetch the user's information from the backend when the component mounts
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                // Get the JWT from local storage
                const token = localStorage.getItem('jwt');
                // Verify the JWT and get the user's ID
                const { userId } = jwt.verify(token, process.env.JWT_SECRET);
                // Send a request to the backend to get the user's information
                const { data } = await axios.get(`/user/${userId}`);
                // Set the state variables with the user's information
                setName(data.name);
                setEmail(data.email);
                setPassword(data.password);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserInfo();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Get the JWT from local storage
            const token = localStorage.getItem('jwt');
            // Verify the JWT and get the user's ID
            const { userId } = jwt.verify(token, process.env.JWT_SECRET);
            // Send a request to the backend to update the user's information
            await axios.patch(`/user/${userId}`, {
                name,
                email,
                password,
            });
            // Display a success message
            console.log('User information updated successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            // Get the JWT from local storage
            const token = localStorage.getItem('jwt');
            // Verify the JWT and get the user's ID
            const { userId } = jwt.verify(token, process.env.JWT_SECRET);
            // Send a request to the backend to delete the user
            await axios.delete(`/user/${userId}`);
            // Redirect to the login page
            window.location.replace('/login');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type='text'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </label>
        </form>
    );
};
export default User;
