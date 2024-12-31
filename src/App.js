import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Users from './components/User';
import Settings from './components/Settings';
import Analytics from './components/Analytics';
import { useTheme } from './context/ThemeContext';

function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [user, setUser] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <AnalyticsDashboard />;
      case 'analytics':
        return <Analytics />;
      case 'users':
        return <Users />;
      case 'settings':
        return <Settings />;
      default:
        return <div className="p-8">Screen under construction</div>;
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className={`h-screen flex ${darkMode ? 'dark' : ''}`}>
      <Sidebar 
        activeScreen={activeScreen} 
        setActiveScreen={setActiveScreen}
        onLogout={handleLogout}
        userName={user.name}
      />
      <div className="flex-1 flex flex-col md:pl-64">
        <main className={`flex-1 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}

export default App;