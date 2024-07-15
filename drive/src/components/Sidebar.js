// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="h-screen bg-gray-800 text-white">
            <div className="p-6">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>
            <nav className="p-6">
                <Link to="/admin" className="block py-2 px-4 hover:bg-gray-600">Dashboard</Link>
                <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-600">Users</Link>
                <Link to="/admin/instructors" className="block py-2 px-4 hover:bg-gray-600">Instructors</Link>
                <Link to="/admin/sessions" className="block py-2 px-4 hover:bg-gray-600">Sessions</Link>
            </nav>
        </div>
    );
}

export default Sidebar;
