const User = require('../models/User');
const Appointment = require('../models/Appointment');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.approveDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, { isApproved: true });
    res.json({ msg: 'Doctor approved' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.rejectDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ msg: 'Doctor rejected and removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', 'fullName')
      .populate('doctorId', 'fullName');
    res.json(appointments);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
