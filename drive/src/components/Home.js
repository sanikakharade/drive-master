// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-green-500">
            <h1 className="text-5xl font-bold text-white animate-bounce">Welcome to Drive Master</h1>
            <nav className="mt-10">
                <Link className="text-xl text-white mx-4" to="/login">Login</Link>
                <Link className="text-xl text-white mx-4" to="/user">User Panel</Link>
                <Link className="text-xl text-white mx-4" to="/instructor">Instructor Panel</Link>
                <Link className="text-xl text-white mx-4" to="/admin">Admin Dashboard</Link>
            </nav>
        </div>
    );
}

export default Home;
