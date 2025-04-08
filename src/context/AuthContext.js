import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail')); // Store user email

    // Check if the user is authenticated
    const isAuthenticated = !!token;

    // Login function
    const login = (token, email) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userEmail', email); // Save user email
        setToken(token);
        setUserEmail(email);
    };

    // Logout function
    const logout = (navigate) => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        setToken(null);
        setUserEmail(null);
        if (navigate) {
            navigate('/login'); // Redirect to the login page
        }
    };

    // Automatically log out if the token expires
    useEffect(() => {
        const checkTokenExpiration = () => {
            if (token) {
                const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token
                if (decodedToken.exp * 1000 < Date.now()) {
                    logout();
                }
            }
        };

        checkTokenExpiration();
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, userEmail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };