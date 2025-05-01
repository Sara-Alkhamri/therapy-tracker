import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const Navigation = ({ variant = 'dashboard' }) => {
    const { user, logout } = useAuth();
    const [authModal, setAuthModal] = useState(null);
    const [newlyRegistered, setNewlyRegistered] = useState(false);
    const navigate = useNavigate();
    const modalRef = useRef(null);

    const AuthModalContent = ({ type }) => (
        <div className="modal-content" ref={modalRef}>
            <button
                className="close-btn"
                onClick={() => {
                    setAuthModal(null);
                    setNewlyRegistered(false);
                }}
            >
                ×
            </button>
            <AuthForm
                type={type}
                isModal={true}
                onSuccess={() => {
                    if (type === 'register') {
                        setNewlyRegistered(true);
                        setAuthModal('login');
                    } else {
                        setAuthModal(null);
                    }
                }}
                onSwitchType={() => setAuthModal(
                    type === 'login' ? 'register' : 'login'
                )}
                newlyRegistered={newlyRegistered}
            />
        </div>
    );

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            {authModal && (
                <div className="auth-modal">
                    <AuthModalContent type={authModal} />
                </div>
            )}

            {variant === 'landing' ? (
                <nav className="landing-nav">
                    <div className="nav-container">
                        <Link to="/" className="logo">
                            <img src="/logo.png" alt="Solace Logo" className="logo-image" />
                            <p className='logo-text'>Solace</p>
                        </Link>
                        <div className="nav-links">
                            <button
                                onClick={() => setAuthModal('login')}
                                className="btn btn--secondary"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setAuthModal('register')}
                                className="btn btn--primary"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </nav>
            ) : (
                <nav className="bg-white shadow-md fixed w-full z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex items-center">
                                <Link to="/" className="logo">
                                    <img src="/logo.png" alt="Solace Logo" className="logo-image" />
                                </Link>
                                <div className="hidden md:block ml-10 flex items-baseline space-x-4">
                                    <NavLink to="/dashboard">Dashboard</NavLink>
                                    <NavLink to="/log-session">Log Session</NavLink>
                                    <NavLink to="/set-goal">Set Goals</NavLink>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <span className="text-gray-700 mr-4">
                                        Hello, {user?.email || 'User'}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
};

const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
        >
            {children}
        </Link>
    );
};

export default Navigation;