import axios from 'axios';

const fetchGoals = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/goals', {
            headers: { Authorization: token },
        });
        return response.data; // Array of goals
    } catch (error) {
        console.error('Error fetching goals:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

export default fetchGoals;