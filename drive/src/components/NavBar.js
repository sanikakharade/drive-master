// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-blue-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">Drive Master</Link>
                <div className="space-x-4">
                    <Link to="/login" className="text-white">Login</Link>
                    <Link to="/user" className="text-white">User Panel</Link>
                    <Link to="/instructor" className="text-white">Instructor Panel</Link>
                    <Link to="/admin" className="text-white">Admin Dashboard</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
