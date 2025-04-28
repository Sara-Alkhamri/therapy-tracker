import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const storedToken = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');

                if (storedToken) {
                    // Optional: Add token expiration check here
                    setToken(storedToken);
                }

                if (storedUser) {
                    try {
                        setUser(JSON.parse(storedUser));
                    } catch (e) {
                        console.error("Failed to parse user data:", e);
                        localStorage.removeItem('user');
                    }
                }
            } catch (error) {
                console.error("Auth initialization error:", error);
            } finally {
                setIsInitialized(true);
            }
        };

        initializeAuth();
    }, []);

    const login = (newToken, userData, expiresIn) => {
        try {
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(userData));
            if (expiresIn) {
                const expiryDate = new Date();
                expiryDate.setSeconds(expiryDate.getSeconds() + expiresIn);
                localStorage.setItem('token_expiry', expiryDate.toISOString());
            }
            setToken(newToken);
            setUser(userData);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('token_expiry');
            setToken(null);
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{
            token,
            user,
            isAuthenticated,
            isInitialized,
            login,
            logout
        }}>
            {isInitialized ? children : <div>Loading...</div>}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useAuth = () => useContext(AuthContext);