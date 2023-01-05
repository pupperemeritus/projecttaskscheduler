import React from 'react';
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <div>
            <Link
                to='/login'
                className='Login'
            >
                Login
                <br />
            </Link>
            <Link
                to='/task'
                className='Task'
            >
                Task
            </Link>
            <Link
                to='/user'
                className='User'
            >
                User
            </Link>
            <Link
                to='/group'
                className='Group'
            >
                Group
            </Link>
            <Link
                to='/register'
                className='Register'
            >
                Register
            </Link>
        </div>
    );
}

export default App;
