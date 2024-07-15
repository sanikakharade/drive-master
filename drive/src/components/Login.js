// src/components/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            if (isAdmin) {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-2xl mb-4">Login</h2>
            <input className="mb-2 p-2 border border-gray-400" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input className="mb-2 p-2 border border-gray-400" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <label className="mb-2">
                <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                Admin
            </label>
            <button className="p-2 bg-blue-500 text-white" onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
