import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import LogSessionPage from './pages/LogSessionPage';
import SetGoalPage from './pages/SetGoalPage';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/log-session" element={<LogSessionPage />} />
            <Route path="/set-goal" element={<SetGoalPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;