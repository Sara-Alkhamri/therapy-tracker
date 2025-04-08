import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LogSessionPage from './pages/LogSessionPage';
import SetGoalPage from './pages/SetGoalPage';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Create a separate component for the navigation and routing logic
const AppContent = () => {
  const { isAuthenticated, logout, userEmail } = useContext(AuthContext);
  const navigate = useNavigate(); // Use the useNavigate hook
  const location = useLocation(); // Use the useLocation hook to get the current route

  const handleLogout = () => {
    logout(navigate); // Pass the navigate function to logout
  };

  return (
    <>
      <nav>
        <Link to="/"></Link>
        {isAuthenticated ? (
          <>
            <nav className="mb-6 flex justify-around m-4">
              <div>
                <span>Welcome, {userEmail}</span>
              </div>
              <div className="flex">
                {/* Only show Dashboard link if not on Dashboard page */}
                {location.pathname !== '/dashboard' && (
                  <Link to="/dashboard" className="text-therapy-blue hover:underline pr-4">
                    Dashboard
                  </Link>
                )}

                {/* Show "Log Session" and "Set Goal" links on Dashboard and respective pages */}
                {(location.pathname === '/dashboard' || location.pathname === '/set-goal') && (
                  <Link to="/log-session" className="text-therapy-blue hover:underline pr-4">
                    Sessions
                  </Link>
                )}
                {(location.pathname === '/dashboard' || location.pathname === '/log-session') && (
                  <Link to="/set-goal" className="text-therapy-blue hover:underline pr-4">
                    Goals
                  </Link>
                )}
                <button onClick={handleLogout} className="pr-4">
                  Logout
                </button>
              </div>
            </nav>
          </>
        ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/log-session" element={<LogSessionPage />} />
        <Route path="/set-goal" element={<SetGoalPage />} />
      </Routes>
    </>
  );
};

// Wrap the AppContent with the Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
