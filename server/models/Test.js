const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: Number, required: true }, // In minutes
    negativeMarks: { type: Number, default: 0 }, // E.g., 0.25 for 1/4th mark deduction
    totalMarks: { type: Number, default: 0 },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Test', testSchema);
