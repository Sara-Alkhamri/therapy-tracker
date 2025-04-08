import React, { useState, useEffect } from 'react';
import fetchGoals from '../api/fetchGoals';

const SetGoalPage = () => {
    const [goals, setGoals] = useState([]);
    const [description, setDescription] = useState('');
    const [progress, setProgress] = useState(0);
    const [editingGoal, setEditingGoal] = useState(null); // Track the goal being edited

    // Function to fetch goals
    const getGoals = async () => {
        try {
            const data = await fetchGoals();
            setGoals(data);
        } catch (error) {
            console.error('Error fetching goals:', error);
        }
    };

    // Fetch goals when the component mounts
    useEffect(() => {
        getGoals();
    }, []);

    // Handle form submission (for adding or updating a goal)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingGoal) {
            // Update the existing goal
            const updatedGoals = goals.map((goal) =>
                goal.id === editingGoal.id ? { ...goal, description, progress } : goal
            );
            setGoals(updatedGoals);
            setEditingGoal(null); // Reset editing state
        } else {
            // Add a new goal
            const newGoal = { id: Date.now(), description, progress }; // Use a unique ID
            setGoals([...goals, newGoal]);
        }
        setDescription('');
        setProgress(0);
    };

    // Handle editing a goal
    const handleEdit = (goal) => {
        setEditingGoal(goal);
        setDescription(goal.description);
        setProgress(goal.progress);
    };

    // Handle deleting a goal
    const handleDelete = (id) => {
        const updatedGoals = goals.filter((goal) => goal.id !== id);
        setGoals(updatedGoals);
    };

    return (
        <div className="min-h-screen bg-gray-100 grid grid-cols-2 gap-6 p-6">
            <div className="bg-white p-8 rounded-lg shadow-md">

                <h1 className="text-2xl font-bold text-therapy-blue mb-4">Set Goal</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Goal Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Progress"
                        value={progress}
                        onChange={(e) => setProgress(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-therapy-blue text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                    >
                        {editingGoal ? 'Update Goal' : 'Set Goal'}
                    </button>
                </form>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-therapy-blue mt-6 mb-4">Goals</h2>
                <ul>
                    {goals.map((goal) => (
                        <li key={goal.id} className="mb-2 flex justify-between items-center">
                            <div>
                                {goal.description} (Progress: {goal.progress}%)
                            </div>
                            <div>
                                <button
                                    onClick={() => handleEdit(goal)}
                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(goal.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SetGoalPage;