import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    emailUpdates: true,
    language: 'en'
  });
  const { darkMode, toggleDarkMode } = useTheme();
  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="p-8 dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Notifications</h3>
            <p className="text-gray-500">Receive notifications about updates</p>
          </div>
          <button
            onClick={() => handleToggle('notifications')}
            className={`${
              settings.notifications ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${
                settings.notifications ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-1`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium dark:text-white">Dark Mode</h3>
            <p className="text-gray-500 dark:text-gray-300">Enable dark mode interface</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`${
              darkMode ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-1`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Email Updates</h3>
            <p className="text-gray-500">Receive email updates about activity</p>
          </div>
          <button
            onClick={() => handleToggle('emailUpdates')}
            className={`${
              settings.emailUpdates ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${
                settings.emailUpdates ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-1`}
            />
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium">Language</label>
          <select
            value={settings.language}
            onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;