const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Package schema
const packageSchema = new Schema({
  value: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// Define the Wheeler schema
const wheelerSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Package', wheelerSchema);
