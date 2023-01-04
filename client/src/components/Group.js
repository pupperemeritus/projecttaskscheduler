import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Form, Button } from 'react-bootstrap';

const Group = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const Group = () => {
        // Fetch the group's information from the backend when the component mounts
        useEffect(() => {
            if (isEditing) {
                const fetchGroupInfo = async () => {
                    try {
                        // Get the group ID from the URL
                        const groupId = window.location.pathname.split('/')[2];
                        // Send a request to the backend to get the group's information
                        const { data } = await axios.get(`/group/${groupId}`);
                        // Set the state variables with the group's information
                        setName(data.name);
                        setEmail(data.email);
                    } catch (error) {
                        console.error(error);
                    }
                };
                fetchGroupInfo();
            }
        }, [isEditing]);

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
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            value={name}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>
                </Form>
            </div>
        );
    };
};

export default Group;
