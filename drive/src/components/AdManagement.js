// src/components/AdManagement.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Moment from 'react-moment';

function AdManagement() {
    const [ads, setAds] = useState([]);
    const [newAd, setNewAd] = useState({ title: '', description: '', schedule: new Date(), impressions: 0, clicks: 0 });

    useEffect(() => {
        const fetchAds = async () => {
            const adsSnapshot = await firestore.collection('ads').get();
            setAds(adsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchAds();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAd({ ...newAd, [name]: value });
    };

    const handleDateChange = (date) => {
        setNewAd({ ...newAd, schedule: date });
    };

    const handleAddAd = async () => {
        await firestore.collection('ads').add(newAd);
        setNewAd({ title: '', description: '', schedule: new Date(), impressions: 0, clicks: 0 });
        const adsSnapshot = await firestore.collection('ads').get();
        setAds(adsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const handleDeleteAd = async (id) => {
        await firestore.collection('ads').doc(id).delete();
        setAds(ads.filter(ad => ad.id !== id));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Ad Management</h1>
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Create New Ad</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Ad Title"
                    value={newAd.title}
                    onChange={handleInputChange}
                    className="mb-2 p-2 border border-gray-400 w-full"
                />
                <textarea
                    name="description"
                    placeholder="Ad Description"
                    value={newAd.description}
                    onChange={handleInputChange}
                    className="mb-2 p-2 border border-gray-400 w-full"
                />
                <DatePicker
                    selected={newAd.schedule}
                    onChange={handleDateChange}
                    className="mb-2 p-2 border border-gray-400 w-full"
                />
                <button onClick={handleAddAd} className="p-2 bg-blue-500 text-white rounded">Add Ad</button>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Manage Ads</h2>
                {ads.map(ad => (
                    <div key={ad.id} className="mb-2 p-2 border border-gray-400 rounded">
                        <h3 className="text-lg font-bold">{ad.title}</h3>
                        <p>{ad.description}</p>
                        <p><strong>Schedule:</strong> <Moment format="YYYY/MM/DD">{ad.schedule.toDate()}</Moment></p>
                        <p><strong>Impressions:</strong> {ad.impressions}</p>
                        <p><strong>Clicks:</strong> {ad.clicks}</p>
                        <button onClick={() => handleDeleteAd(ad.id)} className="p-2 bg-red-500 text-white rounded mt-2">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdManagement;
