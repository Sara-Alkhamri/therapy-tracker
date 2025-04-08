import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, Cell } from 'recharts';
import fetchSessions from '../api/fetchSessions';
import fetchGoals from '../api/fetchGoals';

const Dashboard = () => {
    const [sessions, setSessions] = useState([]);
    const [goals, setGoals] = useState([]);
    const [affirmation, setAffirmation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Function to fetch sessions
    const getSessions = async () => {
        try {
            const data = await fetchSessions();
            setSessions(data);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    // Function to fetch goals
    const getGoals = async () => {
        try {
            const data = await fetchGoals();
            setGoals(data);
        } catch (error) {
            console.error('Error fetching goals:', error);
        }
    };

    // Function to fetch a daily affirmation
    const getAffirmation = async () => {
        setIsLoading(true); // Start loading
        try {
            const response = await fetch('https://www.affirmations.dev/');
            const data = await response.json();
            setAffirmation(data.affirmation);
        } catch (error) {
            console.error('Error fetching affirmation:', error);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    // Fetch sessions, goals, and affirmation when the component mounts
    useEffect(() => {
        getSessions();
        getGoals();
        getAffirmation();
    }, []);

    // Format session data for the graph
    const sessionData = sessions.map((session) => ({
        date: session.date,
        mood: session.mood,
    }));

    // Format goal data for the graph
    const goalData = goals.map((goal) => ({
        name: goal.description,
        progress: goal.progress || 0, // Assuming progress is a number
    }));

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-evenly p-6">
            {/* Daily Affirmation Section */}
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-therapy-blue mb-2">Daily Message</h1>
                    {isLoading ? (
                        <p className="text-gray-700">Loading...</p>
                    ) : (
                            <>
                                <p className="text-gray-700 italic">"{affirmation}"</p>
                                <button
                                    onClick={getAffirmation}
                                    className="mt-2 bg-therapy-blue text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    More
                            </button>
                            </>
                        )}
                </div>
            </div>

            {/* Mood Tracker Section */}
            {/* <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-therapy-blue mb-2">Mood Tracker</h1>
                    <LineChart width={350} height={200} data={sessionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="mood" stroke="#8884d8" />
                    </LineChart>
                    <button
                        onClick={() => navigate('/log-mood')}
                        className="mt-4 bg-therapy-blue text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                    >
                        Log Mood
                    </button>
                </div>
            </div> */}

            {/* Sessions Graph Section */}
            <div className="bg-white p-8 rounded-lg shadow-md w-100">
                <h2 className="text-2xl font-bold text-therapy-blue mb-4">Sessions</h2>
                <LineChart width={350} height={200} data={sessionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="mood" stroke="#8884d8" />
                </LineChart>
                <button
                    onClick={() => navigate('/log-session')}
                    className="mt-4 bg-therapy-blue text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                >
                    Log Session
                </button>
            </div>

            {/* Goals Graph Section */}
            <div className="bg-white p-8 rounded-lg shadow-md w-100">
                <h2 className="text-2xl font-bold text-therapy-blue mb-4">Goals</h2>
                <BarChart width={350} height={200} data={goalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="progress" fill="#82ca9d" />
                </BarChart>
                <button
                    onClick={() => navigate('/set-goal')}
                    className="mt-4 bg-therapy-blue text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                >
                    Set Goal
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
