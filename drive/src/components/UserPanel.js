// src/components/UserPanel.js
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

function UserPanel() {
    const [user, setUser] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const navigationRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userDoc = await firestore.collection('users').doc('USER_ID').get();
            setUser(userDoc.data());
        };

        const fetchSessions = async () => {
            const sessionsSnapshot = await firestore.collection('sessions').where('userId', '==', 'USER_ID').get();
            setSessions(sessionsSnapshot.docs.map(doc => doc.data()));
        };

        fetchUserData();
        fetchSessions();
    }, []);

    useEffect(() => {
        const initializeMap = () => {
            if (window.L && window.MapmyIndia) {
                const map = new window.MapmyIndia.Map(mapContainerRef.current, {
                    center: [28.6139, 77.2090],
                    zoom: 10
                });
                window.L.tileLayer('https://apis.mapmyindia.com/advancedmaps/v1/fe59820a56b82c5fff493c19301fab25/tiles/{z}/{x}/{y}.png').addTo(map);
                mapRef.current = map;
            }
        };

        if (document.readyState === 'complete') {
            initializeMap();
        } else {
            window.addEventListener('load', initializeMap);
            return () => window.removeEventListener('load', initializeMap);
        }
    }, []);

    const handleNavigation = () => {
        if (mapRef.current && window.MapmyIndia && window.MapmyIndia.route) {
            if (navigationRef.current) {
                navigationRef.current.remove();
            }

            window.MapmyIndia.route({
                map: mapRef.current,
                start: source,
                end: destination,
                callback: (response) => {
                    console.log('Route response:', response);
                    if (response.code === 200 && response.data.length > 0) {
                        const routeData = response.data[0];
                        const coordinates = routeData.steps.map(step => [step.start_location.lat, step.start_location.lng]);

                        navigationRef.current = window.L.polyline(coordinates, { color: 'blue' }).addTo(mapRef.current);
                        mapRef.current.fitBounds(navigationRef.current.getBounds());
                    }
                }
            });
        }
    };

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
            <h2 className="text-2xl mb-4">User Panel</h2>
            <div className="mb-4">
                <h3 className="text-xl">Profile</h3>
                <p>Name: {user?.name}</p>
                <p>Email: {user?.email}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-xl">Driving Sessions</h3>
                {sessions.map(session => (
                    <div key={session.id}>
                        <p>Date: {session.date}</p>
                        <p>Route: {session.route}</p>
                        <p>Score: {session.score}</p>
                        <p>Feedback: {session.feedback}</p>
                    </div>
                ))}
            </div>
            <div className="mb-4">
                <h3 className="text-xl">Select Route</h3>
                <input
                    type="text"
                    placeholder="Enter source coordinates"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="mb-2 p-2 border border-gray-400"
                />
                <input
                    type="text"
                    placeholder="Enter destination coordinates"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="mb-2 p-2 border border-gray-400"
                />
                <button onClick={handleNavigation} className="p-2 bg-blue-500 text-white">Start Navigation</button>
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

export default UserPanel;
