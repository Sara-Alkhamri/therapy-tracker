import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
    const { isAuthenticated, isInitialized } = useAuth();

    if (!isInitialized) return <div>Loading...</div>;
    if (isAuthenticated === null) return <div>Error checking authentication</div>;
    return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;