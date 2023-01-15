const express = require('express');

const router = express.Router();
const { getProfile } = require('../../middleware/getProfile');
const adminController = require('../../controllers/adminController');

// best-profession is using hyphen. Need to check the company guidelines
// possible solution with regex
// best-profession/start=:startYear(\\d{4})-:startMonth(\\d{2})-:startDay(\\d{2})
// &end=:endYear(\\d{4})-:endMonth(\\d{2})-:endDay(\\d{2})', getProfile,
router.get('/best-profession', getProfile, adminController.getBestProfession);

// best-clients is using hyphen. Need to check the company guidelines
router.get('/best-clients', getProfile, adminController.getBestClients);

module.exports = router;
