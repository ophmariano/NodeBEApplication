const express = require('express');

const router = express.Router();
const { getProfile } = require('../../middleware/getProfile');
const jobController = require('../../controllers/jobController');

router.get('/unpaid', getProfile, jobController.getUnpaidJobs);
// Is using underscore. Need to check the company guidelines
router.post('/:job_id/pay', getProfile, jobController.payForJob);

module.exports = router;
