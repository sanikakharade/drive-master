// src/components/SpeedingChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const SpeedingChart = () => {
    const data = {
        labels: ['Jul 04', 'Jul 05', 'Jul 06', 'Jul 07', 'Jul 08', 'Jul 09', 'Jul 10', 'Jul 11', 'Jul 12', 'Jul 13', 'Jul 14', 'Jul 15', 'Jul 16', 'Jul 17', 'Jul 18'],
        datasets: [
            {
                label: 'Speeding',
                data: [39, 61, 85, 60, 52, 67, 67, 120, 67, 67, 65, 57, 31, 94, 67],
                fill: false,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
            <h3 className="text-center mt-2">Speeding</h3>
        </div>
    );
};

export default SpeedingChart;
