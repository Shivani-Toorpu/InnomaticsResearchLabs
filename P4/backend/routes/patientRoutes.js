const express = require('express');
const auth = require('../middleware/authMiddleware');
const roleCheck = require('../middleware/roleMiddleware');
const { getDoctors, bookAppointment, getMyAppointments, cancelAppointment } = require('../controllers/patientController');

const router = express.Router();

router.get('/doctors', auth, roleCheck(['Patient']), getDoctors);
router.post('/book', auth, roleCheck(['Patient']), bookAppointment);
router.get('/appointments', auth, roleCheck(['Patient']), getMyAppointments);
router.put('/cancel/:id', auth, roleCheck(['Patient']), cancelAppointment);

module.exports = router;
