import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
            setIsLoggedIn(true);
        } catch (error) {
            // Set the error message
            setError(error.response.data.message);
        }
    };

    if (isLoggedIn) {
        return <Redirect to='/' />;
    }

    return (
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
            <Button
                variant='primary'
                type='submit'
            >
                Login
            </Button>
        </Form>
    );
};

export default LoginPage;
