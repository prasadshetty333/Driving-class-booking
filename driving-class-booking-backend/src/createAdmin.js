const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/driving-class-booking');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model('Admin', adminSchema);

const createAdminUser = async () => {
  const username = 'admin'; // Change to your preferred username
  const password = 'admin123'; // Change to your preferred password

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({
    username,
    password: hashedPassword
  });

  await admin.save();
  console.log('Admin user created successfully');
  mongoose.connection.close();
};

createAdminUser().catch(err => {
  console.error('Error creating admin user:', err);
  mongoose.connection.close();
});
