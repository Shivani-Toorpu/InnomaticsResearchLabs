const express = require('express');
const auth = require('../middleware/authMiddleware');
const roleCheck = require('../middleware/roleMiddleware');
const { setAvailability, getAppointments } = require('../controllers/doctorController');

const router = express.Router();

router.post('/availability', auth, roleCheck(['Doctor']), setAvailability);
router.get('/appointments', auth, roleCheck(['Doctor']), getAppointments);

module.exports = router;
