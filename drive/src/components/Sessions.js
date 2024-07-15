// src/components/Sessions.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';

function Sessions() {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            const sessionsSnapshot = await firestore.collection('sessions').get();
            setSessions(sessionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchSessions();
    }, []);

    const handleDelete = async (id) => {
        await firestore.collection('sessions').doc(id).delete();
        setSessions(sessions.filter(session => session.id !== id));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Sessions</h1>
            <table className="w-full bg-white rounded shadow">
                <thead>
                    <tr className="border-b">
                        <th className="py-2 px-4">Date</th>
                        <th className="py-2 px-4">Route</th>
                        <th className="py-2 px-4">Score</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map(session => (
                        <tr key={session.id} className="border-b">
                            <td className="py-2 px-4">{session.date}</td>
                            <td className="py-2 px-4">{session.route}</td>
                            <td className="py-2 px-4">{session.score}</td>
                            <td className="py-2 px-4">
                                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(session.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Sessions;
