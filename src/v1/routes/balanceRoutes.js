const express = require('express');

const router = express.Router();
const { getProfile } = require('../../middleware/getProfile');
const profileController = require('../../controllers/profileController');

router.post('/deposit/:userId', getProfile, profileController.depositForClientUser);

module.exports = router;
