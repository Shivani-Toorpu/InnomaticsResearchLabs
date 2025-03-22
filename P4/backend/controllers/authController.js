const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.register = async (req, res) => {
  const { role, fullName, email, password, gender, age, mobile, specialization } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({
      role, fullName, email, password, gender, age, mobile, specialization
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Auto-approve Admin & Patient, require approval for Doctors
    if (role === 'Admin' || role === 'Patient') user.isApproved = true;

    await user.save();
    res.json({ msg: 'Registration successful, awaiting admin approval if Doctor' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    if (user.role === 'Doctor' && !user.isApproved) {
      return res.status(400).json({ msg: 'Doctor registration pending approval' });
    }

    const payload = { user: { id: user._id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, role: user.role });
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
