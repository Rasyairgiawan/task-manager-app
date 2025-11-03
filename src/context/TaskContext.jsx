import { createContext, useContext, useEffect, useState } from 'react';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    onSnapshot,
    orderBy,
    serverTimestamp,
    writeBatch
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('useTask must be used within TaskProvider');
    return context;
};

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    // Real-time listener untuk tasks
    useEffect(() => {
        if (!currentUser) {
            setTasks([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'tasks'),
            where('userId', '==', currentUser.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const tasksData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setTasks(tasksData);
            setLoading(false);
        });

        return unsubscribe;
    }, [currentUser]);

    // Create Task
    const addTask = async (taskData) => {
        try {
            await addDoc(collection(db, 'tasks'), {
                ...taskData,
                userId: currentUser.uid,
                status: taskData.status || 'todo',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error adding task:', error);
            throw error;
        }
    };

    // Update Task
    const updateTask = async (taskId, updates) => {
        try {
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, {
                ...updates,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    };

    // Delete Task (Single)
    const deleteTask = async (taskId) => {
        try {
            await deleteDoc(doc(db, 'tasks', taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    };

    // ✅ NEW: Bulk Delete Tasks
    const bulkDeleteTasks = async (taskIds) => {
        try {
            // Firestore batch untuk delete multiple documents sekaligus
            const batch = writeBatch(db);

            taskIds.forEach((taskId) => {
                const taskRef = doc(db, 'tasks', taskId);
                batch.delete(taskRef);
            });

            // Execute batch delete
            await batch.commit();

            return { success: true, deletedCount: taskIds.length };
        } catch (error) {
            console.error('Error bulk deleting tasks:', error);
            throw error;
        }
    };

    // Update Task Status (untuk drag & drop)
    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            await updateTask(taskId, { status: newStatus });
        } catch (error) {
            console.error('Error updating task status:', error);
            throw error;
        }
    };

    // Get statistics
    const getStatistics = () => {
        const stats = {
            total: tasks.length,
            todo: tasks.filter(t => t.status === 'todo').length,
            inProgress: tasks.filter(t => t.status === 'inprogress').length,
            done: tasks.filter(t => t.status === 'done').length,
            overdue: tasks.filter(t => {
                if (!t.deadline) return false;
                const deadline = new Date(t.deadline);
                const today = new Date();
                return deadline < today && t.status !== 'done';
            }).length
        };
        return stats;
    };

    const value = {
        tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        bulkDeleteTasks,
        updateTaskStatus,
        getStatistics
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};