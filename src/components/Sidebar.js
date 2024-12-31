import React from 'react';
import { 
  HomeIcon, 
  ChartBarIcon, 
  UsersIcon, 
  CogIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ activeScreen, setActiveScreen, onLogout, userName }) => {
  const navigation = [
    { name: 'Dashboard', icon: HomeIcon, screen: 'dashboard' },
    { name: 'Analytics', icon: ChartBarIcon, screen: 'analytics' },
    { name: 'Users', icon: UsersIcon, screen: 'users' },
    { name: 'Settings', icon: CogIcon, screen: 'settings' }
  ];

  const handleNavigation = (screen) => {
    if (screen === 'logout') {
      onLogout();
    } else {
      setActiveScreen(screen);
    }
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-white text-2xl font-bold">Analytics</h1>
          </div>
          
          {/* User Info */}
          <div className="px-4 py-3 mt-4 border-t border-gray-700">
            <p className="text-sm text-gray-300">Logged in as</p>
            <p className="text-sm font-medium text-white">{userName}</p>
          </div>

          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.screen)}
                className={`${
                  activeScreen === item.screen
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
              >
                <item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-md"
          >
            <ArrowLeftOnRectangleIcon className="mr-3 flex-shrink-0 h-6 w-6" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;