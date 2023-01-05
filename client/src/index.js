import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Link, Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Group from './components/Group';
import Home from './components/Home';
import Task from './components/Task';
import User from './components/User';
import Login from './components/Login';
import Register from './components/Register';
import { resolveInclude } from 'ejs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route
                    path='/home'
                    element={<Home />}
                />
                <Route
                    path='/'
                    element={<Navigate to='/home' />}
                />

                <Route
                    path='/login'
                    element={<Login />}
                />
                <Route
                    path='/task'
                    element={<Task />}
                />
                <Route
                    path='/user'
                    element={<User />}
                ></Route>
                <Route
                    path='/group'
                    element={<Group />}
                ></Route>
                <Route
                    path='/register'
                    element={<Register />}
                ></Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
