const axios = require('axios');
const { parse } = require('csv-parse/sync');
const Question = require('../models/Question');
const Test = require('../models/Test');

// Sync Questions from Google Sheet
exports.syncSheet = async (req, res) => {
    try {
        const { sheetUrl, testId, defaultMarks } = req.body;

        if (!sheetUrl || !testId) {
            return res.status(400).json({ message: 'Sheet URL and Test ID are required' });
        }

        // Fetch CSV data
        const response = await axios.get(sheetUrl);
        const csvData = response.data;

        // Parse CSV
        const records = parse(csvData, {
            columns: true,
            skip_empty_lines: true
        });

        const newQuestions = [];

        for (const row of records) {
            // Expected Columns: Question_En, Question_Hi, Option1, Option2, Option3, Option4, CorrectOption, ImageURL, Marks
            const questionData = {
                text: {
                    en: row.Question_En,
                    hi: row.Question_Hi || ''
                },
                image: row.ImageURL || '',
                options: [
                    { text: row.Option1, isCorrect: row.CorrectOption == '1' },
                    { text: row.Option2, isCorrect: row.CorrectOption == '2' },
                    { text: row.Option3, isCorrect: row.CorrectOption == '3' },
                    { text: row.Option4, isCorrect: row.CorrectOption == '4' }
                ],
                marks: row.Marks ? parseFloat(row.Marks) : (defaultMarks || 1),
                testId: testId
            };

            const question = await Question.create(questionData);
            newQuestions.push(question._id);
        }

        // Update Test with new questions
        await Test.findByIdAndUpdate(testId, {
            $push: { questions: { $each: newQuestions } }
        });

        res.status(200).json({
            message: `Successfully imported ${newQuestions.length} questions`,
            count: newQuestions.length
        });

    } catch (error) {
        console.error('Sheet Sync Error:', error);
        res.status(500).json({ message: 'Failed to sync sheet', error: error.message });
    }
};

// Create a new Test
exports.createTest = async (req, res) => {
    try {
        const test = await Test.create(req.body);
        res.status(201).json(test);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Upload Image (handled via middleware, this just returns file info)
exports.uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    // Return relative path
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
};
