import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                email,
                password,
            });
            login(response.data.token, email); // Pass the user email to the login function
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div class="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white p-8 rounded-lg shadow-md w-96 center">
                <form onSubmit={handleSubmit}>
                    <label className="mr-2 text-gray-700">Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br></br>
                    <label className="mr-2 text-gray-700">Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="mt-4 bg-therapy-blue text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;