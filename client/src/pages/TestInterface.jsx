import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Timer, CheckCircle, Smartphone } from 'lucide-react';
import clsx from 'clsx'; // Make sure clsx is installed or use template strings

const TestInterface = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [test, setTest] = useState(null);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState({}); // { questionId: selectedOptionIndex }
    const [timeLeft, setTimeLeft] = useState(0);
    const [lang, setLang] = useState('en'); // 'en' or 'hi'

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const { data } = await api.get(`/tests/${testId}`);
                setTest(data);
                setTimeLeft(data.duration * 60);
            } catch (err) {
                alert('Failed to load test');
            }
        };
        fetchTest();
    }, [testId]);

    useEffect(() => {
        if (!timeLeft) return;
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    submitTest();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    const handleOptionSelect = (qId, optionIdx) => {
        setAnswers({ ...answers, [qId]: optionIdx });
    };

    const submitTest = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            const { data } = await api.post('/tests/submit', {
                testId,
                studentId: user._id,
                answers
            });
            navigate('/result', { state: { result: data } });
        } catch (err) {
            alert('Submission failed');
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    if (!test) return <div className="p-8 text-center">Loading Test...</div>;

    const currentQ = test.questions[currentQIndex];

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10">
                <div className="font-bold text-lg text-gray-800 truncate max-w-xs">{test.title}</div>
                <div className="flex items-center space-x-6">
                    <div className={`flex items-center font-mono text-xl font-bold ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-indigo-600'}`}>
                        <Timer className="mr-2" size={20} /> {formatTime(timeLeft)}
                    </div>
                    <button
                        onClick={submitTest}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-md"
                    >
                        Submit Test
                    </button>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* Question Area */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-10">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        {/* Language Toggle */}
                        <div className="flex justify-end mb-4">
                            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                                <button onClick={() => setLang('en')} className={`px-3 py-1 text-sm rounded-md transition ${lang === 'en' ? 'bg-white shadow text-indigo-600 font-bold' : 'text-gray-500'}`}>English</button>
                                <button onClick={() => setLang('hi')} className={`px-3 py-1 text-sm rounded-md transition ${lang === 'hi' ? 'bg-white shadow text-indigo-600 font-bold' : 'text-gray-500'}`}>Hindi</button>
                            </div>
                        </div>

                        {/* Question Text */}
                        <div className="mb-6">
                            <span className="text-gray-400 font-bold text-sm">Question {currentQIndex + 1} of {test.questions.length}</span>
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-2 leading-relaxed">
                                {currentQ.text[lang] || currentQ.text['en']}
                            </h2>
                            {currentQ.image && (
                                <div className="mt-4">
                                    <img src={currentQ.image} alt="Question Diagram" className="max-h-64 rounded-lg border" />
                                </div>
                            )}
                        </div>

                        {/* Options */}
                        <div className="space-y-3">
                            {currentQ.options.map((opt, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleOptionSelect(currentQ._id, idx + 1)}
                                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${answers[currentQ._id] === idx + 1
                                            ? 'border-indigo-600 bg-indigo-50 shadow-inner'
                                            : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${answers[currentQ._id] === idx + 1 ? 'border-indigo-600' : 'border-gray-300'
                                        }`}>
                                        {answers[currentQ._id] === idx + 1 && <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>}
                                    </div>
                                    <span className="text-gray-700 font-medium">{opt.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between mt-10 pt-6 border-t">
                            <button
                                onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
                                disabled={currentQIndex === 0}
                                className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentQIndex(Math.min(test.questions.length - 1, currentQIndex + 1))}
                                disabled={currentQIndex === test.questions.length - 1}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none"
                            >
                                Next Question
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Palette (Hidden on mobile usually, but keeping simple for now) */}
                <div className="w-72 bg-white border-l p-6 hidden lg:block overflow-y-auto">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Question Palette</h3>
                    <div className="grid grid-cols-4 gap-3">
                        {test.questions.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentQIndex(idx)}
                                className={`w-10 h-10 rounded-lg font-bold text-sm transition ${currentQIndex === idx ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                                    } ${answers[test.questions[idx]._id]
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                    <div className="mt-8 space-y-3">
                        <div className="flex items-center text-xs text-gray-500"><div className="w-3 h-3 bg-green-500 rounded mr-2"></div> Answered</div>
                        <div className="flex items-center text-xs text-gray-500"><div className="w-3 h-3 bg-gray-100 rounded mr-2"></div> Not Answered</div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TestInterface;
