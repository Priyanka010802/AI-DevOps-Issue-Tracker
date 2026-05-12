import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Issues from './pages/Issues';
import AIChat from './pages/AIChat';
import DeploymentMonitor from './pages/DeploymentMonitor';
import Projects from './pages/Projects';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-dark-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/projects" 
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/issues" 
          element={
            <PrivateRoute>
              <Issues />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/ai-chat" 
          element={
            <PrivateRoute>
              <AIChat />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/monitor" 
          element={
            <PrivateRoute>
              <DeploymentMonitor />
            </PrivateRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
