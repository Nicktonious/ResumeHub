// src/App.js
// import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
// import ResumeList from './ResumeList.jsx';

function App() {
    return (
        <div>
            <Navbar />
            <Outlet/>
            {/* <ResumeList /> */}
        </div>
    );
}

export default App;