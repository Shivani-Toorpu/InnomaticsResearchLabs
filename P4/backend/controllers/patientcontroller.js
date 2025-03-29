const Appointment = require('../models/Appointment');
const User = require('../models/User');
const DoctorAvailability = require('../models/DoctorAvailability');

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'Doctor', isApproved: true }).select('-password');
    res.json(doctors);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.bookAppointment = async (req, res) => {
  const { doctorId, date, time } = req.body;
  try {
    const appointment = new Appointment({
      patientId: req.user.id,
      doctorId,
      date,
      time
    });
    await appointment.save();
    res.json({ msg: 'Appointment booked successfully' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user.id })
      .populate('doctorId', 'fullName specialization');
    res.json(appointments);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.cancelAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    await Appointment.findByIdAndUpdate(id, { status: 'Cancelled' });
    res.json({ msg: 'Appointment cancelled' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
