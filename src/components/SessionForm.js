import React, { useState } from 'react';
import axios from 'axios';

const SessionForm = ({ fetchSessions }) => {
    const [date, setDate] = useState('');
    const [therapist, setTherapist] = useState('');
    const [notes, setNotes] = useState('');
    const [mood, setMood] = useState(5);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:5000/sessions',
                { date, therapist, notes, mood },
                { headers: { Authorization: localStorage.getItem('token') } }
            );
            fetchSessions(); // Refresh the sessions list
        } catch (error) {
            console.error('Error logging session:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Therapist"
                value={therapist}
                onChange={(e) => setTherapist(e.target.value)}
                required
            />
            <textarea
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Mood (1-10)"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                min="1"
                max="10"
                required
            />
            <button type="submit" className="mt-4 bg-therapy-blue text-white px-4 py-2 rounded hover:bg-blue-600">Log Session</button>
        </form>
    );
};

export default SessionForm;