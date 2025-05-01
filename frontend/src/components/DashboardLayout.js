import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';

import Navigation from '../components/Navigation';

const DashboardLayout = () => {
    const location = useLocation();
    const hideNavPaths = ['/login', '/register', '/'];
    const shouldShowNav = !hideNavPaths.includes(location.pathname);

    return (
        <div className="min-h-screen bg-gray-100">
            {shouldShowNav && <Navigation />}
            <div className={`${shouldShowNav ? 'pt-16' : ''}`}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;