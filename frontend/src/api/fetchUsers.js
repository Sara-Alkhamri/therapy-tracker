import axios from 'axios';

const fetchUsers = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/users', {
            headers: { Authorization: token },
        });
        return response.data; // Array of users
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

export default fetchUsers;