// src/components/AdminDashboard.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Users from './Users';
import Instructors from './Instructors';
import Sessions from './Sessions';

function AdminDashboard() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-6">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/instructors" element={<Instructors />} />
                    <Route path="/sessions" element={<Sessions />} />
                </Routes>
            </div>
        </div>
    );
}

export default AdminDashboard;
