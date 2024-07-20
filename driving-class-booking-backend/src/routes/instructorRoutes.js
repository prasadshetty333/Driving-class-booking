const express = require('express');
const router = express.Router();

const instructorController = require('../controllers/instructorController');

router.use('/api/instructors', instructorController);

module.exports = router;
