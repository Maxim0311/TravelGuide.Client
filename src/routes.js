import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import RegistrationPage from './pages/RegistrationPage';
import RouteCreatePage from './pages/RouteCreatePage';
import RouteDetails from './pages/RouteDetails';
import RoutesPage from './pages/RoutesPage';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/Routes" replace />} />
        <Route path="Routes" element={<RoutesPage />} />
        <Route path="RouteDetails/:id" element={<RouteDetails />} />
        {/* <Route path="CreateRoute" element={<CreateRoutePage />} /> */}
        <Route path="CreateRoute" element={<RouteCreatePage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/Auth" replace />} />
      <Route path="Auth" element={<AuthPage />} />
      <Route path="Registration" element={<RegistrationPage />} />
    </Routes>
  );
};
