const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({

  name: { type: String, required: true },
  photo: { type: String, required: true },
  availableDates: { type: [String], required: true },
  availableTimes: { type: [String], required: true },
  wheelerType: { type: [String], required: true },
  description: { type: String, required: true }
});

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
