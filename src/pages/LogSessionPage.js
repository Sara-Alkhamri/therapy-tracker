import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchSessions from '../api/fetchSessions';

const LogSessionPage = () => {
    const [sessions, setSessions] = useState([]);
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [mood, setMood] = useState('');
    const [notes, setNotes] = useState('');
    const [editingSession, setEditingSession] = useState(null); // Track the session being edited
    const [selectedSession, setSelectedSession] = useState(null); // Track the session being viewed in the popup

    // Function to fetch sessions
    const getSessions = async () => {
        try {
            const data = await fetchSessions();
            setSessions(data);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    // Fetch sessions when the component mounts
    useEffect(() => {
        getSessions();
    }, []);

    // Handle form submission (for adding or updating a session)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingSession) {
            // Update the existing session
            const updatedSessions = sessions.map((session) =>
                session.id === editingSession.id ? { ...session, date, title, mood, notes } : session
            );
            setSessions(updatedSessions);
            setEditingSession(null); // Reset editing state
        } else {
            // Add a new session
            const newSession = { id: Date.now(), date, title, mood, notes }; // Use a unique ID
            setSessions([...sessions, newSession]);
        }
        setDate('');
        setTitle('');
        setMood('');
        setNotes('');
    };

    // Handle editing a session
    const handleEdit = (session) => {
        setEditingSession(session);
        setDate(session.date);
        setTitle(session.title);
        setMood(session.mood);
        setNotes(session.notes);
    };

    // Handle deleting a session
    const handleDelete = (id) => {
        const updatedSessions = sessions.filter((session) => session.id !== id);
        setSessions(updatedSessions);
        setSelectedSession(null); // Close the popup if the session is deleted
    };

    // Handle viewing a session's details
    const handleView = (session) => {
        setSelectedSession(session);
    };

    // Close the popup
    const closePopup = () => {
        setSelectedSession(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 grid grid-cols-2 gap-6 p-6">
            {/* Form Section */}
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-therapy-blue mb-4">Log Session</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Mood"
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                        required
                    />
                    <textarea
                        placeholder="Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-therapy-blue text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                    >
                        {editingSession ? 'Update Session' : 'Log Session'}
                    </button>
                </form>
            </div>

            {/* Logged Sessions Section */}
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-therapy-blue mt-6 mb-4">Logged Sessions</h2>
                <ul>
                    {sessions.map((session) => (
                        <li key={session.id} className="mb-2 flex justify-between items-center">
                            <div className="flex items-center">
                                {/* Date Icon */}
                                <span className="text-gray-500 mr-4">
                                    📅
                                </span>
                                <span className="font-medium">{session.title}</span>
                            </div>
                            <button
                                onClick={() => handleView(session)}
                                className="bg-therapy-blue text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                                View
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Popup for Viewing Session Details */}
            {selectedSession && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
                        <h3 className="text-xl font-bold text-therapy-blue mb-4">{selectedSession.title}</h3>
                        <p className="text-gray-700 mb-4">{selectedSession.notes}</p>
                        <p className="text-gray-600 mb-4">Mood: {selectedSession.mood}</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => handleEdit(selectedSession)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(selectedSession.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                            <button
                                onClick={closePopup}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogSessionPage;