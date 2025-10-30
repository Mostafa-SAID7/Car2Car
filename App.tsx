
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/Toaster';
import DashboardLayout from './components/layout/DashboardLayout';
import Landing from './components/pages/Landing';
import Dashboard from './components/pages/Dashboard';
import Services from './components/pages/Services';
import Appointments from './components/pages/Appointments';
import Vehicles from './components/pages/Vehicles';
import Mechanics from './components/pages/Mechanics';
import Settings from './components/pages/Settings';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'system');

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={!isAuthenticated ? <Landing onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <DashboardLayout onLogout={handleLogout}><Dashboard /></DashboardLayout> : <Navigate to="/" />} />
          <Route path="/services" element={isAuthenticated ? <DashboardLayout onLogout={handleLogout}><Services /></DashboardLayout> : <Navigate to="/" />} />
          <Route path="/appointments" element={isAuthenticated ? <DashboardLayout onLogout={handleLogout}><Appointments /></DashboardLayout> : <Navigate to="/" />} />
          <Route path="/vehicles" element={isAuthenticated ? <DashboardLayout onLogout={handleLogout}><Vehicles /></DashboardLayout> : <Navigate to="/" />} />
          <Route path="/mechanics" element={isAuthenticated ? <DashboardLayout onLogout={handleLogout}><Mechanics /></DashboardLayout> : <Navigate to="/" />} />
          <Route path="/settings" element={isAuthenticated ? <DashboardLayout onLogout={handleLogout}><Settings /></DashboardLayout> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
        </Routes>
      </HashRouter>
      <Toaster />
    </ThemeContext.Provider>
  );
};

export default App;