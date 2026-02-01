import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const { data } = await api.get('/tests');
                setTests(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTests();
    }, []);

    const startTest = (testId) => {
        // Full screen request could go here
        navigate(`/test/${testId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <header className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Hello, {user?.name || 'Student'}</h1>
                    <p className="text-gray-500">Ready to test your knowledge?</p>
                </div>
                <button onClick={() => { localStorage.removeItem('user'); navigate('/auth'); }} className="text-red-500 hover:text-red-700">Logout</button>
            </header>

            <main className="max-w-7xl mx-auto">
                <h2 className="text-xl font-bold mb-6 border-l-4 border-indigo-600 pl-3">Available Tests</h2>

                {loading ? (
                    <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tests.map((test) => (
                            <motion.div
                                key={test._id}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                            >
                                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{test.title}</h3>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center"><Clock size={16} className="mr-1" /> {test.duration} mins</div>
                                        {test.negativeMarks > 0 && (
                                            <div className="flex items-center text-red-500"><AlertCircle size={16} className="mr-1" /> -{test.negativeMarks} Neg.</div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">Active</span>
                                        <button
                                            onClick={() => startTest(test._id)}
                                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                                        >
                                            Start Test
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {tests.length === 0 && !loading && (
                    <div className="text-center p-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                        No active tests found. Please ask your administrator to create one.
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
