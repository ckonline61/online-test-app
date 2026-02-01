import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Result = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const result = state?.result;

    if (!result) return <div className="p-8">No result data found.</div>;

    const percentage = Math.round((result.score / result.totalMarks) * 100);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center"
            >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-green-600">{percentage}%</span>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">Test Completed!</h1>
                <p className="text-gray-500 mb-8">You have successfully submitted your test.</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="text-2xl font-bold text-gray-800">{result.score}</div>
                        <div className="text-xs text-gray-500 uppercase">Your Score</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="text-2xl font-bold text-gray-800">{result.totalMarks}</div>
                        <div className="text-xs text-gray-500 uppercase">Total Marks</div>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                    Back to Dashboard
                </button>
            </motion.div>
        </div>
    );
};

export default Result;
