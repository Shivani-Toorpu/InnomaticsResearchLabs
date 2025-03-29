const mongoose = require('mongoose');

const DoctorAvailabilitySchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  availableSlots: [
    {
      date: String,
      times: [String]
    }
  ]
});

module.exports = mongoose.model('DoctorAvailability', DoctorAvailabilitySchema);
