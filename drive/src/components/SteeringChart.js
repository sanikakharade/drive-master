// src/components/SteeringChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const SteeringChart = () => {
    const data = {
        labels: ['Jul 04', 'Jul 05', 'Jul 06', 'Jul 07', 'Jul 08', 'Jul 09', 'Jul 10', 'Jul 11', 'Jul 12', 'Jul 13', 'Jul 14', 'Jul 15', 'Jul 16', 'Jul 17', 'Jul 18'],
        datasets: [
            {
                label: 'Steering',
                data: [15, 21, 24, 24, 24, 24, 21, 21, 21, 21, 30, 36, 33, 21, 15],
                fill: false,
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="p-4 bg-white rounded shadow">
            <Line data={data} options={options} />
            <h3 className="text-center mt-2">Steering</h3>
        </div>
    );
};

export default SteeringChart;
