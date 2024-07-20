const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique : true
  },
  email: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  dob: {
    type: Date,
    required: false
  },
  password :{
    type : String,
    required : true
  },
  wheelerType : {
    type : String,
    required : true
  },
  package : {
    type : String,
    required : true
  },
  selectedDuration : {
    type : Number,
    required : true
  },
  selectedStartDate : {
    type : String,
    required : true
  },
  selectedEndDate : {
    type : String,
    required : true
  },
  otp: { 
    type: String,
    required: false 
  },
  otpExpires: { 
    type: Date, 
    required: false
   }
}, {
  timestamps: true
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
