import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Group from './components/Group';
import Home from './components/Home';
import Task from './components/Task';
import User from './components/User';
import Login from './components/Login';
import Register from './components/Register';
function App() {
    <Routes>
        <Route
            path='/home'
            element={<Home />}
        ></Route>
        <Route
            path='/login'
            element={<Login />}
        ></Route>
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
    </Routes>;
    return <div>App</div>;
}

export default App;
