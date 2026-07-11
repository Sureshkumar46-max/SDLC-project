import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import DeveloperTasks from './pages/DeveloperTasks';
import QualityAssurance from './pages/QualityAssurance';
import ClientPortal from './pages/ClientPortal';
import AdminSettings from './pages/AdminSettings';
import Unauthorized from './pages/Unauthorized';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Authenticated Workspace Wrapper */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              {/* Common protected views (any logged-in user can access) */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Developer Tasks: Devs, QA, PMs, and Admins */}
              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={['Super Admin', 'Org Admin', 'Project Manager', 'Developer', 'QA/Tester']}
                  />
                }
              >
                <Route path="/dev-tasks" element={<DeveloperTasks />} />
              </Route>

              {/* QA Portal: QA, PMs, and Admins */}
              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={['Super Admin', 'Org Admin', 'Project Manager', 'QA/Tester']}
                  />
                }
              >
                <Route path="/qa-portal" element={<QualityAssurance />} />
              </Route>

              {/* Client Portal: Stakeholders and Admins */}
              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={['Super Admin', 'Org Admin', 'Client/Stakeholder']}
                  />
                }
              >
                <Route path="/client-portal" element={<ClientPortal />} />
              </Route>

              {/* Admin Settings: Only Org Admin & Super Admin */}
              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={['Super Admin', 'Org Admin']}
                  />
                }
              >
                <Route path="/admin-settings" element={<AdminSettings />} />
              </Route>
            </Route>
          </Route>

          {/* Catch-all redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
