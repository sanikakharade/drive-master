// src/components/Users.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersSnapshot = await firestore.collection('users').get();
            setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        await firestore.collection('users').doc(id).delete();
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <table className="w-full bg-white rounded shadow">
                <thead>
                    <tr className="border-b">
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 justify-center">Email</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b">
                            <td className="py-2 px-4">{user.name}</td>
                            <td className="py-2 px-4">
                                <div className="flex items-center justify-center">
                                    <span>{user.email}</span>
                                </div>
                            </td>
                            <td className="py-2 px-4">
                                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;