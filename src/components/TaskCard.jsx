import { FaTrash, FaEdit, FaClock, FaCalendar, FaCheck, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const TaskCard = ({ task, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description);
    const [editDeadline, setEditDeadline] = useState(task.deadline || '');
    const [editPriority, setEditPriority] = useState(task.priority || 'medium');

    const handleSave = () => {
        onEdit(task.id, {
            title: editTitle,
            description: editDescription,
            deadline: editDeadline,
            priority: editPriority
        });
        setIsEditing(false);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700';
            case 'low':
                return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600';
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high':
                return '🔴';
            case 'medium':
                return '🟡';
            case 'low':
                return '🟢';
            default:
                return '⚪';
        }
    };

    const isOverdue = () => {
        if (!task.deadline || task.status === 'done') return false;
        return new Date(task.deadline) < new Date();
    };

    if (isEditing) {
        return (
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-5 mb-4 border-2 border-blue-500 dark:border-blue-400">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Edit Task</h4>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        <FaTimes />
                    </button>
                </div>

                <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full mb-3 px-4 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Task title"
                />

                <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full mb-3 px-4 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Description"
                    rows="3"
                />

                <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="w-full mb-3 px-4 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="low">🟢 Low Priority</option>
                    <option value="medium">🟡 Medium Priority</option>
                    <option value="high">🔴 High Priority</option>
                </select>

                <input
                    type="date"
                    value={editDeadline}
                    onChange={(e) => setEditDeadline(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <div className="flex space-x-2">
                    <button
                        onClick={handleSave}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
                    >
                        <FaCheck /> <span>Save</span>
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
                    >
                        <FaTimes /> <span>Cancel</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-5 mb-4 hover:shadow-2xl transition-all cursor-move border-l-4 border-blue-500 dark:border-purple-500 group hover:scale-105 transform">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-800 dark:text-white text-lg flex-1 pr-2 leading-tight">
                    {task.title}
                </h3>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 p-2 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition"
                        title="Edit task"
                    >
                        <FaEdit className="text-lg" />
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this task?')) {
                                onDelete(task.id);
                            }
                        }}
                        className="text-red-500 hover:text-red-600 dark:hover:text-red-400 p-2 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition"
                        title="Delete task"
                    >
                        <FaTrash className="text-lg" />
                    </button>
                </div>
            </div>

            {/* Description */}
            {task.description && (
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {task.description}
                </p>
            )}

            {/* Tags & Info */}
            <div className="flex flex-wrap gap-2 items-center">
                {/* Priority Badge */}
                {task.priority && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getPriorityColor(task.priority)} flex items-center space-x-1`}>
                        <span>{getPriorityIcon(task.priority)}</span>
                        <span>{task.priority.toUpperCase()}</span>
                    </span>
                )}

                {/* Deadline */}
                {task.deadline && (
                    <div className={`flex items-center space-x-2 text-xs px-3 py-1 rounded-full ${isOverdue()
                            ? 'bg-red-100 text-red-700 border-2 border-red-300 dark:bg-red-900 dark:text-red-200'
                            : 'bg-blue-100 text-blue-700 border-2 border-blue-300 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                        <FaCalendar />
                        <span className="font-semibold">{new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                )}

                {/* Created Time */}
                {task.createdAt && (
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 px-3 py-1 bg-gray-100 dark:bg-gray-600 rounded-full">
                        <FaClock />
                        <span>{new Date(task.createdAt.toDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                )}
            </div>

            {/* Overdue Warning */}
            {isOverdue() && (
                <div className="mt-3 bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-2 rounded">
                    <p className="text-xs text-red-700 dark:text-red-200 font-semibold flex items-center">
                        <span className="mr-2">⚠️</span>
                        This task is overdue!
                    </p>
                </div>
            )}
        </div>
    );
};

export default TaskCard;