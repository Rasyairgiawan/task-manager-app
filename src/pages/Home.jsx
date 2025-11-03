import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Navbar from '../components/Navbar';
import Column from '../components/Column';
import { useTask } from '../context/TaskContext';
import { FaPlus, FaChartBar, FaTimes, FaTrashAlt, FaCheckSquare } from 'react-icons/fa';
import Statistics from '../components/Statistics';

const Home = ({ darkMode, toggleDarkMode }) => {
    const { tasks, loading, addTask, deleteTask, updateTask, updateTaskStatus, bulkDeleteTasks } = useTask();
    const [showAddTask, setShowAddTask] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // ✅ NEW: Bulk Delete States
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);

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

    // ✅ NEW: Toggle Selection Mode
    const toggleSelectionMode = () => {
        setSelectionMode(!selectionMode);
        setSelectedTasks([]);
    };

    // ✅ NEW: Toggle Task Selection
    const toggleTaskSelection = (taskId) => {
        setSelectedTasks(prev => {
            if (prev.includes(taskId)) {
                return prev.filter(id => id !== taskId);
            } else {
                return [...prev, taskId];
            }
        });
    };

    // ✅ NEW: Select All Tasks
    const selectAllTasks = () => {
        if (selectedTasks.length === tasks.length) {
            setSelectedTasks([]);
        } else {
            setSelectedTasks(tasks.map(task => task.id));
        }
    };

    // ✅ NEW: Handle Bulk Delete
    const handleBulkDelete = async () => {
        if (selectedTasks.length === 0) return;

        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${selectedTasks.length} task${selectedTasks.length > 1 ? 's' : ''}?`
        );

        if (!confirmDelete) return;

        try {
            setIsDeleting(true);
            await bulkDeleteTasks(selectedTasks);
            setSelectedTasks([]);
            setSelectionMode(false);
        } catch (error) {
            console.error('Error bulk deleting tasks:', error);
            alert('Failed to delete tasks. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                    <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Loading your tasks...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Header Controls */}
                <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => setShowAddTask(true)}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={selectionMode}
                            >
                                <FaPlus /> <span className="font-semibold">New Task</span>
                            </button>

                            <button
                                onClick={() => setShowStats(!showStats)}
                                className={`${showStats
                                    ? 'bg-gradient-to-r from-purple-500 to-purple-600'
                                    : 'bg-gradient-to-r from-purple-400 to-purple-500'
                                    } hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
                                disabled={selectionMode}
                            >
                                <FaChartBar /> <span className="font-semibold">Statistics</span>
                            </button>

                            {/* ✅ NEW: Selection Mode Toggle */}
                            <button
                                onClick={toggleSelectionMode}
                                className={`${selectionMode
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                                    : 'bg-gradient-to-r from-gray-500 to-gray-600'
                                    } hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition transform hover:scale-105 shadow-md`}
                            >
                                {selectionMode ? <FaTimes /> : <FaCheckSquare />}
                                <span className="font-semibold">{selectionMode ? 'Cancel Selection' : 'Select Tasks'}</span>
                            </button>

                            {/* ✅ NEW: Bulk Action Buttons (Only visible in selection mode) */}
                            {selectionMode && (
                                <>
                                    <button
                                        onClick={selectAllTasks}
                                        className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition transform hover:scale-105 shadow-md"
                                    >
                                        <FaCheckSquare />
                                        <span className="font-semibold">
                                            {selectedTasks.length === tasks.length ? 'Deselect All' : 'Select All'}
                                        </span>
                                    </button>

                                    <button
                                        onClick={handleBulkDelete}
                                        disabled={selectedTasks.length === 0 || isDeleting}
                                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FaTrashAlt />
                                        <span className="font-semibold">
                                            {isDeleting ? 'Deleting...' : `Delete Selected (${selectedTasks.length})`}
                                        </span>
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="px-4 py-3 pl-10 border-2 border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition w-64"
                                    disabled={selectionMode}
                                />
                                <svg className="w-5 h-5 absolute left-3 top-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={selectionMode}
                            >
                                <option value="all">All Tasks</option>
                                <option value="overdue">Overdue Only</option>
                            </select>
                        </div>
                    </div>

                    {/* ✅ NEW: Selection Info Banner */}
                    {selectionMode && (
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 rounded">
                            <p className="text-blue-700 dark:text-blue-200 font-semibold">
                                📋 Selection Mode Active - {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''} selected
                            </p>
                        </div>
                    )}
                </div>

                {/* Statistics Panel */}
                {showStats && <Statistics />}

                {/* Add Task Modal */}
                {showAddTask && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all animate-fadeIn">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                                    <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-2 mr-3">
                                        <FaPlus className="text-blue-600 dark:text-blue-300" />
                                    </div>
                                    Add New Task
                                </h2>
                                <button
                                    onClick={() => setShowAddTask(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                                >
                                    <FaTimes className="text-2xl" />
                                </button>
                            </div>

                            <form onSubmit={handleAddTask} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Task Title *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter task title..."
                                        value={newTask.title}
                                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        placeholder="Add more details..."
                                        value={newTask.description}
                                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                                        rows="3"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Priority Level
                                    </label>
                                    <select
                                        value={newTask.priority}
                                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    >
                                        <option value="low">🟢 Low Priority</option>
                                        <option value="medium">🟡 Medium Priority</option>
                                        <option value="high">🔴 High Priority</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Deadline (Optional)
                                    </label>
                                    <input
                                        type="date"
                                        value={newTask.deadline}
                                        onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>

                                <div className="flex space-x-3 pt-2">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg"
                                    >
                                        Create Task
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddTask(false)}
                                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition"
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
                    <div className="flex gap-6 overflow-x-auto pb-4">
                        <Column
                            columnId="todo"
                            title="📋 To Do"
                            tasks={getFilteredTasks('todo')}
                            onDelete={deleteTask}
                            onEdit={updateTask}
                            color="bg-gradient-to-r from-red-500 to-red-600"
                            selectionMode={selectionMode}
                            selectedTasks={selectedTasks}
                            onToggleSelect={toggleTaskSelection}
                        />
                        <Column
                            columnId="inprogress"
                            title="⚡ In Progress"
                            tasks={getFilteredTasks('inprogress')}
                            onDelete={deleteTask}
                            onEdit={updateTask}
                            color="bg-gradient-to-r from-yellow-500 to-yellow-600"
                            selectionMode={selectionMode}
                            selectedTasks={selectedTasks}
                            onToggleSelect={toggleTaskSelection}
                        />
                        <Column
                            columnId="done"
                            title="✅ Done"
                            tasks={getFilteredTasks('done')}
                            onDelete={deleteTask}
                            onEdit={updateTask}
                            color="bg-gradient-to-r from-green-500 to-green-600"
                            selectionMode={selectionMode}
                            selectedTasks={selectedTasks}
                            onToggleSelect={toggleTaskSelection}
                        />
                    </div>
                </DragDropContext>

                {/* Empty State */}
                {tasks.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
                            <FaPlus className="text-5xl text-blue-500 dark:text-blue-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No tasks yet!</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Create your first task to get started</p>
                        <button
                            onClick={() => setShowAddTask(true)}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg"
                        >
                            Create Your First Task
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;