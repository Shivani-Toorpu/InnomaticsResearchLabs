const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  role: { type: String, enum: ['Patient', 'Doctor', 'Admin'], required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String },
  age: { type: Number },
  mobile: { type: String },
  specialization: { type: String }, // For Doctor
  isApproved: { type: Boolean, default: false }, // For Doctor approval
});

module.exports = mongoose.model('User', UserSchema);
