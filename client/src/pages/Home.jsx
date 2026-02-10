import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ClipboardList,
    Timer,
    ShieldCheck,
    LineChart,
    BookOpen,
    Users
} from 'lucide-react';

const highlights = [
    {
        title: 'Timed Mock Exams',
        description: 'Simulate real coaching center exams with sectional timers and smart autosave.',
        icon: Timer
    },
    {
        title: 'Structured Question Bank',
        description: 'MCQ, numerical, and bilingual questions organized by batch and subject.',
        icon: BookOpen
    },
    {
        title: 'Secure & Proctored',
        description: 'Full-screen prompts, auto-submit, and activity flags for integrity.',
        icon: ShieldCheck
    },
    {
        title: 'Instant Analytics',
        description: 'Performance snapshots, strength areas, and rank insights after every test.',
        icon: LineChart
    },
    {
        title: 'Coach + Student Mode',
        description: 'Admins build tests, students attempt them, all in one dashboard.',
        icon: Users
    },
    {
        title: 'Simple Test Creation',
        description: 'Import questions from Google Sheets and publish in minutes.',
        icon: ClipboardList
    }
];

const steps = [
    {
        title: 'Register your batch',
        description: 'Students sign in with their roll number and join the correct test list.'
    },
    {
        title: 'Start the exam',
        description: 'Launch the test, lock your focus, and keep an eye on the live timer.'
    },
    {
        title: 'Get results instantly',
        description: 'Review marks, accuracy, and next-step tips in the result dashboard.'
    }
];

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                            CE
                        </div>
                        <div>
                            <p className="text-sm uppercase tracking-widest text-indigo-500">Coach Exam</p>
                            <h1 className="text-lg font-bold">Online Test Hub</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/auth')}
                            className="px-4 py-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                            Student Login
                        </button>
                        <button
                            onClick={() => navigate('/auth')}
                            className="px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Start Practice
                        </button>
                    </div>
                </div>
            </header>

            <main>
                <section className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest">For coaching students</p>
                        <h2 className="text-4xl font-bold leading-tight mt-4">
                            Conduct online exams, track progress, and keep every batch exam-ready.
                        </h2>
                        <p className="mt-4 text-gray-600">
                            Coach Exam brings your offline test series online with secure exams, instant analytics,
                            and a streamlined admin workflow. Give students the same pressure and preparation they
                            expect in the final exam.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate('/auth')}
                                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700"
                            >
                                Login to Take Exam
                            </button>
                            <button
                                onClick={() => navigate('/admin')}
                                className="px-6 py-3 border border-indigo-200 text-indigo-600 font-semibold rounded-xl hover:border-indigo-400"
                            >
                                Coach Admin Panel
                            </button>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-2xl font-bold">1200+</h3>
                                <p className="text-sm text-gray-500">Practice attempts tracked</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">48 hrs</h3>
                                <p className="text-sm text-gray-500">Average improvement cycle</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl shadow-xl p-6">
                        <div className="rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
                            <p className="text-sm uppercase tracking-widest">Live Batch</p>
                            <h3 className="text-2xl font-bold mt-2">NEET Rapid Fire - Week 5</h3>
                            <p className="mt-3 text-sm text-white/80">
                                60 questions · 60 mins · -0.25 negative marks
                            </p>
                            <div className="mt-6 flex items-center gap-4">
                                <div className="bg-white/20 px-4 py-2 rounded-lg">
                                    <p className="text-xs uppercase">Starts</p>
                                    <p className="font-semibold">Today, 5:30 PM</p>
                                </div>
                                <div className="bg-white/20 px-4 py-2 rounded-lg">
                                    <p className="text-xs uppercase">Batch</p>
                                    <p className="font-semibold">Alpha - 2025</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Attempted by</span>
                                <span className="font-semibold">82 students</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Average score</span>
                                <span className="font-semibold">62%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Accuracy goal</span>
                                <span className="font-semibold text-green-600">≥ 75%</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white border-t border-b">
                    <div className="max-w-6xl mx-auto px-6 py-14">
                        <h3 className="text-2xl font-bold">Everything a coaching test series needs</h3>
                        <p className="text-gray-600 mt-2">Designed for daily tests, grand tests, and revision marathons.</p>
                        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {highlights.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.title} className="p-6 border border-gray-100 rounded-2xl shadow-sm">
                                        <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                            <Icon size={22} />
                                        </div>
                                        <h4 className="mt-4 text-lg font-semibold">{item.title}</h4>
                                        <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-6 py-16">
                    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
                        <div>
                            <h3 className="text-2xl font-bold">How students take the exam</h3>
                            <p className="text-gray-600 mt-2">A simple flow that matches your offline exam routine.</p>
                            <div className="mt-8 space-y-6">
                                {steps.map((step, index) => (
                                    <div key={step.title} className="flex gap-4">
                                        <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{step.title}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gray-900 text-white rounded-3xl p-8">
                            <p className="text-sm uppercase tracking-widest text-white/70">Exam day checklist</p>
                            <h4 className="text-xl font-semibold mt-3">Student focus reminders</h4>
                            <ul className="mt-4 space-y-3 text-sm text-white/80">
                                <li>• Keep the timer visible and avoid switching tabs.</li>
                                <li>• Review marked questions before final submit.</li>
                                <li>• Attempt higher-weightage sections early.</li>
                                <li>• Check negative marking rules in the header.</li>
                            </ul>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="mt-6 w-full py-3 bg-white text-gray-900 font-semibold rounded-xl"
                            >
                                Go to Student Dashboard
                            </button>
                        </div>
                    </div>
                </section>

                <section className="bg-indigo-600">
                    <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col lg:flex-row items-center justify-between gap-6 text-white">
                        <div>
                            <h3 className="text-2xl font-bold">Ready to launch today’s coaching test?</h3>
                            <p className="mt-2 text-indigo-100">Set up a test, sync questions, and invite your batch in minutes.</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/admin')}
                                className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl"
                            >
                                Create Test
                            </button>
                            <button
                                onClick={() => navigate('/auth')}
                                className="px-6 py-3 border border-white/70 text-white font-semibold rounded-xl"
                            >
                                Student Login
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
