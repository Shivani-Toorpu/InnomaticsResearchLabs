const Appointment = require('../models/Appointment');
const DoctorAvailability = require('../models/DoctorAvailability');

exports.setAvailability = async (req, res) => {
  const { availableSlots } = req.body;
  try {
    let availability = await DoctorAvailability.findOne({ doctorId: req.user.id });
    if (!availability) {
      availability = new DoctorAvailability({ doctorId: req.user.id, availableSlots });
    } else {
      availability.availableSlots = availableSlots;
    }
    await availability.save();
    res.json({ msg: 'Availability updated' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user.id })
      .populate('patientId', 'fullName');
    res.json(appointments);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
