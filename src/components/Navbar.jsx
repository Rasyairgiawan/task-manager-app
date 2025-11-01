import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaSignOutAlt, FaTasks, FaUser } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-xl border-b-4 border-blue-500 dark:border-purple-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo & Brand */}
                    <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-3 shadow-lg">
                            <FaTasks className="text-white text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Task Manager Pro
                            </h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Organize. Plan. Achieve.</p>
                        </div>
                    </div>

                    {/* Right Side Controls */}
                    <div className="flex items-center space-x-4">
                        {/* User Email - Desktop */}
                        <div className="hidden md:flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
                                <FaUser className="text-white text-sm" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Logged in as</p>
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    {currentUser?.email}
                                </p>
                            </div>
                        </div>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="relative p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition group"
                            aria-label="Toggle dark mode"
                            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            <div className="relative w-6 h-6">
                                {darkMode ? (
                                    <FaSun className="text-yellow-400 text-2xl animate-spin-slow" />
                                ) : (
                                    <FaMoon className="text-gray-600 text-2xl" />
                                )}
                            </div>
                            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                {darkMode ? 'Light Mode' : 'Dark Mode'}
                            </span>
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-3 rounded-xl transition transform hover:scale-105 shadow-lg group"
                            title="Logout"
                        >
                            <FaSignOutAlt className="group-hover:rotate-12 transition-transform" />
                            <span className="hidden sm:inline font-semibold">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile User Info */}
            <div className="md:hidden bg-gray-50 dark:bg-gray-900 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
                        <FaUser className="text-white text-sm" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Logged in as</p>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                            {currentUser?.email}
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;