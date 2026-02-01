const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    testHistory: [{
        testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
        score: Number,
        totalMarks: Number,
        submittedAt: { type: Date, default: Date.now }
    }],
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
