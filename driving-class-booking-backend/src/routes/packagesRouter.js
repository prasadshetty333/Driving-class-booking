const express = require('express');
const Wheeler = require('../models/Package');

const router = express.Router();


router.get('/' , async (req,res)=> {
    res.json(await Wheeler.find())
})

module.exports = router;
