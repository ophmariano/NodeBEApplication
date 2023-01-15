const express = require('express');

const router = express.Router();
const { getProfile } = require('../../middleware/getProfile');
const jobController = require('../../controllers/jobController');

router.get('/unpaid', getProfile, jobController.getUnpaidJobs);

module.exports = router;
