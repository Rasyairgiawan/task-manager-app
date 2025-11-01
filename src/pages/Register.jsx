import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaTasks, FaCheckCircle } from 'react-icons/fa';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        if (password.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-purple-600 via-pink-600 to-red-500">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-white bg-opacity-10 backdrop-blur-lg items-center justify-center p-12">
                <div className="text-white max-w-md">
                    <div className="flex items-center mb-8">
                        <div className="bg-white rounded-2xl p-4 shadow-2xl">
                            <FaTasks className="text-5xl text-purple-600" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold mb-6">Start Your Journey</h1>
                    <p className="text-xl mb-8 text-purple-100">
                        Join thousands of users who are already organizing their tasks efficiently with our powerful task management system.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <FaCheckCircle className="text-green-300 text-2xl" />
                            <span className="text-lg">Free forever plan</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaCheckCircle className="text-green-300 text-2xl" />
                            <span className="text-lg">No credit card required</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaCheckCircle className="text-green-300 text-2xl" />
                            <span className="text-lg">Unlimited tasks</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaCheckCircle className="text-green-300 text-2xl" />
                            <span className="text-lg">Cloud sync across devices</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="inline-flex bg-white rounded-2xl p-4 shadow-2xl mb-4">
                            <FaTasks className="text-5xl text-purple-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-white">Task Manager Pro</h2>
                    </div>

                    {/* Register Card */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                                <FaUser className="text-3xl text-purple-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                            <p className="text-gray-600 mt-2">Sign up to get started with Task Manager Pro</p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                        placeholder="Create a password"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                        placeholder="Confirm your password"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-start">
                                <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1" required />
                                <label className="ml-2 text-sm text-gray-600">
                                    I agree to the{' '}
                                    <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold">
                                        Terms of Service
                                    </a>
                                    {' '}and{' '}
                                    <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Creating Account...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <FaUser className="mr-2" />
                                        Create Account
                                    </span>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </div>

                        {/* Social Login (Optional) */}
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </button>
                                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                    <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-white text-sm mt-8">
                        © 2024 Task Manager Pro. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;