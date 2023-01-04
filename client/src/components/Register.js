import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send a request to the backend to register the user
            await axios.post('/register', { name, email, password });
            // Set isRegistered to true
            setIsRegistered(true);
        } catch (error) {
            // Set the error message
            setError(error.response.data.message);
        }
    };

    if (isRegistered) {
        return <Navigate to='/login' />;
    }
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
                    Register
                </Button>
            </Form>
        </div>
    );
};

export default Register;
