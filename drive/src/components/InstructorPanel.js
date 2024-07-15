// src/components/InstructorPanel.js
import React, { useEffect, useState, useRef } from 'react';
import { firestore } from '../firebase';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
);

function InstructorPanel() {
    const [students, setStudents] = useState([]);
    const [sessions, setSessions] = useState([]);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const fetchStudents = async () => {
            const studentsSnapshot = await firestore.collection('students').get();
            setStudents(studentsSnapshot.docs.map(doc => doc.data()));
        };

        fetchStudents();
    }, []);

    const handleSessionUpdate = async (sessionId, updatedData) => {
        await firestore.collection('sessions').doc(sessionId).update(updatedData);
    };

    useEffect(() => {
        const initializeMap = () => {
            if (window.L) {
                const map = new window.L.Map(mapContainerRef.current, {
                    center: [28.6139, 77.2090],
                    zoom: 10
                });
                window.L.tileLayer('https://apis.mapmyindia.com/advancedmaps/v1/fe59820a56b82c5fff493c19301fab25/tiles/{z}/{x}/{y}.png').addTo(map);
            }
        };

        if (document.readyState === 'complete') {
            initializeMap();
        } else {
            window.addEventListener('load', initializeMap);
            return () => window.removeEventListener('load', initializeMap);
        }
    }, []);

    const speedData = {
        labels: ['Good', 'Moderate', 'Bad'],
        datasets: [
            {
                data: [60, 30, 10],
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            },
        ],
    };

    const steeringControlData = {
        labels: ['Good', 'Moderate', 'Bad'],
        datasets: [
            {
                data: [70, 20, 10],
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            },
        ],
    };

    const accelerationData = {
        labels: ['Good', 'Moderate', 'Bad'],
        datasets: [
            {
                data: [50, 40, 10],
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            },
        ],
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Instructor Panel</h2>
            <div className="mb-4">
                <h3 className="text-xl">Assigned Students</h3>
                {students.map(student => (
                    <div key={student.id}>
                        <p>Name: {student.name}</p>
                        <p>Email: {student.email}</p>
                    </div>
                ))}
            </div>
            <div className="mb-4">
                <h3 className="text-xl">Driving Sessions</h3>
                {sessions.map(session => (
                    <div key={session.id}>
                        <p>Date: {session.date}</p>
                        <p>Route: {session.route}</p>
                        <input type="text" defaultValue={session.score} onChange={(e) => handleSessionUpdate(session.id, { score: e.target.value })} />
                    </div>
                ))}
            </div>
            <div id="map" ref={mapContainerRef} style={{ height: '400px', width: '100%' }}></div>
            <div>
                <h3 className="text-xl">Statistics</h3>
                <div className="flex justify-around">
                    <div>
                        <h4 className="text-lg">Speed</h4>
                        <Pie data={speedData} />
                    </div>
                    <div>
                        <h4 className="text-lg">Steering Control</h4>
                        <Pie data={steeringControlData} />
                    </div>
                    <div>
                        <h4 className="text-lg">Acceleration</h4>
                        <Pie data={accelerationData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstructorPanel;
