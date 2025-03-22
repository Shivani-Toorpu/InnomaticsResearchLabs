const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: String },
  time: { type: String },
  status: { type: String, enum: ['Booked', 'Cancelled'], default: 'Booked' }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
