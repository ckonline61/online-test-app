const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    text: {
        en: { type: String, required: true },
        hi: { type: String }
    },
    image: { type: String }, // URL to image (local or cloud)
    options: [{
        text: { type: String, required: true }, // Option text (can be mixed lang)
        isCorrect: { type: Boolean, default: false }
    }],
    marks: { type: Number, default: 1 },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' } // Optional linkage
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
