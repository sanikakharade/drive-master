import React, { useState } from 'react';
import { auth, firestore } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isRegistered, setIsRegistered] = useState(true); // To switch between login and registration forms
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const userId = userCredential.user.uid;
            const userDoc = await firestore.collection('users').doc(userId).get();
            const userData = userDoc.data();

            if (userData && userData.isAdmin) {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    const handleRegister = async () => {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const userId = userCredential.user.uid;

            await firestore.collection('users').doc(userId).set({
                email,
                isAdmin
            });

            if (isAdmin) {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        } catch (error) {
            console.error('Error registering', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <h2 className="text-2xl mb-4">Choose Account Type</h2>
            <div className="flex mb-4">
                <div
                    onClick={() => setIsAdmin(false)}
                    className={`cursor-pointer p-4 border ${!isAdmin ? 'border-blue-500' : 'border-gray-300'} rounded-lg m-2 flex flex-col items-center`}
                >
                    <p className="text-xl font-bold text-blue-500">User</p>
                </div>
                <div
                    onClick={() => setIsAdmin(true)}
                    className={`cursor-pointer p-4 border ${isAdmin ? 'border-blue-500' : 'border-gray-300'} rounded-lg m-2 flex flex-col items-center`}
                >
                    <p className="text-xl font-bold text-blue-500">Admin</p>
                </div>
            </div>
            {isRegistered ? (
                <>
                    <h3 className="text-xl mb-4">{isAdmin ? 'Hello Admin!' : 'Hello User!'}</h3>
                    <input
                        className="mb-2 p-2 border border-gray-400 w-full max-w-sm"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        className="mb-2 p-2 border border-gray-400 w-full max-w-sm"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button onClick={handleLogin} className="p-2 bg-blue-500 text-white w-full max-w-sm mb-4">Login</button>
                    <p>No account? <span onClick={() => setIsRegistered(false)} className="text-blue-500 cursor-pointer">Signup</span></p>
                </>
            ) : (
                <>
                    <h3 className="text-xl mb-4">{isAdmin ? 'Register as Admin' : 'Register as User'}</h3>
                    <input
                        className="mb-2 p-2 border border-gray-400 w-full max-w-sm"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        className="mb-2 p-2 border border-gray-400 w-full max-w-sm"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button onClick={handleRegister} className="p-2 bg-blue-500 text-white w-full max-w-sm mb-4">Register</button>
                    <p>Have an account? <span onClick={() => setIsRegistered(true)} className="text-blue-500 cursor-pointer">Login</span></p>
                </>
            )}
        </div>
    );
}

export default Login;