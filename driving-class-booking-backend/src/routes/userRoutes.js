const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the POST /api/users endpoint
router.post('/',userController.registerUser);
router.get('/', userController.getUser);
router.get('/getByPhone', userController.getUserByPhone);

router.post('/send-otp', userController.sendOtp);
router.post('/reset-password', userController.resetPassword);


router.post('/login', userController.loginUser);

module.exports = router;
