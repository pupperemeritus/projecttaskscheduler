import React, { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
    // const [backendData, setBackendData] = useState(0);
    // useEffect(() => {
    //     fetch('/g')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setBackendData(data);
    //         });
    // });
    <Routes>
        <Route
            path='/home'
            element={<Home />}
        />
        <Route
            path='/login'
            element={<Login />}
        />
        <Route
            path='/tasks'
            element={<Tasks />}
        />
        <Route
            path='/user'
            element={<User />}
        />
        <Route
            path='/groups'
            element={<Group />}
        />
        <Route
            path='/register'
            element={<Register />}
        />
    </Routes>;
    return <div>App</div>;
}

export default App;
