import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Moment from 'react-moment';
import MapmyIndiaMap from 'mapmyindia-react';  // Import the default export

function InstructorPanel() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [sessionDetails, setSessionDetails] = useState({ date: new Date(), score: '', feedback: '' });
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const studentsSnapshot = await firestore.collection('students').get();
            setStudents(studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchStudents();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSessionDetails({ ...sessionDetails, [name]: value });
    };

    const handleDateChange = (date) => {
        setSessionDetails({ ...sessionDetails, date });
    };

    const handleLogSession = async () => {
        if (selectedStudent) {
            await firestore.collection('sessions').add({ ...sessionDetails, studentId: selectedStudent.id });
            setSessions([...sessions, { ...sessionDetails, studentId: selectedStudent.id }]);
            setSessionDetails({ date: new Date(), score: '', feedback: '' });
        }
    };

    const handleSelectStudent = async (student) => {
        setSelectedStudent(student);
        const sessionsSnapshot = await firestore.collection('sessions').where('studentId', '==', student.id).get();
        setSessions(sessionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Instructor Panel</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Assigned Students</h2>
                    <table className="w-full bg-white rounded shadow">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 px-4 text-left">Student Name</th>
                                <th className="py-2 px-4 text-left">Email</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id} className="border-b">
                                    <td className="py-2 px-4">{student.name}</td>
                                    <td className="py-2 px-4">{student.email}</td>
                                    <td className="py-2 px-4">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleSelectStudent(student)}>View Sessions</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Log Session</h2>
                    <input
                        type="text"
                        name="score"
                        placeholder="Score"
                        value={sessionDetails.score}
                        onChange={handleInputChange}
                        className="mb-2 p-2 border border-gray-400 w-full"
                    />
                    <textarea
                        name="feedback"
                        placeholder="Feedback"
                        value={sessionDetails.feedback}
                        onChange={handleInputChange}
                        className="mb-2 p-2 border border-gray-400 w-full"
                    />
                    <DatePicker
                        selected={sessionDetails.date}
                        onChange={handleDateChange}
                        className="mb-2 p-2 border border-gray-400 w-full"
                    />
                    <button onClick={handleLogSession} className="p-2 bg-green-500 text-white rounded">Log Session</button>
                </div>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Student Sessions</h2>
                {selectedStudent && (
                    <div>
                        <h3 className="text-lg font-bold">Sessions for {selectedStudent.name}</h3>
                        <table className="w-full bg-white rounded shadow">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-4 text-left">Date</th>
                                    <th className="py-2 px-4 text-left">Score</th>
                                    <th className="py-2 px-4 text-left">Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessions.map(session => (
                                    <tr key={session.id} className="border-b">
                                        <td className="py-2 px-4"><Moment format="YYYY/MM/DD">{session.date.toDate()}</Moment></td>
                                        <td className="py-2 px-4">{session.score}</td>
                                        <td className="py-2 px-4">{session.feedback}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Map</h2>
                <div className="h-96">
                    <MapmyIndiaMap
                        width="100%"
                        height="100%"
                        center={[28.6139, 77.2090]}
                        zoom="10"
                        apiKey="fe59820a56b82c5fff493c19301fab25"
                    />
                </div>
            </div>
        </div>
    );
}

export default InstructorPanel;
