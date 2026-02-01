const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.registerStudent = async (req, res) => {
    try {
        const { name, rollNumber, password } = req.body;

        const studentExists = await Student.findOne({ rollNumber });
        if (studentExists) {
            return res.status(400).json({ message: 'Student already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const student = await Student.create({
            name,
            rollNumber,
            password: hashedPassword,
        });

        if (student) {
            res.status(201).json({
                _id: student._id,
                name: student.name,
                rollNumber: student.rollNumber,
                token: generateToken(student._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid student data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginStudent = async (req, res) => {
    try {
        const { rollNumber, password } = req.body;
        const student = await Student.findOne({ rollNumber });

        if (student && (await bcrypt.compare(password, student.password))) {
            res.json({
                _id: student._id,
                name: student.name,
                rollNumber: student.rollNumber,
                token: generateToken(student._id),
                history: student.testHistory
            });
        } else {
            res.status(401).json({ message: 'Invalid roll number or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
