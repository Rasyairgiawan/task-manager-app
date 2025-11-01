import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaSignOutAlt, FaTasks } from 'react-icons/fa';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <FaTasks className="text-blue-500 text-2xl mr-3" />
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                            Task Manager
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
                            {currentUser?.email}
                        </span>

                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? (
                                <FaSun className="text-yellow-400 text-xl" />
                            ) : (
                                <FaMoon className="text-gray-600 text-xl" />
                            )}
                        </button>

                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                        >
                            <FaSignOutAlt />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;