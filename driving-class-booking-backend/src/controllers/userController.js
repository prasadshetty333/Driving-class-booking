const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isTodaysDateGreatedThanDate } = require('../services/dateservice');
const otpService = require('../services/otpService');
const {getFormattedDate} =require('../services/dateservice')

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { 
      name,
      phone,
      email,
      gender,
      dob,
      llrNumber,
      password,
      wheelerType,
      package,
      selectedDuration,
      selectedStartDate,
      selectedEndDate } = req.body;

    // Validate input
    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'Name and phone number are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      phone,
      email,
      gender,
      dob,
      llrNumber,
      password : hashedPassword,
      wheelerType,
      package,
      selectedDuration,
      selectedStartDate,
      selectedEndDate,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Return the saved user
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.getUser = async (req, res) => {
  try {
    const {
      userId 
    } = req.query;
    const userOfId = await User.findById(userId);
    res.status(201).json(userOfId);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user', error });
  }
};

exports.getUserByPhone = async (req, res) => {
  try {
    const {
      phone 
    } = req.query;
    const userOfPhone = await User.findOne({phone});
    res.status(201).json(userOfPhone);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user', error });
  }
};

exports.loginUser = async (req, res) => {
  const { phone, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ phone });
    
    if (!user) {
      return res.status(401).send('Authentication failed. User not found.');
    }
  

    if(isTodaysDateGreatedThanDate(user.selectedEndDate)){
      return res.status(401).send('Package Expired.');
    }

    user.comparePassword(password, (err, isMatch) => {
      if (isMatch && !err) {
        const token = jwt.sign({ _id: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).send('Authentication failed. Wrong password.');
      }
    });
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
}




