import { useAuth } from './context/AuthContext';
import { useTask } from './context/TaskContext';

export default function DebugAuth() {
    const { currentUser } = useAuth();
    const { tasks } = useTask();

    return (
        <div style={{
            background: '#f5f5f5',
            padding: '1rem',
            borderRadius: '8px',
            margin: '1rem',
            fontFamily: 'monospace'
        }}>
            <h3>🔍 Debug Info</h3>
            <p><strong>User:</strong> {currentUser ? currentUser.email : 'Belum login'}</p>
            <p><strong>Jumlah Task:</strong> {tasks?.length || 0}</p>
        </div>
    );
}
