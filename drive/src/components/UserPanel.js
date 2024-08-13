import React, { useEffect, useState, useRef } from 'react';
import { firestore, auth } from '../firebase';
import { Line } from 'react-chartjs-2';
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
        const fetchUserData = async (userId) => {
            const userDoc = await firestore.collection('users').doc(userId).get();
            setUser(userDoc.data());
        };

        const fetchSessions = async (userId) => {
            const sessionsSnapshot = await firestore.collection('sessions').where('userId', '==', userId).get();
            setSessions(sessionsSnapshot.docs.map(doc => doc.data()));
        };

        const currentUser = auth.currentUser;
        if (currentUser) {
            fetchUserData(currentUser.uid);
            fetchSessions(currentUser.uid);
        }
    }, []);

    useEffect(() => {
        const initializeMap = () => {
            if (window.L && window.MapmyIndia) {
                const map = new window.MapmyIndia.Map(mapContainerRef.current, {
                    center: [28.6139, 77.2090],
                    zoom: 10
                });

                if (map && map.addLayer) {
                    window.L.tileLayer('https://apis.mapmyindia.com/advancedmaps/v1/fe59820a56b82c5fff493c19301fab25/tiles/{z}/{x}/{y}.png', {
                        maxZoom: 18
                    }).addTo(map);
                    mapRef.current = map;
                } else {
                    console.error('Map or addLayer method is not available.');
                }
            } else {
                console.error('Leaflet or MapmyIndia is not loaded.');
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

    const breakingData = {
        labels: ['Jul 04', 'Jul 05', 'Jul 06', 'Jul 07', 'Jul 08', 'Jul 09', 'Jul 10', 'Jul 11', 'Jul 12', 'Jul 13', 'Jul 14', 'Jul 15', 'Jul 16', 'Jul 17', 'Jul 18'],
        datasets: [
            {
                label: 'Breaking (km)',
                data: [7.1, 23.2, 32.6, 5.9, 17.6, 16.3, 6.3, 7.1, 6.3, 12.5, 10.4, 2.8, 151.6, 5.3, 103.7],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
            },
        ],
    };

    const accelerationData = {
        labels: ['Jul 04', 'Jul 05', 'Jul 06', 'Jul 07', 'Jul 08', 'Jul 09', 'Jul 10', 'Jul 11', 'Jul 12', 'Jul 13', 'Jul 14', 'Jul 15', 'Jul 16', 'Jul 17', 'Jul 18'],
        datasets: [
            {
                label: 'Acceleration (min)',
                data: [19, 49, 51, 24, 31, 31, 127, 20, 12, 27, 23, 203, 31, 150, 18],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
        ],
    };

    const steeringData = {
        labels: ['Jul 04', 'Jul 05', 'Jul 06', 'Jul 07', 'Jul 08', 'Jul 09', 'Jul 10', 'Jul 11', 'Jul 12', 'Jul 13', 'Jul 14', 'Jul 15', 'Jul 16', 'Jul 17', 'Jul 18'],
        datasets: [
            {
                label: 'Steering Control (km/hr)',
                data: [15, 21, 24, 24, 24, 24, 21, 21, 21, 21, 30, 36, 33, 21, 15],
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                fill: false,
            },
        ],
    };

    const speedingData = {
        labels: ['Jul 04', 'Jul 05', 'Jul 06', 'Jul 07', 'Jul 08', 'Jul 09', 'Jul 10', 'Jul 11', 'Jul 12', 'Jul 13', 'Jul 14', 'Jul 15', 'Jul 16', 'Jul 17', 'Jul 18'],
        datasets: [
            {
                label: 'Speeding (km/hr)',
                data: [39, 61, 85, 60, 52, 67, 67, 120, 67, 67, 65, 57, 31, 94, 67],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false,
            },
        ],
    };

    const monitoringData = {
        labels: ['Jul 04', 'Jul 05', 'Jul 06', 'Jul 07', 'Jul 08', 'Jul 09', 'Jul 10', 'Jul 11', 'Jul 12', 'Jul 13', 'Jul 14', 'Jul 15', 'Jul 16', 'Jul 17', 'Jul 18'],
        datasets: [
            {
                label: 'Monitoring (km/hr)',
                data: [7, 9, 10, 11, 8, 7, 10, 15, 11, 10, 9, 12, 7, 15, 13],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
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
                {sessions.map((session, index) => (
                    <div key={index}>
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
                    className="mb-2 p-2 border border-gray-400 w-full"
                />
                <input
                    type="text"
                    placeholder="Enter destination coordinates"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="mb-2 p-2 border border-gray-400 w-full"
                />
                <button onClick={handleNavigation} className="p-2 bg-blue-500 text-white w-full md:w-auto">Start Navigation</button>
            </div>
            <div id="map" ref={mapContainerRef} className="h-64 md:h-96 w-full mb-4"></div>
            <div>
                <h3 className="text-xl mt-4">Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <h4 className="text-lg">Breaking</h4>
                        <Line data={breakingData} />
                    </div>
                    <div>
                        <h4 className="text-lg">Acceleration</h4>
                        <Line data={accelerationData} />
                    </div>
                    <div>
                        <h4 className="text-lg">Steering</h4>
                        <Line data={steeringData} />
                    </div>
                    <div>
                        <h4 className="text-lg">Speeding</h4>
                        <Line data={speedingData} />
                    </div>
                    <div>
                        <h4 className="text-lg">Monitoring</h4>
                        <Line data={monitoringData} />
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-xl">Detailed Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded shadow">
                        <h4 className="text-lg">Distance</h4>
                        <p className="text-2xl">5.3 Km</p>
                    </div>
                    <div className="p-4 bg-white rounded shadow">
                        <h4 className="text-lg">Run Time</h4>
                        <p className="text-2xl">00:11 Hr</p>
                    </div>
                    <div className="p-4 bg-white rounded shadow">
                        <h4 className="text-lg">Max Speed</h4>
                        <p className="text-2xl">60 km/hr</p>
                    </div>
                    <div className="p-4 bg-white rounded shadow">
                        <h4 className="text-lg">Avg Speed</h4>
                        <p className="text-2xl">26.51 km/hr</p>
                    </div>
                    <div className="p-4 bg-white rounded shadow">
                        <h4 className="text-lg">Stoppage Time</h4>
                        <p className="text-2xl">16:51 Hr</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPanel;