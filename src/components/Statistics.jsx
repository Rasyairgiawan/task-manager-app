import { useTask } from '../context/TaskContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { FaTasks, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Statistics = () => {
    const { getStatistics } = useTask();
    const stats = getStatistics();

    const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

    const doughnutData = {
        labels: ['To Do', 'In Progress', 'Done'],
        datasets: [
            {
                data: [stats.todo, stats.inProgress, stats.done],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(234, 179, 8, 0.8)',
                    'rgba(34, 197, 94, 0.8)'
                ],
                borderColor: [
                    'rgb(239, 68, 68)',
                    'rgb(234, 179, 8)',
                    'rgb(34, 197, 94)'
                ],
                borderWidth: 3,
                hoverOffset: 10
            }
        ]
    };

    const barData = {
        labels: ['Total', 'To Do', 'In Progress', 'Done', 'Overdue'],
        datasets: [
            {
                label: 'Number of Tasks',
                data: [stats.total, stats.todo, stats.inProgress, stats.done, stats.overdue],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(234, 179, 8, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(249, 115, 22, 0.8)'
                ],
                borderColor: [
                    'rgb(59, 130, 246)',
                    'rgb(239, 68, 68)',
                    'rgb(234, 179, 8)',
                    'rgb(34, 197, 94)',
                    'rgb(249, 115, 22)'
                ],
                borderWidth: 2,
                borderRadius: 8
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                    padding: 15
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 13
                },
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1
            }
        }
    };

    const barOptions = {
        ...chartOptions,
        plugins: {
            ...chartOptions.plugins,
            title: {
                display: true,
                text: 'Task Distribution',
                color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
                    stepSize: 1
                },
                grid: {
                    color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                }
            },
            x: {
                ticks: {
                    color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280'
                },
                grid: {
                    display: false
                }
            }
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-6 border-t-4 border-blue-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-3 mr-4 shadow-lg">
                            📊
                        </span>
                        Task Statistics
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Your productivity overview</p>
                </div>
                <div className="text-right">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {completionRate}%
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">Completion Rate</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-xl text-white shadow-lg transform hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-2">
                        <FaTasks className="text-3xl opacity-80" />
                        <div className="text-4xl font-bold">{stats.total}</div>
                    </div>
                    <div className="text-sm font-semibold opacity-90">Total Tasks</div>
                </div>

                <div className="bg-gradient-to-br from-red-500 to-red-600 p-5 rounded-xl text-white shadow-lg transform hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-2">
                        <FaClock className="text-3xl opacity-80" />
                        <div className="text-4xl font-bold">{stats.todo}</div>
                    </div>
                    <div className="text-sm font-semibold opacity-90">To Do</div>
                </div>

                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-5 rounded-xl text-white shadow-lg transform hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-3xl opacity-80">⚡</div>
                        <div className="text-4xl font-bold">{stats.inProgress}</div>
                    </div>
                    <div className="text-sm font-semibold opacity-90">In Progress</div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 p-5 rounded-xl text-white shadow-lg transform hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-2">
                        <FaCheckCircle className="text-3xl opacity-80" />
                        <div className="text-4xl font-bold">{stats.done}</div>
                    </div>
                    <div className="text-sm font-semibold opacity-90">Completed</div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 rounded-xl text-white shadow-lg transform hover:scale-105 transition">
                    <div className="flex items-center justify-between mb-2">
                        <FaExclamationTriangle className="text-3xl opacity-80" />
                        <div className="text-4xl font-bold">{stats.overdue}</div>
                    </div>
                    <div className="text-sm font-semibold opacity-90">Overdue</div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-inner">
                    <h3 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-200 text-center">
                        Status Distribution
                    </h3>
                    <div className="h-72">
                        <Doughnut data={doughnutData} options={chartOptions} />
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-inner">
                    <h3 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-200 text-center">
                        Task Overview
                    </h3>
                    <div className="h-72">
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>
            </div>

            {/* Insights */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-1">💡 Insight</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        You have {stats.total} total tasks. Keep up the great work!
                    </p>
                </div>

                {stats.overdue > 0 && (
                    <div className="bg-orange-50 dark:bg-orange-900 border-l-4 border-orange-500 p-4 rounded-lg">
                        <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-1">⚠️ Alert</h4>
                        <p className="text-sm text-orange-700 dark:text-orange-300">
                            You have {stats.overdue} overdue task{stats.overdue > 1 ? 's' : ''}. Time to catch up!
                        </p>
                    </div>
                )}

                {completionRate >= 50 && (
                    <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 p-4 rounded-lg">
                        <h4 className="font-bold text-green-800 dark:text-green-200 mb-1">🎉 Achievement</h4>
                        <p className="text-sm text-green-700 dark:text-green-300">
                            Great job! You've completed {completionRate}% of your tasks.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Statistics;