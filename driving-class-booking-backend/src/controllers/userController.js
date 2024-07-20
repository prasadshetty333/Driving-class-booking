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
    console.log(user);
    if (!user) {
      return res.status(401).send('Authentication failed. User not found.');
    }
    console.log(getFormattedDate());
    console.log(user.selectedEndDate);
    console.log(isTodaysDateGreatedThanDate(user.selectedEndDate));

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

exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  const otp = otpService.generateOtp();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

  try {
    let user = await User.findOne({ phone });
    if (!user) {
      user = new User({ phone, otp, otpExpires });
    } else {
      user.otp = otp;
      user.otpExpires = otpExpires;
    }
    await user.save();

     smsService.sendSms(phone, `Your OTP is ${otp}`);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending OTP', error: err });
  }
};

exports.resetPassword = async (req, res) => {
  const { phone, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!otpService.isOtpValid(user.otp, user.otpExpires)) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    if (otp !== user.otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting password', error: err });
  }
};


