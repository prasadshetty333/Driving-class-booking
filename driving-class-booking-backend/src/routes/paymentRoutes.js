// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/', (req,res,next)=>{
    console.log(req.body , 'req body');
    next();
} ,paymentController.processPayment);

module.exports = router;
