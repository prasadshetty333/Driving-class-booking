const express = require('express');
const router = express.Router();
const instructorService = require('../services/instructorService');
const Instructor = require('../models/Instructor');
const mongoose = require('mongoose');
// POST /api/instructors/availability
// router.post('/availability', async (req, res) => {
//   try {
//     const { selectedDate, wheelerType, selectedTime } = req.body;
//     const availableInstructors = await instructorService.getAvailableInstructors(selectedDate, wheelerType, selectedTime);
//     res.status(200).json(availableInstructors);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.get('/availability', async (req, res) => {
  try {
    const { selectedDate, wheelerType, selectedTime } = req.query;
    const availableInstructors = await instructorService.getAvailableInstructors(wheelerType , selectedDate, selectedTime);
    res.status(200).json(availableInstructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).send(instructors);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.json(instructor);
  } catch (error) {
    res.status(400).json({ message: 'Invalid instructor ID' });
  }
});
module.exports = router;
