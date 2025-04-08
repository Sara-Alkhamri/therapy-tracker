import axios from 'axios';

const logGoal = async (description) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            'http://localhost:5000/goals',
            { description },
            { headers: { Authorization: token } }
        );
        return response.data; // "Goal set"
    } catch (error) {
        console.error('Error logging goal:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

export default logGoal;