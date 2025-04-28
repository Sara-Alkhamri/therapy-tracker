import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../scss/components/_modals.scss'

const AuthForm = ({
    type = 'login',
    isModal = false,
    onSuccess,
    onSwitchType,
    newlyRegistered = false
}) => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    // Clear form when switching types, but preserve email if newly registered
    useEffect(() => {
        if (type === 'login' && newlyRegistered) {
            setFormData(prev => ({
                name: '',
                email: prev.email, // Keep the email from registration
                password: ''
            }));
        } else {
            setFormData({
                name: '',
                email: '',
                password: ''
            });
        }
        setError('');
    }, [type, newlyRegistered]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;
        setLoading(true);

        try {
            const endpoint = type === 'login' ? 'login' : 'register';
            const payload = type === 'login'
                ? { email: formData.email, password: formData.password }
                : formData;

            const response = await axios.post(
                `http://localhost:5000/auth/${endpoint}`,
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (type === 'login') {
                login(response.data.token, response.data.user);
                // Redirect to dashboard after successful login
                navigate('/dashboard');
            } else {
                // For registration, let the parent component handle success
                onSuccess?.();
            }
        } catch (err) {
            setError(err.response?.data?.message ||
                `${type === 'login' ? 'Login' : 'Registration'} failed. Please try again.`);
            console.error(`${type} error:`, err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-container">
            <h3 className="auth-title">
                {type === 'login'
                    ? newlyRegistered
                        ? 'Registration Successful!'
                        : 'Welcome Back'
                    : 'Create Your Account'}
            </h3>

            {newlyRegistered && type === 'login' && (
                <p className="auth-subtitle">Please login with your new credentials</p>
            )}

            {error && (
                <div className="auth-error">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
                {type === 'register' && (
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            autoComplete="name"
                        />
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        autoComplete="email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        autoComplete={type === 'login' ? 'current-password' : 'new-password'}
                        minLength="6"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="auth-submit-button" // This now uses the btn styles
                    aria-busy={loading}
                >
                    {loading ? (
                        <span className="loading-spinner"></span>
                    ) : type === 'login' ? (
                        'Log In'
                    ) : (
                        'Register'
                    )}
                </button>
            </form>


            <div className="auth-switch">
                {type === 'login' ? (
                    <p>
                        Don't have an account?{' '}
                        <button
                            type="button"
                            className="switch-button"
                            onClick={onSwitchType}
                        >
                            Sign up
                        </button>
                    </p>
                ) : (
                    <p>
                        Already have an account?{' '}
                        <button
                            type="button"
                            className="switch-button"
                            onClick={onSwitchType}
                        >
                            Sign in
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
};

AuthForm.propTypes = {
    type: PropTypes.oneOf(['login', 'register']),
    isModal: PropTypes.bool,
    onSuccess: PropTypes.func,
    onSwitchType: PropTypes.func.isRequired,
    newlyRegistered: PropTypes.bool
};

export default AuthForm;