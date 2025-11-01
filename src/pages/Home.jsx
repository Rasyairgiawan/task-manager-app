import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Navbar from '../components/Navbar';
import Column from '../components/Column';
import { useTask } from '../context/TaskContext';
import { FaPlus, FaFilter, FaChartBar } from 'react-icons/fa';
import Statistics from '../components/Statistics';

const Home = ({ darkMode, toggleDarkMode }) => {
    const { tasks, loading, addTask, deleteTask, updateTask, updateTaskStatus } = useTask();
    const [showAddTask, setShowAddTask] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Form state
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium',
        deadline: ''
    });

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) return;

        try {
            await addTask(newTask);
            setNewTask({ title: '', description: '', priority: 'medium', deadline: '' });
            setShowAddTask(false);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const newStatus = destination.droppableId;
        await updateTaskStatus(draggableId, newStatus);
    };

    // Filter tasks
    const getFilteredTasks = (status) => {
        let filtered = tasks.filter(task => task.status === status);

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Apply status filter
        if (filterStatus !== 'all') {
            if (filterStatus === 'overdue') {
                filtered = filtered.filter(task => {
                    if (!task.deadline || task.status === 'done') return false;
                    return new Date(task.deadline) < new Date();
                });
            }
        }

        return filtered;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="text-2xl text-gray-600 dark:text-gray-400">Loading tasks...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Header Controls */}
                <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowAddTask(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                        >
                            <FaPlus /> <span>Add Task</span>
                        </button>

                        <button
                            onClick={() => setShowStats(!showStats)}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                        >
                            <FaChartBar /> <span>Statistics</span>
                        </button>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                        />

                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                        >
                            <option value="all">All Tasks</option>
                            <option value="overdue">Overdue</option>
                        </select>
                    </div>
                </div>

                {/* Statistics Panel */}
                {showStats && <Statistics />}

                {/* Add Task Modal */}
                {showAddTask && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                                Add New Task
                            </h2>
                            <form onSubmit={handleAddTask} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Task title"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                    required
                                />

                                <textarea
                                    placeholder="Description (optional)"
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                    rows="3"
                                />

                                <select
                                    value={newTask.priority}
                                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                </select>

                                <input
                                    type="date"
                                    value={newTask.deadline}
                                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                />

                                <div className="flex space-x-2">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Add Task
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddTask(false)}
                                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Kanban Board */}
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="flex gap-4 overflow-x-auto pb-4">
                        <Column
                            columnId="todo"
                            title="To Do"
                            tasks={getFilteredTasks('todo')}
                            onDelete={deleteTask}
                            onEdit={updateTask}
                            color="bg-red-500"
                        />
                        <Column
                            columnId="inprogress"
                            title="In Progress"
                            tasks={getFilteredTasks('inprogress')}
                            onDelete={deleteTask}
                            onEdit={updateTask}
                            color="bg-yellow-500"
                        />
                        <Column
                            columnId="done"
                            title="Done"
                            tasks={getFilteredTasks('done')}
                            onDelete={deleteTask}
                            onEdit={updateTask}
                            color="bg-green-500"
                        />
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
};

export default Home;