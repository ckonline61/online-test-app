const Test = require('../models/Test');
const Question = require('../models/Question');
const Student = require('../models/Student');

// Get all available tests
exports.getTests = async (req, res) => {
    try {
        const tests = await Test.find({ isActive: true }).select('-questions');
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get specific test with questions (for taking the test)
exports.getTestById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id).populate('questions');
        if (!test) return res.status(404).json({ message: 'Test not found' });
        res.json(test);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Submit Test & Calculate Score
exports.submitTest = async (req, res) => {
    try {
        const { studentId, testId, answers } = req.body;
        // answers: { questionId: selectedOptionIndex (1-4) }

        const test = await Test.findById(testId).populate('questions');
        if (!test) return res.status(404).json({ message: 'Test not found' });

        let score = 0;
        let totalPossible = 0;
        const negativeMarking = test.negativeMarks || 0;

        test.questions.forEach(q => {
            const correctOptIndex = q.options.findIndex(opt => opt.isCorrect);
            const correctOptValue = correctOptIndex + 1; // 1-based index to match sheet
            const studentAns = answers[q._id];

            totalPossible += q.marks;

            if (studentAns) {
                if (parseInt(studentAns) === correctOptValue) {
                    score += q.marks;
                } else {
                    score -= negativeMarking;
                }
            }
        });

        // Update Student History
        const student = await Student.findById(studentId);
        if (student) {
            student.testHistory.push({
                testId: test._id,
                score,
                totalMarks: totalPossible
            });
            await student.save();
        }

        res.json({
            score,
            totalMarks: totalPossible,
            negativeApplied: negativeMarking,
            studentId,
            testId
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
