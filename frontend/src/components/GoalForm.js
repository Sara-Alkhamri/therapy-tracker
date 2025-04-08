import React, { useState } from 'react';
import logGoal from '../api/logGoal'; // Import the logGoal function

const GoalForm = ({ fetchGoals }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await logGoal(description);
            alert('Goal logged successfully!');
            setDescription(''); // Clear the input field
            fetchGoals(); // Refresh the goals list
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to log goal.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                placeholder="Goal description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">Set Goal</button>
        </form>
    );
};

export default GoalForm;