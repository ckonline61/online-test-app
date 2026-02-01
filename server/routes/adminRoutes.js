const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { syncSheet, createTest, uploadImage } = require('../controllers/adminController');

// Multer Storage Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

// Ensure uploads directory exists (Basic check, though usually done at startup)
const fs = require('fs');
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

router.post('/sync-sheet', syncSheet);
router.post('/create-test', createTest);
router.post('/upload-image', upload.single('image'), uploadImage);

module.exports = router;
