const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');
const Test = require('./models/Test');
const Student = require('./models/Student');

dotenv.config();

const sampleQuestions = [
    {
        text: { en: "Which sentence is grammatically correct?", hi: "कौन सा वाक्य व्याकरण की दृष्टि से सही है?" },
        options: [{ text: "She go to school.", isCorrect: false }, { text: "She goes to school.", isCorrect: true }, { text: "She going to school.", isCorrect: false }, { text: "She gone to school.", isCorrect: false }],
        marks: 1
    },
    {
        text: { en: "Identify the noun in this sentence: 'The cat sleeps.'", hi: "इस वाक्य में संज्ञा की पहचान करें: 'बिल्ली सोती है।'" },
        options: [{ text: "The", isCorrect: false }, { text: "Cat", isCorrect: true }, { text: "Sleeps", isCorrect: false }, { text: "None", isCorrect: false }],
        marks: 1
    },
    {
        text: { en: "What is the past tense of 'Run'?", hi: "'Run' का भूतकाल क्या है?" },
        options: [{ text: "Runned", isCorrect: false }, { text: "Ran", isCorrect: true }, { text: "Running", isCorrect: false }, { text: "Runs", isCorrect: false }],
        marks: 1
    },
    {
        text: { en: "Choose the correct preposition: 'The book is ___ the table.'", hi: "सही पूर्वसर्ग चुनें: 'किताब मेज ___ है।'" },
        options: [{ text: "In", isCorrect: false }, { text: "On", isCorrect: true }, { text: "At", isCorrect: false }, { text: "By", isCorrect: false }],
        marks: 1
    },
    {
        text: { en: "Which word is an antonym of 'Happy'?", hi: "'Happy' का विलोम शब्द क्या है?" },
        options: [{ text: "Joyful", isCorrect: false }, { text: "Sad", isCorrect: true }, { text: "Glad", isCorrect: false }, { text: "Delighted", isCorrect: false }],
        marks: 1
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Clear existing (Optional, be careful)
        // await Question.deleteMany({});
        // await Test.deleteMany({});

        // Create Questions
        const questionDocs = await Question.insertMany(sampleQuestions);
        const questionIds = questionDocs.map(q => q._id);

        // Create Test
        const test = await Test.create({
            title: "English Grammar Basics",
            description: "A simple test to check grammar knowledge.",
            duration: 15,
            negativeMarks: 0.25,
            totalMarks: 5,
            questions: questionIds,
            isActive: true
        });

        console.log('Sample Data Seeded Successfully!');
        console.log(`Test ID: ${test._id}`);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDB();
