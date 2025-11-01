import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import ProtectedRoute from "./components/ProtectedRoute";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { useState, useEffect } from 'react';
import DebugAuth from './DebugAuth';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          {/* Debug sementara */}
          <DebugAuth />
          <div className={darkMode ? 'dark' : ''}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
