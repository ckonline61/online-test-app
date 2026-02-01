import React, { useState } from 'react';
import api from '../utils/api';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('create');
    const [testData, setTestData] = useState({ title: '', duration: 30, negativeMarks: 0, totalMarks: 100 });
    const [sheetData, setSheetData] = useState({ sheetUrl: '', testId: '' });
    const [message, setMessage] = useState('');
    const [uploadedImage, setUploadedImage] = useState('');

    const handleCreateTest = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/admin/create-test', testData);
            setMessage(`Test Created! ID: ${data._id} (Copy this for Sheet Sync)`);
            setSheetData({ ...sheetData, testId: data._id });
        } catch (err) {
            setMessage('Error creating test');
        }
    };

    const handleSync = async (e) => {
        e.preventDefault();
        setMessage('Syncing...');
        try {
            const { data } = await api.post('/admin/sync-sheet', sheetData);
            setMessage(data.message);
        } catch (err) {
            setMessage('Error syncing sheet');
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        try {
            const { data } = await api.post('/admin/upload-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const fullUrl = `${window.location.origin}/api${data.url}`;
            setUploadedImage(fullUrl);
        } catch (err) {
            alert('Upload failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex border-b">
                    <button
                        className={`flex-1 py-4 font-semibold ${activeTab === 'create' ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('create')}
                    >
                        1. Create Test
                    </button>
                    <button
                        className={`flex-1 py-4 font-semibold ${activeTab === 'sync' ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('sync')}
                    >
                        2. Sync Questions
                    </button>
                    <button
                        className={`flex-1 py-4 font-semibold ${activeTab === 'tools' ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('tools')}
                    >
                        3. Image Tools
                    </button>
                </div>

                <div className="p-8">
                    {message && <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-lg">{message}</div>}

                    {activeTab === 'create' && (
                        <form onSubmit={handleCreateTest} className="space-y-4">
                            <h2 className="text-xl font-bold mb-4">Create New Test Configuration</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Test Title</label>
                                    <input className="w-full p-2 border rounded" value={testData.title} onChange={e => setTestData({ ...testData, title: e.target.value })} required placeholder="e.g. Science Final Exam" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Duration (Minutes)</label>
                                    <input type="number" className="w-full p-2 border rounded" value={testData.duration} onChange={e => setTestData({ ...testData, duration: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Negative Marks</label>
                                    <input type="number" step="0.01" className="w-full p-2 border rounded" value={testData.negativeMarks} onChange={e => setTestData({ ...testData, negativeMarks: e.target.value })} placeholder="0.25" />
                                </div>
                            </div>
                            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Create Test</button>
                        </form>
                    )}

                    {activeTab === 'sync' && (
                        <form onSubmit={handleSync} className="space-y-4">
                            <h2 className="text-xl font-bold mb-4">Import Questions from Google Sheet</h2>
                            <p className="text-sm text-gray-500 mb-4">
                                Paste the "Published to Web (CSV)" link from Google Sheets.
                            </p>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Test ID</label>
                                <input className="w-full p-2 border rounded" value={sheetData.testId} onChange={e => setSheetData({ ...sheetData, testId: e.target.value })} required placeholder="Paste Test ID from Step 1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Google Sheet CSV URL</label>
                                <input className="w-full p-2 border rounded" value={sheetData.sheetUrl} onChange={e => setSheetData({ ...sheetData, sheetUrl: e.target.value })} required placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv" />
                            </div>
                            <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">Sync Questions</button>
                        </form>
                    )}

                    {activeTab === 'tools' && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold mb-4">Image Uploader</h2>
                            <p className="text-sm text-gray-500">Upload an image here to get a URL. Copy the URL into your Google Sheet's "ImageURL" column.</p>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <input type="file" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                            </div>

                            {uploadedImage && (
                                <div className="mt-4 p-4 bg-gray-100 rounded">
                                    <p className="font-semibold text-green-600">Upload Success!</p>
                                    <p className="text-xs break-all bg-white p-2 border mt-1">{uploadedImage}</p>
                                    <button onClick={() => navigator.clipboard.writeText(uploadedImage)} className="text-xs text-blue-500 mt-1 hover:underline">Copy URL</button>
                                    <img src={uploadedImage} alt="Preview" className="h-20 mt-2 object-cover rounded" />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
