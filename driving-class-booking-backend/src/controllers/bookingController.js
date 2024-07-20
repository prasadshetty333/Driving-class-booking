const Booking = require('../models/Booking');
const Package = require('../models/Package');
const User = require('../models/User');

exports.createBooking = async (req, res) => {
  try {
    const {
      userId,
      selectedDate,
      selectedTime,
      selectedInstructor
    } = req.body;

    const user = await User.findOne({
      _id : userId
    });
    console.log(user , 'user');
    // const selectedPackage = await Package.findOne({
    //   name : user.Package
    // }).Package.find(_ => (_.value == user.package))

    const bookingsByThisUser = await Booking.find({
      userId
    })
    console.log(bookingsByThisUser , 'bookingsByThisUser');


    if(bookingsByThisUser.length >= user.selectedDuration){
      res.status(403).json({ message: 'All classes attended' });
    }else{
      const newBooking = new Booking({
        userId,
        selectedDate,
        selectedTime,
        selectedInstructor
      });

      const savedBooking = await newBooking.save();

      res.status(201).json(savedBooking);
    }

  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error });
  }
};

exports.getBookingByUserId = async (req, res) => {
  try {
    const {
      userId ,
      attended
    } = req.query;

    console.log(userId);

    const bookingOfId = await Booking.find({ userId , attended : attended ? true : false})
    .populate('selectedInstructor', 'name') // Populate only the 'name' field of the Instructor
    .exec();

    res.status(201).json(bookingOfId);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get booking', error });
  }
};
