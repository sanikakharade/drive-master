// src/components/AdManagement.js
import React, { useState } from 'react';
import { firestore } from '../firebase';

function AdManagement() {
    const [ads, setAds] = useState([]);
    const [newAd, setNewAd] = useState('');

    const handleAddAd = async () => {
        const ad = { content: newAd, date: new Date() };
        await firestore.collection('ads').add(ad);
        setAds([...ads, ad]);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Ad Management</h2>
            <input className="mb-2 p-2 border border-gray-400" type="text" value={newAd} onChange={(e) => setNewAd(e.target.value)} placeholder="New Ad Content" />
            <button className="p-2 bg-blue-500 text-white" onClick={handleAddAd}>Add Ad</button>
            <div>
                <h3 className="text-xl">Existing Ads</h3>
                {ads.map(ad => (
                    <div key={ad.date}>
                        <p>{ad.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdManagement;
