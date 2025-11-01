import { useTask } from '../context/TaskContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Statistics = () => {
    const { getStatistics } = useTask();
    const stats = getStatistics();

    const doughnutData = {
        labels: ['To Do', 'In Progress', 'Done'],
        datasets: [
            {
                data: [stats.todo, stats.inProgress, stats.done],
                backgroundColor: ['#ef4444', '#eab308', '#22c55e'],
                borderWidth: 2,
                borderColor: '#fff'
            }
        ]
    };

    const barData = {
        labels: ['Total', 'To Do', 'In Progress', 'Done', 'Overdue'],
        datasets: [
            {
                label: 'Tasks',
                data: [stats.total, stats.todo, stats.inProgress, stats.done, stats.overdue],
                backgroundColor: ['#3b82f6', '#ef4444', '#eab308', '#22c55e', '#f97316']
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
                }
            }
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                📊 Task Statistics
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">{stats.total}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Total Tasks</div>
                </div>
                <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-red-600 dark:text-red-300">{stats.todo}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">To Do</div>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-300">{stats.inProgress}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">In Progress</div>
                </div>
                <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-300">{stats.done}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Done</div>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-300">{stats.overdue}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Overdue</div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="h-64">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Status Distribution</h3>
                    <Doughnut data={doughnutData} options={options} />
                </div>
                <div className="h-64">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Task Overview</h3>
                    <Bar data={barData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default Statistics;
