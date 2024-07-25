// src/components/MonitoringChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const MonitoringChart = () => {
    const data = {
        labels: ['Jul 04', 'Jul 05', 'Jul 06', 'Jul 07', 'Jul 08', 'Jul 09', 'Jul 10', 'Jul 11', 'Jul 12', 'Jul 13', 'Jul 14', 'Jul 15', 'Jul 16', 'Jul 17', 'Jul 18'],
        datasets: [
            {
                label: 'Monitoring',
                data: [7, 9, 10, 11, 8, 7, 10, 15, 11, 10, 9, 12, 7, 15, 13],
                fill: false,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
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
            <h3 className="text-center mt-2">Monitoring</h3>
        </div>
    );
};

export default MonitoringChart;
