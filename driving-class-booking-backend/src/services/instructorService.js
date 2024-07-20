const Booking = require('../models/Booking');
const Instructor = require('../models/Instructor');

// const getAvailableInstructors = async (selectedDate, wheelerType, selectedTime) => {
//   try {
//     // Find instructors that match the wheelerType and have the selectedDate and selectedTime in their availability
//     const availableInstructors = await Instructor.find({
//       wheelerType: wheelerType,
//       availableDates: selectedDate,
//       availableTimes: selectedTime
//     });

//     return availableInstructors;
//   } catch (error) {
//     throw new Error('Error fetching available instructors');
//   }
// };

const getAvailableInstructors = async (wheelerType, bookingDate, bookingTime) => {
  console.log(wheelerType, bookingDate, bookingTime);
  try {
    const availableInstructors = await Instructor.aggregate([
      {
        $match: {
          wheelerType: wheelerType,
          availableDates: bookingDate
        }
      },
      {
        $lookup: {
          from: 'bookings',
          let: { instructorId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$selectedInstructor', '$$instructorId'] },
                    { $eq: ['$selectedDate', bookingDate] },
                    { $eq: ['$selectedTime', bookingTime] }
                  ]
                }
              }
            }
          ],
          as: 'bookingInfo'
        }
      },
      {
        $addFields: {
          isBooked: {
            $cond: { if: { $gt: [{ $size: "$bookingInfo" }, 0] }, then: true, else: false }
          }
        }
      },
      {
        $match: {
          isBooked: false
        }
      },
      {
        $project: {
          name: 1,
          photo: 1,
          description: 1,
          isBooked : 1
        }
      }
    ]).exec();

    // const availableInstructors = await Booking.find({
    //   selectedDate : bookingDate,
    //   selectedTime : bookingTime,
    //   selectedInstructor : '6686660a7810d245b527599b',
    // })

    return availableInstructors;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


module.exports = {
  getAvailableInstructors
};
