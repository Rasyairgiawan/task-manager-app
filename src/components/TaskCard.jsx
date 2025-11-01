import { FaTrash, FaEdit, FaClock, FaCalendar } from 'react-icons/fa';
import { useState } from 'react';

const TaskCard = ({ task, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description);
    const [editDeadline, setEditDeadline] = useState(task.deadline || '');

    const handleSave = () => {
        onEdit(task.id, {
            title: editTitle,
            description: editDescription,
            deadline: editDeadline
        });
        setIsEditing(false);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'low':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    const isOverdue = () => {
        if (!task.deadline || task.status === 'done') return false;
        return new Date(task.deadline) < new Date();
    };

    if (isEditing) {
        return (
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 mb-3">
                <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full mb-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                    placeholder="Task title"
                />
                <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full mb-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                    placeholder="Description"
                    rows="3"
                />
                <input
                    type="date"
                    value={editDeadline}
                    onChange={(e) => setEditDeadline(e.target.value)}
                    className="w-full mb-3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                />
                <div className="flex space-x-2">
                    <button
                        onClick={handleSave}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 mb-3 hover:shadow-lg transition cursor-move">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                    {task.title}
                </h3>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-500 hover:text-blue-600"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-red-500 hover:text-red-600"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>

            {task.description && (
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {task.description}
                </p>
            )}

            <div className="flex flex-wrap gap-2 items-center">
                {task.priority && (
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority.toUpperCase()}
                    </span>
                )}

                {task.deadline && (
                    <div className={`flex items-center space-x-1 text-xs ${isOverdue() ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                        <FaCalendar />
                        <span>{new Date(task.deadline).toLocaleDateString()}</span>
                    </div>
                )}

                {task.createdAt && (
                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                        <FaClock />
                        <span>{new Date(task.createdAt.toDate()).toLocaleDateString()}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;