const express = require('express');
const router = express.Router();
const { getTests, getTestById, submitTest } = require('../controllers/testController');

router.get('/', getTests);
router.get('/:id', getTestById);
router.post('/submit', submitTest);

module.exports = router;
