// src/components/Dashboard.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

function Dashboard() {
    const userData = {
        labels: ['Active Users', 'Inactive Users'],
        datasets: [
            {
                data: [29, 12],
                backgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    const tripData = {
        labels: ['Total Trips', 'In Process Trips', 'Cancelled Trips'],
        datasets: [
            {
                data: [200, 0, 9],
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            },
        ],
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">User Statistics</h2>
                    <Pie data={userData} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Trip Statistics</h2>
                    <Pie data={tripData} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
