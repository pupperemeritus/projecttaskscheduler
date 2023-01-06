import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import useCheckAuthWrapper from './Home';
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [error, setError] = useState(null);
    checkAuthWrapper();
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

    if (isAuthenticated) {
        return <Navigate to='/' />;
    }

    if (isRegistered) {
        return <Navigate to='/login' />;
    }
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
