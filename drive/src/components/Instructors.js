// src/components/Instructors.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';

function Instructors() {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        const fetchInstructors = async () => {
            const instructorsSnapshot = await firestore.collection('instructors').get();
            setInstructors(instructorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchInstructors();
    }, []);

    const handleDelete = async (id) => {
        await firestore.collection('instructors').doc(id).delete();
        setInstructors(instructors.filter(instructor => instructor.id !== id));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Instructors</h1>
            <table className="w-full bg-white rounded shadow">
                <thead>
                    <tr className="border-b">
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4 text-left justify-center">Email</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {instructors.map(instructor => (
                        <tr key={instructor.id} className="border-b">
                            <td className="py-2 px-4">{instructor.name}</td>
                            <td className="py-2 px-4">{instructor.email}</td>
                            <td className="py-2 px-4">
                                <button className="bg-red-500 text-white px-4 py-2 rounded text-right" onClick={() => handleDelete(instructor.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Instructors;
