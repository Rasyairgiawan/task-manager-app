import { AuthProvider, useAuth } from "../context/AuthContext";
import { auth } from '../firebase';

function DebugAuth() {
    const { currentUser } = useAuth();
    return <pre>{currentUser ? currentUser.email : "Belum login"}</pre>;
}

function App() {
    return (
        <AuthProvider>
            <DebugAuth />
        </AuthProvider>
    );
}

export default App;
