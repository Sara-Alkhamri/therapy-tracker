import axios from 'axios';

const fetchSessions = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/sessions', {
            headers: { Authorization: token },
        });
        return response.data; // Array of sessions
    } catch (error) {
        console.error('Error fetching sessions:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

export default fetchSessions;