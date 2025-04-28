import React from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from './Footer';

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Don't show nav on these routes
    const hideNavPaths = ['/login', '/register', '/'];
    const shouldShowNav = !hideNavPaths.includes(location.pathname);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {shouldShowNav && (
                <nav className="bg-white shadow-md fixed w-full z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex items-center">
                                <Link to="/" className="logo">
                                    <img
                                        src="/logo.png"
                                        alt="Solace Logo"
                                        className="logo-image"
                                    />
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
            <div className={`${shouldShowNav ? 'pt-16' : ''}`}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <a
            href={to}
            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
        >
            {children}
        </a>
    );
};

export default DashboardLayout;