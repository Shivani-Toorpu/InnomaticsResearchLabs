const express = require('express');
const auth = require('../middleware/authMiddleware');
const roleCheck = require('../middleware/roleMiddleware');
const { getUsers, approveDoctor, rejectDoctor, getAppointments } = require('../controllers/adminController');

const router = express.Router();

router.get('/users', auth, roleCheck(['Admin']), getUsers);
router.put('/approve/:id', auth, roleCheck(['Admin']), approveDoctor);
router.delete('/reject/:id', auth, roleCheck(['Admin']), rejectDoctor);
router.get('/appointments', auth, roleCheck(['Admin']), getAppointments);

module.exports = router;
