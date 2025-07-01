// src/App.js
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthForm from './components/Login';
import Dashboard from './components/Dashboard';

const AuthGuard = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return user ? <Dashboard /> : <AuthForm />;
};

const App = () => (
  <AuthProvider>
    <AuthGuard />
  </AuthProvider>
);

export default App;
