const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  selectedDate: {
    type: String,
    required: true
  },
  selectedTime: {
    type: String,
    // required: true
  },
  selectedInstructor: {
    type: Schema.Types.ObjectId
    , ref: 'Instructor' 
    // required: true
  },
  attended : {
    type : Boolean,
    default : false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
