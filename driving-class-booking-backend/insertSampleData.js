const mongoose = require('mongoose');
const Instructor = require('../driving-class-booking-backend/src/models/instructor');

mongoose.connect('mongodb://localhost:27017/driving-class-booking');

const sampleInstructors = [
  {
    name: 'Ramesh',
    photo: 'path/to/john_doe.jpg',
    availableDates: ['2023-07-01', '2023-07-02', '2023-07-03'],
    wheelerType: 'Two Wheeler',
  },
  {
    name: 'sangeeta',
    photo: 'path/to/jane_smith.jpg',
    availableDates: ['2023-07-01', '2023-07-03', '2023-07-04'],
    wheelerType: 'Four Wheeler',
  },
  {
    name: 'Naresh',
    photo: 'path/to/alice_johnson.jpg',
    availableDates: ['2023-07-01', '2023-07-02', '2023-07-05'],
    wheelerType: 'Both',
  },
];

const insertData = async () => {
  try {
    await Instructor.insertMany(sampleInstructors);
    console.log('Sample data inserted successfully.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
};

insertData();
