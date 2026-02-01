import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import TestInterface from './pages/TestInterface';
import Admin from './pages/Admin';
import Result from './pages/Result';

function App() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <Routes>
                <Route path="/" element={<Navigate to="/auth" />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/test/:testId" element={<TestInterface />} />
                <Route path="/result" element={<Result />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </div>
    );
}

export default App;
