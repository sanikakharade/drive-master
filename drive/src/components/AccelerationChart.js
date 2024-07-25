// src/components/AccelerationChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const AccelerationChart = () => {
    const data = {
        labels: ['Jul 04', 'Jul 05', 'Jul 06', 'Jul 07', 'Jul 08', 'Jul 09', 'Jul 10', 'Jul 11', 'Jul 12', 'Jul 13', 'Jul 14', 'Jul 15', 'Jul 16', 'Jul 17', 'Jul 18'],
        datasets: [
            {
                label: 'Acceleration',
                data: [19, 49, 51, 24, 31, 31, 127, 20, 12, 27, 23, 203, 31, 150, 18],
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
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
            <h3 className="text-center mt-2">Acceleration</h3>
        </div>
    );
};

export default AccelerationChart;
