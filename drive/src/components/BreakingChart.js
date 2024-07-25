// src/components/BreakingChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const BreakingChart = () => {
    const data = {
        labels: ['Jul 04', 'Jul 05', 'Jul 06', 'Jul 07', 'Jul 08', 'Jul 09', 'Jul 10', 'Jul 11', 'Jul 12', 'Jul 13', 'Jul 14', 'Jul 15', 'Jul 16', 'Jul 17', 'Jul 18'],
        datasets: [
            {
                label: 'Breaking',
                data: [7.1, 23.2, 32.6, 5.9, 17.6, 16.3, 6.3, 7.1, 6.3, 12.5, 10.4, 2.8, 151.6, 5.3, 103.7],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
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
            <Bar data={data} options={options} />
            <h3 className="text-center mt-2">Breaking</h3>
        </div>
    );
};

export default BreakingChart;
