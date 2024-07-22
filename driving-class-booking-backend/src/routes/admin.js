// routes/admin.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();
const Instructor = require('../models/Instructor');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const { getFormattedDate } = require('../services/dateservice');


//adminLogin
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).send('Authentication failed. User not found.');
    }

    admin.comparePassword(password, (err, isMatch) => {
      if (isMatch && !err) {
        const token = jwt.sign({ _id: admin._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).send('Authentication failed. Wrong password.');
      }
    });
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});


//instructors
router.post('/instructors', async (req, res) => {
  try {
    const { name, photo, availableDates, availableTimes, wheelerType, description } = req.body;

    let parsedAvailableDates;
    if (typeof availableDates === 'string') {
      try {
        parsedAvailableDates = JSON.parse(availableDates);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid availableDates format' });
      }
    } else {
      parsedAvailableDates = availableDates;
    }

    let parsedAvailableTimes;
    if (typeof availableTimes === 'string') {
      try {
        parsedAvailableTimes = JSON.parse(availableTimes);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid availableTimes format' });
      }
    } else {
      parsedAvailableTimes = availableTimes;
    }

    const parsedWheelerType = Array.isArray(wheelerType) ? wheelerType : [wheelerType];

    const instructor = new Instructor({
      name,
      photo,
      availableDates: parsedAvailableDates,
      availableTimes: parsedAvailableTimes,
      wheelerType: parsedWheelerType,
      description
    });

    await instructor.save();
    res.status(201).json(instructor);
  } catch (error) {
    console.error('Error adding instructor:', error);
    res.status(400).json({ error: 'Invalid data format' });
  }
});

  router.get('/instructors', async (req, res) => {
    try {
      const instructors = await Instructor.find();
      res.status(200).send(instructors);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  router.put('/instructors/:id', async (req, res) => {
    try {
      const instructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!instructor) {
        return res.status(404).send();
      }
      res.send(instructor);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  router.delete('/instructors/:id', async (req, res) => {
    try {
      const instructor = await Instructor.findByIdAndDelete(req.params.id);
      if (!instructor) {
        return res.status(404).send();
      }
      res.send(instructor);
    } catch (error) {
      res.status(500).send(error);
    }
  });

//users
  router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  router.get('/users/:userId/payments',async (req, res) => {
    try {
      const userId = req.params.userId;
      const payments = await Payment.find({ userId }).exec();
      res.status(200).json(payments);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  });

  router.get('/users/:userId/bookings',async (req, res) => {
    try {
      const userId = req.params.userId;
      const bookings = await Booking.find({ userId })
      .populate('userId' , ['name' , 'wheelerType'])
      .populate('selectedInstructor' , 'name').exec();
      res.status(200).json(bookings);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  });
  
  

 




//bookings
  router.get('/bookings', async (req, res) => {
    try {
      const today = getFormattedDate();
      console.log(today , 'today');
      const booking = await Booking.find({ selectedDate: { $gte: today } })
      .sort({ selectedDate: 1 })
      .populate('userId' , ['name' , 'wheelerType'])
      .populate('selectedInstructor' , 'name')
      .exec();
      res.status(200).send(booking);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.put('/bookings/attend', async (req, res) => {
    try {
      const booking = await Booking.findByIdAndUpdate( req.query.bookingId , {attended : true})
      res.status(200).send(booking);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.delete('/bookings/:id', async (req, res) => {
    try {
      const booking = await Booking.findByIdAndDelete(req.params.id);
      if (!booking) {
        return res.status(404).send();
      }
      res.send(booking);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  //payments
  router.get('/payments', async (req, res) => {
    try {
      const payment = await Payment.find();
      res.status(200).send(payment);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.delete('/payments/:id', async (req, res) => {
    try {
      const payment = await Payment.findByIdAndDelete(req.params.id);
      if (!payment) {
        return res.status(404).send();
      }
      res.send(payment);
    } catch (error) {
      res.status(500).send(error);
    }
  });



module.exports = router;
