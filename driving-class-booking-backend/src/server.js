const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 


const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/driving-class-booking');

app.use(bodyParser.json());
app.use(cors()); 


// Import routes
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes'); // Assuming you have user routes
const routes = require('./routes/instructorRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/admin');
const packageRouter = require('./routes/packagesRouter');



// Use routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes); // Assuming you have user routes
app.use(routes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/package',  packageRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
