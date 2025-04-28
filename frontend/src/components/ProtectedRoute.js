import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isInitialized } = useAuth();

    if (!isInitialized) return <div>Loading...</div>;
    return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;